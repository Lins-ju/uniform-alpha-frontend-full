import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlinkingText, ContentBox, ContentItem, SubmitDropdown } from '../../components';
import { createFolder, saveFile, getAllFolderAndFiles, deleteFolder, deleteFile } from '../../lib/sfapi'
import { useEffect, useState } from 'react';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import uuid from 'react-native-uuid';

export default function SharedFiles() {
  const [folderAndFilesData, setFolderAndFilesData] = useState([]);

  const [isGettingContent, setIsGettingContent] = useState(false);

  const fetchContent = async () => {
    setIsGettingContent(true);

    const dataResult = await getAllFolderAndFiles();
    setFolderAndFilesData(Object.entries(dataResult));

    setIsGettingContent(false);
  }

  const getFilesFromFolder = (filesObject) => {
    const mapEntries1 = filesObject.map(values => values);

    return mapEntries1;
  }

  const handlePressAdd = async (folderId) => {
    const result = await DocumentPicker.getDocumentAsync({ multiple: true });

    if (result.canceled != true) {
      result.assets.forEach(async (value) => {
        const fileUri = value.uri;
        const fileName = value.name;

        const content = await FileSystem.readAsStringAsync(fileUri, { encoding: 'base64' });
        await saveFile(folderId, content, fileName);
        await fetchContent();
      });
    }
  }

  const handlePressDeleteFolder = async (folderId) => {
    Alert.alert(
      "Confirmation",
      "Deleting your folder will delete all your files!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Action canceled"),
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: async () => {
            await deleteFolder(folderId);
            await fetchContent();
          }
        }
      ]
    )
  }

  const handlePressDeleteFile = async (folderId, fileId) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you wanna delete your file?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Action canceled"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: async () => {
            await deleteFile(folderId, fileId);
            await fetchContent();
          }
        }
      ]
    )
  }

  const handleFileShare = async (fileName, fileContent) => {
    const fileUri = FileSystem.cacheDirectory + fileName;

    await FileSystem.writeAsStringAsync(fileUri, fileContent, { 'encoding': FileSystem.EncodingType.Base64 });
    await Sharing.shareAsync(fileUri);
    await FileSystem.deleteAsync(fileUri);
  }


  const createFolderAsync = async (folderName) => {
    await createFolder(folderName);
    await fetchContent();
  }

  useEffect(() => {
    fetchContent();
  }, [])

  return (
    <SafeAreaView style={{
      minHeight: Dimensions.get("window").height,
      minWidth: Dimensions.get("window").width,
      padding: 10,
      flex: 0,
      backgroundColor: '#eeeeee'
    }}>
      <ScrollView contentContainerStyle={styles.container}>

        <SubmitDropdown
          dropdownButtonTitle="Create Folder"
          placeholder="Enter your folder"
          submitButtonTitle="Submit"
          handlesubmitButton={createFolderAsync} />

        <View style={styles.container3}>
          {folderAndFilesData.map(([folderFileDataKey, folderFileDataValue]) => {
            const splitKey = folderFileDataKey.split("/");
            const folderId = splitKey[0];
            const folderName = splitKey[1];
            const isThereAnyValue = folderFileDataValue.length != 0;
            const filesFromFolder = getFilesFromFolder(folderFileDataValue);
            const folderKey = uuid.v4();

            return <ContentBox
              key={folderKey}
              collapsibleTitle={folderName}
              folderId={folderId}
              handlePressAdd={handlePressAdd}
              handlePressDelete={handlePressDeleteFolder}>

              {isThereAnyValue ? filesFromFolder.map(value => {
                const splitfileType = value.fileName.split('.');
                const fileType = splitfileType[1];
                const isPdf = fileType === "pdf" ? true : false;
                const color = "#ba0000";
                const fileContent = value.content;
                const fileId = value.fileId;
                const fileKey = uuid.v4();

                return isPdf ? <ContentItem key={fileKey} fileContent={fileContent} fileId={fileId} folderId={folderId} fileTitle={value.fileName} iconName="file-pdf-o" color={color} handleFile={handleFileShare} handleDelete={handlePressDeleteFile} />
                  : <ContentItem key={fileKey} fileContent={fileContent} fileId={fileId} folderId={folderId} fileTitle={value.fileName} iconName="file-o" color={color} handleFile={handleFileShare} handleDelete={handlePressDeleteFile} />
              }) : <Text style={styles.text3}>Empty Folder</Text>}
            </ContentBox>
          })}
        </View>

        <View style={styles.loadingText}>
          <BlinkingText text="Updating..." isLoading={isGettingContent} />
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  container2: {
    width: '95%',
    paddingTop: 20
  },
  mainButton: {
    paddingBottom: 5,
    paddingLeft: 3,
    width: '100%'
  },
  text: {
    fontSize: 20
  },
  text2: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  container3: {
    alignItems: 'left'
  },
  text3: {
    alignContent: 'left',
    fontSize: 15,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingTop: 10
  },
  loadingText: {
    paddingTop: 15
  }
});

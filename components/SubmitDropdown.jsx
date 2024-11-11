import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';

import Collapsible from 'react-native-collapsible';

const SubmitDropdown = ({
    dropdownButtonTitle,
    placeholder,
    submitButtonTitle,
    handlesubmitButton
}) => {
    const [createFolderDropdown, setCreateFolderDropdown] = useState(true);
    const [folderName, setFolderName] = useState();

    const handleSubmit = () => {
        if (folderName === "") {
            Alert.alert("Error", "Folder name can't be empty");
          }
          if (folderName != "") {
            handlesubmitButton(folderName);
            setFolderName("");
          }
    }

    return (
        <View style={styles.mainView}>

            <TouchableOpacity style={styles.mainButton} onPress={() => { setCreateFolderDropdown(!createFolderDropdown) }}>
                <Text style={styles.text}>{dropdownButtonTitle}</Text>
            </TouchableOpacity>

            <View style={styles.container}>
                <Collapsible collapsed={createFolderDropdown}>
                    <TextInput
                        style={styles.textInput}
                        value={folderName}
                        placeholder={placeholder}
                        onChangeText={(value) => setFolderName(value)}
                    />
                    <TouchableOpacity style={styles.mainButton} onPress={handleSubmit}>
                        <Text style={styles.text2}>{submitButtonTitle}</Text>
                    </TouchableOpacity>
                </Collapsible>
            </View>

        </View >
    );
}

const styles = StyleSheet.create({
    mainView: {
        justifyContent: 'center',
        width: '100%'
    },
    mainButton: {
        paddingTop: 7,
        paddingBottom: 5,
        paddingLeft: 3,
        width: '100%',
        alignItems: 'flex-start'
    },
    text: {
        fontSize: 20
    },
    text2: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    container: {
        
    },
    textInput: {
        backgroundColor: '#dddddd',
        borderRadius: 10,
        width: '100%',
        height: 50,
        fontSize: 15,
        paddingLeft: 10
      }
});

export default SubmitDropdown;
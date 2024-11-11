import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ContentItem = ({
  fileId,
  folderId,
  fileTitle,
  iconName,
  color,
  fileContent,
  handleFile,
  handleDelete }) => {

  const propsDelete = () => {
    handleDelete(folderId, fileId);
  }
  const propsHandleFile = () => {
    handleFile(fileTitle, fileContent);
  }

  return (
    <View style={styles.fileView}>

      <TouchableOpacity style={styles.fileButton} onPress={propsHandleFile}>
        <FontAwesome size={23} name={iconName} color={color} />
        <Text style={styles.text} numberOfLines={1}>{fileTitle}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={propsDelete}>
        <FontAwesome size={27} name="trash-o" color="#171717" />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  fileView: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 15,
    paddingLeft: 7,
    paddingBottom: 15,
    paddingTop: 15,
    alignItems: 'center'
  },
  text: {
    overflow: 'hidden',
    fontSize: 17,
    paddingLeft: 3
  },
  fileButton: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  deleteButton : {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  }
});

export default ContentItem;
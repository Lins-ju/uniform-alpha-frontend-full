import React, { useState, memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ContentBox = ({ 
  collapsibleTitle, 
  handlePressAdd, 
  handlePressDelete,
  children,
  folderId
 }) => {
  const [boxDropdown, setBoxDropdown] = useState(true);

  const handleDropdown = () => {
    setBoxDropdown(!boxDropdown)
  }
  
  const propsAdd = () => {
    handlePressAdd(folderId);
  }

  const propsDelete = () => {
    handlePressDelete(folderId);
  }

  return (
    <SafeAreaView style={{ width: '100%' }}>

      <View style={{ width:'100%', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.button} onPress={handleDropdown}>
          <Text style={styles.text}>{collapsibleTitle}</Text>

          <TouchableOpacity style={styles.buttonRow} onPress={propsAdd}>
            <FontAwesome size={25} name="plus-circle" color="#171717" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRow} onPress={propsDelete}>
            <FontAwesome size={25} name="minus-circle" color="#171717" />
          </TouchableOpacity>

        </TouchableOpacity>
      </View>
      <Collapsible collapsed={boxDropdown} style={styles.collapsible}>
        <View style={styles.filesView}>
          {children}
        </View>
      </Collapsible>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  collapsible: {
    backgroundColor: '#e0e0e0',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    minWidth: '90%'
  },
  filesView: {
    height: '100%',
    width: '100%'
  },
  text: {
    position: 'absolute',
    paddingHorizontal: 5,
    fontSize: 25,
    bottom: 8
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    width: '100%',
    paddingVertical: 10
  },
  buttonRow: {
    justifyContent: 'center',
    left: 202,
    marginLeft: 60
  }
});

export default ContentBox;
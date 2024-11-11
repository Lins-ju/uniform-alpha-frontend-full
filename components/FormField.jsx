import { useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

const FormField = ({
  isPassword,
  value,
  placeholder,
  handleChangeText
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.textInput}
        value={value}
        placeholder={placeholder}
        onChangeText={handleChangeText}
        secureTextEntry={isPassword === true && !showPassword}
      />

      {isPassword === true && (
        <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? <FontAwesome size={22} name="eye" color={"#363636"} /> : <FontAwesome size={22} name="eye-slash" color={"#363636"} />}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    justifyContent: 'center'
  },
  textInput: {
    backgroundColor: '#dddddd',
    borderRadius: 10,
    padding: 12,
    minWidth: '100%',
    fontSize: 15,
    marginBottom: 5
  },
  title: {
    fontWeight: 'semibold',
    fontSize: 15,
    paddingLeft: 3
  },
  eyeButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    width: 45
  }
});

export default FormField;

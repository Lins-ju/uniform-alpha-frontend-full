import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

const CustomButton = ({ buttonTitle, handlePress, isLoading }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress} disabled={isLoading}>
        <Text style={styles.text}>{buttonTitle}</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242322',
    borderWidth: 1,
    borderRadius: 20,
    width: 250,
    height: 40
  },
  text: {
    color: 'white'
  }
});

export default CustomButton;

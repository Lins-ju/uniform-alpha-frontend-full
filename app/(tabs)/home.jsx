import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Redirect, router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from '../../lib/authapi';
import { useGlobalContext } from "../../context/GlobalProvider";

export default function HomeScreen() { //Async is fucking me getting me stuck
  const { setUser, setIsLogged } = useGlobalContext();

  const deleteSession = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  }

  return (
    <SafeAreaView style={{
      minHeight: Dimensions.get("window").height,
      minWidth: Dimensions.get("window").width,
      flex: 0,
      backgroundColor: '#eeeeee'
    }}>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.textView}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.text}>
            This app in development yet, please be aware there might be
            bugs and errors!
          </Text>
          <Text style={styles.text}>
            Mind this and report everything to me, the developer.
            Click on Shared Files in the tab and i hope it's a good staying for you!
          </Text>
        </View>

        <CustomButton buttonTitle="Sign Out of your account" handlePress={deleteSession}></CustomButton>

      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#eeeeee'
  },
  textView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%'
  },
  title: {
    fontSize: 30,
    marginBottom: 10
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center'
  }
});

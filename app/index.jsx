import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { ScrollView, View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Loader } from "../components";
import { CustomButton } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import { images } from "../imports";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView style={{
      minHeight: Dimensions.get("window").height,
      minWidth: Dimensions.get("window").width,
      flex: 0,
      backgroundColor: '#eeeeee'
    }}>
      <Loader isLoading={loading} />

        <ScrollView
        contentContainerStyle={{
          height: "100%",
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#eeeeee'
        }}
      >
        <View style={styles.imageView}>
          <Image source={images.indexFolder} resizeMode="contain" style={styles.image} />
          <Text style={styles.title}>UniArchive</Text>
          <Text style={styles.textBelowTitle}>Organizing documents but faster and easier!</Text>
        </View>

        <View style={styles.container}>
          <CustomButton buttonTitle="Get Started" handlePress={() => router.push('/sign-in')} />
        </View>

      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: 'space-evenly'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    height: '80%',
    width: '80%'
  },
  imageView: {
    height: 100,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100
  },
  textBelowTitle: {
    fontSize: 17,
    textAlign: 'center'
  }
})

export default Welcome;

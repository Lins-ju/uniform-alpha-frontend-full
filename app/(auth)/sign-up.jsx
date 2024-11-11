import { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from "../../context/GlobalProvider";
import { Link, router } from "expo-router";
import FormField from '../../components/FormField';
import CustomButton from "../../components/CustomButton";
import { registerUser } from "../../lib/authapi";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const checkSubmit = async () => {
    if (form.username === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    if (form.password === form.confirmPassword && form.username != "") {
      await submit();
    }
    if (form.password != form.confirmPassword) {
      Alert.alert("Error", "Passwords does not match");
    }
  }

  const submit = async () => {
    if (isPasswordEqual === true) {
      setSubmitting(true);
      try {
        const result = await registerUser(form.username, form.password);
        setUser(result);
        setIsLogged(true);


        router.replace("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView style={{
      minHeight: Dimensions.get("window").height,
      minWidth: Dimensions.get("window").width,
      flex: 0,
      backgroundColor: '#eeeeee'
    }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.textBelowTitle}>Create a new account to get started!</Text>
        </View>
        <View style={styles.formView}>
          <FormField
            value={form.userName}
            placeholder="Enter your name"
            handleChangeText={(value) => { setForm({ ...form, username: value }) }} />

          <FormField
            isPassword={true}
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(value) => { setForm({ ...form, password: value }) }} />

          <FormField
            isPassword={true}
            value={form.confirmPassword}
            placeholder="Confirm your password"
            handleChangeText={(value) => { setForm({ ...form, confirmPassword: value }) }} />

          {isSubmitting ? <CustomButton buttonTitle="Attempting To Sing Up" handlePress={() => { }} isLoading={true} /> : <CustomButton buttonTitle="Create Account" handlePress={checkSubmit} isLoading={false} />}
        </View>

        <View style={styles.titleBox}>
          <Text>Don't have an account?
            {" "}
            <Link href="/sign-in" style={styles.link}>Login Here!</Link>
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formView: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%'
  },
  titleBox: {
    flexDirection: 'column',
    minWidth: 350,
    minHeight: 95,
    marginBottom: 30,
    marginTop: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  textBelowTitle: {
    fontSize: 15,
    marginTop: 13
  },
  link: {
    textDecorationLine: 'underline',
    fontSize: 15
  }
});

export default SignUp;
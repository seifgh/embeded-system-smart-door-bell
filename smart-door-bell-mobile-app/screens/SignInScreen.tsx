import { StatusBar } from "expo-status-bar";
import { FC, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { apiLogin } from "../api";
import Button from "../components/utilities/Button";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { useStore } from "../store/StoreContext";
import { RootStackScreenProps } from "../types";
import getImageAutoHeightDimension from "../utils/getImageAutoHeightDimention";

const SignInScreen: FC<RootStackScreenProps<"SignIn">> = ({ navigation }) => {
  const {
    actions: { setUser },
  } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    if (email && password) {
      apiLogin(email, password)
        .then((user) => {
          setUser(user);
          navigation.push("Root");
        })
        .catch((err) => {
          console.log({ err });
          Alert.alert("Error", "Email and password do not match!");
        });
    } else {
      Alert.alert("Error", "Please enter your email and password");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("./../assets/images/logo.png")}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.desc}>
          Please connect to your account to continue.
        </Text>

        <View>
          {/* <Text style={styles.formLabel}>Email</Text> */}
          <TextInput
            selectionColor={Colors.tint}
            style={styles.formInput}
            placeholder="Enter your email"
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.formInput}
            secureTextEntry={true}
            selectionColor={Colors.tint}
            placeholder="Enter your password"
            onChangeText={setPassword}
          />

          <Button
            type="pr"
            iconName="log-in-outline"
            style={{
              marginTop: 12,
            }}
            onPress={() => login()}
          >
            Sign in
          </Button>
        </View>
      </View>
      <StatusBar animated style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: Colors.tint,
  },
  logo: {
    ...getImageAutoHeightDimension(310, 145, Layout.screen.width * 0.8),
  },
  logoContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: Colors.text,
    fontSize: 42,
    fontWeight: "bold",
  },
  desc: {
    color: Colors.desc,
    marginBottom: 24,
  },
  separator: {
    marginTop: 24,
    marginBottom: 12,
    height: 1,
    width: "100%",
    backgroundColor: Colors.gray,
  },
  form: {
    justifyContent: "flex-end",
    width: "100%",
    padding: 32,
    backgroundColor: "white",
    borderTopLeftRadius: 32,
  },
  formInput: {
    height: 52,
    padding: 8,
    paddingLeft: 12,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.5,

    elevation: 0.2,
  },
  formLabel: {
    marginLeft: 2,
  },
});
export default SignInScreen;

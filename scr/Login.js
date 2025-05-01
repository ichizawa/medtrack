import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView,

} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const window_width = Dimensions.get("window").width;
const window_height = Dimensions.get("window").height;


export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [dimensions, setDimensions] = useState({
    window_width: Dimensions.get("window").width,
    window_height: Dimensions.get("window").height,
  });

  // Handle screen rotation and size changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({
        window_width: window.width,
        window_height: window.height,
      });
    });

    return () => subscription?.remove();
  }, []);

  const handleLogin = () => {
    // For static login, we'll just navigate to Home
    // You can still call the login function if you want to maintain the context
    login(email, password);
    // navigation.navigate('Home');
  };

  // Determine if we're on a tablet/desktop or phone based on width
  const isLargeScreen = dimensions.window_width > 768;

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />

          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headerContainer}>
              <View style={styles.motorcycleContainer}>
                <Image
                  source={require("../assets/login/login_logo.png")}
                  
                  style={styles.LottieAnimation}
                />
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor="#ccc"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor="#ccc"
                  secureTextEntry
                />
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
              <View style={styles.signup}>
                <Text
                  style={{ color: "#cccccc", fontSize: 12, marginRight: 5 }}
                >
                  Don't have an account?
                </Text>
                <TouchableOpacity
                 onPress={() => navigation.navigate("Register")}
                >
                  <Text
                    style={{
                      color: "#0288D1",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    width: "100%",
    height: 290,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  motorcycleContainer: {
    position: "absolute",
    bottom: 10,
    width: 400,
    height: 180,
    zIndex: 10,
  },
  LottieAnimation: {
    width: "100%",
    height: "100%",
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingTop: 100,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#0288D1",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#0288D1",
    fontSize: 12,
  },
  signup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",             
    marginTop: 20, 
  },
});

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

// Get dimensions but we'll also handle orientation changes
const window_width = Dimensions.get("window").width;
const window_height = Dimensions.get("window").height;

export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
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
    login(username, password);
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
          <StatusBar barStyle="light-content" backgroundColor="#0288D1" />
          
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={[
              styles.headerContainer, 
              isLargeScreen && styles.headerContainerLarge
            ]}>
              <View style={[
                styles.blobShape,
                isLargeScreen && styles.blobShapeLarge
              ]}>
                <Text style={[
                  styles.headerTitle,
                  isLargeScreen && styles.headerTitleLarge
                ]}>Welcome back,</Text>
                <Text style={[
                  styles.headerSubtitle,
                  isLargeScreen && styles.headerSubtitleLarge
                ]}>Log In!</Text>
                {/* Removed the logoCircle component that contained the loading icon */}
              </View>
            </View>

            <View style={[
              styles.formContainer,
              isLargeScreen && styles.formContainerLarge
            ]}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  style={[
                    styles.input,
                    isLargeScreen && styles.inputLarge
                  ]}
                  // value={username}
                  onChangeText={setUsername}
                  placeholder="Enter your username"
                  placeholderTextColor="#AED5EA"
                  // keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={[
                    styles.input,
                    isLargeScreen && styles.inputLarge
                  ]}
                  // value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#AED5EA"
                  secureTextEntry
                />
              </View>

              <View style={styles.row}>
                <TouchableOpacity 
                  style={styles.rememberMeContainer} 
                  onPress={() => setIsRememberMe(!isRememberMe)}
                >
                  <View style={[styles.checkbox, isRememberMe && styles.checkboxChecked]}>
                    {isRememberMe && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.rememberMe}>Remember me</Text>
                </TouchableOpacity>
                
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.loginButton,
                  isLargeScreen && styles.loginButtonLarge
                ]}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Log in</Text>
              </TouchableOpacity>

              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.registerLink}>Sign up</Text>
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
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    width: '100%',
  },
  headerContainerLarge: {
    maxHeight: 300,
  },
  blobShape: {
    backgroundColor: '#0288D1',
    height: 230,
    borderBottomRightRadius: 600,
    borderBottomLeftRadius: -10,
    paddingTop: 70,
    paddingLeft: 30,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  blobShapeLarge: {
    height: 280,
    paddingTop: 100,
    paddingLeft: 60,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
  },
  headerTitleLarge: {
    fontSize: 26,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 5,
  },
  headerSubtitleLarge: {
    fontSize: 48,
  },
  logoCircle: {
    position: 'absolute',
    bottom: -25,
    left: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoCircleLarge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    bottom: -35,
    left: 60,
  },
  logoIcon: {
    fontSize: 24,
    color: '#0288D1',
  },
  logoIconLarge: {
    fontSize: 32,
  },
  formContainer: {
    paddingHorizontal: 30,
    marginTop: 80,
    width: '100%',
  },
  formContainerLarge: {
    marginTop: 120,
    alignSelf: 'center',
    maxWidth: 500,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#7E6D8D',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#AED5EA',
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
  },
  inputLarge: {
    fontSize: 18,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#AED5EA',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0288D1',
    borderColor: '#0288D1',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rememberMe: {
    color: '#7E6D8D',
    fontSize: 14,
  },
  forgotPassword: {
    color: '#0288D1',
    fontWeight: '600',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#0288D1',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonLarge: {
    paddingVertical: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  registerText: {
    color: '#7E6D8D',
    fontSize: 14,
  },
  registerLink: {
    color: '#0288D1',
    fontWeight: '600',
    marginLeft: 5,
    fontSize: 14,
  },
});



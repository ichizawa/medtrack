import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { FontAwesome } from "@expo/vector-icons"; //
import { AuthContext } from "../../context/AuthContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const window_height = Dimensions.get("window").height;
export default function EditProfile({ navigation }) {
  const { register } = useContext(AuthContext);

  const [isFnameFocussed, setFnameFocused] = useState(false);
  const [isLnameFocused, setLnameFocused] = useState(false);
  const [isUsernameFocused, setUsernameFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [isConfirmPassFocused, setConfirmPassFocused] = useState(false);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [form, setFormData] = useState({
    stud_id: "",
    fname: "",
    lname: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <SafeAreaProvider style={{ flexGrow: 1, backgroundColor: "#fff" }}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.title_section}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              {" "}
              <Image
                source={require("../../../assets/left-arrow.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>

            <View style={styles.title_center_wrapper}>
              <Text style={styles.greeting_title_text}>
                Edit <Text style={{ color: "#0288D1" }}>Profile</Text>
              </Text>
            </View>
          </View>

          <View style={styles.form_section}>
            <View>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Student Information
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={20} style={styles.icon} />
              <TextInput
                style={[
                  styles.text_input,
                  { borderColor: isFnameFocussed ? "#0288D1" : "#ECE2E2" },
                ]}
                onFocus={() => setFnameFocused(true)}
                onBlur={() => setFnameFocused(false)}
                placeholder="Student ID"
                onChangeText={(text) => setFormData({ ...form, stud_id: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={20} style={styles.icon} />
              <TextInput
                style={[
                  styles.text_input,
                  { borderColor: isFnameFocussed ? "#0288D1" : "#ECE2E2" },
                ]}
                onFocus={() => setFnameFocused(true)}
                onBlur={() => setFnameFocused(false)}
                placeholder="First Name"
                onChangeText={(text) => setFormData({ ...form, fname: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={20} style={styles.icon} />
              <TextInput
                style={[
                  styles.text_input,
                  { borderColor: isLnameFocused ? "#0288D1" : "#ECE2E2" },
                ]}
                onFocus={() => setLnameFocused(true)}
                onBlur={() => setLnameFocused(false)}
                placeholder="Last Name"
                onChangeText={(text) => setFormData({ ...form, lname: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" size={16} style={styles.icon} />
              <TextInput
                style={[
                  styles.text_input,
                  { borderColor: isEmailFocused ? "#0288D1" : "#ECE2E2" },
                ]}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="Phone"
                onChangeText={(text) => setFormData({ ...form, phone: text })}
              />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" size={16} style={styles.icon} />
              <TextInput
                style={[
                  styles.text_input,
                  { borderColor: isEmailFocused ? "#0288D1" : "#ECE2E2" },
                ]}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="Email"
                onChangeText={(text) => setFormData({ ...form, email: text })}
              />
            </View>
            <View>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>Account</Text>
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={20} style={styles.icon} />
              <TextInput
                style={[
                  styles.text_input,
                  { borderColor: isUsernameFocused ? "#0288D1" : "#ECE2E2" },
                ]}
                onFocus={() => setUsernameFocused(true)}
                onBlur={() => setUsernameFocused(false)}
                placeholder="Username"
                onChangeText={(text) =>
                  setFormData({ ...form, username: text })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={20} style={styles.icon} />
              <TextInput
                style={[
                  styles.text_input,
                  { borderColor: isPasswordFocused ? "#0288D1" : "#ECE2E2" },
                ]}
                secureTextEntry={true}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="Password"
                onChangeText={(text) =>
                  setFormData({ ...form, password: text })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome
                name="lock"
                size={20}
                color="#808080"
                style={styles.icon}
              />
              <TextInput
                style={[
                  styles.text_input,
                  { borderColor: isConfirmPassFocused ? "#0288D1" : "#ECE2E2" },
                ]}
                secureTextEntry={true}
                onFocus={() => setConfirmPassFocused(true)}
                onBlur={() => setConfirmPassFocused(false)}
                placeholder="Confirm Password"
                onChangeText={(text) =>
                  setFormData({ ...form, confirmPassword: text })
                }
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
              paddingHorizontal: 10
            }}
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.cancel_button}
                onPress={() => {
                  
                }}
              >
                <Text style={styles.cancel_button_text}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.auth_button}
                onPress={() => {
                  register(form);
                }}
              >
                <Text style={styles.auth_button_text}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  text_input: {
    flex: 1,
    height: 50,
    backgroundColor: "#F9F9F9",
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ECE2E2",
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
    margin: 10,
  },
  icon: {
    marginRight: 10,
    color: "#0288D1",
  },
  title_section: {
    height: window_height * 0.1,
    padding: 15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  title_center_wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },

  greeting_title_text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  form_section: {
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
  },
  cancel_button: {
    height: 50,
    borderColor: "#0288D1",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  
  cancel_button_text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },
  
  auth_button: {
    height: 50,
    backgroundColor: "#0288D1",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  
  auth_button_text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  
  register_button_text: {
    color: "#0288D1",
    fontSize: 13,
    fontWeight: "bold",
  },
  auth_button_text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffff",
  },
  bottom_section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
});

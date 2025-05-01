import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";

export default function Profile({ navigation }) {
  const { userInfo, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => logout() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0288D1" />
      <View style={styles.headerBackground}>
        <Image
          source={require("../../../assets/login/prof_bg.jpg")}
          style={{ height: 250 }}
        />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.imageBackground}></View>
          </View>

          <View style={styles.userInfoContainer}>
            <Text style={styles.name}>
              {userInfo.first_name} {userInfo.last_name}
            </Text>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statIconContainer}>
              <View
                style={{ flexDirection: "row", gap: 30, alignItems: "center" }}
              >
                <Text style={{ fontWeight: "900", color: "#fff",  width: 80, }}>
                  Student ID:{" "}
                </Text>
                <Text style={styles.info}>{userInfo.student_id}</Text>
              </View>
              <View
                style={{ flexDirection: "row", gap: 30, alignItems: "center" }}
              >
                <Text style={{ fontWeight: "900", color: "#fff",  width: 80, }}>
                  Username:{" "}
                </Text>
                <Text style={styles.info}>{userInfo.username}</Text>
              </View>
              <View
                style={{ flexDirection: "row", gap: 30, alignItems: "center" }}
              >
                <Text style={{ fontWeight: "900", color: "#fff",  width: 80, }}>
                  Password:{" "}
                </Text>
                <Text style={styles.info}>
                  {"*".repeat(Math.min(userInfo.password.length, 10))}
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", gap: 30, alignItems: "center" }}
              >
                <Text style={{ fontWeight: "900", color: "#fff",  width: 80, }}>
                  Email:{" "}
                </Text>
                <Text style={styles.info}>{userInfo.email}</Text>
              </View>
              <View
                style={{ flexDirection: "row", gap: 30, alignItems: "center" }}
              >
                <Text style={{ fontWeight: "900", color: "#fff",  width: 80, }}>
                  Contact:{" "}
                </Text>
                <Text style={styles.info}>{userInfo.phone}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={30} color="#d10220" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Ionicons name="open-outline" size={22} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  headerBackground: {
    width: "auto",
    height: 70,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    paddingTop: 60,
    marginTop: 60,
    height: "auto",
  },
  avatarContainer: {
    position: "absolute",
    top: -50,
    alignSelf: "center",
    alignItems: "center",
    zIndex: 10,
  },
  imageBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
  },
  info: {
    fontSize: 14,
    color: "#fff",
    marginTop: 4,
    marginBottom: 8,
  },
  statusContainer: {
    backgroundColor: "#4ade80",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 5,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statIconContainer: {
    flex: 1,
    width: 290,
    height: "áuto",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#0288D1",
    justifyContent: "center",
  },
  statDate: {
    fontSize: 14,
    color: "#fff",
  },
  statValue: {
    fontSize: 14,
    color: "#fff",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 90,
  },
  logoutText: {
    color: "#d10220",
    fontSize: 16,
    fontWeight: "600",
  },
  editButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

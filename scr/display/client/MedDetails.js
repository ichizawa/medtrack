import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from "react-native";

export default function MedDetails({ navigation }) {
  const [dimensions, setDimensions] = useState({
    window_width: Dimensions.get("window").width,
    window_height: Dimensions.get("window").height,
  });
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0288D1" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.goBack}>
              <Image
                source={require("../../../assets/left-arrow.png")}
                style={styles.goBackIcon}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20 }}>Medical Information</Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.cardBody}>
            {/* Medical Information */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Left side*/}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ marginLeft: 10, fontSize: 20, fontWeight: "bold" }}
                >
                  Annual Physical Exam
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Left side*/}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                    fontStyle: "italic",
                    color: "#0288D1",
                  }}
                >
                  Medical Certificate
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Left side*/}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../../assets/calendar_entry.png")}
                  style={{ width: 17, height: 17 }}
                  resizeMode="contain"
                />
                <Text style={{ marginLeft: 10, fontSize: 16 }}>
                  Mar 11, 2025
                </Text>
              </View>

              {/* Right side */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../../assets/expiry.png")}
                  style={{ width: 17, height: 17 }}
                  resizeMode="contain"
                />
                <Text style={{ marginLeft: 10, fontSize: 16 }}>
                  Sept 27, 2025
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Left side*/}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../../assets/clinic.png")}
                  style={{ width: 17, height: 17 }}
                  resizeMode="contain"
                />
                <Text style={{ marginLeft: 10, fontSize: 18 }}>
                  Dr. James Smith
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Left side*/}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                
                <Text style={{ marginLeft: 29, fontSize: 15, color:"#cfcfcf" }}>
                  Davao Doctors Hospital
                </Text>
              </View>
            </View>
            {/* Notes */}
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                alignItems: "center",
                marginTop: 18,
              }}
            >
              Notes
            </Text>
            <View style={styles.notes}>
              <Text>Notes here...</Text>
            </View>
            {/* Attachments */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 10,
  },
  goBack: {
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 5,
  },
  goBackIcon: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  cardBody: {
    flex: 1,
    height: "auto",
    width: "auto",
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    padding: 15,
  },
  notes: {
    flex: 1,
    width: 300,
    height: 200,
    borderColor: "#0288D1",
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    padding: 5,
  },
});

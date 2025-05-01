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
      <StatusBar barStyle="light-content" backgroundColor="#00806A" />
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
            {/* Status Bar */}
            <View style={styles.statusContainer}>
              <View style={styles.progressBar}>
                <View style={styles.progressFilled}></View>
              </View>
              <Text style={styles.statusText}>Completed</Text>
            </View>

            {/* Medical Information */}
            <View style={styles.medicalInfoContainer}>
              <Text style={styles.title}>Annual Physical Exam</Text>
              <Text style={styles.subtitle}>Medical Certificate</Text>

              <View style={styles.dateContainer}>
                <View style={styles.dateItem}>
                  <Text style={styles.dateLabel}>Entry Date:</Text>
                  <Text style={styles.dateValue}>January 11, 2025</Text>
                </View>
                <View style={styles.dateItem}>
                  <Text style={styles.dateLabel}>Expiry Date:</Text>
                  <Text style={styles.dateValue}>June 3, 2025</Text>
                </View>
              </View>

              {/* Attachments */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Attachments</Text>
                <View style={styles.attachmentsContainer}>
                  <View style={styles.attachmentItem}></View>
                  <View style={styles.attachmentItem}></View>
                </View>
              </View>

              {/* Remarks */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Remarks</Text>
                <View style={styles.remarksContainer}></View>
              </View>
            </View>
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
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    width: 150,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginRight: 10,
  },
  progressFilled: {
    height: "100%",
    width: "100%",
    backgroundColor: "#0288D1",
    borderRadius: 4,
  },
  statusText: {
    color: "#0288D1",
    fontWeight: "bold",
  },
  medicalInfoContainer: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#0288D1",
    fontStyle: "italic",
    marginBottom: 15,
  },
  dateContainer: {
    marginVertical: 15,
  },
  dateItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  dateLabel: {
    width: 80,
    color: "#757575",
  },
  dateValue: {
    fontWeight: "500",
    color: "#0288D1",
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 10,
  },
  attachmentsContainer: {
    flexDirection: "row",
  },
  attachmentItem: {
    width: 80,
    height: 80,
    backgroundColor: "#e0e0e0",
    marginRight: 10,
    borderRadius: 4,
  },
  remarksContainer: {
    height: 100,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    padding: 10,
  },
});

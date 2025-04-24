import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function BrowseExpiration({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Row Wrapper for Back Button and Search Bar */}
      <View style={styles.rowContainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#888" />
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search here"
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
          <Ionicons
            name="filter"
            size={20}
            color="#888"
            style={styles.filterIcon}
          />
        </View>
      </View>

      {/* ScrollView for Cards */}
      <ScrollView>
        {/* First Blood Test Result Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.recordTitle}>Blood Test Result</Text>
              <Text style={styles.hospitalName}>Davao Adventist Hospital</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.monthText}>April</Text>
              <Text style={styles.dayText}>10</Text>
            </View>
          </View>
          <Text style={styles.expiryText}>Expires in 2 days</Text>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.viewFileButton}>
              <Text style={styles.viewFileText}>View File</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reuploadButton}>
              <Text style={styles.reuploadText}>Re-upload</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Second Blood Test Result Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.recordTitle}>Blood Test Result</Text>
              <Text style={styles.hospitalName}>Davao Adventist Hospital</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.monthText}>April</Text>
              <Text style={styles.dayText}>13</Text>
            </View>
          </View>
          <Text style={styles.expiryTextOrange}>Expires in 5 days</Text>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.viewFileButton}>
              <Text style={styles.viewFileText}>View File</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reuploadButton}>
              <Text style={styles.reuploadText}>Re-upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f2f2f2",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  goBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    marginRight: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 45,
    flex: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  filterIcon: {
    marginLeft: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 3,
  },
  hospitalName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  expiryText: {
    fontSize: 14,
    color: "#FF3B30",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 8,
  },
  expiryTextOrange: {
    fontSize: 14,
    color: "#FF9500",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 8,
  },
  dateContainer: {
    alignItems: "center",
  },
  monthText: {
    fontSize: 12,
    color: "#666",
  },
  dayText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
  },
  cardActions: {
    flexDirection: "row",
    marginTop: 5,
  },
  viewFileButton: {
    flex: 1,
    paddingVertical: 6,
    alignItems: "center",
    borderRightWidth: 0,
  },
  reuploadButton: {
    flex: 1,
    paddingVertical: 6,
    alignItems: "center",
  },
  viewFileText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  reuploadText: {
    color: "#666",
    fontSize: 14,
  },
  viewFileText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  reuploadText: {
    color: "#666",
    fontSize: 14,
  },

  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  expiringsoon: {
    backgroundColor: "#E4965A",
  },
  expired: {
    backgroundColor: "#FF0000",
  },
  completed: {
    backgroundColor: "#66C173",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#fff",
  },
  viewMore: {
    marginTop: 5,
    fontSize: 12,
    color: "#007BFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  addfile: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#007BFF",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  cardImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
    borderRadius: 10,
  },
  cardProgress: {
    height: 130,
    width: 330,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
  },
});

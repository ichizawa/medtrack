import React, { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL, processResponse } from "../../config";

const { width, height } = Dimensions.get("window");

export default function BrowseExpiration({ navigation }) {
  const [expiration, setExpiration] = useState([]);
  const { userInfo } = useContext(AuthContext);

  const getExpiration = () => {
    try {
      fetch(`${BASE_URL}get-expiration-record/${userInfo.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(processResponse)
        .then((res) => {
          const { statusCode, data } = res;
          console.log(data);
          setExpiration(data.records);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExpiration();
  }, []);

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
        {/* Cards */}
        {expiration.length > 0 ? (
          expiration.map((item, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.recordTitle}>{item.document_name}</Text>
                  <Text style={styles.hospitalName}>
                    {item.document_type}
                  </Text>
                </View>
                <View style={styles.dateContainer}>
                  <Text style={styles.monthText}>
                    {new Date(item.entry_date).toLocaleString('en-US', { month: 'short' })}
                  </Text>
                  <Text style={styles.dayText}>{new Date(item.entry_date).getDate()}</Text>
                </View>
              </View>
              <Text style={styles.expiryText}>
                {item.expires_in < 0 ? "Already expired" : `Expires in ${item.expires_in} day/s`}
              </Text>
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.viewFileButton}>
                  <Text style={styles.viewFileText}>View File</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reuploadButton}>
                  <Text style={styles.reuploadText}>Re-upload</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No expiration records found
            </Text>
          </View>
        )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});


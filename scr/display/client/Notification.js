import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL, processResponse } from "../../config";

export default function Notifications() {
  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  

  const getRecords = () => {
    try {
      fetch(`${BASE_URL}get-medical-records/${userInfo.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(processResponse)
        .then((res) => {
          const { statusCode, data } = res;
          if (statusCode === 200) {
            setData(data.records);

            const now = new Date();
            const generatedNotifications = data.records.map((record) => {
              const expDate = new Date(record.exp_date + "T12:00:00");
              const entryDate = new Date(record.entry_date + "T12:00:00");
              const daysUntilExp = (expDate - now) / (1000 * 60 * 60 * 24);

              let status = "";
              let message = "";

              if (daysUntilExp < 0) {
                status = "expired";
                message = `The record ${record.document_type} expired on ${expDate.toLocaleDateString()}.`;
              } else if (daysUntilExp <= 7) {
                status = "expiring soon";
                message = `The record ${record.document_type} will expire soon (on ${expDate.toLocaleDateString()}).`;
              } else {
                status = "pending";
                message = `The record ${record.document_type} is valid until ${expDate.toLocaleDateString()}.`;
              }

              return {
                id: record.id,
                status,
                message,
                exp_date: record.exp_date,
                timestamp: now.toLocaleString(),
              };
            });

            setNotifications(generatedNotifications);
          } else {
            setData([]);
            setNotifications([]);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  const filteredNotifications = notifications.filter((n) =>
    n.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search notifications..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <ScrollView
        style={styles.notificationList}
        showsVerticalScrollIndicator={false}
      >
        {filteredNotifications.length === 0 ? (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: "#888", fontSize: 16 }}>
              No notifications available
            </Text>
          </View>
        ) : (
          filteredNotifications.map((notification) => (
            <View
              key={notification.id}
              style={[
                styles.notificationCard,
                styles[notification.status.replace(" ", "")],
              ]}
            >
              <View style={styles.notificationContent}>
                <Ionicons
                  name={
                    notification.status === "expiring soon"
                      ? "alert-circle"
                      : notification.status === "expired"
                      ? "close-circle"
                      : "time"
                  }
                  size={30}
                  color={
                    notification.status === "expiring soon"
                      ? "#ff9800"
                      : notification.status === "expired"
                      ? "#f44336"
                      : "#2196f3"
                  }
                />

                <View style={styles.notificationTextContainer}>
                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>
                  <Text style={styles.timestamp}>
                    {notification.timestamp}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerRow: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#01466c",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
  notificationList: {
    flex: 1,
  },
  notificationCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  expiringsoon: {
    backgroundColor: "#fff3e0",
  },
  expired: {
    backgroundColor: "#ffebee",
  },
  pending: {
    backgroundColor: "#e3f2fd",
  },
});
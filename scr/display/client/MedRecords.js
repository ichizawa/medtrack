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

export default function MedRecords({ navigation }) {
  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const getRecords = () => {
    try {
      fetch(`${BASE_URL}get-medical-records/${userInfo.id}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(processResponse)
        .then((res) => {
          const { statusCode, data } = res;
          console.log(data);
          if(statusCode == 200) {
            setData(data.records);
          }else{
            setData([]);
          }
          // setData(data.records);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <View style={styles.container}>
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

      <View style={styles.cardProgress}>
        <Text style={{ fontWeight: "600" }}>Medical Records Completion</Text>

        <Text style={{ fontSize: 14, marginTop: 8 }}>
          {data.length ?? 0} of 10 records completed
        </Text>
      </View>

      <View style={styles.recordsHeader}>
        <Text style={styles.headerTitle}>Medical Records</Text>
        <View style={styles.totalBadge}>
          <Text style={styles.totalText}>{data.length ?? 0}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {Array.isArray(data) && data.length === 0 ? (
          <View style={styles.noRecords}>
            <Text style={styles.noRecordsText}>No Records Found</Text>
          </View>
        ) : (
          data.map((data, i) => (
            // console.log(data),
            <View key={i} style={styles.card}>
              <View style={styles.cardTop}>
                <Image
                  source={require("../../../assets/doc_type/x-ray.png")}
                  style={styles.cardImage}
                />

                <View style={styles.cardInfo}>
                  <Text style={styles.recordTitle} numberOfLines={1}>
                    {data.document_type}
                  </Text>
                  <Text style={styles.recordDate}>{data.entry_date}</Text>
                  <Text style={styles.recordFile} numberOfLines={1}>
                    {data.file_name}
                  </Text>
                </View>

                <View
                  style={[
                    styles.statusTag,
                    styles[data.status.replace(/\s/g, "").toLowerCase()],
                  ]}
                >
                  <Text style={styles.statusText}>{data.status}</Text>
                </View>

                <MaterialIcons
                  name="more-vert"
                  size={22}
                  color="#444"
                  style={{ marginLeft: 5 }}
                />
              </View>

              <TouchableOpacity>
                <Text style={styles.viewMore}>View more</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addfile}
        onPress={() => navigation.navigate("NewMedicalRecord")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f2f2f2",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  filterIcon: {
    marginLeft: 8,
  },
  recordsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalBadge: {
    marginLeft: 10,
    backgroundColor: "#e1ecf4",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  totalText: {
    fontSize: 12,
    color: "#007BFF",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 10,
    marginTop: 5,
  },
  cardInfo: {
    flex: 1,
  },
  recordTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  recordDate: {
    fontSize: 11,
    color: "#666",
    fontWeight: "light",
    fontStyle: "italic",
  },
  recordFile: {
    fontSize: 14,
    color: "#007BFF",
    marginBottom: 5,
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

import React, { useContext, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Die
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL, processResponse } from "../../config";
import Pusher from "pusher-js";

const { width, height } = Dimensions.get("window");

export default function MedRecords({ navigation }) {
  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [showDropdownId, setShowDropdownId] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  const dropdownRef = useRef();
  const filterRef = useRef();

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
          if (statusCode == 200) {
            setData(data.records);
          } else {
            setData([]);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  

  useEffect(() => {
    getRecords();
    const pusher = new Pusher("a1d97d939eb60c02f4e0", { cluster: "ap1" });
    const channel = pusher.subscribe("my-record");
    channel.bind("upload-record", () => {
      getRecords();
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const filteredData =
    filterStatus === "All"
      ? data
      : data.filter(
          (item) =>
            item.status.replace(/\s/g, "").toLowerCase() ===
            filterStatus.toLowerCase()
        );

  const handleOutsidePress = () => {
    if (showDropdownId || showFilter) {
      setShowDropdownId(null);
      setShowFilter(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#000"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search record, status..."
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            onPress={() => {
              setShowFilter(!showFilter);
              setShowDropdownId(null);
            }}
          >
            <Ionicons
              name="filter"
              size={20}
              color="#000"
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>

        {showFilter && (
          <View style={styles.filterMenu} ref={filterRef}>
            {["All", "Expiringsoon", "Expired", "Completed"].map((status) => (
              <Pressable
                key={status}
                onPress={() => {
                  setFilterStatus(status);
                  setShowFilter(false);
                }}
              >
                <Text style={styles.option}>{status}</Text>
              </Pressable>
            ))}
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardProgress}>
            <Text style={{ fontWeight: "600", color: "#fff" }}>
              Medical Records Completion
            </Text>
            <Text style={{ fontSize: 14, marginTop: 8, color: "#fff" }}>
              {data.length ?? 0} of 10 records completed
            </Text>
          </View>

          <View style={styles.recordsHeader}>
            <Text style={styles.headerTitle}>Medical Records</Text>
            <View style={styles.totalBadge}>
              <Text style={styles.totalText}>{data.length ?? 0}</Text>
            </View>
            <TouchableOpacity
              style={styles.addfile}
              onPress={() => navigation.navigate("NewMedicalRecord")}
            >
              <Ionicons name="add" size={35} color="#0288D1" />
            </TouchableOpacity>
          </View>

          <View>
            {Array.isArray(filteredData) && filteredData.length === 0 ? (
              <View style={styles.noRecords}>
                <Text>No Data Found</Text>
              </View>
            ) : (
              filteredData.map((record, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => navigation.navigate("MedDetails")}
                >
                  <View style={styles.card}>
                    <View style={styles.cardTop}>
                      <Image
                        source={require("../../../assets/doc_type/x-ray.png")}
                        style={styles.cardImage}
                      />
                      <View style={styles.cardInfo}>
                        <Text style={styles.recordTitle} numberOfLines={1}>
                          {record.document_type}
                        </Text>
                        <Text style={styles.recordDate}>
                          {record.entry_date}
                        </Text>
                        <Text style={styles.recordFile} numberOfLines={1}>
                          {record.file_name}
                        </Text>
                      </View>

                      <View
                        style={[styles.statusTag, styles[record.status.replace(/\s/g, "").toLowerCase()]]}
                      >
                        <Text style={styles.statusText}>{record.status}</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() =>
                          setShowDropdownId(
                            showDropdownId === record.id ? null : record.id
                          )
                        }
                      >
                        <MaterialIcons
                          name="more-vert"
                          size={22}
                          color="#444"
                          style={{ marginLeft: 5 }}
                        />
                      </TouchableOpacity>

                      {showDropdownId === record.id && (
                        <View style={styles.dropdown} ref={dropdownRef}>
                          <Pressable
                            onPress={() => {
                              setShowDropdownId(null);
                              navigation.navigate("EditRecord", { record });
                            }}
                            style={styles.dropdownItem}
                          >
                            <Ionicons name="create" size={24} color="#0288D1" />
                          </Pressable>
                          <Pressable
                            onPress={() => {
                              setShowDropdownId(null);
                              alert("Delete pressed for " + record.id);
                            }}
                            style={styles.dropdownItem}
                          >
                            <Ionicons name="trash" size={24} color="#FF0000" />
                          </Pressable>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
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
    fontSize: 13,
    color: "#000",
    fontStyle: "italic",
  },
  filterIcon: {
    marginLeft: 8,
  },
  filterMenu: {
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 5,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: "absolute",
    top: 60,
    right: 15,
    zIndex: 99,
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
    backgroundColor: "#fae8f4",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  totalText: {
    fontSize: 12,
    color: "#d10288",
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
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
    borderRadius: 10,
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
    color: "#0288D1",
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
    color: "#fae8f4",
    textAlign: "center",
    fontWeight: "bold",
  },
  addfile: {
    width: 55,
    height: 55,
    top: 8,
    right: -100,
  },
  cardProgress: {
    height: 130,
    width: "auto",
    backgroundColor: "#0288D1",
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
  },
  LottieAnimation: {
    width: "50%",
    height: "50%",
    transform: [{ scale: 1.1 }],
  },
  dropdown: {
    position: "absolute",
    top: 25,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    elevation: 2,
    zIndex: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 75,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  option: {
    fontSize: 16,
    color: "#333",
    flexDirection: "row",
    alignItems: "center",
  },
});

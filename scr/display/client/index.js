import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  LayoutAnimation,
  UIManager,
  Platform,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL, processResponse } from "../../config";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const upcomingExpirations = [
  {
    name: "Blood Test Result",
    location: "Davao Adventist Hospital",
    date: "Apr 10, 2025",
    time: "10:00 AM",
    icon: require("../../../assets/doc_type/blood-test.png"),
  },
  {
    name: "Influenza Vaccine",
    location: "City Health Office",
    date: "Mon, May 5, 2025",
    time: "2:00 PM",
    icon: require("../../../assets/doc_type/vaccine.png"),
  },
  {
    name: "Urinalysis Result",
    location: "Southern Phils Medical Center",
    date: "Wed, May 15, 2025",
    time: "9:00 AM",
    icon: require("../../../assets/doc_type/urinalysis.png"),
  },
];

export default function Index() {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [expandedItem, setExpandedItem] = useState(null);
  const { width, height } = useWindowDimensions();
  const [dimensions, setDimensions] = useState({ width, height });
  
  const [records, setRecords] = useState(null); 
  const [counts, setCounts] = useState(null);
  // Handle screen rotation and size changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => subscription?.remove();
  }, []);

  const isTablet = dimensions.width >= 768;
  const cardWidth = isTablet ? dimensions.width * 0.4 : dimensions.width * 0.9;

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItem(expandedItem === id ? null : id);
  };

  const fetchDashboardData = () => {
    try {
      fetch(`${BASE_URL}get-medical-records/${userInfo.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then(processResponse).then((res) => {
        const { statusCode, data } = res;
        setRecords(data.records);
      });
    } catch (error) {
      console.log(error);
    }
  }

  // const records = [
  //   {
  //     id: "1",
  //     record_name: "Blood Test Result",
  //     expires: "Apr 25, 2025",
  //     entry: "Apr 25, 2025",
  //     document_type: "Pneumococcal Vaccine",
  //     status: "Pending",
  //     color: "#E4965A",
  //     note: "Hemoglobin: Normal\nWBC: Elevated\nPlatelet: Normal",
  //     attachment: "file.pdf",
  //     note: "Check not good",
  //   },
  //   {
  //     id: "2",
  //     record_name: "Hepatitis Vaccine",
  //     expires: "Dec 10, 2025",
  //     entry: "Dec 10, 2025",
  //     document_type: "CBC Result",
  //     status: "Complete",
  //     color: "#66C173",
  //     note: "Completed all 3 doses. No adverse reaction reported.",
  //     attachment: "file.pdf",
  //   },
  // ];

  const renderItem = ({ item }) => (
    <View style={styles.cardRecent}>
      <TouchableOpacity onPress={() => toggleExpand(item.id)}>
        <View style={styles.headerRow}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>{item.document_name}</Text>
            <Text
              style={{ color: item.color, fontWeight: "700", fontSize: 15 }}
            >
              {item.status}
            </Text>
          </View>

          <Image
            source={
              expandedItem === item.id
                ? require("../../../assets/arrow-up.png")
                : require("../../../assets/arrow-down.png")
            }
            style={styles.iconArrow}
          />
        </View>
        <Text>{item.document_type}</Text>
      </TouchableOpacity>

      {expandedItem === item.id && (
        <View style={styles.dropdown}>
          <Text style={styles.detailsLabel}>Details:</Text>
          <View style={{justifyContent: 'center', textAlign: 'center'}}>
            <Text style={styles.details}>{item.entry_date}</Text>
            <Text style={styles.details}>{item.exp_date}</Text>
            <Text style={styles.details}>{item.file_name}</Text>
            <Text style={styles.details}>{item.note}</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View File</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#2196F3" }]}
          >
            <Text style={styles.buttonTextW}>Re-upload</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const getInfoCard = () => {
    fetch(`${BASE_URL}dashboard/${userInfo.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(processResponse)
      .then((res) => {
        const { statusCode, data } = res;
        if (statusCode == 200) {
          setCounts(data.data);
        } else {
          setCounts(null);
        }
      });
  };

  useEffect(() => {
    fetchDashboardData();
    getInfoCard();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.headerTitle}>{userInfo.first_name}!</Text>
          </View>
        </View>

        <View style={[styles.summaryCard, { width: cardWidth }]}>
          <View style={[styles.cardPlaceholder, { width: "100%" }]}>
            <View style={styles.row}>
              <View style={styles.cardItem}>
                <View style={styles.iconCompletedBg}>
                  <Image
                    source={require("../../../assets/checkmark.png")}
                    style={styles.iconSumCard}
                  />
                </View>
                <Text style={styles.completedNumber}>
                  {counts?.completed ?? 0}
                </Text>
              </View>

              <View style={styles.cardItemRight}>
                <View style={styles.iconExpiredBg}>
                  <Image
                    source={require("../../../assets/time.png")}
                    style={styles.iconSumCard}
                  />
                </View>
                <Text style={styles.expiredNumber}>{counts?.expired ?? 0}</Text>
              </View>
            </View>
            <View style={styles.rowText}>
              <Text style={styles.label}>Completed records</Text>
              <Text style={styles.label}>Expired records</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.cardItem}>
                <View style={styles.iconTotalBg}>
                  <Image
                    source={require("../../../assets/archive.png")}
                    style={styles.iconSumCard}
                  />
                </View>
                <Text style={styles.totalNumber}>{counts?.total ?? 0}</Text>
              </View>
              <View style={styles.cardItemRight}>
                <View style={styles.iconPendingBg}>
                  <Image
                    source={require("../../../assets/deadline.png")}
                    style={styles.iconSumCard}
                  />
                </View>
                <Text style={styles.pendingNumber}>{counts?.pending ?? 0}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Total records</Text>
              <Text style={styles.label}>Pending records</Text>
            </View>
          </View>
        </View>

        <View style={[styles.uploadCard, { width: cardWidth }]}>
          <View style={styles.overlayLabel}>
            <Text style={styles.overlayText}>New Record</Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            No recent uploads?
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 13, flex: 1 }}>
              Stay compliant—click to add your latest health document. 📤
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("NewMedicalRecord")}
              style={{ alignSelf: "flex-end", marginLeft: 10 }}
            >
              <Image
                source={require("../../../assets/right-arrow.png")}
                style={{
                  height: 15,
                  width: 15,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Expirations</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("BrowseExpiration")}
            style={styles.viewAllButton}
          >
            <Text style={{ color: "#0288D1", fontSize: 12 }}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {upcomingExpirations.map((record, index) => (
            <View
              style={[styles.expirationCard, { width: cardWidth }]}
              key={index}
            >
              <View style={styles.expHeader}>
                <Image source={record.icon} style={styles.expImage} />
                <View style={styles.textContainer}>
                  <Text style={styles.expTitle}>{record.name}</Text>
                  <Text style={styles.expSub}>{record.location}</Text>
                </View>
              </View>

              <View style={[styles.expDetails, { width: cardWidth - 20 }]}>
                <View style={styles.detailRow}>
                  <View style={styles.iconBg}>
                    <Image
                      source={require("../../../assets/calendar.png")}
                      style={styles.iconDoc}
                    />
                  </View>
                  <Text style={styles.detailText}>{record.date}</Text>
                </View>
                <View style={styles.detailRowRight}>
                  <View style={styles.iconBg}>
                    <Image
                      source={require("../../../assets/time1.png")}
                      style={styles.iconDoc}
                    />
                  </View>
                  <Text style={styles.detailText}>{record.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Uploads</Text>
          <TouchableOpacity>
            <Text style={{ color: "#0288D1", fontSize: 12 }}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 1 }}
          scrollEnabled={false}
          style={{ width: "100%" }}
        />
      </ScrollView>
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
  contentContainer: {
    padding: 15,
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "Poppins",
    color: "#334155",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#0f172a",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryCard: {
    marginBottom: 20,
    alignSelf: "center",
  },
  cardPlaceholder: {
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  rowText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%",
  },
  cardItem: {
    flexDirection: "row",
    padding: 3,
    flex: 1,
  },
  cardItemRight: {
    flexDirection: "row",
    padding: 3,
    flex: 1,
    justifyContent: "flex-end",
    paddingRight: 20,
  },
  iconSumCard: {
    height: 18,
    width: 18,
    marginRight: 10,
    marginLeft: 10,
  },
  iconCompletedBg: {
    height: 30,
    width: 30,
    marginRight: 10,
    backgroundColor: "#CDFBD4",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconExpiredBg: {
    height: 30,
    width: 30,
    marginRight: 10,
    backgroundColor: "#FFCFCF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconPendingBg: {
    height: 30,
    width: 30,
    marginRight: 10,
    backgroundColor: "#FFEDDF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconTotalBg: {
    height: 30,
    width: 30,
    marginRight: 10,
    backgroundColor: "#D1EFFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  completedNumber: {
    color: "#4CAF50",
    fontWeight: "bold",
    fontSize: 25,
  },
  expiredNumber: {
    color: "#F44336",
    fontWeight: "bold",
    fontSize: 25,
  },
  totalNumber: {
    color: "#2196F3",
    fontWeight: "bold",
    fontSize: 25,
  },
  pendingNumber: {
    color: "#FF9800",
    fontWeight: "bold",
    fontSize: 25,
  },
  label: {
    color: "#888",
    fontSize: 12,
    flex: 1,
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    fontFamily: "Montserrat",
  },
  horizontalScrollContent: {
    paddingRight: 15,
  },
  expirationCard: {
    flex: 1,
    backgroundColor: "#0288D1",
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    height: 150,
    width: "auto",
    marginVertical: 9,
  },
  expHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  expImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    resizeMode: "contain",
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
  },
  expTitle: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  expSub: {
    color: "#e6e7e8",
    fontSize: 16,
    marginBottom: 15,
    fontFamily: "Poppins",
  },
  expDetails: {
    flex: 1,
    width: "auto",
    height: "auto",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 8,
    padding: 10,
    justifyContent: "space-between",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailRowRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  detailText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins",
    flex: 1,
    flexWrap: "wrap",
  },
  iconBg: {
    height: 30,
    width: 30,
    backgroundColor: "#0288D1",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  iconDoc: {
    height: 18,
    width: 18,
  },
  uploadCard: {
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    alignSelf: "center",
  },
  overlayLabel: {
    position: "absolute",
    top: -10,
    left: 20,
    backgroundColor: "#2196F3",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    zIndex: 10,
    elevation: 5,
  },
  overlayText: {
    color: "white",
    fontSize: 12,
  },
  iconArrow: {
    height: 15,
    width: 15,
  },
  cardRecent: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  dropdown: {
    marginTop: 10,
  },
  detailsLabel: {
    fontWeight: "600",
    marginBottom: 4,
  },
  details: {
    fontSize: 13,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#eee",
    borderRadius: 6,
    marginBottom: 6,
    alignItems: "center",
  },
  buttonTextW: {
    fontSize: 13,
    fontWeight: "500",
    color: "#fff",
  },
  buttonText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
  },
});

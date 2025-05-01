import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SelectList } from "react-native-dropdown-select-list";
import { BASE_URL, processResponse } from "../../config";
import * as FileSystem from "expo-file-system";
import { AuthContext } from "../../context/AuthContext";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function NewMedicalRecord({ navigation }) {
  const { userInfo } = useContext(AuthContext);
  const [recordName, setRecordName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [showDocumentTypes, setShowDocumentTypes] = useState(false);
  const [file, setFile] = useState(null);
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [entryDate, setEntryDate] = useState(new Date());
  const [showEntryPicker, setShowEntryPicker] = useState(false);
  const [showExpirationPicker, setShowExpirationPicker] = useState(false);
  const [notes, setNotes] = useState("");
  const [filteredDocumentTypes, setFilteredDocumentTypes] =
    useState(documentTypes);

  const documentTypes = [
    { key: 1, value: "Flu Vaccine" },
    { key: 2, value: "Pneumococcal Vaccine" },
    { key: 3, value: "Hepatitis B Vaccine" },
    { key: 4, value: "Covid-19 Vaccine" },
    { key: 5, value: "X-Ray Result" },
    { key: 6, value: "CBC Result" },
    { key: 7, value: "Urine Test" },
    { key: 8, value: "Fecal Test" },
    { key: 9, value: "Stool Series" },
    { key: 10, value: "Medical Certificate" },
  ];

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
        multiple: false,
      });
      setFile(result.assets);
    } catch (err) {
      console.log("Error picking document:", err);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || expirationDate;
    setShowExpirationPicker(Platform.OS === "ios");
    setExpirationDate(currentDate);
  };
  const handleEntryDate = (event, selectedDate) => {
    const currentEntryDate = selectedDate || entryDate;
    setShowEntryPicker(Platform.OS === "ios");
    setEntryDate(currentEntryDate);
  };

  const getMedicalRecordPending = () => {
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
          // console.log(data.records);
          if (statusCode == 200) {
            // Filtering logic here
            const existingDocumentTypes = data.records.map(
              (record) => record.document_type
            );

            const updatedDocumentTypes = documentTypes.filter(
              (dt) => !existingDocumentTypes.includes(dt.value)
            );

            setFilteredDocumentTypes(updatedDocumentTypes);
          } else {
            setFilteredDocumentTypes(documentTypes); // Reset if no data
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpload = async () => {
    const base64 = await FileSystem.readAsStringAsync(file[0].uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    fetch(`${BASE_URL}add-medical-record`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userInfo.id,
        record_name: recordName,
        document_type: documentType,
        note: notes,
        exp_date: expirationDate,
        entry_date: entryDate,
        file: {
          name: file[0].name,
          type: file[0].mimeType,
          data: base64,
        },
      }),
    })
      .then(processResponse)
      .then((res) => {
        const { statusCode, data } = res;
        navigation.navigate("MedRecords", { refresh: true });
      });
  };

  useEffect(() => {
    getMedicalRecordPending();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>New Medical Record</Text>

      <Text style={styles.label}>Record Name</Text>
      <TextInput
        style={styles.input}
        value={recordName}
        onChangeText={setRecordName}
        placeholder="Enter record name"
      />

      <Text style={styles.label}>Document Type</Text>
      <SelectList
        style={styles.dropdown}
        setSelected={(val) => setDocumentType(val)}
        data={filteredDocumentTypes}
        save="value"
      />

      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Upload File</Text>

        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <Text style={styles.uploadButtonText}>
            {file && file[0]?.name ? "Change File" : "Select File"}
          </Text>
        </TouchableOpacity>

        {file && file[0]?.name && (
          <View style={styles.previewContainer}>
            <View style={styles.filePreview}>
              <Text numberOfLines={1} style={styles.fileName}>
                {file[0].name}
              </Text>
              <TouchableOpacity onPress={() => setFile(null)}>
                <Icon name="close" size={20} color="#ff3333" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <Text style={styles.label}>Entry Date</Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowEntryPicker(true)}
      >
        <Text style={styles.dateText}>{entryDate.toLocaleDateString()}</Text>
        <Ionicons name="calendar" size={20} color="#01466c" />
      </TouchableOpacity>
      {showEntryPicker && (
        <DateTimePicker
          value={entryDate}
          mode="date"
          display="default"
          onChange={handleEntryDate}
        />
      )}

      <Text style={styles.label}>Expiration Date</Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowExpirationPicker(true)}
      >
        <Text style={styles.dateText}>
          {expirationDate.toLocaleDateString()}
        </Text>
        <Ionicons name="calendar" size={20} color="#01466c" />
      </TouchableOpacity>

      {showExpirationPicker && (
        <DateTimePicker
          value={expirationDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Note</Text>
      <TextInput
        style={styles.notesInput}
        value={notes}
        onChangeText={setNotes}
        placeholder="Add any additional notes here..."
        multiline
        numberOfLines={4}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleUpload}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#01466c",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#01466c",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#01466c",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#01466c",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    color: "#01466c",
  },
  dropdownPlaceholder: {
    color: "#01466c",
  },
  dropdownList: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#01466c",
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownItemText: {
    color: "#333",
  },
  previewContainer: {
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  filePreview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "80%",
  },

  fileName: {
    textAlign: "center",
    color: "#333",
  },
  uploadButton: {
    backgroundColor: "#0288D1",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#0288D1",
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#ffff",
  },
  dateInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#01466c",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    color: "#333",
  },
  notesInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#01466c",
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#0288D1",
    borderRadius: 8,
    padding: 15,
    width: "48%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#0288D1",
    borderRadius: 8,
    padding: 15,
    width: "48%",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

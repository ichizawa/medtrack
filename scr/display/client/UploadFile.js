import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function UploadFile({ navigation }) {
  const [docType, setDocType] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Medical Record</Text>

      <View style={styles.formBox}>
        <Text style={styles.label}>Document Type</Text>
        <TextInput
          placeholder="Select document type"
          style={styles.input}
          value={docType}
          onChangeText={setDocType}
        />

        <Text style={styles.label}>Upload File</Text>
        <TouchableOpacity style={styles.fileInput}>
          <Ionicons name="cloud-upload-outline" size={20} color="#666" />
        </TouchableOpacity>

        <Text style={styles.label}>Expiration Date</Text>
        <TouchableOpacity style={styles.fileInput}>
          <Ionicons name="calendar-outline" size={20} color="#666" />
        </TouchableOpacity>

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          multiline
          numberOfLines={4}
          placeholder="Enter any notes"
          value={notes}
          onChangeText={setNotes}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.cancelBtn]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.uploadBtn]}>
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  formBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  fileInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
  },
  notesInput: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#ddd",
    marginRight: 10,
  },
  uploadBtn: {
    backgroundColor: "#007BFF",
  },
  cancelText: {
    color: "#333",
  },
  uploadText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

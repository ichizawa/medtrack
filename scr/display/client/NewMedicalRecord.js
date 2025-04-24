import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NewMedicalRecord({ navigation }) {
  const [facilityName, setFacilityName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [showDocumentTypes, setShowDocumentTypes] = useState(false);
  const [file, setFile] = useState(null);
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notes, setNotes] = useState('');

  const documentTypes = [
    'Vaccine',
    'COVID-19 Test',
    'Hepatitis B Vaccine',
    'Flu Vaccine',
    'Annual Checkup',
    'Blood Test',
    'X-Ray',
    'MRI Scan',
    'Dental Record',
    'Eye Exam',
  ];

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });
      
      if (result.type === 'success') {
        setFile(result);
      }
    } catch (err) {
      console.log('Error picking document:', err);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || expirationDate;
    setShowDatePicker(Platform.OS === 'ios');
    setExpirationDate(currentDate);
  };

  const handleUpload = () => {
    // Here you would implement the actual upload logic
    console.log('Uploading:', {
      facilityName,
      documentType,
      file,
      expirationDate,
      notes,
    });
    
    // Navigate back after upload
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>New Medical Record</Text>
      
      <Text style={styles.label}>Facility Name</Text>
      <TextInput
        style={styles.input}
        value={facilityName}
        onChangeText={setFacilityName}
        placeholder="Enter facility name"
      />
      
      <Text style={styles.label}>Document Type</Text>
      <TouchableOpacity 
        style={styles.dropdown}
        onPress={() => setShowDocumentTypes(!showDocumentTypes)}
      >
        <Text style={documentType ? styles.dropdownText : styles.dropdownPlaceholder}>
          {documentType || 'Select document type'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#007BFF" />
      </TouchableOpacity>
      
      {showDocumentTypes && (
        <View style={styles.dropdownList}>
          {documentTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => {
                setDocumentType(type);
                setShowDocumentTypes(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      <View style={styles.previewContainer}>
        {file && file.name && (
          <View style={styles.filePreview}>
            <Text numberOfLines={1} style={styles.fileName}>{file.name}</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.label}>Upload File</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
        <Text style={styles.uploadButtonText}>
          {file ? 'Change File' : 'Select File'}
        </Text>
      </TouchableOpacity>
      
      <Text style={styles.label}>Expiration Date</Text>
      <TouchableOpacity 
        style={styles.dateInput}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          {expirationDate.toLocaleDateString()}
        </Text>
        <Ionicons name="calendar" size={20} color="#007BFF" />
      </TouchableOpacity>
      
      {showDatePicker && (
        <DateTimePicker
          value={expirationDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.notesInput}
        value={notes}
        onChangeText={setNotes}
        placeholder="Add any additional notes here"
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
        
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleUpload}
        >
          <Text style={styles.submitButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#007BFF',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    color: '#333',
  },
  dropdownPlaceholder: {
    color: '#999',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    color: '#333',
  },
  previewContainer: {
    height: 100,
    backgroundColor: '#e6f7ff',
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filePreview: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '80%',
  },
  fileName: {
    textAlign: 'center',
    color: '#333',
  },
  uploadButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#007BFF',
  },
  dateInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: '#333',
  },
  notesInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 15,
    width: '48%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 15,
    width: '48%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
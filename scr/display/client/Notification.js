import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function Notifications({navigation}) {
  // Example data for notifications
  const notifications = [
    { id: 1, message: 'Your Hepatitis B Vaccine is expiring soon.', status: 'expiring soon' },
    { id: 2, message: 'Your COVID-19 Test results are available.', status: 'completed' },
    { id: 3, message: 'Your Annual Checkup has been completed.', status: 'completed' },
    { id: 4, message: 'Your Flu Vaccine is expiring soon.', status: 'expiring soon' },
    { id: 5, message: 'Your Cholesterol Test results are available.', status: 'completed' },
    { id: 6, message: 'Your Blood Pressure Monitoring is scheduled for tomorrow.', status: 'completed' },
    { id: 7, message: 'Your Malaria Test results are available.', status: 'completed' },
    { id: 8, message: 'Your HIV Test is expired.', status: 'expired' },
    { id: 9, message: 'Your Diabetes Test results are available.', status: 'completed' },
    { id: 10, message: 'Your X-Ray Result is expired.', status: 'expired' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Filter notifications based on search query and status
  const filteredNotifications = notifications.filter((notification) => {
    const matchesQuery = notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || notification.status === selectedStatus;
    return matchesQuery && matchesStatus;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search notifications..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* Filter by status */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedStatus === 'all' && styles.selectedFilter]}
          onPress={() => setSelectedStatus('all')}
        >
          <Text style={[styles.filterText, selectedStatus === 'all' && styles.selectedFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedStatus === 'expiring soon' && styles.selectedFilter]}
          onPress={() => setSelectedStatus('expiring soon')}
        >
          <Text style={[styles.filterText, selectedStatus === 'expiring soon' && styles.selectedFilterText]}>Expiring Soon</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedStatus === 'completed' && styles.selectedFilter]}
          onPress={() => setSelectedStatus('completed')}
        >
          <Text style={[styles.filterText, selectedStatus === 'completed' && styles.selectedFilterText]}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedStatus === 'expired' && styles.selectedFilter]}
          onPress={() => setSelectedStatus('expired')}
        >
          <Text style={[styles.filterText, selectedStatus === 'expired' && styles.selectedFilterText]}>Expired</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.notificationList} showsVerticalScrollIndicator={false}>
        {filteredNotifications.map((notification) => (
          <View key={notification.id} style={[styles.notificationCard, styles[notification.status]]}>
            <View style={styles.notificationContent}>
              {/* Icon based on status */}
              <Ionicons
                name={notification.status === 'expiring soon' ? 'alert-circle' : notification.status === 'completed' ? 'checkmark-circle' : 'close-circle'}
                size={30}
                color={notification.status === 'expiring soon' ? '#ff9800' : notification.status === 'completed' ? '#4caf50' : '#f44336'}
                style={styles.notificationIcon}
              />
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.timestamp}>Just now</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View Details</Text>
              <MaterialIcons name="arrow-forward" size={18} color="#007BFF" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  searchBar: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    color: '#555',
  },
  selectedFilter: {
    backgroundColor: '#007BFF',
  },
  selectedFilterText: {
    color: '#fff',
  },
  notificationList: {
    flex: 1,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationIcon: {
    marginRight: 15,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#777',
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreText: {
    fontSize: 14,
    color: '#007BFF',
    marginRight: 5,
    fontWeight: '600',
  },
  expiringsoon: {
    borderLeftWidth: 6,
    borderLeftColor: '#ff9800',
  },
  completed: {
    borderLeftWidth: 6,
    borderLeftColor: '#4caf50',
  },
  expired: {
    borderLeftWidth: 6,
    borderLeftColor: '#f44336',
  },
});

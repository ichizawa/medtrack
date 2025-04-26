import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';

export default function Profile() {
  const {userInfo, logout} = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => logout() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Profile</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.imageBackground}>
              {/* <Image
                source={require('../../../assets/blood-test.png')}
                style={styles.avatar}
              /> */}
            </View>
            <Text style={styles.name}>{userInfo.first_name} {userInfo.last_name}</Text>
            <Text style={styles.role}>BS Information Technology</Text>
          </View>

          <View style={styles.infoSection}>
            <ProfileItem label="Student ID" value={userInfo.student_id} />
            <ProfileItem label="Email" value={userInfo.email} />
            <ProfileItem label="Username" value={userInfo.username} />
            <ProfileItem label="Contact Number" value="+63 987 654 3210" />
            <ProfileItem label="School" value="UM Digos College" />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const ProfileItem = ({ label, value }) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.info}>{value}</Text>
  </View>
);
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
  },
  headerTitle: {
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    fontFamily: 'Poppins',
  },
  role: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Poppins',
    marginTop: 2,
  },
  infoSection: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 15,
  },
  label: {
    fontSize: 13,
    color: '#94a3b8',
    fontFamily: 'Poppins',
  },
  info: {
    fontSize: 15,
    color: '#1e293b',
    fontFamily: 'Poppins',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#d10220',
    padding: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    gap: 8,
    marginBottom: 40,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});

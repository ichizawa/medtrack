import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import Index from "../display/client/index";
import Profile from "../display/client/profile";
import Menu from "../display/client/menu";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Tab = createDrawerNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginRight: 15 }}
          >
            <Icon name="bars" size={24} color="black" />
          </TouchableOpacity>
        ),
        headerLeft: () => null,
        headerTitleAlign: "center", // Optional: Center the title
      })}
    >
      <Tab.Screen name="Home" component={Index} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

import React from "react";
import {Image, Dimensions, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./index";
import MedRecords from "./MedRecords";
import Notification from "./Notification";
import Profile from "./Profile";
const { width, height } = Dimensions.get("window");

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
          backgroundColor: 'white',
        },
      }}>
          <Tab.Screen name="ClientHome"
              component={HomeScreen}
              
              options={{
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    
                      <Image
                        source={focused ? require('../../../assets/home_colored.png') : require('../../../assets/home.png')}
                        style={{ width: 28, height: 28 }}
                      />
                  ),
              
              }}
          />
          <Tab.Screen name="MedRecords"
              component={MedRecords}
              options={{
                  
                  headerShown: false,
                  tabBarIcon: ({focused}) => (
                   
                      <Image source={focused? require('../../../assets/folder_colored.png') : require('../../../assets/folder.png') } style={{width: 28, height: 28}}/>
                 
                  ),
              }}
          />
          <Tab.Screen
              name="Notification"
              component={Notification}
              options={{
                  headerShown: false,
                  tabBarIcon: ({focused}) => (
                    
                      <Image source={focused? require('../../../assets/notification_colored.png') : require('../../../assets/notification.png') } style={{width: 28, height: 28}}/>
                 
                  ),
              }}
          />
          <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                  tabBarActiveTintColor: 'darkgreen',
                  unmountOnBlur: true,
                  headerShown: false,
                  tabBarIcon: ({focused}) => (
                    
                      <Image source={focused? require('../../../assets/user_colored.png') : require('../../../assets/user.png') } style={{width: 28, height: 28}}/>
                 
                  ),
              }}
          />
      </Tab.Navigator>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";

import MedRecords from "../display/client/MedRecords";
import Notification from "../display/client/Notification";
import Profile from "../display/client/profile";
import BrowseExpiration from "../display/client/BrowseExpiration";
import NewMedicalRecord from "../display/client/NewMedicalRecord";
import Login from "../Login";
import Register from "../Register";
import { AuthContext } from "../context/AuthContext";
import ClientHome from "../display/client/BottomNavigation";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { userInfo } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userInfo ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={ClientHome} options={{headerShown: false}} />
          <Stack.Screen name="MedRecords" component={MedRecords} options={{headerShown: false}} />
          <Stack.Screen name="Notification" component={Notification} options={{headerShown: false}} />
          <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
          <Stack.Screen name="BrowseExpiration" component={BrowseExpiration} options={{headerShown: false}} />
          <Stack.Screen name="NewMedicalRecord" component={NewMedicalRecord} options={{headerShown: false}} />
        </>
      )}
    </Stack.Navigator>
  );
}

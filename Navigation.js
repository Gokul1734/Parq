import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./Screens/HomeScreen";
import Login from "./Screens/LoginScreen";
// import signIn from "./Screens/SignIn";
import SignIn from "./Screens/SignIn";
import VehicleScreen from "./Screens/VehicleScreen";
import VehicleAdder from "./Screens/VehicleAdder";
import Selector from "./Screens/Selector";
import Slot from "./Screens/Slot";
import QTicket from "./Screens/QTicket";
import AdminScreen from "./Screens/AdminScreen";
import Camera from "./Screens/Camera";
import Users from "./Screens/Users";
import LocationAdder from "./Screens/LocationAdder";
import Userinfo from "./Screens/Userinfo";

// import Demo from "./Screens/Demo";
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
          // options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Admin"
          options={{ headerShown: false }}
          component={AdminScreen}
          // options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Camera"
          options={{ headerShown: false }}
          component={Camera}
          // options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Location"
          options={{ headerShown: false }}
          component={LocationAdder}
          // options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Users"
          options={{ headerShown: false }}
          component={Users}
          // options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Info"
          options={{ headerShown: false }}
          component={Userinfo}
          // options={{ title: "Login" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Selector"
          component={Selector}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Vehicle"
          component={VehicleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddVehicle"
          component={VehicleAdder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Slot"
          component={Slot}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QTicket"
          component={QTicket}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

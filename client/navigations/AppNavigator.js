import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/auth/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import GardenListScreen from "../screens/garden/GardenListScreen";
import GardenHomeScreen from "../screens/garden/GardenHomeScreen";
import Home from "../components/Home";
import Profile from "../components/Profile";
import BoardUser from "../components/BoardUser";
import BoardModerator from "../components/BoardModerator";
import BoardAdmin from "../components/BoardAdmin";
import MapNavigator from "./MapNavigator";
import AddGroupScreen from "../screens/garden/AddGroupScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }
  }, [currentUser]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="GardenList" component={GardenListScreen} />
      <Stack.Screen name="AddGroup" component={AddGroupScreen} />
      <Stack.Screen name="GardenHome" component={GardenHomeScreen} />
      <Stack.Screen name="MainMap" component={MapNavigator} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="UserScreen" component={BoardUser} />
      <Stack.Screen name="ModeratorScreen" component={BoardModerator} />
      <Stack.Screen name="AdminScreen" component={BoardAdmin} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

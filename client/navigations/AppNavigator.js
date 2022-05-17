import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/auth/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import GardenListScreen from "../screens/garden/GardenListScreen";
import NFCTagScreen from "../screens/garden/NFCTagScreen";
import GardenTabsScreen from "../screens/garden/GardenTabsScreen";
import Home from "../components/Home";
import Profile from "../components/Profile";
import BoardUser from "../components/BoardUser";
import BoardModerator from "../components/BoardModerator";
import BoardAdmin from "../components/BoardAdmin";
import MapNavigator from "./MapNavigator";
import AddGroupScreen from "../screens/garden/AddGroupScreen";
import { MainWrapper } from "../components/common/MainWrapper";

const MainStack = createNativeStackNavigator();

const AppNavigator = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   if (currentUser) {
  //     setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
  //     setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
  //   } else {
  //     setShowModeratorBoard(false);
  //     setShowAdminBoard(false);
  //   }
  // }, [currentUser]);
  return (
    <MainWrapper>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash"
      >
        <MainStack.Screen name="Splash" component={SplashScreen} />
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen name="Register" component={RegisterScreen} />
        <MainStack.Screen name="GardenList" component={GardenListScreen} />
        <MainStack.Screen name="NFCTag" component={NFCTagScreen} />
        <MainStack.Screen name="AddGroup" component={AddGroupScreen} />
        <MainStack.Screen name="GardenTabs" component={GardenTabsScreen} />
        <MainStack.Screen name="MainMap" component={MapNavigator} />
        <MainStack.Screen name="Profile" component={Profile} />
        <MainStack.Screen name="UserScreen" component={BoardUser} />
        <MainStack.Screen name="ModeratorScreen" component={BoardModerator} />
        <MainStack.Screen name="AdminScreen" component={BoardAdmin} />
      </MainStack.Navigator>
    </MainWrapper>
  );
};

export default AppNavigator;

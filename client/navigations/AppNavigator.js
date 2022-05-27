import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/auth/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import GardenTabsScreen from "../screens/main-tabs/GardenTabsScreen";
import GardenListScreen from "../screens/main-tabs/garden-tab/GardenListScreen";
import NewsScreen from "../screens/main-tabs/NewsScreen";
import NFCTagScreen from "../screens/main-tabs/NFCTagScreen";
import GardenListColumnScreen from "../screens/main-tabs/garden-tab/GardenListColumnScreen";
import Home from "../components/Home";
import Profile from "../components/Profile";
import AddGroupScreen from "../screens/main-tabs/garden-tab/AddGroupScreen";
import { MainWrapper } from "../components/common/MainWrapper";
import GardenHomeScreen from "../screens/main-tabs/garden-tab/GardenHomeScreen";

const MainStack = createNativeStackNavigator();

const AppNavigator = () => {
  // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  // const [showAdminBoard, setShowAdminBoard] = useState(false);
  // const { user: currentUser } = useSelector((state) => state.auth);
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
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen name="Register" component={RegisterScreen} />
        <MainStack.Screen name="GardenTabs" component={GardenTabsScreen} />
        <MainStack.Screen name="GardenList" component={GardenListScreen} />
        <MainStack.Screen
          name="GardenListColumn"
          component={GardenListColumnScreen}
        />
        <MainStack.Screen name="News" component={NewsScreen} />
        <MainStack.Screen name="GardenHome" component={GardenHomeScreen} />
        <MainStack.Screen name="NFCTag" component={NFCTagScreen} />
        <MainStack.Screen name="AddGroup" component={AddGroupScreen} />
      </MainStack.Navigator>
    </MainWrapper>
  );
};

export default AppNavigator;

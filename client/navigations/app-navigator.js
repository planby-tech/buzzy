import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import Profile from "../components/Profile";
import BoardUser from "../components/BoardUser";
import BoardModerator from "../components/BoardModerator";
import BoardAdmin from "../components/BoardAdmin";
import Map from "../pages/Map";
import MapNavigator from "../components/MapPages";
import { logout } from "../redux/slices/auth";
// import EventBus from "../common/EventBus";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }
    // EventBus.on("logout", () => {
    //   logOut();
    // });
    // return () => {
    //   EventBus.remove("logout");
    // };
  }, [currentUser]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="MainMap" component={MapNavigator} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="UserScreen" component={BoardUser} />
      <Stack.Screen name="ModeratorScreen" component={BoardModerator} />
      <Stack.Screen name="AdminScreen" component={BoardAdmin} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

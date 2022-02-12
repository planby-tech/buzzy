import "react-native-gesture-handler"; // 얘는 무조건 최상단에 있어야 함
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, NativeModules } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Map from "./pages/Map";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Map 1" component={Map} />
      <Drawer.Screen name="Map 2" component={Map} />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({});

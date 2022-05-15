import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { RotateInUpLeft } from "react-native-reanimated";

const GardenHomeScreen = ({ route, navigation }) => {
  const groupInfo = route.params.group;
  return (
    <View>
      <Text>{groupInfo.name}'s garden</Text>
      <Text>{groupInfo.description}</Text>
    </View>
  );
};

export default GardenHomeScreen;

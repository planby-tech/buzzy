import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MainWrapper } from "../../../components/common/MainWrapper";
import { useFonts } from "expo-font";

const GardenHomeScreen = ({ route, navigation }) => {
  const [fontsLoaded] = useFonts({
    PretendardSemiBold: require("../../../assets/fonts/Pretendard-SemiBold.otf"),
  });

  const groupInfo = route.params;
  return fontsLoaded ? (
    <MainWrapper>
      <View style={{ flexDirection: "row" }}></View>
      <View
        style={{
          margin: 30,
          marginTop: 20,
          padding: 20,
          paddingTop: 15,
          backgroundColor: "#3A3A3A",
          height: "80%",
          borderRadius: 20,
        }}
      >
        <Text style={styles.gardenTitle}>{groupInfo.name} 정원</Text>
        <Text style={styles.gardenDescription}>{groupInfo.description}</Text>
      </View>
      <View
        style={{
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Text style={styles.gardenDescription}>{groupInfo.description}</Text> */}
      </View>
    </MainWrapper>
  ) : null;
};

const styles = StyleSheet.create({
  gardenTitle: {
    fontSize: 30,
    color: "#ffffff",
    fontFamily: "PretendardSemiBold",
  },
  gardenDescription: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  },
});

export default GardenHomeScreen;

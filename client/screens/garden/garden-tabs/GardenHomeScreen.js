import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MainWrapper } from "../../../components/common/MainWrapper";

const GardenHomeScreen = ({ groupInfo }) => {
  console.log(groupInfo);
  return (
    <MainWrapper>
      <View
        style={{
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.gardenTitle}>{groupInfo.name}</Text>
        <Text style={styles.gardenDescription}>{groupInfo.description}</Text>
      </View>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  gardenTitle: {
    fontSize: 50,
    fontWeight: "700",
    color: "#ffffff",
  },
  gardenDescription: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  },
});

export default GardenHomeScreen;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MainWrapper } from "../../../components/common/MainWrapper";

const GardenHomeScreen = ({ route, navigation }) => {
  const groupInfo = route.params;
  return (
    <MainWrapper>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ padding: 10, paddingLeft: 20 }}>
          <Text style={{ color: "white", fontSize: 24 }}>가든</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Text style={{ color: "white", fontSize: 24 }}>채팅</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          margin: 30,
          marginTop: 20,
          padding: 20,
          backgroundColor: "#3A3A3A",
          height: "60%",
          borderRadius: 20,
        }}
      >
        <Text style={styles.gardenTitle}>{groupInfo.name} 정원</Text>
      </View>
      <View
        style={{
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.gardenDescription}>{groupInfo.description}</Text>
      </View>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  gardenTitle: {
    fontSize: 30,
    fontWeight: "500",
    color: "#ffffff",
  },
  gardenDescription: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  },
});

export default GardenHomeScreen;

import React from "react";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { MainWrapper } from "../../../components/common/MainWrapper";

const GardenListColumnScreen = ({ route, navigation }) => {
  const groupArray = route.params;

  const groupListLayout = ({ item }) => {
    const handleNavigate = () => {
      navigation.navigate("GardenHome", item);
    };
    return (
      <TouchableOpacity
        onPress={handleNavigate}
        style={{
          width: "100%",
          height: 100,
          backgroundColor: "#3A3A3A",
          // borderColor: GREEN_COLOR,
          // borderWidth: 1,
          borderRadius: 12,
          padding: 20,
          // paddingTop: 12,
          marginBottom: 20,
        }}
        activeOpacity={0.5}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontFamily: "PretendardSemiBold",
            lineHeight: 20,
          }}
          numberOfLines={3}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNavigateToAddGroup = () => {
    navigation.navigate("AddGroup");
  };

  return (
    <MainWrapper style={{ padding: 20 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialCommunityIcons name="arrow-left" size={34} color="#fff" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.headerTitle}>가든 목록</Text>
        </View>
        <TouchableOpacity onPress={handleNavigateToAddGroup}>
          <MaterialCommunityIcons name="plus" size={34} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={groupArray}
        renderItem={groupListLayout}
        keyExtractor={(item, index) => index}
        // ListFooterComponent={AddGroupButton}
      />
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 30,
    color: "#fff",
    justifyContent: "center",
  },
});

export default GardenListColumnScreen;

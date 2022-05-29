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

import { useFonts } from "expo-font";
import Svg, { Path } from "react-native-svg";

const GardenListColumnScreen = ({ route, navigation }) => {
  const [fontsLoaded] = useFonts({
    SUITSemiBold: require("../../../assets/fonts/SUIT-SemiBold.otf"),
  });

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
          borderRadius: 12,
          padding: 20,
          paddingRight: 16,
          marginBottom: 20,
        }}
        activeOpacity={0.5}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
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
    <MainWrapper style={{ padding: 16 }}>
      {fontsLoaded ? (
        <View>
          <View style={styles.header}>
            <TouchableOpacity style={{ padding: 8 }} onPress={handleGoBack}>
              <Svg
                width="20"
                height="20"
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M1 5L5 1M1 5H15H1ZM1 5L5 9L1 5Z"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.headerTitle}>가든 목록</Text>
            </View>
            <TouchableOpacity
              style={{ padding: 8 }}
              onPress={handleNavigateToAddGroup}
            >
              <MaterialCommunityIcons name="plus" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={groupArray}
            renderItem={groupListLayout}
            keyExtractor={(item, index) => index}
            // ListFooterComponent={AddGroupButton}
          />
        </View>
      ) : null}
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "SUITSemiBold",
    fontSize: 24,
    color: "#fff",
    justifyContent: "center",
  },
});

export default GardenListColumnScreen;

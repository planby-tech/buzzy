import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import userService from "../../services/user.service";
import { useIsFocused } from "@react-navigation/native";
import { MainWrapper } from "../../components/common/MainWrapper";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const GardenListScreen = ({ navigation }) => {
  const [groupArray, setGroupArray] = useState([{ name: "name" }]);
  const isFocused = useIsFocused();

  useEffect(() => {
    userService.findByUser().then((data) => {
      setGroupArray(data);
      if (data === undefined)
        setGroupArray([
          { name: "Garden name", description: "garden description" },
        ]);
    });
  }, [isFocused]);

  const groupListLayout = ({ item }) => {
    const handleNavigate = () => {
      navigation.navigate("GardenTabs", item);
    };
    return (
      <TouchableOpacity
        onPress={handleNavigate}
        style={{ height: 50, borderColor: "#fff", borderWidth: 2 }}
      >
        <Text style={{ color: "#fff" }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const AddGroupButton = () => {
    const handleAddGroup = () => {
      navigation.navigate("AddGroup");
    };

    return (
      <TouchableOpacity
        onPress={handleAddGroup}
        style={{ height: 50, borderColor: "#fff", borderWidth: 2 }}
      >
        <Text style={{ color: "#fff" }}>그룹 추가하기</Text>
      </TouchableOpacity>
    );
  };

  const handleNavigateToNFC = () => {
    navigation.navigate("NFCTag");
  };

  return (
    <MainWrapper>
      <StatusBar />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            fontSize: 20,
            marginVertical: 10,
            color: "#fff",
            flex: 1,
          }}
        >
          나의 모든 정원
        </Text>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={handleNavigateToNFC}
        >
          <MaterialCommunityIcons
            name="nfc-variant"
            size={26}
            color="#40BB91"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={groupArray}
        renderItem={groupListLayout}
        keyExtractor={(item, index) => index}
        ListFooterComponent={AddGroupButton}
      />
    </MainWrapper>
  );
};

export default GardenListScreen;

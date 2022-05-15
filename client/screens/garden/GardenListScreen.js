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

const GardenListScreen = ({ navigation }) => {
  const [groupArray, setGroupArray] = useState([{ group: { name: "name" } }]);
  const isFocused = useIsFocused();

  useEffect(() => {
    userService.findByUser().then((data) => {
      setGroupArray(data);
    });
  }, [isFocused]);

  const groupListLayout = ({ item }) => {
    const handleNavigate = () => {
      navigation.navigate("GardenHome", item);
    };
    return (
      <TouchableOpacity
        onPress={handleNavigate}
        style={{ height: 50, borderColor: "black", borderWidth: 2 }}
      >
        <Text>{item.group.name}</Text>
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
        style={{ height: 50, borderColor: "black", borderWidth: 2 }}
      >
        <Text>그룹 추가하기</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <StatusBar />
      <Text>나의 모든 정원</Text>
      <FlatList
        data={groupArray}
        renderItem={groupListLayout}
        keyExtractor={(item) => item.createdAt}
        ListFooterComponent={AddGroupButton}
      />
    </View>
  );
};

export default GardenListScreen;

import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import userService from "../services/user.service";

export default GardenListScreen = () => {
  const [groupArray, setGroupArray] = useState([{ group: { name: "name" } }]);

  useEffect(() => {
    userService.findByUser().then((data) => {
      console.log(data);
      setGroupArray(data);
    });
  }, []);

  const handleNavigate = () => {
    return 0;
  };

  return (
    <View>
      <StatusBar />
      {groupArray.map((val, idx) => {
        return (
          <TouchableOpacity
            style={{
              height: 50,
              borderColor: "black",
              borderWidth: 2,
              backgroundColor: "#ccc",
            }}
            key={idx}
            onPress={handleNavigate}
          >
            <Text>{val.group.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

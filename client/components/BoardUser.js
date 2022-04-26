import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { View, Text } from "react-native";
import EventBus from "../common/EventBus";
const BoardUser = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response);
      },
      (error) => {
        const _content =
          (error.response && error.response.message) ||
          error.message ||
          error.toString();
        setContent(_content);
        // if (error.response && error.response.status === 401) {
        //   EventBus.dispatch("logout");
        // }
      }
    );
  }, []);
  return (
    <View className="container">
      <Text style={{ fontWeight: "bold" }}>
        <Text>{content}</Text>
      </Text>
    </View>
  );
};
export default BoardUser;

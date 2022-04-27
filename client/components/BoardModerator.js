import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { View, Text } from "react-native";
const BoardModerator = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.message) ||
          error.message ||
          error.toString();
        setContent(_content);
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
export default BoardModerator;

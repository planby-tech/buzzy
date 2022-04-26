import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import UserService from "../services/user.service";
const Home = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response);
      },
      (error) => {
        const _content = error.response || error.message || error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
    <View className="container">
      <Text className="jumbotron">
        <Text>{content}</Text>
      </Text>
    </View>
  );
};
export default Home;

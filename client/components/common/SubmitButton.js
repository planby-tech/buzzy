import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function Button({ title, onPress, style }) {
  return (
    <TouchableOpacity
      style={{
        ...style,
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 8,
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text
        style={{ fontSize: 18, color: "white", textTransform: "uppercase" }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

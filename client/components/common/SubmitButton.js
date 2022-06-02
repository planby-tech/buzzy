import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function Button({ title, onPress, style, disabled = false }) {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 8,
        ...style,
      }}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={{ fontSize: 18, color: "white", textTransform: "uppercase" }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

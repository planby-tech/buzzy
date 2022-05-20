import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export const MainWrapper = ({ backgroundcolor = "#000000", ...props }) => {
  const styles = StyleSheet.create({
    wrapper: {
      ...props.style,
      backgroundColor: backgroundcolor,
      flex: 1,
    },
  });
  return <SafeAreaView style={styles.wrapper}>{props.children}</SafeAreaView>;
};

import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";

const MyLocationButton = (props) => {
  return (
    <View>
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={async () =>
            props.updateLocation(await Location.getCurrentPositionAsync({}))
          }
        >
          <Text style={styles.text}>My Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyLocationButton;

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    backgroundColor: "#fe5746",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});

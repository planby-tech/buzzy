import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

const MyLocationButton = (props) => {
  return (
    <View>
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={async () =>
            props.updateLocation(
              await Location.getCurrentPositionAsync({
                accuracy:
                  Platform.OS === "ios"
                    ? Location.Accuracy.Balanced
                    : Location.Accuracy.Lowest,
              })
            )
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
    backgroundColor: "#505050",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 25,
    bottom: 25,
    borderRadius: 30,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
  },
});

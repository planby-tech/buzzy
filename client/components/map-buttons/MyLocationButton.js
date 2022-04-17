import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Svg, { Path } from "react-native-svg";

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
          <Svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path d="M12.001 15.998a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" fill="#000" />
            <Path
              d="M13.001 4.067V1.998h-2v2.069a8.01 8.01 0 0 0-6.931 6.931H2.001v2H4.07a8.008 8.008 0 0 0 6.931 6.931v2.069h2v-2.069a8.006 8.006 0 0 0 6.931-6.931h2.069v-2h-2.069a8.009 8.009 0 0 0-6.931-6.93zm-1 13.931c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"
              fill="#000"
            />
          </Svg>
          {/* Button vector image */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyLocationButton;

const styles = StyleSheet.create({
  button: {
    width: wp(10.7),
    height: wp(10.7),
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: wp(4.3),
    bottom: hp(4),
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

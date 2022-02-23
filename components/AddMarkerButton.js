import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const AddMarkerButton = () => {
  return (
    <View>
      <View>
        <TouchableOpacity activeOpacity={0.8} style={styles.button}>
          <Svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <G clip-path="url(#m1bedjkw2a)">
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 16.1v-8h2v8h8v2h-8v8h-2v-8H8v-2h8z"
                fill="#000"
              />
            </G>
            <Defs>
              <ClipPath id="m1bedjkw2a">
                <Path
                  fill="#fff"
                  transform="rotate(45 8.465 20.535)"
                  d="M0 0h24v24H0z"
                />
              </ClipPath>
            </Defs>
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddMarkerButton;

const styles = StyleSheet.create({
  button: {
    width: wp(10.7),
    height: wp(10.7),
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: wp(4.3),
    bottom: hp(4),
    borderRadius: 8,
  },
  currentLocation: {
    width: "60%",
    height: "60%",
  },
});

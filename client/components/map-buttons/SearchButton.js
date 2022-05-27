import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const SearchButton = () => {
  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() => searchOn()}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="m21.5 21.004-4.486-4.494 4.486 4.494zm-2-10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0v0z"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </Svg>
          {/* Button vector image */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchButton;

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  button: {
    width: width * 0.107,
    height: width * 0.107,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: width * 0.043,
    bottom: height * 0.8,
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

import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { loadUserData, logout } from "../../redux/slices/auth";
import { findByUser } from "../../redux/slices/user";

import * as Font from "expo-font";

const SplashScreen = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const dispatch = useDispatch();

  const loadFonts = async () => {
    await Font.loadAsync({
      "Fraunces-Bold": {
        uri: require("../../assets/fonts/Fraunces-Bold.ttf"),
      },
    });
    setFontsLoaded(true);
  };

  useEffect(async () => {
    await loadFonts();
    dispatch(loadUserData())
      .unwrap()
      .then((res) => {
        setTimeout(() => {
          if (res.user.accessToken) {
            dispatch(findByUser())
              .unwrap()
              .then((data) => {
                if (data === null || data) {
                  return navigation.reset({
                    index: 0,
                    routes: [{ name: "GardenList" }],
                  });
                } else {
                  dispatch(logout());
                }
              });
          } else {
            console.log("userData not found2");
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          }
        }, 800);
      });
  }, [dispatch]);

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <Text
        style={
          fontsLoaded
            ? {
                fontSize: 60,
                color: "#fff",
                fontFamily: "Fraunces-Bold",
              }
            : { fontSize: 40, color: "#fff", fontWeight: "700" }
        }
      >
        Buzzy
      </Text>
      <Text style={{ color: "#fff" }}>함께 가꾸는 우리들만의 정원</Text>
    </View>
  );
};

export default SplashScreen;

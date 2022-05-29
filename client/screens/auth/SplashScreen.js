import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { loadUserData, logout } from "../../redux/slices/auth";
import { findByUser } from "../../redux/slices/user";

import { useFonts } from "expo-font";

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    FrauncesBold: require("../../assets/fonts/Fraunces-Bold.ttf"),
  });

  useEffect(async () => {
    dispatch(loadUserData())
      .unwrap()
      .then((res) => {
        setTimeout(() => {
          if (res.user.accessToken) {
            dispatch(findByUser())
              .unwrap()
              .then((data) => {
                console.log("data in SplashScreen.js: " + data);
                if (data.length >= 0) {
                  return navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: "GardenTabs",
                        params: { userInfo: res, groupInfoArray: data },
                      },
                    ],
                  });
                }
                // else {
                //   dispatch(logout());
                //   navigation.reset({
                //     index: 0,
                //     routes: [{ name: "Login" }],
                //   });
                // }
              })
              .catch((err) => {
                console.log("here!");
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              });
          } else {
            console.log("userData not found2");
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          }
        }, 800); //setTimeout 빼도 됨.
      })
      .catch((err) => {
        console.log("SplashScreen gotcha!" + err);
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
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
      {fontsLoaded ? (
        <>
          <Text
            style={{
              fontSize: 60,
              color: "#fff",
              fontFamily: "FrauncesBold",
            }}
          >
            Buzzy
          </Text>
          <Text style={{ color: "#fff" }}>함께 가꾸는 우리들만의 정원</Text>
        </>
      ) : null}
    </View>
  );
};

export default SplashScreen;

import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadUserData } from "../../redux/slices/auth";

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserData()).then((res) => {
      setTimeout(() => {
        if (res.payload) {
          navigation.reset({
            index: 0,
            routes: [{ name: "GardenList" }],
          });
        } else {
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
        height: 300,
      }}
    >
      <Text style={{ fontSize: 20 }}>Splash Screen</Text>
    </View>
  );
};

export default SplashScreen;

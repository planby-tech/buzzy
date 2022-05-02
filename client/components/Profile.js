import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, Button } from "react-native";
import { loadUserData, logout } from "../redux/slices/auth";
const Profile = ({ navigation }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(`currentUser in Profile.js: ${JSON.stringify(currentUser)}`);
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      navigation.navigate("Login");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View>
      {isLoggedIn ? (
        <View>
          <View>
            <Text>
              <Text style={{ fontWeight: "bold" }}>{currentUser.email}</Text>{" "}
              Profile
            </Text>
          </View>
          <View>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Token:</Text>{" "}
              {currentUser.accessToken.substring(0, 20)} ...{" "}
              {currentUser.accessToken.substr(
                currentUser.accessToken.length - 20
              )}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>Id: </Text>
            <Text>{currentUser.id}</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>Email: </Text>
            <Text>{currentUser.email}</Text>
          </View>
          <Text style={{ fontWeight: "bold" }}>Authorities: </Text>
          <>
            {currentUser.roles !== undefined &&
              currentUser.roles.map((role, index) => (
                <Text key={index}>{role}</Text>
              ))}
          </>
          <Button onPress={handleLogout} title="Logout" />
        </View>
      ) : (
        <Text>Checking for user data...</Text>
      )}
    </View>
  );
};
export default Profile;

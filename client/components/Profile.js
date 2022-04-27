import React from "react";
import { useSelector } from "react-redux";
import { Text, View } from "react-native";
const Profile = ({ navigation }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    navigation.navigate("Login");
  }
  return (
    <View>
      <View>
        <Text>
          <Text style={{ fontWeight: "bold" }}>{currentUser.username}</Text>
          Profile
        </Text>
      </View>
      <View>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Token:</Text>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
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
      {/* <>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </> */}
    </View>
  );
};
export default Profile;

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function authHeader() {
  AsyncStorage.getItem("user").then((userData) => {
    console.log(userData);
    const user = JSON.parse(userData);
    if (user && user.accessToken) {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };
    } else {
      return {};
    }
  });
  // const user = JSON.parse(AsyncStorage.getItem("user"));
}

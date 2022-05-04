import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function authHeader() {
  const userData = await AsyncStorage.getItem("user");
  const user = JSON.parse(userData);
  if (user && user.accessToken) {
    return {
      "x-access-token": `${user.accessToken}`,
    };
  }
  return {};
}

import React, { useState, useEffect } from "react";
import { Alert, Button, TextInput, View, StyleSheet } from "react-native";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    Alert.alert("Credentials", `${username} + ${password}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={username}
        onChangeText={(username) => setUsername(username)}
        placeholder={"Username"}
        style={styles.input}
      />
      <TextInput
        value={this.state.password}
        onChangeText={(password) => setPassword(password)}
        placeholder={"Password"}
        secureTextEntry={true}
        style={styles.input}
      />

      <Button title={"Login"} style={styles.input} onPress={onLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
});

export default Signup;

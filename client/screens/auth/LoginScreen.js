import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { login, loadUserData } from "../../redux/slices/auth";
import { clearMessage } from "../../redux/slices/message";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("필수 입력 사항입니다."),
    password: Yup.string().required("필수 입력 사항입니다."),
  });
  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);
    dispatch(login({ email, password }))
      .unwrap()
      .then(setLoading(false))
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    dispatch(loadUserData()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    console.log("isLoggedIn in auth.js useEffect: " + isLoggedIn);
    if (isLoggedIn) {
      navigation.navigate("GardenList");
    }
  }, [isLoggedIn]);

  return (
    <View style={styles.loginContainer}>
      <Text>로그인</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <TextInput
              name="email"
              placeholder="Email Address"
              style={styles.textInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && (
              <Text style={{ fontSize: 10, color: "red" }}>{errors.email}</Text>
            )}
            <TextInput
              name="password"
              placeholder="Password"
              style={styles.textInput}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.email && (
              <Text style={{ fontSize: 10, color: "red" }}>{errors.email}</Text>
            )}
            <Button onPress={handleSubmit} title="Login" disabled={loading} />
          </>
        )}
      </Formik>
      {message !== undefined && (
        <View>
          <Text>{message}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
    backgroundColor: "#e6e6e6",
  },
  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});
export default LoginScreen;

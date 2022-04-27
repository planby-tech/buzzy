import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../slices/auth";
import { clearMessage } from "../slices/message";
import { Button, TextInput, StyleSheet, View, Text } from "react-native";
const Register = () => {
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const initialValues = {
    username: "",
    email: "",
    password1: "",
    password2: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password1: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 32 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 32
      )
      .required("This field is required!"),
    password2: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 32 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 32
      )
      .required("This field is required!"),
  });
  const handleRegister = (formValue) => {
    const { username, email, password } = formValue;
    setSuccessful(false);
    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };
  return (
    <View style={styles.loginContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <TextInput
              name="username"
              placeholder="User Name"
              style={styles.textInput}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            {errors.username && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.username}
              </Text>
            )}
            <TextInput
              name="email"
              placeholder="Email Address"
              style={styles.textInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={{ fontSize: 10, color: "red" }}>{errors.email}</Text>
            )}
            <TextInput
              name="password1"
              placeholder="Password1"
              style={styles.textInput}
              onChangeText={handleChange("password1")}
              onBlur={handleBlur("password1")}
              value={values.password1}
              secureTextEntry
            />
            {errors.password1 && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.password1}
              </Text>
            )}
            <TextInput
              name="password2"
              placeholder="Password2"
              style={styles.textInput}
              onChangeText={handleChange("password2")}
              onBlur={handleBlur("password2")}
              value={values.password2}
              secureTextEntry
            />
            {errors.password2 && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.password2}
              </Text>
            )}
            <Button
              onPress={handleSubmit}
              title="Sign up"
              disabled={!isValid}
            />
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

export default Register;

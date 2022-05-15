import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/slices/auth";
import { clearMessage } from "../../redux/slices/message";
import { Button, TextInput, StyleSheet, View, Text } from "react-native";
import AddMarkerButton from "../../components/map-buttons/AddMarkerButton";
const Register = ({ navigation }) => {
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const initialValues = {
    name: "",
    email: "",
    password1: "",
    password2: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "len",
        "The name must be between 2 and 20 characters.",
        (val) =>
          val && val.toString().length >= 2 && val.toString().length <= 20
      )
      .required("필수 입력 사항입니다."),
    email: Yup.string()
      .email("올바른 이메일 형식을 작성해주세요.")
      .required("필수 입력 사항입니다."),
    password1: Yup.string()
      .required("필수 입력 사항입니다.")
      .matches(
        /^(?=.*[a-z])(?=.*[0-9])(?=.{8,32})/,
        "비밀번호는 영어와 숫자를 포함하여 8글자 이상 32글자 이내여야 합니다."
      )
      .matches(/^\S*$/, "공백을 포함할 수 없습니다."),
    password2: Yup.string().when("password1", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password1")],
        "Password does not match."
      ),
    }),
  });

  const handleRegister = (formValue) => {
    const { name, email, password1, password2 } = formValue;
    setSuccessful(false);
    dispatch(register({ name, email, password1, password2 }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        navigation.navigate("Login");
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
              name="name"
              placeholder="User Name"
              style={styles.textInput}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {errors.name && (
              <Text style={{ fontSize: 10, color: "red" }}>{errors.name}</Text>
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
              placeholder="Password"
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
              placeholder="Write your password again"
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
      <AddMarkerButton />
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

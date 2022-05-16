import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { clearMessage } from "../../redux/slices/message";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { joinGroup } from "../../redux/slices/group";

const JoinGroupScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    groupCode: "",
  };
  const validationSchema = Yup.object().shape({
    groupCode: Yup.string().required("필수 입력 사항입니다."),
  });
  const handleJoinGroup = (formValue) => {
    const { groupCode } = formValue;
    setLoading(true);
    dispatch(joinGroup({ groupCode }))
      .unwrap()
      .then(() => {
        navigation.navigate("GardenList");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleJoinGroup}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <TextInput
              name="groupCode"
              placeholder="group code"
              style={styles.textInput}
              onChangeText={handleChange("groupCode")}
              onBlur={handleBlur("groupCode")}
              value={values.groupCode}
            />
            {errors.name && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.groupCode}
              </Text>
            )}
            <Button
              onPress={handleSubmit}
              title="그룹 참여하기"
              disabled={loading}
            />
          </>
        )}
      </Formik>
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

export default JoinGroupScreen;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { clearMessage } from "../../redux/slices/message";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
    <View style={{ width: "100%", padding: 10 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleJoinGroup}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Text style={styles.inputTitle}>정원 초대 코드</Text>
            <TextInput
              name="groupCode"
              placeholder="정원 초대 코드를 입력해 주세요."
              style={styles.textInput}
              onChangeText={handleChange("groupCode")}
              onBlur={handleBlur("groupCode")}
              value={values.groupCode}
            />
            {errors.name && (
              <Text style={{ fontSize: 10, color: "tomato" }}>
                {errors.groupCode}
              </Text>
            )}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              style={styles.submitButton}
            >
              <Text style={{ color: "#fff" }}>정원 들어가기</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    paddingLeft: 10,
    color: "#fff",
  },
  textInput: {
    height: 40,
    margin: 10,
    paddingLeft: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  submitButton: {
    borderColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 20,
    padding: 10,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default JoinGroupScreen;

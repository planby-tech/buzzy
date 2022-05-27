import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { clearMessage } from "../../../redux/slices/message";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { createGroup } from "../../../redux/slices/group";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GREEN_COLOR } from "../../../common/colors";
import Button from "../../../components/common/SubmitButton";

const CreateGroupScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    name: "",
    description: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("정원 이름은 필수 입력 사항입니다."),
  });
  const handleCreateGroup = (formValue, { resetForm }) => {
    const { name, description } = formValue;
    setLoading(true);
    dispatch(createGroup({ name, description }))
      .unwrap()
      .then(() => {
        resetForm({ values: initialValues });
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
        onSubmit={handleCreateGroup}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Text style={styles.inputTitle}>정원 이름</Text>
            <TextInput
              name="name"
              placeholder="정원의 이름을 적어주세요."
              style={styles.textInput}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {errors.name && (
              <Text
                style={{
                  paddingLeft: 10,
                  fontSize: 10,
                  color: "tomato",
                  marginBottom: 10,
                }}
              >
                {errors.name}
              </Text>
            )}
            <Text style={styles.inputTitle}>어떤 정원을 만드실 건가요?</Text>
            <TextInput
              name="description"
              placeholder="정원에 대한 설명을 적어주세요."
              style={styles.textInput}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
            />
            <View style={{ padding: 15 }}>
              <Button onPress={handleSubmit} title="정원 만들기" />
            </View>
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

export default CreateGroupScreen;

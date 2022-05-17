import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GREEN_COLOR } from "../../common/colors";
import { MainWrapper } from "../../components/common/MainWrapper";
import CreateGroupScreen from "./CreateGroupScreen";
import JoinGroupScreen from "./JoinGroupScreen";

const AddGroupScreen = ({ navigation }) => {
  const [type, setType] = useState("create");
  return (
    <MainWrapper>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          style={
            type === "create"
              ? styles.activeTypeButton
              : styles.inactiveTypeButton
          }
          onPress={() => setType("create")}
        >
          <Text
            style={
              type === "create"
                ? styles.activeButtonTitle
                : styles.inactiveButtonTitle
            }
          >
            그룹 생성하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            type === "join"
              ? styles.activeTypeButton
              : styles.inactiveTypeButton
          }
          onPress={() => setType("join")}
        >
          <Text
            style={
              type === "join"
                ? styles.activeButtonTitle
                : styles.inactiveButtonTitle
            }
          >
            그룹 참여하기
          </Text>
        </TouchableOpacity>
      </View>
      {type === "create" && <CreateGroupScreen navigation={navigation} />}
      {type === "join" && <JoinGroupScreen navigation={navigation} />}
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  activeTypeButton: {
    flex: 1,
    height: 50,
    borderBottomColor: GREEN_COLOR,
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inactiveTypeButton: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  activeButtonTitle: {
    color: GREEN_COLOR,
    fontSize: 17,
  },
  inactiveButtonTitle: {
    color: "#fff",
    fontSize: 17,
  },
});

export default AddGroupScreen;

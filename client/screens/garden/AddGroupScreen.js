import { Formik } from "formik";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CreateGroupScreen from "./CreateGroupScreen";
import JoinGroupScreen from "./JoinGroupScreen";

const AddGroupScreen = ({ navigation }) => {
  const [type, setType] = useState("create");
  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            width: 150,
            height: 50,
            borderColor: "black",
            borderWidth: 2,
          }}
          onPress={() => setType("create")}
        >
          <Text>그룹 생성하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 150,
            height: 50,
            borderColor: "black",
            borderWidth: 2,
          }}
          onPress={() => setType("join")}
        >
          <Text>그룹 참여하기</Text>
        </TouchableOpacity>
      </View>
      {type === "create" && <CreateGroupScreen navigation={navigation} />}
      {type === "join" && <JoinGroupScreen navigation={navigation} />}
    </View>
  );
};

export default AddGroupScreen;

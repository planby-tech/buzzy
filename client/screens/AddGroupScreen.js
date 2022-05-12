import { Formik } from "formik";
import { View } from "react-native";
import CreateGroupScreen from "./CreateGroupScreen";

const AddGroupScreen = ({ navigation }) => {
  return (
    <View>
      <CreateGroupScreen navigation={navigation} />
    </View>
  );
};

export default AddGroupScreen;

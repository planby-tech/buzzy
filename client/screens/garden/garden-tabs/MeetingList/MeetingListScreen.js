import React from "react";
import { Text, View } from "react-native";
import { MainWrapper } from "../../../../components/common/MainWrapper";
import Button from "../../../../components/common/SubmitButton";

const MeetingListScreen = ({ navigation }) => {
  const handleNavigate = () => {
    navigation.navigate("CreateMeeting");
  };
  return (
    <MainWrapper>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          borderBottomWidth: 2,
          borderBottomColor: "#fff",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 24 }}>약속 리스트</Text>
      </View>
      <Button
        title="약속 잡기"
        onPress={handleNavigate}
        style={{ marginTop: 50 }}
      />
    </MainWrapper>
  );
};

export default MeetingListScreen;

import React from "react";
import { Button, Text, View } from "react-native";
import { MainWrapper } from "../../../../components/common/MainWrapper";

const MeetingListScreen = ({ navigation }) => {
  const handleNavigate = () => {
    navigation.navigate("CreateMeeting");
  };
  return (
    <MainWrapper>
      <Text style={{ color: "#fff", fontSize: 40 }}>MeetingList</Text>
      <Button title="약속 잡기" onPress={handleNavigate} />
    </MainWrapper>
  );
};

export default MeetingListScreen;

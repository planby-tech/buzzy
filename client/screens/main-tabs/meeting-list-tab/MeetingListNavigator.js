import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { MainWrapper } from "../../../components/common/MainWrapper";
import MeetingListScreen from "./MeetingListScreen";
import CreateMeetingScreen from "./CreateMeetingScreen";

const MeetingListStack = createNativeStackNavigator();

const MeetingListNavigator = () => {
  return (
    <MainWrapper>
      <MeetingListStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="MeetingList"
      >
        <MeetingListStack.Screen
          component={MeetingListScreen}
          name="MeetingList"
        />
        <MeetingListStack.Screen
          component={CreateMeetingScreen}
          name="CreateMeeting"
        />
      </MeetingListStack.Navigator>
    </MainWrapper>
  );
};

export default MeetingListNavigator;

import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { MainWrapper } from "../../../../components/common/MainWrapper";
import Button from "../../../../components/common/SubmitButton";
import { Calendar, LocaleConfig } from "react-native-calendars";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MeetingListScreen = ({ navigation }) => {
  LocaleConfig.locales["kr"] = {
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    dayNames: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  };
  LocaleConfig.defaultLocale = "kr";

  const handleNavigate = () => {
    navigation.navigate("CreateMeeting");
  };

  return (
    <MainWrapper style={{ padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 26, flex: 1 }}>약속</Text>
        <TouchableOpacity style={{ marginRight: 10 }}>
          <MaterialCommunityIcons
            name="filter-outline"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigate}>
          <MaterialCommunityIcons name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View
        style={{ padding: 13, backgroundColor: "#3A3A3A", borderRadius: 15 }}
      >
        <Text style={{ color: "white", fontSize: 20, marginBottom: 5 }}>
          우리 밥 한끼 어때?
        </Text>
        <Text style={{ color: "white", fontSize: 14, lineHeight: 20 }}>
          [가든 제목] 정원의 가드너들을{`\n`}깨우고 약속을 잡아보세요.
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: "#000",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 14, lineHeight: 20 }}>
            흔들기
          </Text>
        </TouchableOpacity>
      </View>
      <Calendar
        theme={{
          backgroundColor: "#000",
          calendarBackground: "#000",
          monthTextColor: "#fff",
          dayTextColor: "#fff",
        }}
      />
    </MainWrapper>
  );
};

export default MeetingListScreen;

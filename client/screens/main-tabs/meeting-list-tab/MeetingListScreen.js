import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import { MainWrapper } from "../../../components/common/MainWrapper";
import { Calendar, LocaleConfig } from "react-native-calendars";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import GardenerImage from "../../../assets/images/Gardener";

const MeetingListScreen = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false)
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

  // const handleNavigate = () => {
  //   navigation.navigate("CreateMeeting");
  // };

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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 13,
          backgroundColor: "#3A3A3A",
          borderRadius: 15,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "white", fontSize: 20, marginBottom: 5 }}>
              우리 밥 한끼 어때?
            </Text>
            <Text style={{ color: "white", fontSize: 14, lineHeight: 20 }}>
              [가든 제목] 정원의 가드너들을{`\n`}깨우고 약속을 잡아보세요.
            </Text>
          </View>
          <View style={{ marginRight: 32 }}>
            <GardenerImage />
          </View>
        </View>
        <TouchableOpacity
          style={{
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
      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <View style={{position: "absolute", bottom: 0, width:"100%", height: 300, backgroundColor: "#3a3a3a"}}>
          <Text>가든 선택하기</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}><Text>취소</Text></TouchableOpacity>
        </View>
      </Modal>
    </MainWrapper>
  );
};

export default MeetingListScreen;

import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal, StyleSheet, FlatList, Dimensions } from "react-native";
import { MainWrapper } from "../../../components/common/MainWrapper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Button from '../../../components/common/SubmitButton'

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import GardenerImage from "../../../assets/images/Gardener";
import { useSelector } from "react-redux";

const MeetingListScreen = ({ navigation }) => {
  const {groupArray} = useSelector(state => state.user)

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
  const { width, height } = Dimensions.get("screen");

  const groupListLayout = ({ item }) => {
    const handleSelect= () => {
      console.log("clicked")
    };
    return (
      <TouchableOpacity
        onPress={handleSelect}
        style={{
          width: 0.9 * width,
          height: 100,
          backgroundColor: "#3A3A3A",
          borderRadius: 12,
          padding: 20,
          paddingRight: 16,
          marginTop: 20,
        }}
        activeOpacity={0.5}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontFamily: "PretendardSemiBold",
              lineHeight: 20,
            }}
            numberOfLines={3}
          >
            {item.name}
          </Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
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
        <View style={{position: "absolute", bottom: 0, alignItems: "center", width:"100%", height: "95%", borderTopEndRadius: 20,backgroundColor: "#202020"}}>
          <Text style={styles.modalTitle}>가든 선택하기</Text>
          <Button title="취소" onPress={()=>setModalVisible(false)} />
          <FlatList
            data={groupArray}
            renderItem={groupListLayout}
            keyExtractor={(item, index) => index}
            // ListFooterComponent={AddGroupButton}
          />
        </View>
      </Modal>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  }
})

export default MeetingListScreen;

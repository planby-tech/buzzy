import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
  Switch,
} from "react-native";
import { MainWrapper } from "../../../components/common/MainWrapper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Button from "../../../components/common/SubmitButton";
import { useSelector } from "react-redux";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import GardenerImage from "../../../assets/images/Gardener";
import LeafIcon from "../../../assets/images/Leaf";
import { GREEN_COLOR } from "../../../common/colors";
import { useIsFocused } from "@react-navigation/native";

const MeetingListScreen = () => {
  const { groupArray } = useSelector((state) => state.user);

  const dateToStr = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return { year: year, month: month, day: day };
  };

  const [today, setToday] = useState(dateToStr(new Date()));
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedDate, setSelectedDate] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  const [selectedGroup, setSelectedGroup] = useState({ id: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [isGroupSelected, setIsGroupSelected] = useState(false);
  const [groupSubmitted, setGroupSubmitted] = useState(false);

  const [meetingTitle, setMeetingTitle] = useState("");

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

  const [activityList, setActivityList] = useState([
    { name: "식사", id: 1, selected: false },
    { name: "영화", id: 2, selected: false },
    { name: "쇼핑", id: 3, selected: false },
    { name: "여행", id: 4, selected: false },
    { name: "독서", id: 5, selected: false },
    { name: "미용", id: 6, selected: false },
    { name: "드라이브", id: 7, selected: false },
    { name: "피크닉", id: 8, selected: false },
    { name: "캠핑", id: 9, selected: false },
    { name: "게임", id: 10, selected: false },
    { name: "전시회", id: 11, selected: false },
    { name: "기타", id: 12, selected: false },
  ]);

  const { width, height } = Dimensions.get("screen");

  useEffect(() => {
    // setGroupSubmitted(false);
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    setToday(dateToStr(new Date()));
    console.log(today);
  }, [isFocused]);

  const handleModalClose = () => {
    setGroupSubmitted(false);
    setIsGroupSelected(false);
    setSelectedGroup({ id: 0 });
    setModalVisible(false);
  };

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    setSelectedDate({});
    const cp = {};
    cp[`${day.dateString}`] = { selected: true };
    setSelectedDate(cp);
  };

  const groupListLayout = ({ item }) => {
    const handleSelectGroup = () => {
      setSelectedGroup(item);
      setIsGroupSelected(true);
    };
    const checkColor = item.id === selectedGroup.id ? GREEN_COLOR : "#fff";

    return (
      <TouchableOpacity
        style={{
          width: 0.9 * width,
          height: 68,
          backgroundColor: "#3A3A3A",
          borderRadius: 12,
          padding: 12,
          paddingRight: 16,
          marginTop: 20,
        }}
        onPress={handleSelectGroup}
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
          <View>
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={24}
              color={checkColor}
            />
          </View>
        </View>
        <Text style={{ color: "#fff", fontSize: 12 }}>
          {item.users[0].name}
        </Text>
      </TouchableOpacity>
    );
  };

  const activityListLayout = ({ item }) => {
    const handleMultiSelect = (activityId) => {
      const cp = [...activityList];
      cp[activityId - 1].selected = !cp[activityId - 1].selected;
      setActivityList(cp);
    };

    return (
      <TouchableOpacity
        style={
          item.id % 4 === 0
            ? item.selected
              ? {
                  ...styles.activityCell,
                  marginRight: 0,
                  backgroundColor: GREEN_COLOR,
                }
              : { ...styles.activityCell, marginRight: 0 }
            : item.selected
            ? {
                ...styles.activityCell,
                backgroundColor: GREEN_COLOR,
              }
            : styles.activityCell
        }
        onPress={() => handleMultiSelect(item.id)}
      >
        <Text style={{ color: "#fff" }}>{item.name}</Text>
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
            flexDirection: "row",
          }}
          onPress={() => setModalVisible(true)}
        >
          <LeafIcon />
          <Text
            style={{
              color: "white",
              fontSize: 14,
              lineHeight: 20,
              marginLeft: 10,
            }}
          >
            흔들기
          </Text>
        </TouchableOpacity>
      </View>
      <Calendar
        theme={{
          backgroundColor: "#000",
          calendarBackground: "#000",
          monthTextColor: "#fff",
          arrowColor: GREEN_COLOR,
          dayTextColor: "#fff",
          textDisabledColor: "#2b2b2b",
          todayTextColor: GREEN_COLOR,
          selectedDayBackgroundColor: GREEN_COLOR,
        }}
        onDayPress={(day) => handleSelectDay(day)}
        markedDates={{ ...selectedDate }}
      />
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View
          style={{
            position: "absolute",
            bottom: 0,
            alignItems: "center",
            width: "100%",
            height: "95%",
            backgroundColor: "#202020",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          {!groupSubmitted ? (
            <>
              <Text style={styles.modalTitle}>가든 선택하기</Text>
              <FlatList
                data={groupArray}
                renderItem={groupListLayout}
                keyExtractor={(item, index) => index}
              />
              <View style={{ padding: 10, width: width * 0.95 }}>
                <Button
                  title="다음"
                  onPress={() => setGroupSubmitted(true)}
                  style={
                    isGroupSelected
                      ? {
                          borderWidth: 0,
                          marginBottom: 20,
                          backgroundColor: GREEN_COLOR,
                        }
                      : { borderWidth: 0, marginBottom: 20 }
                  }
                  disabled={!isGroupSelected}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.modalTitle}>약속 생성</Text>
              <View>
                <TextInput
                  onChangeText={(e) => setMeetingTitle(e)}
                  value={meetingTitle}
                  placeholder={`${selectedGroup.name}의 약속`}
                  placeholderTextColor={`rgba(255, 255, 255, 0.42)`}
                  style={{
                    color: "#fff",
                    borderBottomColor: "#fff",
                    borderBottomWidth: 1,
                    width: width * 0.9,
                    fontSize: 20,
                    paddingVertical: 12,
                  }}
                />
                <Text style={styles.durationTitle}>기간</Text>
                <View>
                  <View
                    style={{
                      ...styles.durationCell,
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  >
                    <Text style={styles.durationText}>하루 종일</Text>
                    <Switch style={{ height: 20 }} />
                  </View>
                  <View style={styles.durationCell}>
                    <Text style={styles.durationText}>
                      {`${selectedDay.year}년 ${selectedDay.month}월 ${selectedDay.day}일`}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.durationCell,
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                      borderBottomWidth: 0,
                    }}
                  >
                    <Text style={styles.durationText}>
                      {`${selectedDay.year}년 ${selectedDay.month}월 ${selectedDay.day}일`}
                    </Text>
                  </View>
                </View>
                <Text style={styles.durationTitle}>장소</Text>
                <View style={styles.placeContainer}>
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    size={26}
                    color="#fff"
                  />
                  <Text style={{ color: "#fff", marginLeft: 10 }}>
                    장소 검색
                  </Text>
                </View>
                <Text style={styles.durationTitle}>활동</Text>
                <View
                  style={{
                    width: 0.9 * width,
                  }}
                >
                  <FlatList
                    data={activityList}
                    renderItem={activityListLayout}
                    numColumns={4}
                  />
                </View>
                <Button
                  title="저장"
                  onPress={() => console.log("pressed")}
                  style={{
                    width: width * 0.9,
                    borderWidth: 0,
                    marginTop: 20,
                  }}
                />
                <Button
                  title="취소"
                  onPress={() => setModalVisible(false)}
                  style={{
                    width: width * 0.9,
                    borderWidth: 0,
                    marginTop: 20,
                  }}
                />
              </View>
            </>
          )}
        </View>
      </Modal>
    </MainWrapper>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  durationTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 12,
  },
  durationCell: {
    backgroundColor: "#3a3a3a",
    padding: 12,
    borderBottomColor: `rgba(255, 255, 255, 0.42)`,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  durationText: {
    color: "#fff",
  },
  placeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3a3a3a",
    padding: 12,
    borderRadius: 12,
  },
  activityCell: {
    flex: 1,
    height: 44,
    backgroundColor: "#3a3a3a",
    marginBottom: 12,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});

export default MeetingListScreen;

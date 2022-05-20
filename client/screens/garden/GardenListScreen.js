import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  StyleSheet,
  BackHandler,
} from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { MainWrapper } from "../../components/common/MainWrapper";
import { useFonts } from "expo-font";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { findByUser } from "../../redux/slices/user";
import { GREEN_COLOR } from "../../common/colors";

const GardenListScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    PretendardSemiBold: require("../../assets/fonts/Pretendard-SemiBold.otf"),
    PretendardBold: require("../../assets/fonts/Pretendard-Bold.otf"),
  });

  const [groupArray, setGroupArray] = useState([{ name: "name" }]);
  const [groupLoaded, setGroupLoaded] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [backPressedOnce, setBackPressedOnce] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (backPressedOnce) return false;
        else {
          showMessage({
            message: "뒤로 가기를 한 번 더 하시면 앱이 종료됩니다.",
            type: "Simple message",
          });
          setBackPressedOnce(true);
          setTimeout(() => {
            setBackPressedOnce(false);
          }, 2250);
          return true;
        }
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [backPressedOnce])
  );

  useEffect(() => {
    dispatch(findByUser())
      .unwrap()
      .then((data) => {
        setGroupArray(data);
        setGroupLoaded(true);
        if (data === null)
          setGroupArray([
            { name: "Garden name", description: "garden description" },
          ]);
      });
  }, [isFocused]);

  const groupListLayout = ({ item }) => {
    const handleNavigate = () => {
      navigation.navigate("GardenHome", item);
    };
    return (
      <TouchableOpacity
        onPress={handleNavigate}
        style={{
          width: 110,
          height: 140,
          borderColor: GREEN_COLOR,
          borderWidth: 1,
          borderRadius: 10,
          paddingLeft: 10,
          paddingTop: 7,
          marginRight: 5,
        }}
        activeOpacity={0.5}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontFamily: "PretendardSemiBold",
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const AddGroupButton = () => {
    const handleAddGroup = () => {
      navigation.navigate("AddGroup");
    };

    return (
      <TouchableOpacity
        onPress={handleAddGroup}
        style={{
          width: 110,
          height: 140,
          backgroundColor: GREEN_COLOR,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#FFF", fontSize: 15 }}>+ 그룹 추가하기</Text>
      </TouchableOpacity>
    );
  };

  const handleNavigateToNFC = () => {
    navigation.navigate("NFCTag");
  };

  return fontsLoaded && groupLoaded ? (
    <MainWrapper style={{ padding: 20 }}>
      <StatusBar />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <Text style={styles.headerTitle}>가든</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headerTitle}>채팅</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={handleNavigateToNFC}
          >
            <MaterialCommunityIcons
              name="nfc-variant"
              size={26}
              color="#40BB91"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginTop: 30,
          padding: 20,
          paddingTop: 15,
          backgroundColor: "#3A3A3A",
          height: "60%",
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontFamily: "PretendardSemiBold",
          }}
        >
          {groupArray[1].name} 정원
        </Text>
      </View>
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          margin: 10,
          marginLeft: 0,
          fontFamily: "PretendardSemiBold",
        }}
      >
        Recent
      </Text>
      <FlatList
        horizontal
        data={groupArray}
        renderItem={groupListLayout}
        keyExtractor={(item, index) => index}
        ListFooterComponent={AddGroupButton}
      />
    </MainWrapper>
  ) : null;
};

const styles = StyleSheet.create({
  headerTitle: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "PretendardBold",
    marginRight: 15,
  },
});

export default GardenListScreen;

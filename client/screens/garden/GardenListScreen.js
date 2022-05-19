import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
  BackHandler,
} from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { MainWrapper } from "../../components/common/MainWrapper";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { findByUser } from "../../redux/slices/user";
import { GREEN_COLOR } from "../../common/colors";

const GardenListScreen = ({ navigation }) => {
  const [groupArray, setGroupArray] = useState([{ name: "name" }]);
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
        // if (data === null)
        //   setGroupArray([
        //     { name: "Garden name", description: "garden description" },
        //   ]);
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
          height: 50,
          borderColor: "#fff",
          borderWidth: 2,
          paddingLeft: 10,
          justifyContent: "center",
        }}
        activeOpacity={0.5}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>{item.name}</Text>
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
          height: 50,
          backgroundColor: GREEN_COLOR,
          borderWidth: 2,
          borderRadius: 10,
          margin: 20,
          paddingLeft: 10,
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

  return (
    <MainWrapper>
      <StatusBar />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            fontSize: 20,
            marginVertical: 10,
            color: "#fff",
            flex: 1,
          }}
        >
          나의 모든 정원
        </Text>
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
      <FlatList
        data={groupArray}
        renderItem={groupListLayout}
        keyExtractor={(item, index) => index}
        ListFooterComponent={AddGroupButton}
      />
    </MainWrapper>
  );
};

export default GardenListScreen;

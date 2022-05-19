import MeetingListNavigator from "./garden-tabs/MeetingListNavigator";
import MapScreen from "./garden-tabs/MapScreen";
import MyScreen from "./garden-tabs/MyScreen";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GREEN_COLOR } from "../../common/colors";
import GardenListScreen from "./GardenListScreen";

const GardenTab = createMaterialBottomTabNavigator();

const GardenTabs = ({ groupInfo }) => {
  return (
    <GardenTab.Navigator
      initialRouteName="GardenList"
      barStyle={{
        backgroundColor: "#202020",
        height: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      activeColor={GREEN_COLOR}
      inactiveColor="#fff"
    >
      <GardenTab.Screen
        name="GardenList"
        component={GardenListScreen}
        options={{
          tabBarLabel: "정원",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="flower" size={26} color={color} />
          ),
        }}
      />
      <GardenTab.Screen
        name="MeetingListNavigator"
        component={MeetingListNavigator}
        options={{
          tabBarLabel: "약속 리스트",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-checkbox"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <GardenTab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: "지도",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <GardenTab.Screen
        name="My"
        component={MyScreen}
        options={{
          tabBarLabel: "마이",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={26}
              color={color}
            />
          ),
        }}
      />
    </GardenTab.Navigator>
  );
};

export default GardenTabs;

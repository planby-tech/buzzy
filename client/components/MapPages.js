import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Map from "../pages/Map";
import AddGroupScreen from "./AddGroupScreen";
import CreateGroupScreen from "./CreateGroupScreen";
import JoinGroupScreen from "./JoinGroupScreen";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Map 1"
        component={Map}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Map 2"
        component={Map}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="그룹 생성하기" component={CreateGroupScreen} />
      <Drawer.Screen name="그룹 참여하기" component={JoinGroupScreen} />
    </Drawer.Navigator>
  );
}

const MapPages = () => {
  return <MyDrawer />;
};

export default MapPages;

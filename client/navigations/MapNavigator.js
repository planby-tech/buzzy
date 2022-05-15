import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Map from "../pages/Map";
import CreateGroupScreen from "../screens/garden/CreateGroupScreen";
import JoinGroupScreen from "../screens/garden/JoinGroupScreen";
import { useEffect, useState } from "react";
import userService from "../services/user.service";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const [groupArray, setGroupArray] = useState([{ group: { name: "name" } }]);
  useEffect(() => {
    userService.findByUser().then((data) => {
      setGroupArray(data);
    });
  }, []);

  return (
    <>
      {groupArray ? (
        <Drawer.Navigator>
          {groupArray.map((val, idx) => {
            return (
              <Drawer.Screen
                name={val.group.name}
                component={Map}
                options={{ headerShown: false }}
                key={idx}
              />
            );
          })}
          {/* <Drawer.Screen
            name="Map 1"
            component={Map}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Map 2"
            component={Map}
            options={{ headerShown: false }}
          /> */}
          <Drawer.Screen name="그룹 생성하기" component={CreateGroupScreen} />
          <Drawer.Screen name="그룹 참여하기" component={JoinGroupScreen} />
        </Drawer.Navigator>
      ) : null}
    </>
  );
}

const MapNavigator = () => {
  return <MyDrawer />;
};

export default MapNavigator;

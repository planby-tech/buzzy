import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Map from "../pages/Map";

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
    </Drawer.Navigator>
  );
}

const MapPages = () => {
  return <MyDrawer />;
};

export default MapPages;

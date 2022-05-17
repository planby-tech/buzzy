import GardenTabs from "./GardenTabs";

const GardenTabsScreen = ({ route }) => {
  const groupInfo = route.params;
  return <GardenTabs groupInfo={groupInfo} />;
};

export default GardenTabsScreen;

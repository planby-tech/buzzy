import GardenTabs from "./GardenTabs";

const GardenTabsScreen = ({ route }) => {
  const groupInfoArray = route.params.groupInfoArray;
  const userInfo = route.params.userInfo.user.user;
  // {"id":1,"email":"daehan1028@gmail.com","password":"$2a$08$e2TsNOuWWfbvoua9y4m4ee4XlgNcG5/7na9bt179LIFom492K/09i","name":"Daehan","createdAt":"2022-05-27T17:14:40.000Z","updatedAt":"2022-05-27T17:14:40.000Z"}
  return <GardenTabs groupInfoArray={groupInfoArray} userInfo={userInfo} />;
};

export default GardenTabsScreen;

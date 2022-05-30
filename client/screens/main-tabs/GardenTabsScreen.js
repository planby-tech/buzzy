import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GardenTabs from "./GardenTabs";
import { loadUserData } from "../../redux/slices/auth";
import { findByUser } from "../../redux/slices/user";

const GardenTabsScreen = () => {
  // const groupInfoArray = route.params.groupInfoArray;
  // const userInfo = route.params.userInfo.user.user;

  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({});
  const [groupInfoArray, setGroupInfoArray] = useState([]);

  useEffect(async () => {
    dispatch(loadUserData())
      .unwrap()
      .then((res) => {
        dispatch(findByUser(res.user.user.id))
          .unwrap()
          .then((data) => {
            setUserInfo(res.user.user);
            setGroupInfoArray(data);
          })
          .then(() => {
            console.log(JSON.stringify(userInfo));
            console.log(JSON.stringify(groupInfoArray));
          });
      });
  }, [dispatch]);
  // {"id":1,"email":"daehan1028@gmail.com","password":"$2a$08$e2TsNOuWWfbvoua9y4m4ee4XlgNcG5/7na9bt179LIFom492K/09i","name":"Daehan","createdAt":"2022-05-27T17:14:40.000Z","updatedAt":"2022-05-27T17:14:40.000Z"}
  return <GardenTabs groupInfoArray={groupInfoArray} userInfo={userInfo} />;
};

export default GardenTabsScreen;

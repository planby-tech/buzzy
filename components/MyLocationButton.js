import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

const MyLocationButton = (props) => {
  const [currentLocation, setCurrentLocation] = useState({
    ...props.currentLocation,
  });
  //initialize currentLocation with the props from Map.js

  const getMyLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation({
      ...currentLocation,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    return currentLocation;
  };

  return (
    <View>
      <View>
        <Button
          onPress={async () => props.updateLocation(await getMyLocation())}
          title="My Location"
          color="#841584"
        />
      </View>
    </View>
  );
};

export default MyLocationButton;

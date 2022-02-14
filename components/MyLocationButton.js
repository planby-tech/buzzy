import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

const MyLocationButton = (props) => {
  return (
    <View>
      <View>
        <Button
          onPress={async () =>
            props.updateLocation(await Location.getCurrentPositionAsync({}))
          }
          title="My Location"
          color="#841584"
        />
      </View>
    </View>
  );
};

export default MyLocationButton;

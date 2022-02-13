import React from "react";
import { Text, View, Dimensions, Image } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";

const { height } = Dimensions.get("window");

class BottomSheet extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello world</Text>
        <SlidingUpPanel
          ref={(c) => (this._panel = c)}
          draggableRange={{ top: height / 1.75, bottom: 120 }}
          animatedValue={this._draggedValue}
          showBackdrop={false}
        >
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Text style={{ color: "#FFF" }}>{this.props.place}</Text>
            </View>
            <View style={styles.container2}>
              <Text>Bottom Sheet Content</Text>
            </View>
            <View style={styles.favoriteIcon}>
              <Image
                style={styles.heart}
                source={require("../assets/heart.png")}
              />
            </View>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  panelHeader: {
    height: 120,
    backgroundColor: "#b197fc",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteIcon: {
    position: "absolute",
    top: -24,
    right: 24,
    backgroundColor: "#2b8a3e",
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1,
  },
  heart: {
    position: "absolute",
    top: 7.5,
    right: 6,
  },
};

export default BottomSheet;

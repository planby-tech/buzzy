import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MainWrapper } from "../../components/common/MainWrapper";

import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

const NFCTagScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ alignItems: "center" }}>
        <NFCVectorImage />
        <Text
          style={{
            fontWeight: "700",
            fontSize: 50,
            marginTop: -30,
          }}
        >
          NFC
        </Text>
        <Text style={{ fontSize: 24, marginTop: 40 }}>
          현재 정보를 <Text style={{ fontWeight: "700" }}>Buzzy</Text>에
        </Text>
        <Text style={{ fontSize: 24 }}>저장하시겠습니까?</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => console.log("save button is pressed")}
          activeOpacity={0.6}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>정보 저장하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: "#000",
    width: 350,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});

const NFCVectorImage = () => {
  return (
    <Svg
      width="130"
      height="130"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_181_1557)">
        <Path
          d="M63.9458 44.8702C62.8456 44.8702 61.7616 44.4495 60.9202 43.6082C49.368 32.0721 30.5997 32.0721 19.0474 43.6082C17.3809 45.2747 14.6628 45.2747 12.9963 43.6082C11.3298 41.9417 11.3298 39.2235 12.9963 37.557C27.8815 22.6718 52.0862 22.6718 66.9714 37.557C68.6379 39.2235 68.6379 41.9417 66.9714 43.6082C66.1301 44.4495 65.0298 44.8702 63.9458 44.8702Z"
          fill="#000"
        />
        <Path
          d="M52.3612 56.4384C51.261 56.4384 50.177 56.0178 49.3356 55.1764C46.844 52.6848 43.511 51.3095 39.9838 51.3095C36.4567 51.3095 33.1237 52.6848 30.632 55.1764C28.9655 56.8429 26.2474 56.8429 24.5809 55.1764C22.9144 53.5099 22.9144 50.7917 24.5809 49.1252C28.6905 45.0156 34.1592 42.7505 39.9838 42.7505C45.8085 42.7505 51.2772 45.0156 55.3868 49.1414C57.0533 50.8079 57.0533 53.5261 55.3868 55.1926C54.5616 56.0178 53.4614 56.4384 52.3612 56.4384Z"
          fill="#000"
        />
        <Path
          d="M75.7084 33.1075C74.6081 33.1075 73.5241 32.6868 72.6828 31.8455C54.6425 13.8214 25.3251 13.8214 7.30104 31.8455C5.63454 33.512 2.91637 33.512 1.24987 31.8455C-0.416624 30.179 -0.416624 27.4608 1.24987 25.7943C11.6048 15.4394 25.3575 9.74414 40 9.74414C54.6425 9.74414 68.3952 15.4394 78.7501 25.7943C80.4166 27.4608 80.4166 30.179 78.7501 31.8455C77.8926 32.6868 76.7924 33.1075 75.7084 33.1075Z"
          fill="#000"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_181_1557">
          <Rect width="80" height="80" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default NFCTagScreen;

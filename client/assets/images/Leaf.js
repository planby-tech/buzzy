import Svg, { Path } from "react-native-svg";

export default LeafIcon = () => {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M5 21C5.5 16.5 7.5 13 12 11"
        stroke="#fff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.99999 18C15.218 18 19.5 14.712 20 6V4H15.986C6.98599 4 3.99999 8 3.98599 13C3.98599 14 3.98599 16 5.98599 18H8.98599H8.99999Z"
        stroke="#fff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

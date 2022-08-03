import { Dimensions } from "react-native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default {
  screen: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};

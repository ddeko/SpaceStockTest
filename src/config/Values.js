import { Platform, Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;

export default {
  deviceHeight,
  deviceWidth,
  platform,

  //size
  fontSize: {
    xxLarge: 30,
    xLarge: 25,
    large: 20,
    medium: 18,
    small: 14,
    xSmall: 12,
    xxSmall: 11,
    xxxSmall: 9,
  },

  //styles
  roundedButton: {
    padding: 8,
    borderRadius: 5,
    elevation: 2,
    margin: 4
  }
};







import { StyleSheet } from "react-native";
export const showBorder = 1;

const stylesGlobal = StyleSheet.create({
  innerContainer: {
    borderColor: "blue",
    borderWidth: showBorder,
    height: "100%",
    backgroundColor: "white",
  },
  title: {
    fontFamily: "LogoFont",
    fontSize: 50,
    fontWeight: "bold",
    color: "navy",
    textAlign: "center",
  },
});

export default stylesGlobal;

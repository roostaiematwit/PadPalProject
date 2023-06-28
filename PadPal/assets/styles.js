import { StyleSheet } from "react-native";

const stylesGlobal = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: showBorder,
  },
  innerContainer: {
    borderColor: "blue",
    borderWidth: showBorder,
    height: "100%",
    backgroundColor: "white",
  },
  padPalContainer: {
    flex: 1,
    borderWidth: showBorder,
    marginTop: 35,
    marginBottom: 0,
    borderColor: "red",
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

export const showBorder = 1;

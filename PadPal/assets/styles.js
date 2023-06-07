import { StyleSheet } from "react-native";

const stylesGlobal = StyleSheet.create({
  notch: {},
  screenContainer: {
    flex: 1,
    marginTop: 35,
    marginBottom: 0,
    borderColor: "blue",
    borderWidth: 0,
    backgroundColor: "white",
  },
  innerContainer: {
    borderColor: "red",
    borderWidth: 0,
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

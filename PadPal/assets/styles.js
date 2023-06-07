import { StyleSheet } from "react-native";

const stylesGlobal = StyleSheet.create({
  notch: { flex: 1, backgroundColor: "grey" },
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 35,
    marginBottom: 0,
    borderColor: "blue",
    borderWidth: 1,
  },
  innerContainer: {
    borderColor: "red",
    borderWidth: 1,
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

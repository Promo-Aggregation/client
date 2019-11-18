import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  detail: {
    flex: 1
  },
  card: {
    margin: 20
  },
  empty: { height: height, width: width },
  text: {
    margin: 20,
    fontSize: 20,
    color: "#19f"
  },
  view: {
    margin: 10,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  input: {
    justifyContent: "center",
    width: (width * 3) / 5,
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#19f"
  },
  search: {
    width: width / 5,
    marginRight: 30
  },
  bulkChip: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});

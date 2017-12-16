import React from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Swipeout from "react-native-swipeout";
import { TINT_COLOR } from "./styles/common";

class Todo extends React.PureComponent {
  render() {
    const deleteButton = [
      { text: "Delete", type: "delete", onPress: this.props.onDelete }
    ];
    return (
      <Swipeout
        right={deleteButton}
        autoClose
        style={{ backgroundColor: "white" }}
      >
        <TouchableHighlight onPress={this.props.onPress} underlayColor="#ddd">
          <View style={styles.row}>
            {this.props.item.done ? (
              <MaterialCommunityIcons
                name="checkbox-marked-outline"
                size={24}
                color={TINT_COLOR}
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-outline"
                size={24}
                color={TINT_COLOR}
              />
            )}
            <Text style={styles.text}>{this.props.item.key}</Text>
            <TouchableOpacity onPress={this.props.onInfoPress}>
              <Ionicons
                name="ios-information-circle-outline"
                size={28}
                color={TINT_COLOR}
              />
            </TouchableOpacity>
            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              color="gray"
            />
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    marginLeft: 10,
    flex: 1
  },
  row: {
    marginLeft: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  }
});

export default Todo;

import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class Todo extends React.Component {
  state = {
    done: this.props.item.done
  };
  render() {
    return (
      <TouchableHighlight
        onPress={() => {
          this.setState({ done: !this.state.done });
        }}
        underlayColor="#ddd"
      >
        <View style={styles.row}>
          {this.state.done ? (
            <MaterialCommunityIcons
              name="checkbox-marked-outline"
              size={24}
              color="rgb(4, 169, 235)"
            />
          ) : (
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              size={24}
              color="rgb(4, 169, 235)"
            />
          )}
          <Text style={styles.text}>{this.props.item.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    marginLeft: 10
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

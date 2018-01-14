import React from "react";
import { View, FlatList } from "react-native";

import Todo from "./Todo";

const todolist = [
  { text: "Buy the milk", done: false },
  { text: "Submit the app", done: false },
  { text: "Write an article", done: true },
  { text: "Walk the dog", done: false },
  { text: "Go shopping on Amazon", done: false },
  { text: "Wash the dish", done: false },
  { text: "Call Steve", done: false },
  { text: "Call Ray", done: false },
  { text: "Buy a present to Antonio", done: false }
];

class Todolist extends React.Component {
  _keyExtractor = (item, index) => index;
  _renderItem = ({ item }) => <Todo item={item} />;

  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={todolist}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default Todolist;

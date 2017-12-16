import React from "react";
import {
  View,
  FlatList,
  Button,
  TouchableOpacity,
  AsyncStorage,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import { TINT_COLOR } from "./styles/common";

import Todo from "./Todo";

const initialTodolist = [
  { key: "Buy the milk", done: false },
  { key: "Submit the app", done: false },
  { key: "Write an article", done: true },
  { key: "Walk the dog", done: false },
  { key: "Go shopping on Amazon", done: false },
  { key: "Wash the dish", done: false },
  { key: "Buy a present to Antonio", done: true },
  { key: "Call Steve", done: false },
  { key: "Call Ray", done: false }
];

class Todolist extends React.PureComponent {
  state = {
    todolist: []
  };

  async _loadList() {
    let response = await AsyncStorage.getItem("todolist");
    let todolist = (await JSON.parse(response)) || initialTodolist;
    this.setState({ todolist });
  }

  async _updateList(todolist) {
    this.setState({ todolist });
    await AsyncStorage.setItem("todolist", JSON.stringify(todolist));
  }

  componentDidMount() {
    this._loadList();
    this.props.navigation.setParams({ onAdd: this._add });
  }

  _add = item => {
    let todolist = [...this.state.todolist, item];
    this._updateList(todolist);
  };

  _save = item => {
    let todolist = this.state.todolist.map(
      todo => (todo.id === item.id ? item : todo)
    );
    this._updateList(todolist);
  };

  _toggle = item => {
    let todolist = this.state.todolist.map(
      todo => (todo === item ? { ...todo, done: !todo.done } : todo)
    );
    this._updateList(todolist);
  };

  _delete = item => {
    let todolist = this.state.todolist.filter(todo => todo !== item);
    setTimeout(() => this._updateList(todolist), 100);
  };

  _edit = item => {
    this.props.navigation.navigate("EditTodo", {
      item,
      onEndEditing: this._save,
      headerTitle: "Edit Todo"
    });
  };

  _keyExtractor = (item, index) => {
    item.id = index;
    return index;
  };

  _renderItem = ({ item }) => (
    <Todo
      item={item}
      onPress={() => this._toggle(item)}
      onInfoPress={() => this._edit(item)}
      onDelete={() => this._delete(item)}
    />
  );

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.todolist}
          renderItem={this._renderItem}
        />
        {Platform.OS === "android" ? (
          <ActionButton
            buttonColor={TINT_COLOR}
            elevation={12}
            onPress={() => {
              this.props.navigation.navigate("EditTodo", {
                onAdd: this._add,
                headerTitle: "Add Todo"
              });
            }}
          />
        ) : null}
      </View>
    );
  }
}

Todolist.navigationOptions = ({ navigation }) => {
  return {
    title: "MyChecklists",
    headerRight:
      Platform.OS === "ios" ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditTodo", {
              onAdd: navigation.state.params.onAdd,
              headerTitle: "Add Todo"
            })
          }
        >
          <Ionicons
            style={{ paddingHorizontal: 15 }}
            name="ios-add-outline"
            size={34}
            color={TINT_COLOR}
          />
        </TouchableOpacity>
      ) : null
  };
};

export default Todolist;

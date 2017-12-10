import React from "react";
import { View, FlatList, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Todo from "./Todo";

const todolist = [
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
    todolist
  };
  componentDidMount() {
    // console.log(this.props.navigation.set);
    this.props.navigation.setParams({onAdd: this._onAdd});
  }
  _onAdd = item => {
    this.setState({todolist: [...this.state.todolist, item]});
  }
  _onSave = item => {
    
  }

  _toggle = item => {
    this.setState({
      todolist: this.state.todolist.map(
        todo => (todo === item ? { ...todo, done: !todo.done } : todo)
      )
    });
    // console.log("todolist", this.state.todolist);
  };
  _edit = item => {
    // console.log("edit", item);
    this.props.navigation.navigate('AddTodo', {item, onSave: this._onSave});
  }
  _keyExtractor = (item, index) => index;
  _renderItem = ({ item }) => (
    <Todo item={item} onPress={() => this._toggle(item)} onEdit={() => this._edit(item)}/>
  );

  // componentDidMount() {
  //   this.props.navigation.navigate('AddTodo');
  // }

  render() {
    // console.log("rendering:", this.state.todolist);
    
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.todolist}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

Todolist.navigationOptions = ({navigation}) => {

  return {
    title: "Checklists",
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('AddTodo', {onAdd: navigation.state.params.onAdd}) }
        >
        <Ionicons
          style={{ paddingHorizontal: 15 }}
          name="ios-add-outline"
          size={34}
          color="rgb(4, 169, 235)"
        />
      </TouchableOpacity>
    )
  }
  
};

export default Todolist;

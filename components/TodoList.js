import React from 'react';
import { View, FlatList } from 'react-native';

import Todo from './Todo';

const todolist = [
    {key: "Buy the milk", done: false}, 
    {key: "Submit the app", done: false},
    {key: "Write an article", done: true},
    {key: "Walk the dog", done: false},
    {key: "Go shopping on Amazon", done: false},
    {key: "Wash the dish", done: false},
    {key: "Buy a present to Antonio", done: true},
    {key: "Call Steve", done: false},
    {key: "Call Ray", done: false}
  ];


class Todolist extends React.Component {

    _keyExtractor = (item, index) => index;
    _renderItem = ({item}) => (
      <Todo item={item} />
    );
  
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
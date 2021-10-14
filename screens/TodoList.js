import React, { useState } from 'react';
import { View, FlatList, Asy } from 'react-native';
import { TINT_COLOR } from '../components/styles/common';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Todo from '../components/Todo';

const initialTodolist = [
  { text: 'Buy the milk', done: false },
  { text: 'Submit the app', done: false },
  { text: 'Write an article', done: true },
  { text: 'Walk the dog', done: false },
  { text: 'Go shopping on Amazon', done: false },
  { text: 'Wash the dish', done: false },
  { text: 'Call Steve', done: false },
  { text: 'Call Ray', done: false },
  { text: 'Buy a present to Antonio', done: false },
];

export default function Todolist({ navigation, route }) {
  const [todolist, setTodoList] = useState(initialTodolist);
  const _keyExtractor = (item, index) => {
    item.id = index;
    return index.toString();
  };
  const _renderItem = ({ item }) => (
    <Todo
      item={item}
      onPress={() => _toggle(item)}
      onInfoPress={() => navigation.navigate('AddTodo', item)}
    />
  );

  const _add = (item) => {
    setTodoList([...todolist, item]);
  };

  const _update = (item) =>
    setTodoList(todolist.map((todo) => (todo.id == item.id ? item : todo)));

  const _toggle = (item) => {
    console.log('toggling', item);
    setTodoList(
      todolist.map((todo) =>
        todo == item ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  React.useEffect(() => {
    const _loadList = async () => {
      let response = await AsyncStorage.getItem('todolist');
      let todolist = (await JSON.parse(response)) || initialTodolist;
      console.log('loading from asyncStorage');
      setTodoList(todolist);
    };
    _loadList();
  }, []);

  React.useEffect(() => {
    const _saveList = async () => {
      await AsyncStorage.setItem('todolist', JSON.stringify(todolist));
      console.log('saving to asyncStorage');
    };
    // if (route.params?.newItem) {
    //   _saveList();
    // }
    _saveList();
  }, [todolist]);

  React.useEffect(() => {
    console.log('route.params', route.params);
    if (route.params?.newItem) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      _add(route.params?.newItem);
    }
    if (route.params?.updatedItem) {
      _update(route.params.updatedItem);
    }
  }, [route.params]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={_keyExtractor}
        data={todolist}
        renderItem={_renderItem}
      />
    </View>
  );
}

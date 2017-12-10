import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { StackNavigator } from "react-navigation";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

const AppNavigator = StackNavigator(
  {
    TodoList: {
      screen: TodoList
    },
    AddTodo: {
      screen: AddTodo
    }
  },
  {
    // headerMode: 'float',
    // initialRouteName: 'AddTodo',
    mode: "modal",
    navigationOptions: { headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight } }
  }
);

export default () => <AppNavigator />;

// export default class App extends React.Component {
//   render() {
//     return (
//       <AppNavigator />
//     );
//   }
// }

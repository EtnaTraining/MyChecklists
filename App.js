import React from "react";
import { Platform } from "react-native";
import { StackNavigator } from "react-navigation";
import TodoList from "./components/TodoList";
import EditTodo from "./components/EditTodo";
import { TINT_COLOR } from "./components/styles/common";

const AppNavigator = StackNavigator(
  {
    TodoList: {
      screen: TodoList
    },
    EditTodo: {
      screen: EditTodo
    }
  },
  {
    mode: "modal",
    cardStyle: {
      backgroundColor: TINT_COLOR
    },
    navigationOptions:
      Platform.OS === "android"
        ? {
            headerTintColor: "white",
            headerStyle: {
              marginTop: Expo.Constants.statusBarHeight,
              backgroundColor: TINT_COLOR
            }
          }
        : {}
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

import React from "react";
import { Platform } from "react-native";
import { StackNavigator } from "react-navigation";
import TodoList from "./components/TodoList";
import EditTodo from "./components/EditTodo";

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
    navigationOptions: {
      headerStyle: {
        marginTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        backgroundColor: "rgb(249, 249, 249)"
      }
    }
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

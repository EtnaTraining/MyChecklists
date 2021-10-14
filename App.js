import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TodoList from './screens/TodoList';
import AddTodo from './screens/AddTodo';
import { Ionicons } from '@expo/vector-icons';

import { TINT_COLOR } from './components/styles/common';

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="TodoList"
        component={TodoList}
        options={({ navigation, route }) => ({
          title: 'My Checklist',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('AddTodo')}>
              <Ionicons name="ios-add-outline" size={34} color={TINT_COLOR} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AddTodo"
        component={AddTodo}
        options={{
          title: 'Add New Item',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

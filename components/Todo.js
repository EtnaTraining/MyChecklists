import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TINT_COLOR } from './styles/common';

const Todo = ({ item }) => {
  const [done, setDone] = useState(item.done);

  return (
    <TouchableHighlight
      onPress={() => {
        setDone(!done);
      }}
      underlayColor="#ddd"
    >
      <View style={styles.row}>
        {done ? (
          <MaterialCommunityIcons
            name="checkbox-marked-outline"
            size={24}
            color={TINT_COLOR}
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={24}
            color={TINT_COLOR}
          />
        )}
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    marginLeft: 10,
  },
  row: {
    marginLeft: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Todo;

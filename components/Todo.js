import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { TINT_COLOR } from './styles/common';

const Todo = ({ item, onPress, onInfoPress }) => {
  const [done, setDone] = useState(item.done);

  return (
    <TouchableHighlight
      onPress={
        onPress
        //   () => {
        //   setDone(!done);
        // }
      }
      underlayColor="#ddd"
    >
      <View style={styles.row}>
        {item.done ? (
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
        <TouchableOpacity onPress={onInfoPress}>
          <Ionicons
            name="ios-information-circle-outline"
            size={28}
            color={TINT_COLOR}
          />
        </TouchableOpacity>
        <MaterialCommunityIcons name="chevron-right" size={22} color="gray" />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    marginLeft: 10,
    flex: 1,
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

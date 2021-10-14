import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import DueDate from '../components/DueDate';

import { TINT_COLOR } from '../components/styles/common';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddTodo({ navigation }) {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [shouldRemind, setShouldReming] = useState(false);

  const inputRef = useRef();

  const _save = () => {
    console.log('text', text);
    const newItem = {
      text,
      done,
      dueDate: dueDate.toString(),
    };
    console.log(newItem);
    // navigation.goBack();
    navigation.navigate({
      name: 'TodoList',
      params: { newItem },
      merge: true,
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack(null);
          }}
        >
          {Platform.OS === 'ios' ? (
            <Text style={styles.headerBtn}>Cancel</Text>
          ) : (
            <MaterialIcons name="close" size={28} style={styles.closeBtn} />
          )}
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => _save()}>
          <Text style={styles.headerBtn}>
            {Platform.OS === 'ios' ? 'Save' : 'SAVE'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, text, dueDate]);

  return (
    <View style={styles.wrapper} behavior="padding">
      <View style={/* 1 */ [styles.todowrapper, { padding: 15 }]}>
        <TextInput
          ref={inputRef}
          style={/* 2 */ [styles.textInputStyleOnAndroid, styles.label]}
          placeholder="Name of the item"
          // the autoFocus property makes this field the first responder
          autoFocus
          // underlineColorAndroid={TINT_COLOR}
          value={text}
          onSubmitEditing={_save}
          onChangeText={setText}
        />
      </View>
      <View style={styles.todowrapper}>
        <View style={styles.remindRow}>
          <Text style={styles.label}>Remind me</Text>
          <Switch
            onTintColor={TINT_COLOR}
            onValueChange={setShouldReming}
            value={shouldRemind}
          />
        </View>
        <DueDate
          onTouch={() => inputRef.current?.blur()}
          style={{ label: styles.label }}
          dueDate={dueDate}
          onDateChange={setDueDate}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: '#E9E9EF', flex: 1 },
  todowrapper: {
    marginTop: 30,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  textInputStyleOnAndroid:
    Platform.OS === 'android' ? { paddingBottom: 7, paddingLeft: 7 } : {},
  remindRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
  },
  closeBtn: { padding: 10, color: TINT_COLOR },
  headerBtn: {
    color: TINT_COLOR,
    // padding: 10,
    fontSize: 18,
  },
});

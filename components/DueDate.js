import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
// 1
import moment from 'moment';
import { TINT_COLOR } from './styles/common';

import DateTimePicker from '@react-native-community/datetimepicker';

const DueDate = ({ dueDate, onDateChange, style, onTouch }) => {
  // const [dueDate, setDueDate] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  const _showPicker = () => {
    setIsVisible(!isVisible);
    onTouch();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    console.log(moment(dueDate).format('lll'));
    setIsVisible(Platform.OS === 'ios');
    onDateChange(currentDate);
  };

  return (
    <View>
      <TouchableOpacity activeOpacity={0.6} onPress={_showPicker}>
        <View style={styles.pickerRow}>
          <Text style={style.label}>Due Date</Text>
          <Text /* 4 */ style={[style.label, { color: TINT_COLOR }]}>
            {moment(dueDate).format('lll') /* 5 */}
          </Text>
        </View>
      </TouchableOpacity>
      {isVisible && (
        <DateTimePicker
          value={dueDate}
          onChange={onChange}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
});

export default DueDate;

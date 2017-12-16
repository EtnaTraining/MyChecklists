import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
  TimePickerAndroid,
  LayoutAnimation,
  StyleSheet,
  Keyboard
} from "react-native";
import moment from "moment";
import { TINT_COLOR } from "./styles/common";

export default class DueDate extends React.Component {
  state = {
    isPickerVisible: false
  };

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  _showPicker = () => {
    Keyboard.dismiss();
    if (Platform.OS === "ios") {
      this.setState({ isPickerVisible: !this.state.isPickerVisible });
    } else {
      this._showAndroidDatePicker();
    }
  };

  _showAndroidDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.props.dueDate
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.props.onDateChange(
          moment(this.props.dueDate)
            .year(year)
            .month(month)
            .date(day)
            .toDate()
        );
        this._showAndroidTimePicker();
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  _showAndroidTimePicker = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: moment(this.props.dueDate).hour(),
        minute: moment(this.props.dueDate).minute(),
        is24Hour: true // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        this.props.onDateChange(
          moment(this.props.dueDate)
            .hour(hour)
            .minute(minute)
            .toDate()
        );
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  };
  render() {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.6} onPress={this._showPicker}>
          <View style={styles.pickerRow}>
            <Text style={this.props.styles.label}>Due Date</Text>
            <Text
              style={[
                this.props.styles.label,
                this.state.isPickerVisible ? { color: TINT_COLOR } : {}
              ]}
            >
              {moment(this.props.dueDate).format("lll")}
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={[
            { overflow: "hidden" },
            this.state.isPickerVisible ? {} : { maxHeight: 0 }
          ]}
        >
          <DatePickerIOS
            date={this.props.dueDate}
            onDateChange={this.props.onDateChange}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15
  }
});

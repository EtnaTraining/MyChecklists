import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch,
  Keyboard,
  Platform,
  TouchableHighlight,
  DatePickerIOS,
  DatePickerAndroid,
  TimePickerAndroid,
  LayoutAnimation
} from "react-native";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { Notifications, Permissions } from "expo";
import { TINT_COLOR } from "./styles/common";

export default class EditTodo extends React.Component {
  state = {
    text: "",
    done: false,
    shouldRemind: false,
    dueDate: new Date(),
    isPickerVisible: false
  };

  async componentWillMount() {
    const item = this.props.navigation.state.params["item"];

    if (item) {
      this.setState({
        text: item.key,
        done: item.done,
        dueDate: moment(item.dueDate).toDate() || new Date(),
        shouldRemind: item.shouldRemind || false,
        notificationID: item.shouldRemind ? item.notificationID : null
      });
    }

    this.props.navigation.setParams({ onSave: this._save });
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (result.status === "granted") {
      console.log("Notification permissions granted.");
    }
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  _save = async () => {
    if (!this.state.text) {
      return;
    }

    let shouldRemind = this.state.shouldRemind;
    let notificationID = this.state.notificationID;
    if (
      shouldRemind &&
      this.state.dueDate > new Date() &&
      notificationID === null
    ) {
      console.log("setting reminder at ", this.state.dueDate);
      notificationID = await Notifications.scheduleLocalNotificationAsync(
        {
          title: "Reminder:",
          body: this.state.text,
          ios: {
            sound: true
          },
          android: {
            sound: true
          }
        },
        {
          time: this.state.dueDate
        }
      );
      this.setState({ notificationID });
    } else {
      console.log("Due Date is before now");
      shouldRemind = false;
    }

    const { navigation } = this.props;
    Keyboard.dismiss();
    const todo = {
      key: this.state.text,
      dueDate: this.state.dueDate,
      done: this.state.done,
      shouldRemind: shouldRemind,
      notificationID: shouldRemind ? notificationID : null
    };
    if (navigation.state.params["item"]) {
      navigation.state.params.onEndEditing({
        ...todo,
        id: navigation.state.params["item"].id
      });
    } else {
      navigation.state.params.onAdd(todo);
    }
    navigation.goBack(null);
  };

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
        date: this.state.dueDate
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({
          dueDate: moment(this.state.dueDate)
            .year(year)
            .month(month)
            .date(day)
            .toDate()
        });
        this._showAndroidTimePicker();
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  _showAndroidTimePicker = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: moment(this.state.dueDate).hour(),
        minute: moment(this.state.dueDate).minute(),
        is24Hour: true // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        this.setState({
          dueDate: moment(this.state.dueDate)
            .hour(hour)
            .minute(minute)
            .toDate()
        });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  };

  render() {
    const textInputStyleOnAndroid =
      Platform.OS === "android" ? { paddingBottom: 7, paddingLeft: 7 } : {};
    return (
      <View>
        <View style={[styles.todowrapper, { padding: 15 }]}>
          <TextInput
            style={[textInputStyleOnAndroid, styles.label]}
            placeholder="Name of the item"
            autoFocus
            value={this.state.text}
            onSubmitEditing={this._save}
            onChangeText={text => this.setState({ text })}
          />
        </View>

        <View style={styles.todowrapper}>
          <View style={styles.remindRow}>
            <Text style={styles.label}>Remind me</Text>
            <Switch
              onValueChange={value => this.setState({ shouldRemind: value })}
              value={this.state.shouldRemind}
            />
          </View>

          <TouchableOpacity activeOpacity={0.6} onPress={this._showPicker}>
            <View style={styles.pickerRow}>
              <Text style={styles.label}>Due Date</Text>
              <Text
                style={[
                  styles.label,
                  this.state.isPickerVisible ? { color: TINT_COLOR } : {}
                ]}
              >
                {moment(this.state.dueDate).format("lll")}
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
              date={this.state.dueDate}
              onDateChange={date => this.setState({ dueDate: date })}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todowrapper: {
    marginTop: 30,
    paddingHorizontal: 10,
    backgroundColor: "white"
  },
  headerBtn: {
    color: TINT_COLOR,
    padding: 10,
    fontSize: 18
  },
  remindRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15
  },
  label: {
    fontSize: 18
  }
});

EditTodo.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.onSave()}>
        <Text style={styles.headerBtn}>
          {Platform.OS === "ios" ? "Save" : "SAVE"}
        </Text>
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          navigation.goBack(null);
        }}
      >
        {Platform.OS === "ios" ? (
          <Text style={styles.headerBtn}>Cancel</Text>
        ) : (
          <MaterialIcons
            name="close"
            size={28}
            style={{ padding: 10, color: TINT_COLOR }}
          />
        )}
      </TouchableOpacity>
    ),
    title: navigation.state.params.headerTitle
  };
};

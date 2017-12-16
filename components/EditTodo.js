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
import DueDate from "./DueDate";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { Notifications, Permissions } from "expo";
import { TINT_COLOR } from "./styles/common";

export default class EditTodo extends React.Component {
  state = {
    text: "",
    done: false,
    shouldRemind: false,
    dueDate: new Date()
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

  _handleNotification = async () => {
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
    } else if (!shouldRemind && notificationID != null) {
      // We change our mind and we want to cancel the scheduling of notification
      await Notifications.cancelScheduledNotificationAsync(notificationID);
    } else {
      console.log("Due Date is before now");
      shouldRemind = false;
    }
    return { shouldRemind, notificationID };
  };

  _save = async () => {
    if (!this.state.text) {
      return;
    }
    const { shouldRemind, notificationID } = await this._handleNotification();
    const { navigation } = this.props;
    Keyboard.dismiss();
    const todo = {
      key: this.state.text,
      dueDate: this.state.dueDate,
      done: this.state.done,
      shouldRemind: shouldRemind,
      notificationID: shouldRemind ? notificationID : null
    };
    console.log("item: ", todo);

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
            underlineColorAndroid={TINT_COLOR}
            value={this.state.text}
            onSubmitEditing={this._save}
            onChangeText={text => this.setState({ text })}
          />
        </View>

        <View style={styles.todowrapper}>
          <View style={styles.remindRow}>
            <Text style={styles.label}>Remind me</Text>
            <Switch
              onTintColor={TINT_COLOR}
              onValueChange={value => this.setState({ shouldRemind: value })}
              value={this.state.shouldRemind}
            />
          </View>

          <DueDate
            styles={{ label: styles.label }}
            dueDate={this.state.dueDate}
            onDateChange={date => this.setState({ dueDate: date })}
          />
        </View>
      </View>
    );
  }
}

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
          <MaterialIcons name="close" size={28} style={styles.closeBtn} />
        )}
      </TouchableOpacity>
    ),
    title: navigation.state.params.headerTitle
  };
};

const styles = StyleSheet.create({
  todowrapper: {
    marginTop: 30,
    paddingHorizontal: 10,
    backgroundColor: "white"
  },
  headerBtn: {
    color: Platform.OS === "ios" ? TINT_COLOR : "white",
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
  label: {
    fontSize: 18
  },
  closeBtn: { padding: 10, color: Platform.OS === "ios" ? TINT_COLOR : "white" }
});

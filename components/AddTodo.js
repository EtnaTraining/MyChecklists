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
  LayoutAnimation
} from "react-native";
import moment from "moment";

export default class AddTodo extends React.Component {
  state = {
    text: "",
    done: false,
    dueDate: new Date(),
    isPickerVisible: false
  };
  componentDidMount() {
    this.props.navigation.setParams({ onSave: this._save });
  }
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  _save = () => {
      if (!this.state.text) {
          return;
      }    
    const { navigation } = this.props;
    Keyboard.dismiss();
    navigation.state.params.onAdd({ key: this.state.text, done: false });
    navigation.goBack(null);
  };
  render() {
    const textInputStyleOnAndroid =
      Platform.OS === "android" ? { paddingBottom: 7, paddingLeft: 7 } : {};
    return (
      <View>
        <View style={[styles.todowrapper, { padding: 15 }]}>
          <TextInput
            style={[textInputStyleOnAndroid, { fontSize: 18 }]}
            placeholder="Name of the item"
            autoFocus
            value={this.state.text}
            // onEndEditing={() => console.log("onEndEditing")}
            onSubmitEditing={this._save}
            // onBlur={() => console.log("onBlur")}
            onChangeText={text => this.setState({ text })}
          />
        </View>
        <View style={styles.todowrapper}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#dddddd",
              //   marginVertical: 5,
              paddingVertical: 10,
              //   borderWidth: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 18 }}>Remind me</Text>
            <Switch
              onValueChange={value => this.setState({ done: value })}
              value={this.state.done}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              Keyboard.dismiss();
              this.setState({ isPickerVisible: !this.state.isPickerVisible });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 15
                //   marginVertical: 5,
              }}
            >
              <Text style={{ fontSize: 18 }}>Due Date</Text>
              <Text
                style={[
                  { fontSize: 18 },
                  this.state.isPickerVisible
                    ? { color: "rgb(4, 169, 235)" }
                    : {}
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
    color: "rgb(4, 169, 235)",
    padding: 10,
    fontSize: 18
  }
});

AddTodo.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.onSave()}>
        <Text style={styles.headerBtn}>Save</Text>
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          navigation.goBack(null);
        }}
      >
        <Text style={styles.headerBtn}>Cancel</Text>
      </TouchableOpacity>
    ),
    title: "Add Todo"
  };
};

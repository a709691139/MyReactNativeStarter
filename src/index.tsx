import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  BackHandler,
  View,
  Text,
  Platform,
  Linking,
  UIManager,
  ErrorUtils
} from "react-native";
// import "./styles";
import SplashScreen from "react-native-splash-screen";

export default class RootApp extends Component {
  constructor(props) {
    super(props);
  }
  say() {}
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>233333</Text>
      </View>
    );
  }
}

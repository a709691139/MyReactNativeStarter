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
import Orientation from "react-native-orientation";

export default class RootApp extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>233333</Text>
        <Text
          style={{ marginVertical: 10 }}
          onPress={() => {
            Orientation.lockToPortrait();
          }}
        >
          竖屏
        </Text>
        <Text
          style={{ marginVertical: 10 }}
          onPress={() => {
            Orientation.lockToLandscape();
          }}
        >
          横屏
        </Text>
      </View>
    );
  }
}

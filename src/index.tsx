import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  BackHandler,
  View,
  Text,
  Image,
  Platform,
  Linking,
  UIManager,
  ErrorUtils
} from "react-native";
// import "./styles";
import SplashScreen from "react-native-splash-screen";
import Orientation from "react-native-orientation";
import ImagePicker from "react-native-image-crop-picker";

export default class RootApp extends Component {
  state = {
    avatar: ""
  };
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
        <Text
          style={{ marginVertical: 10 }}
          onPress={() => {
            ImagePicker.openPicker({
              width: 100,
              height: 100,
              cropping: true,
              avoidEmptySpaceAroundImage: true
            }).then(image => {
              console.log(image);
              this.setState({
                avatar: image.path
              });
            });
          }}
        >
          选取图片
        </Text>
        {!!this.state.avatar && (
          <Image
            source={{ uri: this.state.avatar }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>
    );
  }
}

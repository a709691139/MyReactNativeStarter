import React, { Component } from "react";
import { observer } from "mobx-react";
import { View, WebView, Text, TouchableOpacity, Image } from "react-native";
import { Button, SearchBar } from "antd-mobile-rn";

import html from "./html";
import styles from "./styles";

interface Props {
  navigation: any;
}
export default class SelectLocation extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "用户协议",
    headerRight: <View />
  });
  changeSearchWordTimer = null;
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          automaticallyAdjustContentInsets={false}
          contentInset={{ top: 0, right: 0, bottom: 0, left: 0 }}
          source={{ html: html, baseUrl: "http://index.html" }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mixedContentMode="always"
          style={styles.webview}
        />
      </View>
    );
  }
}

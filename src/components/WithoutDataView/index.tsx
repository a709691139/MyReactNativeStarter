import React, { Component, ComponentType, ReactNode } from "react";

import {
  TextStyle,
  ViewStyle,
  View,
  Text,
  Image,
  StyleSheet
} from "react-native";
import styles from "./styles";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
const urlImgEmpty = require("./images/imgEmpty.png");

interface Props {
  text?: string;
}
export default class WithoutDataView extends React.PureComponent<Props, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.emptyView}>
        <Image
          style={styles.emptyImage}
          source={urlImgEmpty}
          resizeMode="contain"
        />
        <Text style={styles.emptyText}>{this.props.text || "暂无数据"}</Text>
      </View>
    );
  }
}

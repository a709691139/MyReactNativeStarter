import React, { Component, ComponentType, ReactNode } from "react";

import {
  TextStyle,
  ViewStyle,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import ChildButton from "./ChildButton";

interface Props {}
export default class HeaderButtons extends React.Component<Props, any> {
  static defaultProps = {};
  static ChildButton = null;
  constructor(props) {
    super(props);
  }
  render() {
    return <View style={styles.container}>{this.props.children}</View>;
  }
}
HeaderButtons.ChildButton = ChildButton;

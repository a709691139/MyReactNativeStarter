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

interface Props {
  onPress: () => void;
}
export default class ChildButton extends React.Component<Props, any> {
  static defaultProps = {
    onPress: () => {}
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.ChildButton}
        onPress={this.props.onPress}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

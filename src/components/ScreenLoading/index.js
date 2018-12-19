import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

export default class ScreenLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  toggleLoading = loading => {
    this.setState({
      loading
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.loading != nextState.loading;
  }
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    if (!this.state.loading) {
      return null;
    }
    return (
      <View style={styles.container}>
        <ActivityIndicator color={MAIN_COLOR} size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center"
  }
});

import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Easing
} from "react-native";
import PropTypes from "prop-types";

const ARROW = require("./images/arrow_down.png");
import IconEntypo from "react-native-vector-icons/Entypo";
import constantStore from "stores/constantStore";

const styles = StyleSheet.create({
  indicatorContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 54,
    backgroundColor: "transparent"
    // paddingLeft: 100
  },
  indicator: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15
  },
  prompt: {
    color: "#6e6e6e",
    fontSize: 14
  }
});

export default class Indicator extends PureComponent {
  static propTypes = {
    refreshing: PropTypes.bool.isRequired,
    scrollStatus: PropTypes.oneOf([
      "NOT_EXCEEDED_MIN_PULL_DOWN_DISTANCE",
      "NOT_EXCEEDED_MIN_PULL_UP_DISTANCE",
      "EXCEEDED_MIN_PULL_DOWN_DISTANCE",
      "EXCEEDED_MIN_PULL_UP_DISTANCE"
    ]).isRequired,
    styles: PropTypes.object.isRequired,
    topPullingPrompt: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    topHoldingPrompt: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    topRefreshingPrompt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired,
    bottomPullingPrompt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired,
    bottomHoldingPrompt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired,
    bottomRefreshingPrompt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired
  };

  constructor() {
    super();
    this.state = {
      topArrowDeg: new Animated.Value(0),
      bottomArrowDeg: new Animated.Value(0)
    };
    this.topArrowTransform = [
      {
        rotate: this.state.topArrowDeg.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "-180deg"]
        })
      }
    ];
    this.bottomArrowTransform = [
      {
        rotate: this.state.bottomArrowDeg.interpolate({
          inputRange: [0, 1],
          outputRange: ["-180deg", "0deg"]
        })
      }
    ];
  }

  renderIndicatorIcon() {
    let indicator;
    const { scrollStatus } = this.props;

    if (
      this.props.refreshing &&
      (scrollStatus === "EXCEEDED_MIN_PULL_DOWN_DISTANCE" ||
        scrollStatus === "EXCEEDED_MIN_PULL_UP_DISTANCE")
    ) {
      indicator = (
        <ActivityIndicator
          size="small"
          color={constantStore.MAIN_COLOR}
          style={styles.indicator}
        />
      );
    } else if (scrollStatus.indexOf("DOWN") > -1) {
      indicator = (
        <Animated.Text
          style={[styles.indicator, { transform: this.topArrowTransform }]}
        >
          <IconEntypo
            name="arrow-long-down"
            size={20}
            color={constantStore.MAIN_COLOR}
          />
        </Animated.Text>
      );
      /* <Animated.Image
          style={[styles.indicator, { transform: this.topArrowTransform }]}
          resizeMode={"cover"}
          source={ARROW}
        /> */
    } else {
      indicator = (
        <Animated.Text
          style={[styles.indicator, { transform: this.bottomArrowTransform }]}
        >
          <IconEntypo
            name="arrow-long-down"
            size={20}
            color={constantStore.MAIN_COLOR}
          />
        </Animated.Text>
      );
      // indicator = (
      //   <Animated.Text
      //     style={[styles.indicator, { transform: this.bottomArrowTransform }]}
      //     resizeMode={"cover"}
      //     source={ARROW}
      //   />
      // );
    }

    if (scrollStatus === "EXCEEDED_MIN_PULL_DOWN_DISTANCE") {
      Animated.timing(this.state.topArrowDeg, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear
      }).start();
    } else if (scrollStatus === "NOT_EXCEEDED_MIN_PULL_DOWN_DISTANCE") {
      Animated.timing(this.state.topArrowDeg, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear
      }).start();
    } else if (scrollStatus === "EXCEEDED_MIN_PULL_UP_DISTANCE") {
      Animated.timing(this.state.bottomArrowDeg, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear
      }).start();
    } else if (scrollStatus === "NOT_EXCEEDED_MIN_PULL_UP_DISTANCE") {
      Animated.timing(this.state.bottomArrowDeg, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear
      }).start();
    }

    return indicator;
  }

  renderPrompt() {
    if (
      this.props.refreshing &&
      this.props.scrollStatus === "EXCEEDED_MIN_PULL_DOWN_DISTANCE"
    ) {
      return this.props.topRefreshingPrompt;
    } else if (
      this.props.refreshing &&
      this.props.scrollStatus === "EXCEEDED_MIN_PULL_UP_DISTANCE"
    ) {
      return this.props.bottomRefreshingPrompt;
    } else if (this.props.scrollStatus === "EXCEEDED_MIN_PULL_DOWN_DISTANCE") {
      return this.props.topHoldingPrompt;
    } else if (this.props.scrollStatus === "EXCEEDED_MIN_PULL_UP_DISTANCE") {
      return this.props.bottomHoldingPrompt;
    } else if (
      this.props.scrollStatus === "NOT_EXCEEDED_MIN_PULL_UP_DISTANCE"
    ) {
      return this.props.bottomPullingPrompt;
    } else if (
      this.props.scrollStatus === "NOT_EXCEEDED_MIN_PULL_DOWN_DISTANCE"
    ) {
      return this.props.topPullingPrompt;
    }

    return null;
  }

  render() {
    return (
      <View style={[styles.indicatorContainer, this.props.styles.container]}>
        {this.renderIndicatorIcon()}
        <Text style={[styles.prompt, this.props.styles.prompt]}>
          {this.renderPrompt()}
        </Text>
      </View>
    );
  }
}

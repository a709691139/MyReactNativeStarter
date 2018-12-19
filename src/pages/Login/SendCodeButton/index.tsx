import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import { View, Text, TouchableOpacity } from "react-native";
import { Toast } from "antd-mobile-rn";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;
import styles from "./styles";
import commonRegexp from "utils/commonRegexp";

interface Props {
  phone: string;
  onClick: Function;
  totalTime?: number;
  disabled?: boolean;
  defaultWord?: string;
  style?: any;
  textStyle?: any;
}
@observer
export default class SendCodeButton extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null
  });
  static defaultProps = {
    defaultWord: "获取验证码",
    totalTime: 60,
    disabled: false
  };
  state = {
    currentTime: this.props.totalTime,
    disabled: false
  };
  timer = null;
  constructor(props: any) {
    super(props);
  }
  setTimer = () => {
    this.setState(
      {
        currentTime: this.props.totalTime,
        disabled: true
      },
      () => {
        this.clearTimer();
        this.timer = setInterval(() => {
          let currentTime = this.state.currentTime - 1;
          if (currentTime <= 0) {
            this.clearTimer();
            this.setState({
              disabled: false
            });
          } else {
            this.setState({
              currentTime: currentTime
            });
          }
        }, 1000);
      }
    );
  };
  clearTimer = () => {
    this.timer && clearInterval(this.timer);
  };
  sendCode = () => {
    if (!commonRegexp.mobilePhone.test(this.props.phone)) {
      Toast.info("请输入正确的手机号码", 1);
      return;
    }
    if (!this.props.disabled && !this.state.disabled) {
      this.props.onClick();
      this.setTimer();
    }
  };

  componentDidMount() {}
  componentWillUnmount() {
    this.clearTimer();
  }
  render() {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          this.props.style,
          this.state.disabled && styles.containerDisabled
        ]}
        onPress={this.sendCode}
        disabled={this.state.disabled}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.text,
            this.props.textStyle,
            this.state.disabled && styles.textDisabled
          ]}
        >
          {!this.state.disabled
            ? this.props.defaultWord
            : this.state.currentTime.toString()}
        </Text>
      </TouchableOpacity>
    );
  }
}

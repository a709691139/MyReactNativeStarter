import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ViewStyle,
  TextStyle
} from "react-native";
import styles from "./styles";

interface Props {
  onChange: Function;
  onBlur?: Function;
  value?: string;
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  btnStyle?: ViewStyle;
  btnTextStyle?: TextStyle;
  min?: number;
  max?: number;
  delta?: number; // 增量
}
export default class NumberInput extends React.PureComponent<Props, any> {
  static defaultProps = {
    value: "",
    min: 0,
    max: 999,
    delta: 1
  };
  constructor(props) {
    super(props);
  }
  check = text => {
    if (text && parseFloat(text)) {
      text = parseFloat(text);
      if (text <= this.props.min) {
        text = this.props.min;
      }
      if (text >= this.props.max) {
        text = this.props.max;
      }
      text = text.toString();
    }
    return text;
  };
  onChange = e => {
    this.props.onChange(this.check(e.nativeEvent.text));
  };
  onBlur = () => {
    this.props.onBlur && this.props.onBlur();
  };
  cut = () => {
    this.props.onChange(
      this.check(
        ((parseFloat(this.props.value) || 0) - this.props.delta).toString()
      )
    );
  };
  add = () => {
    this.props.onChange(
      this.check(
        ((parseFloat(this.props.value) || 0) + this.props.delta).toString()
      )
    );
  };
  componentDidMount() {}
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.btn, this.props.btnStyle]}
          onPress={this.cut}
        >
          <Text style={[styles.btn_text, this.props.btnTextStyle]}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, this.props.inputStyle]}
          value={this.props.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          placeholderTextColor="#666666"
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.btn, this.props.btnStyle]}
          onPress={this.add}
        >
          <Text style={[styles.btn_text, this.props.btnTextStyle]}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

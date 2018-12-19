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
const urlImgSelectOn = require("images/icon_select_on1.png");
const urlImgSelectOff = require("images/icon_select_off1.png");

interface ArrayItem {
  label: string;
  value: any;
}
interface Props {
  onChange: Function;
  value?: string;
  style?: ViewStyle;
  btnStyle?: ViewStyle;
  btnImgStyle?: ViewStyle;
  btnTextStyle?: TextStyle;
  list: Array<ArrayItem>;
}
export default class CheckBox extends React.PureComponent<Props, any> {
  static defaultProps = {
    value: ""
  };
  constructor(props) {
    super(props);
  }
  onChange = value => {
    this.props.onChange(value);
  };
  componentDidMount() {}
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.list.map((v, i) => {
          let focused: boolean = this.props.value == v.value;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.btn, this.props.btnStyle]}
              onPress={() => this.onChange(v.value)}
              key={i}
            >
              <Image
                source={focused ? urlImgSelectOn : urlImgSelectOff}
                style={[styles.btn_img, this.props.btnImgStyle]}
              />
              <Text style={[styles.btn_text, this.props.btnTextStyle]}>
                {v.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

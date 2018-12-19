import React, { Component, ComponentType, ReactNode } from "react";

import {
  TextStyle,
  ViewStyle,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import styles from "./styles";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import NavHeaderIconButtons from "react-navigation-header-buttons";

import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import Zocial from "react-native-vector-icons/Zocial";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

// https://github.com/vonovak/react-navigation-header-buttons

interface ButtonDataList {
  title?: string;
  color?: string;
  iconSize?: number;
  fontName?:
    | "Entypo"
    | "EvilIcons"
    | "Feather"
    | "FontAwesome"
    | "Foundation"
    | "Ionicons"
    | "MaterialIcons"
    | "MaterialCommunityIcons"
    | "Octicons"
    | "Zocial"
    | "SimpleLineIcons";
  iconName?: string;
  IconElement?: JSX.Element;
  onPress: () => void;
  show?: "never" | "always";
  buttonStyle?: TextStyle;
}

interface Props {
  list: ButtonDataList[];
  color?: string;
  iconSize?: number;
  left?: boolean;
  IconComponent?: ComponentType<any>;
}

export default class HeaderIconButtons extends React.Component<Props, any> {
  static defaultProps = {
    iconSize: 23,
    color: "#fff",
    left: false,
    list: []
  };
  constructor(props) {
    super(props);
  }
  renderIcon = (
    fontName: string,
    iconName: string,
    size?: number,
    color?: string,
    style?: any
  ) => {
    let FontIcon = null;
    switch (fontName) {
      case "Entypo":
        FontIcon = Entypo;
        break;
      case "EvilIcons":
        FontIcon = EvilIcons;
        break;
      case "Feather":
        FontIcon = Feather;
        break;
      case "FontAwesome":
        FontIcon = FontAwesome;
        break;
      case "Foundation":
        FontIcon = Foundation;
        break;
      case "Ionicons":
        FontIcon = Ionicons;
        break;
      case "MaterialIcons":
        FontIcon = MaterialIcons;
        break;
      case "MaterialCommunityIcons":
        FontIcon = MaterialCommunityIcons;
        break;
      case "Octicons":
        FontIcon = Octicons;
        break;
      case "Zocial":
        FontIcon = Zocial;
        break;
      case "SimpleLineIcons":
        FontIcon = SimpleLineIcons;
        break;
      default:
        break;
    }
    if (FontIcon) {
      return (
        <FontIcon
          name={iconName}
          size={size}
          color={color}
          style={
            style || {
              marginHorizontal: 11
            }
          }
        />
      );
    }
  };
  render() {
    const { iconSize, color, left, list, IconComponent } = this.props;
    return (
      <NavHeaderIconButtons
        IconComponent={IconComponent}
        iconSize={iconSize}
        color={color}
        left={left}
        OverflowIcon={this.renderIcon(
          "Ionicons",
          "ios-more",
          iconSize,
          color,
          {}
        )}
      >
        {list.map((v, i) => {
          return (
            <NavHeaderIconButtons.Item
              key={i}
              IconElement={
                v.IconElement ||
                this.renderIcon(
                  v.fontName,
                  v.iconName,
                  v.iconSize || iconSize,
                  v.color || color,
                  v.buttonStyle
                )
              }
              onPress={v.onPress}
              title={v.title}
              show={v.show || "always"}
              iconName={v.iconName}
              buttonStyle={v.buttonStyle}
            />
          );
        })}
      </NavHeaderIconButtons>
    );
  }
}

import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  TextStyle
} from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import styles from "./styles";
import { withNavigation } from "react-navigation";
import HeaderIconButtons from "components/HeaderIconButtons";
import { redThemeNavigationOptions } from "pages/index";

interface Props {
  navigation: any;
  title?: string | JSX.Element;
  headerLeft?: JSX.Element;
  headerRight?: JSX.Element;
  headerStyle?: ViewStyle;
  headerTitleStyle?: TextStyle;
  headerTintColor?: string;
  centerViewStyle?: ViewStyle;
}
@observer
class Header extends React.Component<Props, any> {
  constructor(props) {
    super(props);
  }
  render() {
    let headerLeft = <View />;
    if (this.props.headerLeft === null) {
      headerLeft = null;
    } else if (this.props.headerLeft === undefined) {
      headerLeft = (
        <HeaderIconButtons
          iconSize={25}
          color={this.props.headerTintColor || "#333333"}
          left={true}
          list={[
            {
              title: "返回",
              fontName: "Ionicons",
              iconName: "ios-arrow-back",
              onPress: () => {
                this.props.navigation.goBack();
              }
            }
          ]}
        />
      );
    } else {
      headerLeft = this.props.headerLeft;
    }

    return (
      <View
        style={[
          redThemeNavigationOptions.headerStyle,
          styles.headerStyle,
          this.props.headerStyle,
        ]}
      >
        <View style={[styles.centerView, this.props.centerViewStyle]}>
          {typeof this.props.title == "string" ? (
            <Text
              style={[
                redThemeNavigationOptions.headerTitleStyle,
                styles.headerTitleStyle,
                this.props.headerTitleStyle
              ]}
            >
              {this.props.title}
            </Text>
          ) : (
              this.props.title
            )}
        </View>
        {headerLeft}

        {this.props.headerRight}
      </View>
    );
  }
}

export default withNavigation(Header);

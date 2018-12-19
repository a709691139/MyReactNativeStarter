import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import { View, Text, Image, ScrollView } from "react-native";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;
import { Button, InputItem, List, Icon } from "antd-mobile-rn";
import styles from "./styles";

interface Props {
  navigation: any;
}
@observer
export default class Advertisements extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "广告",
    headerRight: <View />
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Text>页面</Text>
      </ScrollView>
    );
  }
}

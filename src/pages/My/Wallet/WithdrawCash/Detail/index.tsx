import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import { observer } from "mobx-react";
import { observable, action, toJS } from "mobx";
import { whiteThemeNavigationOptions } from "pages/index";

interface Props {
  navigation: any;
}
@observer
export default class WithdrawCashDetail extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "提现详情",
    headerRight: <View />
  });
  state = {};

  constructor(props) {
    super(props);
  }

  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };

  componentDidMount() {}
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}
      >
        <View style={styles.rowMain}>
          <View style={styles.row}>
            <Text style={styles.row_label}>金额</Text>
            <Text style={[styles.row_content, styles.price]}>2222</Text>
          </View>
        </View>
        <View style={styles.borderBox} />
        <View style={styles.row}>
          <Text style={styles.row_label}>交易号</Text>
          <Text style={styles.row_content}>2222</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row_label}>交易时间</Text>
          <Text style={styles.row_content}>2222</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row_label}>交易名称</Text>
          <Text style={styles.row_content}>2222</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row_label}>资金流向</Text>
          <Text style={styles.row_content}>2222</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row_label}>类型</Text>
          <Text style={styles.row_content}>2222</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row_label}>账户余额</Text>
          <Text style={styles.row_content}>2222</Text>
        </View>
        <View style={styles.borderBox} />
        <View style={styles.row}>
          <Text style={styles.row_label}>提现编号</Text>
          <Text style={styles.row_content}>2222</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row_label}>提现状态</Text>
          <Text style={styles.row_content}>2222</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row_label}>发起时间</Text>
          <Text style={styles.row_content}>2222</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row_label}>到账时间</Text>
          <Text style={styles.row_content}>2222</Text>
        </View>
      </ScrollView>
    );
  }
}

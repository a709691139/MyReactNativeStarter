import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { whiteThemeNavigationOptions } from "pages/index";
import styles from "./styles";
const urlLogo = require("images/logo.png");

interface Props {
  navigation: any;
}
export default class SelectLocation extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "关于我们",
    headerRight: <View />
  });
  changeSearchWordTimer = null;
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={urlLogo} style={styles.logo} />
        <Text style={styles.title}>易众慧</Text>
        <Text style={styles.content}>
          打破传统零售的空间限制，让门店无法充分展示的商品在线上展示和推广，解决传统实体店铺引流难，营销难的痛点，从商品销售渠道、会员营销渠道、数据获取渠道、配送渠道等全方位助力商家精准触达用户，提高店铺的营销效能与运营效率。
        </Text>
        <View style={styles.bottomBox}>
          <Text style={styles.bottomBox_text}>CopyRight © 2018 </Text>
          <Text style={styles.bottomBox_text}>第五元素科技有限公司</Text>
        </View>
      </View>
    );
  }
}

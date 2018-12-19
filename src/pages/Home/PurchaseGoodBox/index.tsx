import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
const urlImgBg = require("./assets/bg.png");
import goodsStore from "stores/goodsStore";

interface Props {
  navigation: any;
}
@observer
export default class PurchaseGoodBox extends React.Component<Props, any> {
  constructor(props) {
    super(props);
  }

  toOtherPage = (route: string, params?: any) => {
    this.props.navigation.navigate(route, params);
  };
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => this.toOtherPage("PurchaseGoods")}
      >
        <Image source={urlImgBg} style={styles.bg} />
        <View style={styles.container}>
          {false && (
            <Text style={styles.text}>
              已入
              {goodsStore.list.length}
              件货物
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

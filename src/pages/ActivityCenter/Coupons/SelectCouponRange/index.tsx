import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles, { listItemStyle } from "./styles";
import { observer } from "mobx-react";
import { whiteThemeNavigationOptions } from "pages/index";
import { List } from "antd-mobile-rn";
import dictionaryStore from "stores/dictionaryStore";

interface navigationParams {
  selectedKeys?: Array<number | string>; // 选中的array
  fnSuccess: ({ scopeType, productTypeList, productList }) => void;
}
interface Props {
  navigation: any;
}
@observer
export default class SelectCouponRange extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "优惠范围",
    headerRight: <View />
  });
  constructor(props) {
    super(props);
  }
  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  onClick = (value: string) => {
    const propsFnSuccess: Function = this.props.navigation.getParam(
      "fnSuccess",
      () => {}
    );
    const selectedKeys: Array<number> = this.props.navigation.getParam(
      "selectedKeys",
      []
    );
    switch (value) {
      case "0":
        propsFnSuccess({
          scopeType: value
        });
        this.props.navigation.goBack();
        break;
      case "1":
        this.props.navigation.navigate("SelectGoodTypes", {
          selectedKeys: selectedKeys,
          fnSuccess: array => {
            console.log("SelectGoodTypes", array);
            propsFnSuccess({
              scopeType: value,
              productTypeList: array
            });
            this.props.navigation.goBack();
          }
        });
        break;
      case "2":
        this.props.navigation.navigate("SelectGoods", {
          selectedKeys: selectedKeys,
          fnSuccess: array => {
            propsFnSuccess({
              scopeType: value,
              productList: array
            });
            this.props.navigation.goBack();
          }
        });
        break;
      default:
        break;
    }
  };
  componentDidMount() {}
  render() {
    return (
      <ScrollView style={styles.container}>
        <List>
          {dictionaryStore.couponScopeTypes.map((v, i) => {
            return (
              <List.Item
                key={i}
                styles={listItemStyle}
                arrow="horizontal"
                extra={" "}
                onClick={() => this.onClick(v.value)}
              >
                {v.label}
              </List.Item>
            );
          })}
        </List>
      </ScrollView>
    );
  }
}

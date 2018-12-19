import React from "react";
import { View, ScrollView } from "react-native";
import styles, { listItemStyle } from "./styles";
import { observer } from "mobx-react";
import { whiteThemeNavigationOptions } from "pages/index";
import { List } from "antd-mobile-rn";

interface navigationParams {
  type?: "0" | "1"; // 类型：0普通优惠券，1活动优惠券、
  fnSuccess: ({ couponType }) => void;
}
interface Props {
  navigation: any;
}
@observer
export default class SelectCouponType extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "选择优惠券类型",
    headerRight: <View />
  });
  list = [
    {
      label: "满减券",
      value: "0"
    },
    {
      label: "折扣券",
      value: "1"
    }
  ];
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
    const type: string = this.props.navigation.getParam("type", "");
    this.props.navigation.navigate("CouponDetail", {
      type: type,
      couponType: value,
      mode: "addActivity",
      fnSuccess: data => {
        console.log("SelectCouponType", data);
        propsFnSuccess({
          type: type,
          couponType: value,
          ...data
        });
        this.props.navigation.goBack();
      }
    });
  };
  componentDidMount() {}
  render() {
    return (
      <ScrollView style={styles.container}>
        <List>
          {this.list.map((v, i) => {
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

import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import { observer } from "mobx-react";
import { observable, action, toJS } from "mobx";
import { whiteThemeNavigationOptions } from "pages/index";
import HeaderButtons from "components/HeaderButtons";
import { Tabs, Toast } from "antd-mobile-rn";
import TabComponent from "./TabComponent";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;

interface navigationParams {
  couponType?: string; // 优惠券类型：0满减劵，1折扣劵, 默认 0
}
interface Props {
  navigation: any;
}
@observer
export default class BalanceList extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: navigation.getParam("couponType", "0") == "1" ? "折扣券" : "满减券",
    headerRight: navigation.getParam("headerRight", <View />)
  });
  state = {
    page: "0"
  };
  tabs = [
    { title: "未开始", key: "0" },
    { title: "进行中", key: "1" },
    { title: "已结束", key: "2" }
  ];
  TabComponents = {};

  constructor(props) {
    super(props);
    this.props.navigation.setParams({
      headerRight: (
        <HeaderButtons>
          <HeaderButtons.ChildButton
            onPress={() => {
              this.props.navigation.navigate("CouponDetail", {
                mode: "add",
                couponType: this.props.navigation.getParam("couponType", "0"),
                fnSuccess: this.TabComponents[this.state.page].onRefresh
              });
            }}
          >
            <Text style={styles.headerRightText}>新增</Text>
          </HeaderButtons.ChildButton>
        </HeaderButtons>
      )
    });
  }

  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  onChangePage = (tab, index) => {
    this.setState({
      page: index
    });
  };

  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <Tabs
          page={this.state.page}
          onChange={this.onChangePage}
          tabs={this.tabs}
          tabBarPosition="top"
          swipeable={false}
          tabBarInactiveTextColor="#666666"
          tabBarActiveTextColor={MAIN_COLOR}
          tabBarUnderlineStyle={{
            backgroundColor: MAIN_COLOR,
            transform: [{ scaleX: 0.3 }]
          }}
          prerenderingSiblingsNumber={0}
        >
          {this.tabs.map((v, i) => {
            return (
              <TabComponent
                ref={ref => (this.TabComponents[i] = ref)}
                key={v.key}
                navigation={this.props.navigation}
                status={v.key}
                couponType={this.props.navigation.getParam("couponType", "0")}
              />
            );
          })}
        </Tabs>
      </View>
    );
  }
}

import React from "react";
import { View, Text, Image, ScrollView, Platform } from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import { Tabs, Badge } from "antd-mobile-rn";
import styles from "./styles";
import TabComponent from "./TabComponent";
import { whiteThemeNavigationOptions } from "pages/index";
import HeaderButtons from "components/HeaderButtons";
const urlImgSearch = require("images/icon_search.png");

// 接收路由参数  status: 0~5|null
interface navigationParams {
  status?: number;
}
interface Props {
  navigation: any;
}
export default class Orders extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "订单",
    headerRight: (
      <HeaderButtons>
        <HeaderButtons.ChildButton
          onPress={() => {
            navigation.navigate("SearchOrders");
          }}
        >
          <Image
            source={urlImgSearch}
            style={{ width: "80%", tintColor: MAIN_COLOR }}
            resizeMode="contain"
          />
        </HeaderButtons.ChildButton>
      </HeaderButtons>
    )
  });
  state = {
    tabIndex: 0
  };
  tabs = [
    { title: "全部", status: null },
    { title: "待付款", status: 5 },
    { title: "待处理", status: 0 },
    { title: "待取货", status: 1 },
    { title: "送货中", status: 2 },
    { title: "已完成", status: 3 },
    { title: "已取消", status: 4 }
  ];
  constructor(props) {
    super(props);
    if (Platform.OS == "ios") {
      this.state.tabIndex = this.getRouteTabIndex();
    }
  }
  getRouteTabIndex = () => {
    let status: number = this.props.navigation.getParam("status", null);
    let tabIndex: number = this.tabs.reduce((pre, next, index) => {
      if (next.status == status) {
        pre = index;
      }
      return pre;
    }, 0);
    return tabIndex;
  };
  changeTabIndex = tabIndex => {
    this.setState({
      tabIndex
    });
  };
  componentDidMount() {
    this.setState({
      tabIndex: this.getRouteTabIndex()
    });
  }
  render() {
    const style = {
      alignItems: "center",
      justifyContent: "center",
      height: 150,
      backgroundColor: "#fff"
    } as any;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Tabs
            page={this.state.tabIndex}
            onChange={(tab, tabIndex) => this.changeTabIndex(tabIndex)}
            tabs={this.tabs}
            tabBarPosition="top"
            swipeable={false}
            tabBarInactiveTextColor="#666666"
            tabBarActiveTextColor={MAIN_COLOR}
            tabBarUnderlineStyle={{ backgroundColor: MAIN_COLOR }}
            prerenderingSiblingsNumber={0}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={6} />}
            renderTab={tab => {
              return (
                <View>
                  <Badge
                    text={tab.num || 0}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0
                    }}
                  />
                  <Text>{tab.title}</Text>
                </View>
              );
            }}
          >
            {this.tabs.map((v, i) => {
              return (
                <TabComponent
                  key={i}
                  status={v.status}
                  navigation={this.props.navigation}
                  actived={this.state.tabIndex == i}
                />
              );
            })}
          </Tabs>
        </View>
      </View>
    );
  }
}

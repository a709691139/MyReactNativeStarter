import { createBottomTabNavigator } from "react-navigation";

import React from "react";

import { Image } from "react-native";

import Home from "../Home";
import Goods from "../Goods";
import Journal from "../Journal";

const iconHome = require("./assets/icon_shouye.png");
const iconJournal = require("./assets/icon_liushui.png");
const iconGoods = require("./assets/icon_shangping.png");
const iconHomeOn = require("./assets/icon_shouye_on.png");
const iconJournalOn = require("./assets/icon_liushui_on.png");
const iconGoodsOn = require("./assets/icon_shangping_on.png");

import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;

const TabBar = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigationOptions }) => {
        return createTabOptions(
          "Home",
          navigationOptions,
          iconHome,
          iconHomeOn
        );
      }
    },
    Goods: {
      screen: Goods,
      navigationOptions: ({ navigationOptions }) => {
        return createTabOptions(
          "Goods",
          navigationOptions,
          iconGoods,
          iconGoodsOn
        );
      }
    },
    Journal: {
      screen: Journal,
      navigationOptions: ({ navigationOptions }) => {
        return createTabOptions(
          "Journal",
          navigationOptions,
          iconJournal,
          iconJournalOn
        );
      }
    }
  },
  {
    initialRouteName: "Home", // 设置默认的页面组件
    tabBarPosition: "bottom", // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
    swipeEnabled: false, // 是否允许在标签之间进行滑动。
    animationEnabled: false, // 是否在更改标签时显示动画。
    lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
    backBehavior: "none", // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
      // iOS属性
      // 因为第二个tabbar是在页面中创建的，所以前景色的设置对其无效，当然也可以通过设置tintColor使其生效
      activeTintColor: MAIN_COLOR, // label和icon的前景色 活跃状态下（选中）。
      inactiveTintColor: "#666666", // label和icon的前景色 不活跃状态下(未选中)。

      activeBackgroundColor: "#fff", //label和icon的背景色 活跃状态下（选中） 。
      inactiveBackgroundColor: "#fff", // label和icon的背景色 不活跃状态下（未选中）。

      showLabel: true, // 是否显示label，默认开启。
      // style:{}, // tabbar的样式。
      // labelStyle:{}, //label的样式。

      // 安卓属性

      // activeTintColor:'', // label和icon的前景色 活跃状态下（选中） 。
      // inactiveTintColor:'', // label和icon的前景色 不活跃状态下(未选中)。
      showIcon: true, // 是否显示图标，默认关闭。
      // showLabel:true, //是否显示label，默认开启。
      style: { backgroundColor: "#fff" }, // tabbar的样式。
      // labelStyle:{}, // label的样式。
      upperCaseLabel: false, // 是否使标签大写，默认为true。
      // pressColor:'', // material涟漪效果的颜色（安卓版本需要大于5.0）。
      pressOpacity: 0.8, // 按压标签的透明度变化（安卓版本需要小于5.0）。
      // scrollEnabled:false, // 是否启用可滚动选项卡。
      tabStyle: { backgroundColor: "#fff" }, // tab的样式。
      indicatorStyle: { height: 0 }, // 标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题。
      labelStyle: { margin: 0, marginTop: 0 } // label的样式。
      // iconStyle: {} // 图标的样式。
    }
  }
);

const createTabOptions = (
  routeName: string,
  navigationOptions: object,
  image: any,
  focusedImage?: any
) => {
  // console.log(navigation);
  let height = 25;
  let width = 25;
  const tabBarIcon = ({ tintColor, focused }) => {
    // { tintColor: tintColor }
    return (
      <Image
        source={focused && focusedImage ? focusedImage : image}
        resizeMode="center"
        style={[{ height: height, width: width, marginTop: 3 }]}
      />
    );
  };

  const tabBarVisible = true;
  let options = {
    tabBarIcon,
    tabBarVisible
  };
  Object.keys(navigationOptions).map(key => {
    options[key] = navigationOptions[key];
  });
  // console.log(options);
  return options;
};

export default TabBar;

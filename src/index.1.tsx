import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  BackHandler,
  View,
  Text,
  Platform,
  Linking,
  UIManager,
  ErrorUtils
} from "react-native";
import "./styles";
import { observable, action } from "mobx";
import { Provider, observer, useStaticRendering } from "mobx-react";
import Orientation from "react-native-orientation";
import SplashScreen from "react-native-splash-screen";

import NavigationUtils from "utils/NavigationUtils";
import AppNavigator from "./pages";

import constantStore from "stores/constantStore";
import { SafeAreaView } from "react-navigation";

import KeepAwake from "react-native-keep-awake";

//日期本地化设置
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

// 解决react-navigator老是弹出黄色警告窗的问题
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
  "Class RCTCxxModule was not exported",
  "Module RNFetchBlob requires main queue setup since it overrides",
  "Module RCTHotUpdate requires main queue setup since it overrides",
  "Module RNSyanImagePicker requires main queue setup since it overrides",
  "Remote debugger is in a background tab which"
]);

if (Platform.OS === "android") {
  // 安卓沉浸式布局
  if (Platform.Version >= 21) {
    SafeAreaView.setStatusBarHeight(constantStore.HEADER_PADDING_BAR_HEIGHT);
  }
}

if (!__DEV__) {
  // global.console = {
  //   info: () => {},
  //   log: () => {},
  //   warn: () => {},
  //   debug: () => {},
  //   error: () => {}
  // };
  // ErrorUtils.setGlobalHandler(e => {
  // console.log(JSON.stringify(e));
  // });
} else {
  // 调试窗口 这个有坑，上传文件会报错没有二进制数据
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest;
  global.FormData = global.originalFormData
    ? global.originalFormData
    : global.FormData;
  global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
  global.FileReader = global.originalFileReader
    ? global.originalFileReader
    : global.FileReader;
}

import userStore from "stores/userStore";
import { Toast } from "antd-mobile-rn";

import {
  checkAppIsFirstTime,
  doAppUpdate,
  checkAppUpdate
} from "utils/UpdateAppUtils";
import pushNotificationStore from "stores/pushNotificationStore";

export default class RootApp extends Component {
  constructor(props) {
    super(props);
  }

  //隐藏启动屏幕
  hideStartScreen = () => {
    SplashScreen.hide();
  };

  componentWillMount() {
    checkAppIsFirstTime();
  }
  componentDidMount() {
    //锁定竖屏
    Orientation.lockToPortrait();
    //隐藏启动屏幕
    this.hideStartScreen();
    // 屏幕常亮
    KeepAwake.activate();
    // 监听外部url调用应用
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          // 如果是网址调用，是打不开到相关的路由的，要自己判断然后跳转；
          console.warn("Initial url is: " + url);
        }
      })
      .catch(err => console.error("An error occurred", err));

    // 初始化推送功能
    pushNotificationStore.initPush();
    // 判断是否已登录过
    userStore.asyncInit();

    // 检查app更新
    if (!__DEV__) {
      console.log("检查app更新");
      checkAppUpdate(false);
    }
  }
  componentWillUnmount() {}

  render() {
    const prefix = Platform.OS == "android" ? "http://myApp/" : "myApp://"; // 注册deep link
    let backgroundColor: string = "transparent";
    if (Platform.OS == "android") {
      if (Platform.Version < 23) {
        backgroundColor = undefined;
      }
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={backgroundColor}
        />
        <Provider>
          <AppNavigator
            uriPrefix={prefix}
            ref={navigatorRef => {
              NavigationUtils.setTopLevelNavigator(navigatorRef);
            }}
          />
        </Provider>
      </View>
    );
  }
}

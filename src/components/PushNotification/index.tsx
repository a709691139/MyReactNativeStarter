import React from "react";

import { Platform } from "react-native";

import JPushModule from "jpush-react-native";

// 推送通知 极光推送
// https://www.jiguang.cn/dev/#/app/list#dev

export default class PushNotification extends React.PureComponent<any, any> {
  constructor(props) {
    super(props);
  }
  // 初始化推送功能
  initPush = () => {
    if (Platform.OS === "android") {
      JPushModule.initPush();
      JPushModule.getInfo(map => {
        this.setState({
          appkey: map.myAppKey,
          imei: map.myImei,
          package: map.myPackageName,
          deviceId: map.myDeviceId,
          version: map.myVersion
        });
      });
      JPushModule.notifyJSDidLoad(resultCode => {
        if (resultCode === 0) {
        }
      });
    } else {
      JPushModule.setupPush();
    }
    JPushModule.addReceiveOpenNotificationListener(map => {
      console.log("Opening notification!");
      console.log("map.extra: " + map.extras);
      // this.jumpSecondActivity()
      // JPushModule.jumpToPushActivity("SecondActivity");
    });
  };
  componentDidMount() {
    this.initPush();
  }
  componentWillUnmount() {}
  render() {
    return null;
  }
}

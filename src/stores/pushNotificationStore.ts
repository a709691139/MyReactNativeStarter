import { observable, computed, observe, action, transaction, toJS } from "mobx";
import NavigationUtils from "utils/NavigationUtils";
import JPushModule from "jpush-react-native";
import { Platform, Linking, Vibration } from "react-native";
import { Toast } from "antd-mobile-rn";
import userStore from "stores/userStore";
const urlNewOrder = require("../assets/newOrder.mp3");
const urlCancelOrder = require("../assets/cancelOrder.mp3");
const urlCompletedOrder = require("../assets/completedOrder.mp3");
const urlNeedAddProductCount = require("../assets/needAddProductCount.mp3");

import Sound from "react-native-sound";
import RootToast from "components/RootToast";

// 推送通知
class PushNotificationStore {
  constructor() {}
  openNotification: any = null;
  rootToast: any = null;

  // 初始化推送功能
  @action
  initPush = () => {
    if (Platform.OS === "android") {
      JPushModule.initPush();
      JPushModule.getInfo(map => {
        // this.setState({
        //   appkey: map.myAppKey,
        //   imei: map.myImei,
        //   package: map.myPackageName,
        //   deviceId: map.myDeviceId,
        //   version: map.myVersion
        // });

        console.log("deviceId", map);
      });

      JPushModule.notifyJSDidLoad(resultCode => {
        if (resultCode === 0) {
        }
      });
    } else {
      JPushModule.setupPush();
    }
    JPushModule.getRegistrationID(registrationId => {
      console.log("推送注册id", registrationId);
      userStore.changeDataObj({
        registrationId: registrationId
      });
    });
    // 登录成功后在监听推送事件
    this.addEventListeners();
  };

  // 监听事件
  @action
  addEventListeners = () => {
    // 点击推送事件
    JPushModule.addReceiveOpenNotificationListener(
      this.handleAddReceiveOpenNotification
    );
    // 接收推送事件
    JPushModule.addReceiveNotificationListener(
      this.handleAddReceiveNotification
    );
    // 接收自定义消息事件
    JPushModule.addReceiveCustomMsgListener(
      this.handleAddReceiveCustomMsgListener
    );
  };

  // 取消监听事件
  @action
  removeEventListeners = () => {
    JPushModule.removeOpenNotificationLaunchAppEventListener(
      this.handleAddReceiveOpenNotification
    );
    JPushModule.removeReceiveNotificationListener(
      this.handleAddReceiveNotification
    );
    JPushModule.removeReceiveCustomMsgListener(
      this.handleAddReceiveCustomMsgListener
    );
  };

  // 播放视频
  @action
  playAudio = url => {
    Sound.setCategory("Playback", false);
    let whoosh = new Sound(
      url,
      error => {
        if (error) {
          console.log("failed to load the sound", error);
          return;
        }
        // loaded successfully
        console.log(
          "duration in seconds: " +
            whoosh.getDuration() +
            "  number of channels: " +
            whoosh.getNumberOfChannels()
        );
        whoosh.play(() => {
          console.log("playend");
          whoosh.release();
          whoosh = null;
        });
      },
      () => {}
    );
  };

  // toast
  @action
  showRootToast = (
    title: string,
    hideOnPress: boolean,
    onPress: () => void
  ) => {
    if (this.rootToast) {
      RootToast.hide(this.rootToast);
      this.rootToast = null;
    }
    this.rootToast = RootToast.show(title, {
      duration: RootToast.durations.LONG,
      position: RootToast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: hideOnPress,
      delay: 0,
      onPress: onPress
    });
  };
  // 转换通知为标准格式
  @action
  translateNotificatiton = message => {
    try {
      if (typeof message.extras == "string") {
        message.extras = JSON.parse(message.extras);
      }
      if (message.extras.data) {
        if (typeof message.extras.data == "string") {
          message.extras.data = JSON.parse(message.extras.data);
        }
        message.extras = {
          ...message.extras,
          ...message.extras.data
        };
      }
      // 转换公共mainTitle
      message.mainTitle =
        message.title || message.alertContent || message.content;
    } catch (e) {
      console.log("解析通知extra错误", e);
    }
    return message;
  };
  // 公用处理接收通知
  @action
  handleCommonReceiveNewNotification = message => {
    message = this.translateNotificatiton(message);
    console.log(message);
    Vibration.vibrate();
    let type = message.extras.type;
    switch (type) {
      case "orderDetail":
        // 跳转到订单详情
        let orderUrl = "";
        switch (message.extras.status.toString()) {
          case "0":
            orderUrl = urlNewOrder;
            break;
          case "3":
            orderUrl = urlCompletedOrder;
            break;
          case "4":
            orderUrl = urlCancelOrder;
            break;
        }
        if (orderUrl) {
          this.playAudio(orderUrl);
        }
        break;
      case "needAddProductCount":
        this.playAudio(urlNeedAddProductCount);
        break;
    }
    this.showRootToast(message.mainTitle, true, () => {
      this.handleAddReceiveOpenNotification(message);
    });
  };
  // 处理接受到新推送事件
  @action
  handleAddReceiveNotification = message => {
    // {extras: "{"data":"{\"type\":\"orderDetail\",\"orderId\":1,\"status\":4}"}", alertContent: "你有新的订单1", id: 191234577}
    console.log("处理接受到新推送事件：", message);
    if (userStore.logined) {
      this.handleCommonReceiveNewNotification(message);
    } else {
    }
  };

  // 处理接受到自定义消息事件
  @action
  handleAddReceiveCustomMsgListener = message => {
    //extras: "{"orderId":"101","status":"","type":"orderDetail"}", title: "", content: "你有一条订单已完成", content_type: "", message: "你有一条订单已完成"
    console.log("处理接受到自定义消息事件: ", message);
    if (userStore.logined) {
      this.handleCommonReceiveNewNotification(message);
    } else {
    }
  };

  // 处理点击推送事件
  @action
  handleAddReceiveOpenNotification = message => {
    console.log("Opening notification!");
    if (userStore.logined) {
      this.openNotification = null;
      message = this.translateNotificatiton(message);
      let type = message.extras.type;
      console.log("message.extra: ", type, message.extras);
      switch (type) {
        case "orderDetail":
          // 跳转到订单详情
          if (message.extras.orderId) {
            NavigationUtils.navigate("OrderDetail", {
              id: message.extras.orderId
            });
          }
          break;
        case "needAddProductCount":
          // 跳转到补货商品详情
          if (message.extras.productId) {
            NavigationUtils.navigate("GoodDetail", {
              mode: "replenish",
              id: message.extras.productId
            });
          }
          break;

        case "webView":
          // 打开网页
          if (message.extras.url) {
            if (message.extras.openDefaultBrower) {
              Linking.canOpenURL(message.extras.url)
                .then(supported => {
                  if (!supported) {
                    Toast.info("不支持打开 " + message.extras.url, 2);
                  } else {
                    return Linking.openURL(message.extras.url);
                  }
                })
                .catch(err => {
                  Toast.info("url无效 " + message.extras.url, 2);
                  console.warn("An error occurred", err);
                });
            } else {
              NavigationUtils.navigate("WebView", { uri: message.extras.url });
            }
          }
          break;
        case "openOtherApp":
          // 打开其他app
          if (message.extras.url) {
            Linking.canOpenURL(message.extras.url)
              .then(supported => {
                if (!supported) {
                  Toast.info("不支持 " + message.extras.url, 2);
                } else {
                  return Linking.openURL(message.extras.url);
                }
              })
              .catch(err => {
                Toast.info("url无效 " + message.extras.url, 2);
                console.warn("An error occurred", err);
              });
          }
          break;
        default:
          break;
      }
    } else {
      this.openNotification = message;
    }
  };

  // 登录成功后 执行查询调起通知
  @action
  checkOpenNotification = () => {
    if (this.openNotification) {
      console.log("登录成功后 执行查询调起通知");
      this.handleAddReceiveOpenNotification(this.openNotification);
    }
  };

  // 清空全部通知
  @action
  clearAllNotifications = () => {
    JPushModule.clearAllNotifications();
  };

  // 清空通知byId
  @action
  clearNotificationById = id => {
    JPushModule.clearNotificationById(id);
  };

  // 发送本地通知
  @action
  sendLocalNotification = data => {
    // var currentDate = new Date();
    // JPushModule.sendLocalNotification({
    //   id: 5,
    //   content: "content",
    //   extra: { key1: "value1", key2: "value2" },
    //   fireTime: currentDate.getTime() + 3000,
    //   badge: 8,
    //   sound: "fasdfa",
    //   subtitle: "subtitle",
    //   title: "title"
    // });
    JPushModule.sendLocalNotification(data);
  };
}
const pushNotificationStore = new PushNotificationStore();
export default pushNotificationStore;

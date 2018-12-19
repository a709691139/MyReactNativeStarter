import React from "react";
import {
  Dimensions,
  PixelRatio,
  Platform,
  Linking,
  Clipboard
} from "react-native";
const { height, width } = Dimensions.get("window");
import constantStore from "stores/constantStore";
const urlPlaceholderImage = require("images/PlaceholderImage.png");
import { Toast, Modal } from "antd-mobile-rn";

// 格式化图片url
export function translateImageUrl(url) {
  if (!url || typeof url == "object") {
    return urlPlaceholderImage;
  }
  if (typeof url == "string") {
    if (
      url.indexOf("http:/") == -1 &&
      url.indexOf("https:/") == -1 &&
      url.indexOf("file:/") == -1
    ) {
      url = constantStore.ROOT_API_URL + url;
    }
  }
  return { uri: url };
}

export function formatMoney(str) {
  return parseFloat(str)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

export function resize_rem() {
  let size = 0;
  if (!width) {
    return;
  } else if (width > 720) {
    size = 45;
  } else if (width < 320) {
    size = 20;
  } else if (width < 720 || width > 320) {
    size = 20 * (width / 320);
  }
  return size;
}

// 发送手机短信
export function sendPhoneMessage(phone) {
  let type = Platform.OS == "ios" ? "sms" : "smsto";
  Linking.canOpenURL(type + ":" + phone)
    .then(supported => {
      if (!supported) {
        Toast.info("手机不支持" + type, 2);
      } else {
        return Linking.openURL(type + ":" + phone);
      }
    })
    .catch(err => {
      // Toast.info("号码无效" + phone, 1);
      // console.warn("An error occurred", err);
    });
}
// 打电话
export function callPhone(phone) {
  let type = "tel";
  Linking.canOpenURL(type + ":" + phone)
    .then(supported => {
      if (!supported) {
        Toast.info("手机不支持" + type, 2);
      } else {
        return Linking.openURL(type + ":" + phone);
      }
    })
    .catch(err => {
      // Toast.info("号码无效" + phone, 1);
      // console.warn("An error occurred", err);
    });
}

// 打开弹窗，选择电话或者发短信
export function openPhoneModal(phone) {
  if (!phone) {
    return;
  }

  Modal.operation([
    {
      text: "复制到剪贴板：" + phone,
      onPress: () => {
        Clipboard.setString(phone);
        Toast.info("已复制到剪贴板" + phone, 2);
      }
    },
    {
      text: "打电话",
      onPress: () => {
        callPhone(phone);
      }
    },
    {
      text: "发短信",
      onPress: () => {
        sendPhoneMessage(phone);
      }
    }
  ]);
}

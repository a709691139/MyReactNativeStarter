import React from "react";
import { ViewStyle, WebView } from "react-native";
import { Toast } from "antd-mobile-rn";
import resolveAssetSource from "resolveAssetSource";
import styles from "./styles";
const urlWorker = require("./assets/home_icon_paonan.png");
const urlIconShou = require("./assets/icon_shou.png");
const urlIconMai = require("./assets/icon_mai.png");
const urlIconQu = require("./assets/icon_qu.png");
const urlIconFa = require("./assets/icon_fa.png");

interface Props {
  style?: ViewStyle;
  helpType?: "HELP_ME_CARRY" | "HELP_ME_BUY" | "HELP_ME_TAKE";
  workerLatitude?: number;
  workerLongitude?: number;
  goodsAddressLatitude?: number;
  goodsAddressLongitude?: number;
  targetAddressLatitude?: number;
  targetAddressLongitude?: number;
}
export default class WorkerMap extends React.PureComponent<Props, any> {
  state = {};
  webview = null;
  constructor(props) {
    super(props);
  }

  onLoad = () => {
    const helpType: string = this.props.helpType || "HELP_ME_CARRY";
    let goodAddressIconObj: object = null;
    switch (helpType) {
      case "HELP_ME_BUY":
        goodAddressIconObj = urlIconMai;
        break;
      case "HELP_ME_CARRY":
        goodAddressIconObj = urlIconFa;
        break;
      case "HELP_ME_TAKE":
        goodAddressIconObj = urlIconQu;
        break;
      default:
        break;
    }
    const sendData: Object = {
      type: "initData",
      data: {
        workerIcon: resolveAssetSource(urlWorker).uri,
        goodAddressIcon: resolveAssetSource(goodAddressIconObj).uri,
        targetAddressIcon: resolveAssetSource(urlIconShou).uri,
        helpType: this.props.helpType,
        workerLatitude: this.props.workerLatitude,
        workerLongitude: this.props.workerLongitude,
        goodsAddressLatitude: this.props.goodsAddressLatitude,
        goodsAddressLongitude: this.props.goodsAddressLongitude,
        targetAddressLatitude: this.props.targetAddressLatitude,
        targetAddressLongitude: this.props.targetAddressLongitude
      }
    };
    this.webview.postMessage(JSON.stringify(sendData));
    // console.log(sendData);
  };
  onMessage = e => {
    // { type:'', data:{} }
    // console.log(e.nativeEvent.data);
    let response = JSON.parse(e.nativeEvent.data);
    let data = response.data;
    this.setState({
      message: e.nativeEvent.data
    });
    switch (response.type) {
      case "loaded":
        this.onLoad();
        break;
      default:
        break;
    }
  };
  componentDidMount() {
    // console.log(resolveAssetSource(require("./html.html")));
  }
  render() {
    const patchPostMessageFunction = function() {
      let originalPostMessage = window.postMessage;
      let patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
      };
      patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace(
          "hasOwnProperty",
          "postMessage"
        );
      };
      window.postMessage = patchedPostMessage;
    };
    const patchPostMessageJsCode =
      "(" + String(patchPostMessageFunction) + ")();";

    return (
      <WebView
        style={[styles.container, this.props.style]}
        injectedJavaScript={patchPostMessageJsCode}
        ref={ref => {
          this.webview = ref;
        }}
        // automaticallyAdjustContentInsets={false}
        // contentInset={{ top: 0, right: 0, bottom: 0, left: 0 }}
        source={{ uri: resolveAssetSource(require("./html.html")).uri }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="always"
        onMessage={this.onMessage}
      />
    );
  }
}

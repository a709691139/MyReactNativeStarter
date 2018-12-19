import React, { Component } from "react";
import { observer } from "mobx-react";
import {
  View,
  WebView,
  Text,
  TouchableOpacity,
  Image,
  InteractionManager
} from "react-native";
import { Button, SearchBar, Toast } from "antd-mobile-rn";

import html from "./html";
import styles from "./styles";
import HeaderIconButtons from "components/HeaderIconButtons";
import LocationService from "services/LocationService";
import LocationListView from "./LocationListView";
const urlImgPosition = require("./assets/img_getPosition.png");

/* 路由传参 */
interface NavigationParams {
  longitude?: number;
  latitude?: number;
  address?: string;
  fnSuccess?: (
    longitude: number,
    latitude: number,
    address: string,
    adcode: string
  ) => void;
}
interface Props {
  navigation: any;
}
export default class SelectLocation extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "选择地址",
    headerRight: navigation.getParam("headerRight", <View />)
  });
  webview = null;
  changeSearchWordTimer = null;
  constructor(props) {
    super(props);
    const getParam = this.props.navigation.getParam;
    console.log(
      "路由传参",
      getParam("address", 0),
      getParam("longitude", 0),
      getParam("latitude", 0)
    );
    this.state = {
      searchWord: "",
      message: "",
      longitude: getParam("longitude", 0),
      latitude: getParam("latitude", 0),
      selectedAddress: getParam("address", ""), // 选中地名： address+" "+name
      inputFocused: false,
      selectedPosition: {
        name: "礼乐镇",
        location: { lat: 22.535154, lng: 113.096369 },
        address: "广东省江门市江海区中国移动鸿基电讯特约代理点北",
        province: "广东省",
        city: "江门市",
        area: "江海区",
        uid: "61f634f6cda1b97b6a49f38d"
      }
    };
    const headerRight = (
      <HeaderIconButtons
        list={[
          {
            title: "保存",
            onPress: this.fnSave
          }
        ]}
      />
    );
    this.props.navigation.setParams({
      headerRight: headerRight
    });
  }
  fnSave = async () => {
    console.log("fnSave", this.state);
    if (this.state.longitude && this.state.selectedAddress) {
      Toast.loading("loading..");
      const response: any = await LocationService.transformGpsToAddress(
        this.state.longitude,
        this.state.latitude
      );
      const adcode: string = response.result.addressComponent.adcode;
      const fnSuccess: Function = this.props.navigation.getParam(
        "fnSuccess",
        () => {}
      );
      fnSuccess(
        this.state.longitude,
        this.state.latitude,
        this.state.selectedAddress,
        adcode
      );
      Toast.hide();
      this.props.navigation.goBack();
    } else {
      Toast.info("请先选择位置", 1);
    }
  };
  clickChange = () => {
    this.webview.injectJavaScript(`try{}catch(e){document.write(e);} `);
  };
  onMessage = e => {
    // { type:'', data:{} }
    console.log(e.nativeEvent.data);
    let response = JSON.parse(e.nativeEvent.data);
    let data = response.data;
    this.setState({
      message: e.nativeEvent.data
    });
    switch (response.type) {
      case "loaded":
        Toast.hide();
        if (this.state.selectedAddress && this.state.longitude) {
          this.postCenterPositionToWebView(
            this.state.longitude,
            this.state.latitude
          );
        } else {
          this.getCurrentPosition();
        }
        break;
      case "changeCenter":
        this.setState(
          { longitude: data.longitude, latitude: data.latitude },
          () => {
            this.refs["LocationListView"].getPositionListByGps(
              data.longitude,
              data.latitude
            );
          }
        );
        break;
      default:
        break;
    }
  };
  postMessage = () => {
    this.webview.postMessage(" React Native!");
  };
  postCenterPositionToWebView = (longitude: number, latitude: number) => {
    const sendData = {
      type: "center",
      data: {
        longitude: longitude,
        latitude: latitude
      }
    };
    this.webview.postMessage(JSON.stringify(sendData));
    this.refs["LocationListView"].getPositionListByGps(longitude, latitude);
  };
  transformGpsToBMapGps = (longitude: number, latitude: number) => {
    LocationService.transformGpsToBMapGps(longitude, latitude)
      .then(response => {
        console.log(response);
        let longitude = response.result[0].x;
        let latitude = response.result[0].y;
        this.postCenterPositionToWebView(longitude, latitude);
      })
      .catch(error => {
        console.warn(error.message);
      });
  };
  getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(
          "getCurrentPosition",
          position.coords.longitude,
          position.coords.latitude
        );
        this.setState(
          {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          },
          () => {
            this.transformGpsToBMapGps(
              this.state.longitude,
              this.state.latitude
            );
          }
        );
      },
      error => {
        alert(error.message);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  };
  changeSearchWord = searchWord => {
    this.setState({ searchWord });
    this.changeSearchWordTimer && clearTimeout(this.changeSearchWordTimer);
    this.changeSearchWordTimer = setTimeout(() => {
      this.refs["LocationListView"].getPositionListBySearchWord(
        searchWord,
        this.state.selectedPosition.city
      );
    }, 350);
  };
  search = () => {
    this.refs["LocationListView"].getPositionListBySearchWord(
      this.state.searchWord,
      this.state.selectedPosition.city
    );
  };
  changeInputFouced = (inputFocused: boolean) => {
    this.setState({
      inputFocused: inputFocused
    });
  };
  changeSelectedPosition = position => {
    console.log(position);
    if (position.location) {
      let geo = {
        longitude: position.location.lng,
        latitude: position.location.lat
      };
      this.setState(geo);
      const sendData = {
        type: "center",
        data: geo
      };
      this.webview.postMessage(JSON.stringify(sendData));
    }
    this.setState({
      selectedPosition: position,
      selectedAddress:
        (position.address && position.address + " ") + position.name
    });
  };
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      Toast.loading("loading", 10);
    });
  }
  componentWillUnmount() {
    this.changeSearchWordTimer && clearTimeout(this.changeSearchWordTimer);
  }
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="请输入搜索地址"
          maxLength={30}
          value={this.state.searchWord}
          onChange={this.changeSearchWord}
          onSubmit={this.changeSearchWord}
          onCancel={() => this.changeInputFouced(false)}
          onFocus={() => this.changeInputFouced(true)}
          onBlur={() => this.changeInputFouced(false)}
        />
        {/* <Text>收到：{this.state.message}</Text>
        <Text>
          Position：{this.state.longitude},{this.state.latitude}
        </Text> */}
        <View
          style={[
            styles.webviewBox,
            {
              position: this.state.inputFocused ? "absolute" : "relative"
            }
          ]}
        >
          <WebView
            ref={ref => {
              this.webview = ref;
            }}
            automaticallyAdjustContentInsets={false}
            contentInset={{ top: 0, right: 0, bottom: 0, left: 0 }}
            source={{ html: html, baseUrl: "http://index.html" }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mixedContentMode="always"
            onMessage={this.onMessage}
            style={styles.webview}
          />
          <TouchableOpacity
            style={styles.webviewBox_centerPositionBox}
            activeOpacity={0.7}
            onPress={this.getCurrentPosition}
          >
            <Image
              style={styles.webviewBox_centerPositionBox_img}
              source={urlImgPosition}
            />
          </TouchableOpacity>
        </View>
        <LocationListView
          ref="LocationListView"
          changeSelectedPosition={this.changeSelectedPosition}
          selectedAddress={this.state.selectedAddress}
        />
      </View>
    );
  }
}

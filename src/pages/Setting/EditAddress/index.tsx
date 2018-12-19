import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles, { listItemStyle, inputItemStyle } from "./styles";
import { Toast, InputItem, List, Picker } from "antd-mobile-rn";
import LocationService from "services/LocationService";

/* 路由传参 */
interface NavigationParams {
  longitude?: number;
  latitude?: number;
  address?: string;
  adcode?: string;
  fnSuccess?: (
    longitude: number,
    latitude: number,
    address: string,
    adcode: string
  ) => Promise<any> | void;
}
interface Props {
  navigation: any;
}
export default class EditAddress extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "编辑地址",
    headerRight: <View />
  });

  constructor(props) {
    super(props);
    const getParam = this.props.navigation.getParam;
    this.state = {
      longitude: getParam("longitude", 0),
      latitude: getParam("latitude", 0),
      address: getParam("address", 0),
      adcode: getParam("adcode", ""),
      areas: ["", "", ""],
      regionTreeList: [],
      regionList: []
    };
  }
  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  changeAddress = () => {
    this.toOtherPage("SettingSelectLocation", {
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      address: this.state.address,
      fnSuccess: (
        longitude: number,
        latitude: number,
        address: string,
        adcode: string
      ) => {
        this.setState({
          longitude,
          latitude,
          address
        });
        this.translateAreas(adcode);
      }
    });
  };
  translateAreas = (adcode: string) => {
    // 根据adcode逆推出 省市区三个code,
    // adcode有可能是 城市|区域code.
    if (!adcode) {
      return;
    }
    let areas: Array<string> = ["", "", ""];
    let codeData: any = this.state.regionList.reduce(
      (pre, next) => {
        if (next.id == adcode) {
          if (next.levelType > pre.levelType) {
            pre = next;
          }
        }
        return pre;
      },
      {
        levelType: 0
      }
    );
    switch (codeData.levelType) {
      case 1:
        areas[0] = codeData.id;
        areas[1] = this.state.regionList.reduce((pre, next) => {
          if (next.parentId == areas[0]) {
            pre = next.id;
          }
          return pre;
        }, "");
        areas[2] = this.state.regionList.reduce((pre, next) => {
          if (next.parentId == areas[1]) {
            pre = next.id;
          }
          return pre;
        }, "");
        break;
      case 2:
        areas[1] = codeData.id;
        areas[0] = codeData.parentId;
        areas[2] = this.state.regionList.filter(
          v => v.parentId == areas[1]
        )[0].id;
        break;
      case 3:
        areas[2] = codeData.id;
        areas[1] = codeData.parentId;
        areas[0] = this.state.regionList.reduce((pre, next) => {
          if (next.id == areas[1]) {
            pre = next.parentId;
          }
          return pre;
        }, "");
        break;
      default:
        break;
    }
    console.log("逆推省市区", codeData, areas);
    this.setState({
      areas
    });
  };
  getRegionTree = async () => {
    try {
      let response: Array<any> = await LocationService.getRegionTree();
      let regionTreeList: Array<any> = [];
      let regionList: Array<any> = [];
      function translateTreeData(list, level) {
        list.map((v, i) => {
          v.label = v.text;
          v.id = v.id.toString();
          v.parentId = v.parentId.toString();
          v.value = v.id;
          v.level = level;
          if (v.children && v.children.length) {
            v.children = translateTreeData(v.children, level + 1);
          } else {
            delete v.children;
          }
          regionList.push(v);
          return v;
        });
        return list;
      }
      regionTreeList = translateTreeData(response, 0);
      this.setState({
        regionTreeList,
        regionList
      });
    } catch (error) {
      console.log(error);
      Toast.show("获取省市区列表失败");
    }
  };
  submit = async () => {
    let { longitude, latitude, address, areas } = this.state;
    let errorMsg: string = "";
    if (!longitude) {
      errorMsg = "请选择定位";
    } else if (!address) {
      errorMsg = "请输入地址";
    }
    if (errorMsg.length) {
      Toast.show(errorMsg);
      return;
    }
    let fnSuccess: Function = this.props.navigation.getParam("fnSuccess", null);
    if (fnSuccess) {
      await fnSuccess(longitude, latitude, address, areas[2]);
    }
    this.props.navigation.goBack();
  };
  componentDidMount() {
    Promise.all([this.getRegionTree()])
      .then(() => {
        this.translateAreas(this.state.adcode);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <List>
          <List.Item
            styles={listItemStyle}
            extra={
              this.state.longitude
                ? this.state.longitude + "," + this.state.latitude
                : "请选择定位"
            }
            onClick={this.changeAddress}
          >
            地图定位
          </List.Item>
          <Picker
            data={this.state.regionTreeList}
            cols={3}
            value={this.state.areas}
            onChange={areas => {
              this.setState({
                areas
              });
            }}
          >
            <List.Item arrow="horizontal" styles={listItemStyle}>
              省市区
            </List.Item>
          </Picker>
          <InputItem
            styles={inputItemStyle}
            maxLength={50}
            clear
            placeholder="请输入地址"
            placeholderTextColor="#CCCCCC"
            styles={inputItemStyle}
            value={this.state.address}
            onChange={address =>
              this.setState({
                address
              })
            }
          >
            地址
          </InputItem>
        </List>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.submitBtn}
          onPress={() => this.submit()}
        >
          <Text style={styles.submitBtn_text}>保存</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

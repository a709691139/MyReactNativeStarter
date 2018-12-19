import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles, { listItemStyle } from "./styles";
import EStyleSheet from "react-native-extended-stylesheet";

import { observer } from "mobx-react";
import { List, Modal, Toast, Picker } from "antd-mobile-rn";
import DeviceInfo from "react-native-device-info";
import { whiteThemeNavigationOptions } from "pages/index";
import UploadAvatar from "./UploadAvatar";
import IconEvilIcons from "react-native-vector-icons/EvilIcons";
import ShopService from "services/ShopService";
import userStore from "stores/userStore";
import shopStore from "stores/shopStore";
import { checkAppUpdate } from "utils/UpdateAppUtils";
import commonRegexp from "utils/commonRegexp";

interface Props {
  navigation: any;
}
@observer
export default class Setting extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "设置",
    headerRight: <View />
  });
  state = {
    shopTypes: [
      // 店铺类型服务行业列表
      // {
      //   id: 1,
      //   name: "便利店",
      //   logoUrl: null,
      // }
    ]
  };
  constructor(props) {
    super(props);
  }

  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  checkAppUpdate = () => {
    Toast.loading("loading..", 5);
    checkAppUpdate(true)
      .then(() => {
        Toast.hide();
      })
      .catch(error => {
        console.log(error);
        Toast.fail("更新失败");
      });
  };

  //注销
  logout = () => {
    Modal.alert("注销登录", "确定要退出当前账号？", [
      { text: "取消", onPress: () => {}, style: "default" },
      {
        text: "确定",
        onPress: () => {
          userStore.asyncLogout();
        }
      }
    ]);
  };

  changeShopName = () => {
    Modal.prompt(
      "设置店铺名称",
      "限制在12个字符以内",
      value => {
        Toast.loading("loading", 5);
        if (!value || value.length > 12) {
          Toast.fail("店铺名称限制在12个字符以内", 2);
          return;
        }
        ShopService.changeShopInfo({ name: value, id: shopStore.id })
          .then(response => {
            console.log("修改店铺名称", response);
            shopStore.changeDataObj({
              name: value
            });
            Toast.success("修改成功", 1);
          })
          .catch(error => {
            console.log(error);
            Toast.fail(error.message || error, 2);
          });
      },
      "default",
      "",
      ["点击输入店铺名称"]
    );
  };
  changeShopNotice = () => {
    Modal.prompt(
      "设置店铺公告",
      "限制在150个字符以内",
      value => {
        Toast.loading("loading", 5);
        if (!value || value.length > 150) {
          Toast.fail("店铺公告限制在150个字符以内", 2);
          return;
        }
        ShopService.changeShopInfo({ notice: value, id: shopStore.id })
          .then(response => {
            console.log("修改店铺公告", response);
            shopStore.changeDataObj({
              notice: value
            });
            Toast.success("修改成功", 1);
          })
          .catch(error => {
            console.log(error);
            Toast.fail(error.message || error, 2);
          });
      },
      "default",
      "",
      ["点击输入店铺名称"]
    );
  };
  changeShopMinimumDeliveryAmount = () => {
    Modal.prompt(
      "设置起送金额",
      "只能输入整数",
      value => {
        Toast.loading("loading", 5);
        if (value > 100000) {
          Toast.fail("起送金额限制在10万以内", 2);
          return;
        }
        if (!/(^[0-9]\d*$)/.test(value)) {
          Toast.fail("只能输入整数", 2);
          return;
        }
        ShopService.changeShopInfo({
          minimumDeliveryAmount: parseInt(value),
          id: shopStore.id
        })
          .then(response => {
            console.log("修改起送金额", response);
            shopStore.changeDataObj({
              minimumDeliveryAmount: parseInt(value)
            });
            Toast.success("修改成功", 1);
          })
          .catch(error => {
            console.log(error);
            Toast.fail(error.message || error, 2);
          });
      },
      "default",
      "",
      ["点击输入金额"]
    );
  };
  changeAddress = () => {
    this.toOtherPage("SettingEditAddress", {
      longitude: shopStore.longitude,
      latitude: shopStore.latitude,
      address: shopStore.address,
      adcode: shopStore.areaCode,
      fnSuccess: (
        longitude: number,
        latitude: number,
        address: string,
        adcode: string
      ) => {
        Toast.loading("loading");
        return ShopService.changeShopInfo({
          longitude,
          latitude,
          address,
          areaCode: adcode,
          id: shopStore.id
        })
          .then(response => {
            console.log("修改店铺地址", response);
            shopStore.changeDataObj({
              longitude,
              latitude,
              address,
              areaCode: adcode
            });
            Toast.success("修改成功", 1);
          })
          .catch(error => {
            console.log(error);
            Toast.fail(error.message || error, 2);
          });
      }
    });
  };
  changeShopContactName = () => {
    Modal.prompt(
      "设置联系人姓名",
      "请输入姓名",
      value => {
        Toast.loading("loading", 5);
        if (!value) {
          Toast.fail("请输入联系人姓名", 2);
          return;
        }
        ShopService.changeShopInfo({
          contactName: value,
          id: shopStore.id
        })
          .then(response => {
            console.log("修改联系人姓名", response);
            shopStore.changeDataObj({
              contactName: value
            });
            Toast.success("修改成功", 1);
          })
          .catch(error => {
            console.log(error);
            Toast.fail(error.message || error, 2);
          });
      },
      "default",
      "",
      ["点击输入联系人姓名"]
    );
  };
  changeShopContactPhone = () => {
    Modal.prompt(
      "设置联系人电话",
      "只能输入手机号码",
      value => {
        Toast.loading("loading", 5);
        if (!commonRegexp.mobilePhone.test(value)) {
          Toast.fail("请输入正确手机号码", 2);
          return;
        }
        ShopService.changeShopInfo({
          contactPhone: parseInt(value),
          id: shopStore.id
        })
          .then(response => {
            console.log("修改联系人电话", response);
            shopStore.changeDataObj({
              contactPhone: parseInt(value)
            });
            Toast.success("修改成功", 1);
          })
          .catch(error => {
            console.log(error);
            Toast.fail(error.message || error, 2);
          });
      },
      "default",
      "",
      ["点击输入手机号码"]
    );
  };
  toSettingWeChatQrcode = () => {
    if (shopStore.checkStatus == "1") {
      this.toOtherPage("SettingWeChatQrcode");
    } else {
      Toast.show("申请入驻成功才能生成小程序");
    }
  };
  // 获取 店铺类型服务行业列表
  getShopTypes = () => {
    ShopService.getShopTypes()
      .then(response => {
        console.log("getShopTypes", response);
        this.setState({
          shopTypes: response.list
        });
      })
      .catch(error => {
        console.log(error);
        Toast.info(error.message || error);
      });
  };
  changeShopType = (industryId: string | number) => {
    industryId = industryId.toString();
    Toast.loading("loading", 5);
    ShopService.changeShopInfo({ industryId, id: shopStore.id })
      .then(response => {
        console.log("修改行业类型", industryId, response);
        shopStore.changeDataObj({
          industryId
        });
        Toast.success("修改成功", 1);
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
      });
  };
  componentDidMount() {
    this.getShopTypes();
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <UploadAvatar />
        <List>
          <List.Item
            styles={listItemStyle}
            extra={shopStore.name || "请填写店铺名称"}
            onClick={this.changeShopName}
          >
            店铺名称&emsp;
          </List.Item>
          <List.Item
            styles={listItemStyle}
            arrow="horizontal"
            extra={
              <Text style={listItemStyle.Extra}>
                <IconEvilIcons
                  name="location"
                  size={30 * EStyleSheet.value("$scale")}
                />
                <Text
                  style={[listItemStyle.Extra, styles.addressText]}
                  numberOfLines={3}
                >
                  {shopStore.address || "设置店铺地址"}
                </Text>
              </Text>
            }
            onClick={this.changeAddress}
            multipleLine={true}
            wrap={true}
          >
            店铺地址&emsp;
          </List.Item>
          {/* checkStatus==1审核通过不显示 */}
          {/* <Picker
            data={this.state.shopTypes.map(v => {
              return { value: v.id.toString(), label: v.name };
            })}
            cols={1}
            value={[
              typeof shopStore.industryId == "number"
                ? shopStore.industryId.toString()
                : shopStore.industryId
            ]}
            onChange={array => {
              this.changeShopType(array[0]);
            }}
          >
            <List.Item arrow="horizontal" styles={listItemStyle}>
              行&emsp;&emsp;业
            </List.Item>
          </Picker> */}
          <List.Item
            styles={listItemStyle}
            extra={shopStore.notice || "请填写店铺公告"}
            onClick={this.changeShopNotice}
            multipleLine={true}
            wrap={true}
          >
            店铺公告&emsp;
          </List.Item>
          <List.Item
            styles={listItemStyle}
            extra={shopStore.contactName || "请设置联系人姓名"}
            onClick={this.changeShopContactName}
          >
            联系人姓名
          </List.Item>
          <List.Item
            styles={listItemStyle}
            extra={shopStore.contactPhone || "请设置联系人电话"}
            onClick={this.changeShopContactPhone}
          >
            联系人电话
          </List.Item>
          <List.Item
            styles={listItemStyle}
            extra={
              shopStore.minimumDeliveryAmount != null
                ? shopStore.minimumDeliveryAmount.toString()
                : "请设置最低起送金额"
            }
            onClick={this.changeShopMinimumDeliveryAmount}
          >
            起送金额&emsp;
          </List.Item>
        </List>
        <View style={styles.marginBox} />
        <List>
          <List.Item
            styles={listItemStyle}
            arrow="horizontal"
            extra={" "}
            onClick={() => this.toOtherPage("SettingSuggest")}
          >
            使用反馈
          </List.Item>
          <List.Item
            styles={listItemStyle}
            arrow="horizontal"
            extra={" "}
            onClick={() => this.toOtherPage("SettingChangePassword")}
          >
            修改密码
          </List.Item>
          <List.Item
            styles={listItemStyle}
            arrow="horizontal"
            extra={"生成微信小程序二维码"}
            onClick={this.toSettingWeChatQrcode}
          >
            <Text style={listItemStyle.Content}>小程序&emsp;</Text>
          </List.Item>
        </List>
        <View style={styles.marginBox} />
        <List>
          <List.Item
            styles={listItemStyle}
            disabled
            extra={DeviceInfo.getReadableVersion() + (__DEV__ ? " dev" : "")}
            onClick={this.checkAppUpdate}
          >
            应用版本&emsp;
          </List.Item>
          <List.Item
            styles={listItemStyle}
            arrow="horizontal"
            extra={" "}
            disabled
            onClick={() => {
              this.toOtherPage("SettingAboutus");
            }}
          >
            关于我们&emsp;
          </List.Item>
        </List>
        <View style={styles.marginBox} />
        <View style={styles.logoutBox}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.logout}
            style={styles.logoutBox_btn}
          >
            <Text style={styles.logoutBox_text}>退出账号</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

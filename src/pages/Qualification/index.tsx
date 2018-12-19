import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  InteractionManager
} from "react-native";
import { observer } from "mobx-react";
import { whiteThemeNavigationOptions } from "pages/index";
import { Toast, Modal, InputItem, List, Picker } from "antd-mobile-rn";
import FormItem from "components/FormItem";
import EStyleSheet from "react-native-extended-stylesheet";
import styles, { listItemStyle, inputItemStyle } from "./styles";
import ShopService from "services/ShopService";
import IconEvilIcons from "react-native-vector-icons/EvilIcons";
import { translateImageUrl } from "utils/CommonUtils";
import SYImagePicker from "react-native-syan-image-picker";
import RNFetchBlob from "react-native-fetch-blob";
import commonRegexp from "utils/commonRegexp";
import SystemService from "services/SystemService";
import shopStore from "stores/shopStore";
import ListPopover from "components/ListPopover";
const urlIconCamera = require("images/img_dianjishangchuan.png");
const urlIconSelectOn = require("images/icon_select_on.png");
const urlIconSelectOff = require("images/icon_select_off.png");

// 资格审核
// 暂时只做add
interface navigationParams {
  mode?: "add" | "edit";
}
interface Props {
  navigation: any;
}
@observer
export default class GoodsType extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "提交资料",
    headerRight: <View />
  });
  formItemRefs = {};
  nameList = [
    "shopName",
    "industryId",
    "legalPersonName",
    "legalPersonPhone",
    "longitude",
    "latitude",
    "address",
    "areaCode",
    "doorheadImageUrl",
    "indoorImageUrl",
    "businessLicenceImage"
  ];
  uploading = false;

  state = {
    mode: "add",
    loading: false,
    shopName: "", // 店铺名称
    industryId: "", // 行业类型Id
    legalPersonName: "", // 法人名字
    legalPersonPhone: "", // 法人电话
    longitude: "", // 经度（所在地区）
    latitude: "", // 纬度（所在地区）
    address: "", // 店铺地址（详细地址）
    areaCode: "",
    doorheadImageUrl: "", // 门头照
    indoorImageUrl: "", // 室内照
    businessLicenceImage: "", // 营业执照Url,
    agree: false, // 同意
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
    // this.state.mode = this.props.navigation.getParam("mode", "add");
  }

  toOtherPage = (route, params?) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
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
  changeAddress = () => {
    this.toOtherPage("SettingEditAddress", {
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      address: this.state.address,
      adcode: this.state.areaCode,
      fnSuccess: (
        longitude: number,
        latitude: number,
        address: string,
        adcode: string
      ) => {
        this.setState({
          longitude,
          latitude,
          address,
          areaCode: adcode
        });
      }
    });
  };
  selectPhoto = stateName => {
    Modal.operation([
      {
        text: "拍照",
        onPress: () => {
          setTimeout(() => {
            SYImagePicker.openCamera(
              { isCrop: false, showCropCircle: false, showCropFrame: false },
              (err, photos) => {
                console.log(err, photos);
                if (!err) {
                  this.setState({
                    [stateName]: photos[0]
                  });
                }
              }
            );
          }, 800);
        }
      },
      {
        text: "相册",
        onPress: () => {
          setTimeout(() => {
            SYImagePicker.asyncShowImagePicker({
              imageCount: 1,
              enableBase64: false,
              isCrop: false,
              showCropCircle: false
            })
              .then(photos => {
                console.log(photos);
                const arr = photos.map(v => {
                  return { ...v, enableBase64: false };
                });
                // 选择成功
                this.setState({
                  [stateName]: photos[0]
                });
              })
              .catch(err => {
                // 取消选择，err.message为"取消"
              });
          }, 800);
        }
      }
    ]);
  };
  selectShopType = () => {
    ListPopover.open({
      list: this.state.shopTypes.map(v => v.name),
      onClick: (item: string, index: number) => {
        this.setState({
          industryId: this.state.shopTypes[index].id.toString()
        });
      }
    });
  };
  uploadImg = (uri: string, stateName: string) => {
    return SystemService.uploadFile({
      uri: uri,
      type: "multipart/form-data",
      name: uri
    })
      .then(response => {
        let url = response.url;
        console.log("上传成功", response.url);
        this.setState({
          [stateName]: url
        });
        this.state = {
          ...this.state,
          [stateName]: url
        };
        return url;
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
        throw new Error(error);
      });
  };

  submit = async () => {
    let sendData: Object = {};
    let nameList: Array<string> = this.nameList;

    let errorMessage = "";
    Object.keys(this.formItemRefs).map(key => {
      const formItemRef = this.formItemRefs[key];
      if (!errorMessage) {
        // console.log(formItemRef.getMessage());
        let formItemRefValid: boolean = formItemRef.checkValid();
        if (!formItemRefValid) {
          errorMessage = formItemRef.getMessage();
        }
      }
    });
    if (errorMessage) {
      console.log("校验不通过", errorMessage);
      Toast.info(errorMessage, 2);
      return;
    }
    Toast.loading("提交中..", 0);
    let imgNames = [
      "doorheadImageUrl",
      "indoorImageUrl",
      "businessLicenceImage"
    ];
    for (let i = 0; i < imgNames.length; i++) {
      let imgName = imgNames[i];
      if (typeof this.state[imgName] == "object") {
        try {
          let imgUrl = await this.uploadImg(this.state[imgName].uri, imgName);
          console.log(imgUrl);
        } catch (error) {
          console.log(error);
          Toast.fail(error.message || error, 2);
          return;
        }
      }
    }
    console.log("complete");
    let promise = null;
    switch (this.state.mode) {
      case "add":
        promise = ShopService.addShopCheck;
        break;
      case "edit":
        promise = ShopService.updateShopCheck;
        break;
      default:
        break;
    }
    nameList.map(key => {
      sendData[key] = this.state[key];
    });
    sendData["shopId"] = shopStore.id;
    console.log(sendData);
    try {
      const response: any = await promise(sendData);
      console.log("提交成功", response);
      await shopStore.getData();
      Toast.success("提交成功", 1);
      this.props.navigation.replace("QualificationStatusDetail");
    } catch (error) {
      console.log(error);
      Toast.fail(error.message || error, 2);
    }
  };
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.getShopTypes();
      // 默认设置 shopStore已有数据
      let defaultState = {};
      this.nameList.map(name => {
        if (shopStore[name]) {
          defaultState[name] = shopStore[name];
        }
      });
      if (shopStore["name"]) {
        defaultState["shopName"] = shopStore["name"];
      }
      if (shopStore["contactName"]) {
        defaultState["legalPersonName"] = shopStore["contactName"];
      }
      if (shopStore["contactPhone"]) {
        defaultState["legalPersonPhone"] = shopStore["contactPhone"];
      }
      this.setState(defaultState);
    });
  }
  componentWillUnmount() {
    RNFetchBlob.session("temDownloadImg")
      .dispose()
      .then(() => {
        console.log("清除图片缓存");
      });
  }
  renderPhotoBox = (
    title: string,
    uri: string | object,
    stateName: string,
    onPress: () => void
  ) => {
    return (
      <FormItem
        ref={ref => {
          this.formItemRefs[stateName] = ref;
        }}
        value={this.state[stateName]}
        required={true}
        message={"请选择" + title}
      >
        <View style={styles.photoBox}>
          <Text style={styles.photoBox_title}>{title}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.photoBox_picBox}
            onPress={onPress}
          >
            {!!uri ? (
              <Image
                source={typeof uri == "object" ? uri : translateImageUrl(uri)}
                style={styles.uploadImage}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.photoBox_picBox_upload}>
                <Image
                  source={urlIconCamera}
                  style={styles.photoBox_picBox_upload_img}
                />
                <Text style={styles.photoBox_picBox_upload_text}>点击上传</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </FormItem>
    );
  };
  render() {
    // console.log(this.state);
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <List>
          <FormItem
            ref={ref => {
              this.formItemRefs["shopName"] = ref;
            }}
            value={this.state.shopName}
            required={true}
            message="请输入店铺名称"
          >
            <InputItem
              maxLength={20}
              clear
              type="text"
              defaultValue=""
              placeholder="请输入店铺名称"
              placeholderTextColor="#999999"
              styles={inputItemStyle}
              value={this.state.shopName}
              onChange={shopName =>
                this.setState({
                  shopName: shopName
                })
              }
            >
              店铺名称
            </InputItem>
          </FormItem>
          <FormItem
            ref={ref => {
              this.formItemRefs["industryId"] = ref;
            }}
            value={this.state.industryId}
            required={true}
            message="请选择服务行业"
          >
            <List.Item
              styles={listItemStyle}
              onClick={this.selectShopType}
              extra={this.state.shopTypes.reduce((pre, next) => {
                if (next.id == this.state.industryId) {
                  pre = next.name;
                }
                return pre;
              }, "请选择服务行业")}
            >
              行&emsp;&emsp;业
            </List.Item>
          </FormItem>
          <FormItem
            ref={ref => {
              this.formItemRefs["legalPersonName"] = ref;
            }}
            value={this.state.legalPersonName}
            required={true}
            message="请填写联系人"
          >
            <InputItem
              maxLength={20}
              clear
              type="text"
              defaultValue=""
              placeholder="请填写联系人"
              placeholderTextColor="#999999"
              styles={inputItemStyle}
              value={this.state.legalPersonName}
              onChange={legalPersonName =>
                this.setState({
                  legalPersonName: legalPersonName
                })
              }
            >
              法&emsp;&emsp;人
            </InputItem>
          </FormItem>
        </List>
        <View style={styles.tipsBox}>
          <Text style={styles.tipsBox_text}>
            为确保资金安全，法人姓名需与提现银行卡的姓名一致
          </Text>
        </View>
        <List>
          <FormItem
            ref={ref => {
              this.formItemRefs["legalPersonPhone"] = ref;
            }}
            value={this.state.legalPersonPhone}
            required={true}
            message="请输入正确的法人电话"
            pattern={commonRegexp.allPhone}
          >
            <InputItem
              maxLength={20}
              clear
              type="number"
              defaultValue=""
              placeholder="请输入联系人电话"
              placeholderTextColor="#999999"
              styles={inputItemStyle}
              value={this.state.legalPersonPhone}
              onChange={legalPersonPhone =>
                this.setState({
                  legalPersonPhone: legalPersonPhone
                })
              }
            >
              法人电话
            </InputItem>
          </FormItem>
          <FormItem
            ref={ref => {
              this.formItemRefs["address"] = ref;
            }}
            value={this.state.address}
            required={true}
            message="请设置店铺地址"
          >
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
                    {this.state.address || "设置店铺地址"}
                  </Text>
                </Text>
              }
              onClick={this.changeAddress}
              multipleLine={true}
              wrap={true}
            >
              店铺地址
            </List.Item>
          </FormItem>
        </List>
        <View style={styles.marginBox} />
        <View style={styles.photosBox}>
          {this.renderPhotoBox(
            "门头照",
            this.state.doorheadImageUrl,
            "doorheadImageUrl",
            () => {
              this.selectPhoto("doorheadImageUrl");
            }
          )}
          {this.renderPhotoBox(
            "店内照",
            this.state.indoorImageUrl,
            "indoorImageUrl",
            () => {
              this.selectPhoto("indoorImageUrl");
            }
          )}
        </View>
        <View style={styles.marginBox} />
        <View style={styles.photosBox}>
          {this.renderPhotoBox(
            "营业执照",
            this.state.businessLicenceImage,
            "businessLicenceImage",
            () => {
              this.selectPhoto("businessLicenceImage");
            }
          )}
        </View>
        <FormItem
          ref={ref => {
            this.formItemRefs["agree"] = ref;
          }}
          value={this.state.agree}
          message="请已阅读并同意《商家入驻协议》"
          pattern={/true/}
        >
          <View style={styles.agreeBox}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.agreeBox_checkBtn}
              onPress={() => {
                this.setState({ agree: !this.state.agree });
              }}
            >
              <Image
                source={this.state.agree ? urlIconSelectOn : urlIconSelectOff}
                style={styles.agreeBox_checkImg}
              />
            </TouchableOpacity>
            <Text
              style={styles.agreeBox_text}
              onPress={() => {
                this.setState({ agree: !this.state.agree });
              }}
            >
              我已阅读并同意
              <Text
                style={styles.agreeBox_text_red}
                onPress={() => {
                  this.toOtherPage("SettingAgreement");
                }}
              >
                《商家入驻协议》
              </Text>
            </Text>
          </View>
        </FormItem>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.submitBtn}
          onPress={() => this.submit()}
        >
          <Text style={styles.submitBtn_text}>下一步</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

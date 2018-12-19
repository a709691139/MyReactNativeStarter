import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles, { inputItemStyle, listItemStyle } from "./styles";
import EStyleSheet from "react-native-extended-stylesheet";
import { observer } from "mobx-react";
import { whiteThemeNavigationOptions } from "pages/index";
import ActivityService from "services/ActivityService";
import SystemService from "services/SystemService";
import { Toast, Modal, InputItem, List, DatePicker } from "antd-mobile-rn";
import moment from "moment";
import FormItem from "components/FormItem";
import CheckBox from "components/CheckBox";
import IconIonicon from "react-native-vector-icons/Ionicons";
import { translateImageUrl } from "utils/CommonUtils";
import SYImagePicker from "react-native-syan-image-picker";
import constantStore from "stores/constantStore";
const urlImgPhoto = require("images/photo.png");
const urlImgCancel = require("./assets/icon_cancel.png");

interface navigationParams {
  mode?: "add" | "edit";
  id?: number;
  fnSuccess?: Function;
}
interface Props {
  navigation: any;
}
@observer
export default class ActivityReleaseDetail extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: navigation.getParam("title", "新增活动"),
    headerRight: <View />
  });
  state = {
    uploading: false,
    mode: "add" || "edit",
    id: "",
    imgUrl: "",
    activityName: "", // 活动名称，有对应的活动才有名称
    activitySubName: "", // 副标题名称
    popType: "0", // 弹出类型：0店铺主页，1会员注册
    adDesc: "",
    // status: "1", // 状态：0关闭，1开启
    totalCount: "",
    startTime: undefined,
    finishTime: undefined,
    couponList: [
      // {
      //   id: 130,
      //   shopId: 1,
      //   couponType: 1,
      //   couponName: "满100元8折",
      //   minimumConsumption: 100.0,
      //   cutDownMeney: null,
      //   discount: 0.8,
      //   startTime: "2018-09-08 00:00:00",
      //   finishTime: "2018-09-30 23:59:59",
      //   totalCount: 100,
      //   setOutCount: 0,
      //   type: 1,
      //   activityId: 55,
      //   status: 1,
      //   scopeType: 0,
      //   createTime: "2018-09-06 09:43:32",
      //   productTypeList: null,
      //   productList: null,
      //   operationType: null, // operationType必须设置值，0新增，1修改，2删除，其他(包括null)是没修改
      //   hadReceive: null
      // }
    ] // 最多两张
  };
  nameList = [
    "id",
    "imgUrl",
    "activityName",
    "activitySubName",
    "popType",
    "adDesc",
    // "status",
    "totalCount",
    "startTime",
    "finishTime",
    "couponList"
  ];
  formItemRefs = {};
  minDate = new Date();
  maxDate = new Date(new Date().getFullYear() + 2, 12, 30);
  statusTypes = [
    {
      label: "开启",
      value: "1"
    },
    {
      label: "关闭",
      value: "0"
    }
  ];
  popTypes = [
    {
      label: "店铺主页",
      value: "0"
    },
    {
      label: "会员注册",
      value: "1"
    }
  ];
  constructor(props) {
    super(props);
    this.state.mode = this.props.navigation.getParam("mode", "add");
    this.props.navigation.setParams({
      title: this.state.mode == "add" ? "新增活动" : "编辑活动"
    });
  }
  onBlurChangeNumber = (str: string, isInt: boolean = false) => {
    let newStr = "";
    if (isInt) {
      newStr = parseInt(str).toString();
    } else {
      // newStr = (parseInt(parseFloat(str) * 100) / 100).toString();
      if (str.indexOf(".") != -1) {
        newStr = str.split(".")[0] + "." + str.split(".")[1].substring(0, 2);
      } else {
        newStr = str;
      }
    }
    if (newStr == "NaN") {
      newStr = "";
    }
    // console.warn(str, newStr);
    return newStr;
  };
  uploadImg = (uri: string) => {
    Toast.loading("正在上传");
    return SystemService.uploadFile({
      uri: uri,
      type: "multipart/form-data",
      name: uri
    }).then(response => {
      let url = response.url;
      console.log("上传成功", response.url);
      this.setState({
        imgUrl: url
      });
      this.state = {
        ...this.state,
        imgUrl: url
      };
      return url;
    });
  };
  showActionSheet = () => {
    const CropW: number = parseInt(constantStore.SCREEN_WIDTH * 0.6);
    const CropH: number = parseInt(CropW / 2.03);
    Modal.operation([
      {
        text: "拍照",
        onPress: () => {
          setTimeout(() => {
            SYImagePicker.openCamera(
              {
                isCrop: true,
                showCropCircle: false,
                showCropFrame: false,
                CropW,
                CropH
              },
              (err, photos) => {
                console.log(err, photos);
                if (!err) {
                  this.setState({
                    imgUrl: photos[0]
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
              isCrop: true,
              showCropCircle: false,
              CropW,
              CropH
            })
              .then(photos => {
                console.log(photos);
                this.setState({
                  imgUrl: photos[0]
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
  getDetailById = async (id: string) => {
    try {
      Toast.loading("加载中..");
      const response: any = await ActivityService.getActivityReleaseDetail(id);
      console.log("getDetailById", response);
      let state = {};
      Object.keys(response).map((v, i) => {
        if (response[v] === undefined || response[v] === null) {
          delete response[v];
        }
        if (typeof response[v] == "number") {
          response[v] = response[v].toString();
        }
        if (v.toLowerCase().indexOf("time") != -1 && response[v]) {
          // 时间 转 moment
          response[v] = moment(response[v]).toDate();
        }
      });
      this.nameList.map(key => {
        state[key] = response[key];
      });
      this.setState(state);
      Toast.hide();
    } catch (error) {
      console.log(error);
      Toast.fail(error.message || error, 2);
      this.props.navigation.goBack();
    }
  };
  selectCouponType = () => {
    if (this.state.couponList.filter(v => v.operationType != 2).length < 2) {
      this.props.navigation.navigate("SelectCouponType", {
        type: "1",
        fnSuccess: data => {
          let couponList: Array<any> = this.state.couponList || [];
          data.operationType = "0";
          couponList.push(data);
          this.setState({
            couponList
          });
        }
      });
    } else {
      Toast.info("最多只能选择两种优惠券");
    }
  };
  removeCoupon = (couponIndex: number) => {
    let couponList: Array<any> = this.state.couponList;
    if (!couponList[couponIndex].id) {
      couponList.splice(couponIndex, 1);
    } else {
      couponList[couponIndex].operationType = 2;
    }
    this.setState({
      couponList
    });
  };
  submit = async () => {
    let errorMessage: string = "";
    // if (!this.state.imgUrl) {
    //   errorMessage = "请先选择图片";
    // }
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
    try {
      let sendData: Object = {};
      let succussMsg: string = "";
      this.nameList.map(key => {
        sendData[key] = this.state[key];
      });
      sendData["startTime"] = moment(sendData["startTime"])
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss");
      sendData["finishTime"] = moment(sendData["finishTime"])
        .endOf("day")
        .format("YYYY-MM-DD HH:mm:ss");

      Toast.loading("提交中..");
      if (typeof this.state.imgUrl == "object") {
        let imgUrl = await this.uploadImg(this.state.imgUrl["uri"]);
        sendData["imgUrl"] = imgUrl;
        console.log(imgUrl);
      }
      console.log("sendData", sendData);
      if (this.state.mode == "add") {
        succussMsg = "新增成功";
        await ActivityService.addActivityRelease(sendData);
      } else {
        succussMsg = "修改成功";
        sendData["id"] = this.props.navigation.getParam("id");
        await ActivityService.editActivityRelease(sendData);
      }
      this.props.navigation.getParam("fnSuccess", () => {})();
      this.props.navigation.goBack();
      Toast.show(succussMsg);
    } catch (error) {
      console.log(error);
      Toast.fail(error.message || error, 2);
    }
  };

  componentDidMount() {
    if (this.state.mode == "edit") {
      this.getDetailById(this.props.navigation.getParam("id"));
    }
  }
  render() {
    const showCouponList: Array<any> = this.state.couponList.filter(
      v => v.operationType != 2
    );
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.uploadBox}>
          {this.state.imgUrl ? (
            <TouchableOpacity
              style={styles.uploadBox_btn}
              activeOpacity={0.8}
              onPress={this.showActionSheet}
            >
              <Image
                style={styles.uploadBox_image}
                source={
                  typeof this.state.imgUrl == "object"
                    ? this.state.imgUrl
                    : translateImageUrl(this.state.imgUrl)
                }
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.uploadBox_btn}
              activeOpacity={0.8}
              onPress={this.showActionSheet}
            >
              <Image style={styles.uploadBox_icon} source={urlImgPhoto} />
              <Text style={styles.uploadBox_text}>拍摄或上传活动图片</Text>
              <Text style={styles.uploadBox_text1}>
                为保证您的活动图片正常显示，图片尺寸最好为670*330
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <List>
          <FormItem
            ref={ref => {
              this.formItemRefs["activityName"] = ref;
            }}
            value={this.state.activityName}
            required={true}
            message="请填写活动标题"
          >
            <InputItem
              maxLength={30}
              clear
              placeholder="请填写活动标题"
              placeholderTextColor="#999999"
              styles={inputItemStyle}
              value={this.state.activityName}
              onChange={activityName =>
                this.setState({
                  activityName
                })
              }
            >
              活动标题
            </InputItem>
          </FormItem>
          <FormItem
            ref={ref => {
              this.formItemRefs["activitySubName"] = ref;
            }}
            value={this.state.activitySubName}
            required={true}
            message="请填写活动副标题"
          >
            <InputItem
              maxLength={20}
              clear
              placeholder="请填写活动副标题"
              placeholderTextColor="#999999"
              styles={inputItemStyle}
              value={this.state.activitySubName}
              onChange={activitySubName =>
                this.setState({
                  activitySubName
                })
              }
            >
              活动副标题
            </InputItem>
          </FormItem>
          {/* <List.Item
            styles={listItemStyle}
            extra={
              <CheckBox
                style={styles.checkBox}
                btnStyle={styles.checkBox_li}
                btnTextStyle={styles.checkBox_text}
                list={this.statusTypes}
                value={this.state.status}
                onChange={value => {
                  this.setState({
                    status: value
                  });
                }}
              />
            }
          >
            活动状态
          </List.Item> */}
          {/* <List.Item
            styles={listItemStyle}
            extra={
              <CheckBox
                style={styles.checkBox}
                btnStyle={styles.checkBox_li}
                btnTextStyle={styles.checkBox_text}
                list={this.popTypes}
                value={this.state.popType}
                onChange={value => {
                  this.setState({
                    popType: value
                  });
                }}
              />
            }
          >
            弹出事件
          </List.Item> */}
          <FormItem
            ref={ref => {
              this.formItemRefs["startTime"] = ref;
            }}
            value={this.state.startTime}
            required={true}
            message="请设置开始时间"
          >
            <DatePicker
              value={this.state.startTime}
              mode="date"
              minDate={this.minDate}
              maxDate={this.maxDate}
              onChange={(startTime: object) => {
                this.setState({
                  startTime
                });
              }}
              format="YYYY-MM-DD"
              extra="点击设置"
            >
              <List.Item styles={listItemStyle} extra={""}>
                开始时间
              </List.Item>
            </DatePicker>
          </FormItem>
          <FormItem
            ref={ref => {
              this.formItemRefs["finishTime"] = ref;
            }}
            value={this.state.finishTime}
            required={true}
            message="请设置结束时间"
          >
            <DatePicker
              value={this.state.finishTime}
              mode="date"
              minDate={this.minDate}
              maxDate={this.maxDate}
              onChange={(finishTime: object) => {
                this.setState({
                  finishTime
                });
              }}
              format="YYYY-MM-DD"
              extra="点击设置"
            >
              <List.Item styles={listItemStyle} extra={""}>
                结束时间
              </List.Item>
            </DatePicker>
          </FormItem>
        </List>
        <View style={styles.marginBox} />
        <List>
          <List.Item
            styles={listItemStyle}
            extra={
              showCouponList.length ? (
                <View style={styles.couponItems}>
                  {this.state.couponList.map((v, i) => {
                    if (v.operationType == 2) {
                      return null;
                    }
                    return (
                      <View style={styles.couponItem} key={i}>
                        <TouchableOpacity
                          activeOpacity={1}
                          style={styles.couponItemInner}
                          onPress={() => {}}
                        >
                          <Text style={styles.couponItem_text}>
                            {v.couponType == 0
                              ? `满${v.minimumConsumption}元减${
                                  v.cutDownMeney
                                }元`
                              : `满${v.minimumConsumption}元${parseFloat(
                                  (v.discount * 10).toFixed(3)
                                )}折`}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={styles.couponItem_cancelBox}
                          onPress={() => this.removeCoupon(i)}
                        >
                          <Image
                            source={urlImgCancel}
                            style={styles.couponItem_cancelBox_img}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                  {this.state.couponList.filter(v => v.operationType != 2)
                    .length <= 1 && (
                    <IconIonicon
                      name={"ios-add-circle-outline"}
                      color={"#999999"}
                      size={40 * EStyleSheet.value("$scale")}
                    />
                  )}
                </View>
              ) : (
                <Text>
                  最多新增2张优惠券，非必填
                  <IconIonicon
                    name={"ios-add-circle-outline"}
                    color={"#999999"}
                    size={40 * EStyleSheet.value("$scale")}
                  />
                </Text>
              )
            }
            onClick={this.selectCouponType}
          >
            优惠券
          </List.Item>
          {!!showCouponList.length && (
            <FormItem
              ref={ref => {
                this.formItemRefs["totalCount"] = ref;
              }}
              value={this.state.totalCount}
              required={true}
              message="请填写发放数量"
            >
              <InputItem
                maxLength={20}
                clear
                placeholder="请填写发放数量"
                placeholderTextColor="#999999"
                styles={inputItemStyle}
                value={this.state.totalCount}
                type="number"
                onChange={totalCount =>
                  this.setState({
                    totalCount
                  })
                }
                onBlur={totalCount => {
                  this.setState({
                    totalCount: this.onBlurChangeNumber(totalCount, true)
                  });
                }}
              >
                发放数量
              </InputItem>
            </FormItem>
          )}
        </List>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.submitBtn}
          onPress={this.submit}
        >
          <Text style={styles.submitBtn_text}>保存</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

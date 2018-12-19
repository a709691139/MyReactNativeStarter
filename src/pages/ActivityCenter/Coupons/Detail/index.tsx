import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles, { inputItemStyle, listItemStyle } from "./styles";
import { observer } from "mobx-react";
import { whiteThemeNavigationOptions } from "pages/index";
import HeaderButtons from "components/HeaderButtons";
import { Toast, Modal, InputItem, List, DatePicker } from "antd-mobile-rn";
import ActivityService from "services/ActivityService";
import FormItem from "components/FormItem";
import moment from "moment";
import dictionaryStore from "stores/dictionaryStore";

interface navigationParams {
  couponType?: string; //  新增模式必填, 优惠券类型：0满减劵，1折扣劵, 默认 0 ,
  type?: "0"; //  新增模式需要填, 类型：0普通优惠券，1活动优惠券, 默认 0
  mode?: "add" | "edit" | "addActivity"; // addActivity新增活动优惠券是去除时间和数量，只提交fnSuccess
  id?: number;
  fnSuccess?: Function;
}
interface Props {
  navigation: any;
}
@observer
export default class CouponDetail extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: navigation.getParam("title"),
    headerRight: navigation.getParam("headerRight", <View />)
  });
  state = {
    uploading: false,
    mode: "add" || "edit" || "addActivity",
    id: "",
    couponType: "0", // 优惠券类型：0满减劵，1折扣劵
    type: "0", // 类型：0普通优惠券，1活动优惠券
    minimumConsumption: "", // 最低消费金额，对应元，对应coupon_type为0时使用
    discount: "", // 折扣率，0.01到1之间的小数，0.8表示80%，8折销售，对应coupon_type为1
    cutDownMeney: "", // 减少的金额：对应coupon_type为0时使用
    startTime: undefined,
    finishTime: undefined,
    scopeType: "", //	范围类型：0全部产品，1指定分类，2指定商品
    totalCount: "", // 发放数量
    activityId: "", // 活动Id，如果是活动优惠券才有活动id
    productTypeList: [
      // 产品类型分类列表，对应scopeType为1时使用
      // {
      //   id: 156,
      //   shopId: 1,
      //   couponId: 95,
      //   scopeType: 1,
      //   productTypeId: 843,
      //   productId: null,
      //   createTime: "2018-08-28 18:01:30",
      //   productTypeName: "中外名酒",
      //   productName: null
      // }
    ],
    productList: [
      // 产品分类列表，对应scopeType为2时使用
      // {
      //   id: 147,
      //   shopId: 1,
      //   couponId: 94,
      //   scopeType: 2,
      //   productTypeId: null,
      //   productId: 59,
      //   createTime: "2018-08-28 14:16:35",
      //   productTypeName: null,
      //   productName: "啊啊啊"
      // }
    ]
  };
  nameList = [
    "id",
    "couponType",
    "type",
    "minimumConsumption",
    "cutDownMeney",
    "discount",
    "startTime",
    "finishTime",
    "scopeType",
    "totalCount",
    "activityId",
    "productTypeList",
    "productList"
  ];
  formItemRefs = {};
  minDate = new Date();
  maxDate = new Date(new Date().getFullYear() + 2, 12, 30);
  constructor(props) {
    super(props);
    const navigation: any = this.props.navigation;
    this.state.mode = navigation.getParam("mode", "add");
    this.state.couponType = navigation.getParam("couponType", "0");
    this.state.type = navigation.getParam("type", "0");
    let couponTypeName = this.state.couponType == "0" ? "满减券" : "折扣券";
    navigation.setParams({
      title: couponTypeName + (this.state.mode == "add" ? "新增" : "编辑"),
      headerRight:
        this.state.mode == "edit" ? (
          <HeaderButtons>
            <HeaderButtons.ChildButton onPress={this.removeCoupon}>
              <Text style={styles.headerRightText}>删除</Text>
            </HeaderButtons.ChildButton>
          </HeaderButtons>
        ) : (
          <View />
        )
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

  getDetailById = async (id: string) => {
    try {
      Toast.loading("加载中..");
      const response: any = await ActivityService.getActivityCouponDetail(id);
      console.log("getDetailById", response);
      let state = {};
      if (response["couponType"] == "1") {
        // 折扣要*100
        response["discount"] = response["discount"]
          ? response["discount"] * 100
          : undefined;
      }
      Object.keys(response).map((v, i) => {
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
  removeCoupon = () => {
    Modal.alert("删除此活动", "删除后无法恢复", [
      {
        text: "取消",
        onPress: () => {}
      },
      {
        text: "确定",
        onPress: () => {
          Toast.loading("loading..");
          ActivityService.removeActivityCoupon(this.state.id)
            .then(() => {
              this.props.navigation.getParam("fnSuccess", () => {})();
              this.props.navigation.goBack();
              Toast.info("删除成功");
            })
            .catch(error => {
              console.log(error);
              Toast.fail(error.message || error, 2);
            });
        }
      }
    ]);
  };
  selectCouponRange = () => {
    let selectedKeys: Array<string | number> = [];
    switch (this.state.scopeType) {
      case "1":
        selectedKeys = this.state.productTypeList.map(
          v => v.productTypeId || v.id
        );
        break;
      case "2":
        selectedKeys = this.state.productList.map(v => v.productId || v.id);
        break;
    }
    this.props.navigation.navigate("SelectCouponRange", {
      selectedKeys: selectedKeys,
      fnSuccess: ({ scopeType, productTypeList, productList }) => {
        let data: Object = {
          scopeType
        };
        switch (scopeType) {
          case "0":
            break;
          case "1":
            data["productTypeList"] = productTypeList.map((v, i) => {
              return {
                ...v,
                productTypeName: v.name,
                productTypeId: v.id
              };
            });
            data["productList"] = undefined;
            break;
          case "2":
            data["productList"] = productList.map((v, i) => {
              return {
                ...v,
                productName: v.name,
                productId: v.id
              };
            });
            data["productTypeList"] = undefined;
            break;
          default:
            break;
        }
        this.setState(data);
        // console.log(
        //   "selectCouponRange",
        //   scopeType,
        //   productTypeList,
        //   productList
        // );
      }
    });
  };
  submit = async () => {
    let errorMessage: string = "";
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
      if (sendData["couponType"] == "1") {
        sendData["discount"] = parseFloat(sendData["discount"] / 100).toFixed(
          2
        );
      }
      sendData["startTime"] = moment(sendData["startTime"])
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss");
      sendData["finishTime"] = moment(sendData["finishTime"])
        .endOf("day")
        .format("YYYY-MM-DD HH:mm:ss");
      switch (sendData["scopeType"]) {
        case "0":
          delete sendData["productTypeList"];
          delete sendData["productList"];
          break;
        case "1":
          delete sendData["productList"];
          break;
        case "2":
          delete sendData["productTypeList"];
          break;
      }
      console.log("sendData", sendData);
      Toast.loading("提交中..");
      const fnSuccess: Function = this.props.navigation.getParam(
        "fnSuccess",
        () => {}
      );
      if (this.state.mode == "add") {
        succussMsg = "新增成功";
        await ActivityService.addActivityCoupon(sendData);
      } else if (this.state.mode == "edit") {
        succussMsg = "修改成功";
        sendData["id"] = this.props.navigation.getParam("id");
        await ActivityService.editActivityCoupon(sendData);
      } else if (this.state.mode == "addActivity") {
        Toast.hide();
        fnSuccess(sendData);
        this.props.navigation.goBack();
        return;
      }
      fnSuccess();
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
    const isActivity: boolean = this.state.mode == "addActivity";
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <List>
          <FormItem
            ref={ref => {
              this.formItemRefs["minimumConsumption"] = ref;
            }}
            value={this.state.minimumConsumption}
            required={true}
            message="请填写最低消费金额"
          >
            <InputItem
              maxLength={20}
              clear
              placeholder="点击设置"
              placeholderTextColor="#999999"
              styles={inputItemStyle}
              value={this.state.minimumConsumption}
              type="number"
              onChange={minimumConsumption =>
                this.setState({
                  minimumConsumption
                })
              }
              onBlur={minimumConsumption => {
                this.setState({
                  minimumConsumption: this.onBlurChangeNumber(
                    minimumConsumption
                  )
                });
              }}
            >
              满额(元)
            </InputItem>
          </FormItem>
          {this.state.couponType == "0" ? (
            <FormItem
              ref={ref => {
                this.formItemRefs["cutDownMeney"] = ref;
              }}
              value={this.state.cutDownMeney}
              required={true}
              message="请填写减少的金额"
            >
              <InputItem
                maxLength={6}
                clear
                placeholder="点击设置"
                placeholderTextColor="#999999"
                styles={inputItemStyle}
                value={this.state.cutDownMeney}
                type="number"
                onChange={cutDownMeney =>
                  this.setState({
                    cutDownMeney
                  })
                }
                onBlur={cutDownMeney => {
                  this.setState({
                    cutDownMeney: this.onBlurChangeNumber(cutDownMeney)
                  });
                }}
              >
                立减(元)
              </InputItem>
            </FormItem>
          ) : (
            <FormItem
              ref={ref => {
                this.formItemRefs["discount"] = ref;
              }}
              value={this.state.discount}
              required={true}
              message="请填写减少的金额"
            >
              <InputItem
                maxLength={2}
                clear
                placeholder="如: 打9折就输入90"
                placeholderTextColor="#999999"
                styles={inputItemStyle}
                value={this.state.discount}
                type="number"
                onChange={discount =>
                  this.setState({
                    discount
                  })
                }
                onBlur={discount => {
                  this.setState({
                    discount: this.onBlurChangeNumber(discount, true)
                  });
                }}
              >
                折扣
              </InputItem>
            </FormItem>
          )}
        </List>
        <View style={styles.marginBox} />
        {!isActivity && (
          <List>
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
        )}
        {!isActivity && <View style={styles.marginBox} />}
        <List>
          <FormItem
            ref={ref => {
              this.formItemRefs["scopeType"] = ref;
            }}
            value={this.state.scopeType}
            required={true}
            message="请选择优惠范围"
          >
            <List.Item
              styles={listItemStyle}
              arrow="horizontal"
              extra={dictionaryStore.couponScopeTypes.reduce((pre, next) => {
                if (next.value == this.state.scopeType) {
                  pre = next.label;
                }
                return pre;
              }, "点击设置")}
              onClick={this.selectCouponRange}
            >
              优惠范围
            </List.Item>
          </FormItem>
          {!isActivity && (
            <FormItem
              ref={ref => {
                this.formItemRefs["totalCount"] = ref;
              }}
              value={this.state.totalCount}
              required={true}
              message="请设置发放数量"
            >
              <InputItem
                maxLength={20}
                clear
                placeholder="点击设置"
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

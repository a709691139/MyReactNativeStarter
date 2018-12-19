import React from "react";
import { ToastAndroid } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

import { createStackNavigator, NavigationActions } from "react-navigation";
import StackViewStyleInterpolator from "react-navigation/src/views/StackView/StackViewStyleInterpolator";

import Ionicons from "react-native-vector-icons/Ionicons";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;

import WebView from "./WebView";
import Login from "./Login";
// import Regis from './Login/Regis';
import Home from "./Home";
// import TabBar from "./TabBar";
import Qualification from "./Qualification";
import QualificationStatusDetail from "./Qualification/StatusDetail";

import My from "./My";
import MyMessages from "./My/Messages";
import MemberCenter from "./My/MemberCenter";

import Wallet from "./My/Wallet";
import WalletBalanceList from "./My/Wallet/BalanceList";
import WalletBalanceDetail from "./My/Wallet/BalanceList/Detail";
import WalletWithdrawCash from "./My/Wallet/WithdrawCash";
import WalletWithdrawCashDetail from "./My/Wallet/WithdrawCash/Detail";

import BankCard from "./My/BankCard";
import BankCardDetail from "./My/BankCard/Detail";

import Setting from "./Setting";
import SettingSuggest from "./Setting/Suggest";
import SettingAddSuggest from "./Setting/Suggest/AddSuggest";
import SettingEditAddress from "./Setting/EditAddress";
import SettingSelectLocation from "./Setting/SelectLocation";
import SettingAgreement from "./Setting/Agreement";
import SettingWeChatQrcode from "./Setting/WeChatQrcode";
import SettingAboutus from "./Setting/AboutUs";
import SettingChangePassword from "./Setting/ChangePassword";

import PurchaseGoods from "./PurchaseGoods";

import Orders from "./Orders";
import OrderDetail from "./Orders/OrderDetail";
import SearchOrders from "./Orders/SearchOrders";

import AddDelivery from "./Orders/Delivery/AddDelivery";
import DeliveryDetail from "./Orders/Delivery/DeliveryDetail";

import Goods from "./Goods";
import GoodDetail from "./Goods/GoodDetail";
import MultiEditGoods from "./Goods/MultiEditGoods";
import SelectGoods from "./Goods/SelectGoods";

import GoodsProvider from "./GoodsProvider";
import GoodsProviderDetail from "./GoodsProvider/GoodsProviderDetail";

import GoodsType from "./GoodsType";
import GoodsTypeDetail from "./GoodsType/GoodsTypeDetail";
import SelectGoodTypes from "./GoodsType/SelectGoodTypes";

import ActivityRelease from "./ActivityCenter/ActivityRelease";
import ActivityReleaseDetail from "./ActivityCenter/ActivityRelease/Detail";

import ActivityPointsExchangeGifts from "./ActivityCenter/ActivityPoints/ExchangeGifts";
import ActivityPointsExchangeGiftsDetail from "./ActivityCenter/ActivityPoints/ExchangeGifts/Detail";
import ActivityPointsRule from "./ActivityCenter/ActivityPoints/Rule";

import Coupons from "./ActivityCenter/Coupons";
import CouponDetail from "./ActivityCenter/Coupons/Detail";
import SelectCouponRange from "./ActivityCenter/Coupons/SelectCouponRange";
import SelectCouponType from "./ActivityCenter/Coupons/SelectCouponType";

import Journal from "./Journal";
import Advertisements from "./Advertisements";
import ExpressQuery from "./ExpressQuery";

// 默认红色主题头部
export const redThemeNavigationOptions = {
  gesturesEnabled: true,
  headerTitleStyle: {
    fontSize: 30 * EStyleSheet.value("$scale"),
    color: "white",
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "normal"
  },
  headerStyle: {
    backgroundColor: MAIN_COLOR
  },
  headerTintColor: "#fff",
  headerBackImage: (
    <Ionicons
      name="ios-arrow-back"
      size={40 * EStyleSheet.value("$scale")}
      color="#fff"
      style={{ marginHorizontal: 30 * EStyleSheet.value("$scale") }}
    />
  ),
  headerBackTitle: null
};
// 白色主题头部
export const whiteThemeNavigationOptions = {
  ...redThemeNavigationOptions,
  headerTitleStyle: {
    ...redThemeNavigationOptions.headerTitleStyle,
    color: "#333333"
  },
  headerStyle: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#E5E5E5"
  },
  headerTintColor: "#333333",
  headerBackImage: (
    <Ionicons
      name="ios-arrow-back"
      size={40 * EStyleSheet.value("$scale")}
      color="#333333"
      style={{ marginHorizontal: 30 * EStyleSheet.value("$scale") }}
    />
  )
};

const AppNavigator = createStackNavigator(
  {
    Home: {
      title: "首页",
      screen: Home
    },
    // TabBar: {
    //   screen: TabBar,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    WebView: {
      screen: WebView
    },
    Login: {
      title: "登录",
      screen: Login
    },
    // Regis:{
    //     screen:Regis,
    // },

    Qualification: {
      title: "资格审核",
      screen: Qualification
    },
    QualificationStatusDetail: {
      screen: QualificationStatusDetail
    },

    MyMessages: {
      title: "我的消息",
      screen: MyMessages
    },

    My: {
      title: "个人中心",
      screen: My
    },

    MemberCenter: {
      title: "会员中心",
      screen: MemberCenter
    },

    Wallet: {
      title: "钱包",
      screen: Wallet
    },
    WalletBalanceList: {
      title: "钱包余额列表",
      screen: WalletBalanceList
    },
    WalletBalanceDetail: {
      title: "钱包余额详情",
      screen: WalletBalanceDetail
    },
    WalletWithdrawCash: {
      title: "提现",
      screen: WalletWithdrawCash
    },
    WalletWithdrawCashDetail: {
      title: "提现详情|新增|编辑",
      screen: WalletWithdrawCashDetail
    },

    BankCard: {
      title: "银行卡",
      screen: BankCard
    },
    BankCardDetail: {
      title: "银行卡详情",
      screen: BankCardDetail
    },

    Setting: {
      title: "设置",
      screen: Setting
    },
    SettingSuggest: {
      title: "建议反馈",
      screen: SettingSuggest
    },
    SettingAddSuggest: {
      title: "建议反馈新增",
      screen: SettingAddSuggest
    },
    SettingEditAddress: {
      title: "编辑地址",
      screen: SettingEditAddress
    },
    SettingSelectLocation: {
      title: "选择定位",
      screen: SettingSelectLocation
    },
    SettingAgreement: {
      title: "用户协议",
      screen: SettingAgreement
    },
    SettingWeChatQrcode: {
      title: "微信二维码",
      screen: SettingWeChatQrcode
    },
    SettingAboutus: {
      title: "关于我们",
      screen: SettingAboutus
    },
    SettingChangePassword: {
      title: "修改密码",
      screen: SettingChangePassword
    },

    PurchaseGoods: {
      title: "入货",
      screen: PurchaseGoods
    },

    Orders: {
      title: "订单",
      screen: Orders
    },
    OrderDetail: {
      title: "订单详情",
      screen: OrderDetail
    },
    SearchOrders: {
      title: "订单搜索",
      screen: SearchOrders
    },

    DeliveryDetail: {
      title: "跑腿配送详情",
      screen: DeliveryDetail
    },
    AddDelivery: {
      title: "新增跑腿订单配送",
      screen: AddDelivery
    },

    Goods: {
      title: "货物",
      screen: Goods
    },
    GoodDetail: {
      title: "货物详情",
      screen: GoodDetail
    },
    MultiEditGoods: {
      title: "货物多选编辑",
      screen: MultiEditGoods
    },
    SelectGoods: {
      title: "选择货物",
      screen: SelectGoods
    },

    GoodsProvider: {
      title: "货物供应商",
      screen: GoodsProvider
    },
    GoodsProviderDetail: {
      title: "货物供应商详情",
      screen: GoodsProviderDetail
    },
    SelectGoodTypes: {
      title: "选择货物供应商",
      screen: SelectGoodTypes
    },

    GoodsType: {
      title: "货物类型",
      screen: GoodsType
    },
    GoodsTypeDetail: {
      title: "货物类型详情|新增|编辑",
      screen: GoodsTypeDetail
    },

    ActivityRelease: {
      title: "活动投放",
      screen: ActivityRelease
    },
    ActivityReleaseDetail: {
      title: "活动投放详情|新增|编辑",
      screen: ActivityReleaseDetail
    },

    ActivityPointsExchangeGifts: {
      title: "积分换礼",
      screen: ActivityPointsExchangeGifts
    },
    ActivityPointsExchangeGiftsDetail: {
      title: "积分换礼详情|新增|编辑",
      screen: ActivityPointsExchangeGiftsDetail
    },
    ActivityPointsRule: {
      title: "积分规则",
      screen: ActivityPointsRule
    },

    Coupons: {
      title: "优惠券", // 内含折扣券+满减券
      screen: Coupons
    },
    CouponDetail: {
      title: "优惠券详情|新增|编辑",
      screen: CouponDetail
    },
    SelectCouponRange: {
      title: "选择优惠范围",
      screen: SelectCouponRange
    },
    SelectCouponType: {
      title: "选择优惠券类型",
      screen: SelectCouponType
    },

    Journal: {
      title: "流水",
      screen: Journal
    },
    Advertisements: {
      title: "广告",
      screen: Advertisements
    },
    ExpressQuery: {
      title: "快递查询",
      screen: ExpressQuery
    }
  },
  {
    initialRouteName: "Login",
    headerMode: "screen",
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal
    }),
    // paths: {
    //   Login: "Login",
    //   Setting: "Setting"
    // },
    // https://reactnavigation.org/docs/en/stack-navigator.html
    navigationOptions: redThemeNavigationOptions
  }
);

/**
 * 处理安卓返回键
 */
let lastBackPressed = Date.now();
const defaultStateAction = AppNavigator.router.getStateForAction;
AppNavigator.router.getStateForAction = (action, state) => {
  if (
    state &&
    action.type === NavigationActions.BACK &&
    state.routes.length === 1
  ) {
    // console.log(
    //   lastBackPressed,
    //   lastBackPressed + 2000,
    //   Date.now(),
    //   lastBackPressed + 2000 < Date.now()
    // );
    if (lastBackPressed + 2000 < Date.now()) {
      ToastAndroid.show("再按一次退出程序", ToastAndroid.SHORT);
      lastBackPressed = Date.now();
      const routes = [...state.routes];
      return {
        ...state,
        ...state.routes,
        index: routes.length - 1
      };
    }
  }
  return defaultStateAction(action, state);
};

export default AppNavigator;

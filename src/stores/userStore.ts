import { observable, computed, observe, action, transaction, toJS } from "mobx";
import LocalService from "services/LocalService";
import pushNotificationStore from "stores/pushNotificationStore";
import UserService from "services/UserService";
import dictionaryStore from "stores/dictionaryStore";
import NavigationUtils from "utils/NavigationUtils";
import { Toast, Modal } from "antd-mobile-rn";
import shopStore from "stores/shopStore";
import goodsStore from "stores/goodsStore";

// 请使用 shopStore里面的数据管理该app
class UserStore {
  stateNameList = [
    "id",
    "token",
    "logined",
    "validatePhone",
    "loginName",
    "nickName",
    "status",
    "userCode",
    "userType",
    "shopName",
    "shopId",
    "shopImgUrl",
    "picUrl"
  ];
  constructor() {}
  registrationId: string = null; // 推送通知id
  @observable
  logined: boolean = false;
  id: string = "";
  token: string = "";
  @observable
  loginName: string = "";
  @observable
  nickName: string = "";
  @observable
  validatePhone: string = "";

  shopId: string = "";
  @observable
  shopName: string = "";
  @observable
  shopImgUrl: string = "";
  @observable
  status: string = ""; // 用户状态，0是无效，1是有效
  userType: string = ""; // 用户类型：0超级管理员

  @action
  changeDataObj = (data = {}) => {
    for (let i in data) {
      this[i] = data[i];
    }
    this.saveSessionStorage();
  };

  //保存 登录状态 到 session
  @action
  saveSessionStorage = () => {
    let userData = {
      token: this.token
    };
    LocalService.saveUserData(userData);
  };
  //获取 登录状态 session
  @action
  getSessionStorage = () => {
    return LocalService.getUserData().then(response => {
      if (response) {
        if (response.token) {
          this.token = response.token;
          return true;
        }
      }
      return false;
    });
  };
  //清除 登录状态 session
  @action
  cleanSessionStorage = () => {
    LocalService.saveUserData(null);
  };
  //清除所有登录数据
  @action
  cleanAllData = () => {
    console.log("cleanAllData");
    for (let name in this.stateNameList) {
      this[name] = null;
    }
    this.registrationId = null;
    pushNotificationStore.clearAllNotifications();
    this.cleanSessionStorage();
  };

  @action
  asyncInit = async () => {
    //判断是否有登录状态session
    try {
      const logined = await this.getSessionStorage();
      if (logined) {
        this.logined = logined;
        Toast.loading("登录中..", 0);
        const userDetail = await UserService.getUserDetailData();
        console.log("登录成功", userDetail);
        userDetail.token = userStore.token;
        await this.asyncLoginSuccess(userDetail);
      }
    } catch (error) {
      userStore.logoutSuccess(true);
      NavigationUtils.resetTo("Login");
      Toast.hide();
      console.log(error);
      Toast.info(error.message || error);
    }
  };
  @action
  asyncLogin = async (
    telNum: string,
    answer: string,
    registrationId?: string,
    isPassword?: boolean
  ) => {
    try {
      Toast.loading("登录中..", 0);
      let promise = isPassword ? UserService.passwordLogin : UserService.login;
      const userDetail = await promise(telNum, answer, registrationId);
      console.log("登录成功", userDetail);
      await this.asyncLoginSuccess(userDetail);
    } catch (error) {
      console.log(error);
      this.logoutSuccess(false);
      throw error;
    }
  };
  // 登录成功
  @action
  asyncLoginSuccess = async data => {
    this.changeDataObj(data);
    this.logined = true;
    this.token = data.token;
    this.saveSessionStorage();
    // 获取数据字典
    const getDictionary: Promise<any> = dictionaryStore.getData();
    // 获取店铺资料
    const getShopInfo: Promise<any> = shopStore.getData();
    await Promise.all([getDictionary, getShopInfo]);
    NavigationUtils.resetTo("Home");
    Toast.hide();
    Toast.success("登录成功", 1);
  };

  // 注销
  @action
  asyncLogout = async () => {
    Toast.loading("正在退出");
    try {
      const response = await UserService.logout();
      console.log("注销", response);
      this.logoutSuccess(true);
      Toast.success("注销成功", 1);
    } catch (error) {
      console.log(error);
      this.logoutSuccess(true);
      Toast.info(error.message || error);
      throw error;
    }
  };
  // 注销成功
  @action
  logoutSuccess = (autoLogin?: boolean) => {
    this.logined = false;
    this.cleanAllData();
    if (autoLogin) {
      shopStore.resetData();
      goodsStore.resetData();
      NavigationUtils.resetTo("Login");
    }
  };
}
const userStore = new UserStore();
export default userStore;

//用户相关api
//登录 ，注销，

import {
  hadRootUrlJsonPost,
  hadRootUrlFormPost,
  hadRootUrlFormGet
} from "services/commonFn";

export default class UserService {
  constructor() {}

  // 发送手机验证码
  static sendPhoneCode(mobile: string) {
    let url = "/common/sms/sendSmsCode";
    let sendData = { mobile };
    return hadRootUrlFormGet(url, sendData);
  }

  // 验证码登录
  static login(telNum: string, code: string, registrationId?: string) {
    let url = "/seller/sellerUser/appLogin";
    let sendData = { telNum, code, registrationId };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
            "userKind": 1,
            "id": 28,
            "userCode": "S00000030",
            "shopId": 66,
            "nickName": null,
            "loginName": null,
            "password": null,
            "validatePhone": "15992690565",
            "userType": 1,
            "status": 1,
            "createTime": "2018-07-30 15:28:14",
            "openId": null,
            "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyOCIsIlVzZXJJZCI6MjgsImV4cCI6MTUzNTA4MDcwNywiVXNlclR5cGUiOjEsImlhdCI6MTUzNDk5NDMwNywianRpIjoiYzM1MDAxNWYtYjQ2Yi00YmQxLTlmYmQtZjNkYjc4NWUwNTVlIn0.5bYG5uQZ7GsIJlii05f9L0ahj68m4B-JXYuWt3PRhzrZI3EHXzI9md3NBdQTspyp4730WGVeNVAzqfjiaiIV7w",
            "shopImgUrl": "/upload/oaFile/2018/08/15/fd486940-1d76-4fd7-886f-159aa8f24e4f.jpg",
            "shopName": "大大大大得得得得1222",
            "picUrl": null,
            "isSellerExist": 1
        });
      }, 1500);
    }); */
    return hadRootUrlFormPost(url, sendData);
  }
  // 密码登录
  static passwordLogin(
    telNum: string,
    password: string,
    registrationId?: string
  ) {
    let url = "/seller/sellerUser/appLogin";
    let sendData = { telNum, password, registrationId };
    return hadRootUrlFormPost(url, sendData);
  }

  // 注销
  static logout() {
    let url = "/seller/sellerUser/appLogout";
    let sendData = {};
    return hadRootUrlJsonPost(url, sendData);
  }

  // 修改密码
  static changePassword(oldPassword: string, newPassword: string) {
    let url = "/seller/sellerUser/updatePwd";
    let sendData = { oldPassword, newPassword };
    return hadRootUrlFormPost(url, sendData);
  }

  // 获取 用户基本资料
  static getUserDetailData() {
    let url = "/seller/sellerUser/getCurrentUser";
    let sendData = {
      timeout: 5000
    };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          userKind: 0,
          id: 2,
          userCode: "S00000002",
          shopId: 1,
          nickName: "string",
          loginName: "string",
          password: "string",
          validatePhone: "13811111111",
          userType: 0,
          status: 1,
          createTime: "2018-07-10 14:26:09",
          openId: null,
          token: null,
          shopImgUrl: null,
          shopName: null,
          picUrl: null
        });
      }, 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }

  // 获取 消息列表
  static getMessages(data) {
    let url = "/seller/appMessageInfo/getPageInfo";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
            "id": 62,
            "showMessage": "您于Wed Aug 15 16:24:27 CST 2018提出的提现50元的申请被驳回，原因:test",
            "title": "提现失败",
            "messageType": "drawDepositFail",
            "sendStatus": 1,
            "remark": null,
            "createTime": "2018-08-22 15:04:59",
            "shopId": 1,
            "userId": 118,
            "clientId": "",
            "readStatus": 0,
            "validStatus": 1,
            "returnStatusCode": null,
            "returnMsgId": null,
            "returnSendNo": null,
            "returnErrorMessage": null,
            "returnErrorCode": null,
            "extendData": null
        });
      }, 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
  // 清空 消息列表
  static cleanMessages() {
    let url = "/seller/appMessageInfo/emptyAll";
    let sendData = {};
    return hadRootUrlJsonPost(url, sendData);
  }
}

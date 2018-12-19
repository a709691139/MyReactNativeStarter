// 店铺

import {
  hadRootUrlJsonPost,
  hadRootUrlFormPost,
  hadRootUrlFormGet
} from "services/commonFn";

export default class ShopService {
  constructor() {}

  // 获取商店资料
  static getShopInfo() {
    let url = "/seller/shopInfo/getShopInfo";
    let sendData = {
      timeout: 5000
    };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
            "id": 66,
            "name": "大大大大得得得得1222",
            "validatePhone": "15992690565",
            "contactPhone": "15992690565",
            "contactName": null,
            "address": "广东省江门市江海区礼新路文昌花园74幢(文昌花园东门附近) 文昌花园-74幢",
            "longitude": 113.0883300000,
            "latitude": 22.5638220000,
            "status": 1,
            "remark": null,
            "notice": "2万色发送到发斯蒂芬222222333333333333333334444444444444666666666677777777",
            "minimumDeliveryAmount": 6.00,
            "imgUrl": "/upload/oaFile/2018/08/15/fd486940-1d76-4fd7-886f-159aa8f24e4f.jpg",
            "createTime": "2018-07-30 15:28:14",
            "createUser": null,
            "lastUpdateTime": "2018-07-30 15:28:14",
            "lastUpdateUser": null,
            "businessHours": null,
            "freight": null,
            "industryId": 1,
            "businessLicenceImage": null,
            "idCardFrontImage": null,
            "idCardBackImage": null,
            "checkStatus": null,
            "checkPassTime": null,
            "weixinQrcode": "/upload/oaFile/2018/08/01/5fb2c975-7107-4bbf-acc3-f73ae85957ba.png",
            "oneselfIdCardImage": null,
            "legalPersonName": null,
            "idCardNum": null,
            "couponList": null,
            "distance": null,
            "member": false,
            "inBlackList": false,
            "signIn": false,
            "collected": false,
            "openRewardsPoints": false
        });
      }, 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }

  // 修改店铺资料
  static changeShopInfo(data) {
    /* let obj = {
      address: "string",
      contactName: "string",
      contactPhone: "string",
      createTime: "2018-07-20T01:59:36.132Z",
      createUser: "string",
      distance: 0,
      id: 0,
      imgUrl: "string",
      lastUpdateTime: "2018-07-20T01:59:36.132Z",
      lastUpdateUser: "string",
      latitude: 0,
      longitude: 0,
      minimumDeliveryAmount: 0,
      name: "string",
      notice: "string",
      remark: "string",
      status: 0,
      validatePhone: "string"
    }; */
    let url = "/seller/shopInfo/update";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }

  // 获取 建议反馈列表
  static getMySuggestList(data) {
    let url = "/seller/feedback/getMyFeedbackList";
    let sendData = data;
    return hadRootUrlFormGet(url, sendData);
  }
  // 新增 建议反馈
  static addMySuggestList(data) {
    let url = "/seller/feedback/add";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: 5,
            userType: 1,
            userId: 2,
            feedbackDesc: "新增简易1",
            feedbackTime: "2018-07-23 10:29:40",
            replyDesc: null,
            replyTime: null,
            status: 0,
            feedbackStart: null,
            feedbackEnd: null,
            replyStart: null,
            replyEnd: null
          }
        ]);
      }, 1500);
    }); */
    return hadRootUrlJsonPost(url, sendData);
  }

  // 获取 流水账单列表
  static getJournalList(data) {
    let url = "/seller/payLog/getPageInfo";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 1,
          list: [
            {
              id: 1,
              orderId: 6,
              orderCode: "P20180712115807630001",
              payCode: "M00000001",
              shopId: 1,
              buyerUserId: 1,
              money: 13,
              remark: null,
              createTime: "2018-07-13 11:21:09",
              payType: 0,
              startTime: null,
              endTime: null
            }
          ]
        });
      }, 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
  // 获取 流水账单-总数目
  static getJournalTotal() {
    let url = "/seller/payLog/getTotal";
    let sendData = {};
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 1,
          list: [
            {
              id: 1,
              orderId: 6,
              orderCode: "P20180712115807630001",
              payCode: "M00000001",
              shopId: 1,
              buyerUserId: 1,
              money: 13,
              remark: null,
              createTime: "2018-07-13 11:21:09",
              payType: 0,
              startTime: null,
              endTime: null
            }
          ]
        });
      }, 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }

  // 获取 首页-当日销售额
  static getSalesAmount() {
    let url = "/seller/sellerCount/getShopSaleAmount";
    let sendData = {};
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          daySaleAmount: "1000.4169",
          monthSaleAmount: "10002323.4169",
          monthProfit: "103.4169"
        });
      }, 500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }

  // 获取 店铺类型服务行业列表
  static getShopTypes() {
    let url = "/seller/industry/getPageInfo";
    let sendData = {};
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 1,
          list: [
            {
              id: 1,
              name: "便利店",
              logoUrl: null,
              createTime: "2018-08-01 11:49:44"
            }
          ]
        });
      }, 500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }

  // 获取 资格审核资料
  static getShopCheck() {
    let url = "/seller/shopCheck/getLatestShopCheck";
    let sendData = {};
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
            "id": 1,
            "shopId": 1,
            "industryId": 4,
            "businessLicenceImage": "/upload/oaFile/2018/08/24/e6bf6b71-2353-40af-b28c-2d8a73003046.jpg",
            "submitCheckTime": null,
            "checkStatus": 1,
            "checkFailureReason": "33",
            "checkSysUser": null,
            "checkTime": "2018-08-27 14:02:17",
            "legalPersonName": "陈大文",
            "shopName": "陈大文便利店",
            "address": "万达",
            "longitude": 113.0809480000,
            "latitude": 22.6001950000,
            "legalPersonPhone": "13632064154",
            "doorheadImageUrl": "/upload/oaFile/2018/08/24/63cde099-d691-4ec7-b344-aa697706ad2e.jpg",
            "indoorImageUrl": "/upload/oaFile/2018/08/24/9f22d8a0-4b68-4d69-858e-31121d8110e0.jpg",
            "setupAlready": true
        });
      }, 500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
  // 提交 资格审核资料
  static addShopCheck(data) {
    let url = "/seller/shopCheck/add";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }
  // 修改 资格审核资料
  static updateShopCheck(data) {
    let url = "/seller/shopCheck/update";
    let sendData = data;
    return hadRootUrlFormPost(url, sendData);
  }

  // 获取 本店会员列表
  static getShopBuyerMembers(data) {
    let url = "/seller/buyerUserMember/getPageInfo";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 1,
          list: [
            {
              id: 34,
              shopId: 1,
              buyerUserId: 3,
              productCollectionCount: 1,
              shareTotalCount: 0,
              clickProductDetailCount: 35,
              consumeTotalCount: 3,
              consumeTotalPrice: 0.0,
              inBlacklist: 0,
              payPoints: 0,
              rewardPoints: 50,
              lastSignInDate: null,
              remark: null,
              createTime: "2018-08-24 15:19:07",
              shopName: "2333",
              buyerName: "罗皓",
              logoImgUrl:
                "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLjSFNAonBkMotKyFYsicYicvDoicicydDpPIa1ibs6Btr1DF74XNBM4hQYnJQfia9VjwVePMIQlbwI9mug/132",
              shopImgUrl:
                "/upload/oaFile/2018/08/28/7b7087e0-f7da-4603-9409-79801970764f.jpg",
              wechatName: "罗皓"
            }
          ]
        });
      }, 500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
  // 修改 本店会员资料byId
  static updateBuyerMember(data) {
    let url = "/seller/buyerUserMember/update";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }
}

// 活动

import {
  hadRootUrlJsonPost,
  hadRootUrlFormPost,
  hadRootUrlFormGet,
  hadRootUrlFormQueryPost
} from "services/commonFn";

export default class ActivityService {
  constructor() {}

  // 获取 活动列表
  static getActivityReleaseRows(data) {
    let url = "/seller/shopActivity/getPageInfo";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {
            total:1,
            list:[{
                "id": 48,
                "shopId": 1,
                "activityName": "tess",
                "activitySubName": "tess",
                "startTime": "2018-09-03 00:00:00",
                "finishTime": "2018-09-05 23:59:59",
                "popType": 0,
                "status": 1,
                "activityStatus": 1,
                "imgUrl": "/upload/oaFile/2018/09/04/50ee0b37-5b11-4bcb-9a5c-b15fa214bdec.jpg",
                "createTime": "2018-09-04 17:53:43",
                "totalCount": -1,
                "setOutCount": 1,
                "couponCount": 0,
                "firstCouponName": null,
                "secondCouponName": null,
                "couponList": null
            }]
          }
        , 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
  // 获取 活动详情byId
  static getActivityReleaseDetail(shopActivityId: string) {
    let url = "/seller/shopActivity/getShopActivityById";
    let sendData = { shopActivityId };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {
              "id": 48,
              "shopId": 1,
              "activityName": "tess",
              "activitySubName": "tess",
              "startTime": "2018-09-03 00:00:00",
              "finishTime": "2018-09-05 23:59:59",
              "popType": 0,
              "status": 1,
              "activityStatus": 1,
              "imgUrl": "/upload/oaFile/2018/09/04/50ee0b37-5b11-4bcb-9a5c-b15fa214bdec.jpg",
              "createTime": "2018-09-04 17:53:43",
              "totalCount": -1,
              "setOutCount": 1,
              "couponCount": 0,
              "firstCouponName": "满95元8折",
              "secondCouponName": null,
              "couponList": [{
                  "id": 120,
                  "shopId": 1,
                  "couponType": 1,
                  "couponName": "满95元8折",
                  "minimumConsumption": 95.00,
                  "cutDownMeney": null,
                  "discount": 0.80,
                  "startTime": "2018-09-03 00:00:00",
                  "finishTime": "2018-09-05 23:59:59",
                  "totalCount": 3,
                  "setOutCount": 1,
                  "type": 1,
                  "activityId": 48,
                  "status": 1,
                  "scopeType": 0,
                  "createTime": "2018-09-04 17:53:43",
                  "productTypeList": null,
                  "productList": null,
                  "operationType": null,
                  "hadReceive": null
              }]
          }
        , 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
  // 新增 活动
  static addActivityRelease(data) {
    let url = "/seller/shopActivity/add";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }
  // 编辑 活动
  static editActivityRelease(data) {
    // 修改时需要把优惠券也放进couponList中，优惠券中属性operationType必须设置值，0新增，1修改，2删除，其他(包括null)是没修改
    let url = "/seller/shopActivity/update";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }
  // 删除 活动
  static removeActivityRelease(shopActivityId: string) {
    let url = "/seller/shopActivity/deleteById";
    let sendData = { shopActivityId };
    return hadRootUrlFormPost(url, sendData);
  }
  // 开启|关闭 活动
  static toggleActivityReleas(shopActivityId: string, status: string) {
    // status:0关闭,1开启
    let url = "/seller/shopActivity/changeStatus";
    let sendData = {
      shopActivityId,
      status
    };
    return hadRootUrlFormPost(url, sendData);
  }

  // 获取 积分换礼列表
  static getExchangeGifts(data) {
    let url = "/seller/shopGift/getPageInfo";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {
            total:1,
            list:[{
                "id": 6,
                "shopId": 1,
                "giftName": "阿迪达斯",
                "usePoints": 10000,
                "totalCount": 1,
                "hadGetCount": 0,
                "setOutCount": 0,
                "startTime": "2018-08-15 00:00:00",
                "finishTime": "2018-08-24 23:59:59",
                "createTime": "2018-08-22 16:00:16",
                "canEdit": false
            }]
          }
        , 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
  // 获取 积分换礼详情byId
  static getExchangeGiftDetail(shopGiftId: string) {
    let url = "/seller/shopGift/getShopGiftById";
    let sendData = { shopGiftId };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
         {
            "id": 6,
            "shopId": 1,
            "giftName": "阿迪达斯",
            "usePoints": 10000,
            "totalCount": 1,
            "hadGetCount": 0,
            "setOutCount": 0,
            "startTime": "2018-08-15 00:00:00",
            "finishTime": "2018-08-24 23:59:59",
            "createTime": "2018-08-22 16:00:16",
            "canEdit": null
          }
        , 1500);
    }); */
    return hadRootUrlFormPost(url, sendData);
  }
  // 新增 积分换礼
  static addExchangeGift(data) {
    let url = "/seller/shopGift/add";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }
  // 编辑 积分换礼
  static editExchangeGift(data) {
    let url = "/seller/shopGift/update";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }
  // 删除 积分换礼
  static removeExchangeGift(shopGiftId: string) {
    let url = "/seller/shopGift/deleteById";
    let sendData = { shopGiftId };
    return hadRootUrlFormPost(url, sendData);
  }

  // 获取 积分规则
  static getActivityPointRule() {
    let url = "/seller/shopConfig/getShopConfigByShopId";
    let sendData = {};
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
         {
              "id": 1,
              "shopId": 1,
              "payPointsStatus": 1,
              "rewardPointsStatus": 1,
              "rewardMemberPoints": 50,
              "rewardSharePoints": 200,
              "rewardShareMaxPoints": 200,
              "moneyToPointsType": 2,
              "pointsToMoneyType": 1,
              "createTime": "2018-08-20 09:33:16",
              "createUser": null,
              "lastUpdateTime": "2018-08-20 09:33:20",
              "lastUpdateUser": null,
              "rewardSignInPoints": 100
          }
        , 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
  // 修改 积分规则
  static editActivityPointRule(data) {
    let url = "/seller/shopConfig/update";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }

  // 获取 优惠券列表
  static getActivityCoupons(data) {
    let url = "/seller/shopCoupon/getPageInfo";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {
            total:1,
            list:[{
                "id": 132,
                "shopId": 1,
                "couponType": 0,
                "couponName": "满1000元减100元",
                "minimumConsumption": 1000.00,
                "cutDownMeney": 100.00,
                "discount": null,
                "startTime": "2018-09-22 00:00:00",
                "finishTime": "2018-09-30 23:59:59",
                "totalCount": 100,
                "setOutCount": 0,
                "type": 1,
                "activityId": 56,
                "status": 0,
                "scopeType": 0,
                "createTime": "2018-09-06 09:48:35",
                "productTypeList": null,
                "productList": null,
                "operationType": null,
                "hadReceive": null
            }]
          }
        , 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
  // 获取 优惠券详情byId
  static getActivityCouponDetail(shopCouponId: string) {
    let url = "/seller/shopCoupon/getDetailById";
    let sendData = { shopCouponId };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {
              "id": 131,
              "shopId": 1,
              "couponType": 0,
              "couponName": "满100元减10元",
              "minimumConsumption": 100.00,
              "cutDownMeney": 10.00,
              "discount": null,
              "startTime": "2018-09-08 00:00:00",
              "finishTime": "2018-09-30 23:59:59",
              "totalCount": 100,
              "setOutCount": 0,
              "type": 1,
              "activityId": 55,
              "status": 0,
              "scopeType": 0,
              "createTime": "2018-09-06 09:43:32",
              "productTypeList": [{
                  "id": 156,
                  "shopId": 1,
                  "couponId": 95,
                  "scopeType": 1,
                  "productTypeId": 843,
                  "productId": null,
                  "createTime": "2018-08-28 18:01:30",
                  "productTypeName": "中外名酒",
                  "productName": null
              }],
              "productList": [{
                  "id": 147,
                  "shopId": 1,
                  "couponId": 94,
                  "scopeType": 2,
                  "productTypeId": null,
                  "productId": 59,
                  "createTime": "2018-08-28 14:16:35",
                  "productTypeName": null,
                  "productName": "啊啊啊"
              }],
              "operationType": null,
              "hadReceive": null
          }
        , 1500);
    }); */
    return hadRootUrlFormPost(url, sendData);
  }
  // 新增 优惠券
  static addActivityCoupon(data) {
    let url = "/seller/shopCoupon/add";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }
  // 编辑 优惠券
  static editActivityCoupon(data) {
    let url = "/seller/shopCoupon/update";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }
  // 删除 优惠券
  static removeActivityCoupon(shopCouponId: string) {
    let url = "/seller/shopCoupon/deleteById";
    let sendData = { shopCouponId };
    return hadRootUrlFormPost(url, sendData);
  }

  // 根据二维码换取礼品
  static takeGift(giftExchangeCode: string) {
    let url = "/seller/shopGift/takeGift";
    let sendData = { giftExchangeCode };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {
              "id": 16,
              "giftExchangeCode": "GEX2018091210154280200011",
              "memberId": 27,
              "shopId": 1,
              "buyerUserId": 1,
              "giftId": 11,
              "giftName": "测试兑换1",
              "status": 1,
              "exchangeTime": "2018-09-12 10:19:34",
              "startTime": "2018-09-12 00:00:00",
              "finishTime": "2018-09-23 23:59:59",
              "createTime": "2018-09-12 10:15:43",
              "qrcodeUrl": "/upload/oaFile/2018/09/12/60e51b07-2ba2-4223-9550-47f85ee30841.png",
              "shopName": null,
              "usePoints": null
          }
        , 1500);
    }); */
    return hadRootUrlFormPost(url, sendData);
  }
}

// 订单

import {
  hadRootUrlJsonPost,
  hadRootUrlFormPost,
  hadRootUrlFormGet
} from "services/commonFn";
import userStore from "stores/userStore";
import constantStore from "stores/constantStore";

export default class GoodsService {
  constructor() {}

  // 获取 订单列表
  static getOrderRows(data) {
    let url = "/seller/order/getOrderAndDetail";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {
            total:1,
            list:[
              {
                "id": 133,
                "orderCode": "P20180725042406213001",
                "shopId": 1,
                "buyerUserId": 1,
                "totalPrice": 10,
                "deliveryAddress": "广东省江门市蓬江区五邑大学教育装备学院101",
                "deliveryLongitude":123,
                "deliveryLatitude ":23,
                "receiverName": "测试",
                "receiverPhone": "13120698788",
                "buyerRemark": null,
                "sellerRemark": null,
                "cancelReason": null,
                "whoCancel": null,
                "status": 0,
                "paymentType": 0,
                "deliveryType": 0,
                "orderTime": null,
                "waitTakeTimes": null,
                "deliveryTime": null,
                "cancelTime": null,
                "finishTime": null,
                "createTime": "2018-07-25 16:24:06",
                "createUser": null,
                "lastUpdateTime": null,
                "lastUpdateUser": null,
                "outTradeNo": null,
                "prepayId": null,
                "payStatus": 0,
                "payTime": null,
                "detailList": [
                  {
                    "id": 102,
                    "orderId": 133,
                    "productId": 61,
                    "productName": "20",
                    "productImgUrl": "http://192.168.1.254:4083/upload/oaFile/2018/07/25/f4c044cf-6fa0-465f-9990-e8d4035ed293.png",
                    "productType": null,
                    "provider": null,
                    "quantity": 1,
                    "unitPrice": 10,
                    "createTime": "2018-07-25 16:24:06"
                  }
                ],
                "shopName": "欢迎来到陈大文的便利店"
              }
            ]
          }
        , 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }

  // 获取 单个订单详情by
  static getOrderDetailById(orderId: number) {
    let url = "/seller/order/getOrderById";
    let sendData = { orderId };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          "id": 133,
          "orderCode": "P20180725042406213001",
          "shopId": 1,
          "buyerUserId": 1,
          "totalPrice": 10,
          "deliveryAddress": "广东省江门市蓬江区五邑大学教育装备学院101",
          "deliveryLongitude":123,
          "deliveryLatitude ":23,
          "receiverName": "测试",
          "receiverPhone": "13120698788",
          "buyerRemark": null,
          "sellerRemark": null,
          "cancelReason": null,
          "whoCancel": null,
          "status": 0,
          "paymentType": 0,
          "deliveryType": 0,
          "orderTime": null,
          "waitTakeTimes": null,
          "deliveryTime": null,
          "cancelTime": null,
          "finishTime": null,
          "createTime": "2018-07-25 16:24:06",
          "createUser": null,
          "lastUpdateTime": null,
          "lastUpdateUser": null,
          "outTradeNo": null,
          "prepayId": null,
          "payStatus": 0,
          "payTime": null,
          "detailList": [
            {
              "id": 102,
              "orderId": 133,
              "productId": 61,
              "productName": "20",
              "productImgUrl": "http://192.168.1.254:4083/upload/oaFile/2018/07/25/f4c044cf-6fa0-465f-9990-e8d4035ed293.png",
              "productType": null,
              "provider": null,
              "quantity": 1,
              "unitPrice": 10,
              "createTime": "2018-07-25 16:24:06"
            }
          ],
          "shopName": "欢迎来到陈大文的便利店"
        });
      }, 1500);
    }); */
    return hadRootUrlFormPost(url, sendData);
  }

  // 接单
  static acceptOrder(orderId: number) {
    let url = "/seller/order/deliver";
    let sendData = { orderId };
    return hadRootUrlFormPost(url, sendData);
  }
  // 取消订单
  static cancelOrder(orderId: number, reason: string) {
    let url = "/seller/order/cancel";
    let sendData = { orderId, reason };
    return hadRootUrlFormPost(url, sendData);
  }
  // 收款 完成订单
  static completeOrder(orderId: number) {
    let url = "/seller/order/complete";
    let sendData = { orderId };
    return hadRootUrlFormPost(url, sendData);
  }

  // 获取各status的订单数量
  static getOrderStatusCounts() {
    let url = "/seller/sellerCount/countOrderStatus";
    let sendData = {};
    /*  return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ 0: parseInt(Math.random() * 10), 1: 2, 2: 5 });
      }, 500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }

  // 跑腿 获取货物类型列表
  static getDeliverItemTypes() {
    let url = "/seller/order/getDictionary";
    let sendData = {
      key: "itemtype"
    };
    /*  return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{"key":"CAKE","value":"蛋糕"},{"key":"FILE","value":"文件"},{"key":"FOOD","value":"美食"},{"key":"OTHER","value":"其他"}]);
      }, 500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
  // 跑腿 获取重量列表
  static getDeliverWeights() {
    let url = "/seller/order/getDictionary";
    let sendData = {
      key: "weight"
    };
    /*  return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{"key":"10","value":"10公斤或以下"},{"key":"11","value":"11公斤"},{"key":"12","value":"12公斤"},{"key":"13","value":"13公斤"},{"key":"14","value":"14公斤"},{"key":"15","value":"15公斤"},{"key":"16","value":"16公斤"},{"key":"17","value":"17公斤"},{"key":"18","value":"18公斤"},{"key":"19","value":"19公斤"},{"key":"20","value":"20公斤"},{"key":"21","value":"21公斤"},{"key":"22","value":"22公斤"},{"key":"23","value":"23公斤"},{"key":"24","value":"24公斤"},{"key":"25","value":"25公斤"},{"key":"26","value":"26公斤"},{"key":"27","value":"27公斤"},{"key":"28","value":"28公斤"},{"key":"29","value":"29公斤"},{"key":"30","value":"30公斤"}]);
      }, 500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
  // 跑腿 获取配送状态类型列表
  static getDeliverStatuses() {
    let url = "/seller/order/getDictionary";
    let sendData = {
      key: "orderstatus"
    };
    /*  return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{"key":"1","value":"待付款"},{"key":"2","value":"支付成功"},{"key":"3","value":"现金支付"},{"key":"10","value":"已接单"},{"key":"11","value":"已到达取货点"},{"key":"12","value":"已确认货物并取货"},{"key":"13","value":"已确定到达收货点"},{"key":"14","value":"已核销"},{"key":"20","value":"已取消"}]);
      }, 500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
  // 跑腿 接单改变订单状态，并创建一个就手跑腿的订单
  static addDeliverOrder(data) {
    let url = "/seller/order/deliverAndCallJsptOrder";
    let sendData = data;
    /*  return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, 500);
    }); */
    return hadRootUrlJsonPost(url, sendData);
  }
  // 跑腿 取消配送单
  static cancelDeliverOrder(orderId: number, cancelReson: string) {
    let url = "/seller/order/cancelExpressDeliveryOrder";
    let sendData = {
      orderId,
      cancelReson
    };
    /*  return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
        );
      }, 500);
    }); */
    return hadRootUrlFormPost(url, sendData);
  }
  // 跑腿 重新下一单配送单
  static reAddDeliverOrder(data) {
    let url = "/seller/order/reorderExpressDeliveryOrder";
    let sendData = data;
    /*  return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          
        );
      }, 500);
    }); */
    return hadRootUrlJsonPost(url, sendData);
  }
  // 跑腿 计算跑腿费用，经纬度需要传入百度的经纬度
  static getDeliverPrice(
    longitude: number,
    latitude: number,
    selectCarDelivery: string,
    weight: string
  ) {
    let url = "/seller/order/computeTransportFee";
    let sendData = {
      longitude,
      latitude,
      selectCarDelivery,
      weight
    };
    /*  return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(109.4);
      }, 500);
    }); */
    return hadRootUrlFormPost(url, sendData);
  }
  // 跑腿 查询跑腿配送运单的信息
  static getDeliverOrderDetal(orderId: number) {
    let url = "/seller/order/getExpressDeliveryOrder";
    let sendData = {
      orderId
    };
    /*  return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {"orderNo":"16180925110737186","deviceType":4,"helpType":"HELP_ME_CARRY","itemType":"OTHER","timeType":1,"executeTime":"2018-09-25 11:07:37","remark":"订单：商品测试，店家备注:鹏1","buyAddressType":null,"goodsAddress":"江门","goodsAddressBuilding":"陈大文便利店","goodsAddressLongitude":113.08168571,"goodsAddressLatitude":22.59979324,"goodsContactName":"13632064123","goodsContactPhone":"13632064123","targetAddress":"广东省江门市蓬江区广场西路万达广场111号","targetAddressStreet":" ","goodsAddressStreet":" ","targetAddressBuilding":"万达百货(江门店)","targetAddressLongitude":113.0832,"targetAddressLatitude":22.61798,"targetContactName":"测试2","targetContactPhone":"13795458789","orderDistance":2.95,"customerId":356,"workerId":null,"workerLongitude":null,"workerLatitude":null,"workerName":null,"workerSerialNo":null,"verificationCode":null,"orderService":"小车配送","pickTime":null,"orderStatus":2,"orderPrice":11.9,"startingPrice":5.9,"extraDistanceFee":0,"nightServiceFee":0,"discount":null,"payWay":"BALANCE_PAY","inGoodsTime":null,"toTargetTime":null,"cancelType":null,"cancelReason":null,"finished":0,"finishTime":null,"commented":0,"deleted":0,"customerPhone":"13632064123","workerPhone":null,"payTime":"2018-09-25 11:07:38","cancelTime":null,"cancelDesc":null,"cancelFee":0,"outTradeOrderNo":"26180925110737696","createTime":"2018-09-25 11:07:38","updateTime":"2018-09-25 11:07:38","toGoodsDistance":0,"actualPay":11.9,"commission":0.15,"customerType":1,"weixinPrepayId":null,"alreadyRemindNum":0,"needRemindNum":1,"selectCarDelivery":1,"cityCode":"0750","adCode":"440703","carDeliveryPrice":6,"weatherPrice":0,"merchantName":"第五元素易众慧商家","finishRemark":null,"helpTypeText":"帮朕送","itemTypeText":"其他","timeTypeText":"实时","buyAddressTypeText":"","statusText":"支付成功","payWayText":"余额支付","cancelText":"","deviceTypeText":"开放平台","workerAvatar":null,"jsptOrderLogList":[{"orderNo":"16180925110737186","orderStatus":1,"orderDesc":"待付款","longitude":0,"latitude":0,"address":null,"createTime":"2018-09-25 11:07:38"},{"orderNo":"16180925110737186","orderStatus":2,"orderDesc":"支付成功","longitude":null,"latitude":null,"address":null,"createTime":"2018-09-25 11:07:38"}]}
        );
      }, 500);
    }); */
    return hadRootUrlFormPost(url, sendData);
  }
}

// 钱包

import {
  hadRootUrlJsonPost,
  hadRootUrlFormPost,
  hadRootUrlFormGet,
  hadRootUrlFormQueryPost
} from "services/commonFn";

export default class WalletService {
  constructor() {}

  // 获取 钱包交易记录列表
  static getWalletTradeRows(data) {
    let url = "/seller/shopWallet/filterShopWalletTradePageInfo";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {
            total:1,
            list:[
              {
                  "id": 62,
                  "walletTradeCode": "WT20180831023057313001",
                  "tradeName": "提现到银行卡100元",
                  "shopId": 1,
                  "shopWalletId": 2,
                  "balance": 98930.00,
                  "tradeType": 2,
                  "tradeSubType": 201,
                  "description": "提现D20180831023057296001申请",
                  "outTradeNo": "D20180831023057296001",
                  "createTime": "2018-08-31 14:30:57",
                  "money": 100.00,
                  "tradeSubTypeName": "提现"
              }
            ]
          }
        , 1500);
    }); */
    return hadRootUrlFormPost(url, sendData);
  }

  // 获取 单个钱包交易记录详情byId
  static getWalletTradeDetail(walletTradeId: number) {
    let url = "/seller/shopWallet/getShopWalletTradeDetail";
    let sendData = { walletTradeId };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          "id": null,
          "walletTradeCode": "WT20180831023057313001",
          "tradeName": "提现D20180831023057296001申请",
          "shopId": null,
          "shopWalletId": null,
          "balance": 98930,
          "tradeType": 2,
          "tradeSubType": 201,
          "description": null,
          "outTradeNo": null,
          "createTime": "2018-08-31 14:30:57",
          "money": 100,
          "tradeSubTypeName": "提现",
          "obj": {
            "id": 23,
            "drawDepositCode": "D20180831023057296001",
            "shopId": 1,
            "mobile": "13712345678",
            "bankAccountName": "张三",
            "bankName": "中国建设银行",
            "bankCard": "6217001210024455893",
            "amount": 100,
            "status": 1,
            "rejectReason": null,
            "launchTime": "2018-08-31 14:30:57",
            "transferredTime": null,
            "createTime": "2018-08-31 14:30:57",
            "servicePrice": 1,
            "sellerGetPrice": 99,
            "serviceChargePercent": 1,
            "bankcardId": null,
            "statusName": "提现申请",
            "drawDepostSummary": "提现到银行卡100.00元"
          });
      }, 1500);
    }); */
    return hadRootUrlFormQueryPost(url, sendData);
  }

  // 获取 钱包余额
  static getWallet() {
    let url = "/seller/shopWallet/getShopWalletByShopId";
    let sendData = {};
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {
            "id": 2,
            "shopId": 1,
            "balance": 98930,
            "createTime": "2018-07-25 10:03:52",
            "updateTime": "2018-07-25 10:03:52"
          }
        , 1500);
    }); */
    return hadRootUrlFormPost(url, sendData);
  }

  // 获取 银行卡列表
  static getBankCards(data) {
    let url = "/seller/shopBankcardInfo/getPageInfo";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
            list:[
              "total": 13,
              {
                  "id": 18,
                  "shopId": 1,
                  "mobile": "13712345678",
                  "bankAccountName": "张三",
                  "bankName": "中国建设银行",
                  "bankCard": "6217001210024455893",
                  "createTime": null,
                  "createUser": null,
                  "lastUpdateTime": null,
                  "lastUpdateUser": null,
                  "isDefault": 0,
                  "bankId": 2
              }
            ]
        });
      }, 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
  // 获取 银行卡byid
  static getBankCardDetail(shopBankcardInfoId) {
    let url = "/seller/shopBankcardInfo/getShopBankcardInfoById";
    let sendData = { shopBankcardInfoId };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          "id": 18,
          "shopId": 1,
          "mobile": "13712345678",
          "bankAccountName": "张三",
          "bankName": "中国建设银行",
          "bankCard": "6217001210024455893",
          "createTime": null,
          "createUser": null,
          "lastUpdateTime": null,
          "lastUpdateUser": null,
          "isDefault": 0,
          "bankId": 2
        });
      }, 1500);
    }); */
    return hadRootUrlFormPost(url, sendData);
  }
  // 新增 银行卡
  static addBankCard(data) {
    let url = "/seller/shopBankcardInfo/add";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }
  // 编辑 银行卡
  static editBankCard(data) {
    let url = "/seller/shopBankcardInfo/update";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }
  // 删除 银行卡
  static removeBankCard(shopBankcardInfoId: string) {
    let url = "/seller/shopBankcardInfo/deleteById";
    let sendData = { shopBankcardInfoId };
    return hadRootUrlFormPost(url, sendData);
  }

  // 提现
  static withdrawCash(data) {
    let url = "/seller/drawDeposit/add";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
            amount: 50,
            bankAccountName: "peng11",
            bankCard: "6212264100011335373",
            bankName: "中国工商银行",
            bankcardId: 19,
            createTime: "2018-09-05 09:23:56",
            drawDepositCode: "D20180905092356056001",
            drawDepostSummary: "提现到银行卡50元",
            id: 31,
            launchTime: "2018-09-05 09:23:56",
            mobile: "13712345678",
            rejectReason: null,
            sellerGetPrice: 49.5,
            serviceChargePercent: 1,
            servicePrice: 0.5,
            shopId: 1,
            status: 1,
            statusName: null,
            transferredTime: null
        });
      }, 1500);
    }); */

    return hadRootUrlJsonPost(url, sendData);
  }
  // 提现中的总金额
  static withdrawingMoney() {
    let url = "/seller/drawDeposit/getPrice";
    let sendData = {};
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(910);
      }, 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
}

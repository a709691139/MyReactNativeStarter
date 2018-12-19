// 商品

import {
  hadRootUrlJsonPost,
  hadRootUrlFormPost,
  hadRootUrlFormGet,
  hadRootUrlFormQueryPost
} from "services/commonFn";

export default class GoodsService {
  constructor() {}

  // 获取 商品列表
  static getGoodRows(data) {
    let url = "/seller/product/getPageInfo";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          
        , 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }

  // 获取 单个商品详情byId
  static getGoodDetailById(productId: number) {
    let url = "/seller/product/getProductById";
    let sendData = { productId };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          barCode: "string",
          createTime: "2018-07-24T00:42:19.972Z",
          id: 0,
          imgUrl: "string",
          inventoryNum: 0,
          name: "string",
          productCode: "string",
          productTypeId: 0,
          provider: "string",
          purchasePrice: 0,
          sellerDefineSalePrice: 0,
          salesCount: 0,
          salesStatus: 0,
          shopId: 0,
          unit: "string"
        });
      }, 1500);
    }); */
    return hadRootUrlFormPost(url, sendData);
  }

  // 获取 商品数据by条形码
  static getByBarcode(barcode: string) {
    let url = "/seller/product/getByBarcode";
    let sendData = { barcode };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }); */
    return hadRootUrlJsonPost(url, sendData);
  }

  // 新增 商品
  static addGood(data) {
    // {"barCode":"string","createTime":"2018-07-24T00:42:19.972Z","id":0,"imgUrl":"string","inventoryNum":0,"name":"string","productCode":"string","productTypeId":0,"provider":"string","purchasePrice":0,"sellerDefineSalePrice":0,"salesCount":0,"salesStatus":0,"shopId":0,"unit":"string"}
    let url = "/seller/product/add";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }); */
    return hadRootUrlJsonPost(url, sendData);
  }

  // 更新 商品
  static updateGood(data) {
    // {"barCode":"string","createTime":"2018-07-24T00:42:20.033Z","id":0,"imgUrl":"string","inventoryNum":0,"name":"string","productCode":"string","productTypeId":0,"provider":"string","purchasePrice":0,"sellerDefineSalePrice":0,"salesCount":0,"salesStatus":0,"shopId":0,"unit":"string"}
    let url = "/seller/product/update";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }); */
    return hadRootUrlJsonPost(url, sendData);
  }

  // 删除 商品-单个
  static deleteGoodById(productId: number) {
    let url = "/seller/product/add";
    let sendData = { productId };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }); */
    return hadRootUrlJsonPost(url, sendData);
  }
  // 删除 商品-批量
  static deleteGoodsByIds(ids: Array<number>) {
    let url = "/seller/product/patchDeleteByIds";
    let sendData = ids;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }); */
    return hadRootUrlJsonPost(url, sendData);
  }

  // 补货
  static purchaseGoods(data) {
    // { "quantity", "purchasePrice", "sellerDefineSalePrice", "id" }
    let url = "/seller/product/increaseInventory";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }); */
    return hadRootUrlJsonPost(url, sendData);
  }

  // 修改 商品-批量-上下架    status：0、下架；1、上架
  static updateGoodsStatus(ids: Array<number>, status: number) {
    let url = "/seller/product/patchUpdateStatus";
    let sendData = { ids, status };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }); */
    return hadRootUrlJsonPost(url, sendData);
  }

  // 根据条形码 获取商品
  static getProductTemplateByBarcode(barcode: string) {
    let url = "/seller/product/getProductTemplateByBarcode";
    let sendData = { barcode };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {
              "id": 3,
              "code": "6923450659441",
              "tradeMark": "无",
              "goodsName": "益达木糖醇蜜桃瓶装",
              "note": "关键字：器皿 上市时间：2015-01-01 ",
              "sptmImg": "http://app2.showapi.com/img/barCode_img/20161026/1477476483549.png",
              "manuName": "箭牌糖果(中国)有限公司",
              "spec": "56g",
              "manuAddress": "广东省广州市广州经济技术开发区友谊路111号",
              "goodsType": "家用电器和日用电子产品>>家用厨具>>家用厨房工具和器皿",
              "createTime": "2018-07-26 16:23:23",
              "productOptionalImageUrls": ["http://img11.360buyimg.com/n7/jfs/t3820/170/3217443875/167538/cd60f867/58817671N1d79e217.jpg"]
          }
        );
      }, 1500);
    }); */
    return hadRootUrlFormPost(url, sendData);
  }

  // 获取 商品分类列表
  static getGoodTypes(shopId: string | number) {
    let url = "/seller/productType/getAllListByShopId";
    // let url= "/seller/productType/getPageInfo"
    let sendData = {
      shopId
    };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          [{"id":19,"name":"其它","createTime":"2018-07-16 10:28:07"},{"id":14,"name":"虚拟产品","createTime":"2018-07-12 14:47:19"},{"id":8,"name":"厨房调味","createTime":"2018-07-11 00:00:00"},{"id":7,"name":"米面粮油","createTime":"2018-07-11 00:00:00"},{"id":6,"name":"方便食品","createTime":"2018-07-11 00:00:00"},{"id":5,"name":"牛奶乳品","createTime":"2018-07-11 00:00:00"},{"id":4,"name":"休闲糖果","createTime":"2018-07-11 00:00:00"},{"id":3,"name":"饼干糕点","createTime":"2018-07-11 00:00:00"},{"id":2,"name":"饮料冲调","createTime":"2018-07-11 00:00:00"},{"id":1,"name":"中外名酒","createTime":"2018-07-11 00:00:00"}]
          )
      }, 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
  // 获取 商品分类详情byId
  static getGoodTypeDetailById(productTypeId: number) {
    let url = "/seller/productType/getProductTypeById";
    let sendData = { productTypeId };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve({"id":19,"name":"其它","createTime":"2018-07-16 10:28:07"}, 1500);
    }); */
    return hadRootUrlFormPost(url, sendData);
  }
  // 新增 商品分类
  static addGoodType(data) {
    let url = "/seller/productType/add";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }
  // 修改 商品分类
  static updateGoodType(data) {
    let url = "/seller/productType/update";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }
  // 删除 商品分类
  static deleteGoodType(productTypeId: number) {
    let url = "/seller/productType/deleteById";
    let sendData = { productTypeId };
    return hadRootUrlFormQueryPost(url, sendData);
  }

  // 获取 供应商列表
  static getGoodProviderRows(data) {
    let url = "/seller/shopProvider/getPageInfoWithProductImgUrls";
    let sendData = data;
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          {
            "total": 6,
            list:[
              {
                "id": 6,
                "shopId": 1,
                "name": "江门永利",
                "contacts": "赵先生",
                "phone": "13424778522",
                "createTime": "2018-08-17 10:46:24",
                "createUser": "S00000002",
                "remark": null,
                "productImgUrls": "/upload/oaFile/2018/08/17/e4b45cbb-d12b-490a-99ff-73fe68fe962d.jpg"
              }
            ]
          }
        )
      }, 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
  // 获取 供应商详情byId
  static getGoodProviderDetailById(shopProviderId: number) {
    let url = "/seller/shopProvider/getShopProviderById";
    let sendData = { shopProviderId };
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve({
          "id": 6,
          "shopId": 1,
          "name": "江门永利",
          "contacts": "赵先生",
          "phone": "13424778522",
          "createTime": "2018-08-17 10:46:24",
          "createUser": "S00000002",
          "remark": null  ,
          "productImgUrls": null
        });
      }, 1500);
    }); */
    return hadRootUrlFormPost(url, sendData);
  }
  // 新增 供应商
  static addGoodProvider(data) {
    let url = "/seller/shopProvider/add";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }
  // 修改 供应商
  static updateGoodProvider(data) {
    let url = "/seller/shopProvider/update";
    let sendData = data;
    return hadRootUrlJsonPost(url, sendData);
  }
  // 删除 供应商
  static deleteGoodProvider(shopProviderId: number) {
    let url = "/seller/shopProvider/deleteById";
    let sendData = { shopProviderId };
    return hadRootUrlFormQueryPost(url, sendData);
  }
}

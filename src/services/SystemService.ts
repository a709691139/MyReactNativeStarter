import {
  hadRootUrlJsonPost,
  hadRootUrlFormPost,
  hadRootUrlFormDataPost,
  hadRootUrlFormGet
} from "services/commonFn";

export default class SystemService {
  constructor() {}

  // 单独上传文件
  static uploadFile(file) {
    let url = "/common/gridfs/upload";
    let sendData = {
      file
    };
    // return new Promise((resolve, reject)=>{
    //   setTimeout(()=>{
    //     resolve()
    //   },500)
    // });
    return hadRootUrlFormDataPost(url, sendData);
  }

  // 获取 全部字典数据
  static getDictionary() {
    let url = "/seller/dictionary/getAllDictionary";
    let sendData = {};
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({"SalesStatus":[{"value":"0","text":"已下架","extend1":""},{"value":"1","text":"上架中","extend1":""}],"OrderStatus":[{"value":"0","text":"待处理","extend1":""},{"value":"1","text":"待取货","extend1":""},{"value":"2","text":"送货中","extend1":""},{"value":"3","text":"交易完成","extend1":""},{"value":"4","text":"已取消","extend1":""}],"PaymentType":[{"value":"0","text":"现金支付","extend1":""},{"value":"1","text":"在线支付","extend1":""}],"DeliveryType":[{"value":"0","text":"店家送货","extend1":""},{"value":"1","text":"到店自提","extend1":""}]});
      }, 1500);
    }); */
    return hadRootUrlFormGet(url, sendData);
  }
}

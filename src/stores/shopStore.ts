import { observable, computed, observe, action, transaction, toJS } from "mobx";
import ShopService from "services/ShopService";

class ShopStore {
  stateNameList = [
    "id",
    "name",
    "imgUrl",
    "validatePhone",
    "contactPhone",
    "contactName",
    "notice",
    "minimumDeliveryAmount",
    "address",
    "longitude",
    "latitude",
    "areaCode",
    "businessHours",
    "freight",
    "industryId",
    "businessLicenceImage",
    "idCardFrontImage",
    "idCardBackImage",
    "checkStatus",
    "checkPassTime",
    "weixinQrcode",
    "oneselfIdCardImage",
    "legalPersonName"
  ];

  constructor() {}
  id: string = "";
  weixinQrcode: string = ""; // 微信小程序二维码url
  @observable
  name: string = ""; // 店铺名
  @observable
  imgUrl: string = ""; // 店铺图片
  @observable
  validatePhone: string = ""; // 验证手机号码
  @observable
  contactPhone: string = ""; // 联系人电话
  @observable
  contactName: string = ""; // 联系人名
  @observable
  notice: string = ""; //	公告
  @observable
  minimumDeliveryAmount: string = ""; // 最低起送金额
  @observable
  address: string = ""; // 店铺地址
  longitude: number = 0; // 经度
  latitude: number = 0; // 纬度
  areaCode: string = ""; // 区域code
  businessHours: string = ""; // 营业时间描述 128字符
  freight: string = ""; // 运费金额
  @observable
  industryId: number = 1; // 行业类型Id
  businessLicenceImage: string = ""; // 营业执照照片
  idCardFrontImage: string = "";
  idCardBackImage: string = "";
  @observable
  checkStatus: string = ""; // 审核状态，0待审核，1审核通过，2审核不通过, 3未申请
  checkPassTime: string = ""; // 	审核通过时间
  oneselfIdCardImage: string = ""; // 	本人和身份证正面合照
  legalPersonName: string = ""; // 法人名字

  @action
  changeDataObj = (data = {}) => {
    for (let i in data) {
      this[i] = data[i];
    }
  };
  @action
  resetData = () => {
    this.stateNameList.map(name => {
      this[name] = "";
    });
  };

  @action
  getData = () => {
    const getShopInfo: Promise<any> = ShopService.getShopInfo().then(
      shopDetail => {
        console.log("获取店铺资料", shopDetail);
        this.changeDataObj(shopDetail);
      }
    );
    return getShopInfo;
  };
}
const shopStore = new ShopStore();
export default shopStore;

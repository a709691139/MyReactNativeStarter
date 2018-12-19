import { observable, computed, observe, action, transaction, toJS } from "mobx";
import ShopService from "services/ShopService";
import { Toast } from "antd-mobile-rn";

export default class MemberCenterStore {
  @observable
  searchWord: string = ""; // 搜索关键字
  @observable
  inBlacklist: string = "0";

  @observable
  commonListLength: number = 0;
  @observable
  blackListLength: number = 0;
  @computed
  get tabs() {
    return [
      { title: `一般(${this.commonListLength})`, inBlacklist: "0", key: "0" },
      { title: `黑名单(${this.blackListLength})`, inBlacklist: "1", key: "1" }
    ];
  }

  @observable
  commonList: Array<any> = [
    // 非黑名单列表
    // {
    //   id: 34,
    //   shopId: 1,
    //   buyerUserId: 3,
    //   productCollectionCount: 1,
    //   shareTotalCount: 0,
    //   clickProductDetailCount: 35,
    //   consumeTotalCount: 3,
    //   consumeTotalPrice: 0.0,
    //   inBlacklist: 0,
    //   payPoints: 0,
    //   rewardPoints: 50,
    //   lastSignInDate: null,
    //   remark: null,
    //   createTime: "2018-08-24 15:19:07",
    //   shopName: "2333",
    //   buyerName: "罗皓",
    //   logoImgUrl:
    //     "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLjSFNAonBkMotKyFYsicYicvDoicicydDpPIa1ibs6Btr1DF74XNBM4hQYnJQfia9VjwVePMIQlbwI9mug/132",
    //   shopImgUrl:
    //     "/upload/oaFile/2018/08/28/7b7087e0-f7da-4603-9409-79801970764f.jpg",
    //   wechatName: "罗皓"
    // }
  ];
  @observable
  blackList: Array<any> = []; // 黑名单列表

  constructor() {}

  @action
  changeDataObj = (data = {}) => {
    for (let i in data) {
      this[i] = data[i];
    }
  };

  // 获取列表
  @action
  asyncGetList = async (sendData: object, isOnEndReached?: boolean) => {
    try {
      sendData["buyerName"] = this.searchWord;
      const response: any = await ShopService.getShopBuyerMembers(sendData);
      console.log("获取会员列表", response);
      // if (sendData["inBlacklist"] == "0") {
      //   this.commonList = response.list;
      // } else {
      //   this.blackList = response.list;
      // }
      return response.list;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // 更新成员
  @action
  asyncUpdateMember = async (buyerUserMember: any) => {
    try {
      const response: any = await ShopService.updateBuyerMember(
        buyerUserMember
      );
      console.log("更新成员", buyerUserMember);
      this.commonList = this.commonList.reduce((pre, next) => {
        if (next.id == buyerUserMember.id) {
          next = { ...next, ...buyerUserMember };
        }
        pre.push(next);
        return pre;
      }, []);
      this.asyncGetListLength();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // 获取 正常列表和黑名单列表数量
  @action
  asyncGetListLength = async () => {
    try {
      const blackListResponse: any = await ShopService.getShopBuyerMembers({
        inBlacklist: "1"
      });
      this.blackListLength = blackListResponse.total;
      const commonListResponse: any = await ShopService.getShopBuyerMembers({
        inBlacklist: "0"
      });
      this.commonListLength = commonListResponse.total;
      console.log("获取会员数量", this.commonListLength, this.blackListLength);
    } catch (error) {
      console.log(error);
      Toast.info(error.message || error, 2);
      throw error;
    }
  };

  @action
  changeSearchWord = (searchWord: string) => {
    this.searchWord = searchWord;
  };

  @action
  changeInBlacklist = (tab: any, index: number) => {
    // {title: "仓库中(0)", inBlacklist: "1", key: "1"}
    this.inBlacklist = tab.key;
  };
}

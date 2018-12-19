import { getLocalStorage, saveLocalStorage } from "./commonFn";

// 首次使用
const KEY_IS_FIRST_USE = "KEY_IS_FIRST_USE";
// 用户资料
const KEY_USER_DATA = "KEY_USER_DATA";
// 是否隐藏合计流水
const KEY_IS_HIDE_JOURNAL_TOTAL = "KEY_IS_HIDE_JOURNAL_TOTAL";
// 是否隐藏首页-销售额
const KEY_IS_HIDE_SALES_AMOUNT = "KEY_IS_HIDE_SALES_AMOUNT";
// 省市区列表
const KEY_REGION_TREE = "KEY_REGION_TREE";

export default class LocalService {
  constructor() {}

  // 是否第一次用app
  static isFirstUseApp() {
    return getLocalStorage(KEY_IS_FIRST_USE);
  }
  static setFirstUseApp(flag: boolean) {
    return saveLocalStorage(KEY_IS_FIRST_USE, flag);
  }

  // 用户资料
  static getUserData() {
    return getLocalStorage(KEY_USER_DATA);
  }
  static saveUserData(data) {
    return saveLocalStorage(KEY_USER_DATA, data);
  }

  // 显示合计流水
  static getIsHideJournalTotal() {
    return getLocalStorage(KEY_IS_HIDE_JOURNAL_TOTAL);
  }
  static saveIsHideJournalTotal(flag: boolean) {
    return saveLocalStorage(KEY_IS_HIDE_JOURNAL_TOTAL, { flag });
  }

  // 显示首页-销售额
  static getIsHideSalesAmount() {
    return getLocalStorage(KEY_IS_HIDE_SALES_AMOUNT);
  }
  static saveIsHideSalesAmount(flag: boolean) {
    return saveLocalStorage(KEY_IS_HIDE_SALES_AMOUNT, { flag });
  }

  // 省市区列表
  static getRegionTree() {
    return getLocalStorage(KEY_REGION_TREE);
  }
  static saveRegionTree(array: Array<any>) {
    return saveLocalStorage(KEY_REGION_TREE, array);
  }
}

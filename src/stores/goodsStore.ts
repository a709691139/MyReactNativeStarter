import { observable, computed, observe, action, transaction, toJS } from "mobx";
import GoodsService from "services/GoodsService";
import shopStore from "stores/shopStore";

class GoodsStore {
  constructor() {}
  @observable
  types: Array<any> = [
    // 商品类型列表
    // { id: 19, name: "其它", createTime: "2018-07-16 10:28:07" }
  ];
  @observable
  loadingTypes: boolean = false;

  @observable
  list: Array<any> = [
    // 商品列表
    // {
    //   id: 63,
    //   productCode: "P00000068",
    //   shopId: 1,
    //   barCode: "123456789",
    //   name: "香辣牛肉面",
    //   imgUrl:
    //     "/upload/oaFile/2018/07/20/d1bfd877-67b9-4eeb-ab4d-623fcc2ac888.jpg",
    //   productTypeId: 6,
    //   provider: "康师傅",
    //   purchasePrice: 3,
    //   salePrice: 6,
    //   inventoryNum: 10,
    //   salesCount: null,
    //   createTime: "2018-07-20 11:43:19",
    //   salesStatus: 1,
    //   unit: "个"
    // }
  ];
  @observable
  loadingList: boolean = false;

  @observable
  newAddGoodList: Array<any> = []; // 本次新增的商品列表

  @observable
  providerList: Array<any> = [
    // 供应商列表
    // {
    //   id: 2,
    //   shopId: 1,
    //   name: "酸奶供应商2",
    //   contacts: "陈大文",
    //   phone: "17134567890",
    //   createTime: "2018-07-27 11:26:30",
    //   createUser: "管理员",
    //   remark: "测试1",
    //   productImgUrls:
    //     "/upload/oaFile/2018/08/10/87155138-2519-4a26-9e65-c16bcd03d836.jpg,/upload/oaFile/2018/07/12/ef5b1933-35e6-4779-bc61-7cd3b58eb97c.png,/upload/oaFile/2018/07/12/ef5b1933-35e6-4779-bc61-7cd3b58eb97c.png"
    // }
  ];
  @observable
  loadingProviders: boolean = false;

  @action
  changeDataObj = (data = {}) => {
    for (let i in data) {
      this[i] = data[i];
    }
  };
  @action
  resetData = () => {
    this.types = [];
    this.loadingTypes = false;
    this.list = [];
    this.loadingList = false;
    this.newAddGoodList = [];
    this.providerList = [];
    this.loadingProviders = false;
  };

  // 获取商品列表
  @action
  getGoodRows = async (isForceReflesh: boolean = false) => {
    try {
      if (isForceReflesh || !this.list.length) {
        // 是否强制刷新 || 没有列表
        this.loadingList = true;
        const response: any = await GoodsService.getGoodRows({
          page: 1,
          rows: 99999,
          shopId: shopStore.id
        });
        console.log("获取商品列表", response);
        this.loadingList = false;
        this.list = response.list.map(v => {
          v.key = v.id.toString();
          return new Good(v);
        });
        return this.list;
      }
    } catch (error) {
      console.log(error);
      this.loadingList = false;
      throw error;
    }
  };

  @action
  addNewAddGoodList = (good: Good) => {
    this.newAddGoodList.unshift(good);
  };

  // 获取商品分类列表
  @action
  getTypes = async () => {
    try {
      this.loadingTypes = true;
      const response: Array<any> = await GoodsService.getGoodTypes(
        shopStore.id
      );
      console.log("获取商品分类列表", response);
      this.loadingTypes = false;
      this.types = response.filter(v => v && v.id).map(v => {
        v.key = v.id.toString();
        return v;
      });
      return this.types;
    } catch (error) {
      console.log(error);
      this.loadingTypes = false;
      throw error;
    }
  };
  @action
  getTypeDetailById = async (id: number) => {
    try {
      const response: any = await GoodsService.getGoodTypeDetailById(id);
      for (let i = 0; i++; i < this.types.length) {
        if (this.types[i].id == response.id) {
          this.types[i] = response;
          break;
        }
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  @action
  asyncUpdateType = async data => {
    try {
      const response: any = await GoodsService.updateGoodType(data);
      await this.getTypes();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  @action
  asynAddType = async data => {
    try {
      const response: any = await GoodsService.addGoodType(data);
      await this.getTypes();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  @action
  asynDeleteType = async (productTypeId: number) => {
    try {
      const response: any = await GoodsService.deleteGoodType(productTypeId);
      await this.getTypes();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // 获取供应商列表
  @action
  getProviderList = async () => {
    try {
      this.loadingProviders = true;
      const response: any = await GoodsService.getGoodProviderRows({
        page: 1,
        rows: 99999
      });
      console.log("获取供应商列表", response);
      this.loadingProviders = false;
      this.providerList = response.list.filter(v => v && v.id);
      return this.providerList;
    } catch (error) {
      console.log(error);
      this.loadingProviders = false;
      throw error;
    }
  };
  @action
  getProviderDetailById = async (id: number) => {
    try {
      const response: any = await GoodsService.getGoodProviderDetailById(id);
      for (let i = 0; i++; i < this.providerList.length) {
        if (this.providerList[i].id == response.id) {
          this.providerList[i] = response;
          break;
        }
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  @action
  asyncUpdateProvider = async data => {
    try {
      const response: any = await GoodsService.updateGoodProvider(data);
      await this.getProviderList();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  @action
  asynAddProvider = async data => {
    try {
      const response: any = await GoodsService.addGoodProvider(data);
      await this.getProviderList();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  @action
  asynDeleteProvider = async (providerId: number) => {
    try {
      const response: any = await GoodsService.deleteGoodProvider(providerId);
      await this.getProviderList();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
const goodsStore = new GoodsStore();
export default goodsStore;
class Good {
  id: number;
  name: string | null | undefined;
  createTime: string;
  imgUrl: string;
  inventoryNum: string;
  productCode: string;
  productTypeId: number;
  provider: string;
  purchasePrice: number;
  salePrice: number;
  salesCount: number;
  @observable
  salesStatus: number;
  shopId: number;
  unit: string;
  constructor(data) {
    this.changeDataObj(data);
  }
  @action
  changeDataObj = (data = {}) => {
    for (let i in data) {
      this[i] = data[i];
    }
  };
}

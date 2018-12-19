import { observable, computed, observe, action, transaction, toJS } from "mobx";
import SystemService from "services/SystemService";

class DictionaryStore {
  constructor() {}
  SalesStatus: Array<any> = [
    {
      value: "0",
      text: "已下架",
      extend1: ""
    },
    {
      value: "1",
      text: "上架中",
      extend1: ""
    }
  ];
  OrderStatus: Array<any> = [
    {
      value: "0",
      text: "待处理",
      extend1: ""
    },
    {
      value: "1",
      text: "待取货",
      extend1: ""
    },
    {
      value: "2",
      text: "送货中",
      extend1: ""
    },
    {
      value: "3",
      text: "交易完成",
      extend1: ""
    },
    {
      value: "4",
      text: "已取消",
      extend1: ""
    },
    {
      value: "5",
      text: "待付款",
      extend1: ""
    }
  ];
  OrderWhoCancel: Array<any> = [
    {
      value: "1",
      text: "卖家",
      extend1: ""
    },
    {
      value: "2",
      text: "买家",
      extend1: ""
    },
    {
      value: "3",
      text: "系统管理用户",
      extend1: ""
    },
    {
      value: "4",
      text: "系统",
      extend1: ""
    }
  ];
  PaymentType: Array<any> = [
    {
      value: "0",
      text: "现金支付",
      extend1: ""
    },
    {
      value: "1",
      text: "在线支付",
      extend1: ""
    }
  ];
  DeliveryType: Array<any> = [
    {
      value: "0",
      text: "店家送货",
      extend1: ""
    },
    {
      value: "1",
      text: "到店自提",
      extend1: ""
    }
  ];

  checkStatusTypes: Array<any> = [
    // 资格审核状态s
    {
      value: "0",
      text: "待审核"
    },
    {
      value: "1",
      text: "审核通过"
    },
    {
      value: "2",
      text: "审核不通过"
    },
    {
      value: "3",
      text: "申请入驻"
    }
  ];

  couponScopeTypes: Array<any> = [
    // 优惠券范围s
    {
      label: "全部商品",
      value: "0"
    },
    {
      label: "指定类型",
      value: "1"
    },
    {
      label: "指定商品",
      value: "2"
    }
  ];

  expressDeliveryTypes: Array<any> = [
    // 快递的配送类型, 由商家选择的
    {
      label: "店家亲自送货",
      value: "0"
    },
    {
      label: "就手跑腿配送",
      value: "1"
    }
  ];

  expressDeliveryOrderStatuses: Array<any> = [
    // 配送单的状态
    {
      label: "待付款",
      value: "1"
    },
    {
      label: "支付成功",
      value: "2"
    },
    {
      label: "现金支付",
      value: "3"
    },
    {
      label: "已接单",
      value: "10"
    },
    {
      label: "已到达取货点",
      value: "11"
    },
    {
      label: "已确认货物并取货",
      value: "12"
    },
    {
      label: "已确定到达收货点",
      value: "13"
    },
    {
      label: "已核销",
      value: "14"
    },
    {
      label: "已取消",
      value: "20"
    }
  ];

  @action
  changeDataObj = (data = {}) => {
    for (let i in data) {
      this[i] = data[i];
    }
  };

  @action
  getData = () => {
    const getDictionary: Promise<any> = SystemService.getDictionary().then(
      response => {
        console.log("获取数据字典", response);
        this.changeDataObj(response);
      }
    );
    return getDictionary;
  };
}
const dictionaryStore = new DictionaryStore();
export default dictionaryStore;

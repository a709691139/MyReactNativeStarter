import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import { Toast } from "antd-mobile-rn";
import styles from "./styles";
import GoodItem from "./GoodItem";
import PullFlatList from "components/PullList/PullFlatList";
import GoodsService from "services/GoodsService";
import goodsStore from "stores/goodsStore";
import WithoutDataView from "components/WithoutDataView";
import shopStore from "stores/shopStore";
// const urlImgEmpty = require("./assets/imgEmpty.png");

interface ResponseListRow {
  id: number;
  name: string | null | undefined;
  createTime: string;
  imgUrl: string;
  inventoryNum: string;
  productCode: string;
  productTypeId: number;
  provider: string;
  purchasePrice: number;
  sellerDefineSalePrice: number;
  salesCount: number;
  salesStatus: number;
  shopId: number;
  unit: string;
}
interface Response {
  list: ResponseListRow[];
  total: number;
}
interface Props {
  salesStatus?: number | string;
  name?: string;
  productTypeId?: number | string;
  navigation: any;
  isRefleshOnMount?: boolean; // 是否界面加载完成就获取一次数据
  mode?: "sale" | "store" | "price";
}

@observer
export default class TabComponent extends React.Component<Props> {
  static defaultProps = {
    isRefleshOnMount: true
  };
  state = {
    data: [],
    loading: false,
    hadMore: false,
    currentPage: 1,
    pageSize: 10,
    total: 0
  };

  constructor(props) {
    super(props);
  }
  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  onRefresh = () => {
    if (!goodsStore.loadingList) {
      return goodsStore.getGoodRows(true);
    }
  };
  onEndReached = () => {};
  ListEmptyComponent = () => {
    return <WithoutDataView text="您没有相关商品" />;
  };
  ListFooterComponent = () => {
    if (this.state.data.length) {
      return (
        <View style={styles.noMoreBox}>
          <View
            style={[styles.noMoreBox_border, styles.noMoreBox_border_left]}
          />
          <View
            style={[styles.noMoreBox_border, styles.noMoreBox_border_right]}
          />
          <Text style={styles.noMoreBox_text}>没有更多商品了</Text>
        </View>
      );
    } else {
      return null;
    }
  };
  renderItem = ({ item, separators, index }) => {
    return (
      <GoodItem
        item={item}
        navigation={this.props.navigation}
        mode={this.props.mode}
      />
    );
  };
  componentDidMount() {
    if (this.props.isRefleshOnMount) {
      this.onRefresh();
    }
  }
  render() {
    let list = goodsStore.list.filter(v => {
      let boolName = true;
      if (this.props.name) {
        boolName = v.name.indexOf(this.props.name) != -1;
      }
      let boolType = true;
      if (this.props.productTypeId) {
        boolType = v.productTypeId == this.props.productTypeId;
      }
      let boolSalesStatus = true;
      if (this.props.salesStatus) {
        boolSalesStatus = v.salesStatus == this.props.salesStatus;
      }
      return boolName && boolType && boolSalesStatus;
    });
    // console.log(list, this.props.salesStatus);
    return (
      <PullFlatList
        style={styles.container}
        data={list}
        refreshing={goodsStore.loadingList}
        hadMore={false}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        renderItem={this.renderItem}
        ListEmptyComponent={this.ListEmptyComponent}
        ListFooterComponent={this.ListFooterComponent}
        initialNumToRender={5}
      />
    );
  }
}

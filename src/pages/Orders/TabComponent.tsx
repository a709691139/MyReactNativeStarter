import React from "react";
import { View, Text, InteractionManager } from "react-native";
import { Toast } from "antd-mobile-rn";
import styles from "./styles";
import OrderItem from "./OrderItem";
import PullFlatList from "components/PullList/PullFlatList";
import OrderService from "services/OrderService";
import WithoutDataView from "components/WithoutDataView";

interface ResponseListRow {
  id: number;
  name?: string | null | undefined;
}
interface Response {
  list: ResponseListRow[];
  total: number;
}
interface Props {
  status?: number;
  navigation: any;
  isRefleshOnMount?: boolean; // 是否加载完成就获取一次数据
  actived?: boolean; // 是否选中
  searchWord?: string; // 搜索关键字
}

export default class TabComponent extends React.PureComponent<Props> {
  static defaultProps = {
    isRefleshOnMount: true
  };
  state = {
    data: [],
    loading: false,
    hadMore: true,
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
  // 清空
  clean = () => {
    this.setState({
      data: []
    });
  };
  onRefresh = () => {
    // 下拉刷新
    if (!this.state.loading) {
      let promise = OrderService.getOrderRows({
        page: 1,
        rows: this.state.pageSize,
        status: this.props.status,
        searchWord: this.props.searchWord
      });
      this.setState(
        {
          loading: true,
          currentPage: 1
        },
        () => {
          promise
            .then((response: Response) => {
              console.log("订单", response);
              this.setState({
                loading: false,
                hadMore: response.list.length == this.state.pageSize,
                total: response.total,
                data: response.list
              });
            })
            .catch(error => {
              console.log(error);
              this.setState({ loading: false });
              Toast.fail(error.message || error, 2);
            });
        }
      );
      return promise;
    }
  };
  onEndReached = () => {
    if (this.state.hadMore && !this.state.loading) {
      // console.warn("onEndReached", this.state.currentPage);
      let promise = OrderService.getOrderRows({
        page: this.state.currentPage + 1,
        rows: this.state.pageSize,
        status: this.props.status,
        searchWord: this.props.searchWord
      });
      this.setState(
        {
          loading: true,
          hadMore: false,
          currentPage: this.state.currentPage + 1
        },
        () => {
          promise
            .then((response: Response) => {
              console.log("订单", response);
              this.setState({
                loading: false,
                hadMore: response.list.length == this.state.pageSize,
                total: response.total,
                data: this.state.data.concat(response.list)
              });
            })
            .catch(error => {
              console.log(error);
              this.setState({ loading: false });
              Toast.fail(error.message || error, 2);
            });
        }
      );
      return promise;
    }
  };
  ListEmptyComponent = () => {
    return <WithoutDataView text="您没有相关订单" />;
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
          <Text style={styles.noMoreBox_text}>没有更多订单了</Text>
        </View>
      );
    } else {
      return null;
    }
  };
  renderItem = ({ item, separators, index }) => {
    return (
      <OrderItem
        item={item}
        navigation={this.props.navigation}
        fnAcceptSuccess={this.onRefresh}
        fnCancelSuccess={this.onRefresh}
      />
    );
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.actived) {
      this.onRefresh();
    }
  }
  componentDidMount() {
    // InteractionManager.runAfterInteractions(() => {
    if (this.props.isRefleshOnMount) {
      this.onRefresh();
    }
    // });
  }
  render() {
    return (
      <View style={styles.container}>
        <PullFlatList
          style={styles.list}
          data={this.state.data}
          refreshing={this.state.loading}
          hadMore={this.state.hadMore}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          renderItem={this.renderItem}
          ListEmptyComponent={this.ListEmptyComponent}
          ListFooterComponent={this.ListFooterComponent}
          initialNumToRender={2}
        />
      </View>
    );
  }
}

import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import { observer } from "mobx-react";
import { observable, action, toJS } from "mobx";
import { whiteThemeNavigationOptions } from "pages/index";
import PullFlatList from "components/PullList/PullFlatList";
import WithoutDataView from "components/WithoutDataView";
import WalletService from "services/WalletService";
import { Toast } from "antd-mobile-rn";
import WalletItem from "../WalletItem";

interface Props {
  navigation: any;
}
@observer
export default class BalanceList extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "余额明细",
    headerRight: <View />
  });
  state = {
    data: [],
    loading: false,
    hadMore: false,
    currentPage: 1,
    pageSize: 15,
    total: 0
  };

  constructor(props) {
    super(props);
  }

  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
    // WalletBalanceDetail
  };
  onRefresh = () => {
    if (!this.state.loading) {
      const promise = WalletService.getWalletTradeRows({
        page: 1,
        rows: this.state.pageSize
      });
      this.setState(
        {
          loading: true,
          currentPage: 1
        },
        () => {
          promise
            .then(response => {
              console.log("获取钱包交易列表", response);
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
      let promise = WalletService.getWalletTradeRows({
        page: this.state.currentPage + 1,
        rows: this.state.pageSize
      });
      this.setState(
        {
          loading: true,
          hadMore: false,
          currentPage: this.state.currentPage + 1
        },
        () => {
          promise
            .then(response => {
              console.log("获取钱包交易列表", response);
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
    return <WithoutDataView text="暂无交易数据" />;
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
          <Text style={styles.noMoreBox_text}>暂无更多</Text>
        </View>
      );
    } else {
      return null;
    }
  };
  renderItem = ({ item, separators, index }) => {
    return <WalletItem item={item} navigation={this.props.navigation} />;
  };
  componentDidMount() {
    this.onRefresh();
  }

  render() {
    return (
      <PullFlatList
        style={styles.container}
        data={this.state.data}
        refreshing={this.state.loading}
        hadMore={false}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        renderItem={this.renderItem}
        ListEmptyComponent={this.ListEmptyComponent}
        ListFooterComponent={this.ListFooterComponent}
        initialNumToRender={15}
      />
    );
  }
}

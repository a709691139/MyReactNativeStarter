import React from "react";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import styles from "./styles";
import RefreshableFlatList from "./lib";
import Indicator from "./CustomIndicator";
import IconEntypo from "react-native-vector-icons/Entypo";
import constantStore from "stores/constantStore";
const urlImgEmpty = require("./images/imgEmpty.png");

// 下拉刷新
interface Props {
  data: any[];
  refreshing: boolean;
  hadMore: boolean;
  renderItem: ({ item, separators, index }) => JSX.Element;
  onRefresh?: () => Promise<any>;
  onEndReached?: () => Promise<any> | null;
  style?: any;
  ListEmptyComponent?: () => JSX.Element;
  ListFooterComponent?: (() => JSX.Element) | JSX.Element;
  extraData?: any;
  initialNumToRender?: number;
}
export default class PullFlatList extends React.PureComponent<Props> {
  static defaultProps = {
    data: [],
    currentPage: 1,
    pageSize: 10
  };
  flatList = RefreshableFlatList;
  constructor(props) {
    super(props);
  }
  renderItem = ({ item, separators, index }) => {
    return <Text>{item}</Text>;
  };
  keyExtractor = (item, index) => {
    return index.toString();
  };
  onRefresh = () => {
    // 下拉刷新
    if (!this.props.refreshing) {
      this.setState({
        loading: true
      });
      return this.props.onRefresh().then(() => {
        this.setState({
          loading: false,
          hadMore: false
        });
      });
    }
  };
  onEndReached = () => {
    // console.warn("onEndReached");
    if (this.props.hadMore && !this.props.refreshing) {
      this.setState({
        loading: true
      });
      return this.props.onEndReached().then(() => {
        this.setState({
          loading: false,
          hadMore: false
        });
      });
      // return new Promise(resolve => {
      //   this.setState({
      //     loading: true
      //   });
      //   setTimeout(() => {
      //     this.setState(state => ({
      //       data: this.state.data.concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      //       hadMore: false,
      //       loading: false
      //     }));
      //     resolve();
      //   }, 1500);
      // });
    }
  };

  LoadingComponent = () => {
    return (
      <ActivityIndicator
        size="small"
        color={constantStore.MAIN_COLOR}
        style={styles.indicator}
      />
    );
  };
  ListEmptyComponent = () => {
    return (
      <View style={styles.emptyView}>
        <Image
          style={styles.emptyImage}
          source={urlImgEmpty}
          resizeMode="contain"
        />
        <Text style={styles.emptyText}>暂无数据</Text>
      </View>
    );
  };
  ListFooterComponent = () => {
    if (this.props.data.length) {
      return (
        <Text style={styles.footerText}>
          {this.props.hadMore ? "加载更多" : "已无再多"}
        </Text>
      );
    } else {
      return null;
    }
  };
  render() {
    let listEmptyComponent = null;
    if (this.props.refreshing) {
      listEmptyComponent = this.LoadingComponent();
    } else if (this.props.ListEmptyComponent) {
      listEmptyComponent = this.props.ListEmptyComponent();
    } else {
      listEmptyComponent = this.ListEmptyComponent();
    }
    return (
      <RefreshableFlatList
        style={[styles.container, this.props.style]}
        data={this.props.data}
        renderItem={this.props.renderItem}
        topIndicatorComponent={Indicator}
        bottomIndicatorComponent={false ? Indicator : <View />}
        ref={ref => {
          this.flatList = ref;
        }}
        onRefreshing={this.props.onRefresh}
        onLoadMore={this.props.onEndReached}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={0.2}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={listEmptyComponent}
        ListFooterComponent={
          this.props.ListFooterComponent || this.ListFooterComponent
        }
        refreshing={this.props.refreshing}
        extraData={this.props.extraData || undefined}
        initialNumToRender={this.props.initialNumToRender}
      />
    );
  }
}

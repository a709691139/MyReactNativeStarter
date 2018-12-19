import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import { observer } from "mobx-react";
import { observable, action, toJS } from "mobx";
import { whiteThemeNavigationOptions } from "pages/index";
import HeaderButtons from "components/HeaderButtons";
import { Toast } from "antd-mobile-rn";
import PullFlatList from "components/PullList/PullFlatList";
import WithoutDataView from "components/WithoutDataView";
import ActivityService from "services/ActivityService";
import ExchangeGiftsItem from "./ExchangeGiftsItem";

interface Props {
  navigation: any;
}
@observer
export default class ExchangeGifts extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "积分换礼",
    headerRight: navigation.getParam("headerRight")
  });
  state = {
    data: [
      // {
      //   id: 6,
      //   shopId: 1,
      //   giftName: "阿迪达斯",
      //   usePoints: 10000,
      //   totalCount: 1,
      //   hadGetCount: 0,
      //   setOutCount: 0,
      //   startTime: "2018-08-15 00:00:00",
      //   finishTime: "2018-08-24 23:59:59",
      //   createTime: "2018-08-22 16:00:16",
      //   canEdit: false
      // }
    ] as Array<any>,
    loading: false,
    hadMore: true,
    currentPage: 1,
    pageSize: 10,
    total: 0
  };

  constructor(props) {
    super(props);
    this.props.navigation.setParams({
      headerRight: (
        <HeaderButtons>
          <HeaderButtons.ChildButton
            onPress={() => {
              this.toOtherPage("ActivityPointsExchangeGiftsDetail", {
                mode: "add",
                fnSuccess: this.onRefresh
              });
            }}
          >
            <Text style={styles.headerRightText}>新增</Text>
          </HeaderButtons.ChildButton>
        </HeaderButtons>
      )
    });
  }

  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };

  onRefresh = () => {
    // 下拉刷新
    if (!this.state.loading) {
      let promise = ActivityService.getExchangeGifts({
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
              console.log("积分换礼", response);
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
      let promise = ActivityService.getExchangeGifts({
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
              console.log("积分换礼", response);
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
    return <WithoutDataView text="暂无数据" />;
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
          <Text style={styles.noMoreBox_text}>没有更多</Text>
        </View>
      );
    } else {
      return null;
    }
  };
  renderItem = ({ item, separators, index }) => {
    return (
      <ExchangeGiftsItem
        fnSuccess={this.onRefresh}
        item={item}
        navigation={this.props.navigation}
      />
    );
  };
  componentDidMount() {
    // InteractionManager.runAfterInteractions(() => {
    this.onRefresh();
    // });
  }
  render() {
    return (
      <PullFlatList
        style={styles.container}
        data={this.state.data}
        refreshing={this.state.loading}
        hadMore={this.state.hadMore}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        renderItem={this.renderItem}
        ListEmptyComponent={this.ListEmptyComponent}
        ListFooterComponent={this.ListFooterComponent}
        initialNumToRender={8}
      />
    );
  }
}

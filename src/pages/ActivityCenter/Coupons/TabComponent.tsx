import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import { View, Text } from "react-native";
import { Toast } from "antd-mobile-rn";
import styles from "./styles";
import CouponItem from "./CouponItem";
import PullFlatList from "components/PullList/PullFlatList";
import WithoutDataView from "components/WithoutDataView";
import ActivityService from "services/ActivityService";

interface Props {
  status: string;
  navigation: any;
  couponType?: string; // 优惠券类型：0满减劵，1折扣劵
}

@observer
export default class TabComponent extends React.Component<Props> {
  state = {
    data: [
      // {
      //   id: 132,
      //   shopId: 1,
      //   couponType: 0,
      //   couponName: "满1000元减100元",
      //   minimumConsumption: 1000.0,
      //   cutDownMeney: 100.0,
      //   discount: null,
      //   startTime: "2018-09-22 00:00:00",
      //   finishTime: "2018-09-30 23:59:59",
      //   totalCount: 100,
      //   setOutCount: 0,
      //   type: 1,
      //   activityId: 56,
      //   status: 0,
      //   scopeType: 0,
      //   createTime: "2018-09-06 09:48:35",
      //   productTypeList: null,
      //   productList: null,
      //   operationType: null,
      //   hadReceive: null
      // }
    ],
    loading: false,
    hadMore: false,
    currentPage: 1,
    pageSize: 10
  };

  constructor(props) {
    super(props);
  }
  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  onRefresh = () => {
    if (!this.state.loading) {
      let promise = ActivityService.getActivityCoupons({
        page: 1,
        rows: this.state.pageSize,
        status: this.props.status,
        couponType: this.props.couponType
      });
      this.setState(
        {
          loading: true,
          currentPage: 1
        },
        () => {
          promise
            .then(response => {
              console.log("优惠券", response);
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
      let promise = ActivityService.getActivityCoupons({
        page: this.state.currentPage + 1,
        rows: this.state.pageSize,
        status: this.props.status,
        couponType: this.props.couponType
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
              console.log("优惠券", response);
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
      <CouponItem
        item={item}
        navigation={this.props.navigation}
        fnSuccess={this.onRefresh}
      />
    );
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
        initialNumToRender={this.state.pageSize}
      />
    );
  }
}

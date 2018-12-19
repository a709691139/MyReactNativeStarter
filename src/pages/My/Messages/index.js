import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { View, Text, TouchableOpacity, InteractionManager } from "react-native";
import styles from "./styles";
import { whiteThemeNavigationOptions } from "pages/index";
import PullFlatList from "components/PullList/PullFlatList";
import WithoutDataView from "components/WithoutDataView";
import UserService from "services/UserService";
import { Toast } from "antd-mobile-rn";

@observer
export default class Messages extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "消息中心",
    headerRight: <View />
  });
  state = {
    data: [
      // {
      //   id: 62,
      //   showMessage:
      //     "您于Wed Aug 15 16:24:27 CST 2018提出的提现50元的申请被驳回，原因:test",
      //   title: "提现失败",
      //   messageType: "drawDepositFail",
      //   sendStatus: 1,
      //   remark: null,
      //   createTime: "2018-08-22 15:04:59",
      //   shopId: 1,
      //   userId: 118,
      //   clientId: "",
      //   readStatus: 0,
      //   validStatus: 1,
      //   returnStatusCode: null,
      //   returnMsgId: null,
      //   returnSendNo: null,
      //   returnErrorMessage: null,
      //   returnErrorCode: null,
      //   extendData: null
      // }
    ],
    loading: false,
    hadMore: true,
    currentPage: 1,
    pageSize: 10,
    total: 0
  };
  constructor(props) {
    super(props);
  }

  toOtherPage = (route, params) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  clean = () => {
    Toast.loading("loading", 0);
    UserService.cleanMessages()
      .then(response => {
        console.log("清空消息", response);
        Toast.hide();
        Toast.success("清空成功", 1);
        this.onRefresh();
      })
      .catch(error => {
        Toast.hide();
        console.log(error);
        Toast.info(error.message || error);
      });
  };
  onRefresh = () => {
    // 下拉刷新
    if (!this.state.loading) {
      let promise = UserService.getMessages({
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
              console.log("消息", response);
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
      let promise = UserService.getMessages({
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
              console.log("消息", response);
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
    return <WithoutDataView text="暂无新消息" />;
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
          <Text style={styles.noMoreBox_text}>没有更多消息了</Text>
        </View>
      );
    } else {
      return null;
    }
  };
  renderItem = ({ item, separators, index }) => {
    return (
      <View style={styles.item}>
        <View style={styles.item_titleBox}>
          <Text style={styles.item_title}>{item.title}</Text>
          <Text style={styles.item_time}>{item.createTime}</Text>
        </View>
        <Text style={styles.item_content}>{item.showMessage}</Text>
      </View>
    );
  };
  componentDidMount() {
    // InteractionManager.runAfterInteractions(() => {
    this.onRefresh();
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
          initialNumToRender={8}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.clean}
          style={styles.bottomBtn}
        >
          <Text style={styles.bottomBtn_text}>清空消息</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
import MemberItem from "./MemberItem";
import PullFlatList from "components/PullList/PullFlatList";
import WithoutDataView from "components/WithoutDataView";

interface Props {
  inBlacklist: string;
  name?: string;
  navigation: any;
  memberCenterStore: any;
}

@observer
export default class TabComponent extends React.Component<Props> {
  state = {
    loading: false,
    hadMore: false,
    currentPage: 1,
    pageSize: 5
  };
  listName: string = this.props.inBlacklist == "0" ? "commonList" : "blackList";

  constructor(props) {
    super(props);
  }
  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  onRefresh = () => {
    if (!this.state.loading) {
      let promise = this.props.memberCenterStore.asyncGetList({
        page: 1,
        rows: this.state.pageSize,
        inBlacklist: this.props.inBlacklist
      });
      this.setState(
        {
          loading: true,
          currentPage: 1
        },
        () => {
          promise
            .then(response => {
              this.setState({
                loading: false,
                hadMore: response.length == this.state.pageSize
              });
              this.props.memberCenterStore.changeDataObj({
                [this.listName]: response
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
      let promise = this.props.memberCenterStore.asyncGetList(
        {
          page: this.state.currentPage + 1,
          rows: this.state.pageSize,
          inBlacklist: this.props.inBlacklist
        },
        true
      );
      this.setState(
        {
          loading: true,
          hadMore: false,
          currentPage: this.state.currentPage + 1
        },
        () => {
          promise
            .then(response => {
              this.setState({
                loading: false,
                hadMore: response.length == this.state.pageSize
              });
              this.props.memberCenterStore.changeDataObj({
                [this.listName]: this.props.memberCenterStore[
                  this.listName
                ].concat(response)
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
    if (this.props.memberCenterStore[this.listName].length) {
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
      <MemberItem
        item={item}
        navigation={this.props.navigation}
        memberCenterStore={this.props.memberCenterStore}
      />
    );
  };
  componentDidMount() {
    this.onRefresh();
  }
  render() {
    const list: Array<any> = this.props.memberCenterStore[this.listName];
    // .filter(
    //   v => v.inBlacklist == this.props.inBlacklist
    // );
    return (
      <PullFlatList
        style={styles.container}
        data={list}
        refreshing={this.state.loading}
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

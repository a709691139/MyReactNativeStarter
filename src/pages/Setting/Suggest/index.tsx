import React from "react";
import { observer } from "mobx-react";
import { observable, action, toJS } from "mobx";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  InteractionManager
} from "react-native";
import styles from "./styles";
import { Toast } from "antd-mobile-rn";
import HeaderIconButtons from "components/HeaderIconButtons";
import PullFlatList from "components/PullList/PullFlatList";
import ShopService from "services/ShopService";

interface ResponseListRow {
  id: number;
  feedbackDesc: string;
  feedbackTime: string;
  replyDesc?: string;
  replyTime?: string;
}
interface Response {
  list: ResponseListRow[];
  total: number;
}
interface Props {
  navigation: any;
}
@observer
export default class Password extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "反馈",
    headerRight: navigation.getParam("headerRight", <View />)
  });
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
    const headerRight = (
      <HeaderIconButtons
        list={[
          {
            title: "新增",
            fontName: "Ionicons",
            iconName: "md-add",
            onPress: () => {
              this.toOtherPage("SettingAddSuggest", {
                fnSuccess: this.onRefresh
              });
            }
          }
        ]}
      />
    );
    this.props.navigation.setParams({
      headerRight: headerRight
    });
  }

  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  onRefresh = () => {
    if (!this.state.loading) {
      let promise = ShopService.getMySuggestList({
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
              console.log("获取列表", response);
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
      let promise = ShopService.getMySuggestList({
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
              console.log("获取列表", response);
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
  renderItem = ({ item, separators, index }) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemRow}>
          <View style={styles.itemRow_label}>
            <Text style={styles.itemRow_label_text}>用户反馈</Text>
          </View>
          <Text style={styles.itemRow_right_text}>{item.feedbackDesc}</Text>
        </View>
        {!!item.replyDesc && (
          <View style={[styles.itemRow, styles.itemRow1]}>
            <View style={[styles.itemRow_label, styles.itemRow_label1]}>
              <Text style={styles.itemRow_label_text}>后台回复</Text>
            </View>
            <Text style={styles.itemRow_right_text}>{item.replyDesc}</Text>
          </View>
        )}
        <Text style={styles.itemRow_time}>
          更新于 {item.replyTime || item.feedbackTime}
        </Text>
        <View style={styles.itemBorder} />
      </View>
    );
  };
  componentDidMount() {
    this.onRefresh();
    // InteractionManager.runAfterInteractions(() => {
    //   this.onRefresh();
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
        initialNumToRender={4}
      />
    );
  }
}

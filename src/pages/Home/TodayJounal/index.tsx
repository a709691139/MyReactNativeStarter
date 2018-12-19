import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import { View, Text, AppState } from "react-native";
import { Toast } from "antd-mobile-rn";
import styles from "./styles";
import JournalItem from "pages/Journal/JournalItem";
import moment from "moment";
import ShopService from "services/ShopService";
import WithoutDataView from "components/WithoutDataView";

interface Props {
  navigation: any;
}
export default class TodayJounal extends React.PureComponent<Props, any> {
  state = {
    list: [],
    loading: true,
    pageSize: 10
  };
  timer = null;
  constructor(props) {
    super(props);
  }
  toOtherPage = (route: string, params?: any) => {
    this.props.navigation.navigate(route, params);
  };
  getData = () => {
    this.setState({ loading: true });
    ShopService.getJournalList({
      page: 1,
      rows: this.state.pageSize,
      startTime: moment()
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss"),
      endTime: moment().format("YYYY-MM-DD HH:mm:ss")
    })
      .then(response => {
        console.log("今日流水", response);
        this.setState({
          loading: false,
          list: response.list
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        Toast.fail(error.message || error, 2);
      });
  };

  startRefleshTimer = () => {
    this.stopRefleshTimer();
    this.timer = setInterval(() => {
      this.getData();
    }, 60000);
  };
  stopRefleshTimer = () => {
    this.timer && clearInterval(this.timer);
  };
  _handleAppStateChange = (nextAppState: string) => {
    // console.log("nextAppState", nextAppState);
    if (nextAppState == "active") {
      this.startRefleshTimer();
    } else {
      this.stopRefleshTimer();
    }
  };
  componentDidMount() {
    this.getData();
    this.startRefleshTimer();
    AppState.addEventListener("change", this._handleAppStateChange);
  }
  componentWillUnmount() {
    this.stopRefleshTimer();
    AppState.removeEventListener("change", this._handleAppStateChange);
  }
  render() {
    return (
      <View>
        {this.state.list.map((item, i) => {
          return <JournalItem item={item} key={i} />;
        })}
        {this.state.list.length == this.state.pageSize && (
          <View style={styles.noMoreBox}>
            <View
              style={[styles.noMoreBox_border, styles.noMoreBox_border_left]}
            />
            <View
              style={[styles.noMoreBox_border, styles.noMoreBox_border_right]}
            />
            <Text
              style={styles.noMoreBox_text}
              onPress={() => this.toOtherPage("Journal")}
            >
              查看更多
            </Text>
          </View>
        )}
        {this.state.list.length == 0 &&
          !this.state.loading && <WithoutDataView />}
      </View>
    );
  }
}

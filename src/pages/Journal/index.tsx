import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SectionList,
  TouchableOpacity,
  InteractionManager
} from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import { Button, InputItem, List, Icon, Toast } from "antd-mobile-rn";
import styles from "./styles";
import HeaderIconButtons from "components/HeaderIconButtons";
import Header from "components/Header";
import HeaderButtons from "components/HeaderButtons";
import TotalBox from "./TotalBox";
import JournalItem from "./JournalItem";
import JournalSectionHeader from "./JournalItem/SectionHeader";
import FilterModal from "./FilterModal";
import { whiteThemeNavigationOptions } from "pages/index";
import ShopService from "services/ShopService";
import moment from "moment";

const urlImgFilter = require("images/filter.png");
const urlImgEmpty = require("./assets/imgEmpty.png");

interface ResponseListRow {
  id: number;
  name?: string | null | undefined;
}
interface Response {
  list: ResponseListRow[];
  total: number;
}
interface Props {
  tabIndex?: number;
  navigation: any;
}
@observer
export default class Journal extends React.Component<Props, any> {
  static navigationOptions = ({ navigation }) => ({
    ...whiteThemeNavigationOptions,
    title: "流水账",
    headerRight: (
      <HeaderButtons>
        <HeaderButtons.ChildButton
          onPress={navigation.getParam("setModalVisible", () => {})}
        >
          <Image
            source={urlImgFilter}
            style={{ width: "80%" }}
            resizeMode="center"
          />
        </HeaderButtons.ChildButton>
      </HeaderButtons>
    )
    // headerRight: (
    //   <HeaderIconButtons
    //     list={[
    //       {
    //         title: "add",
    //         fontName: "Feather",
    //         iconName: "filter",
    //         color: "#3D4051",
    //         onPress: () => {
    //           navigation.navigate("Setting");
    //         }
    //       }
    //     ]}
    //   />
    // )
  });
  state = {
    data: [
      // {
      //   key: "1",
      //   title: "2018-07-18",
      //   data: [
      //     {
      //       key: 11,
      //       id: 1,
      //       orderId: 6,
      //       orderCode: "P20180712115807630001",
      //       payCode: "M00000001",
      //       shopId: 1,
      //       buyerUserId: 1,
      //       money: 13,
      //       remark: null,
      //       createTime: "2018-07-13 11:21:09",
      //       payType: 0,
      //       startTime: null,
      //       endTime: null
      //     },
      //   ],
      // },
    ],
    loading: false,
    hadMore: true,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    modalVisible: false,
    startTime: undefined,
    endTime: undefined
  };
  constructor(props) {
    super(props);
    this.props.navigation.setParams({
      setModalVisible: this.setModalVisible
    });
  }
  setModalVisible = () => {
    this.refs["FilterModal"].open();
  };
  changeStartTimeAndEndTime = (startTime, endTime) => {
    this.setState(
      {
        startTime,
        endTime
      },
      () => {
        this.onRefresh();
        this.refs["TotalBox"].getData();
      }
    );
  };
  translateList = (oldList: Array<any>, list: Array<any>) => {
    list.map((v, i) => {
      v.key = v.id.toString();
      let date = moment(v.createTime).format("YYYY-MM-DD");
      let dateList = oldList.map(v => v.title);
      let dateIndex = dateList.indexOf(date);
      if (dateIndex == -1) {
        oldList.push({
          key: date,
          title: date,
          data: [v]
        });
      } else {
        oldList[dateIndex].data.push(v);
      }
    });
    return oldList;
  };
  formatTime(time) {
    if (time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    }
    return null;
  }
  onRefresh = () => {
    if (!this.state.loading) {
      let promise = ShopService.getJournalList({
        page: 1,
        rows: this.state.pageSize,
        startTime: this.formatTime(this.state.startTime),
        endTime: this.formatTime(this.state.endTime),
        sorter: {
          field: "createTime",
          order: "descend"
        },
        data: []
      });
      console.log({
        page: 1,
        rows: this.state.pageSize,
        startTime: this.formatTime(this.state.startTime),
        endTime: this.formatTime(this.state.endTime)
      });
      this.setState(
        {
          loading: true,
          currentPage: 1
        },
        () => {
          promise
            .then((response: Response) => {
              console.log("流水", response);
              this.setState({
                loading: false,
                hadMore: response.list.length == this.state.pageSize,
                total: response.total,
                data: this.translateList([], response.list)
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
      let promise = ShopService.getJournalList({
        page: this.state.currentPage + 1,
        rows: this.state.pageSize,
        startTime: this.formatTime(this.state.startTime),
        endTime: this.formatTime(this.state.endTime),
        sorter: {
          field: "createTime",
          order: "descend"
        }
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
              console.log("流水", response);
              this.setState({
                loading: false,
                hadMore: response.list.length == this.state.pageSize,
                total: response.total,
                data: this.translateList(this.state.data, response.list)
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

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.onRefresh();
    });
  }
  ListEmptyComponent = () => {
    return (
      <View style={styles.emptyView}>
        <Image
          style={styles.emptyImage}
          source={urlImgEmpty}
          resizeMode="contain"
        />
        <Text style={styles.emptyText}>您没有相关流水</Text>
      </View>
    );
  };
  renderItem = ({ item, index }) => {
    return <JournalItem item={item} />;
  };
  renderSectionHeader = ({ section }) => {
    return <JournalSectionHeader section={section} />;
  };
  render() {
    return (
      <View style={styles.container}>
        <TotalBox ref="TotalBox" />
        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          sections={this.state.data}
          ListEmptyComponent={this.ListEmptyComponent}
          onEndReached={this.onEndReached}
          onRefresh={this.onRefresh}
          onEndReachedThreshold={0.2}
          refreshing={this.state.loading}
          stickySectionHeadersEnabled={true}
          initialNumToRender={10}
        />
        <FilterModal
          ref="FilterModal"
          fnSuccess={this.changeStartTimeAndEndTime}
        />
      </View>
    );
  }
}

// <Header
//           {...Journal.navigationOptions({ navigation: this.props.navigation })}
//         />

import React from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  InteractionManager,
  Platform
} from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import { Tabs, Toast } from "antd-mobile-rn";
import styles from "./styles";
import TabComponent from "./TabComponent";
import FilterModal from "./FilterModal";
import dictionaryStore from "stores/dictionaryStore";
import goodsStore from "stores/goodsStore";
const urlImgSearch = require("images/icon_search.png");
const urlImgFilter = require("images/filter.png");
const urlImgEdit = require("images/icon_edit.png");
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// 接收路由参数  mode: sale 销售 || store 仓库 || price 只能改价格
interface Props {
  navigation: any;
}
export default class Goods extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "商品",
    headerRight: <View />
  });
  initialPage = 0;
  mode = null;
  state = {
    page: 0,
    searchWord: "",
    goodTypeId: ""
  };
  TabComponents = [];
  constructor(props) {
    super(props);
    this.mode = this.props.navigation.getParam("mode", null);
    if (Platform.OS == "ios") {
      this.state.page = this.getRouteTabIndex();
    }
    // console.warn(this.mode, this.initialPage);
  }
  getRouteTabIndex = () => {
    return this.mode == "store" ? 1 : 0;
  };
  toOtherPage = (route: string, params?: any) => {
    this.props.navigation.navigate(route, params);
  };
  onChangePage = (tab, index) => {
    this.setState({
      page: index
    });
  };
  changeSearchWord = (searchWord: string) => {
    this.setState(
      {
        searchWord
      },
      () => {}
    );
  };
  changeGoodTypeId = (goodTypeId: string) => {
    this.setState(
      {
        goodTypeId
      },
      () => {
        this.submit();
      }
    );
  };
  openFilterModal = () => {
    this.refs["FilterModal"].open();
  };
  submit = () => {
    goodsStore.getGoodRows(true);
  };
  componentDidMount() {
    this.setState({
      page: this.getRouteTabIndex()
    });
    InteractionManager.runAfterInteractions(() => {
      if (!goodsStore.types.length) {
        goodsStore.getTypes();
      }
      if (!goodsStore.list.length) {
        goodsStore.getGoodRows(true).catch(error => {
          console.log(error);
          Toast.fail(error.message || error, 2);
        });
      }
    });
  }
  render() {
    const tabs = [
      { title: "销售中", salesStatus: "1" },
      { title: "仓库中", salesStatus: "0" }
    ];
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <View style={styles.searchBar_inputBox}>
            <Image
              source={urlImgSearch}
              style={styles.searchBar_icon}
              resizeMode="contain"
            />
            <TextInput
              style={styles.searchBar_input}
              value={this.state.searchWord}
              onChangeText={this.changeSearchWord}
              underlineColorAndroid="transparent"
              placeholderTextColor="#999999"
              placeholder="搜索商品名称"
              onSubmitEditing={this.submit}
            />
            {!!this.state.searchWord && (
              <MaterialIcons
                name="cancel"
                size={25}
                color="#9A9A9A"
                onPress={() => this.changeSearchWord("")}
              />
            )}
          </View>
          {/* <Text>goodTypeId: {this.state.goodTypeId}</Text> */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.searchBar_btn}
            onPress={this.openFilterModal}
          >
            <Image style={styles.searchBar_btn_img} source={urlImgFilter} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.searchBar_btn}
            onPress={() => this.toOtherPage("MultiEditGoods")}
          >
            <Image style={styles.searchBar_btn_img} source={urlImgEdit} />
          </TouchableOpacity>
        </View>
        <Tabs
          page={this.state.page}
          onChange={this.onChangePage}
          tabs={tabs}
          tabBarPosition="top"
          swipeable={false}
          tabBarInactiveTextColor="#666666"
          tabBarActiveTextColor={MAIN_COLOR}
          tabBarUnderlineStyle={{
            backgroundColor: MAIN_COLOR,
            transform: [{ scaleX: 0.3 }]
          }}
          prerenderingSiblingsNumber={0}
        >
          {tabs.map((v, i) => {
            return (
              <TabComponent
                ref={ref => (this.TabComponents[i] = ref)}
                key={i}
                salesStatus={v.salesStatus}
                name={this.state.searchWord}
                productTypeId={this.state.goodTypeId}
                navigation={this.props.navigation}
                isRefleshOnMount={false}
                mode={this.mode}
              />
            );
          })}
        </Tabs>
        <FilterModal
          ref="FilterModal"
          fnSuccess={this.changeGoodTypeId}
          type={this.state.goodTypeId}
        />
      </View>
    );
  }
}

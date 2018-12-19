import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput
} from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import { Toast } from "antd-mobile-rn";
import styles from "./styles";
import { whiteThemeNavigationOptions } from "pages/index";
import IconIonicon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EStyleSheet from "react-native-extended-stylesheet";
import GoodItem from "../GoodItem";
import WithoutDataView from "components/WithoutDataView";
import goodsStore from "stores/goodsStore";
const urlImgSearch = require("images/icon_search.png");

interface navigationParams {
  selectedKeys?: Array<number | string>; // 选中的array
  fnSuccess: (array) => void;
}
interface Props {
  navigation: any;
}
export default class SelectGoods extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "选择商品",
    headerRight: <View />
  });
  state = {
    searchWord: "",
    selectIds: [],
    refreshing: false
  };
  constructor(props) {
    super(props);
    this.state.selectIds = this.props.navigation
      .getParam("selectedKeys", [])
      .map(v => {
        return parseInt(v);
      });
  }

  onChangeSelected = (selected: boolean, item: any) => {
    let selectIds: Array<any> = this.state.selectIds.concat();
    let index: number = selectIds.indexOf(parseInt(item.id));
    if (selected) {
      if (index == -1) {
        selectIds.push(parseInt(item.id));
      }
    } else {
      selectIds.splice(index, 1);
    }
    this.setState({
      selectIds
    });
  };
  changeSearchWord = (searchWord: string) => {
    this.setState({
      searchWord
    });
  };
  toggleAllSelected = (bool: boolean) => {
    this.setState({
      selectIds: bool ? goodsStore.list.map(v => v.id) : []
    });
  };
  checkCanSubmit = () => {
    if (this.state.selectIds.length) {
      return true;
    } else {
      Toast.info("请先选中要操作的商品", 1);
      return false;
    }
  };
  submit = () => {
    if (this.state.selectIds.length != 0) {
      let array: Array<any> = goodsStore.list.filter(
        v => this.state.selectIds.indexOf(v.id) != -1
      );
      this.props.navigation.getParam("fnSuccess")(array);
      this.props.navigation.goBack();
    } else {
      Toast.info("请先选择至少一个选项");
    }
  };
  onRefresh = () => {
    this.setState({
      refleshing: true
    });
    goodsStore
      .getGoodRows(true)
      .then((list: Array<any>) => {
        console.log("then", list);
        this.setState({
          refleshing: false,
          list: list.concat()
        });
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
        goodsStore.changeDataObj({
          loadingList: false
        });
      });
  };
  componentDidMount() {
    if (!goodsStore.list.length) {
      this.onRefresh();
    }
  }
  ListEmptyComponent = () => {
    return <WithoutDataView text="您没有相关商品" />;
  };
  render() {
    let allSelected = goodsStore.list.length == this.state.selectIds.length;
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
        </View>
        <FlatList
          refreshing={this.state.refreshing}
          extraData={this.state}
          data={goodsStore.list.filter(
            v => v.name.indexOf(this.state.searchWord) != -1
          )}
          renderItem={({ item }) => (
            <GoodItem
              item={item}
              navigation={this.props.navigation}
              isSelectMode={true}
              selected={this.state.selectIds.indexOf(item.id) != -1}
              onChangeSelected={this.onChangeSelected}
            />
          )}
          ListEmptyComponent={this.ListEmptyComponent}
        />
        <View style={styles.bottomBox}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bottomBox_allSelectBtn}
            onPress={() => this.toggleAllSelected(!allSelected)}
          >
            <IconIonicon
              name={
                allSelected ? "ios-radio-button-on" : "ios-radio-button-off"
              }
              color={allSelected ? MAIN_COLOR : "#999999"}
              size={40 * EStyleSheet.value("$scale")}
            />
            <Text style={styles.bottomBox_allSelectBtn_text}>
              已选(
              {this.state.selectIds.length})
            </Text>
          </TouchableOpacity>
          <View style={styles.bottomBox_flex}>
            <TouchableOpacity
              style={styles.bottomBox_btn}
              activeOpacity={0.8}
              onPress={this.submit}
            >
              <Text style={styles.bottomBox_btn_text}>选择</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

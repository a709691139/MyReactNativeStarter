import React from "react";
import { observer } from "mobx-react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput
} from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import { Toast } from "antd-mobile-rn";
import styles from "./styles";
import { whiteThemeNavigationOptions } from "pages/index";
import Header from "components/Header";
import IconIonicon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EStyleSheet from "react-native-extended-stylesheet";
import WithoutDataView from "components/WithoutDataView";
import goodsStore from "stores/goodsStore";
import SelectGoodTypeItem from "./SelectGoodTypeItem";
const urlImgSearch = require("images/icon_search.png");

interface navigationParams {
  selectedKeys?: Array<number | string>; // 选中的array
  fnSuccess: (array) => void;
}
interface Props {
  navigation: any;
}
@observer
export default class SelectGoodTypes extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null
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
      selectIds: bool ? goodsStore.types.map(v => v.id) : []
    });
  };
  checkCanSubmit = () => {
    if (this.state.selectIds.length) {
      return true;
    } else {
      Toast.info("请先选中要操作的", 1);
      return false;
    }
  };
  onRefresh = () => {
    goodsStore
      .getTypes()
      .then(response => {
        console.log("获取商品分类列表");
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
      });
  };
  submit = () => {
    if (this.state.selectIds.length != 0) {
      let array: Array<any> = goodsStore.types.filter(
        v => this.state.selectIds.indexOf(v.id) != -1
      );
      this.props.navigation.getParam("fnSuccess")(array);
      this.props.navigation.goBack();
    } else {
      Toast.info("请先选择至少一个选项");
    }
  };
  componentDidMount() {
    if (!goodsStore.types.length) {
      this.onRefresh();
    }
  }
  ListEmptyComponent = () => {
    return <WithoutDataView text="暂无数据" />;
  };
  render() {
    let allSelected = goodsStore.types.length == this.state.selectIds.length;
    return (
      <View style={styles.container}>
        <Header
          {...whiteThemeNavigationOptions}
          headerStyle={{
            ...whiteThemeNavigationOptions.headerStyle,
            borderBottomWidth: 0
          }}
          title={
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
          }
        />
        <Text style={styles.title}>选择分类</Text>
        <FlatList
          refreshing={this.state.refreshing}
          extraData={this.state}
          data={goodsStore.types.filter(
            v => v.name.indexOf(this.state.searchWord) != -1
          )}
          renderItem={({ item }) => (
            <SelectGoodTypeItem
              item={item}
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

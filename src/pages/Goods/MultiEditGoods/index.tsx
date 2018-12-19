import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import { Toast, Modal } from "antd-mobile-rn";
import styles from "./styles";
import { whiteThemeNavigationOptions } from "pages/index";
import HeaderButtons from "components/HeaderButtons";
import IconIonicon from "react-native-vector-icons/Ionicons";
import EStyleSheet from "react-native-extended-stylesheet";
import GoodItem from "../GoodItem";
import WithoutDataView from "components/WithoutDataView";
import goodsStore from "stores/goodsStore";
import GoodsService from "services/GoodsService";

interface Props {
  navigation: any;
}
export default class MultiEditGoods extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "批量操作",
    headerLeft: <View />,
    headerRight: (
      <HeaderButtons>
        <HeaderButtons.ChildButton
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.headerRightText}>完成</Text>
        </HeaderButtons.ChildButton>
      </HeaderButtons>
    )
  });
  state = {
    selectIds: [],
    list: [],
    refreshing: false
  };
  constructor(props) {
    super(props);
  }

  onChangeSelected = (selected, item) => {
    let selectIds = this.state.selectIds.concat();
    let index = selectIds.indexOf(item.id);
    if (selected) {
      if (index == -1) {
        selectIds.push(item.id);
      }
    } else {
      selectIds.splice(index, 1);
    }
    this.setState({
      selectIds
    });
  };
  toggleAllSelected = (bool: boolean) => {
    this.setState({
      selectIds: bool ? this.state.list.map(v => v.id) : []
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
  updateGoodsStatus = (bool: boolean) => {
    if (!this.checkCanSubmit()) {
      return;
    }
    let status: number = bool ? 1 : 0;
    Toast.loading("提交中..");
    GoodsService.updateGoodsStatus(this.state.selectIds, status)
      .then(response => {
        Toast.success("修改成功", 1);
        this.setState({
          selectIds: []
        });
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
      });
  };
  deleteGoods = () => {
    if (!this.checkCanSubmit) {
      return;
    }
    Toast.loading("提交中..");
    Modal.alert("确定删除?", "删除后不能恢复", [
      {
        text: "取消",
        onPress: () => {},
        style: "default"
      },
      {
        text: "确定",
        onPress: () => {
          GoodsService.deleteGoodsByIds(this.state.selectIds)
            .then(response => {
              Toast.success("删除成功", 1);
              this.setState({
                selectIds: []
              });
              this.componentDidMount();
            })
            .catch(error => {
              console.log(error);
              Toast.fail(error.message || error, 2);
            });
        }
      }
    ]);
  };
  componentDidMount() {
    this.setState({
      refleshing: true,
      list: goodsStore.list.concat()
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
    // let list = [];
    // for (let i = 0; i < 3; i++) {
    //   let num = Math.random();
    //   list.push({
    //     key: num.toString(),
    //     id: num,
    //     name: num,
    //     type: parseInt(Math.random() * 1) + 1
    //   });
    // }
    // this.setState({
    //   list,
    //   selectIds: list.map(v => v.id)
    // });
  }
  ListEmptyComponent = () => {
    return <WithoutDataView text="您没有相关商品" />;
  };
  render() {
    let allSelected = this.state.list.length == this.state.selectIds.length;
    return (
      <View style={styles.container}>
        <FlatList
          refreshing={this.state.refreshing}
          extraData={this.state}
          data={this.state.list}
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
            <Text style={styles.bottomBox_allSelectBtn_text}>全选</Text>
          </TouchableOpacity>
          <View style={styles.bottomBox_flex}>
            <TouchableOpacity
              style={styles.bottomBox_btn}
              activeOpacity={0.8}
              onPress={() => this.updateGoodsStatus(true)}
            >
              <Text style={styles.bottomBox_btn_text}>上架</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomBox_btn}
              activeOpacity={0.8}
              onPress={() => this.updateGoodsStatus(false)}
            >
              <Text style={styles.bottomBox_btn_text}>下架</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomBox_btn}
              activeOpacity={0.8}
              onPress={this.deleteGoods}
            >
              <Text style={styles.bottomBox_btn_text}>删除商品</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

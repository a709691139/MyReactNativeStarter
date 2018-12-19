import React from "react";
import { View, Text, TouchableOpacity, InteractionManager } from "react-native";
import { observer } from "mobx-react";
import styles from "./styles";
import EStyleSheet from "react-native-extended-stylesheet";

import goodsStore from "stores/goodsStore";
import { whiteThemeNavigationOptions } from "pages/index";
import WithoutDataView from "components/WithoutDataView";
import { Toast, Modal } from "antd-mobile-rn";
import HeaderButtons from "components/HeaderButtons";
import { SwipeListView } from "react-native-swipe-list-view";

interface Props {
  navigation: any;
}
@observer
export default class GoodsType extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "商品分类",
    headerRight: (
      <HeaderButtons>
        <HeaderButtons.ChildButton
          onPress={() => {
            navigation.navigate("GoodsTypeDetail", { mode: "add" });
          }}
        >
          <Text style={styles.headerRightText}>新增</Text>
        </HeaderButtons.ChildButton>
      </HeaderButtons>
    )
  });

  state = {
    loading: false,
    hadMore: true
  };
  constructor(props) {
    super(props);
  }

  toOtherPage = (route, params) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };

  deleteRow = (item: any) => {
    Modal.alert("删除" + item.name, "删除后无法恢复", [
      {
        text: "取消",
        onPress: () => {}
      },
      {
        text: "确定",
        onPress: () => {
          Toast.loading("loading..");
          goodsStore
            .asynDeleteType(item.id)
            .then(() => {
              Toast.info("删除成功");
            })
            .catch(error => {
              console.log(error);
              Toast.fail(error.message || error, 2);
            });
        }
      }
    ]);
  };

  onRefresh = () => {
    // 下拉刷新
    if (!this.state.loading) {
      const promise = goodsStore.getTypes();
      this.setState(
        {
          loading: true
        },
        () => {
          promise
            .then(response => {
              console.log("获取商品分类列表");
              this.setState({
                loading: false
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
    return new Promise((resolve, reject) => {
      resolve();
    });
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      // if (!goodsStore.types.length) {
      this.onRefresh();
      // }
    });
  }
  ListEmptyComponent = () => {
    return <WithoutDataView text="暂无商品分类，请点击右上角新增按钮" />;
  };
  ListFooterComponent = () => {
    return null;
  };
  renderItem = ({ item, separators, index }) => {
    return (
      <View style={styles.item}>
        <Text
          style={styles.item_text}
          onPress={() => {
            this.toOtherPage("GoodsTypeDetail", {
              id: item.id,
              mode: "edit"
            });
          }}
        >
          {item.name}
        </Text>
      </View>
    );
  };
  renderHiddenItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.rowBack}
        onPress={() => this.deleteRow(item)}
      >
        <Text style={styles.rowBack_text}>删除</Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <SwipeListView
        useFlatList
        refreshing={this.state.loading}
        style={styles.list}
        data={goodsStore.types.concat()}
        renderItem={this.renderItem}
        renderHiddenItem={this.renderHiddenItem}
        disableRightSwipe={true}
        rightOpenValue={(-EStyleSheet.value("$px") * 120) / 2}
        ListEmptyComponent={this.ListEmptyComponent}
        ListFooterComponent={this.ListFooterComponent}
        initialNumToRender={15}
      />
    );
    // return (
    //   <View style={styles.container}>
    //     <PullFlatList
    //       style={styles.list}
    //       data={goodsStore.types.concat()}
    //       refreshing={this.state.loading}
    //       hadMore={this.state.hadMore}
    //       onRefresh={this.onRefresh}
    //       onEndReached={this.onEndReached}
    //       renderItem={this.renderItem}
    //       ListEmptyComponent={this.ListEmptyComponent}
    //       ListFooterComponent={this.ListFooterComponent}
    //     />
    //   </View>
    // );
  }
}

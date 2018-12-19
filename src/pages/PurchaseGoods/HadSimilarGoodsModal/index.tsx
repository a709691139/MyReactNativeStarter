import React from "react";

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  Platform
} from "react-native";
import styles from "./styles";
import { Modal } from "antd-mobile-rn";
import { translateImageUrl } from "utils/CommonUtils";

interface Props {
  navigation: any;
}
export default class HadSimilarGoodsModal extends React.PureComponent<
  Props,
  any
> {
  modal = null;
  state = {
    visible: false,
    goodList: [],
    goodsName: "",
    barCode: ""
  };
  fnToAddGoodDetail: Function = null;
  constructor(props) {
    super(props);
  }
  open = (
    goodList: Array<any>,
    barCode: string,
    goodsName: string,
    fnToAddGoodDetail: Function
  ) => {
    this.setState({
      visible: true,
      goodList: goodList,
      goodsName: goodsName,
      barCode: barCode
    });
    this.fnToAddGoodDetail = fnToAddGoodDetail;
  };
  close = (fnAfterClose?: Function) => {
    this.setState(
      {
        visible: false,
        goodList: [],
        goodsName: "",
        barCode: ""
      },
      () => {
        fnAfterClose && fnAfterClose();
      }
    );
  };
  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  fnClick = (item: any) => {
    const list: Array<any> = [
      {
        text: "补货",
        onPress: () => {
          this.close();
          this.toOtherPage("GoodDetail", {
            mode: "replenish",
            id: item.id
          });
        }
      },
      {
        text: "编辑",
        onPress: () => {
          this.close();
          this.toOtherPage("GoodDetail", { mode: "edit", id: item.id });
        }
      }
    ];
    if (Platform.OS == "android") {
      Modal.operation(list);
    } else {
      this.close();
      setTimeout(() => {
        Modal.operation(list);
      }, 800);
    }
  };
  renderItem = ({ item, separators, index }) => {
    return (
      <TouchableHighlight
        underlayColor="#f5f5f5"
        onPress={() => this.fnClick(item)}
      >
        <View style={styles.container}>
          <View style={styles.imageView}>
            <Image
              style={styles.imageView_img}
              resizeMode="center"
              source={translateImageUrl(item.imgUrl)}
            />
          </View>
          <View style={styles.centerView}>
            <Text style={styles.centerView_text1}>{item.name}</Text>
            <Text style={styles.centerView_text2}>
              库存
              {item.inventoryNum}
              {item.unit ? item.unit : "个"}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  render() {
    return (
      <Modal
        visible={this.state.visible}
        transparent
        maskClosable={false}
        onClose={this.close}
        title="检测到有类似名称或者同样条形码的已有商品"
        popup={true}
        footer={[
          {
            text: "取消",
            onPress: () => {
              this.close();
            }
          },
          {
            text: "继续入货",
            onPress: () => {
              this.close();
              this.fnToAddGoodDetail && this.fnToAddGoodDetail();
            }
          }
        ]}
      >
        <Text style={styles.title}>
          名称：
          {this.state.goodsName}（{this.state.barCode}）
        </Text>
        <FlatList
          style={styles.flatList}
          data={this.state.goodList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          initialNumToRender={5}
        />
      </Modal>
    );
  }
}

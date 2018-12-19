import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  InteractionManager,
  Linking,
  Platform
} from "react-native";
import { observer } from "mobx-react";
import styles from "./styles";
import goodsStore from "stores/goodsStore";
import { whiteThemeNavigationOptions } from "pages/index";
import PullFlatList from "components/PullList/PullFlatList";
import WithoutDataView from "components/WithoutDataView";
import { Toast, Modal } from "antd-mobile-rn";
import LinearGradient from "react-native-linear-gradient";
import { translateImageUrl } from "utils/CommonUtils";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const urlIconCall = require("./assets/bg_paonandianhua.png");
const urlIconMore = require("images/img_gengduo.png");
const urlImgSearch = require("images/icon_search.png");
import HeaderButtons from "components/HeaderButtons";

interface Props {
  navigation: any;
}
@observer
export default class GoodsProvider extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "供应商",
    headerRight: (
      <HeaderButtons>
        <HeaderButtons.ChildButton
          onPress={() => {
            navigation.navigate("GoodsProviderDetail", { mode: "add" });
          }}
        >
          <Text style={styles.headerRightText}>新增</Text>
        </HeaderButtons.ChildButton>
      </HeaderButtons>
    )
  });

  state = {
    searchWord: "",
    loading: false,
    hadMore: true,
    currentPage: 1,
    pageSize: 10
  };
  constructor(props) {
    super(props);
  }

  toOtherPage = (route, params) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  changeSearchWord = (searchWord: string) => {
    this.setState(
      {
        searchWord
      },
      () => {}
    );
  };
  onSelect = (value: any) => {
    this.setState({
      // visible: false,
      selected: value
    });
  };

  callPhone = (phone: string) => {
    Linking.canOpenURL("tel" + ":" + phone)
      .then(supported => {
        if (!supported) {
          Toast.info("手机不支持" + "tel", 1);
        } else {
          return Linking.openURL("tel" + ":" + phone);
        }
      })
      .catch(err => {
        Toast.info("号码无效" + phone, 1);
        console.warn("An error occurred", err);
      });
  };
  showActionSheet = (providerId: number) => {
    Modal.operation([
      {
        text: "编辑",
        onPress: () => {
          this.toOtherPage("GoodsProviderDetail", {
            id: providerId,
            mode: "edit"
          });
        }
      },
      {
        text: "删除",
        onPress: () => {
          Modal.alert("删除此供应商", "删除后无法恢复", [
            {
              text: "取消",
              onPress: () => {}
            },
            {
              text: "确定",
              onPress: () => {
                Toast.loading("loading..");
                goodsStore
                  .asynDeleteProvider(providerId)
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
        }
      }
    ]);
  };
  onRefresh = () => {
    // 下拉刷新
    if (!this.state.loading) {
      const promise = goodsStore.getProviderList();
      this.setState(
        {
          loading: true,
          currentPage: 1
        },
        () => {
          promise
            .then(response => {
              console.log("获取供应商列表");
              this.setState({
                loading: false,
                hadMore: false
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
      if (!goodsStore.providerList.length) {
        this.onRefresh();
      }

      // setInterval(() => {
      // this.refs["Popover"].menuContextRef.toggleMenu("m");
      // }, 2000);
    });
  }
  ListEmptyComponent = () => {
    return <WithoutDataView text="暂无供应商，请点击右上角新增按钮" />;
  };
  ListFooterComponent = () => {
    return null;
  };
  renderItem = ({ item, separators, index }) => {
    return (
      <View style={styles.item}>
        <View style={styles.item_topBox}>
          <View style={styles.titleBox}>
            <Text style={styles.titleBox_title}>{item.name}</Text>
            <View style={styles.titleBox_row}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#E9374D", "#E97E37"]}
                style={styles.titleBox_linearGradient}
              >
                <Text style={styles.titleBox_linearGradient_text}>联系人</Text>
              </LinearGradient>
              <Text style={styles.titleBox_row_text}>{item.contacts}</Text>
              <Text style={styles.titleBox_row_text}>{item.phone}</Text>
            </View>
          </View>
          <View style={styles.titleBox_rightBox}>
            {!!item.phone && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.callPhone(item.phone)}
              >
                <Image
                  source={urlIconCall}
                  style={styles.titleBox_rightBox_btn}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.showActionSheet(item.id)}
            >
              <Image
                source={urlIconMore}
                style={styles.titleBox_rightBox_btn}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item_imgsBox}>
          {!!item.productImgUrls &&
            item.productImgUrls.split(",").map((v, i) => {
              return (
                <Image
                  key={i}
                  source={translateImageUrl(v)}
                  style={styles.item_imgsBox_img}
                />
              );
            })}
        </View>
        {!!item.remark && (
          <View style={styles.remarkBox}>
            <Text style={styles.remarkBox_text}>
              备注：
              {item.remark}
            </Text>
          </View>
        )}
      </View>
    );
  };
  render() {
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
              placeholder="搜索供应商、联系人或电话"
            />
            {!!this.state.searchWord && (
              <MaterialIcons
                name="cancel"
                size={30}
                color="#9A9A9A"
                onPress={() => this.changeSearchWord("")}
              />
            )}
          </View>
        </View>

        <PullFlatList
          style={styles.list}
          data={goodsStore.providerList.filter(v => {
            return (
              v.name.indexOf(this.state.searchWord) != -1 ||
              v.phone.indexOf(this.state.searchWord) != -1 ||
              v.contacts.indexOf(this.state.searchWord) != -1
            );
          })}
          refreshing={this.state.loading}
          hadMore={this.state.hadMore}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          renderItem={this.renderItem}
          ListEmptyComponent={this.ListEmptyComponent}
          ListFooterComponent={this.ListFooterComponent}
          initialNumToRender={8}
        />
      </View>
    );
  }
}

/* 
<Popover
              name={"m" + index}
              ref={"Popover" + index}
              style={{ backgroundColor: "#eee", height: 150 }}
              overlay={[
                <Popover.Item
                  key="6"
                  value="button ct"
                  style={{ backgroundColor: "#efeff4" }}
                >
                  <Text>关闭</Text>
                </Popover.Item>
              ]}
              contextStyle={styles.contextStyle}
              overlayStyle={[
                styles.overlayStyle,
                Platform.OS === "android" && styles.androidOverlayStyle
              ]}
              triggerStyle={styles.triggerStyle}
              onSelect={this.onSelect}
            >
              <Image
                source={urlIconMore}
                style={styles.titleBox_rightBox_btn}
              />
            </Popover> */

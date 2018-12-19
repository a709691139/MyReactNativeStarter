import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import constantStore from "stores/constantStore";
import {
  Button,
  InputItem,
  List,
  Icon,
  ActionSheet,
  Toast,
  Modal
} from "antd-mobile-rn";
import styles from "./styles";
import EStyleSheet from "react-native-extended-stylesheet";
import ScanCameraModal from "components/ScanCameraModal";
import SYImagePicker from "react-native-syan-image-picker";
import { whiteThemeNavigationOptions } from "pages/index";
import GoodsFlatList from "./GoodsFlatList";
import Ionicons from "react-native-vector-icons/Ionicons";
import GoodsService from "services/GoodsService";
import goodsStore from "stores/goodsStore";
import HadSimilarGoodsModal from "./HadSimilarGoodsModal";

const urlImgScan = require("./assets/icon_saoma.png");
const urlImgPhoto = require("./assets/icon_paizhao.png");

interface Props {
  navigation: any;
}

@observer
export default class PurchaseGoods extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "入货",
    headerRight: <View />
  });
  state = {
    photos: [],
    list: [{}]
  };

  constructor(props) {
    super(props);
  }
  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  openScanCameraModal = () => {
    this.refs["ScanCameraModal"].open();
  };
  handleScanSuccess = (barCode: string) => {
    console.log("扫码成功", barCode);
    this.refs["ScanCameraModal"].close();
    Toast.loading("扫码成功，加载中..", 0);
    GoodsService.getProductTemplateByBarcode(barCode)
      .then(response => {
        console.log("扫码获取商品", response);
        Toast.hide();
        //  检测是否有类似名称或者同样barCode的已有商品
        let list: Array<any> = goodsStore.list.filter((v, i) => {
          return (
            v.barCode == barCode || v.name.indexOf(response.goodsName) != -1
          );
        });
        const fnToAddGoodDetail = () => {
          this.toOtherPage("GoodDetail", {
            mode: "add",
            barCode: barCode,
            name: response.goodsName,
            productOptionalImageUrls:
              response.productOptionalImageUrls.concat(
                response.productOptionalImageUrls
              ) || null
          });
        };
        if (list.length) {
          this.refs["HadSimilarGoodsModal"].open(
            list,
            barCode,
            response.goodsName,
            fnToAddGoodDetail
          );
        } else {
          fnToAddGoodDetail();
        }
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
      });
  };
  showActionSheet = () => {
    const CropW: number = parseInt(constantStore.SCREEN_WIDTH * 0.9);
    const CropH: number = CropW;
    Modal.operation([
      {
        text: "拍照",
        onPress: () => {
          setTimeout(() => {
            SYImagePicker.openCamera(
              {
                isCrop: true,
                showCropCircle: false,
                showCropFrame: false,
                CropW,
                CropH
              },
              (err, photos) => {
                console.log(err, photos);
                if (!err) {
                  this.setState({
                    photos: [...this.state.photos, ...photos]
                  });
                  this.toOtherPage("GoodDetail", {
                    mode: "add",
                    photo: photos[0]
                  });
                }
              }
            );
          }, 800);
        }
      },
      {
        text: "相册",
        onPress: () => {
          setTimeout(() => {
            SYImagePicker.asyncShowImagePicker({
              imageCount: 1,
              enableBase64: false,
              isCrop: true,
              showCropCircle: false,
              CropW,
              CropH
            })
              .then(photos => {
                console.log(photos);
                const arr = photos.map(v => {
                  return { ...v, enableBase64: false };
                });
                // 选择成功
                this.setState({
                  photos: [...this.state.photos, ...arr]
                });
                this.toOtherPage("GoodDetail", {
                  mode: "add",
                  photo: photos[0]
                });
              })
              .catch(err => {
                // 取消选择，err.message为"取消"
              });
          }, 800);
        }
      }
    ]);
  };
  componentDidMount() {
    // setTimeout(() => {
    //   // this.handleScanSuccess("6923450659441");
    //   let barCode = "6923450659441";
    //   let goodsName = "蛋糕";
    //   let list: Array<any> = goodsStore.list.filter((v, i) => {
    //     return v.barCode == barCode || v.name.indexOf(goodsName) != -1;
    //   });
    //   this.refs["HadSimilarGoodsModal"].open(list, barCode, goodsName);
    // }, 1000);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cameraBtnBox}>
          <TouchableOpacity
            style={styles.cameraBtnBox_btn}
            activeOpacity={0.8}
            onPress={this.openScanCameraModal}
          >
            <Image source={urlImgScan} style={styles.cameraBtnBox_btn_img} />
            <Text style={styles.cameraBtnBox_btn_text}>扫码上货</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cameraBtnBox_btn}
            activeOpacity={0.8}
            onPress={this.showActionSheet}
          >
            <Image source={urlImgPhoto} style={styles.cameraBtnBox_btn_img} />
            <Text style={styles.cameraBtnBox_btn_text}>拍照/图片</Text>
          </TouchableOpacity>
        </View>
        {/* <Button
          onClick={() => {
            this.props.navigation.navigate("GoodDetail", {
              mode: "add",
              photo:
                "http://memberpic.114my.cn/dgjunchang/uploadfile/image/20160714/20160714101033_134239514.jpg"
            });
          }}
        >
          直接新增
        </Button> */}
        <View style={styles.marginBox} />

        <View style={styles.shopHeader}>
          <View style={styles.shopHeader_left}>
            <Text style={styles.shopHeader_left_text1}>入货商品</Text>
            <Text style={styles.shopHeader_left_text2}>
              本次已入
              <Text style={styles.shopHeader_red}>
                {goodsStore.newAddGoodList.length}
              </Text>
              种商品，库存共计
              <Text style={styles.shopHeader_red}>
                {goodsStore.newAddGoodList.reduce((pre, next) => {
                  return pre + next.inventoryNum;
                }, 0)}
              </Text>
            </Text>
          </View>
          {false && (
            <View style={styles.shopHeader_right}>
              <Text style={styles.shopHeader_right_text}>
                入货清单
                <Ionicons
                  name="ios-arrow-forward"
                  size={28 * EStyleSheet.value("$scale")}
                  color="#999999"
                />
              </Text>
            </View>
          )}
        </View>
        <GoodsFlatList ref="GoodsFlatList" navigation={this.props.navigation} />
        <ScanCameraModal
          ref="ScanCameraModal"
          fnScanSuccess={this.handleScanSuccess}
        />
        <HadSimilarGoodsModal
          ref="HadSimilarGoodsModal"
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

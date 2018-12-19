import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import {
  InputItem,
  List,
  TextareaItem,
  Picker,
  Toast,
  Modal
} from "antd-mobile-rn";
import styles, { listItemStyle, inputItemStyle } from "./styles";
import SYImagePicker from "react-native-syan-image-picker";
import Header from "components/Header";
import HeaderButtons from "components/HeaderButtons";
const urlImgBack = require("./assets/home_nav_back.png");
const urlImgPhoto = require("./assets/home_nav_camera.png");
import GoodsService from "services/GoodsService";
import shopStore from "stores/shopStore";
import SystemService from "services/SystemService";
import goodsStore from "stores/goodsStore";
import FormItem from "components/FormItem";
import { translateImageUrl } from "utils/CommonUtils";
import RNFetchBlob from "react-native-fetch-blob";
import ListPopover from "components/ListPopover";
import constantStore from "stores/constantStore";

interface navigationParams {
  mode?: "add" | "edit" | "replenish";
  id?: number;
  photo?: object; // 直接拍照上传，传过来照片object
  barCode?: string; // 扫码上传，传过来的条形码
}
interface Props {
  navigation: any;
}
@observer
export default class GoodDetail extends React.Component<Props, any> {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  formItemRefs = {};
  nameList = [
    "id",
    "imgUrl",
    "barCode",
    "inventoryNum",
    "name",
    "productCode",
    "productTypeId",
    "providerId",
    "purchasePrice",
    "sellerDefineSalePrice",
    "salesCount",
    "salesStatus",
    "unit"
  ];
  uploading = false;
  constructor(props: any) {
    super(props);
    this.initState();
  }
  initState = () => {
    const getParam: Function = this.props.navigation.getParam;
    this.state = {
      mode: getParam("mode", "add"),
      id: getParam("id", 0),
      imgUrl: getParam("photo", ""), // 如果typeof是object，提交前要先上传图片
      barCode: getParam("barCode", ""),
      inventoryNum: "",
      name: getParam("name", ""),
      productCode: "",
      productTypeId: "",
      providerId: "",
      purchasePrice: "",
      sellerDefineSalePrice: "",
      salesCount: "",
      salesStatus: "1", // 默认上架
      unit: "个",
      quantity: "1", // 补货的数量,
      productOptionalImageUrls: getParam("productOptionalImageUrls", [])
    };
  };
  getTitle = () => {
    let word: string = "";
    switch (this.state.mode) {
      case "add":
        word = "信息" || "新增";
        break;
      case "edit":
        word = "编辑";
        break;
      case "replenish":
        word = "补货";
        break;
      default:
        break;
    }
    return "商品" + word;
  };
  goBack = () => {
    this.props.navigation.goBack();
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
                    imgUrl: photos[0]
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
                  imgUrl: photos[0]
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
  selectProductType = () => {
    if (goodsStore.types.length) {
      ListPopover.open({
        list: goodsStore.types.map(v => v.name),
        onClick: (item: string, index: number) => {
          this.setState({
            productTypeId: goodsStore.types[index].id.toString()
          });
        }
      });
    } else {
      Modal.alert("暂无商品分类", "是否前往新增?", [
        { text: "取消", onPress: () => {}, style: "default" },
        {
          text: "确定",
          onPress: () => {
            this.props.navigation.navigate("GoodsTypeDetail", {
              mode: "add"
            });
          }
        }
      ]);
    }
  };
  selectProvider = () => {
    if (goodsStore.providerList.length) {
      ListPopover.open({
        list: goodsStore.providerList.map(v => v.name),
        onClick: (item: string, index: number) => {
          this.setState({
            providerId: goodsStore.providerList[index].id.toString()
          });
        }
      });
    } else {
      Modal.alert("暂无供应商", "是否前往新增?", [
        { text: "取消", onPress: () => {}, style: "default" },
        {
          text: "确定",
          onPress: () => {
            this.props.navigation.navigate("GoodsProviderDetail", {
              mode: "add"
            });
          }
        }
      ]);
    }
  };
  uploadImg = (uri: string) => {
    return SystemService.uploadFile({
      uri: uri,
      type: "multipart/form-data",
      name: uri
    })
      .then(response => {
        let url = response.url;
        console.log("上传成功", response.url);
        this.setState({
          imgUrl: url
        });
        this.state = {
          ...this.state,
          imgUrl: url
        };
        return url;
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
        throw new Error(error);
      });
  };
  getGoodDetailById = (id: number) => {
    Toast.loading("加载中..");
    GoodsService.getGoodDetailById(id)
      .then(response => {
        console.log("getGoodDetailById", response);
        let state = {};
        Object.keys(response).map((v, i) => {
          if (typeof response[v] == "number") {
            response[v] = response[v].toString();
          }
        });
        // if (response.imgUrl && response.imgUrl.indexOf("http") == -1) {
        //   response.imgUrl = constantStore.ROOT_API_URL + response.imgUrl;
        // }
        this.nameList.map(key => {
          state[key] = response[key];
        });
        this.setState(state);
        Toast.hide();
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
        this.props.navigation.goBack();
      });
  };
  downloadImgAndSetImgUrl = (url: string) => {
    Toast.loading("下载中..", 0);
    RNFetchBlob.config({
      fileCache: true,
      session: "temDownloadImg",
      appendExt: url.replace(/.+\./, "")
    })
      .fetch("GET", url, {})
      .then(res => {
        // the temp file path
        console.log("The file saved to ", res.path());
        let uri: string =
          Platform.OS === "android" ? "file://" + res.path() : "" + res.path();
        this.setState({
          imgUrl: {
            uri: uri
          }
        });
        Toast.hide();
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
      });
  };
  onBlurChangeNumber = (str: string, isInt: boolean = false) => {
    let newStr = "";
    if (isInt) {
      newStr = parseInt(str).toString();
    } else {
      // newStr = (parseInt(parseFloat(str) * 100) / 100).toString();
      if (str.indexOf(".") != -1) {
        newStr = str.split(".")[0] + "." + str.split(".")[1].substring(0, 2);
      } else {
        newStr = str;
      }
    }
    if (newStr == "NaN") {
      newStr = "";
    }
    // console.warn(str, newStr);
    return newStr;
  };
  submit = async () => {
    let sendData: Object = {
      dataSource: "1" //1店铺APP，2店铺WEB
    };
    let nameList: Array<string> = this.nameList;

    let errorMessage: string = "";
    if (!this.state.imgUrl) {
      errorMessage = "请先选择图片";
    }
    Object.keys(this.formItemRefs).map(key => {
      const formItemRef = this.formItemRefs[key];
      if (!errorMessage) {
        // console.log(formItemRef.getMessage());
        let formItemRefValid: boolean = formItemRef.checkValid();
        if (!formItemRefValid) {
          errorMessage = formItemRef.getMessage();
        }
      }
    });
    if (errorMessage) {
      console.log("校验不通过", errorMessage);
      Toast.info(errorMessage, 2);
      return;
    }
    Toast.loading("提交中..", 0);
    if (typeof this.state.imgUrl == "object") {
      try {
        let imgUrl = await this.uploadImg(this.state.imgUrl.uri);
        console.log(imgUrl);
      } catch (error) {
        console.log(error);
        Toast.fail(error.message || error, 2);
        return;
      }
    }
    console.log("complete");
    let promise = null;
    switch (this.state.mode) {
      case "add":
        promise = GoodsService.addGood;
        break;
      case "edit":
        promise = GoodsService.updateGood;
        break;
      case "replenish":
        promise = GoodsService.purchaseGoods;
        nameList = ["quantity", "purchasePrice", "sellerDefineSalePrice", "id"];
        break;
      default:
        break;
    }
    nameList.map(key => {
      sendData[key] = this.state[key];
    });
    sendData["shopId"] = shopStore.id;
    console.log(sendData);
    await promise(sendData)
      .then(response => {
        console.log("提交成功", response);
        Toast.success(this.getTitle() + "成功", 1);
        switch (this.state.mode) {
          case "add":
            goodsStore.addNewAddGoodList(response);
            break;
        }
        goodsStore.getGoodRows(true);
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
      });
  };

  componentDidMount() {
    if (this.state.mode != "add") {
      this.getGoodDetailById(this.state.id);
    } else if (this.state.mode == "add") {
      if (!this.state.imgUrl && this.state.productOptionalImageUrls.length) {
        this.downloadImgAndSetImgUrl(this.state.productOptionalImageUrls[0]);
      }
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.navigation.getParam("id") !=
        this.props.navigation.getParam("id") ||
      preProps.navigation.getParam("mode") !=
        this.props.navigation.getParam("mode")
    ) {
      console.log(
        "componentWillReceiveProps",
        this.props.navigation.getParam("id"),
        this.props.navigation.getParam("mode")
      );
      this.initState();
      this.getGoodDetailById(this.props.navigation.getParam("id"));
    }
  }
  componentWillUnmount() {
    RNFetchBlob.session("temDownloadImg")
      .dispose()
      .then(() => {
        console.log("清除图片缓存");
      });
  }
  renderScrollView = () => {
    let mode: string = this.state.mode;
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.picContainer}>
          {!!this.state.imgUrl && (
            <Image
              source={
                typeof this.state.imgUrl == "object"
                  ? this.state.imgUrl
                  : translateImageUrl(this.state.imgUrl)
              }
              style={styles.uploadImage}
              resizeMode={"cover"}
            />
          )}
        </View>
        <Header
          title={this.getTitle()}
          headerStyle={styles.headerStyle}
          headerTitleStyle={styles.headerTitleStyle}
          headerLeft={
            <HeaderButtons>
              <HeaderButtons.ChildButton onPress={this.goBack}>
                <Image
                  style={styles.headerBtnImg}
                  source={urlImgBack}
                  resizeMode="contain"
                />
              </HeaderButtons.ChildButton>
            </HeaderButtons>
          }
          headerRight={
            <HeaderButtons>
              {(mode == "add" || mode == "edit") && (
                <HeaderButtons.ChildButton onPress={this.showActionSheet}>
                  <Image
                    style={styles.headerBtnImg}
                    source={urlImgPhoto}
                    resizeMode="contain"
                  />
                </HeaderButtons.ChildButton>
              )}
            </HeaderButtons>
          }
        />
        {mode == "add" &&
          !!this.state.productOptionalImageUrls.length && (
            <View>
              <View style={styles.listHeader}>
                <View style={styles.listHeader_icon} />
                <Text style={styles.listHeader_text}>系统匹配可选图片</Text>
              </View>
              <ScrollView
                contentContainerStyle={styles.systemMatchPicBox}
                horizontal={true}
              >
                {this.state.productOptionalImageUrls.map((v, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      activeOpacity={0.8}
                      style={styles.systemMatchPicBox_imgBox}
                      onPress={() => this.downloadImgAndSetImgUrl(v)}
                    >
                      <Image
                        source={translateImageUrl(v)}
                        style={styles.systemMatchPicBox_img}
                        resizeMode="center"
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <View style={styles.marginBox} />
            </View>
          )}

        {mode != "replenish" && (
          <List
            renderHeader={
              <View style={styles.listHeader}>
                <View style={styles.listHeader_icon} />
                <Text style={styles.listHeader_text}>商品名称</Text>
              </View>
            }
          >
            <FormItem
              ref={ref => {
                this.formItemRefs["name"] = ref;
              }}
              value={this.state.name}
              required={true}
              message="请输入商品名称"
            >
              <TextareaItem
                returnKeyType="done"
                blurOnSubmit={true}
                style={styles.TextareaItem}
                rows={4}
                placeholder="请输入商品名称。"
                placeholderTextColor="#CCCCCC"
                maxLength={50}
                value={this.state.name}
                onChange={name =>
                  this.setState({
                    name
                  })
                }
              />
            </FormItem>
          </List>
        )}
        <View style={styles.marginBox} />
        <List
          renderHeader={
            <View style={styles.listHeader}>
              <View style={styles.listHeader_icon} />
              <Text style={styles.listHeader_text}>商品详情</Text>
            </View>
          }
        >
          {(mode == "add" || mode == "edit") && (
            <FormItem
              ref={ref => {
                this.formItemRefs["productTypeId"] = ref;
              }}
              value={this.state.productTypeId}
              required={true}
              message="请选择商品类型"
            >
              <List.Item
                styles={listItemStyle}
                onClick={this.selectProductType}
                extra={goodsStore.types.reduce((pre, next) => {
                  if (next.id == this.state.productTypeId) {
                    pre = next.name;
                  }
                  return pre;
                }, "请选择")}
              >
                商品类型
              </List.Item>
            </FormItem>
          )}
          {(mode == "add" || mode == "edit") && (
            <FormItem
              ref={ref => {
                this.formItemRefs["providerId"] = ref;
              }}
              value={this.state.providerId}
              required={false}
              message="请选择供应商"
            >
              <List.Item
                styles={listItemStyle}
                onClick={this.selectProvider}
                extra={goodsStore.providerList.reduce((pre, next) => {
                  if (next.id == this.state.providerId) {
                    pre = next.name;
                  }
                  return pre;
                }, "请选择")}
              >
                供应商
              </List.Item>
            </FormItem>
          )}

          <FormItem
            ref={ref => {
              this.formItemRefs["purchasePrice"] = ref;
            }}
            value={this.state.purchasePrice}
            required={true}
            message="请填写入货价"
          >
            <InputItem
              maxLength={20}
              clear
              returnKeyType="done"
              type="numbers-and-punctuation"
              defaultValue=""
              placeholder="请填写，方便提供更好的库存管理服务"
              placeholderTextColor="#CCCCCC"
              styles={inputItemStyle}
              value={this.state.purchasePrice}
              onChange={purchasePrice =>
                this.setState({
                  purchasePrice: purchasePrice
                })
              }
              onBlur={purchasePrice => {
                this.setState({
                  purchasePrice: this.onBlurChangeNumber(purchasePrice)
                });
              }}
            >
              入货价
            </InputItem>
          </FormItem>
          <FormItem
            ref={ref => {
              this.formItemRefs["sellerDefineSalePrice"] = ref;
            }}
            value={this.state.sellerDefineSalePrice}
            required={true}
            message="请填写销售价"
          >
            <InputItem
              maxLength={20}
              clear
              returnKeyType="done"
              type="numbers-and-punctuation"
              defaultValue=""
              placeholder="请填写，方便提供更好的库存管理服务"
              placeholderTextColor="#CCCCCC"
              styles={inputItemStyle}
              value={this.state.sellerDefineSalePrice}
              onChange={sellerDefineSalePrice =>
                this.setState({
                  sellerDefineSalePrice
                })
              }
              onBlur={sellerDefineSalePrice => {
                this.setState({
                  sellerDefineSalePrice: this.onBlurChangeNumber(
                    sellerDefineSalePrice
                  )
                });
              }}
            >
              销售价
            </InputItem>
          </FormItem>
          {mode == "add" && (
            <List.Item
              extra={
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.checkBtn}
                  onPress={() => {
                    this.setState({
                      salesStatus: this.state.salesStatus == "0" ? "1" : "0"
                    });
                  }}
                >
                  <Text style={styles.checkBtn_text}>
                    {this.state.salesStatus == "1" ? "上架" : "下架"}
                  </Text>
                </TouchableOpacity>
              }
              styles={listItemStyle}
            >
              是否上架
            </List.Item>
          )}
          {(mode == "add" || mode == "edit") && (
            <FormItem
              ref={ref => {
                this.formItemRefs["inventoryNum"] = ref;
              }}
              value={this.state.inventoryNum}
              required={true}
              message="请填写库存数量"
            >
              <InputItem
                maxLength={7}
                clear
                returnKeyType="done"
                type="numbers-and-punctuation"
                defaultValue=""
                placeholder="请填写，方便提供更好的库存管理服务"
                placeholderTextColor="#CCCCCC"
                styles={inputItemStyle}
                value={this.state.inventoryNum}
                onChange={inventoryNum =>
                  this.setState({
                    inventoryNum: this.onBlurChangeNumber(inventoryNum, true)
                  })
                }
              >
                库存数量
              </InputItem>
            </FormItem>
          )}
          {mode == "replenish" && (
            <FormItem
              ref={ref => {
                this.formItemRefs["quantity"] = ref;
              }}
              value={this.state.quantity}
              required={true}
              message="请填写新增数量"
            >
              <InputItem
                maxLength={7}
                clear
                returnKeyType="done"
                type="numbers-and-punctuation"
                defaultValue=""
                placeholder="请填写，方便提供更好的库存管理服务"
                placeholderTextColor="#CCCCCC"
                styles={inputItemStyle}
                value={this.state.quantity}
                onChange={quantity =>
                  this.setState({
                    quantity
                  })
                }
                onBlur={quantity => {
                  this.setState({
                    quantity: this.onBlurChangeNumber(quantity, true)
                  });
                }}
              >
                新增数量
              </InputItem>
            </FormItem>
          )}
          {(mode == "add" || mode == "edit") && (
            <FormItem
              ref={ref => {
                this.formItemRefs["unit"] = ref;
              }}
              value={this.state.unit}
              required={true}
              message="请填写数量单位，例如个/箱/件"
            >
              <InputItem
                maxLength={7}
                clear
                returnKeyType="done"
                defaultValue=""
                placeholder="请填写数量单位，例如个/箱/件"
                placeholderTextColor="#CCCCCC"
                styles={inputItemStyle}
                value={this.state.unit}
                onChange={unit =>
                  this.setState({
                    unit
                  })
                }
              >
                数量单位
              </InputItem>
            </FormItem>
          )}
        </List>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.submitBtn}
          onPress={() => this.submit()}
        >
          <Text style={styles.submitBtn_text}>确定</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  render() {
    // console.log(this.state);
    if (Platform.OS == "android") {
      return this.renderScrollView();
    } else {
      return (
        <KeyboardAvoidingView behavior="position">
          {this.renderScrollView()}
        </KeyboardAvoidingView>
      );
    }
  }
}

/* {(mode == "add" || mode == "edit") && (
  <FormItem
    ref={ref => {
      this.formItemRefs["providerId"] = ref;
    }}
    value={this.state.providerId}
    required={true}
    message="请填写供应商"
  >
    <InputItem
      maxLength={20}
      clear
      defaultValue=""
      placeholder="必填，保证供货安全"
      onExtraClick={() => {}}
      placeholderTextColor="#CCCCCC"
      styles={inputItemStyle}
      value={this.state.providerId}
      onChange={providerId =>
        this.setState({
          providerId
        })
      }
    >
      供应商
    </InputItem>
  </FormItem>
)} */

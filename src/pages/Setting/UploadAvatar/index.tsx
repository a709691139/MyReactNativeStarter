import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
const urlImgPhoto = require("images/photo.png");
import { Modal, Toast } from "antd-mobile-rn";
import { ActionSheet } from "antd-mobile-rn";
import SYImagePicker from "react-native-syan-image-picker";
import constantStore from "stores/constantStore";
import shopStore from "stores/shopStore";
import ShopService from "services/ShopService";
import SystemService from "services/SystemService";
import { observer } from "mobx-react";
import { translateImageUrl } from "utils/CommonUtils";

@observer
export default class UploadAvatar extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  uploadImg = (uri: string) => {
    Toast.loading("正在上传");
    SystemService.uploadFile({
      uri: uri,
      type: "multipart/form-data",
      name: uri
    })
      .then(response => {
        let url = response.url;
        console.log("上传成功", response.url);
        ShopService.changeShopInfo({ imgUrl: url, id: shopStore.id })
          .then(response => {
            console.log("修改店铺照片", response);
            shopStore.changeDataObj({
              imgUrl: url
            });
            Toast.success("修改成功", 1);
          })
          .catch(error => {
            console.log(error);
            Toast.fail(error.message || error, 2);
          });
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
      });
  };
  showActionSheet = () => {
    Modal.operation([
      {
        text: "拍照",
        onPress: () => {
          setTimeout(() => {
            SYImagePicker.openCamera(
              { isCrop: true, showCropCircle: false, showCropFrame: false },
              (err, photos) => {
                console.log(err, photos);
                if (!err) {
                  this.uploadImg(photos[0].uri);
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
              showCropCircle: false
            })
              .then(photos => {
                console.log(photos);
                this.uploadImg(photos[0].uri);
              })
              .catch(err => {
                // 取消选择，err.message为"取消"
              });
          }, 800);
        }
      }
    ]);
  };
  componentWillUnmount() {
    SYImagePicker.deleteCache();
  }
  render() {
    return (
      <View style={styles.container}>
        {shopStore.imgUrl ? (
          <TouchableOpacity
            style={styles.uploadBox_btn}
            activeOpacity={0.8}
            onPress={this.showActionSheet}
          >
            <Image
              style={styles.image}
              source={translateImageUrl(shopStore.imgUrl)}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.uploadBox_btn}
            activeOpacity={0.8}
            onPress={this.showActionSheet}
          >
            <Image style={styles.uploadBox_img} source={urlImgPhoto} />
            <Text style={styles.uploadBox_text}>拍摄或上传店铺图片</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

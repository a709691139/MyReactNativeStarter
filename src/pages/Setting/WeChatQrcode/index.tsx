import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  CameraRoll,
  Platform
} from "react-native";
import styles from "./styles";
import shopStore from "stores/shopStore";
import { Toast } from "antd-mobile-rn";
import RNFetchBlob from "react-native-fetch-blob";
import { translateImageUrl } from "utils/CommonUtils";

interface Props {
  navigation: any;
}
export default class WeChatQrcode extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "微信小程序二维码",
    headerRight: <View />
  });
  state = {
    loading: false
  };
  constructor(props) {
    super(props);
  }
  savePhoto = uri => {
    if (this.state.loading) {
      return;
    }
    if (typeof uri == "object") {
      uri = uri.uri;
    }
    console.log(uri);
    this.setState({
      loading: true
    });
    RNFetchBlob.config({
      fileCache: true,
      session: "temDownloadImg",
      appendExt: "png"
    })
      .fetch("GET", uri, {})
      .then(res => {
        console.log("The file saved to ", res.path());
        let localUrl: string =
          Platform.OS === "android" ? "file://" + res.path() : "" + res.path();
        CameraRoll.saveToCameraRoll(res.path(), "photo")
          .then(result => {
            console.log(result);
            Toast.success("保存成功");
            this.setState({
              loading: false
            });
          })
          .catch(error => {
            console.log(error);
            Toast.fail("保存失败");
            this.setState({
              loading: false
            });
          });
      })
      .catch(error => {
        console.log(error);
        Toast.fail("保存失败");
        this.setState({
          loading: false
        });
      });
  };
  componentWillUnmount() {
    RNFetchBlob.session("temDownloadImg")
      .dispose()
      .then(() => {
        console.log("清除图片缓存");
      });
  }
  render() {
    let uri = translateImageUrl(shopStore.weixinQrcode);

    return (
      <View style={styles.container}>
        {!uri && <Text>暂无二维码</Text>}
        {!!uri && <Image source={uri} style={styles.image} />}
        {!!uri && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={() => this.savePhoto(uri)}
          >
            <Text style={styles.btn_text}>保存图片到相册</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

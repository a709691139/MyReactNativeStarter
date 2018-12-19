import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import { observer } from "mobx-react";
import { observable, action, toJS } from "mobx";
import { whiteThemeNavigationOptions } from "pages/index";
import shopStore from "stores/shopStore";
import dictionaryStore from "stores/dictionaryStore";
import { translateImageUrl } from "utils/CommonUtils";
import IconIonicon from "react-native-vector-icons/Ionicons";
import EStyleSheet from "react-native-extended-stylesheet";

// 个人中心
interface Props {
  navigation: any;
}
@observer
export default class My extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "",
    headerRight: <View />
  });
  state = {};

  constructor(props) {
    super(props);
  }

  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };

  componentDidMount() {}
  render() {
    let list = [
      {
        title: "钱        包",
        icon: require("./assets/icon_qianbao.png"),
        onPress: () => {
          this.toOtherPage("Wallet");
        },
        extra: ""
      },
      {
        title: "设        置",
        icon: require("./assets/icon_shezhi.png"),
        onPress: () => {
          this.toOtherPage("Setting");
        },
        extra: ""
      },
      {
        title: "银  行  卡",
        icon: require("./assets/icon_yinhangka.png"),
        onPress: () => {
          this.toOtherPage("BankCard");
        },
        extra: ""
      },
      {
        title: "会员中心",
        icon: require("./assets/icon_yinhangka.png"),
        onPress: () => {
          this.toOtherPage("MemberCenter");
        },
        extra: ""
      },
      {
        title: "关于我们",
        icon: require("./assets/icon_about.png"),
        onPress: () => {
          this.toOtherPage("SettingAboutus");
        },
        extra: ""
      },
      {
        title: "问题反馈",
        icon: require("./assets/icon_freeback.png"),
        onPress: () => {
          this.toOtherPage("SettingSuggest");
        },
        extra: ""
      }
    ];
    if (shopStore.checkStatus != "1") {
      list.push({
        title: "申请入驻",
        icon: require("./assets/icon_ruzhu.png"),
        onPress: () => {
          let routeName = "";
          switch (shopStore.checkStatus.toString()) {
            case "0":
            case "1":
            case "2":
              routeName = "QualificationStatusDetail";
              break;
            case "3":
              routeName = "Qualification";
              break;
            default:
              break;
          }
          this.toOtherPage(routeName);
        },
        extra: dictionaryStore.checkStatusTypes.reduce((pre, next) => {
          if (next.value == shopStore.checkStatus) {
            pre = next.text;
          }
          return pre;
        }, "")
      });
    }
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>个人中心</Text>
        <View style={styles.myBox}>
          <Image
            source={require("./assets/img_gerenzhongxin.png")}
            style={styles.myBox_bg}
          />
          {!!shopStore.imgUrl && (
            <Image
              source={translateImageUrl(shopStore.imgUrl)}
              style={styles.myBox_avatar}
            />
          )}

          <TouchableOpacity
            style={styles.myBox_textBox}
            onPress={() => this.toOtherPage("Setting")}
          >
            <Text style={styles.myBox_textBox_text1}>
              {shopStore.name || "请填写店铺名称"}
            </Text>
            <Text style={styles.myBox_textBox_text2}>
              {shopStore.contactPhone}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          {list.map((v, i) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.list_li}
                key={i}
                onPress={v.onPress}
              >
                <Image source={v.icon} style={styles.list_li_icon} />
                <Text style={styles.list_li_text}>{v.title}</Text>
                <Text style={styles.list_li_extra}>{v.extra}</Text>
                <IconIonicon
                  name="ios-arrow-forward"
                  color="#999999"
                  size={32 * EStyleSheet.value("$scale")}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

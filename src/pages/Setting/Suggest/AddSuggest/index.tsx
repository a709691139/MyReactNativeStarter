import React from "react";
import { observer } from "mobx-react";
import { observable, action, toJS } from "mobx";
import { View, Text, Image, ScrollView, TextInput } from "react-native";
import styles from "./styles";
import {
  Button,
  InputItem,
  List,
  Icon,
  TextareaItem,
  Toast
} from "antd-mobile-rn";
import ShopService from "services/ShopService";
import DeviceInfo from "react-native-device-info";

/* 路由传参 */
interface NavigationParams {
  fnSuccess?: () => void;
}
interface Props {
  navigation: any;
}
@observer
export default class AddSuggest extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "反馈",
    headerRight: <View />
  });
  state = {
    word: ""
  };
  constructor(props) {
    super(props);
  }

  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  onChangeWord = (word: any) => {
    this.setState({ word });
  };
  submit = () => {
    if (this.state.word.length >= 5) {
      Toast.loading("loading", 5);
      let phoneData: string = "";
      phoneData += "app版本:" + DeviceInfo.getReadableVersion() + "; ";
      phoneData +=
        "系统:" +
        DeviceInfo.getSystemName() +
        "," +
        DeviceInfo.getSystemVersion() +
        "; ";
      phoneData += "品牌:" + DeviceInfo.getModel() + "; ";
      ShopService.addMySuggestList({
        feedbackDesc: this.state.word,
        userType: 1,
        phoneData
      })
        .then(response => {
          console.log(response);
          Toast.success("提交成功", 1);
          const fnSuccess = this.props.navigation.getParam(
            "fnSuccess",
            () => {}
          );
          fnSuccess();
          this.props.navigation.goBack();
        })
        .catch(error => {
          console.log(error);
          Toast.fail(error.message || error, 2);
        });
    } else {
      Toast.info("建议反馈不能少于5个字符");
    }
  };

  componentDidMount() {}
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <List>
          <TextareaItem
            rows={8}
            placeholder="感谢您使用易众慧,使用过程众有任何意见或建议，欢迎反馈给我们"
            count={300}
            style={styles.textInput}
            value={this.state.word}
            onChange={this.onChangeWord}
            placeholderTextColor="#CCCCCC"
          />
          <Button
            type="primary"
            style={styles.button}
            disabled={false}
            onClick={this.submit}
          >
            提交
          </Button>
        </List>
      </ScrollView>
    );
  }
}

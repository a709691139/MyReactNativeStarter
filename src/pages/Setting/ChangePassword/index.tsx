import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import UserService from "services/UserService";
import userStore from "stores/userStore";
import { Button, InputItem, Toast } from "antd-mobile-rn";
import styles, { inputItemStyle } from "./styles";
import commonRegexp from "utils/commonRegexp";
import { whiteThemeNavigationOptions } from "pages/index";

interface Props {
  navigation: any;
}
export default class ChangePassword extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "修改密码",
    headerRight: <View />
  });
  state = {
    oldPassword: "",
    newPassword: "",
    newPassword2: ""
  };

  constructor(props: any) {
    super(props);
  }

  submit = () => {
    let errorMessage: string = "";
    if (!this.state.oldPassword) {
      errorMessage = "请输入旧密码";
    } else if (!this.state.newPassword) {
      errorMessage = "请输入新密码";
    } else if (!this.state.newPassword2) {
      errorMessage = "请再次输入新密码";
    } else if (this.state.newPassword2 != this.state.newPassword) {
      errorMessage = "两个新密码不一致";
    }

    if (errorMessage) {
      console.log("校验不通过", errorMessage);
      Toast.info(errorMessage, 2);
      return;
    }
    Toast.loading("loading..", 0);
    console.log("修改密码", this.state);
    UserService.changePassword(this.state.oldPassword, this.state.newPassword)
      .then(response => {
        this.props.navigation.goBack();
        Toast.info("修改成功");
      })
      .catch(error => {
        console.log(error);
        Toast.info(error.message || error);
      });
  };

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.form}>
            <InputItem
              clear
              type="password"
              value={this.state.oldPassword}
              onChange={oldPassword => {
                this.setState({
                  oldPassword
                });
              }}
              placeholder="请输入旧密码"
              placeholderTextColor="#C0C5CC"
              maxLength={30}
              styles={inputItemStyle}
              onErrorClick={() => Toast.info("请输入旧密码", 1)}
            />
            <InputItem
              clear
              type="password"
              value={this.state.newPassword}
              onChange={newPassword => {
                this.setState({
                  newPassword
                });
              }}
              placeholder="请输入新密码"
              placeholderTextColor="#C0C5CC"
              maxLength={30}
              styles={inputItemStyle}
              onErrorClick={() => Toast.info("请输入新密码", 1)}
            />
            <InputItem
              clear
              type="password"
              value={this.state.newPassword2}
              onChange={newPassword2 => {
                this.setState({
                  newPassword2
                });
              }}
              placeholder="请再次输入新密码"
              placeholderTextColor="#C0C5CC"
              maxLength={30}
              styles={inputItemStyle}
              onSubmitEditing={this.submit}
              onErrorClick={() => Toast.info("请再次输入新密码", 1)}
            />

            <Button
              type="primary"
              onClick={this.submit}
              style={styles.submitBtn}
            >
              确定
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
let { height, width } = Dimensions.get("window");
import UserService from "services/UserService";
import ShopService from "services/ShopService";
import shopStore from "stores/shopStore";
import userStore from "stores/userStore";
import dictionaryStore from "stores/dictionaryStore";
import { Button, InputItem, List, Toast } from "antd-mobile-rn";
import styles, { inputItemStyle, anotherLoginBoxStyle } from "./styles";
import SendCodeButton from "./SendCodeButton";
import commonRegexp from "utils/commonRegexp";
const urlImgWeixin = require("./assets/img_weixin.png");
const urlImgQQ = require("./assets/img_qq.png");

interface Props {
  navigation: any;
}
export default class Login extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null
  });
  state = {
    phone: "",
    code: "",
    password: "",
    phoneError: false,
    codeError: false,
    passwordError: false,
    mode: "code" // code 验证码登录, password 密码登录
  };
  modes = [
    {
      label: "验证码登录",
      value: "code"
    },
    {
      label: "密码登录",
      value: "password"
    }
  ];

  constructor(props: any) {
    super(props);
  }

  changePhone = (phone: string) => {
    phone = phone.replace(/\s*/g, "");
    let phoneError: boolean = !commonRegexp.mobilePhone.test(phone);
    this.setState({
      phone: phone,
      phoneError: !commonRegexp.mobilePhone.test(phone)
    });
    return phoneError;
  };
  changeCode = (code: string) => {
    let codeError: boolean = !code;
    this.setState({
      code: code,
      codeError: codeError
    });
    return codeError;
  };
  changePassword = (password: string) => {
    let passwordError: boolean = !password;
    this.setState({
      password: password,
      passwordError: passwordError
    });
    return passwordError;
  };
  toggleMode = () => {
    this.setState({
      mode: this.state.mode == "code" ? "password" : "code"
    });
  };
  checkFormVaild = () => {
    let errorWord: string = "";
    if (this.changePhone(this.state.phone)) {
      errorWord = "请输入正确的手机号码";
    } else {
      if (this.state.mode == "code") {
        if (this.changeCode(this.state.code)) {
          errorWord = "请输入验证码";
        }
      } else {
        if (this.changePassword(this.state.password)) {
          errorWord = "请输入密码";
        }
      }
    }
    if (errorWord) {
      Toast.info(errorWord, 1);
      return false;
    } else {
      return true;
    }
  };
  sendCode = () => {
    UserService.sendPhoneCode(this.state.phone)
      .then(response => {
        console.log("sendPhoneCode", response);
        Toast.info("发送成功", 2);
      })
      .catch(error => {
        console.log(error);
        Toast.info(error.message || error);
      });
  };

  submit = () => {
    userStore.logoutSuccess();
    if (this.checkFormVaild()) {
      Toast.loading("登录中..", 0);
      console.log(
        "登录",
        this.state.phone,
        this.state.code,
        this.state.password
      );
      let isPassword: boolean = this.state.mode == "password";

      userStore
        .asyncLogin(
          this.state.phone,
          isPassword ? this.state.password : this.state.code,
          userStore.registrationId,
          isPassword
        )
        .catch(error => {
          console.log(error);
          Toast.info(error.message || error);
        });
      /* 
      UserService.login(
        this.state.phone,
        this.state.code,
        userStore.registrationId
      )
        .then(userDetail => {
          userStore.loginSuccess(userDetail);
          // 获取数据字典
          const getDictionary: Promise<any> = dictionaryStore.getData();
          // 获取店铺资料
          const getShopInfo: Promise<any> = shopStore.getData();
          Promise.all([getDictionary, getShopInfo])
            .then(list => {
              console.log("登录成功", userDetail);
              this.props.navigation.replace("Home");
              Toast.hide();
              Toast.success("登录成功", 1);
            })
            .catch(error => {
              console.log(error);
              userStore.logoutSuccess();
              Toast.info(error.message || error);
            });
        })
        .catch(error => {
          console.log(error);
          userStore.logoutSuccess();
          Toast.info(error.message || error);
        }); */
    } else {
    }
  };
  toAreementPage = () => {
    this.props.navigation.navigate("SettingAgreement");
  };

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.form}>
            {/* <Text style={styles.title}>欢迎来到易众慧</Text> */}
            <View style={styles.modeBox}>
              {this.modes.map((v, i) => {
                return (
                  <Text
                    onPress={this.toggleMode}
                    key={i}
                    style={[
                      styles.modeBox_text,
                      this.state.mode == v.value && styles.modeBox_text_on
                    ]}
                  >
                    {v.label}
                  </Text>
                );
              })}
            </View>
            <View>
              <InputItem
                clear
                type="phone"
                value={this.state.phone}
                onChange={this.changePhone}
                placeholder="请输入店主手机号"
                placeholderTextColor="#C0C5CC"
                styles={inputItemStyle}
                error={this.state.phoneError}
                onErrorClick={() => Toast.info("请输入正确的手机号", 1)}
              />
              {this.state.mode == "code" && (
                <InputItem
                  clear
                  type="text"
                  value={this.state.code}
                  onChange={this.changeCode}
                  placeholder="请输入验证码"
                  placeholderTextColor="#C0C5CC"
                  extra={
                    <SendCodeButton
                      phone={this.state.phone}
                      onClick={this.sendCode}
                      style={styles.sendCodeBtn}
                    />
                  }
                  maxLength={8}
                  styles={inputItemStyle}
                  error={this.state.codeError}
                  onSubmitEditing={this.submit}
                  onErrorClick={() => Toast.info("请输入验证码", 1)}
                />
              )}
              {this.state.mode == "password" && (
                <InputItem
                  clear
                  type="password"
                  value={this.state.password}
                  onChange={this.changePassword}
                  placeholder="请输入密码"
                  placeholderTextColor="#C0C5CC"
                  styles={inputItemStyle}
                  error={this.state.passwordError}
                  onSubmitEditing={this.submit}
                  onErrorClick={() => Toast.info("请输入密码", 1)}
                />
              )}
              <Button
                type="primary"
                onClick={this.submit}
                style={styles.submitBtn}
              >
                登录/注册
              </Button>
            </View>
          </View>
          {/*  <View style={anotherLoginBoxStyle.container}>
            <View style={anotherLoginBoxStyle.titleBox}>
              <View style={anotherLoginBoxStyle.titleBox_border} />
              <Text style={anotherLoginBoxStyle.titleBox_text}>第三方登录</Text>
            </View>
            <View style={anotherLoginBoxStyle.btnsBox}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={anotherLoginBoxStyle.btn}
              >
                <Image
                  source={urlImgWeixin}
                  style={anotherLoginBoxStyle.btn_img}
                />
                <Text style={anotherLoginBoxStyle.btn_text}>微信登录</Text>
              </TouchableOpacity>
              <View style={anotherLoginBoxStyle.btnsBox_margin} />
              <TouchableOpacity
                activeOpacity={0.8}
                style={anotherLoginBoxStyle.btn}
              >
                <Image source={urlImgQQ} style={anotherLoginBoxStyle.btn_img} />
                <Text style={anotherLoginBoxStyle.btn_text}>微信登录</Text>
              </TouchableOpacity>
            </View>
          </View> */}
          <View style={styles.agreeBox}>
            <Text style={styles.agreeBox_text} onPress={this.toAreementPage}>
              开店代表您已同意
              <Text style={styles.agreeBox_text_red}>
                《易众慧用户使用协议》
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

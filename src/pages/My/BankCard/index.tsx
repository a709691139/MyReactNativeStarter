import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import { observer } from "mobx-react";
import { whiteThemeNavigationOptions } from "pages/index";
import HeaderButtons from "components/HeaderButtons";
import WalletService from "services/WalletService";
import { Toast } from "antd-mobile-rn";
import WithoutDataView from "components/WithoutDataView";
const urlBgGongshang = require("./assets/bg_gongshang.png");

interface Props {
  navigation: any;
}
@observer
export default class BankCard extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "我的银行卡",
    headerRight: navigation.getParam("headerRight", <View />)
  });
  state = {
    list: [],
    loading: true
  };

  constructor(props) {
    super(props);
    this.props.navigation.setParams({
      headerRight: (
        <HeaderButtons>
          <HeaderButtons.ChildButton
            onPress={() => {
              this.toOtherPage("BankCardDetail", {
                mode: "add",
                fnSuccess: this.getData
              });
            }}
          >
            <Text style={styles.headerRightText}>新增</Text>
          </HeaderButtons.ChildButton>
        </HeaderButtons>
      )
    });
  }

  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  getData = async () => {
    this.setState({
      loading: true
    });
    try {
      let response: any = await WalletService.getBankCards({
        page: 1,
        rows: 9999
      });
      console.log("银行卡列表", response);
      this.setState({
        loading: false,
        list: response.list
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
      Toast.fail(error.message || error, 2);
    }
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}
      >
        {this.state.list.map((v, i) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={i}
              onPress={() => {
                this.toOtherPage("BankCardDetail", {
                  mode: "edit",
                  id: v.id,
                  fnSuccess: this.getData
                });
              }}
            >
              <View style={styles.row}>
                <Image source={urlBgGongshang} style={styles.bg} />
                <View style={styles.row_title}>
                  <Text style={styles.row_title_text1}>{v.bankName}</Text>
                  <Text style={styles.row_title_text2}>储蓄卡</Text>
                </View>
                <Text style={styles.row_number}>
                  {v.bankCard && v.bankCard.substr(v.bankCard.length - 4)}
                </Text>
                <Text style={styles.row_name}>
                  {v.bankAccountName &&
                    "*" + v.bankAccountName[v.bankAccountName.length - 1]}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        {this.state.list.length == 0 &&
          !this.state.loading && <WithoutDataView text="暂无数据" />}
      </ScrollView>
    );
  }
}

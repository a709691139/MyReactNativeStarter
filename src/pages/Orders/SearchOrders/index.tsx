import React from "react";
import { observer } from "mobx-react";
import { View, Text, Image, TextInput } from "react-native";
import { Toast } from "antd-mobile-rn";

import styles from "./styles";
import { whiteThemeNavigationOptions } from "pages/index";
const urlImgSearch = require("images/icon_search.png");
import TabComponent from "../TabComponent";

interface Props {
  navigation: any;
}
@observer
export default class Orders extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "订单查找",
    headerRight: <View />
  });
  state = {
    searchWord: ""
  };
  constructor(props) {
    super(props);
  }
  changeSearchWord = (searchWord: string) => {
    this.setState({
      searchWord
    });
  };
  cleanSearchWord = () => {
    this.setState(
      {
        searchWord: ""
      },
      () => {
        this.refs["TabComponent"].clean();
      }
    );
  };
  submit = () => {
    if (!this.state.searchWord) {
      Toast.info("请输入搜索关键字", 2);
      return;
    }
    this.refs["TabComponent"].onRefresh();
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
              placeholder="请输入订单号或收货人信息"
              autoFocus={true}
              onSubmitEditing={this.submit}
            />
          </View>
          <Text
            style={styles.searchBar_cancelText}
            onPress={() => this.submit()}
          >
            确定
          </Text>
        </View>
        <TabComponent
          ref="TabComponent"
          navigation={this.props.navigation}
          isRefleshOnMount={false}
          actived={false}
          searchWord={this.state.searchWord}
        />
      </View>
    );
  }
}

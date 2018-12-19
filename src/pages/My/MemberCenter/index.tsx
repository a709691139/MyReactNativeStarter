import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  InteractionManager
} from "react-native";
import { observer } from "mobx-react";
import styles from "./styles";
import { whiteThemeNavigationOptions } from "pages/index";
const urlImgSearch = require("images/icon_search.png");
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Tabs, Toast } from "antd-mobile-rn";
import TabComponent from "./TabComponent";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import Store from "./Store";

interface Props {
  navigation: any;
}
@observer
export default class MemberCenter extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "会员中心",
    headerRight: <View />
  });
  memberCenterStore: any = new Store();
  timer: any = null;
  TabComponents = [];
  constructor(props) {
    super(props);
  }

  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  changeSearchWord = (searchWord: string) => {
    this.memberCenterStore.changeSearchWord(searchWord);
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      // console.log(this.TabComponents, this.memberCenterStore.inBlacklist);
      this.TabComponents[this.memberCenterStore.inBlacklist].onRefresh();
    }, 500);
  };
  componentDidMount() {
    this.memberCenterStore.asyncGetListLength();
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  render() {
    const memberCenterStore = this.memberCenterStore;
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
              value={memberCenterStore.searchWord}
              onChangeText={this.changeSearchWord}
              underlineColorAndroid="transparent"
              placeholderTextColor="#999999"
              placeholder="搜索会员名称/备注"
              blurOnSubmit={true}
              onSubmitEditing={e => this.changeSearchWord(e.nativeEvent.text)}
            />
            {!!memberCenterStore.searchWord && (
              <MaterialIcons
                name="cancel"
                size={30}
                color="#9A9A9A"
                onPress={() => this.changeSearchWord("")}
              />
            )}
          </View>
        </View>
        <Tabs
          page={memberCenterStore.inBlacklist}
          onChange={memberCenterStore.changeInBlacklist}
          tabs={memberCenterStore.tabs}
          tabBarPosition="top"
          swipeable={false}
          tabBarInactiveTextColor="#666666"
          tabBarActiveTextColor={MAIN_COLOR}
          tabBarUnderlineStyle={{
            backgroundColor: MAIN_COLOR,
            transform: [{ scaleX: 0.3 }]
          }}
          prerenderingSiblingsNumber={0}
        >
          {memberCenterStore.tabs.map((v, i) => {
            return (
              <TabComponent
                ref={ref => (this.TabComponents[i] = ref)}
                key={v.key}
                inBlacklist={v.inBlacklist}
                name={memberCenterStore.searchWord}
                navigation={this.props.navigation}
                memberCenterStore={memberCenterStore}
              />
            );
          })}
        </Tabs>
      </View>
    );
  }
}

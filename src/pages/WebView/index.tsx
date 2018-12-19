import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import { View, WebView } from "react-native";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;
import styles from "./styles";

interface Props {
  navigation: any;
}
@observer
export default class WebViewPage extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.getParam("title", ""),
    headerRight: <View />
  });
  webview = null;
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WebView
        ref={ref => {
          this.webview = ref;
        }}
        automaticallyAdjustContentInsets={false}
        contentInset={{ top: 0, right: 0, bottom: 0, left: 0 }}
        source={{
          uri: this.props.navigation.getParam("uri", "https://www.baidu.com")
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="always"
        style={{ flex: 1 }}
      />
    );
  }
}

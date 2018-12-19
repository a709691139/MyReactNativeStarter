import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

interface Props {
  navigation: any;
  item: any;
}
export default class WalletItem extends React.PureComponent<Props, any> {
  constructor(props) {
    super(props);
  }
  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  render() {
    const item = this.props.item;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.item}
        onPress={() =>
          this.toOtherPage("WalletBalanceDetail", { id: this.props.item.id })
        }
      >
        <View style={styles.item_left}>
          <Text style={styles.item_left_text1}>
            {item.tradeName || item.description}
          </Text>
          <Text style={styles.item_left_text2}>{item.createTime}</Text>
        </View>
        <Text style={styles.item_right_text}>
          {item.tradeType == 1 ? "+" : "-"}
          {item.money.toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  }
}

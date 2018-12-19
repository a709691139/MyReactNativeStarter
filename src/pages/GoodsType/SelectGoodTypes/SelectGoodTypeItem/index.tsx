import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import constantStore from "stores/constantStore";
import styles, { listItemStyle } from "./styles";
import { List } from "antd-mobile-rn";
import { observer } from "mobx-react";
const urlIconSelectOn = require("images/icon_select_on.png");
const urlIconSelectOff = require("images/icon_select_off.png");

interface Props {
  item: any;
  selected?: boolean;
  onChangeSelected?: (selected: boolean, item: any) => void;
}
@observer
export default class SelectGoodTypeItem extends React.Component<Props> {
  static defaultProps = {
    selected: false,
    onChangeSelected: () => {}
  };
  constructor(props) {
    super(props);
  }
  onChangeSelected = () => {
    this.props.onChangeSelected(!this.props.selected, this.props.item);
  };
  render() {
    const { item, selected } = this.props;
    return (
      <List.Item
        styles={listItemStyle}
        extra={
          <View style={styles.selectBtn}>
            <Image
              source={selected ? urlIconSelectOn : urlIconSelectOff}
              style={styles.selectBtn_img}
            />
          </View>
        }
        onClick={this.onChangeSelected}
      >
        {item.name}
      </List.Item>
    );
  }
}

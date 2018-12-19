import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import { View, Text, Image, ScrollView, SectionList } from "react-native";
import styles from "./styles";
import EStyleSheet from "react-native-extended-stylesheet";
const urlImgDate = require("images/iconDate.png");

interface Props {
  section: any;
}
export default class SectionHeader extends React.Component<Props, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeader_text} numberOfLines={1}>
          {this.props.section.title}
        </Text>
        <Image
          source={urlImgDate}
          resizeMode="center"
          style={styles.sectionHeader_img}
        />
      </View>
    );
  }
}

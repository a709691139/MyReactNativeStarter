import React from "react";
import { View, Image } from "react-native";

const urlImgBack = require("./assets/home_nav_back.png");
const urlImgPhoto = require("./assets/home_nav_camera.png");

export default class TestDemo extends React.Component<Props, any> {
  render() {
    return (
      <View>
        <Image
          style={{
            width: 44,
            height: 44
          }}
          source={urlImgBack}
          resizeMode="center"
        />
        <Image
          style={{
            width: 44,
            height: 44
          }}
          source={urlImgPhoto}
          resizeMode="center"
        />
      </View>
    );
  }
}

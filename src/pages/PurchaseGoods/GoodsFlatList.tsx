import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList
} from "react-native";
import constantStore from "stores/constantStore";
import { itemStyles } from "./styles";
import goodsStore from "stores/goodsStore";
import WithoutDataView from "components/WithoutDataView";
import { translateImageUrl } from "utils/CommonUtils";

interface Props {
  navigation: any;
}

@observer
export default class GoodsFlatList extends React.Component<Props, any> {
  constructor(props) {
    super(props);
  }

  renderItem = ({ item, separators, index }) => {
    return (
      <View style={itemStyles.container}>
        <View style={itemStyles.imageView}>
          <Image
            style={itemStyles.imageView_img}
            resizeMode="center"
            source={translateImageUrl(item.imgUrl)}
          />
        </View>
        <View style={itemStyles.centerView}>
          <Text style={itemStyles.centerView_text1} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={itemStyles.centerView_text2}>
            库存
            {item.inventoryNum}
            {item.unit}
          </Text>
          <View style={itemStyles.centerView_priceBox}>
            <Text style={itemStyles.centerView_priceBox_text1}>入货价</Text>
            <Text
              style={[
                itemStyles.centerView_priceBox_text2,
                itemStyles.colorRed
              ]}
            >
              ￥{item.purchasePrice}
            </Text>
          </View>
        </View>
        <View style={itemStyles.rightView}>
          <Text style={itemStyles.rightView_text1}>销售价</Text>
          <Text style={itemStyles.rightView_text2}>
            <Text style={itemStyles.colorRed}>
              ￥{item.sellerDefineSalePrice}
            </Text>
          </Text>
        </View>
      </View>
    );
  };
  ListEmptyComponent = () => {
    return <WithoutDataView text="暂无录入" />;
    return (
      <View style={itemStyles.emptyView}>
        <Text style={itemStyles.emptyText}>暂无录入</Text>
      </View>
    );
  };
  render() {
    return (
      <FlatList
        data={goodsStore.newAddGoodList.concat()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderItem}
        ListEmptyComponent={this.ListEmptyComponent}
        initialNumToRender={5}
      />
    );
  }
}

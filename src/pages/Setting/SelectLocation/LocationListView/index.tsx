import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import styles from "./styles";
import PullFlatList from "components/PullList/PullFlatList";
import Ionicons from "react-native-vector-icons/Ionicons";
import LocationService from "services/LocationService";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;

interface ResponseListRow {
  name?: string | null | undefined;
}
interface Response {
  list: ResponseListRow[];
  total: number;
}

interface Props {
  changeSelectedPosition: (position) => void;
  selectedAddress?: string;
}
export default class extends React.PureComponent<Props> {
  static defaultProps: {
    changeSelectedPosition: () => {};
    selectedAddress: "";
  };
  state = {
    data: [],
    loading: false,
    hadMore: false,
    currentPage: 1,
    pageSize: 10,
    total: 0
  };

  constructor(props) {
    super(props);
  }
  getPositionListBySearchWord = (searchWord: string, region?: string) => {
    //getPositionListBySearchWord
    return LocationService.getSearchListBySearchWord(searchWord, region)
      .then(response => {
        return response.results || response.result;
      })
      .then((response: Response) => {
        this.setState({
          loading: false,
          hadMore: false,
          data: response
        });
        if (response.length) {
          this.props.changeSelectedPosition(response[0]);
        }
      })
      .catch(e => {
        console.warn(e);
      });
  };
  getPositionListByGps = (longitude: number, latitude: number) => {
    return LocationService.getPositionListByGps(longitude, latitude)
      .then(response => {
        return response.result;
      })
      .then((response: Response) => {
        let province = response.addressComponent.province;
        let city = response.addressComponent.city;
        let area = response.addressComponent.district;
        let list = response.pois.map((v, i) => {
          return {
            province,
            city,
            area,
            uid: v.uid,
            name: v.name,
            address: v.addr
          };
        });
        console.log(list);
        this.setState({
          loading: false,
          hadMore: false,
          data: list
        });
        if (list.length) {
          this.props.changeSelectedPosition(list[0]);
        }
      })
      .catch(e => {
        console.warn(e);
      });
  };
  onRefresh = () => {
    return new Promise(resolve => {
      resolve();
    });
  };
  onEndReached = () => {
    return new Promise(resolve => {
      resolve();
    });
  };
  renderItem = ({ item, separators, index }) => {
    return (
      <ItemView
        item={item}
        key={index}
        selectedAddress={this.props.selectedAddress}
        changeSelectedPosition={this.props.changeSelectedPosition}
      />
    );
  };
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    // if (nextProps.searchWord && nextProps.searchWord != this.props.searchWord) {
    //   this.onRefresh();
    // }
    // if (!nextProps.searchWord) {
    //   this.setState({
    //     data: []
    //   });
    // }
  }
  componentDidMount() {}
  render() {
    return (
      <PullFlatList
        style={styles.container}
        data={this.state.data}
        refreshing={this.state.loading}
        hadMore={this.state.hadMore}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        renderItem={this.renderItem}
        extraData={this.props}
        ListFooterComponent={() => null}
      />
    );
  }
}

class ItemView extends React.PureComponent<any> {
  constructor(props) {
    super(props);
  }
  render() {
    const { item, selectedAddress, changeSelectedPosition } = this.props;
    let isSelected =
      (item.address && item.address + " ") + item.name == selectedAddress;
    // console.log(
    //   isSelected,
    //   (item.address && item.address + " ") + item.name,
    //   selectedAddress
    // );
    return (
      <TouchableHighlight
        underlayColor="#D3D3D3"
        onPress={() => {
          changeSelectedPosition(item);
        }}
      >
        <View style={styles.item}>
          <View style={styles.item_main}>
            <Text style={styles.item_main_text1}>{item.name}</Text>
            {item.address && (
              <Text style={styles.item_main_text2}>{item.address}</Text>
            )}
          </View>
          <View style={styles.item_right}>
            {isSelected && (
              <Ionicons name="ios-checkmark" size={34} color={MAIN_COLOR} />
            )}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

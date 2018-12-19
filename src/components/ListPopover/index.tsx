import React, { Component } from "react";
import {
  ListView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle
} from "react-native";
import topView from "rn-topview";
import Modal from "react-native-modalbox";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

/*
import ListPopover from "components/ListPopover";
ListPopover.open({
  list: ["123", "233"],
  onClick: (item, index) => {
    console.warn(item);
  }
});
*/
interface OpenData {
  onClick: (item: string, index: number) => void;
  onClose?: Function;
  list: Array<string>;
}
interface Props {
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  popoverStyle?: ViewStyle;
  separatorStyle?: ViewStyle;
  rowText?: TextStyle;
  renderRow?: (rowData) => JSX.Element;
  initialListSize?: number;
  openData: OpenData;
  onAnimationEndClosed: Function;
}

class ListPopoverContainer extends Component<Props> {
  modal = null;
  state = {
    list: [],
    isOpen: true
  };
  onClick = null;
  onClose = null;
  constructor(props) {
    super(props);
  }

  handleClick = (data, rowID) => {
    this.onClick(data, rowID);
    this.close();
  };
  open = (openData: OpenData) => {
    this.setState({
      isOpen: true,
      list: openData.list
    });
    this.onClick = openData.onClick;
    this.onClose = openData.onClose;
  };
  close = () => {
    this.onClose && this.onClose();
    this.props.onAnimationEndClosed();
  };
  renderRow(rowData, sectionID, rowID) {
    let separatorStyle = this.props.separatorStyle || DefaultStyles.separator;
    let rowTextStyle = this.props.rowText || DefaultStyles.rowText;

    let separator = <View style={separatorStyle} />;
    if (rowData === this.state.list[0]) {
      separator = null;
    }

    let row = <Text style={rowTextStyle}>{rowData}</Text>;
    if (this.props.renderRow) {
      row = this.props.renderRow(rowData);
    }

    return (
      <View>
        {separator}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            this.handleClick(rowData, rowID);
          }}
        >
          {row}
        </TouchableOpacity>
        {separator}
      </View>
    );
  }
  renderList() {
    let styles = this.props.style || DefaultStyles;
    let maxHeightStyle = {};
    if (this.state.list.length > 12) {
      maxHeightStyle = { height: (SCREEN_HEIGHT * 3) / 4 };
    }
    return (
      <ListView
        enableEmptySections={true}
        style={[maxHeightStyle]}
        dataSource={ds.cloneWithRows(this.state.list.concat())}
        renderRow={(rowData, sectionID, rowID) =>
          this.renderRow(rowData, sectionID, rowID)
        }
        automaticallyAdjustContentInsets={false}
        initialListSize={this.props.initialListSize || 30}
        pageSize={5}
      />
    );
  }
  componentDidMount() {
    this.open(this.props.openData);
  }
  render() {
    let containerStyle = this.props.containerStyle || DefaultStyles.container;
    let popoverStyle = this.props.popoverStyle || DefaultStyles.popover;
    return (
      <Modal
        isOpen={this.state.isOpen}
        coverScreen={true}
        ref={modal => (this.modal = modal)}
        swipeToClose={false}
        onClosed={this.close}
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "transparent"
        }}
      >
        <View style={containerStyle}>
          <View style={popoverStyle}>{this.renderList()}</View>
        </View>
      </Modal>
    );
  }
}

const DefaultStyles = StyleSheet.create({
  container: {
    // width:400,
    // height:400,
    width: "70%",
    justifyContent: "center"
  },
  popover: {
    margin: 30,
    borderRadius: 3,
    padding: 3,
    backgroundColor: "#fff"
  },
  rowText: {
    padding: 10
  },
  separator: {
    height: 0.5,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: "#CCC"
  }
});

function openListPopover(openData: OpenData, props?: Props) {
  const onAnimationEndClosed = () => {
    topView.remove();
  };

  topView.set(
    <ListPopoverContainer
      openData={openData}
      {...props || {}}
      onAnimationEndClosed={onAnimationEndClosed}
    />
  );
}

export default {
  open: openListPopover
};

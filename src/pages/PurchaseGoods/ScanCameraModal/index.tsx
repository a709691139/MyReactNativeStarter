import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;
import Modal from "react-native-modalbox";
import styles from "./styles";
import QRScannerView from "./QRScannerView";
const urlClose = require("./assets/dingClose.png");

interface Props {
  fnScanSuccess: (barCode: string) => void;
}
@observer
export default class ScanCameraModal extends React.Component<Props, any> {
  modal = null;
  state = {
    scanData: ""
  };
  constructor(props) {
    super(props);
  }
  open = () => {
    this.modal.open();
  };
  close = () => {
    this.modal.close();
  };
  onClose() {
    console.log("Modal just closed");
  }
  onOpen() {
    console.log("Modal just opened");
  }
  onClosingState(state) {
    console.log("the open/close of the swipeToClose just changed");
  }

  barcodeReceived = e => {
    this.setState({
      scanData: "Type: " + e.type + "  data: " + e.data
    });
    this.props.fnScanSuccess(e.data);
    // console.warn("Type: " + e.type + "\nData: " + e.data);
  };

  render() {
    return (
      <Modal
        style={[styles.modal]}
        coverScreen={true}
        ref={modal => (this.modal = modal)}
        swipeToClose={false}
        onClosed={this.onClose}
        onOpened={this.onOpen}
        onClosingState={this.onClosingState}
      >
        {/* <Text style={{ fontSize: 20 }}>{this.state.scanData}</Text> */}
        <View style={{ flex: 1, width: "100%" }}>
          <QRScannerView
            hintTextPosition={120}
            hintTextStyle={{ color: "#C0C0C0" }}
            maskColor={"#0000004D"}
            borderWidth={0}
            iscorneroffset={false}
            cornerOffsetSize={0}
            scanBarAnimateTime={3000}
            onScanResultReceived={this.barcodeReceived}
            renderTopBarView={() => {
              return (
                <TouchableWithoutFeedback onPress={this.close}>
                  <Image
                    style={{
                      height: 28,
                      width: 28,
                      resizeMode: "contain",
                      margin: 16
                    }}
                    source={urlClose}
                  />
                </TouchableWithoutFeedback>
              );
            }}
            renderBottomMenuView={() => {
              return null;
            }}
          />
        </View>
      </Modal>
    );
  }
}

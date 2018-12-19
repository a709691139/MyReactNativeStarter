import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;
import { Button, InputItem, List, Icon, DatePicker } from "antd-mobile-rn";
import styles, { listItemStyle } from "./styles";
import moment from "moment";
import Modal from "react-native-modalbox";
const urlImgDate = require("images/iconDate.png");

interface Props {
  fnSuccess?: (startTime, endTime) => void;
}
@observer
export default class FilterModal extends React.Component<Props, any> {
  static defaultProps = {
    fnSuccess: () => {}
  };
  modal = null;
  state = {
    startTime: undefined,
    endTime: undefined
  };
  constructor(props) {
    super(props);
  }
  open = (startTime, endTime) => {
    this.setState({
      startTime,
      endTime
    });
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
  onChange = (value: any) => {
    this.setState({ value });
  };
  onChangeDate = (name: string, value: any) => {
    this.setState({
      [name]: value
    });
  };
  changeStartTimeAndEndTime = (startTime, endTime) => {
    this.setState({
      startTime: this.translateMomentToDate(startTime),
      endTime: this.translateMomentToDate(endTime)
    });
    // console.warn({
    //   startTime: this.translateMomentToDate(startTime),
    //   endTime: this.translateMomentToDate(endTime)
    // });
  };
  translateMomentToDate = time => {
    return time.toDate();
  };
  reset = () => {
    this.setState({
      startTime: undefined,
      endTime: undefined
    });
  };
  submit = () => {
    this.props.fnSuccess(this.state.startTime, this.state.endTime);
    this.close();
  };
  render() {
    // "YYYY-MM-DD HH:mm:ss")
    const timeBtns = [
      {
        name: "最近三个月",
        fn: () => {
          this.changeStartTimeAndEndTime(
            moment()
              .subtract(3, "month")
              .startOf("day"),
            moment().endOf("day")
          );
        }
      },
      {
        name: "今天",
        fn: () => {
          this.changeStartTimeAndEndTime(
            moment().startOf("day"),
            moment().endOf("day")
          );
        }
      },
      {
        name: "昨天",
        fn: () => {
          this.changeStartTimeAndEndTime(
            moment()
              .subtract(1, "day")
              .startOf("day"),
            moment()
              .subtract(1, "day")
              .endOf("day")
          );
        }
      },
      {
        name: "本周",
        fn: () => {
          this.changeStartTimeAndEndTime(
            moment().startOf("week"),
            moment().endOf("day")
          );
        }
      },
      {
        name: "本月",
        fn: () => {
          this.changeStartTimeAndEndTime(
            moment().startOf("month"),
            moment().endOf("day")
          );
        }
      }
    ];
    return (
      <Modal
        style={[styles.modal]}
        coverScreen={true}
        ref={modal => (this.modal = modal)}
        swipeToClose={false}
        backButtonClose={true}
        onClosed={this.onClose}
        onOpened={this.onOpen}
      >
        <View style={styles.container}>
          <Text style={styles.title}>范围筛选</Text>
          <View style={styles.dateRow}>
            <DatePicker
              value={this.state.startTime}
              mode="date"
              minDate={new Date("2018-01-01")}
              maxDate={new Date()}
              onChange={value => this.onChangeDate("startTime", value)}
              format="YYYY-MM-DD"
              extra="开始时间"
            >
              <List.Item style={styles.dateBox} styles={listItemStyle}>
                <Image
                  source={urlImgDate}
                  resizeMode="center"
                  style={styles.iconDate}
                />
              </List.Item>
            </DatePicker>
            <Text>—</Text>
            <DatePicker
              value={this.state.endTime}
              mode="date"
              minDate={new Date("2018-01-01")}
              maxDate={new Date()}
              onChange={value => this.onChangeDate("endTime", value)}
              format="YYYY-MM-DD"
              extra="结束时间"
            >
              <List.Item style={styles.dateBox} styles={listItemStyle}>
                <Image
                  source={urlImgDate}
                  resizeMode="center"
                  style={styles.iconDate}
                />
              </List.Item>
            </DatePicker>
          </View>
          <View style={styles.btnsBox}>
            {timeBtns.map((v, i) => {
              return (
                <TouchableHighlight
                  key={i}
                  style={[styles.btnsBox_btn, i % 3 == 0 && { marginLeft: 0 }]}
                  underlayColor="#DCDCDC"
                  onPress={v.fn}
                >
                  <Text style={styles.btnsBox_btn_text}>{v.name}</Text>
                </TouchableHighlight>
              );
            })}
          </View>
          <View style={styles.bottomBox}>
            <TouchableOpacity
              style={styles.bottomBox_btn}
              activeOpacity={0.8}
              onPress={this.reset}
            >
              <Text style={styles.bottomBox_btn_text}>重置</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bottomBox_btn, styles.bottomBox_btnRed]}
              activeOpacity={0.8}
              onPress={this.submit}
            >
              <Text
                style={[
                  styles.bottomBox_btn_text,
                  styles.bottomBox_btn_textRed
                ]}
              >
                确定
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

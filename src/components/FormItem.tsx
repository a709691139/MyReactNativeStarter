import React from "react";

interface Props {
  children: JSX.Element;
  value: any;
  message: string; // 错误帮助
  required?: boolean;
  pattern?: RegExp;
}
export default class FormItem extends React.PureComponent<Props, any> {
  static defaultProps = {
    message: "错误信息",
    required: false
  };
  constructor(props: any) {
    super(props);
    this.state = {
      valid: true
    };
  }
  getMessage = () => {
    return this.props.message;
  };
  checkValid = props => {
    let valid: boolean = true;
    let { value, required, pattern } = props || this.props;

    if (required) {
      valid = value != "" && value != undefined && value != null;
    }
    if (pattern) {
      valid = pattern.test(value);
    }
    this.setState({
      valid
    });
    // console.log("props", { valid, value, required, pattern });
    return valid;
  };
  componentWillReceiveProps(nextProps) {
    this.checkValid(nextProps);
  }
  componentDidMount() {}
  render() {
    return (
      this.props.children &&
      React.cloneElement(this.props.children, { error: !this.state.valid })
    );
  }
}

/* 
<FormItem
  ref={ref => {
    this.formItemRefs["legalPersonName"] = ref;
  }}
  value={this.state.legalPersonName}
  required={true}
  message="请填写联系人"
>
  <InputItem
    maxLength={20}
    clear
    type="number"
    defaultValue=""
    placeholder="请填写联系人"
    placeholderTextColor="#999999"
    styles={inputItemStyle}
    value={this.state.legalPersonName}
    onChange={legalPersonName =>
      this.setState({
        legalPersonName: legalPersonName
      })
    }
  >
    法&emsp;&emsp;人
  </InputItem>
</FormItem> */

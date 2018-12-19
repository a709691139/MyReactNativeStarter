import { observable, computed, observe, action, transaction, toJS } from "mobx";
import { NetInfo } from "react-native";

class NetWorkStore {
	@observable isNetworkConnected = true; //是否联网
	@observable isNetworkWifi = true; //是否wifi
	constructor() {
		this.addEventGetNetInfo();
	}

	changeData = (name, value) => {
		this[name] = value;
	};

	//检测网络
	@action
	addEventGetNetInfo = () => {
		//网络是否连接的监听
		NetInfo.isConnected.addEventListener(
			"isConnected",
			this.changeIsNetworkConnected
		);
		NetInfo.isConnected.fetch().done(this.changeIsNetworkConnected);
		//判断是不是wifi
		NetInfo.addEventListener("statusChange", this.changeIsNetworkWifi);
		NetInfo.fetch().done(this.changeIsNetworkWifi);
	};
	@action
	removeEventGetNetInfo = () => {
		NetInfo.isConnected.removeEventListener(
			"isConnected",
			this._handleConnectivityChange
		);
		NetInfo.removeEventListener(
			"statusChange",
			this._handleNetStatusChange
		);
	};
	@action
	changeIsNetworkConnected = isNetworkConnected => {
		this.changeData("isNetworkConnected", isNetworkConnected);
	};
	@action
	changeIsNetworkWifi = connectionInfo => {
		let isNetworkWifi = !!(
			connectionInfo == "wifi" || connectionInfo == "WIFI"
		);
		this.changeData("isNetworkWifi", isNetworkWifi);
	};
}

const netWorkStore = new NetWorkStore();
export default netWorkStore;

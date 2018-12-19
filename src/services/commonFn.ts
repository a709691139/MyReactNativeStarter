import { AsyncStorage } from "react-native";
import axios from "axios";
import RNFetchBlob from "react-native-fetch-blob";
import userStore from "stores/userStore";
import constantStore from "stores/constantStore";
import NavigationUtils from "utils/NavigationUtils";

export function toQueryString(obj) {
  //转化 {a:1,b:2} => a=1&b=2
  if (obj) {
    obj = changeSorterToOrderBy(obj);
  }
  let query = "",
    name,
    value,
    fullSubName,
    subName,
    subValue,
    innerObj,
    i;
  for (name in obj) {
    value = obj[name];
    if (value instanceof Array) {
      for (i = 0; i < value.length; ++i) {
        subValue = value[i];
        fullSubName = name + "[" + i + "]";
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += toQueryString(innerObj) + "&";
      }
    } else if (value instanceof Object) {
      for (subName in value) {
        subValue = value[subName];
        fullSubName = name + "[" + subName + "]";
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += toQueryString(innerObj) + "&";
      }
    } else if (value !== undefined && value !== null)
      query += encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";
  }
  return query.length ? query.substr(0, query.length - 1) : query;
}
function toFormData(obj) {
  // 转化 成formData
  let formData = new FormData();
  for (let name in obj) {
    formData.append(name, obj[name]);
  }
  return formData;
}
// 排序 sorter转orderBy
function changeSorterToOrderBy(sendData) {
  // sorter = {
  //   field: null, // "time"
  //   order: null // "descend","ascend"
  // };
  // orderBy: 'report_time desc,warning_instance_code asc'
  if (sendData && typeof sendData == "object") {
    let sorter = sendData.sorter;
    if (sorter && sorter.field && sorter.order) {
      let field = sorter.field.replace(/([A-Z])/g, "_$1").toLowerCase();
      let order = sorter.order == "descend" ? "desc" : "asc";
      delete sendData.sorter;
      sendData.orderBy = field + " " + order;
    }
  }
  return sendData;
}

// 拥有数据处理的post
export function interceptorAjax(method, contentType, url, sendData) {
  let timeout = 15 * 1000;
  if (typeof sendData == "object" && sendData && sendData.timeout) {
    timeout = sendData.timeout;
  }
  let transSendData = changeSorterToOrderBy(sendData);
  if (contentType == "json") {
    contentType = "application/json;charset=UTF-8";
    transSendData = JSON.stringify(sendData);
  } else if (contentType == "formData") {
    contentType = "multipart/form-data";
    transSendData = toFormData(sendData);
  } else if (contentType == "formQuery") {
    contentType = "multipart/form-data";
    url = url + "?" + toQueryString(sendData);
    transSendData = toFormData(sendData);
  } else {
    contentType = "application/x-www-form-urlencoded";
    transSendData = toQueryString(sendData);
  }
  let option = {
    timeout: timeout,
    method: method, // get | post
    url: url + (method == "get" ? "?" + transSendData : ""),
    data: transSendData,
    headers: {
      "Content-Type": contentType,
      "x-auth-token": userStore.token
    }
  };

  userStore.saveSessionStorage();
  return Promise.race([
    fetch(option.url, {
      method: option.method.toUpperCase(),
      headers: option.headers,
      body: option.method == "get" ? null : option.data
    }),
    new Promise((resolve, reject) => {
      setTimeout(
        () => reject(new Error("request timeout " + option.timeout)),
        option.timeout
      );
    })
  ])
    .then(response => {
      return response.json();
    })
    .then(response => {
      // console.log(response);
      // { code: 1, message: '成功', result: [] }
      if (response.code != 1) {
        throw response;
      }
      let result = response.result;
      // console.log(response.data.length);
      return result;
    })
    .catch(error => {
      // 这个可能要加个 错误反馈ajax。
      console.log("错误option", option, error);
      if (typeof error == "string") {
        throw error;
      }
      if (error && error.code) {
        console.warn("error", error);
        if (error.code == 2) {
          //登录状态失效  1成功，2登录失效， -1请求失败
          console.log("code 2 返回登录页");
          userStore.logoutSuccess();
          NavigationUtils.resetTo("Login");
        }
        if (!error.message) {
          throw "未知错误：" + error.code;
        } else {
          throw error.message;
        }
      } else {
        throw error;
      }
    });
  // RNFetchBlob
  return Promise.race([
    RNFetchBlob.fetch(
      option.method.toUpperCase(),
      option.url,
      option.headers,
      option.data
    ),
    new Promise((resolve, reject) => {
      setTimeout(
        () => reject(new Error("request timeout " + option.timeout)),
        option.timeout
      );
    })
  ])
    .then(response => {
      // { code: 1, message: '成功', result: [] }
      let data = response.json();
      if (data.code < 0) {
        throw data;
      }
      let result = data.result;
      return result;
    })
    .catch(error => {
      // 这个可能要加个 错误反馈ajax。
      console.log("错误option", option);
      if (typeof error == "string") {
        throw error;
      }
      if (error.code) {
        console.warn("error", error);
        if (error.code == 2) {
          //登录状态失效  1成功，2登录失效， -1请求失败
          console.log("code 2 返回登录页");
          userStore.logoutSuccess();
          NavigationUtils.resetTo("Login");
        }
        if (!error.message) {
          throw "未知错误：" + error.code;
        } else {
          throw error.message;
        }
      } else {
        throw error;
      }
    });
  return axios
    .request(option)
    .then(response => {
      // { code: 1, message: '成功', result: [] }
      if (response.data.code < 0) {
        throw response.data;
      }
      let result = response.data.result;
      // console.log(response.data.length);
      return result;
    })
    .catch(error => {
      // 这个可能要加个 错误反馈ajax。
      console.log("错误option", option, error);
      if (typeof error == "string") {
        throw error;
      }
      if (error.code) {
        console.warn("error", error);
        if (error.code == 2) {
          //登录状态失效  1成功，2登录失效， -1请求失败
          console.log("code 2 返回登录页");
          userStore.logoutSuccess();
          NavigationUtils.resetTo("Login");
        }
        if (!error.message) {
          throw "未知错误：" + error.code;
        } else {
          throw error.message;
        }
      } else {
        throw error;
      }
    });
  // return ajax;
}

// 发送 json 有 rootUrl 的 post
export function hadRootUrlJsonPost(url, sendData) {
  url = constantStore.ROOT_API_URL + url;
  return interceptorAjax("post", "json", url, sendData);
}
// 发送 form 有 rootUrl 的 post
export function hadRootUrlFormPost(url, sendData) {
  url = constantStore.ROOT_API_URL + url;
  return interceptorAjax("post", "form", url, sendData);
}
// 发送 formData 有 rootUrl 的 post
export function hadRootUrlFormDataPost(url, sendData) {
  url = constantStore.ROOT_API_URL + url;
  return interceptorAjax("post", "formData", url, sendData);
}
// 发送 form 有 rootUrl 的 post 拼接字符串 ，奇葩方法，post还是通过拼url来传参
export function hadRootUrlFormQueryPost(url, sendData) {
  url = constantStore.ROOT_API_URL + url;
  return interceptorAjax("post", "formQuery", url, sendData);
}

// 发送 form 有 rootUrl 的 get
export function hadRootUrlFormGet(url, sendData) {
  url = constantStore.ROOT_API_URL + url;
  return interceptorAjax("get", "form", url, sendData);
}

//post

//获取本地存储
export function getLocalStorage(key) {
  return AsyncStorage.getItem(key).then(value => {
    if (value === null) {
      return false;
    }
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  });
}

//保存本地存储
export function saveLocalStorage(key, value) {
  if (typeof value == "object") {
    value = JSON.stringify(value);
  }
  return AsyncStorage.setItem(key, value);
}

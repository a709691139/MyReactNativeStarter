import { hadRootUrlFormGet } from "services/commonFn";

import constantStore from "stores/constantStore";
import axios from "axios";
import { toQueryString } from "services/commonFn";
import LocalService from "./LocalService";
const ak = "mBSKa7ybmbd84x6hoXOXT4Tk9lbhQiYs";

function fnGet(url: string, params?: Object) {
  let option = {
    timeout: 10000,
    method: "get",
    url: url,
    params: params
  };
  return axios.request(option).then(response => {
    console.log(response.data);
    return response.data;
  });
}

// 地址与定位
export default class LocationService {
  constructor() {}

  // 通过 关键字 查找 地址列表
  static getPositionListBySearchWord(query: string) {
    let url = "http://api.map.baidu.com/place/v2/search";
    let sendData = {
      ak: ak,
      output: "json",
      region: "全国",
      query: query
    };
    /* return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve({"status":0,"message":"ok","results":[{"name":"礼乐镇","location":{"lat":22.535154,"lng":113.096369},"address":"广东省江门市江海区中国移动鸿基电讯特约代理点北","province":"广东省","city":"江门市","area":"江海区","street_id":"95b3e1547e78b05512882461","detail":1,"uid":"61f634f6cda1b97b6a49f38d"},{"name":"礼乐文华住宅区","location":{"lat":22.542486,"lng":113.091723},"address":"文华住宅区35幢附近","province":"广东省","city":"江门市","area":"江海区","street_id":"34059f97f595875471455b50","detail":1,"uid":"34059f97f595875471455b50"},{"name":"礼乐加油站","location":{"lat":22.561969,"lng":113.09412},"address":"江门市江海区礼义路13号","province":"广东省","city":"江门市","area":"江海区","street_id":"7c5e480bb18084b4adb22a50","detail":1,"uid":"7c5e480bb18084b4adb22a50"},{"name":"礼乐三路","location":{"lat":22.546488,"lng":113.091923},"address":"广东省江门市江海区","detail":0,"uid":"45eda413e1d36cf6ef74f8fb"},{"name":"礼乐中学","location":{"lat":22.546283,"lng":113.091028},"address":"广东省江门市江海区礼乐大道三路2号","province":"广东省","city":"江门市","area":"江海区","street_id":"8ab0dfc44ce6a316d8eced50","detail":1,"uid":"8ab0dfc44ce6a316d8eced50"},{"name":"礼乐新民","location":{"lat":22.558959,"lng":113.090163},"address":"42路","detail":0,"uid":"9c4e8cb01a3b7b8a3310af53"},{"name":"礼乐站","location":{"lat":22.534681,"lng":113.094896},"address":"5路;32路;32路短线;46路;58路","detail":0,"uid":"f39ddcb530ee3e62e812e42c"},{"name":"礼乐中心小学","location":{"lat":22.535077,"lng":113.102555},"address":"广东省江门市江海区威东华路里与一零三乡道交汇处以东150米","province":"广东省","city":"江门市","area":"江海区","street_id":"637df60ac4bd827240afe650","detail":1,"uid":"637df60ac4bd827240afe650"},{"name":"礼乐站","location":{"lat":22.551333,"lng":113.084184},"address":"新民二路","province":"广东省","city":"江门市","area":"江海区","street_id":"4ef039e61d0047660bf5eb33","detail":1,"uid":"4ef039e61d0047660bf5eb33"},{"name":"礼乐一路","location":{"lat":22.560575,"lng":113.090956},"address":"广东省江门市","detail":0,"uid":"8914c2d4eab8d63de315f9fb"}]})
      },500)
    }); */
    return fnGet(url, sendData);
  }

  // 地点输入提示
  static getSearchListBySearchWord(query: string, region?: string) {
    let url = "http://api.map.baidu.com/place/v2/suggestion";
    let sendData = {
      ak: ak,
      output: "json",
      region: region || "全国",
      city_limit: false,
      query: query
      // location: `${latitude},${longitude}`
    };
    /* return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve({"status":0,"message":"ok","result":[{"name":"广州塔","location":{"lat":23.112223,"lng":113.331084},"uid":"45d8aa46648681673a13fd63","province":"广东省","city":"广州市","district":"海珠区","business":"","cityid":"257"}]})
      },500)
    }); */
    return fnGet(url, sendData);
  }

  // 通过 gps 查找 地址列表
  static getPositionListByGps(longitude: number, latitude: number) {
    let url = "http://api.map.baidu.com/geocoder/v2/";
    let sendData = {
      ak: ak,
      output: "json",
      pois: 1,
      location: `${latitude},${longitude}`
    };
    /* return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve({"status":0,"message":"ok","results":[{"name":"礼乐镇","location":{"lat":22.535154,"lng":113.096369},"address":"广东省江门市江海区中国移动鸿基电讯特约代理点北","province":"广东省","city":"江门市","area":"江海区","street_id":"95b3e1547e78b05512882461","detail":1,"uid":"61f634f6cda1b97b6a49f38d"},{"name":"礼乐文华住宅区","location":{"lat":22.542486,"lng":113.091723},"address":"文华住宅区35幢附近","province":"广东省","city":"江门市","area":"江海区","street_id":"34059f97f595875471455b50","detail":1,"uid":"34059f97f595875471455b50"},{"name":"礼乐加油站","location":{"lat":22.561969,"lng":113.09412},"address":"江门市江海区礼义路13号","province":"广东省","city":"江门市","area":"江海区","street_id":"7c5e480bb18084b4adb22a50","detail":1,"uid":"7c5e480bb18084b4adb22a50"},{"name":"礼乐三路","location":{"lat":22.546488,"lng":113.091923},"address":"广东省江门市江海区","detail":0,"uid":"45eda413e1d36cf6ef74f8fb"},{"name":"礼乐中学","location":{"lat":22.546283,"lng":113.091028},"address":"广东省江门市江海区礼乐大道三路2号","province":"广东省","city":"江门市","area":"江海区","street_id":"8ab0dfc44ce6a316d8eced50","detail":1,"uid":"8ab0dfc44ce6a316d8eced50"},{"name":"礼乐新民","location":{"lat":22.558959,"lng":113.090163},"address":"42路","detail":0,"uid":"9c4e8cb01a3b7b8a3310af53"},{"name":"礼乐站","location":{"lat":22.534681,"lng":113.094896},"address":"5路;32路;32路短线;46路;58路","detail":0,"uid":"f39ddcb530ee3e62e812e42c"},{"name":"礼乐中心小学","location":{"lat":22.535077,"lng":113.102555},"address":"广东省江门市江海区威东华路里与一零三乡道交汇处以东150米","province":"广东省","city":"江门市","area":"江海区","street_id":"637df60ac4bd827240afe650","detail":1,"uid":"637df60ac4bd827240afe650"},{"name":"礼乐站","location":{"lat":22.551333,"lng":113.084184},"address":"新民二路","province":"广东省","city":"江门市","area":"江海区","street_id":"4ef039e61d0047660bf5eb33","detail":1,"uid":"4ef039e61d0047660bf5eb33"},{"name":"礼乐一路","location":{"lat":22.560575,"lng":113.090956},"address":"广东省江门市","detail":0,"uid":"8914c2d4eab8d63de315f9fb"}]})
      },500)
    }); */
    return fnGet(url, sendData);
  }

  // 转换 手机gps 为 百度gps
  static transformGpsToBMapGps(longitude: number, latitude: number) {
    let url = "http://api.map.baidu.com/geoconv/v1/";
    let sendData = {
      ak: ak,
      output: "json",
      from: 1,
      to: 5,
      coords: `${longitude},${latitude}`
    };
    /* return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve({"status":0,"result":[{"x":113.09062990762908,"y":22.623568861947525}]})
      },500)
    }); */
    return fnGet(url, sendData);
  }

  // 逆地理位置编码
  static transformGpsToAddress(longitude: number, latitude: number) {
    let url = "http://api.map.baidu.com/geocoder/v2/";
    let sendData = {
      ak: ak,
      pois: 0,
      output: "json",
      location: `${latitude},${longitude}`,
      latest_admin: 1
    };
    /* return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve({"status":0,"result":{"location":{"lng":115.69999999999995,"lat":35.658650898203038},"formatted_address":"山东省菏泽市鄄城县","business":"","addressComponent":{"country":"中国","country_code":0,"country_code_iso":"CHN","country_code_iso2":"CN","province":"山东省","city":"菏泽市","city_level":2,"district":"鄄城县","town":"","adcode":"371726","street":"","street_number":"","direction":"","distance":""},"pois":[{"addr":"菏泽市鄄城县","cp":" ","direction":"北","distance":"720","name":"吴店","poiType":"行政地标","point":{"x":115.69957576600646,"y":35.6533790399326},"tag":"行政地标;村庄","tel":"","uid":"2848ffd6d0dd4c0e48cc4ac6","zip":"","parent_poi":{"name":"","tag":"","addr":"","point":{"x":0.0,"y":0.0},"direction":"","distance":"","uid":""}},{"addr":"菏泽市鄄城县","cp":" ","direction":"东南","distance":"774","name":"杜杨红村","poiType":"行政地标","point":{"x":115.69588373036045,"y":35.66323276448692},"tag":"行政地标;村庄","tel":"","uid":"3dc9befd4c4fb117bea240c6","zip":"","parent_poi":{"name":"","tag":"","addr":"","point":{"x":0.0,"y":0.0},"direction":"","distance":"","uid":""}}],"roads":[],"poiRegions":[],"sematic_description":"吴店北720米","cityCode":353}})
      },500)
    }); */
    return fnGet(url, sendData);
  }

  // 获取 省市区列表
  static getRegionTree = async () => {
    let url = "/system/region/getTree";
    let sendData = {};
    /* return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          [{"id":110000,"name":"北京","parentId":100000,"shortName":null,"levelType":1,"cityCode":"","zipCode":null,"mergerName":null,"longitude":null,"latitude":null,"pinyin":null,"text":"北京","parentName":null,"children":[{"id":110100,"name":"北京市","parentId":110000,"shortName":null,"levelType":2,"cityCode":"010","zipCode":null,"mergerName":null,"longitude":null,"latitude":null,"pinyin":null,"text":"北京市","parentName":null,"children":[{"id":110101,"name":"东城区","parentId":110100,"shortName":null,"levelType":3,"cityCode":"010","zipCode":null,"mergerName":null,"longitude":null,"latitude":null,"pinyin":null,"text":"东城区","parentName":null,"children":[]}]}]}]
        , 1500);
    }); */
    const localResponse: Array<any> = await LocalService.getRegionTree();
    if (localResponse) {
      return localResponse;
    } else {
      const webResponse: Array<any> = await hadRootUrlFormGet(url, sendData);
      LocalService.saveRegionTree(webResponse);
      return webResponse;
    }
  };
}

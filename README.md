# myreactnativestarter


## 测试账号 


## 项目语法 
typscript

## 首次运行项目
### 开发环境
[RN安装教程](https://reactnative.cn/docs/0.51/getting-started.html)
```bash 
yarn install
react-native run-android
```
* 安装apk到真机手机，摇晃手机，出现调试弹窗，点击dev setting，点击debug server host，输入 本机ip+":8081"，在reload
* 如果服务器窗口没打开，就 yarn start

### 打包项目
[打包教程](http://www.reactnative.vip/thread-12-1-1.html)

#### android打包：
* 签名
```bash 
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

* 更换签名文件地址 
```bash 
'/android/app/build/gradle'
```

* 打包bundle文件
```bash 
curl -k "http://localhost:8081/index.android.bundle" > android/app/src/main/assets/index.android.bundle
```

* 进去/android目录 打包apk
```bash 
gradlew assembleRelease
```

#### ios打包：
打包源为 generic ios device
product -> scheme -> edit scheme -> archieve
product -> archieve

* 热更新
```bash 
// 上传包
pushy uploadApk android/app/build/outputs/apk/release/app-release.apk
pushy uploadIpa <your-package.ipa>
// 上传热更新
pushy bundle --platform <ios|android>
```

* 获取签名验证 md5 sha1
```bash 
keytool -list -v -keystore my-release-key.keystore
```

## rn中文网热更新
https://github.com/reactnativecn/react-native-pushy/blob/master/docs/guide3.md
http://update.reactnative.cn/login


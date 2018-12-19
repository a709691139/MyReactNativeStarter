const html = `
<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <style>
    html,
    body {
      width: 100%;
      height: 100%;
      position: relative;
    }

    * {
      padding: 0;
      margin: 0;
    }
    .anchorBL{
        display:none;
    }
    #root {
      width: 100%;
      height: 100%;
    }

    .centerMarker {
      display: block;
      position: absolute;
      width: 20px;
      height: 25px;
      left: 50%;
      top: 50%;
      margin-left: -10px;
      margin-top: -12.5px;
      background: url("http://api0.map.bdimg.com/images/marker_red_sprite.png") no-repeat;
    }

    .centerMarker::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background: url("http://api0.map.bdimg.com/images/marker_red_sprite.png") no-repeat;
      background-position: -20px 0;
      margin: 5px 0 0 7px;
    }

    #errorBox {
      position: absolute;
      width: 100%;
      top: 10px;
      left: 0;
      font-size: 20px;
      z-index: 999;
    }
  </style>
  <script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=mBSKa7ybmbd84x6hoXOXT4Tk9lbhQiYs"></script>
  <!-- <script type="text/javascript" src="http://api.map.baidu.com/api?type=lite&v=1.0&ak=mBSKa7ybmbd84x6hoXOXT4Tk9lbhQiYs"></script> -->

</head>

<body>
  <div id='root'></div>
  <span class='centerMarker'></span>
  <p id='errorBox'></p>
</body>
<script>
  var map = new BMap.Map("root");
  var point = new BMap.Point(116.404, 39.915);
  map.centerAndZoom(point, 17);
  map.enableScrollWheelZoom(true);


  var timer = null;

  // 发送消息给rn
  function postMessageToRn(sendData) {
    window.postMessage && window.postMessage(JSON.stringify(sendData), '/');
  }
  // 报错信息
  function showError(text) {
    document.getElementById('errorBox').innerHTML = JSON.stringify(text);
  }
  // 改变中心点
  function postChangeCenter() {
    var point = map.getCenter();
    var sendData = { type: 'changeCenter', data: { longitude: point.lng, latitude: point.lat } };
    postMessageToRn(sendData);
  }
  map.addEventListener("dragstart", function (e) {
    timer && clearTimeout(timer);
  })
  map.addEventListener("dragend", function (e) {
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      postChangeCenter();
    }, 300);
  })

  window.onload = function () {
    setTimeout(function () {
      try {
        postMessageToRn({ type: 'loaded' });
        document.addEventListener("message", function (e) {
          var response = JSON.parse(e.data);
          var data = response.data;
          switch (response.type) {
            case "center":
              var point = new BMap.Point(data.longitude, data.latitude);
              map.setCenter(point);
              break;
            default:
              break;
          }
        });
      } catch (e) {
        showError(e.message);
      }
    }, 1000);
  }

</script>

</html>
`;

export default html;

var TOOL={};

/**
 * judge device type(pc or phone)
 * return string
 * blog link:http://www.cnblogs.com/babycool/p/3583114.html
 */
TOOL.getDeviceType = function() {
  var userAgent = navigator.userAgent.toLowerCase();
  var isIpad = userAgent.match(/ipad/i) == "ipad";
  var isIphoneOs = userAgent.match(/iphone os/i) == "iphone os";
  var isMidp = userAgent.match(/midp/i) == "midp";
  var isUc7 = userAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var isUc = userAgent.match(/ucweb/i) == "ucweb";
  var isAndroid = userAgent.match(/android/i) == "android";
  var isCE = userAgent.match(/windows ce/i) == "windows ce";
  var isWM = userAgent.match(/windows mobile/i) == "windows mobile";
  if (isIpad || isIphoneOs || isMidp || isUc7 || isUc || isAndroid || isCE || isWM) {
    return "phone";
  } else {
    return "pc";
  }
};

/**
 * 用于事件的处理
 * ie 不支持参数默认赋值，link:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters
 */
TOOL.Event = {
  addHandler: function(element, type, handler, useCapturing) {
    if(element.addEventListener) {
      // IE9、Firefox、Safari、Chrome 和Opera 支持DOM2 级事件处理程序。
      element.addEventListener(type, handler, useCapturing || false);
    } else if(element.attachEvent) {
      // IE<9
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },
  removeHandler: function(element, type, handler,useCapturing) {
    if(element.removeEventListener) {
      // IE9、Firefox、Safari、Chrome 和Opera 支持DOM2 级事件处理程序。
      element.removeEventListener(type, handler, useCapturing || false);
    } else if(element.detachEvent) {
      // IEe<9
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  },
  getEvent: function(event) {
    return event ? event : window.event;
  },
  // 阻止事件传播
  stopPropagation: function(event) {
    if (event.stopPropagation){
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },
  // 阻止默认行为
  stopDefault: function(event) {
    if (event.preventDefault){
      event.preventDefault();
    } else {
        event.returnValue = false;
    }
  }
}

// 获取一个随机数字符串，用来做对比
TOOL.getRandomNum = function(len) {
  var numString = String(Math.random());
  if (len) {
    return numString.substring(0,len);
  } else {
    return numString;
  }
}

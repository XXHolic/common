;(function () {
  'use strict';
  var CANVAS = {
    // 处理显示模糊问题
    createElement: function(w=300,h=150) {
      var ratio = window.devicePixelRatio || 1;
      var canvas = document.createElement('canvas');
      canvas.width = w * ratio; // 实际渲染像素
      canvas.height = h * ratio; // 实际渲染像素
      canvas.style.width = w + 'px'; // 控制显示大小
      canvas.style.height = h + 'px'; // 控制显示大小
      canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
      return canvas;
    },
    // 生成有圆角的矩形
    drawRoundedRect: function(context, x, y, width, height, radius) {
      context.beginPath();
      context.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
      context.lineTo(width - radius + x, y);
      context.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
      context.lineTo(width + x, height + y - radius);
      context.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
      context.lineTo(radius + x, height + y);
      context.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
      context.closePath();
    },
    // 文本换行处理，并返回实际文字所占据的高度
    textEllipsis: function(context, text, x, y, maxWidth, lineHeight, row) {
      if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
        return;
      }
      var canvas = context.canvas;

      if (typeof maxWidth == 'undefined') {
        maxWidth = canvas && canvas.width || 300;
      }

      if (typeof lineHeight == 'undefined') {
        // 有些情况取值结果是字符串，比如 normal。所以要判断一下
        var getLineHeight = window.getComputedStyle(canvas).lineHeight;
        var reg=/^[0-9]+.?[0-9]*$/;
        lineHeight = reg.test(getLineHeight)? getLineHeight:20;
      }

      // 字符分隔为数组
      var arrText = text.split('');
      // 文字最终占据的高度，放置在文字下面的内容排版，可能会根据这个来确定位置
      var textHeight = 0;
      // 每行显示的文字
      var showText = '';
      // 控制行数
      var limitRow = row;
      var rowCount = 0;

      for (var n = 0; n < arrText.length; n++) {
        var singleText = arrText[n];
        var connectShowText = showText + singleText;
        // 没有传控制的行数，那就一直换行
        var isLimitRow = limitRow ? rowCount === (limitRow - 1) : false;
        var measureText = isLimitRow ? (connectShowText+'……') : connectShowText;
        var metrics = context.measureText(measureText);
        var textWidth = metrics.width;

        if (textWidth > maxWidth && n > 0 && rowCount !== limitRow) {
          var canvasShowText = isLimitRow?measureText:showText;
          context.fillText(canvasShowText, x, y);
          showText = singleText;
          y += lineHeight;
          textHeight += lineHeight;
          rowCount++;
          if (isLimitRow) {
            break;
          }
        } else {
          showText = connectShowText;
        }
      }
      if (rowCount !== limitRow) {
        context.fillText(showText, x, y);
      }

      var textHeightValue = rowCount < limitRow ? (textHeight + lineHeight): textHeight;
      return textHeightValue;
    },
    log: function(...args) {
      console.log(...args)
    },
    info: function(...args) {
      console.info(...args)
    }
  }

  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd){
    define(function(){
      return CANVAS;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = CANVAS;
  } else {
    window.CANVAS = CANVAS;
  }

}());
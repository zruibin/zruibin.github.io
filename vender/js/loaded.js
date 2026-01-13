/**
  * loaded.js
  * zruibin.cn
  *
  * Created by Ruibin.Chow on 23/02/14.
  * Copyright (c) 2023年 Ruibin.Chow. All rights reserved.
  */

 let articleDir = "article/";

 function isSubDirectory() {
   var url =  window.location.href;
   return url.indexOf(articleDir) > 0 ? true : false;
 }

 function isArticle() {
    if ("undefined" != typeof sourceFile && sourceFile.length > 0) return true;
    return false;
}

//当页面加载状态改变的时候执行这个方法.
document.onreadystatechange = () => {
    loadingView(true);

    // console.log(document.readyState);
    if (document.readyState == 'uninitialized') {
        //还未开始载入 
        // console.log('uninitialized');
    }

    if (document.readyState == 'loading') {
        //载入中
        // console.log('loading');
    }

    if (document.readyState == 'interactive') {
        //已加载，文档与用户可以开始交互 
        // console.log('Interactive');
    }

    if (document.readyState == 'complete') {
        //载入完成 
        // console.log('Completed');

        //防止网页被别站用 iframe嵌套
        if (self != top) {
            window.top.location.replace(self.location); //防止用iframe调用
            console.log(self.location.href);
        }
        makeTheBackToTopView();
        articleDefaultLoad();
        viewBehavior(true);
        setTimeout("loadingView(false)", 50);

        if (isArticle()) {
            loadingImage();
            mathOnDidLoad();
        }
    }
}

function loadingView(isShow) {
    var maskDiv =  '\
        <div class="spinner"> \
            <div class="double-bounce1"></div> \
            <div class="double-bounce2"></div> \
        </div>';

    var mask = document.getElementById('overlayMask');
    if (isShow) {
        if (!mask) {
            var element = document.createElement("div");
            element.id = "overlayMask";
            element.style.visibility = "visible";
            element.innerHTML = maskDiv
            document.body.appendChild(element);
        }
    } else {
        mask.parentNode.removeChild(mask);
    }
}

function viewBehavior(viewDidload) {
    var action = viewDidload ? "visible" : "hidden";
    document.body.style.visibility = action;
}

function animate(obj, json, interval, sp, fn) {
    clearInterval(obj.timer);
    function getStyle(obj, arr) {
        if (obj.currentStyle) {
            return obj.currentStyle[arr];  //针对ie
        } else {
            return document.defaultView.getComputedStyle(obj, null)[arr];
        }
    }
    obj.timer = setInterval(function () {
        //j ++;
        var flag = true;
        for (var arr in json) {
            var icur = 0;
            if (arr == "opacity") {
                icur = Math.round(parseFloat(getStyle(obj, arr)) * 100);
            } else {
                icur = parseInt(getStyle(obj, arr));
            }
            var speed = (json[arr] - icur) * sp;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (icur != json[arr]) {
                flag = false;
            }
            if (arr == "opacity") {
                obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
                obj.style.opacity = (icur + speed) / 100;
            } else {
                obj.style[arr] = icur + speed + "px";
            }
        }

        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, interval);
}

/*----------------------------------------------------------------------------*/

var loadFiles = [
    "vender/css/fontawesome/css/solid.css",
    "vender/css/fontawesome/css/fontawesome.css",

    "vender/font/font.css",
    "vender/js/default.js",
    "vender/js/article.default.js",
    // "vender/js/color-scheme.js",
    "vender/css/default.css",
    "vender/css/article.default.css",
    "vender/search/search.css",
    "vender/search/search.js",
    "vender/copyright/copyright.css",
    "vender/copyright/copyright.js",
    "vender/tags/tags.js",

    "vender/js/tongji.js",
];

if (isArticle()) {
    // 用concat方法把两个或者多个数组连接在一起，但是不改变已经存在的数组
    // 而是返回一个连接之后的新数组
    loadFiles = loadFiles.concat([
        "vender/loadImage/loadImage.js",
        "vender/preview/preview.js",
        "vender/preview/preview.css",
        "vender/jump/jump.css",
        "vender/jump/jump.js",
        "vender/category/category.css",
        "vender/category/category.js",

        "vender/share/qrcode.min.js",
        "vender/share/share.css",
        "vender/share/share.js",

        "vender/math/MathJax/tex-chtml.js?config=TeX-AMS-MML_HTMLorMML",
        "vender/math/math.css",
        "vender/math/math.js",

        // 语法高亮
        "vender/js/highlight/zruibin_code.css",
        "vender/js/highlight/highlight.min.js"
    ]);
}

var loadDstFiles = [];
Array.prototype.slice.call(loadFiles).forEach(element => {
    // console.log(sourcePrefix + element);
    loadDstFiles.push(sourcePrefix + element);
});

seajs.use(loadDstFiles, 
    function() {
        if (isArticle()) {
            hljs.configure({
                // 忽略未经转义的 HTML 字符
                ignoreUnescapedHTML: true,
            });
            hljs.highlightAll();
        }
        RBReady(changeFrame);
    }
);

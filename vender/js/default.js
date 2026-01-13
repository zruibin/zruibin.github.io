/**
  * default.js
  * zruibin.cc
  *
  * Created by Ruibin.Chow on 15/10/17.
  * Copyright (c) 2015年 Ruibin.Chow. All rights reserved.
  */

/*
 * 传递函数给RBReady()
 * 当文档解析完毕且为操作准备就绪时，函数作为document的方法调用
 */
var RBReady = (function() { //这个函数返回whenReady()函数
    var funcs = []; //当获得事件时，要运行的函数
    var ready = false; //当触发事件处理程序时,切换为true

    //当文档就绪时,调用事件处理程序
    function handler(e) {
        if(ready) return; //确保事件处理程序只完整运行一次
        
        //如果发生onreadystatechange事件，但其状态不是complete的话,那么文档尚未准备好
        if(e.type === 'onreadystatechange' && document.readyState !== 'complete') {
            return;
        }
        
        //运行所有注册函数
        //注意每次都要计算funcs.length
        //以防这些函数的调用可能会导致注册更多的函数
        for(var i=0; i<funcs.length; i++) {
            funcs[i].call(document);
        }
        //事件处理函数完整执行,切换ready状态, 并移除所有函数
        ready = true;
        funcs = null;
    }
    //为接收到的任何事件注册处理程序
    if(document.addEventListener) {
        document.addEventListener('DOMContentLoaded', handler, false);
        document.addEventListener('readystatechange', handler, false);            //IE9+
        window.addEventListener('load', handler, false);
    }else if(document.attachEvent) {
        document.attachEvent('onreadystatechange', handler);
        window.attachEvent('onload', handler);
    }
    //返回whenReady()函数
    return function whenReady(fn) {
        if(ready) { fn.call(document); }
        else { funcs.push(fn); }
    }
})();

//------------------------------------------------------------------------------------

function getElementsByClassName(className, root, tagName) 
{ //root：父节点，tagName：该节点的标签名。 这两个参数均可有可无
    if (root) {
        root = typeof root == "string" ? document.getElementById(root) : root;
    } else {
        root = document.body;
    }
    tagName = tagName || "*";
    if (document.getElementsByClassName) {//如果浏览器支持getElementsByClassName，就直接的用
        return root.getElementsByClassName(className);
    } else {
        var tag = root.getElementsByTagName(tagName);    //获取指定元素
        var tagAll = []; //用于存储符合条件的元素
        for (var i = 0; i < tag.length; i++) {//遍历获得的元素
            for (var j = 0, n = tag[i].className.split(' ') ; j < n.length; j++) {//遍历此元素中所有class的值，如果包含指定的类名，就赋值给tagnameAll
                if (n[j] == className) {
                    tagAll.push(tag[i]);
                    break;
                }
            }
        }
        return tagAll;
    }
}

function getStyle(obj,styleName)
{
    if(obj.currentStyle){
        return obj.currentStyle[styleName];
    }else{
        return getComputedStyle(obj,null)[styleName];
    }
}

function getElementsClass(classnames)
{ 
    var classobj= new Array();//定义数组 
    var classint=0;//定义数组的下标 
    var tags=document.getElementsByTagName("*");//获取HTML的所有标签 
    for(var i in tags) {//对标签进行遍历 
        if(tags[i].nodeType==1){//判断节点类型 
            if(tags[i].getAttribute("class") == classnames) {//判断和需要CLASS名字相同的，并组成一个数组 
                classobj[classint]=tags[i]; 
                classint++; 
            } 
        }
    }
    return classobj;//返回组成的数组 
}

function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) { // 处理IE
        script.onreadystatechange = function () {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null;
                callback();
            }
        }
    } else {  // 处理其他浏览器的情况
        script.onload = function () {
            callback();
        }
    }
    script.src = url;
    document.body.appendChild(script);
}

function detectOS() {  
        var sUserAgent = navigator.userAgent;  
        var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");  
        var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") 
                            || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");  
        if (isMac) return "Mac";  
        var isUnix = (navigator.platform == "X11") && !isWin && !isMac;  
        if (isUnix) return "Unix";  
        var isLinux = (String(navigator.platform).indexOf("Linux") > -1);  
        if (isLinux) return "Linux";  
        if (isWin) {  
            var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;  
            if (isWin2K) return "Win2000";  
            var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;  
            if (isWinXP) return "WinXP";  
            var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;  
            if (isWin2003) return "Win2003";  
            var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;  
            if (isWinVista) return "WinVista";  
            var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;  
            if (isWin7) return "Win7";  
        }  
        return "other";  
 }  
      

function isMobile() {
     var sUserAgent = navigator.userAgent.toLowerCase(),
     bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
     bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
     bIsMidp = sUserAgent.match(/midp/i) == "midp",
     bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
     bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
     bIsAndroid = sUserAgent.match(/android/i) == "android",
     bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
     bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile",
     bIsWebview = sUserAgent.match(/webview/i) == "webview";
     return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
}


//大于等于(1024×768)就返回真
function isBigResolution() 
{  
    var w = screen.width;
    var h = screen.height;
    // alert("经系统检测，你的屏幕分辨率为 " + w +"*" +  h);  
    if (w>=768) {
        return true;
    } else {
        return false;
    }
}


//返回顶部
function scrollToTop() { 
    //把内容滚动指定的像素数（第一个参数是向右滚动的像素数，第二个参数是向下滚动的像素数） 
    window.scrollBy(0,-1000); 
    //延时递归调用，模拟滚动向上效果 
    scrolldelay = setTimeout('scrollToTop()', 10); 
    //获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，
    //否则取document.body.scrollTop；因为二者只有一个会生效，另一个就恒为0，所以取和值可以得到网页的真正的scrollTop值 
    var sTop=document.documentElement.scrollTop+document.body.scrollTop; 
    //判断当页面到达顶部，取消延时代码（否则页面滚动到顶部会无法再向下正常浏览页面） 
    if(sTop==0) clearTimeout(scrolldelay); 
}

function makeTheBackToTopView () {
    if (isMobile()) {
        document.body.addEventListener("touchstart", function(){ }); //移动端中的hover处理
        return ;
    }

    var iconObj = document.createElement("i");
    iconObj.className = "fa fa-arrow-up common-float-icon";
    iconObj.addEventListener("click", scrollToTop, false);
    iconObj.style.position = "fixed";
    iconObj.style.right = "4%";
    iconObj.style.bottom = "6%";
    iconObj.style.display = "none";
    document.body.appendChild(iconObj);

    window.addEventListener("scroll", () => {
        let seeHeight = document.documentElement.clientHeight;
        let windowH = document.documentElement.scrollHeight || document.body.scrollHeight;
        let currentY = document.documentElement.offsetTop || window.pageYOffset || document.body.offsetTop;
        let precent = currentY / (windowH - seeHeight) * 100;
        iconObj.style.display = precent > 1.0 ? "" : "none";
    });
}


function changeDNS() {
    var url =  window.location.href;
    // console.log(url);
    if (url.indexOf("zruibin.cc") > 0) {
        window.location.href = "https://zruibin.cn";
    }
}

changeDNS();

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

//--------------------- test -----
//  function t1() {
//     console.log('t1');
// }
// function t2() {
//     console.log('t2');
// }
// // t2-t1-t2
// RBReady(t1);
// t2();
// RBReady(t2);



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
    window.scrollBy(0,-100); 
    //延时递归调用，模拟滚动向上效果 
    scrolldelay = setTimeout('scrollToTop()', 10); 
    //获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，
    //否则取document.body.scrollTop；因为二者只有一个会生效，另一个就恒为0，所以取和值可以得到网页的真正的scrollTop值 
    var sTop=document.documentElement.scrollTop+document.body.scrollTop; 
    //判断当页面到达顶部，取消延时代码（否则页面滚动到顶部会无法再向下正常浏览页面） 
    if(sTop==0) clearTimeout(scrolldelay); 
} 


document.onreadystatechange = stateChange;//当页面加载状态改变的时候执行这个方法. 

function stateChange() 
{ 
    // console.log(document.readyState);
    // makeTheMask(1);
    // document.write(document.readyState);
    if(document.readyState == 'uninitialized') {//还未开始载入 
        // console.log('uninitialized');
    }

    if(document.readyState == 'loading') {//载入中
        // console.log('loading');
    }

    if(document.readyState == 'interactive') {//已加载，文档与用户可以开始交互 
        // console.log('interactive');
    }

    if(document.readyState == 'complete') {//载入完成 
        // console.log('Completed');
        // makeTheMask(0);
        // setTimeout(makeTheMask(0), 5000);

        //防止网页被别站用 iframe嵌套
        if (self != top) {
            window.top.location.replace(self.location); //防止用iframe调用
            console.log(self.location.href);
        }
        makeTheBackToTopView();
        articleDefaultLoad();
    }
    
} 


function makeTheMask (isShow) {
    var maskDiv =  '\
        <div class="spinner"> \
            <div class="double-bounce1"></div> \
            <div class="double-bounce2"></div> \
    </div> \
    ';


    var mask = document.getElementById('overlayMask');
    if (isShow) {
        if (!mask) {
            var newElement = document.createElement("div");
            newElement.setAttribute("class","overlayMask");
            newElement.setAttribute("id","overlayMask"); 
            newElement.innerHTML = maskDiv
            document.body.appendChild(newElement);
            // document.write(maskDiv);
        }
    } else {
        mask.parentNode.removeChild(mask);
    }
}


function makeTheBackToTopView () {
    // console.log(document.documentElement.clientHeight);
    // console.log(document.body.scrollHeight);
    
    if (isMobile()) {
        console.log('isMobile...');
        document.body.addEventListener("touchstart", function(){ }); //移动端中的hover处理
        return ;
    }
    var maskDiv =  '\
        <style type="text/css">.back-to-top:before { display: block; content: " "; margin-top: 2px; width: 0; height: 0; \
                    border-width: 0 7px 8px 7px; border-color: transparent transparent #fff transparent; border-style: solid; \
            }</style> \
        <div class="back-to-top" style="position: fixed; bottom: 19px; right: 50px; z-index: 1050; width: 15px; height: 13px; padding: 5px;  \
                    background: #222; color: #fff; cursor: pointer; -webkit-transform: translateZ(0);"  onclick="scrollToTop()"> \
    </div> \
    ';
    var newElement = document.createElement("div");
    newElement.innerHTML = maskDiv
    document.body.appendChild(newElement);
}


function changeDNS() {
    var url =  window.location.href;
    console.log(url);
    if (url.indexOf("zruibin.cc") > 0) {
        window.location.href = "https://zruibin.cn";
    }
}

changeDNS();







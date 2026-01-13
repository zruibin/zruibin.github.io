/**
  * article.default.js
  * zruibin.cc
  *
  * Created by Ruibin.Chow on 15/10/17.
  * Copyright (c) 2015年 Ruibin.Chow. All rights reserved.
  */

function articleDefaultLoad() 
{
    changeNavgationSubviewsLocation();
    // changeLinkLocation();
}

function changeFrame () 
{
    checkoutAction();
    // changeLinkLocation();
}


window.onresize = function() { 
    // console.log('change');
    changeFrame();
}


function selectorOnChange(value) 
{
    // console.log(value);
    location.href = value; 
}

function changeNavgationSubviewsLocation () 
{
    var subsArray = getElementsByClassName('subs');
    for(var i=0;i<subsArray.length;i++){
        var subs = subsArray[i];
        // console.log(subs);
        if (window.screen.width < 500) {
            var x = window.screen.width / 2 - 75;
            subs.style.left= x + "px";
        };
    }
}

function changeLinkLocation () 
{
    var w = document.documentElement.clientWidth;
    console.log('screen.width:%f', w);
    var linkPcCss = 'background-color: #f8f8f8; width: 150px; margin: 0px 0px; padding: 10px 10px; border: 1px solid #eee; ' + 
                          'position: fixed;right: 5%; top: 10%; font-size: 16px; z-index: 1030; min-height: 50px;'; // +
    var linkMobileCss = 'background-color: #f8f8f8; margin-left: auto; margin-right: auto; margin-bottom: 10px;' + 
                              'padding-left: 10px; padding-right: 10px; border: 1px solid #eee; position: inherit; max-width: 800px;';
    var linkBlogCss = 'padding-left: 10px;';
    var link = document.getElementById('link');
    if (link) {
        var linkBlog = document.getElementsByClassName("link_blog")
        if (w>= 1200 ) { 
            link.style.cssText = linkPcCss;
        } else {
            link.style.cssText = linkMobileCss;
        }
        for(var i=0;i<linkBlog.length;i++){ 
                linkBlog[i].style.cssText = linkBlogCss;
        }
    }
}

function hiddenLink() {
    var link = document.getElementById('link');
    link.style.cssText = "display:none;"; 
}

/*----------------------------------------------------------------------------*/ 

function getQueryString(name) 
{ 
    var url = location.search; //获取url中"?"符后的字串 
    // console.log('url: ' + url);
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
} 

function checkoutAction()
{
    var action = getQueryString('action');
    action = decodeURI(action);
    if (action === "source") {
        console.info(sourceFile);
        window.location.href = "../content.html?path=./file/" + encodeURI(encodeURI(sourceFile));
    }
}

/*---------------------------------progress-------------------------------------*/ 

function mountReadingProgress() {
    if (!isArticle()) return;
    var progressDiv = document.createElement("div");
    progressDiv.style.cssText = "background-color:var(--global-color);height:.1em;width:0;position:fixed;left:0;top:0;z-index:1050;";
    document.body.appendChild(progressDiv);
    window.addEventListener("scroll", () => {
        let seeHeight = document.documentElement.clientHeight;
        let windowH = document.documentElement.scrollHeight || document.body.scrollHeight;
        let currentY = document.documentElement.offsetTop || window.pageYOffset || document.body.offsetTop;
        let precent = currentY / (windowH - seeHeight) * 100;
        progressDiv.style.width = precent + "%";
    });
}

mountReadingProgress();








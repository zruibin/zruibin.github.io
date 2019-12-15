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
    changeLinkLocation();
    // hiddenCNZZIcon();
}

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

function changeFrame () 
{
    changeLinkLocation();
}


window.onresize = function() { 
    // alert('change');
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
    // console.log('screen.width:%f', w);
    var linkPcCss = 'background-color: #f8f8f8; width: 150px; margin: 0px 0px; padding: 10px 10px; border: 1px solid #eee; ' + 
                          'position: fixed;right: 5%; top: 10%; font-size: 16px; z-index: 1030; min-height: 50px;'; // +
    var linkMobileCss = 'background-color: #f8f8f8; margin-left: auto; margin-right: auto; margin-bottom: 10px;' + 
                              'padding-left: 10px; padding-right: 10px; border: 1px solid #eee; position: inherit; max-width: 800px;';
    var linkBlogCss = 'padding-left: 10px;';
    var link = document.getElementById('link');
    var linkBlog = getElementsClass("link_blog")
    if (w>= 1200 ) { 
        link.style.cssText = linkPcCss;
    } else {
        link.style.cssText = linkMobileCss;
    }
    for(var i=0;i<linkBlog.length;i++){ 
            linkBlog[i].style.cssText = linkBlogCss;
    }
}

function hiddenLink() {
    var link = document.getElementById('link');
    link.style.cssText = "display:none;"; 
}

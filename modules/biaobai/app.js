/**
  * app.js
  * h5
  *
  * Created by Ruibin.Chow on 16/05/06.
  * Copyright (c) 2016年 Ruibin.Chow. All rights reserved.
  */
 

$(window).load(function() {
    jQuery.getScript("../../vender/js/jqueryrotate-2.3/jQueryRotate.min.js", function(){
        playMusic();
    });
});

$(document).ready(function(){
    console.log("document.....");
});

function playMusic()
{
var musicUrl = './resources/canon-brian_crain.mp3';
jQuery.getScript("../../vender/js/RBAudio.class.js", function(){
    console.info('music playing...');
    var player = new RBAudio();
    player.setPlayList([musicUrl]);
    player.play();
    var angle = 0;
    var playing = true;
    setInterval(function(){
        if (playing) {
            angle+=3;
            $("#music").rotate(angle);
        };
    },25);
    $("#music").click( function () { 
        if (playing) {
            player.pause();
        } else {
            player.play();
        }
        playing = !playing; 
    });   
});

// });
}



function getQueryString(name) 
{ 
    var url = location.search; //获取url中"?"符后的字串 
    console.log('url: ' + url);
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
} 



function attachEventForImg()
{ 
    var classobj= new Array();//定义数组 
    var classint=0;//定义数组的下标 
    var tags=document.getElementsByTagName("img");//获取HTML的所有标签 
    for(var i in tags) {//对标签进行遍历 
        if(tags[i].nodeType==1){//判断节点类型 
            // if(tags[i].getAttribute("class") == classnames) {//判断和需要CLASS名字相同的，并组成一个数组 
            //     classobj[classint]=tags[i]; 
            //     classint++; 
            // } 
            console.log('tag:' + tags[i].getAttribute("src"));
            console.log('tag src:' + tags[i].src);
            tags[i].setAttribute('onclick', 'imgOnTouchOrClick(this);');
            tags[i].setAttribute('ontouch', 'imgOnTouchOrClick(this);');
            // tags[i].onclick = function (argument) {  
            //     imgOnTouchOrClick(this);
            // }
        }
    }
    // return classobj;//返回组成的数组 
} 

function imgOnTouchOrClick(obj) 
{
    console.log(obj.src);
    alert(obj.src);
}






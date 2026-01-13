/*
 * jump.js
 *
 * Created by Ruibin.Chow on 2023/05/20.
 * Copyright (c) 2023年 Ruibin.Chow All rights reserved.
 */

var jumpList = [];

(function(){
  let titleList = document.getElementsByTagName("p");
  
  Array.prototype.slice.call(titleList).forEach(element => {
      var content = element.innerHTML;
      if (content.indexOf("原文出处：") != -1){  
          var aTag = element.firstElementChild; 
          aTag.setAttribute('name', aTag.innerHTML);

          var obj = document.createElement("div");
          obj.className = "jump-link";
          var aObj = document.createElement("a");
          aObj.href = "#" + aTag.innerHTML;
          aObj.innerText = "* " + aTag.innerHTML;
          obj.appendChild(aObj);
          jumpList.push(obj);
      } 
  });
  if (jumpList.length > 1) showJumpIcon();
})();


function showJumpIcon() {
  var iconObj = document.createElement("i");
  iconObj.id = "jump-icon";
  iconObj.className = "fa fa-bars common-float-icon";
  iconObj.addEventListener("click", showJumpView, false);
  document.body.appendChild(iconObj);
}

function showJumpView() {
  let jumpIcon = document.getElementById("jump-icon");
  var jumpView = document.getElementById("jump-view");
  if (jumpView) {
    animate(jumpView, {right:0}, .25, .05, ()=>{
      jumpIcon.style.display = "none";
    });
    return;
  }

  jumpView = document.createElement("div");
  jumpView.id = "jump-view";

  var jumpHead = document.createElement("div");
  jumpHead.id = "jump-head";
  jumpView.appendChild(jumpHead);

  var jumpTitle = document.createElement("span");
  jumpTitle.id = "jump-title";
  jumpTitle.innerText = "Index";
  jumpHead.appendChild(jumpTitle);

  var jumpClose = document.createElement("i");
  jumpClose.id = "jump-close";
  jumpClose.className = "fa fa-xmark";
  jumpClose.addEventListener("click", hideJumpView, false);
  jumpHead.appendChild(jumpClose);

  var contentObj = document.createElement("div");
  contentObj.id = "jump-content";
  jumpView.appendChild(contentObj);

  jumpList.forEach(element => {
    contentObj.appendChild(element);
  });

  document.body.appendChild(jumpView);

  animate(jumpView, {right:0}, .25, .05, ()=>{
    jumpIcon.style.display = "none";
  });
}

function hideJumpView() {
  let jumpView = document.getElementById("jump-view");
  animate(jumpView, {right:-200}, .25, .05);
  let jumpIcon = document.getElementById("jump-icon");
  jumpIcon.style.display = "";
}
/*
 * category.js
 *
 * Created by Ruibin.Chow on 2023/05/20.
 * Copyright (c) 2023年 Ruibin.Chow All rights reserved.
 */

var categoryList = [];

(function(){
  let hTagList = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  Array.prototype.slice.call(hTagList).forEach(element => {
    if (element.innerHTML.indexOf("原文出处：") == -1 &&
        element.parentElement.id == "content") {
      let obj = {
          "tag": element.tagName,
          "innerText": element.textContent
      };
      categoryList.push(obj);
      let aTag = document.createElement("a");
      let innerHTML = element.innerHTML;
      innerHTML = innerHTML.replace("<strong>", "").replace("</strong>", "");
      aTag.setAttribute('name', innerHTML);
      aTag.style.visibility = 'hidden';
      element.appendChild(aTag);
    }
  });

  if (categoryList.length > 0) showCategoryIcon();
})();


function showCategoryIcon() {
  var iconObj = document.createElement("i");
  iconObj.id = "category-icon";
  iconObj.className = "fa fa-list common-float-icon";
  iconObj.addEventListener("click", showcategoryView, false);
  document.body.appendChild(iconObj);
}

function showcategoryView() {
  let categoryIcon = document.getElementById("category-icon");
  var categoryView = document.getElementById("category-view");
  if (categoryView) {
    animate(categoryView, {left:0}, .25, .05, ()=>{
      categoryIcon.style.display = "none";
    });
    return;
  }

  categoryView = document.createElement("div");
  categoryView.id = "category-view";

  var categoryHead = document.createElement("div");
  categoryHead.id = "category-head";
  categoryView.appendChild(categoryHead);

  var categoryTitle = document.createElement("span");
  categoryTitle.id = "category-title";
  categoryTitle.innerText = "目录";
  categoryHead.appendChild(categoryTitle);

  var categoryClose = document.createElement("i");
  categoryClose.id = "category-close";
  categoryClose.className = "fa fa-xmark";
  categoryClose.addEventListener("click", hideCategoryView, false);
  categoryHead.appendChild(categoryClose);

  var contentObj = document.createElement("div");
  contentObj.id = "category-content";
  categoryView.appendChild(contentObj);

  categoryList.forEach(element => {
    var spaceStr = "";
    var headCount = parseInt(element.tag.substr(1,1)) - 1;
    for (var i = 0; i < headCount; i++) {
        spaceStr += "&nbsp;&nbsp;";
    }

    var content = element.innerText;
    if (headCount <= 1) { //h2及以上的加strong
        content = "<strong>" + content + "</strong>";
    }

    var obj = document.createElement("div");
    obj.className = "category-link";
    obj.innerHTML = spaceStr;
    var aObj = document.createElement("a");
    aObj.href = "#" + element.innerText;
    aObj.innerHTML = "· " + content;
    obj.appendChild(aObj);
    contentObj.appendChild(obj);
  });

  document.body.appendChild(categoryView);

  animate(categoryView, {left:0}, .25, .05, ()=>{
    categoryIcon.style.display = "none";
  });
}

function hideCategoryView() {
  let categoryView = document.getElementById("category-view");
  animate(categoryView, {left:-200}, .25, .05);
  let categoryIcon = document.getElementById("category-icon");
  categoryIcon.style.display = "";
}
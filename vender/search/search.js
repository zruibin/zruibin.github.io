/*
 * search.js
 *
 * Created by Ruibin.Chow on 2023/05/18.
 * Copyright (c) 2023年 Ruibin.Chow All rights reserved.
 */

/*
function showIcon() {
  var xmlns ="http://www.w3.org/2000/svg";
  var svgElem = document.createElementNS(xmlns,"svg");
  svgElem.id = "fa-search";
  svgElem.setAttributeNS(null, "viewBox","0 0 512 512");
  let coords = "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z";
  var path = document.createElementNS(xmlns, "path");
  path.setAttributeNS(null, 'd', coords);
  svgElem.appendChild(path);

  svgElem.addEventListener("click", showSearch, false);
  // document.body.appendChild(svgElem);
  document.getElementById("menu").appendChild(svgElem);
}
*/

(function(){
  var iconObj = document.createElement("i");
  iconObj.id = "search-icon";
  iconObj.className = "fa fa-magnifying-glass";
  iconObj.addEventListener("click", showSearch, false);

  // document.getElementById("menu")
  let target = document.getElementsByClassName("item")[0].parentNode.parentNode;
  target.appendChild(iconObj);
})();


var articles = [];

function fetchContent() {
  var jsonUrl = isSubDirectory() ? "../api/index.json" : "api/index.json";
  if (window.location.href.indexOf("vender/search/") > 0) {
    jsonUrl = "../../api/index.json";
  }

  fetch(jsonUrl)
  .then(response => {
    return response.json();
  })
  .then(jsondata => {
    if (jsondata.code == 0) {
      articles = jsondata.data;
    }
  });
}

function search(searchKey) {
  var content = '';
  var searchContent = document.getElementById("search-content");
  if (searchKey.length == 0) {
    searchContent.innerHTML = getNullContent();
    return;
  }

  if (articles.length == 0) {
    fetchContent();
    return;
  }

  for (var i = 0; i < articles.length; ++i) {
    let article = articles[i];

    if (article.title.toLowerCase().indexOf(searchKey.toLowerCase()) == -1 &&
      article.summary.toLowerCase().indexOf(searchKey.toLowerCase()) == -1) {
      continue;
    }

    let style = "color:red;";
    let regExp = new RegExp(searchKey,"ig");
    let newValue = '<span style="'+style+'">'+searchKey+'</span>';
    let title = article.title.replace(regExp, newValue);
    let summary = article.summary.replace(regExp, newValue);

    let href = isSubDirectory() ? article.href.replace(articleDir, "") : article.href;

    content += "<article>";
    content += '<h2><a href="' + href + '">' + title + '</a></h2>';
    content += '<p class="summary">' + summary + '</p>';
    content += "</article><hr/>";
  }

  searchContent.innerHTML = content; 
}

function searchFieldChange(event) {
  let searchKey = event.target.value;
  search(searchKey);
}

function hideSearch(event) {
  if (event.target == document.getElementById("search")) {
    event.stopPropagation();
    cancelSearch(event);
  }
}

function cancelSearch(event) {
  var searchDiv = document.getElementById("search");
  searchDiv.style.display = "none";
  document.documentElement.style.overflow = "scroll";
}

function showSearch() {
  if (articles.length == 0) {
    fetchContent();
  }

  var searchDiv = document.getElementById("search");
  if (searchDiv) {
    searchDiv.style.display = "";
  } else {
    var inputObj = document.createElement("input");
    inputObj.id = "searchField";
    inputObj.className = isMobile() ? "search-field-mobile" : "search-field";
    inputObj.placeholder = "搜索...";
    // inputObj.type = "search";
    inputObj.spellcheck = false;
    // inputObj.autocomplete = "off";
    // inputObj.autocapitalize = "off";
    inputObj.addEventListener("input", searchFieldChange, false);

    var cancelObj = document.createElement("button");
    cancelObj.id = "search-cancel";
    cancelObj.innerHTML = '<i class="fa fa-xmark">';
    cancelObj.addEventListener("click", cancelSearch, false);

    var searchInput = document.createElement("div");
    searchInput.className = "search-input";
    searchInput.appendChild(inputObj);
    searchInput.appendChild(cancelObj);
    var searchContent = document.createElement("div");
    searchContent.id = "search-content";
    searchContent.innerHTML = getNullContent();

    var searchPopup = document.createElement("div");
    searchPopup.className = isMobile() ? "search-popup-mobile" : "search-popup";
    searchPopup.appendChild(searchInput);
    searchPopup.appendChild(searchContent);

    searchDiv = document.createElement("div");
    searchDiv.id = "search";
    searchDiv.addEventListener("click", hideSearch, false);
    searchDiv.appendChild(searchPopup);
    document.body.appendChild(searchDiv);
  }

  var searchField = document.getElementById("searchField");
  if (searchField) searchField.focus();

  document.documentElement.style.overflow = "hidden";
}

function getNullContent() {
  let content = `<i id="null-search-icon" class="fa fa-magnifying-glass"></i>`;
  return content;
}






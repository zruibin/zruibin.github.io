/*
 * tags.js
 *
 * Created by Ruibin.Chow on 2023/08/05.
 * Copyright (c) 2023年 Ruibin.Chow All rights reserved.
 */

(function(){
  fetchTags()
})();

function fetchTags() {
  var jsonUrl = isSubDirectory() ? "../api/tags.json" : "api/tags.json";
  fetch(jsonUrl)
  .then(response => {
    return response.json();
  }).then(jsondata => {
    if (jsondata.code == 0) {
      makeTagsView(jsondata.data);
    }
  });
}

function makeTagsView(tags) {
  if (tags.length == 0) {
    return;
  }
  // console.log(tags);
  var content = "<ul>";

  for (var i = 0; i < tags.length; ++i) {
    let tag = tags[i];
    let href = isSubDirectory() ? tag.path : articleDir + tag.path;
    content += '<li><a href="' + href + '.html">' + tag.tagTitle + '</a></li>';
    if (i % 2 == 1) {
      content += "<br/>";
    }
  }

  content += "</ul>";

  let tagsContent = document.getElementById("tags");
  tagsContent.innerHTML = content;
}

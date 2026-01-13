/*
 * copyright.js
 *
 * Created by Ruibin.Chow on 2023/06/08.
 * Copyright (c) 2023年 Ruibin.Chow All rights reserved.
 */

(function(){

  var obj = document.createElement("p");
  obj.className = "alignright";

  var content = 'COPYRIGHT © 2014-2026 <a href="index.html">Ruibin.Chow</a> ALL RIGHTS RESERVED. &nbsp;';
  // content += '<br><a href="https://beian.miit.gov.cn/">粤ICP备2021173035号</a>';
  obj.innerHTML = content;

  let target = document.getElementById("copyright");
  target.appendChild(obj);
    
})();

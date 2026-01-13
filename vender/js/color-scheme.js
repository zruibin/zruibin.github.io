/*
 * color-scheme.js
 *
 * Created by Ruibin.Chow on 2023/09/17.
 * Copyright (c) 2023年 Ruibin.Chow All rights reserved.
 */

(function(){
  'use strict';
const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

if (darkModeQuery.matches) {
  console.log('暗黑模式已激活');
} else {
  console.log('亮色模式已激活');
}

darkModeQuery.addEventListener('change', event => {
  if (event.matches) {
    console.log('暗黑模式已激活');
  } else {
    console.log('亮色模式已激活');
  }
})
    
})();

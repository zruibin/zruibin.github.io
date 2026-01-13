/*
 * math.js
 *
 * Created by Ruibin.Chow on 2023/08/02.
 * Copyright (c) 2023年 Ruibin.Chow All rights reserved.
 */

function mathOnDidLoad() {
  if (isMathjaxConfig === false) {
      // 如果：没有配置MathJax
      initMathjaxConfig();
  }
}

var isMathjaxConfig = false; // 防止重复调用Config，造成性能损耗

const initMathjaxConfig = () => {
    if (!window.MathJax) {
        console.error;('Not window.MathJax!');
        return;
    }

    window.MathJax = {
        showProcessingMessages: false, //关闭js加载过程信息
        messageStyle: "none", //不显示信息
        options: {
          skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'], //their contents won't be scanned for math
          // includeHtmlTags: {br: '\n', wbr: '', '#comment': ''},   //  HTML tags that can appear within math
          // renderActions: {
          //   addMenu: []
          // },
        },
        loader: {
          load: ['[tex]/tagFormat']
        },
        tex: {
          processEscapes: true,
          // inlineMath: [['$', '$'], ['\\(', '\\)']],
          // displayMath: [ ["$$","$$"] ],
          // packages: {'[+]': ['tagFormat']},
          // digits: /^(?:[\d۰-۹]+(?:[,٬'][\d۰-۹]{3})*(?:[\.\/٫][\d۰-۹]*)?|[\.\/٫][\d۰-۹]+)/,    // introduce numbers
          // tagSide: "right",
          // tagIndent: ".8em",
          // multlineWidth: "85%",
        },
        svg: {
          fontCache: 'global',        // or 'local' or 'none'
          mtextInheritFont: true,     // required to correctly render RTL Persian text inside a formula
          scale: 0.97,                // global scaling factor for all expressions
          minScale: 0.6               // smallest scaling factor to use
        },

        startup: {
          ready: () => {
            MathJax.startup.promise.then(() => {
              // console.log('MathJax startup complete.');
            });
            return MathJax.startup.defaultReady();
          },
        }
    };

    // console.log(window.MathJax);
    isMathjaxConfig = true;

    seajs.use(sourcePrefix + "vender/math/MathJax/startup.js", () => {
      // console.log("loadScript finish.");
    });
};

// window.MathJax.Hub.Queue(function() {
//     console.log('MathJax.Hub.Queue');
//     var all = MathJax.Hub.getAllJax();
//     for (var i = 0; i < all.length; ++i)
//         all[i].SourceElement().parentNode.className += ' has-jax';
// });

// function insert() {
//     let laTexs = getElementsClass("LaTex");
//     Array.prototype.slice.call(laTexs).forEach(element => {
//       let node = element.childNodes[0];
//       console.log(node);
//       element.removeChild(node);
//       let div = document.createElement("div");
//       div.appendChild(node);
//       element.appendChild(div);
//     });
// }
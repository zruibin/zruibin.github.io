/*
 * loadImage.js
 *
 * Created by Ruibin.Chow on 2025/04/05.
 * Copyright (c) 2025年 Ruibin.Chow All rights reserved.
 */

function loadingImage() {
  const imgList = [...document.querySelectorAll('img')];
  const io = new IntersectionObserver((entries) =>{
    entries.forEach(item => {
      // isIntersecting是一个Boolean值，判断目标元素当前是否可见
      if (item.isIntersecting && !item.target.src.startsWith('data:image/')) {
        item.target.src = item.target.dataset.src;
        // 图片加载后即停止监听该元素
        io.unobserve(item.target);
      }
    })
  }, {
    root: document.querySelector('.root')
  })

  // observe遍历监听所有img节点
  imgList.forEach(img => io.observe(img))
}

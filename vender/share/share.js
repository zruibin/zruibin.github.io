/*
 * share.js
 *
 * Created by ruibin.chow on 2017/10/03.
 * Copyright (c) 2017年 ruibin.chow All rights reserved.
 */

 var weiboImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAAAilBMVEUAAADvMFDnPVHmPFPnPFLmO1LmPFPnO1PnPVHqOlDmPFPmPFPvMFDmOVPlO1LnOFDnOFDmO1PlPFLmPFPmO1LlPFLlO1PmO1PlO1LnPFTmOlPqOlDnPFTnOlLmPFLmPFPlPFLmO1LlOlHnPFLmO1PnOlLmOlPmO1LmO1LlO1PmPFLmOVPlO1LnO1ODj9P0AAAALnRSTlMAED9vf4+/XwAw/68AUJ8gALDvAOCAz6DQQJAAAGDA8ADfTwAAAABwAAAAAAAAr46HvgAABEFJREFUeAHt2GF/ojgQBvDEIi6DwEIJENZg8bS42973/3pn0cRkyFB/7Mvz/7J1Z+MzkwTKnp6enmbx1UuwDsNwHWxWPybYj8WiEGzxhm8dbLtUAhNp9tPCfi6VA4aKLy8NXsXLq8ZelyrBL+Z/nbUAQpWZQJaqAaARUkrRNm4o0a8v7NdfkDuNq85eNycCWUhaxcNH25ihrUZJ9qCJt7c39jaLb9L+OrBy9z2eg5Z908ZDDHfBPw+o4aY+HtmRtOnBoU4TfBMEcRAc+FYz687oVSc9IAXfIrwy+0TnxfVOat/Zu1cWgkEve4C7lN8GBa76Mzv7vBTgUR8RBZbq95WOO/JtGR6DV/cH4Q1Y2veRXvbgWXVUAeEV40kidzKpdedGexjV7IjJAgj7V4rcW4HVMOrYH0QBKT+S1LVzowFGPcMNBJrQW/QQhP3YubW5VMaZu554Omx0hqQwY5xdvonBs0db84FdhkoTlfFcH9AnzFwIuEg+Rr7SAub1gJmlintiHEalnbWCx+HmWquW0wlRsIz+wvoLqMlcR7CAmQtx3zM1jIS5CrICFuLjIViaLXMrJJk+DCtY6rbn5W3G9bfn+tqNYSl8aCX6x7c2DrDYcHYpvXXZfNBl1wqRyAsh2q6EqT2+ezLd3Ot5HYJHPsgdwqVopgcLouxrVwC2r5MPAh8a/PSIZIn4+tfs68MFjkHxhx+UoECvA85bQY0Ln74lndgL88SO3goyNwoUHoHX1BO7/ejegqXB/3+0uvjhocAR8mkgvCCfBw5pBQDmPkFQ7YpPSiuiMg8K/AaEtOCIJ4GEqDJ5sRdyh6AZR/PKuP/GVsTx6ZDg6M8Olni37AA+Bc6kxHeZjQnf06IEvxDFKfAVbGOd2Snnux4IKG45d76yynM44qBxo6lLr/ptY6BZOVZoMaJGnTLA0XzamCePDBzlpb2NcxEa2Wwg5fTHg/loo0/kyh+2nIuLddPS7XUWx5NV7b/GIiH6OMzdZUxMS3dj5dv+iACqmBqRHBzu2DNFlDa7tqY3JMdddDA+fZvonK4K+sVAzL6hsVM+WU/nnCct+WKALr7y7GJnNWlvbufDe3I3xnjReNWnEjdhsL9ESg6uwkkj7PNT4aM8GzftuMAsdJK2RyAqYPo7/Me4Dh/l13irdF2BZuZRiwo6DhPIKdubvxld8QYwurLZLRgzJ51TO4eJ3D4+VIG3+BRzrqvCZCI7cJT2bPAU6DUbDJ3Qa7O2qC1NFLUzdEmPkjI546xHpna/+dfgUlwk7m0rQ3CV+vcIM31pcHGvQwhIy7d+bKvxFrRi7V/Ial0A0skdhe3usg6MPnX/kM5XLzGqSzzUoqw16Q5dH4ZxEARpGBbg0eDCuLQra0t4yL72hIbbiMkHqufkewNuI5apmi7ftMnHI9gHhcuh7Ro3hK4e6ImgJ4QSyRsUwYJAaP/H0s/S/wF3NgHY1pjcLgAAAABJRU5ErkJggg==";

 var wechatImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAAAflBMVEUAAAAwrzA9rjU8rzY7rzU8rzU8rzY7rzUwrzA6rjQ6rjQ6rzU7rzU8rzU8rzQ8rzQ7rjY7rjY5rzY7rzY4rzA4rzA8rzU8rzU8rzY6rzU6rzU8rjU8rjU8rzY7rjY7rjY7rzU8rzY5rzY7rzU6rzU7rzY7rzQ7rjY7rzQ8rjWw/Ya8AAAAKnRSTlMAED9/j7//zwBPADCf70AAXwBQ3yAAbwCvAJDwwICw0KAAAABgAHDgAAB5wNBAAAADKElEQVR42u3ZbW+jMAwA4PgGprsU1qbspRAopawv//8PXtesC5ASbNSTTqc+0jQpH4xlvMRk4uHh4V8Hv56CMMSLKAyefsGMSdxcfQ4idETB828O4S7JeYwD4nnyQib6C4sIvcLFkkgsO9QKR62SCVmnIZKE6SuBeLXekCp+ex8n3q/gAxk+gN58ECFLBNTQMkamWK79hPllInNjU0LDCieIgFCQCCcJxzskw65cF2WOfZuq2mBXsfUQ558Eu0r46piy9zhVn6neE+VIraNedkujm6KqL1Sv3LthYrdrsEvVhnKe5z4QG2/W/e6AmZFiS7b+VmHH6nOQ+FTIDN2l6iGiLpFQEFvUCLsqT63RcKNEvtdoDTefGtjV+hthbJovxr7Bg0EU6IrDpw83RjTvHsYbnRVnw6FLnCCv9nI9Rmhkq1RNIdgJF+ZglIsgjK4D0ELeypqb8SXw8zx2JhRn/uGFPny9szSI8ZY46B70IuekDLMZzHFYADOL8xr3x+PxLSZPEZTQdpODEMeE8JN1QY5MPJxXcm0IRa+GjFknvQAkKZdLyZwixLokdR1whqBYmtANEiQvELEmFDOHEDpbn04ZWnkD0OToWcnM2binJJ04I4L0riRmdD8Qkg47r/RCOytlq73N9KTGWzq5MTMVvhVMzAdHhX4wK5GZNVY7sTuDw0hPAyKx1hYIM7jn6FFsFXbEC4BF7F9BJeoLb2xVZ8hXiK3hiy3XGvm0OH2Tw/XeblfItxKfV6CHQ+MUYmvt7x7akn8vtBraQXLk24hlSzXUfFM7xBpohGo3ua/dUueZ7nxUKORToraKn7Hu65BImkJr0+wKkC0/tQsSmWOwWbsqZLE7n5HawI4EudL2LU5jA7s0O+l21qX23Fcl7KTbWScvPhlyFObznwY2SKdPZ+JEJXOkOoC5aiEjx86vMx+dzMmRTWgGeaBUQ9pLCwbQOEaDvdbiaXL0Kp2bYDrI0CdqX1qwpYUv89S5CeZRVe5cCGj7BWiI40SyyfTm+/LC3DM0B/OHeCVOd3SpFKlD+CBDbOxl3H2lZUltPr7E/hvi7h6h/6vQfwDyTXaZVua/EQAAAABJRU5ErkJggg==";

var facebookImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNjQwRTU2MjdCOThFMjExOTcxNEQ2MTQ4NEU0ODI3QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNDBGMzM2REEwNjUxMUU3ODJENkQ3NEVDM0ZCNTNCQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNDBGMzM2Q0EwNjUxMUU3ODJENkQ3NEVDM0ZCNTNCQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDM1NkRENjlDMENFRTIxMThCMzBGRURGNjE0NjYyN0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDY0MEU1NjI3Qjk4RTIxMTk3MTRENjE0ODRFNDgyN0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6u9zqQAAACfElEQVR42uydv2sTYRjHn0tziYnBDqUgWlDQwS4Ogri5FBUHF50c3erk7qCbk3QWxEVBJ/8AdXLuIuIgVdRqFX8OShulMTm/r71JTUiexF4v9/nCZwm5t3cf8r73Pu97R6MkSYz4U0IBAhGIQAQSBCIQgQgkCERg3lLO6g+/WFmzhVvPrFadyFTA5flZa9TL+RP4Y71tr981rV4bicC62C2mxQ7RSD+LehxTTczutTvJci5/gaUosjguWVx2jyLbxQlxTMyKmVRgo9+hSQLPyHA+BQ6RKXFOnBd7sx7H8yZwTiyIg4W/iThyVlxPuy534QFzUtwQNeaBg2c67ba1rXhyeRB4QRygEvElzO1OUcr5c2Qr3XHzKPAwtbA/28Qh57Ft8Ug8Ft+7lHRhOvRynAWGWnaf89gr4qr4VuRfYFXschx3W1xiDDSLnXO/a9xENuKR90W8R6D/3NZEC4H+RMwDcxYEIhCB3dJ0HNOx31sdxSnl9tvGUtX6H5+3nFVIqF6Oijei0se1L4pPeRYYNocujrC9sPh6c4Dvh129+4yBvoSFhOVhGymywJVRVC1FF/gVgf68Yh7oT5jqLCHQn1XxHIH+hJXqpwj053MKAp1ZGlVDWVciT8QD+3vzJ9S0k+L4gO2FHbiHaXsTPa757rgIvJPyr+xxTDU+ivlRVBjj0IXrzuvZ1FVp1gMRiEAEIpAgEIEIRCBBIAIRiECCQAQiEIEEgQhEIAIJAhGIQAQSBCIQgQgkhRC46U9nZfZ8YLuT2GqzZT3+HUd4X+6D9f8Geng37q342e85JDb8m4mZCZyarNjpuRmrxF07QXiKfuf/Po9qPFwn/CXAAOU7Yifu4DpCAAAAAElFTkSuQmCC";

var twitterImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNjQwRTU2MjdCOThFMjExOTcxNEQ2MTQ4NEU0ODI3QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDM0E5NjZFOEEwNjYxMUU3ODJENkQ3NEVDM0ZCNTNCQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDM0E5NjZFN0EwNjYxMUU3ODJENkQ3NEVDM0ZCNTNCQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDM1NkRENjlDMENFRTIxMThCMzBGRURGNjE0NjYyN0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDY0MEU1NjI3Qjk4RTIxMTk3MTRENjE0ODRFNDgyN0IiLz4gPC9yZGY6RGVzY3Jp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";


 function share() {
    var content = '<p>分享:</p>';

    content += '<a onclick="shareWeibo();"><img src="' + weiboImage +  '" alt=""></a>';
    content += '<a onclick="shareWechat(true);"><img src="' + wechatImage + '" alt=""></a>';
    content += '<a onclick="shareFacebook();"><img src="' + facebookImage + '" alt=""></a>';
    content += '<a onclick="shareTwitter();"><img src="' + twitterImage + '" alt=""></a>';
   
    var share = document.getElementById("share");
    share.innerHTML = content;

    mask = '<div id="shareMask" onclick="shareWechat(false)"><div id="qrcode" src="" alt=""></div></div>';
    document.body.insertAdjacentHTML('beforeEnd', mask);     
 }

 share();


 function shareWeibo() {
  var title = document.title;
  var href = window.location.href;
  var url = "http://service.weibo.com/share/share.php?title=" + title + "&url=" + href +"&ralateUid=undefined&searchPic=true&style=number";
  window.open(url); 
}

function shareWechat(show) {
  var mask = document.getElementById("shareMask");
  var qrcode = document.getElementById("qrcode");
  
  if (show) {
      mask.style.cssText = "display:block;";
      qrcode.innerHTML = "";
      var href = window.location.href;
      new QRCode(document.getElementById("qrcode"), href);
  } else {
      mask.style.cssText = "display:none;";
  }
}

function shareFacebook() {
  var href = window.location.href;
  var url = "https://www.facebook.com/sharer.php?u=" + href;
  console.log(url);
  window.open(url); 
}

function shareTwitter() {
  var href = window.location.href;
  var url = "https://twitter.com/intent/tweet?url=" + href;
  window.open(url); 
}

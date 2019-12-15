/*
 * toast.js
 *
 * Created by ruibin.chow on 2017/09/03.
 * Copyright (c) 2017年 ruibin.chow All rights reserved.
 */

function toast(message, hide=false){
    var alert = document.getElementById("toast"); 
    if (hide) {
        alert.style.opacity = 0;
        alert.parentNode.removeChild(alert);
        return ;
    }

    var alertCSS = 'position: fixed;  \
                top: 20px;  \
                left: 50%;  \
                width: 200px;  \
                margin-left: -100px;  \
                background-color: #82b377;  \
                border-radius:5px;  \
                padding: 10px 0 ;  \
                text-align:center;  \
                color: white;   \
                opacity: .9;   \
                -webkit-transition: opacity 0.5s ease-out; /* Saf3.2+, Chrome */  \
                -moz-transition: opacity 0.5s ease-out; /* FF4+ */  \
                -ms-transition: opacity 0.5s ease-out; /* IE10? */   \
                -o-transition: opacity 0.5s ease-out; /* Opera 10.5+ */  \
                transition: opacity 0.5s ease-out; ';

    if (alert == null){  
        var toastHTML = '<div id="toast" style="' + alertCSS + '">' + message + '</div>';  
        document.body.insertAdjacentHTML('beforeEnd', toastHTML);      
    } else{            
        alert.style.opacity = .9;
    }
    setTimeout("toast('', true)", 1500);   
}




/*
 * comment.js
 *
 * Created by ruibin.chow on 2018/09/13.
 * Copyright (c) 2018年 ruibin.chow All rights reserved.
 */


function showComment(data) {
    var commentDiv = document.getElementById("comment");
    comments = getComments(data);
    commentDiv.innerHTML = comments + getCommentPages();
}

function getComments (data) {

    comments = "";
    for (var i = 0; i < data.length; i++) {
        comment = data[i]
        comments += getComment(comment);
    };
    return comments;
}

function getComment (comment) {
    var uuid = comment["uuid"];
    var nickname = comment["nickname"];
    var content = comment["content"];
    var time = comment["time"];
    var replyList = comment["replyList"];

    var html = '<article><hr>';

    html += '<p><span class="comment_name">' + nickname +'：</span>' + content 
                    + '<br><span class="comment_time">' + time + '</span></p><a id="' + 
                    uuid + '" onClick="showCommentBox(\'' + uuid +'\');">评论</a>';

    for (var i = 0; i < replyList.length; i++) {
        reply = replyList[i]
        replyComment = getReplyComment(reply["nickname"], reply["content"], reply["time"]);
        html += replyComment;
    };

    html += '</article>';

    return html;
}

function getReplyComment (name, content, time) {
    var html = '<div class="comment_reply"><p><span class="comment_name">' + name + '：</span>' +
                        content + '<br><span class="comment_time">' + time + '</span></p></div>'
    return html;
}

function getCommentPages (pre, next) {
    var html = '<div class="comment_pagelist"><ul>'
    html += '<li><a onClick="preAction();">«</a></li><li><a onClick="nextAction();">»</a></li>';
    html += '</ui></div>';
    return html;
}

function showCommentBox(commentId) {
    var target = document.getElementById(commentId);
    var parent = target.parentNode;
    var childs = parent.getElementsByTagName('div');
    var div = null;
    for(var i=0;i<childs.length;i++){
        if(childs[i].title == commentId)
              div = childs[i];
    }

    if (div) {
        parent.removeChild(div);
    } else{
        var html = '<textarea rows="6" type="text" placeholder="写下你的评论..."></textarea>';
        html += '<div><input type="text" name="nickname" placeholder="nickname"></div>';
        html += '<div><input type="text" name="email" placeholder="email"></div>';
        html += '<div><button class="btn btn-send" onClick="sendReplyComment(\'' + commentId + '\');">发送</button></div>';
        div = document.createElement("div");
        div.setAttribute("class","commentBox");
        div.title = commentId;
        div.innerHTML = html;
        // console.log(target);
        insertAfter(div, target);
    };

}

//@param newElement新创建的元素
//@param targetElement传递的已知元素
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    var divParent = targetElement.parentNode;//获取该div的父节点
    var newNode = newElement;//创建文本节点
    var next = targetElement.nextSibling;//获取div的下一个兄弟节点
    //判断兄弟节点是否存在
    if(next) {
        //存在则将新节点插入到div的下一个兄弟节点之前，即div之后
        divParent.insertBefore(newNode, next);
    } else {
        //不存在则直接添加到最后,appendChild默认添加到divParent的最后
        divParent.appendChild(newNode);
    }
}

function preAction() {
    pageIndex--;
    if (pageIndex<1) { pageIndex = 1;}
    requestData();
}

function nextAction() {
    pageIndex++;
    requestData();
}

function clearComment() {
    var target = document.getElementById("globeCommentBox");
    var textarea = target.getElementsByTagName("textarea");
    var input = target.getElementsByTagName("input");
    textarea[0].value = "";
    input[0].value = "";
    input[1].value = "";
}

function sendComment () {
    var target = document.getElementById("globeCommentBox");
    var textarea = target.getElementsByTagName("textarea");
    var input = target.getElementsByTagName("input");
    var content = textarea[0].value;
    var nickname = input[0].value;
    var email = input[1].value;
    if (content.length == 0) { return;}
    if (nickname.length == 0) { return;}
    if (email.length == 0) { return;}
    requestAddComment(content, nickname, email);
}

function sendReplyComment (commentId) {
    var target = document.getElementById(commentId).parentNode;
    var childs = target.getElementsByTagName("div");
    var div = null;
    for(var i=0;i<childs.length;i++){
        if(childs[i].title == commentId)
            div = childs[i];
    }
    
    var textarea = div.getElementsByTagName("textarea");
    var input = div.getElementsByTagName("input");
    var content = textarea[0].value;
    var nickname = input[0].value;
    var email = input[1].value;
    requestAddReplyComment(commentId, content, nickname, email);
}


// --------------------------------------------------------


function requestData() {
    var url = "/service/comment/query";
    // console.log(url);
    reqwest({
        url: url, 
        type: 'json', 
        method: 'get',
        data: { 
            article_uuid: articleUUID,
            index: pageIndex
        }
    }).then(function (response) {
        // console.log(response);
        clearComment();
        showComment(response.data);
    }).fail(function (err, msg) {
        console.log(err);
        toast("请求失败，请重新刷新！");
    });
}


requestData();

function requestAddComment(content, nickname, email) {
    var url = "/service/comment/insertComment";
    // console.log(articleUUID, content, nickname, email);
    reqwest({
        url: url, 
        type: 'json', 
        method: 'post',
        data: { 
            article_uuid: articleUUID,
            content: content,
            nickname: nickname,
            email: email
        }
    }).then(function (response) {
        // console.log(response);
        pageIndex = 1;
        requestData();
    }).fail(function (err, msg) {
        console.log(err);
        toast("请求失败，请重新刷新！");
    });
}

function requestAddReplyComment(commentUUID, content, nickname, email) {
    var url = "/service/comment/insertReplyComment";
    // console.log(commentUUID, content, nickname, email);
    reqwest({
        url: url, 
        type: 'json', 
        method: 'post',
        data: { 
            comment_uuid: commentUUID,
            article_uuid: articleUUID,
            content: content,
            nickname: nickname,
            email: email
        }
    }).then(function (response) {
        // console.log(response);
        showCommentBox(commentUUID);
        requestData();
    }).fail(function (err, msg) {
        console.log(err);
        toast("请求失败，请重新刷新！");
    });
}






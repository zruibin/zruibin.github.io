var MOFUN = window.MOFUN || {};

MOFUN.share = function (shareText, apiKeys) {
	shareText = shareText || "";
	apiKeys = apiKeys || {};
	var sinaKey = apiKeys.sina || 514775304,
		qqKey = apiKeys.qq || 801248333;

	var url = document.location.href.split("#")[0].split("?")[0],
		share = {
			ele: document.createElement("div"),
			title: document.title,
			text: encodeURIComponent(shareText),
			url: encodeURIComponent(url),
			pic: document.getElementById("app-icon").getAttribute("content") || encodeURIComponent(url) + "logo.png"
		};
	share.ele.id = "shareto";

	var sina = document.createElement("iframe");
	sina.id = "share_sina";
	sina.setAttribute("allowTransparency", true);
	sina.setAttribute("frameborder", 0);
	sina.scrolling = "no";
	sina.width = 106;
	sina.height = 24;
	sina.src = "http://hits.sinajs.cn/A1/weiboshare.html?url=" + share.url + "&type=5&count=&appkey=" + sinaKey + "&title=" + share.text + "&pic=" + share.pic + "&ralateUid=1971323084&language=zh_cn&rnd=" + new Date().valueOf();
	share.ele.appendChild(sina);

	var qq = document.createElement("a");
	qq.id = "share_qq";
	qq.title = "分享到腾讯微博";
	qq.target = "_blank";
	qq.innerHTML = "<img src='http://mat1.gtimg.com/app/opent/images/websites/share/b24.png' alt='转播到腾讯微博' />";
	qq.href = "http://share.v.t.qq.com/index.php?c=share&a=index&url=" + share.url + "&pic=" + share.pic + "&appkey=" + qqKey + "&title=" + share.text;
	qq.onclick = function () {
		window.open(this.href, "_blank", "height=468,width=612,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,status=no");
		return false;
	};
	share.ele.appendChild(qq);
	

	
	var qzone = document.createElement("a");
	qzone.id = "share_qzone";
	qzone.title = "分享到QQ空间";
	qzone.target = "_blank";
	qzone.innerHTML = "<img src='http://www.zwcsm.com/static/qz.png' alt='分享到QQ空间' />";
	qzone.href = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + share.url + "&pics=" + share.pic + "&title=" + share.title + "&summary=" + share.text + "&site=" + encodeURIComponent("魔方MoFun");
	qzone.onclick = function () {
		window.open(this.href, "_blank", "width=600,height=622,toolbar=no,menubar=no,resizable=yes,scrollbars=1,status=no");
		return false;
	};
	share.ele.appendChild(qzone);

	return share.ele;
};

MOFUN.upgradeBrowser = function (list, ulCss, liCss) {
	list = list || ["ie", "cr", "fx", "op"];
	ulCss = ulCss || "";
	liCss = liCss || "";
	var browsers = {
		"ie": {
			name: "Internet Exlporer",
			desc: "支持上网加速，更快，更方便，更安全！",
			link: "http://windows.microsoft.com/zh-CN/internet-explorer/download-ie"
		},
		"cr": {
			name: "Chrome 浏览器",
			desc: "谷歌的全新网络浏览器，简单，快捷。",
			link: "https://www.google.com/intl/zh-CN/chrome/"
		},
		"fx": {
			name: "火狐浏览器",
			desc: "Firefox 一款可以随心定制的浏览器！",
			link: "http://firefox.com.cn/"
		},
		"op": {
			name: "Opera 浏览器",
			desc: "一直被模仿，一直被超越。",
			link: "http://www.opera.com/browser/"
		}
	};
	var div = document.createElement("ul");
	div.id = "upgradebrowser";
	div.style.cssText = ulCss;
	var temp = "";
	for (var i = 0, l = list.length; i < l; i++) {
		var browser = browsers[list[i]];
		temp += "<li style='" + liCss + "'><a href='" + browser.link + "' title='" + browser.desc + "'><img src='../_global/browser_logo/" + list[i] + ".png' alt='" + browser.name + "' /> <span>" + browser.name + "</span></a></li>"
	};
	div.innerHTML = temp;
	return div;
};

MOFUN.random = function (max, min) {
	max = max || 100;
	min = min || 0;
	return Math.ceil(Math.random() * (max - min) + min);
};

MOFUN.remove = function (ele) {
	ele && ele.parentNode.removeChild(ele);
};
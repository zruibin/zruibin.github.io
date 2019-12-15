$(function () {
	var running = 0,
		h1 = $("h1"),
		h1b4 = $("span", h1).eq(0),
		h1a5 = $("span", h1).eq(-1),
		what = $("#what"),
		btn = $("#start"),
		popup = $("#popbox-wrapper"),
		list = $("#list"),
		book = [
			["早上", "面包 蛋糕 荷包蛋 烧饼 饽饽 油条 馄饨 火腿 面条 小笼包  玉米粥 肉包 山东煎饼 饺子 煎蛋 烧卖 生煎 锅贴 包子 酸奶 苹果 梨 香蕉 皮蛋瘦肉粥 蛋挞 南瓜粥 煎饼 玉米糊 泡面 粥 馒头 燕麦片 水煮蛋 米粉 豆浆 牛奶 花卷 豆腐脑 煎饼果子 小米粥 黑米糕 鸡蛋饼 牛奶布丁 水果沙拉 鸡蛋羹 南瓜馅饼 鸡蛋灌饼 奶香小馒头 汉堡包 披萨 八宝粥 三明治 蛋包饭 豆沙红薯饼 驴肉火烧 粥 粢饭糕 蒸饺 白粥"],
			["中午", "盖浇饭 砂锅 大排档 米线 满汉全席 西餐 麻辣烫 自助餐 炒面 快餐 水果 西北风 馄饨 火锅 烧烤 泡面 速冻水饺 日本料理 涮羊肉 味千拉面 肯德基 面包 扬州炒饭 自助餐 茶餐厅 海底捞 咖啡 比萨 麦当劳 兰州拉面 沙县小吃 烤鱼 海鲜 铁板烧 韩国料理 粥 快餐 萨莉亚 桂林米粉 东南亚菜 甜点 农家菜 川菜 粤菜 湘菜 本帮菜 竹笋烤肉"],
			["晚上", "盖浇饭 砂锅 大排档 米线 满汉全席 西餐 麻辣烫 自助餐 炒面 快餐 水果 西北风 馄饨 火锅 烧烤 泡面 速冻水饺 日本料理 涮羊肉 味千拉面 肯德基 面包 扬州炒饭 自助餐 茶餐厅 海底捞 咖啡 比萨 麦当劳 兰州拉面 沙县小吃 烤鱼 海鲜 铁板烧 韩国料理 粥 快餐 萨莉亚 桂林米粉 东南亚菜 甜点 农家菜 川菜 粤菜 湘菜 本帮菜 竹笋烤肉"]
		],
		times = 0,
		timer,
		hour = (new Date).getHours();
	book[1][1] = book[2][1];

	btn.val("开始").removeAttr("disabled").click(function () {
		var l = list.val().replace(/ +/g, " ").replace(/^ | $/g, "").split(" ");
		if (l.length == 1 && l[0] != "") return alert("→_→ 耍我是吧，一个有什么好选的！");
		if (l.length == 1) return alert("啥也没有，吃西北风去啊？");
		if (!running) {
			times++;
			if (times == 3) {
				$("<span class='tip'><i></i>都不想吃？可以编辑菜单的哦！</span>").css({
					left: "390px",
					opacity: 0
				}).appendTo("#wrapper").animate({
					left: "-=10px",
					opacity: 1
				});
				btn.val("继续");
				$("#cfg").add(btn).one("click", function () {
					$(".tip").animate({
						left: "+=10px",
						opacity: 0
					}, function () {
						$(this).remove();
					});
				});
				return false;
			};
			h1a5.text("？");
			$(this).val("停止");
			timer = setInterval(function () {
				var r = MOFUN.random(l.length),
					food = l[r - 1],
					rTop = MOFUN.random($(document).height()),
					rLeft = MOFUN.random($(document).width() - 50),
					rSize = MOFUN.random(37, 14);
				what.html(food);
				$("<span class='temp'>" + food + "</span>").css({
					"display": "none",
					"top": rTop,
					"left": rLeft,
					"color": "rgba(0,0,0,." + Math.random() + ")",
					"fontSize": rSize + "px"
				}).appendTo("body").fadeIn("slow", function () {
					$(this).fadeOut("slow", function () {
						$(this).remove();
					});
				});
			}, 60);
			running = 1;
			$("#shareto").fadeOut(function () {
				$(this).remove()
			});
		} else {
			h1a5.text("！");
			btn.val("不行，换一个");
			clearInterval(timer);
			running = 0;
			$(MOFUN.share(h1.text() + $("meta[name=description]").attr("content") + "#今天中午吃什么#", {
				qq: 801303813
			})).hide().appendTo("#wrapper").fadeIn();
		};
	});

	h1.click(function () {
		if (!running) {
			h1.css("position", "relative").stop().animate({
				left: "-20px"
			}, 50).animate({
				left: "20px"
			}, 50).animate({
				left: "-10px"
			}, 50, function () {
				h1b4.text("今天" + book[0][0] + "吃");
				what.text("什么");
				h1a5.text("？");
				list.val(book[0][1]);
				book.push(book.shift());
			}).animate({
				left: "10px"
			}, 50).animate({
				left: "-5px"
			}, 50).animate({
				left: "5px"
			}, 50).animate({
				left: 0
			}, 50, function () {
				$(this).removeAttr("style");
			});
		};
	});

	$("#cfg").click(function () {
		running ? alert("还在选呢！") : popup.fadeIn(function () {
			var t = list.val();
			list.focus().val("").val(t)
		});
	});

	$("#ok").click(function () {
		popup.fadeOut();
	});

	if (hour < 9 || hour >= 23) {
		change(0);
	} else if (hour < 13) {
		change(1);
	};

	function change(i) {
		i = i || 0;
		$("<i class='notdinner'></i>").css({
			top: "-44px",
			opacity: 0
		}).appendTo("#wrapper").animate({
			top: "+=10px",
			opacity: 1
		}, 1e3).delay(3e3).fadeOut("slow", function () {
			$(this).remove();
		});
		h1b4.text("今天" + book[i][0] + "吃");
		what.text("什么");
		h1a5.text("？");
		list.val(book[i][1]);
		var t = i + 1;
		while (t > 0) {
			book.push(book.shift());
			t--;
		};
	};

	document.onkeydown = function (e) {
		e = e || window.event;
		if (e.keyCode == 32 && !popup.is(":visible")) $("#start").trigger("click");
	};
});
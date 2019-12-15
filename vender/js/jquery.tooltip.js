/**
* author: Ruibin.Chow 周锐宾
* explanation:通用的小提示，功能为显示每个标签里的title的值
* version: 1.3
*
* 使用：
*	$('#tip').tooltip('left') $('#cssmenu a').tooltip('right');
*	left、right、center,该参数设定是否偏移，若没有参数，则默认为不偏移
*
*/
jQuery.fn.tooltip = function(location){
	//提示的框样式
	var cssStyle = 'position:absolute;left:-500px;background-color:#dedede;padding:1px;border:1px solid #fff;width:auto;height:30px;z-index:8999;';
	//内部字体的样式
	var cssStyleInner = 'margin:0;padding:0;color:#fff;background-color:#222;padding:5px 5px;width:auto;height:20px;text-align:center;';
	return $(this).each(function(i){
		$("body").append("<div style='"+cssStyle+"' id='tooltip"+i+"'><p style='"+cssStyleInner+"'>"+$(this).attr('title')+"</p></div>");
		var my_tooltip = $("#tooltip"+i);
		
		if($(this).attr("title") != "" && $(this).attr("title") != "undefined" ){
		
		$(this).removeAttr("title").mouseover(function(){
					my_tooltip.css({opacity:0.8, display:"none"}).fadeIn(400);
		}).mousemove(function(kmouse){
				var border_top = $(window).scrollTop(); 
				var border_right = $(window).width();
				var left_pos;
				var top_pos;
				var offset = 20;
				if(border_right - (offset *2) >= my_tooltip.width() + kmouse.pageX){
						
						if(location==undefined || location.constructor == String){

							switch(location){
								case "right":
									left_pos = kmouse.pageX + offset; //向右偏移20
									break;
								case "left":
									left_pos = kmouse.pageX - offset - my_tooltip.width(); //向左偏移20
									break;
								case "center":
									left_pos = kmouse.pageX-my_tooltip.width()/2; //不偏移
									break;
								default:
									left_pos = kmouse.pageX-my_tooltip.width()/2; //默认不偏移
									break;
							}
						}
					} else{
						left_pos = border_right-my_tooltip.width()-offset;
					}
					
				if(border_top + (offset *2)>= kmouse.pageY - my_tooltip.height()){
						top_pos = border_top +offset;
					} else{
						top_pos = kmouse.pageY-my_tooltip.height()-offset;
					}	
				
				
				my_tooltip.css({left:left_pos, top:top_pos});
		}).mouseout(function(){
				my_tooltip.css({left:"-9999px"});				  
		});
		
		}
		
	});
}












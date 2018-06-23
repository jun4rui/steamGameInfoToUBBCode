// ==UserScript==
// @name         Steam一键生成安利数据
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  这就是个可以一键生成steam游戏商店基本描述数据的工具，主要是吧游戏的主要内容转换成UBB代码，好安利到支持UBB的论坛上去的。
// @author       jun4rui
// @match        https://store.steampowered.com/app/*
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	//添加安利按钮和安利内容区域
	$('.queue_ctn ').append('<button id="button-anli" type="button">安利</button><textarea id="anliOutput" style="display:block;width:100%; height:5em;"></textarea>');

	$('#button-anli').ready(()=>{
		$('#button-anli').click(()=>{
		'use strict';
	//获取游戏截图图片列表
	let gameName = '';
	let gameCover = '';
	let gameLink = '';
	let gameScreenshotList = [];
	let gameDesc = '';

	//获取游戏截图列表
	$('.highlight_strip_screenshot img').each((index,item)=>{
		gameScreenshotList.push( '[img]'+$(item).attr('src').replace('.116x65','')+'[/img]');
});

	//获取游戏封面图
	gameCover = $('.game_header_image_full').attr('src');

	//获取游戏名称
	gameName = $('.apphub_AppName').text();

	//获取游戏商店地址
	gameLink = window.location.href;

	//获取游戏简介
	gameDesc = $('.game_description_snippet').eq(0).text().trim();

	//开始生成游戏安利内容
	let template = `
游戏名称：[u][b]{gameName}[/b][/u]\n
[url={gameLink}][img]{gameCover}[/img][/url]\n
[b]内容简介：{gameDesc}[/b]\n
{gameScreenshot}`;

	let outStr = template;
	outStr = outStr.replace(/{gameName}/g,gameName);
	outStr = outStr.replace(/{gameLink}/g,gameLink);
	outStr = outStr.replace(/{gameCover}/g,gameCover);
	outStr = outStr.replace(/{gameDesc}/g,gameDesc);
	outStr = outStr.replace(/{gameScreenshot}/g,gameScreenshotList.join('\n'));

	console.log(outStr);
	$('#anliOutput').text(outStr);
});
});
})();

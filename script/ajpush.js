// 初始化推送服务，只Android有效，ios上会自动初始化
function ajpush_init() {
	// alert("进入极光初始化");
	var ajpush = api.require('ajpush');
	ajpush.init(function(ret) {
	    if (ret && ret.status){
	    	
	    }
	});
}

// 设置消息监听，若iOS应用在前台运行，此时收到推送后也通过此方法回调
function ajpush_setListener(){
	//alert("进入极光监听");
	var ajpush = api.require('ajpush');
	ajpush.setListener(
	    function(ret) {
	         var id = ret.id;
	         var title = ret.title;
	         var content = ret.content;
	         var extra = ret.extra;
	         //alert(JSON.stringify(extra) + "=======" + content);
	    }
	);
}

// 移除消息监听
function ajpush_removeListener(){
	var ajpush = api.require('ajpush');
	ajpush.removeListener();
}

function ajpush_addEventListener(){
	if(api.systemType == "ios"){
		api.addEventListener({
		    name: 'noticeclicked'
		}, function(ret, err) {
			//alert(JSON.stringify(ret) + "===============" + JSON.stringify(err));
		    if (ret && ret.value) {
		        var ajpush = ret.value;
		        var content = ajpush.content;
		        var extra = ajpush.extra;
		    }
		});
	}else{
		api.addEventListener({
		    name: 'appintent'
		}, function(ret, err) {
		    if (ret && ret.appParam.ajpush) {
		        var ajpush = ret.appParam.ajpush;
		        var data = JSON.parse(ajpush.extra);
		        ajpush_openWin(data);
		    }
		});
	}
}

function ajpush_openWin(data){
	if(data.businessType == 1){
		api.openWin({
			name : 'my-youcard-head',
			url : api.wgtRootDir + '/html/gas/my-youcard-head.html',
			reload : true,
		});
	}
}

// 绑定用户别名和标签。服务端可以指定别名和标签进行消息推送
function ajpush_bindAliasAndTags(alias, tag1, tag2, tag3, tag4, tag5){
	// alert("进入绑定用户别名和标签");
	var tags = new Array();
	var ajpush = api.require('ajpush');
	var param = {alias:alias, tags:tags};
	ajpush.bindAliasAndTags(param,function(ret) {
		var statusCode = ret.statusCode;
	});
}

// 清除极光推送发送到状态栏的通知(待清除的通知id（等同于消息ID），为-1时清除所有，iOS只支持清除所有，不能为空)
function ajpush_clearNotification(){
	var ajpush = api.require('ajpush');
	var param = {id:-1};
	ajpush.clearNotification(param,function(ret) {
	    if(ret && ret.status){
	        //success
	    }
	});
}

// 停止Push推送
function ajpush_stopPush(){
	var ajpush = api.require('ajpush');
	ajpush.stopPush(function(ret) {
	    if(ret && ret.status){
	        //success
	    }
	});
}

// 恢复Push推送
function ajpush_resumePush(){
	var ajpush = api.require('ajpush');
	ajpush.resumePush(function(ret) {
	    if(ret && ret.status){
	        //success
	    }
	});
}
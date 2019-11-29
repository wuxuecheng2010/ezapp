var initData = function() {
	//基础数据初始化 例如下拉列表   保存到本地 start
	var network = true;
	if(mui.os.plus) {
		mui.plusReady(function() {
			if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
				network = false;
			}
		});
	}

	if(network) {
		ajax();
	} else {
		mui.toast("当前网络不给力，请检查网络是否开启.");
	}

}

function ajax() {
	//利用RunJS的Echo Ajax功能测试
	//var url = SERVERPATH + 'DD';
	//var url = DATAPATH;
	var url=getDataPath(localStorage.netmod) ;
	var dataType = 'json';
	//发送数据
	//flagbuy: 'Y';
	var data = {

	};
	//mui.post(url, data, success, dataType);

	mui.ajax(url, {
		data: null,
		dataType: dataType, //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: success,
		error: err
	});

};

var success = function(response) {
	console.log(JSON.stringify(response));

	if(response != null) {
		//查询按钮点击时  保存到local  按照文本的形式保存 
		localStorage.buyerlist = JSON.stringify(response.employee.buyerlist);
		localStorage.salerlist = JSON.stringify(response.employee.salerlist);
		localStorage.driverlist = JSON.stringify(response.employee.driverlist);
		localStorage.vehiclelist = JSON.stringify(response.vehicle);
		localStorage.arealist=JSON.stringify(response.area);
		localStorage.sectionlist=JSON.stringify(response.section);
		localStorage.wmsconfig=JSON.stringify(response.wmsconfig);
	}
};

/*var err = function(xhr, type, errorThrown) {
	//异常处理；
	console.log(type);
	mui.toast("系统异常，请稍后再试，或者联系客服.");
	plus.nativeUI.closeWaiting();
}*/






//===============版本号检查及升级========================


/**
 * 
 * 升级操作（包含升级提示信息）
 * @param {Object} latestVersion  服务器上面最新的版本号
 */
var upVersion = function(latestVersion,latestVid,content, url,mode) {
	
	//获取当前版本号
	var currentVersion = VERSION;
     var currentVid = VID;
	
	//if(latestVersion > currentVersion) {
			if(parseInt(latestVid) > parseInt(currentVid)) {
		//获取本地的不再提示版本号
		var nomoretips=getNomoretips();
		console.log("nomoretips:"+nomoretips+"latestVersion"+latestVersion);
		/*if(!(nomoretips==latestVersion && mode==UPDATE_MODEL_ONLOAD))//如果是 已经记载了不要提示的版本，并且是打开就检查的情况下  的结果取非，判断要不要提示
		{
			showDialog(url);
		}*/
		if(mode==UPDATE_MODEL_ONLOAD){//登入模式时

			if(nomoretips!=latestVersion){
				
				showDialog(url,latestVersion,content);
			}
		}else{//设置界面  点击时

			if(latestVersion!=currentVersion){
				showDialog(url,latestVersion,content);
			}else{
				showDialogNO();
			}
			
		}
		
				
	}
	

}

var showDialogNO=function(){
	mui.confirm('当前已经是最新版本，无需升级', '提示', ['确认'], function(e) {
		switch(e.index) {
							case 0:
								break;
							default:
								break;
						}
	}, 'div')
}

var  showDialog=function(url,latestVersion,content){
	//android系统提示
	if(mui.os.android) {
					//弹出升级对话框  是否需要升级由客户确定
					mui.confirm('检测到新版本'+latestVersion+'\n'+content+'\n需要更新吗', '升级', ['取消', '确认'], function(e) {
						switch(e.index) {
							case 0:
								break;
							case 1:
								updatesoft(url);
								break;
							default:
								break;
						}
					}, 'div')
		
				} else { //apple 提示到信息部更新
					//弹出升级对话框  是否需要升级由客户确定
					mui.confirm('检查到新版本'+latestVersion+'\n'+content+'\n暂不支持在线更新，请到信息中心更新。', '升级通知', ['不再提醒', '确认'], function(e) {
						switch(e.index) {
							case 0:
							setNomoretips(latestVersion);
								break;
							case 1:
								break;
							default:
								break;
						}
					}, 'div')
				}
}

/**
 * 
 * @param {Object} mode 检查方式 UPDATE_MODEL_ONLOAD  UPDATE_MODEL_ONCLICK  
 */
var checkVersion = function(mode) {
	
	mui.ajax(getVersionPath(localStorage.netmod), {
		data: {},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			//console.log(JSON.stringify(data));
			//console.log("vision:"+data[0].vision);
			if(data != null) {
				var latestVersion = data[0].vision;//最新版本号
				var latestVid = data[0].vid;//最新版本号
				var content = data[0].content;//最新版本号
				var filepath=data[0].filepath;//文件路径
				//DOWNLOADIP
				var url=filepath.substring(0,7)=="uploads"?getDownLoadIP(localStorage.netmod) + data[0].filepath:filepath;
				upVersion(latestVersion,latestVid,content, url,mode);
			}
		},
		error: function(xhr, type, errorThrown) {
            //不需要提示
		}
	});
}

/**
 * 
 * @param {Object} obj  显示的对象
 */
var isLatestVersion=function(currentVersion,obj){
	//VERSIONPATH
	mui.ajax(getVersionPath(localStorage.netmod), {
		data: {},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			//console.log(JSON.stringify(data));
			//console.log("vision:"+data[0].vision);
			if(data != null) {
				var latestVersion = data[0].vision;//最新版本号
				//console.log("=========latestVersion=========="+latestVersion+"=====currentVersion===="+currentVersion);
				if(latestVersion>currentVersion){
					var ht=obj.html();
					//console.log("==================="+ht);
					obj.html(ht+'<span class="mui-badge mui-badge-danger">升级</span>');
				}
				
				
			}
		},
		error: function(xhr, type, errorThrown) {
            //不需要提示
		}
	});

}

/**
 * 升级操作
 * @param {Object} url
 */
var updatesoft = function(url) {
	//var url="http://172.18.109.99:85/myphp/file/myzb.apk"; // 下载文件地址
	console.log(url);
	plus.nativeUI.showWaiting("下载中，请稍后...");
	var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
		if(status == 200) { // 下载成功
			var path = d.filename;
			console.log(d.filename);
			plus.nativeUI.closeWaiting();
			plus.runtime.install(path); // 安装下载的apk文件
		} else { //下载失败
			alert("Download failed: " + status);
		}
	});

	dtask.start();
}



/**
 * 
 * 
 * @param {Object} latestVersion  将当前最新版本号保存在不提醒的本地存储中；
 */
var setNomoretips=function(latestVersion){
	console.log("setnomoretips:"+latestVersion);
	localStorage.nomoretips_version=latestVersion;
}

/**
 * 
 * 获取不用提示升级的版本号
 */
var getNomoretips=function(){
	var nomoretips_version="No_NMT_Version";
	if(typeof(localStorage.nomoretips_version)!=undefined){
		nomoretips_version=localStorage.nomoretips_version;
	}
	return nomoretips_version;
	
}


/**
 * 获取wms相关信息  用户信息
 */

var Ajaxloadwms=function(){

				//利用RunJS的Echo Ajax功能测试
				//var url = DATAPATH+"/wmsemployee";
				var url=getDataPath(localStorage.netmod)+"/wmsemployee";
				var account = getLoginAccount();
				//console.log("myinit.js Ajaxloadwms account");
				var dataType = 'json';
				//var vcproductinfo = ShortPY(document.getElementById('vcproductinfo').value.toUpperCase());
				//发送数据
				var data = {
					account: account
				};
				//mui.post(url, data, success, dataType);
				mui.ajax(url, {
					data: data,
					dataType: dataType, //服务器返回json格式数据
					type: 'post', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: loadsuccess,
					error: err
				});

			
			}
			
			
			var loadsuccess = function(response) {
				console.log("JSON.stringify(response)[*][*]"+JSON.stringify(response));
				if(response != null) {
					var syscode = response.syscode;
					var sysreason = response.sysreason;
					if(syscode == SYSCODE_NO) {
						tokenOutTime(sysreason);
					} else {
						
						//console.log(JSON.stringify(response));
						//查询按钮点击时  保存到local  按照文本的形式保存
						//localStorage.wms_employee = JSON.stringify(response.sysdata.MyUser_getWmsEmployee);
						localStorage.wms_employee = JSON.stringify(response);
					}
				}
			};
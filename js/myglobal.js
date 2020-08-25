var VERSION = "1.7.1"; //版本号  每次升级前修改一次  数据库中保存的版本号 加一行，与之对应；
var VID = "72"; //版本号  每次升级前修改一次  数据库中保存的版本号 加一行，与之对应；
var DEBUG=false;//   true-为开发模式  false-为正式模式
//https://github.com  源代码

var TIP = "192.168.1.106:85";
var NIP = "192.168.0.117";
var WIP = "122.226.128.222"

var SERVERIP_T = "http://"+TIP+"/ezapi/public/"; //测试地址
var SERVERIP_N = "http://"+NIP+"/ezapi/public/"; //内网地址
var SERVERIP_W = "http://"+WIP+"/ezapi/public/"; //外网地址 

var DOWNLOADIP_T = "http://"+TIP+"/tpAdmin/public/"; //测试地址
var DOWNLOADIP_N = "http://"+NIP+"/tpAdmin/public/"; //内网地址
var DOWNLOADIP_W = "http://"+WIP+"/tpAdmin/public/"; //外网地址

//var MAXDISTANCE=300000;//最远距离可确认到达
//var MUSTDISTANCE=true;//到达确认是否必须参考距离

var DATERANGER = '{"type":"date","beginYear":2017,"endYear":2022}';
var RELOGINWARNING = "对不起，登入超时，请重新登入。";
var TOKEN = localStorage.ezapptoken;
var SYSCODE_OK = "OK";
var SYSCODE_NO = "NO";
var PASSWORD_MIN_LEN = 4; //密码长度控制
var COPY_INFO = "";

var MAX_CURRENTLOAD_SIZE=4;

var UPDATE_MODEL_ONLOAD = "ONLOAD"; //软件打开时检测
var UPDATE_MODEL_ONCLICK = "ONCLICK"; //软件在设置中点击再升级

var FLAGQUANTUM_INFO = "(定额供应)";


/*=================================内外网相关逻辑====================================*/
/**
 * 初始化网络模式 
 */
function initNetMod(doc) {
	var netmod = localStorage.netmod;
	//alert(netmod);
	switch(netmod) {
		case "0":
			doc.getElementById("radio_n").checked = true;
			localStorage.netmod = "0";
			break;
		case "1":
			doc.getElementById("radio_w").checked = true;
			localStorage.netmod = "1";
			break;
		case "2":
			doc.getElementById("radio_t").checked = true;
			localStorage.netmod = "2";
			break;
		default:
			doc.getElementById("radio_w").checked = true;
			localStorage.netmod = "1";
			break;
	}

	doc.getElementById("radio_n").addEventListener('tap', function() {
		localStorage.netmod = "0";
	})
	doc.getElementById("radio_w").addEventListener('tap', function() {
		localStorage.netmod = "1";
	})
	doc.getElementById("radio_t").addEventListener('tap', function() {
		localStorage.netmod = "2";
	})

}

function getIP(netmod){
	
	switch(netmod) {
		case "0":
			return NIP;
			break;
	
		case "1":
			return WIP;
			break;
	
		case "2":
			return TIP;
			break;
	
		default:
			return WIP;
			break;
	}
	
	
}

/**
 * 根据本地记录的netmod值 获取网络地址
 * @param {Object} netmod
 */
function getServerIP(netmod) {
	switch(netmod) {
		case "0":
			return SERVERIP_N;
			break;

		case "1":
			return SERVERIP_W;
			break;

		case "2":
			return SERVERIP_T;
			break;

		default:
			return SERVERIP_W;
			break;
	}

}

/**
 * 升级包下载地址
 * @param {Object} netmod
 */
function getDownLoadIP(netmod) {
	switch(netmod) {
		case "0":
			return DOWNLOADIP_N;
			break;

		case "1":
			return DOWNLOADIP_W;
			break;

		case "2":
			return DOWNLOADIP_T;
			break;

		default:
			return DOWNLOADIP_W;
			break;
	}

}


//var SERVERPATH = SERVERIP + 'Index'; //业务数据
//业务数据  SERVERPATH
function getServerPath(netmod) {
	var serverip=getServerIP(netmod);
	return serverip+'Index'; 
}

//文件上传服务 //var url = "http://192.168.1.101:85/ezapi/public/index.php/Upload/jjd";
function getUploadPath(netmod){
	var serverip=getServerIP(netmod);
	return serverip+'Upload';
}

//ftp服务器
function getFtpServerPath(netmod){
	var serverip=getServerIP(netmod);
	return serverip+'Ftp'; 
}


//var LOGINPATH = SERVERIP + 'Auth/login'; 
//登入验证
function getLoginPath(netmod) {
	var serverip=getServerIP(netmod);
	return serverip+'Auth/login2'; 
}

//var DATAPATH = SERVERIP + 'Data'; 
//基础数据
function getDataPath(netmod) {
	var serverip=getServerIP(netmod);
	return serverip+'Data'; 
}

//var VERSIONPATH = SERVERIP + 'Version/version'; 
//最新版本
function getVersionPath(netmod) {
	var serverip=getServerIP(netmod);
	return serverip+'Version/version'; 
}



/*=================================others====================================*/

/**
 * 
 * 返回文本类型数据
 * @param {Object} date 参数为日期类型Date
 */
function toshortdata(date) {
	//var now = new Date();
	var year = date.getFullYear(); //年
	var month = date.getMonth() + 1; //月
	var day = date.getDate(); //日
	var shortdata = year + "-";

	if(month < 10)
		shortdata += "0";
	shortdata += month + "-";
	if(day < 10)
		shortdata += "0";
	shortdata += day + " ";

	return(shortdata);
}

/**
 * 日期，在原有日期基础上，增加days天数，返回Date类型数据
 * 
 * @param {Object} date   Date日期类型 
 * @param {Object} days   数值类型
 */
function adddate(date, days) {
	if(days == undefined || days == '') {
		days = 1;
	}
	var newdate = date;
	newdate.setDate(newdate.getDate() + days);
	var month = newdate.getMonth() + 1;
	var day = newdate.getDate();
	return new Date(newdate.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day));
}

// 日期月份/天的显示，如果是1位数，则在前面加上'0'
function getFormatDate(arg) {
	if(arg == undefined || arg == '') {
		return '';
	}

	var re = arg + '';
	if(re.length < 2) {
		re = '0' + re;
	}

	return re;
}

/*
 * 将人员信息的json  数据  转化成PopPicker 所需要的数据格式
 * 
 */
function toPickerDataJson(jsonobj, fieldV, fieldT) {
	var json = [];
	for(var i = 0; i < jsonobj.length; i++) {
		var row = {};
		row.value = jsonobj[i][fieldV];
		row.text = jsonobj[i][fieldT];
		json.push(row)
	}
	return json;

}

/*得到手机MAC地址*/
function getMac() {
	var mac = "xxx-xxx-xxx-xxx";
	if(plus.os.name == "Android") {
		//WifiManager 
		var Context = plus.android.importClass("android.content.Context");
		var WifiManager = plus.android.importClass("android.net.wifi.WifiManager");
		var wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE);
		var WifiInfo = plus.android.importClass("android.net.wifi.WifiInfo");
		var wifiInfo = wifiManager.getConnectionInfo();
		mac = wifiInfo.getMacAddress();
	}
	return mac;
}

function replaceSeperator(mobiles) {
	var i;
	var result = "";
	var c;
	for(i = 0; i < mobiles.length; i++) {
		c = mobiles.substr(i, 1);
		if(c == ";" || c == "," || c == "，" || c == "\n")
			result = result + "；";
		else if(c != "\r")
			result = result + c;
	}
	return result;
}

// 关闭自身窗口
function closeme() {
	var ws = plus.webview.currentWebview();
	plus.webview.close(ws);
}

var err = function(xhr, type, errorThrown) {
	//异常处理；
	console.log("error type:"+type);
	mui.toast("系统异常，请稍后再试，或者联系客服.");
	plus.nativeUI.closeWaiting(); //关闭转转转
}

var logout = function() {
	app.setState({});
	plus.webview.getLaunchWebview().show("pop-in");
}

var tokenOutTime = function(sysreason) {
	mui.toast(sysreason);
	logout();
}

/*
 * strvalue 字符值
 * 复制内容到剪贴板
 */
var copyToClip = function(strvalue) {

	if(mui.os.android) {
		var Context = plus.android.importClass("android.content.Context");
		var main = plus.android.runtimeMainActivity();
		var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
		plus.android.invoke(clip, "setText", strvalue);

	} else {
		var UIPasteboard = plus.ios.importClass("UIPasteboard");
		//这步会有异常因为UIPasteboard是不允许init的，init的问题会在新版中修改 
		var generalPasteboard = UIPasteboard.generalPasteboard();
		// 设置/获取文本内容: www.bcty365.com
		generalPasteboard.setValueforPasteboardType(strvalue, "public.utf8-plain-text");
		var value = generalPasteboard.valueForPasteboardType("public.utf8-plain-text");

	}

	mui.toast("复制成功。")

}

/*
 * @elem 为块内容  如div等   ul  子
 * 获取点击块的内容
 */
var getCopyInfo = function(elem) {
	COPY_INFO = "";
	var subelemlist = jQuery(elem).find("span,h5,h6");
	jQuery.each(subelemlist, function(i, selem) {
		COPY_INFO += jQuery(selem).html().trim() + "\n";
	});
}

/*
 * @objs jquery对象集合
 * @mobj mui对象     html中 弹出窗体div中的按钮
 * 
 */
var longtapcopy = function(objs, mobj) {
	jQuery.each(objs, function(i, elem) {
		elem.addEventListener('longtap', function() {
			getCopyInfo(elem);
			//alert(COPY_INFO);
			mobj.popover('toggle');
		});
	});

	jQuery("#pop_btn_copy").click(function() {
		copyToClip(COPY_INFO);
		mobj.popover('toggle');
	});

}

/*
 *列表类型数据每个item的复制 
 * 
 * @param {Object} objs  jquery对象集合 jQuery(".mui-table-view-cell")
 * @param {Object} btnname   jquery 对象 jQuery(elem).find("#btn_copy")  中按钮名称
 */
var swiperightcopy = function(objs, btnname) {
	jQuery.each(objs, function(i, elem) {
		elem.addEventListener("swiperight", function() {
			COPY_INFO = ""; //清空全局变量  储存复制信息用
			var array = jQuery(this).children('.mui-slider-handle').children('span ,h5,h6');
			jQuery.each(array, function(i, obj) {
				COPY_INFO += jQuery(obj).html() + "\n";
			});
		});

		jQuery(elem).find("#" + btnname).click(function() {
			//alert(COPY_INFO);
			copyToClip(COPY_INFO);
			setTimeout(function() {
				mui.swipeoutClose(elem);
			}, 0);
		});

	});

}

/**
 * 
 * 查询结果  吐司反馈查询到行数。
 * @param {Object} jsonobjs
 */
var searchnotice = function(jsonobjs) {
	var len = jsonobjs.length;
	mui.toast('一共查询到' + len + '行数据。')

}

/*
 * ajax 请求中。
 */
var ajaxxing = function() {
	//设置全局beforeSend
	mui.ajaxSettings.beforeSend = function(xhr, setting) {
		//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
		console.log('beforeSend:::' + JSON.stringify(setting));
		plus.nativeUI.showWaiting("加载中...");
	};
	//var iproductid=9999;
	//设置全局complete
	mui.ajaxSettings.complete = function(xhr, status) {
		console.log('complete:::' + status);
		plus.nativeUI.closeWaiting();
	}
}

//获取登入账号
var getLoginAccount = function() {
	var account = JSON.parse(localStorage.userdata).VCACCOUNT
	return account;
}

//获取登入账号的名称
var getLoginName = function() {
	var account = JSON.parse(localStorage.userdata).VCUSERNAME
	return account;
}
//获取账号对应的WMS.用户ID employeeid
var getWMSEmployeeID = function() {
	var employeeid = "";
	//console.log("localStorage.wms_employeexxxxxxxxx:"+localStorage.wms_employee);
	if(!jQuery.isEmptyObject(JSON.parse(localStorage.wms_employee))) {
		employeeid = JSON.parse(localStorage.wms_employee)[0].employeeid;
	}
	return employeeid;
}

//拨打电话
var call = function(telnum) {
	plus.device.dial(telnum);
}

function getJsonObjLength(jsonObj) {
	var Length = 0;
	for(var item in jsonObj) {
		Length++;
	}
	return Length;
}


/**
 * 获取单选按钮的值
 * @param {Object} className
 */
function getRadioRes(name){
    var rdsObj = document.getElementsByName(name)
    var checkVal = null;
    for(i = 0; i < rdsObj.length; i++){
        if(rdsObj[i].checked){checkVal = rdsObj[i].value;}
    }
    return checkVal;
}

/**
 * 初始化条码   因为条码打印问题的解决对策
 * @param {Object} barcode
 */
function initCode(barcode){

	if(barcode!=null && barcode!="" && barcode!=undefined){
		barcode=barcode.replace('Q','O-');
	}
	return barcode;
}



function parseDom(arg) {

　　 var objE = document.createElement("div");

　　 objE.innerHTML = arg;

　　 return objE.childNodes;

};



function playvoice(code,isie) {
				if(!isie) { //不为ie
					console.log("code:" + code);
					//jQuery("#"+code)[0].play();
					document.getElementById(code).play();
				}
			}


function getWmsConfig(setid){
	var val='';
	var wmsconfig=localStorage.wmsconfig;
	console.log("wmsconfig:"+wmsconfig)
	var configs=JSON.parse(wmsconfig);
	
	$.each(configs,function(i,c){
		var SETID=c.SETID;
		if(setid==SETID){
			val=c.SETVALUE;
			return false;
		}
	})
	return val;
}



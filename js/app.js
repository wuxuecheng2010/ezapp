/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	
	//检查网络
	var network = true;
			if(mui.os.plus) {
				mui.plusReady(function() {
					if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
						network = false;
					}
				});
			}
			
			
			
	/**
	 * 用户登录
	 **/
	//var loginflag;
	var loginInfotmp;
	var callbaktmp;
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		loginInfo.mac=getMac();
		if(loginInfo.account==''){
			return callback('账号不能为空');
		}

		
		callbaktmp=callback;
		if(network) {
					userloginapp(loginInfo);
				} else {
					plus.nativeUI.closeWaiting(); //关闭转转转
					mui.toast("当前网络不给力，请稍后再试");
					return;
				}
	};


	//自定义  用户登入验证
	function userloginapp(loginInfo) {
		ajaxxing();
		var url=getLoginPath(localStorage.netmod);
		console.log(url);
		var dataType = 'json';
		//发送数据
		var data = loginInfo;
		loginInfotmp=loginInfo;
		
		mui.ajax(url, {
					data: data,
					dataType: dataType, //服务器返回json格式数据
					type: 'post', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: success,
					error: err   //定义在myglobal.js中
				});
		
	};

	//自定义  post成功返回
	var success = function(response) {
		if(response != null) {
			console.log("response:" + JSON.stringify(response) );
			//查询按钮点击时  保存到local  按照文本的形式保存
			//loginflag = response.flag;
			var authed = response.flag;
			var flaglocked=false;
			if(response.userdata.length==0){
				return callbaktmp('用户名密码错误。');
			}else{
			    flaglocked=response.userdata[0].FLAGLOCKED=='Y';//用户被锁定
			}
			//console.log('================='+flaglocked);
			if(authed && !flaglocked) {
				localStorage.ezapptoken=response.ezapptoken;//登入成功，则保存token
				localStorage.userdata=JSON.stringify(response.userdata[0]);
				localStorage.usermenu=JSON.stringify(response.usermenu);
				return owner.createState(loginInfotmp.account, callbaktmp);
			} else {
				return callbaktmp('账号被锁定，请确定该账号在ERP中可用。');
			}
		}
	};

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if(regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if(regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if(!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return(email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if(!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	/**
	 * 获取本地是否安装客户端
	 **/
	owner.isInstalled = function(id) {
		if(id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if(mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch(e) {}
		} else {
			switch(id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));
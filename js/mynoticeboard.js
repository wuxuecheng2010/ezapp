//主界面中  消息页相关JS

//ajaxxing();
//设置加载消息类型菜单
var setNoticePage = function() {
				//利用RunJS的Echo Ajax功能测试

				//var url = SERVERPATH;
				var url =getServerPath(localStorage.netmod)
				var dataType = 'json';
				var account=getLoginAccount();
				//发送数据
				var data = {
					controller: 'Noticeboard',
					method: 'getNoticeCommon',
					account:account,
					token: localStorage.ezapptoken
				};

				//mui.post(url, data, success, dataType);
				mui.ajax(url, {
					data: data,
					dataType: dataType, //服务器返回json格式数据
					type: 'post', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: Success_getNoticesCommon,
					error: err
				});

			};
			

var Success_getNoticesCommon=function(response){
	console.log("1023"+JSON.stringify(response));
				//console.log("*********matchingsisids*************:" + matchingsisids);
				if(response != null) {
					var syscode = response.syscode;
					var sysreason = response.sysreason;
					if(syscode == SYSCODE_NO) {
						tokenOutTime(sysreason);
					} else {
						
						//查询按钮点击时  保存到local  按照文本的形式保存
						//localStorage.salesnoticeslist = JSON.stringify(response.sysdata.SalesReturnApp_salesReturnAppDtlRows);
						displayNoticeCommon(response.sysdata.Noticeboard_getNoticeCommon);
						//searchnotice(response.sysdata.SalesReturnApp_salesReturnAppDtlRows);
					}
				}
			
		}


		var displayNoticeCommon=function(jsonobj){
		if(!$.isEmptyObject(jsonobj)){
					var numnofinish=jsonobj[0]['NUMNOFINISH'];
			//jQuery("#nofinish").html(numnofinish)
				var span='<span class="mui-badge mui-badge-danger" id="nofinish">'+numnofinish+'</span>';
				jQuery("#listN").append(span);
		}
		

	
}


/*
var Success_getType = function(response) {
				//console.log("*********matchingsisids*************:" + matchingsisids);
				if(response != null) {
					var syscode = response.syscode;
					var sysreason = response.sysreason;
					if(syscode == SYSCODE_NO) {
						tokenOutTime(sysreason);
					} else {
						console.log(JSON.stringify(response));
						//查询按钮点击时  保存到local  按照文本的形式保存
						//localStorage.salesnoticeslist = JSON.stringify(response.sysdata.SalesReturnApp_salesReturnAppDtlRows);
						displayNoticeType(response.sysdata.Noticeboard_getType);
						//searchnotice(response.sysdata.SalesReturnApp_salesReturnAppDtlRows);
					}
				}
			};


var displayNoticeType=function(jsonobj){
	jQuery('#notice_type_list').find('li').remove();
	jQuery.each(jsonobj, function(index, content) {
                       jQuery('#notice_type_list').append( 	
                       	'<li class="mui-table-view-cell">'
				            +'<a class="mui-navigate-right">'
				                +'<span id="badge" class="mui-badge" style="background-color: red;color:white;"></span>'
				                +'<div style="height:40px;">'
				                +'<p style="padding-top:10px;font-size:16px;color:#000000">' + content.VCNATIVENAME + '</p>'
				                +'<span style="display:none ;">'+content.VCDATACODE+'</span>'
				                +'</div>'
				            +'</a>'
				        +'</li>'
				       
					);
				});
}
*/


document.getElementById('listN').addEventListener('tap',function(){
	mui.openWindow({
						url: './views/bus/noticeBoard_pullrefresh_main.html',
						id: 'noticeBoard_pullrefresh_main.html',
						extras: {
							flag:'N',
						},
						waiting: {
							autoShow: false
						}
					});
})

document.getElementById('listY').addEventListener('tap',function(){
	mui.openWindow({
						url: './views/bus/noticeBoard_pullrefresh_main.html',
						id: 'noticeBoard.html',
						extras: {
							flag:'Y',
						},
						waiting: {
							autoShow: false
						}
					});
})

document.getElementById('listA').addEventListener('tap',function(){
	mui.openWindow({
						url: './views/bus/noticeBoard_pullrefresh_main.html',
						id: 'noticeBoard.html',
						extras: {
							flag:'A',
						},
						waiting: {
							autoShow: false
						}
					});
})
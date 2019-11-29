function geoInf(position, map, watchId,marker) {

	var str = "";
	str += "地址：" + position.addresses + "\n"; //获取地址信息
	str += "坐标类型：" + position.coordsType + "\n";
	var coordstype = position.coordsType;
	var timeflag = position.timestamp; //获取到地理位置信息的时间戳；一个毫秒数；
	str += "时间戳：" + timeflag + "\n";
	var codns = position.coords; //获取地理坐标信息；
	var lat = codns.latitude; //获取到当前位置的纬度；
	str += "纬度：" + lat + "\n";
	var longt = codns.longitude; //获取到当前位置的经度
	str += "经度：" + longt + "\n";
	var alt = codns.altitude; //获取到当前位置的海拔信息；
	str += "海拔：" + alt + "\n";
	var accu = codns.accuracy; //地理坐标信息精确度信息；
	str += "精确度：" + accu + "\n";
	var altAcc = codns.altitudeAccuracy; //获取海拔信息的精确度；
	str += "海拔精确度：" + altAcc + "\n";
	var head = codns.heading; //获取设备的移动方向；
	str += "移动方向：" + head + "\n";
	var sped = codns.speed; //获取设备的移动速度；
	str += "移动速度：" + sped;
	//console.log(JSON.stringify(position)); 
	

	var wmsemployeeid = getWMSEmployeeID();
	var loginname = getLoginName();

	var params = {
		'lat': lat,
		'lng': longt,
		'address': position.addresses,
		'sped': sped,
		'timeflag': timeflag,
		'wmsuid': wmsemployeeid,
		'loginname': loginname,
		'coordstype': coordstype
	};
	var paramsStr = JSON.stringify(params);
	//console.log(paramsStr);
	if (!DEBUG) {
		var MYLOCATION = localStorage.MYLOCATION;

		if (MYLOCATION == undefined) {
			saveLocation(paramsStr);
			localStorage.MYLOCATION = paramsStr;
		} else {
			MYLOCATION = JSON.parse(localStorage.MYLOCATION);
			var lat_ = MYLOCATION.lat;
			var lng_ = MYLOCATION.lng;
			//if(lat_!=lat || lng_!= longt ){
			if (position.addresses != MYLOCATION.address) {
				//alert(lat_+":"+lat  +" "+ lng_+":"+longt);
				saveLocation(paramsStr);
				localStorage.MYLOCATION = paramsStr;
			}
		}

	}

	showMe(lat, longt, map, watchId,marker);

}



function showMe(lat, lng, map, watchId,marker) {
	//alert("lat:"+lat+" lng:"+lng)
	lat = lat;
	lng = lng;
	//var point = new BMap.Point(lng + 0.011, lat + 0.00315);
	var point = new BMap.Point(lng, lat);
	//console.log("watchId:" + watchId);
	//	map.centerAndZoom(point, 15);

	map.clearOverlays(marker);
	marker = new BMap.Marker(point);
	map.addOverlay(marker);
	marker.setAnimation(BMAP_ANIMATION_BOUNCE);
	//map.panTo(point);
	//console.log("lat:" + lat + " lng:" + lng);
}



function watchPos(map, watchId,marker) {
	if (watchId) {
		return;
	}
	watchId = plus.geolocation.watchPosition(function(p) {
		geoInf(p, map, watchId,marker);
	}, function(e) {}, {
		geocode: true,
		provider: "baidu",
		coordsType: "bd09ll"
	});
}

function clearWatch(watchId) {
	if (watchId) {
		plus.geolocation.clearWatch(watchId);
		watchId = null;
	}
}



function saveLocation(params) {
	var url = getServerPath(localStorage.netmod)
	console.log(url);
	var dataType = 'json';
	//发送数据
	var data = {
		controller: 'SysLocation',
		method: 'saveItem',
		params: params,
		token: TOKEN
	};

	mui.ajax(url, {
		data: data,
		dataType: dataType, //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: saveLocationSuccess,
		error: err
	});
}


var saveLocationSuccess = function(response) {
	if (response != null) {
		console.log(JSON.stringify(response));
		var syscode = response.syscode;
		var sysreason = response.sysreason;
		if (syscode == SYSCODE_NO) {
			tokenOutTime(sysreason);
		} else {
			console.log(JSON.stringify(response));
		}
	}
}





var mylocation = function(map) {
	plus.geolocation.getCurrentPosition(function(p) {

console.log("plus.geolocation.getCurrentPosition p"+JSON.stringify(p))
		var codns = p.coords;
		lat = codns.latitude;
		lng = codns.longitude;
		
		//1、标记自己当前的位置
		var my_point = new BMap.Point(lng, lat);
        map.centerAndZoom(my_point, 15);
		map.panTo(my_point);
		watchPos(map,watchId,marker);

	}, function(e) {
		alert('Geolocation error: ' + e.message);
	}, {
		geocode: true,
		provider: "baidu",
		coordsType: "bd09ll"
	});

}

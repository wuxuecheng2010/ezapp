var _ORIGIN_="28.812285,121.150628";
var _MAPSERVER_="http://122.226.128.221:8090/map";

/**
 * 获取起点的经纬度  物流中心经纬度
 */
var getOrigin=function(){
	return _ORIGIN_;
}

var getOriginLAT=function(){
	var arr=_ORIGIN_.split(',');
	return arr[0];
}
var getOriginLNG=function(){
	var arr=_ORIGIN_.split(',');
	return arr[1];
}

/**
 * 获取地图服务的地址
 */
var getMapServer=function(){
	return _MAPSERVER_;
}


	
	var setOrigin=function(map,point){
		var mk=new BMap.Marker(point);
		//创建label
			var label = new BMap.Label('H', {
				offset : new BMap.Size(4, 5)
			//偏移量  位数不同偏移量不同
			});
			label.setStyle({
				background : 'none',
				color : '#fff',
				border : 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
			});
			//添加label
			mk.setLabel(label);
		map.addOverlay(mk);
	}
	
	
	var imhere=function(map,point){
		var icon = new BMap.Icon("http://122.226.128.221/tpAdmin/public/static/admin/my/img/hear_green.png", new BMap.Size(32,32));
		var mk=new BMap.Marker(point,{icon:icon});
		//创建label
			var label = new BMap.Label('我', {
				offset : new BMap.Size(9, 5)
			//偏移量  位数不同偏移量不同
			});
			label.setStyle({
				background : 'none',
				color : '#fff',
				border : 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
			});
			//添加label
			mk.setLabel(label);
			
		//map.addOverlay(mk);
	}
	
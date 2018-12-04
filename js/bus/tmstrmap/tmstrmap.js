//转化下拉列表数据格式
		var getFormatOrderListDate=function(trrecord_order_json){
			var trrecord_order_list=[];
			$.each(trrecord_order_json, function(i,c) {
				var step=c.STEP;
				if(step=="0"){
					//状态为0的才有机会设置为下一点.
					var ordid=c.ORDID;
					var customname=c.CUSTOMNAME;
					var o={};
					o.value=ordid;
					o.text=customname;
					trrecord_order_list.push(o);
				}
			});
			return trrecord_order_list;
		};
		

var initAddSelect=function(){
			var addPicker = new mui.PopPicker();
			addPicker.setData(trrecord_order_list);

			var txttargetadd = document.getElementById('txt-targetadd');
			txttargetadd.addEventListener('tap', function(event) {
						addPicker.show(function(items) {

							txttargetadd.value=items[0].text//JSON.stringify(items[0]);
							var ordid=items[0].value;
							//trrecord_order=items[0];
							$.each(trrecord_order_json, function(i,c) {
								var _ordid=c.ORDID;
								if(_ordid==ordid){
									trrecord_order=c;
								}
							});
							//alert(JSON.stringify(trrecord_order));
							//userResult.innerText = JSON.stringify(items[0]);
							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					}, false);
			
		}
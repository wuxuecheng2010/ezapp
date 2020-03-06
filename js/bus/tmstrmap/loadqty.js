var getNormalPriceStyle=function(price){
				var price_;
				if(price==null||price==''){
					price_=0;
				}else{
					if(price.indexOf('.')==0){
						price_='0'+price;
					}else{
						price_=price;
					}
				}
				return price_;
			}
			
			
var updateUnloadcharges=function(selected_order){
	            console.log(JSON.stringify(selected_order));
				//显示卸货费的单价
				var minesprice=Number(getNormalPriceStyle(selected_order.MINESPRICE))==0?'单价未设定':getNormalPriceStyle(selected_order.MINESPRICE)+'/每件';
				$("#txt_minesprice").html(minesprice);
				var othersprice=Number(getNormalPriceStyle(selected_order.OTHERSPRICE))==0?'单价未设定':getNormalPriceStyle(selected_order.OTHERSPRICE)+'/每件';
				$("#txt_othersprice").html(othersprice);
				var othersqty=$("#othersqty").val();
				var minesqty=$("#minesqty").val();
				var minsprice=Number(selected_order.MINESPRICE);
				var othersprice=Number(selected_order.OTHERSPRICE);
				var unloadcharges=(minsprice*minesqty+othersprice*othersqty).toFixed(1);
				$("#txt_unloadcharges").html(unloadcharges);
			}
			
			
			var InitLoadQtyAction=function(current_qty,selected_order){
				
				
					var loadqty=current_qty;
					$("#minesqty").change(function(){
						var minesqty=$("#minesqty").val();
						var othersqty=$("#othersqty").val();
						$("#othersqty").val(loadqty-minesqty);
						
						if(loadqty<minesqty ){
							layer.tips('自卸件数不能超过总卸货件数', '#minesqty', {
									  tips: [1, '#3595CC'],
									  time: 2500
									});
						}
						updateUnloadcharges(selected_order);
					})
					
					$("#othersqty").change(function(){
						var minesqty=$("#minesqty").val();
						var othersqty=$("#othersqty").val();
						$("#minesqty").val(loadqty-othersqty);
						
						if(loadqty<othersqty){
							layer.tips('他卸件数不能超过总卸货件数', '#othersqty', {
									  tips: [1, '#3595CC'],
									  time: 2500
									});
							return ;
						}
						updateUnloadcharges(selected_order);
					})
				
				
			}
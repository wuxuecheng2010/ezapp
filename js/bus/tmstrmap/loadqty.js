
			var InitLoadQtyAction=function(current_qty){
				
				
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
					})
				
				
			}
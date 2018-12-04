function prevent(e) {
	e.preventDefault ? e.preventDefault() : e.returnValue = false;
}

function digitInput(e) {
	var c = e.charCode || e.keyCode; //FF、Chrome IE下获取键盘码
	if((c != 8 && c != 46 && // 8 - Backspace, 46 - Delete
			(c < 37 || c > 40) && // 37 (38) (39) (40) - Left (Up) (Right) (Down) Arrow
			(c < 48 || c > 57) && // 48~57 - 主键盘上的0~9
			(c < 96 || c > 105)) // 96~105 - 小键盘的0~9
		||
		e.shiftKey) { // Shift键，对应的code为16
		prevent(e); // 阻止事件传播到keypress
	}
}


function digitInput(el, e) {  
    var ee = e || window.event; // FF、Chrome IE下获取事件对象  
    var c = e.charCode || e.keyCode; //FF、Chrome IE下获取键盘码  
    //var txt = $('label').text();  
    //$('label').text(txt + ' ' + c);  
    var val = el.val();  
    if (c == 110 || c == 190){ // 110 (190) - 小(主)键盘上的点  
        (val.indexOf(".") >= 0 || !val.length) && prevent(e); // 已有小数点或者文本框为空，不允许输入点  
    } else {  
        if ((c != 8 && c != 46 && // 8 - Backspace, 46 - Delete  
            (c < 37 || c > 40) && // 37 (38) (39) (40) - Left (Up) (Right) (Down) Arrow  
            (c < 48 || c > 57) && // 48~57 - 主键盘上的0~9  
            (c < 96 || c > 105)) // 96~105 - 小键盘的0~9  
            || e.shiftKey) { // Shift键，对应的code为16  
            prevent(e); // 阻止事件传播到keypress  
        }  
    }  
}  

//判断是否为数字
/**
 isNumber("123");  //true
isNumber("12.3"); //true
isNumber("12..3"); //false
isNumber("哈哈"); //false
 * @param {Object} val
 */
function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)) {
        return true;
        } else {
        return false;
        }
    }
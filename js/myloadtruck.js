var NUM_WHOLE_PACKAGES_LIMIT=10;//整件数超过10  则打印的标签数量为一张

var NO_VEHICLEID = {
	"id": 1,
	"info": "缺少车牌号，请输入车牌号。",
	"code": "empty_vehicleid"
};
var NO_BARCODE = {
	"id": 2,
	"info": "缺少条码，请输入条码。",
	"code": "empty_barcode"
};
var NO_WMSEMPLOYEE = {
	"id": 3,
	"info": "当前账号未与WMS账号绑定，请联系管理员绑定。",
	"code": "empty_employeeid"
};

var ERR_BARCODE_STYLE={
	"id":4,
	"info":"条码格式错误。",
	"code":"err_barcode_style"
};

var IN_TRUCK = {
	"id": 5,
	"info": "当前条码已装上本车。",
	"code": "in_truck"
};

var  WR_DISP = {
	"id": 6,
	"info": "当前出库条码不属于您所选择的派车车次。",
	"code": "wrong_disp"
};

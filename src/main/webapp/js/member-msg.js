$.ajax({
	"url": "http://localhost/LoginCheck",
	"type": "get",
	"success": function(resp) {
		console.log(resp);
		if(resp.flag == "0") {
			layer.msg('您还未登录，请先登录~', {
				icon: 0,
				time: 2000, //2s后自动关闭
			});
			window.setTimeout('window.location="http://localhost/login.html"', 1000);
		}
	},
	"error":function()
	{
		layer.msg('网络好像有点问题~', {
				icon: 0,
				time: 2000, //2s后自动关闭
			});
	}
});

var urlNow = location.href.replace("#", "");
var para = urlNow.split("?")[1];
var user_id = para.split("&")[0].split("=")[1];
var user_type = para.split("&")[1].split("=")[1];
var msg_id = 0;
var msgLink = '<a href="all-menber.html?' + para + '" class="header-nav-item">回执信息</a>';
$(".link-head").append(msgLink);

switch(parseInt(user_type)) {
	case 1: //校级管理员
		$(".to-admin-tmp2").attr("href", "./admin/admin-tmp2.html?" + para);
		break;
	case 3: //最高管理员
		$(".to-admin-tmp2").attr("href", "./admin/admin-tmp3.html?" + para);
		break;
}

var para2 = urlNow.split("?")[2];
if(para2 != "" && para2 != undefined) {
	//显示
	$("body").find("input").removeClass("input-style");
	$("body").find("input").addClass("input-style-text");
	$("body").find("input").attr("readonly", "readonly");
	$("body").find("select").removeClass("input-style");
	$("body").find("select").addClass("input-style-text");
	$("body").find("select").attr("disabled", "disabled");
	$("body").find(".extra-content").removeClass("input-style");
	$("body").find(".extra-content").addClass("input-style-text");
	$("body").find(".extra-content").attr("readonly", "readonly");
	$("body").find(".btn-edit").css("display", "block");
	$("body").find(".po-bun").css("display", "none");
	msg_id = para2.split("=")[1];
	$.ajax({
		"type": "get",
		"url": "http://localhost/ReturnReceipt/showReturnReceipt",
		"data": {
			"id": msg_id
		},
		"success": function(resp) {
			console.log(resp);
			//基本信息
			$(".m_name").attr("value", resp.membersName);
			$(".m_sex").val(resp.membersSex);
			$(".m_position").attr("value", resp.membersPosition);
			$(".m_type").val(resp.membersCategory);
			$(".m_phone").attr("value", resp.membersTel);
			$(".m_food_type").val(resp.accommodationNeed);
			//交通信息
			$(".car_num").attr("value", resp.trafficNum);
			$(".go_date").attr("value", resp.trafficTime);
			$(".go_type").val(resp.trafficWay);
			$(".arrive_time").attr("value", resp.trafficArrivetime);
			$(".arrive_place").attr("value", resp.trafficArriveplace);
			$(".go_time").attr("value", resp.trafficLeavetime);
			$(".go_place").attr("value", resp.trafficLeaveplace);
			//住宿信息
			$(".in_time").attr("value", resp.accommodationTime);
			$(".live_time").attr("value", resp.accommodationDays);
			$(".out_time").attr("value", resp.accommodationLeave);
			$(".live_type").val(resp.accommodationType);
			$(".extra-content").val(resp.informationRemarks);
		},
		error: function() {
			alert("服务器错误！");
		}
	});
}

//常规年月日
laydate.render({
	elem: '.go_date', //指定元素
	theme: '#006cb5'
});
//时间选择器
laydate.render({
	elem: '.arrive_time',
	theme: '#006cb5'
});
laydate.render({
	elem: '.go_time',
	theme: '#006cb5'
});
laydate.render({
	elem: '.in_time',
	theme: '#006cb5'
});
laydate.render({
	elem: '.out_time',
	theme: '#006cb5'
});
var m_name, m_sex, m_position, m_type, m_phone, m_food_type;
var car_num, go_date, go_type, arrive_time, arrive_place, go_time, go_place;
var in_time, live_time, out_time, live_type, extra_content;
var baseFlag = 0,
	trafficFlag = 0,
	hotelFlag = 0;
var tel = /^1[34578]\d{9}$/;
//点击保存基础信息
$(".btn-save-one").on("click", function() {
	if(getBaseMsg()) {
		var f = 0;
		$.ajax({
			"type": "get",
			"url": "http://localhost/ReturnReceipt/BasicInformation",
			"async": false,
			"data": {
				"flag": msg_id,
				"a_id": user_id,
				"m_name": m_name,
				"m_sex": m_sex,
				"m_category": m_type,
				"m_position": m_position,
				"m_tel": m_phone,
				"a_need": m_food_type
			},
			"success": function(resp) {
				console.log(resp);
				if(parseInt(resp.id) > 0) {
					msg_id = resp.id;
					f = 1;
					alert("保存成功！");
				} else {
					alert("保存失败，请重试！");
				}

			},
			"error": function() {
				alert("error");
			}
		});
		if(f == 1) {
			$(this).parent().parent().find("input").removeClass("input-style");
			$(this).parent().parent().find("input").addClass("input-style-text");
			$(this).parent().parent().find("input").attr("readonly", "readonly");
			$(this).parent().parent().find("select").removeClass("input-style");
			$(this).parent().parent().find("select").addClass("input-style-text");
			$(this).parent().parent().find("select").attr("readonly", "readonly");
		
			$(this).parent().parent().find(".btn-edit").css("display", "block");
			$(this).parent().css("display", "none");
			baseFlag = 1;
		}

	}

});
//编辑基础信息
$(".edit").on("click", function() {
	
	var part = $(this).parent().parent().find(".part-head").text();
	switch(part) {
		case "基本信息":
			baseFlag = 0;
			break;
		case "交通工具":
			trafficFlag = 0;
			break;
		case "住宿信息":
			hotelFlag = 0;
			break;
	}
	$(this).parent().parent().find("input").removeClass("input-style-text");
	$(this).parent().parent().find("input").addClass("input-style");
	$(this).parent().parent().find("input").removeAttr("readonly");
	$(this).parent().parent().find("select").removeClass("input-style-text");
	$(this).parent().parent().find("select").addClass("input-style");
	$(this).parent().parent().find("select").removeAttr("disabled");
	$("body").find(".extra-content").removeClass("input-style-text");
	$("body").find(".extra-content").addClass("input-style");
	$("body").find(".extra-content").removeAttr("readonly");
	$(this).parent().parent().find(".po-bun").css("display", "block");
	$(this).parent().css("display", "none");
});
//取消即清空基础信息
$(".btn-cancel-one").on("click", function() {
	//	$(this).parent().parent().find("input").val("");
	//	$(this).parent().parent().find("select").eq(0).find("option").eq(0).prop("selected", true);
	//	$(this).parent().parent().find("select").eq(1).find("option").eq(0).prop("selected", true);
	$(this).parent().parent().find("input").removeClass("input-style");
	$(this).parent().parent().find("input").addClass("input-style-text");
	$(this).parent().parent().find("input").attr("readonly", "readonly");
	$(this).parent().parent().find("select").removeClass("input-style");
	$(this).parent().parent().find("select").addClass("input-style-text");
	$(this).parent().parent().find("select").attr("disabled", "disabled");
	$(this).parent().parent().find(".btn-edit").css("display", "block");
	$(this).parent().css("display", "none");
});
//保存交通信息
$(".btn-save-two").on("click", function() {
	if($(".m_name").hasClass("input-style"))
	{
		alert("请先保存基本信息~");
	}
	else
	{
	
	if(getTrafficMsg()) {
		var f = 0;
		$.ajax({
			"type": "get",
			"url": "http://localhost/ReturnReceipt/TrafficTools",
			"async": false,
			"data": {
				"id": msg_id,
				"t_num": car_num,
				"t_time": go_date,
				"t_way": go_type,
				"t_atime": arrive_time,
				"t_aplace": arrive_place,
				"t_ltime": go_time,
				"t_lplace": go_place
			},
			"success": function(resp) {
				console.log(resp);
				if(parseInt(resp.id) > 0) {
					alert("保存成功");
					f = 1;
				} else {
					alert("保存失败，请重试！");
				}
			},
			"error": function() {
				alert("error");
			}
		});
		if(f == 1) {
			$(this).parent().parent().find("input").removeClass("input-style");
			$(this).parent().parent().find("input").addClass("input-style-text");
			$(this).parent().parent().find("input").attr("readonly", "readonly");
			$(this).parent().parent().find("select").removeClass("input-style");
			$(this).parent().parent().find("select").addClass("input-style-text");
			$(this).parent().parent().find("select").attr("disabled", "disabled");
			$(this).parent().parent().find(".btn-edit").css("display", "block");
			$(this).parent().css("display", "none");
			trafficFlag = 1;
		}
	}
	
	}
});
//取消即清空交通信息
$(".btn-cancel-two").on("click", function() {
	//	$(this).parent().parent().find("input").val("");
	//	$(this).parent().parent().find("select").find("option").eq(0).prop("selected", true);
	$(this).parent().parent().find("input").removeClass("input-style");
	$(this).parent().parent().find("input").addClass("input-style-text");
	$(this).parent().parent().find("input").attr("readonly", "readonly");
	$(this).parent().parent().find("select").removeClass("input-style");
	$(this).parent().parent().find("select").addClass("input-style-text");
	$(this).parent().parent().find("select").attr("disabled", "disabled");
	$(this).parent().parent().find(".btn-edit").css("display", "block");
	$(this).parent().css("display", "none");
});

//保存住宿信息
$(".btn-save-three").on("click", function() {
	if($(".car_num").hasClass("input-style"))
	{
		alert("请先保存交通信息~");
	}
	else
	{
	if(getHotelMsg()) {
		var f = 0;
		$.ajax({
			"type": "get",
			"url": "http://localhost/ReturnReceipt/HotelInformation",
			"async": false,
			"data": {
				"id": msg_id,
				"a_time": in_time,
				"a_days": live_time,
				"a_leave": out_time,
				"a_type": live_type,
				"i_remarks":extra_content
			},
			"success": function(resp) {
				console.log(resp);
				if(parseInt(resp.success) == 1) {
					alert("保存成功");
					f = 1;
				} else {
					alert("保存失败，请重试！");
				}
			},
			"error": function() {
				alert("服务器错误，请重试！");
			}
		});
		if(f == 1) {
			$(this).parent().parent().find("input").removeClass("input-style");
			$(this).parent().parent().find("input").addClass("input-style-text");
			$(this).parent().parent().find("input").attr("readonly", "readonly");
			$(this).parent().parent().find("select").removeClass("input-style");
			$(this).parent().parent().find("select").addClass("input-style-text");
			$(this).parent().parent().find("select").attr("disabled", "disabled");
			$("body").find(".extra-content").removeClass("input-style");
			$("body").find(".extra-content").addClass("input-style-text");
			$("body").find(".extra-content").attr("readonly", "readonly");
			$(this).parent().parent().find(".btn-edit").css("display", "block");
			$(this).parent().css("display", "none");
			hotelFlag = 1;
		}
	}
}
});

$(".btn-cancel-three").on("click", function() {
	$(this).parent().parent().find("input").removeClass("input-style");
	$(this).parent().parent().find("input").addClass("input-style-text");
	$(this).parent().parent().find("input").attr("readonly", "readonly");
	$(this).parent().parent().find("select").removeClass("input-style");
	$(this).parent().parent().find("select").addClass("input-style-text");
	$(this).parent().parent().find("select").attr("disabled", "disabled");
	$("body").find(".extra-content").removeClass("input-style");
	$("body").find(".extra-content").addClass("input-style-text");
	$("body").find(".extra-content").attr("readonly", "readonly");
	$(this).parent().parent().find(".btn-edit").css("display", "block");
	$(this).parent().css("display", "none");
});

//获取基本信息的值
function getBaseMsg() {
	m_name = $(".m_name").val();
	m_sex = $(".m_sex").find("option:selected").val();
	m_position = $(".m_position").val();
	m_type = $(".m_type").find("option:selected").val();
	m_phone = $(".m_phone").val();
	m_food_type = $(".m_food_type").find("option:selected").val();
	if(m_name == "" || m_sex == "请选择性别" || m_position == "" || m_type == "请选择人员类别" || m_phone == "" || m_food_type == "请选择餐饮类别") {
		alert("请将基本信息填写完整！");
		return false;
	} else {
		if(tel.test(m_phone)) {
			return true;
		} else {
			alert("请输入正确的手机号码！");
			return false;
		}
	}
}

//获取交通工具信息
function getTrafficMsg() {
	car_num = $(".car_num").val();
	go_date = $(".go_date").val();
	go_type = $(".go_type").find("option:selected").val();
	arrive_time = $(".arrive_time").val();
	arrive_place = $(".arrive_place").val();
	go_time = $(".go_time").val();
	go_place = $(".go_place").val();
	if(car_num == "" || go_date == "" || go_type == "请选择出行方式" || arrive_time == "" || arrive_place == "" || go_time == "" || go_place == "") {
		alert("请将交通信息填写完整！");
		return false;
	} else {
		return true;
	}
}
//获取住宿信息
function getHotelMsg() {
	in_time = $(".in_time").val();
	live_time = $(".live_time").val();
	out_time = $(".out_time").val();
	live_type = $(".live_type").val();
	extra_content = $(".extra-content").val();
	if(in_time == "" || live_time == "" || out_time == "" || live_type == "") {
		alert("请将住宿信息填写完整！");
		return false;
	} else {
		return true;
	}
}

$(".btn-add-back-msg").on("click", function() {
	window.location = "member-msg.html?" + para;
});
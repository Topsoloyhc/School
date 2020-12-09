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
var p_id = para.split("&")[0].split("=")[1];
var user_type = para.split("&")[1].split("=")[1];
var account = urlNow.split("?")[2];
var idNumReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
var taiIdReg=/^[A-Z][0-9]{9}$/;//台湾身份证
var gangIdReg=/^[A-Z][0-9]{6}\([0-9A]\)$/;//香港身份证
var aoIdReg=/^[157][0-9]{6}\([0-9]\)$/;//澳门身份证
var telReg = /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
var comb = /^[A-Za-z0-9]+$/;
$.ajax({
	type: "get",
	url: "http://localhost/apply/check",
	async: true,
	data: {
		"p_id": p_id
	},
	"success": function(resp) {
		if(resp.flag == "0") {
			layer.msg('您申报的项目已达上限，无法再申报！', {
				icon: 0,
				time: 1500, //1.5后自动关闭
			});
			window.setTimeout("window.location.href=document.referrer", 1000);
		}
	}
});

var telFlag = 0,
	idNumFlag = 0,
	linkFlag=0;
$(".p-des").blur(function() {
	if($(this).val().length > 500) {
		layer.msg('项目简介不得多于500个字符！', {
			icon: 0,
			time: 2000, //1.5后自动关闭
		});
	}
});

/* $(".m-tel").blur(function() {
	if(!telReg.test($(this).val())) {
		layer.msg('请输入正确的手机号码！', {
			icon: 0,
			time: 2000, //1.5后自动关闭
		});
		telFlag = 0;
	} else {
		telFlag = 1;
	}
});

$(".m-idnum").blur(function() {
	if(!idNumReg.test($(this).val())&&!taiIdReg.test($(this).val())&&!gangIdReg.test($(this).val())&&!aoIdReg.test($(this).val())) {
		layer.msg('请输入正确的身份证号码！', {
			icon: 0,
			time: 2000, //1.5后自动关闭
		});
		linkFlag = 0;
	} else {
		linkFlag = 1;
	}
}); */

$(".header-user-link").attr("href", "../main/main.html?" + para + "?" + account);
var num = 1;
var num1 = 1;
var mflag2 = 0;
var mflag3 = 0;
var tflag = 0;
var memberFlag = 0;
var projectFlag = 0;
var teacherFlag = 0;
var c_id; //比赛类型id；
var a_name, a_school, a_academy, a_rank;
var p_name, p_i, pf_name, p_project_type, pf_psw;
var m_type, m_professional, m_name;
var m_school, m_idnumber, m_tel, m_email;
var m_start_time, m_province;

//添加成员
function add() {
	/* num++;
	if(num > 3) {
		num--;
		alert("若要添加其他成员，请在项目提交成功后到项目详情页中进行操作~");
		return false;
	}

	if(mflag2 == 0) {
		mflag2 = 1; //是否存在第二个成员
		var m2 = document.getElementById("m2");
		m2.style.display = "block";
	} else {
		mflag3 = 1;
		var m3 = document.getElementById("m3");
		m3.style.display = "block";
	}

	return true; */

}

function setWidth() {
	var maxwidth = document.body.clientWidth;

	var header = document.getElementById("header");
	header.style.width = (maxwidth) * 1 + "px";

	var footer = document.getElementById("footer");
	footer.style.width = (maxwidth) * 1 + "px";

	var loginback = document.getElementById("loginback");
	loginback.style.width = (maxwidth) * (0.9) + "px";

	var nav = document.getElementById("nav");
	nav.style.width = (maxwidth) * 1 + "px";
	//nav.style.left=((maxwidth)*1-600)/2+"px";

}

function addteacher() {
	num1++;
	if(num1 > 2) {
		num1--;
		alert("指导老师不得多于两人！");
		return false;
	} else {
		var teacher2 = document.getElementById("teacher2");
		teacher2.style.display = "block";
		tflag = 1;
		return ture;
	}

}

function location1() {

	var m1 = document.getElementById("m1");
/* 	var m2 = document.getElementById("m2");
	var m3 = document.getElementById("m3"); */
	var li1 = document.getElementById("li1");
	var li2 = document.getElementById("li2");
	var li3 = document.getElementById("li3");
	var teacher = document.getElementById("teacher");
	var info = document.getElementById("info");
	var btn1 = document.getElementById("btn1");
	var btn2 = document.getElementById("btn2");
	var btn3 = document.getElementById("btn3");
	var btn4 = document.getElementById("btn4");

	btn1.style.display = "block";
	btn2.style.display = "none";
	btn3.style.display = "none";
	btn4.style.display = "none";

	li1.style.backgroundColor = "white";
	li1.style.color = "#006cb5";

	li2.style.backgroundColor = "#006cb5";
	li2.style.color = "white";

	li3.style.backgroundColor = "#006cb5";
	li3.style.color = "white";

	m1.style.display = "block";
/* 	m2.style.display = "none";
	m3.style.display = "none";

	if(mflag2 == 1) {
		m2.style.display = "block";
	}

	if(mflag3 == 1) {
		m3.style.display = "block";
	} */

	teacher.style.display = "none";

	info.style.display = "none";
}

//添加成员时的下一步
function location2() {
	getMenber();
	if(memberFlag == 1) {
		var m1 = document.getElementById("m1");
/* 		var m2 = document.getElementById("m2");
		var m3 = document.getElementById("m3"); */
		var li1 = document.getElementById("li1");
		var li2 = document.getElementById("li2");
		var li3 = document.getElementById("li3");
		var teacher = document.getElementById("teacher");
		var info = document.getElementById("info");
		var btn1 = document.getElementById("btn1");
		var btn2 = document.getElementById("btn2");
		var btn3 = document.getElementById("btn3");
		var btn4 = document.getElementById("btn4");

		btn1.style.display = "none";
		btn2.style.display = "block";
		btn4.style.display = "none";
		btn3.style.display = "none";

		li2.style.backgroundColor = "white";
		li2.style.color = "#006cb5";

		li1.style.backgroundColor = "#006cb5";
		li1.style.color = "white";

		li3.style.backgroundColor = "#006cb5";
		li3.style.color = "white";

		m1.style.display = "none";
/* 		m2.style.display = "none";
		m3.style.display = "none"; */

		info.style.display = "block";
		teacher.style.display = "none";

	}
}
//填写项目信息的下一步
function location3() {
	getProjectMsg();
	if(projectFlag == 1) {

		var m1 = document.getElementById("m1");
		// var m2 = document.getElementById("m2");
		// var m3 = document.getElementById("m3");
		var li1 = document.getElementById("li1");
		var li2 = document.getElementById("li2");
		var li3 = document.getElementById("li3");
		var teacher = document.getElementById("teacher");
		var info = document.getElementById("info");
		var btn1 = document.getElementById("btn1");
		var btn2 = document.getElementById("btn2");
		var btn3 = document.getElementById("btn3");
		var btn4 = document.getElementById("btn4");

		btn1.style.display = "none";
		btn2.style.display = "none";
		btn3.style.display = "block";
		btn4.style.display = "block";

		li3.style.backgroundColor = "white";
		li3.style.color = "#006cb5";

		li2.style.backgroundColor = "#006cb5";
		li2.style.color = "white";

		li1.style.backgroundColor = "#006cb5";
		li1.style.color = "white";

		m1.style.display = "none";
/* 		m2.style.display = "none";
		m3.style.display = "none"; */

		teacher.style.display = "block";
		info.style.display = "none"

	}
}

/* function remove2() {

	var m2 = document.getElementById("m2");

	m2.style.display = "none";

	mflag2 = 0;

	num--;
}

function remove3() {

	var m3 = document.getElementById("m3");

	m3.style.display = "none";

	mflag3 = 0;

	num--;
}
 */
function removeteacher() {

	var teacher2 = document.getElementById("teacher2");

	teacher2.style.display = "none";
	tflag = 0;

	num1--;
}

$.ajax({
	"type": "get",
	"url": "http://localhost/participant/" + account,
	"success": function(data) {
		console.log(data);
/* 		var sex;
		if(parseInt(data[0].Participant_sex) == 1) {
			sex = "男";
		} else {
			sex = "女";
		} */
		$(".m-name-one").append(data[0].Participant_name);
		//$(".msg-sex").append(sex);
		$(".m-school-one").append(data[0].Participant_school);
		$(".m-idnum-one").append(data[0].Participant_IDNumber);
		$(".m-tel-one").append(data[0].Participant_phone);
		$(".m-email-one").append(data[0].Participant_mail);
		//$(".msg-address").append(data[0].Participant_address);

/* 		$(".sign-up").attr("href", "../signup/sign-up1.html?" + para + "?" + account);
		$(".add-project").attr("href", "../signup/sign-up1.html?" + para + "?" + account);

		if($(".user-project").text().trim().length==0) {
			$(".project-list-content").append("暂无项目,快去报名吧~");
			$(".table").hide();
		} */
	},
	"error": function() {
		layer.msg('服务器错误!', {
			icon: 0,
			time: 2000, //2s后自动关闭
		});
	}
});

function getMenber() {
	m_school = "";
	m_professional = "";
	m_name = "";
	m_idnumber = "";
	m_tel = "";
	m_email = "";
	m_start_time = "";
	var name = $(".m-name-one").text();
	//console.log(name);
	var type = $(".m-type-one").text();
	var school = $(".m-school-one").text();
	var professional = $(".m-professional-one").val();
	var idnum = $(".m-idnum-one").text();
	var tel = $(".m-tel-one").text();
	var email = $(".m-email-one").text();
	var start_time = $(".m-start-time-one option:selected").text();
	var m_type = "1";
	if(name == "" || school == "" || professional == "" || idnum == "" || tel == "" || email == "" || start_time == "请选择入学年份" || type == "请选择团队角色") {
		alert("请将成员信息填写完整！");
		memberFlag = 0;
	} /* else if(t_type == "负责人" && m_type.indexOf("1") != -1) {
		alert("项目负责人只可有一个！");
		memberFlag = 0;
	}  */else {
		memberFlag = 1;
		/* switch(type) {
			case "负责人":
				m_type = 1 + "";
				break;
			case "团队成员":
				m_type = 2 + "";
				break;
		} */
		console.log("1====" + m_type);
		m_school = school;
		m_professional = professional;
		m_name = name;
		m_idnumber = idnum;
		m_tel = tel;
		m_email = email;
		m_start_time = start_time;
	}
	/* if(mflag2 == 1) {
		var t_name = $(".m-name-two").val();
		var t_type = $(".m-type-two option:selected").text();
		var t_school = $(".m-school-two").val();
		var t_professional = $(".m-professional-two").val();
		var t_idnum = $(".m-idnum-two").val();
		var t_tel = $(".m-tel-two").val();
		var t_email = $(".m-email-two").val();
		var t_start_time = $(".m-start-time-two option:selected").text();
		if(t_name == "" || t_school == "" || t_professional == "" || t_idnum == "" || t_tel == "" || t_email == "" || t_start_time == "请选择入学年份" || t_type == "请选择团队角色") {
			alert("请将成员2信息填写完整！");
			memberFlag = 0;
		} else if(t_type == "负责人" && m_type.indexOf("1") != -1) {
			alert("项目负责人只可有一个！");
			memberFlag = 0;
		} else {
			memberFlag = 1;
			switch(t_type) {
				case "负责人":
					m_type = m_type + "," + 1;
					break;
				case "团队成员":
					m_type = m_type + "," + 2;
					break;
			}
			console.log("2====" + m_type);
			m_school = m_school + "," + t_school;
			m_professional = m_professional + "," + t_professional;
			m_name = m_name + "," + t_name;
			m_idnumber = m_idnumber + "," + t_idnum;
			m_tel = m_tel + "," + t_tel;
			m_email = m_email + "," + t_email;
			m_start_time = m_start_time + "," + t_start_time;
		}
	}
	if(mflag3 == 1) {
		var t_name = $(".m-name-three").val();
		var t_type = $(".m-type-three option:selected").text();
		var t_school = $(".m-school-three").val();
		var t_professional = $(".m-professional-three").val();
		var t_idnum = $(".m-idnum-three").val();
		var t_tel = $(".m-tel-three").val();
		var t_email = $(".m-email-three").val();
		var t_start_time = $(".m-start-time-three option:selected").text();
		if(t_name == "" || t_school == "" || t_professional == "" || t_idnum == "" || t_tel == "" || t_email == "" || t_start_time == "请选择入学年份" || t_type == "请选择团队角色") {
			alert("请将成员2信息填写完整！");
			memberFlag = 0;
		} else if(t_type == "负责人" && m_type.indexOf("1") != -1) {
			alert("项目负责人只可有一个！");
			memberFlag = 0;
		} else {
			memberFlag = 1;
			switch(t_type) {
				case "负责人":
					m_type = m_type + "," + 1;
					break;
				case "团队成员":
					m_type = m_type + "," + 2;
					break;
			}
			console.log("3====" + m_type);
			m_school = m_school + "," + t_school;
			m_professional = m_professional + "," + t_professional;
			m_name = m_name + "," + t_name;
			m_idnumber = m_idnumber + "," + t_idnum;
			m_tel = m_tel + "," + t_tel;
			m_email = m_email + "," + t_email;
			m_start_time = m_start_time + "," + t_start_time;
		}
	} */
	console.log(m_type + "====" + m_professional + "====" + m_name + "====" + m_school + "====" + m_idnumber + "====" + m_tel + "====" + m_email + "====" + m_start_time);
}

function getTeacherMsg() {
	a_name = "";
	a_school = "";
	a_academy = "";
	a_rank = "";
	var t_name = $(".t-name-one").val();
	var t_school = $(".t-school-one").val();
	var t_academy = $(".t-academy-one").val();
	var t_rank = $(".t-rank-one option:selected").text();
	if(t_name == "" || t_school == "" || t_academy == "" || t_rank == "职称") {
		alert("请将指导老师的信息填写完整！");
		teacherFlag = 0;
	} else {
		a_name = t_name;
		a_school = t_school;
		a_academy = t_academy;
		switch(t_rank) {
			case "助教":
				a_rank = 1;
				break;
			case "讲师":
				a_rank = 2;
				break;
			case "副教授":
				a_rank = 3;
				break;
			case "教授":
				a_rank = 4;
				break;
			case "无":
				a_rank = 5;
				break;
		}
		teacherFlag = 1;
	}
	if(tflag == 1) //有指导老师2
	{
		var t_name2 = $(".t-name-two").val();
		var t_school2 = $(".t-school-two").val();
		var t_academy2 = $(".t-academy-two").val();
		var t_rank2 = $(".t-rank-two option:selected").text();
		if(t_name2 == "" || t_school2 == "" || t_academy2 == "" || t_rank2 == "职称") {
			alert("请将指导老师2的信息填写完整！");
			teacherFlag = 0;
		} else {
			a_name = a_name + "," + t_name2;
			a_school = a_school + "," + t_school2;
			a_academy = a_academy + "," + t_academy2;
			switch(t_rank2) {
				case "助教":
					a_rank = a_rank + "," + 1;
					break;
				case "讲师":
					a_rank = a_rank + "," + 2;
					break;
				case "副教授":
					a_rank = a_rank + "," + 3;
					break;
				case "教授":
					a_rank = a_rank + "," + 4;
					break;
				case "无":
					a_rank = a_rank + "," + 5;
					break;
			}
			teacherFlag = 1;
		}
	}
	console.log(a_name + "====" + a_school + "====" + a_academy + "====" + a_rank);
}

function getProjectMsg() {
	pf_name = $(".p-file-link").val();
	p_project_type = $(".p-project-type").val();
	p_name = $(".p-name").val();
	p_i = $(".p-des").val();
	pf_name = $(".p-file-link").val();
	pf_psw = $(".p-file-link-psw").val();
	console.log(p_name + "===" + p_i + "====" + pf_name);
	if(p_name == "" || p_i == "" || pf_name == "" || p_project_type == "请选择参与赛道" || pf_psw == "") {
		alert("请项目信息填写完整");
		projectFlag = 0;
	} else {
		projectFlag = 1;
	}
}

function addProject() {
	getMenber();
	getTeacherMsg();
	getProjectMsg();
	if(logo_name == "") {
		alert("请上传项目logo");
	} else if(p_i.length > 500) {
		alert("项目简介不得多于500个字符！");
	}/*  else if(telFlag == 0) {
		alert("手机号码存在错误，请检查！");
	} */ /*else if(idNumFlag == 0) {
		alert("身份证号存在错误，请检查！");
	}*//* else if(linkFlag==0)
	{
		alert("网盘链接存在错误，请检查！");
	} */
/* 	else if(m_type.split("1").length>2) {
		alert("一个项目仅能有一个负责人！");
	} */
	else if(teacherFlag == 1 && projectFlag == 1 && memberFlag == 1) {
		$.ajax({
			"type": "post",
			"url": "http://localhost/apply",
			"data": {
				"p_id": p_id,
				"c_id": 1, //比赛id
				"a_name": a_name,
				"a_school": a_school,
				"a_academy": a_academy,
				"a_rank": a_rank,
				"p_name": p_name,
				"p_i": p_i,
				"p_type": p_project_type,
				"m_type": m_type,
				"m_school": m_school,
				"m_professional": m_professional,
				"m_name": m_name,
				"m_IDNumber": m_idnumber,
				"m_tel": m_tel,
				"m_mail": m_email,
				"m_enrolTime": m_start_time,
				"logo_name": logo_name,
				"pf_name": pf_name,
				"pf_code": pf_psw
			},
			"success": function(resp) {
				if(parseInt(resp.flag) == 1) {
					alert("申报项目成功！");
					window.setTimeout("window.location='../main/main.html?" + para + "?" + account + "'", 500);
				} else {
					alert("服务器错误，请稍后再试或联系管理员微信：dyz_123698745、邮箱：1974794924@qq.com！");
				}

			},
			"error": function() {
				alert("服务器错误，请稍后再试或联系管理员微信：dyz_123698745、邮箱：1974794924@qq.com！");
			}
		});
	}

}
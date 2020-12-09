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
	"error": function() {
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
var project_id = urlNow.split("?")[2].split("=")[1];
var team_id;
var pf_id;
var taiIdReg=/^[A-Z][0-9]{9}$/;//台湾身份证
var gangIdReg=/^[A-Z][0-9]{6}\([0-9A]\)$/;//香港身份证
var aoIdReg=/^[157][0-9]{6}\([0-9]\)$/;//澳门身份证
var telReg = /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
var idNumReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
switch(parseInt(user_type)) {
	case 1: //校级管理员
		$(".to-admin-tmp2").attr("href", "admin-tmp2.html?" + para);
		break;
	case 2: //评委
		$(".to-admin-tmp2").attr("href", "admin-tmp3.html?" + para);
		break;
	case 3: //最高管理员
		$(".to-admin-tmp2").attr("href", "admin-tmp3.html?" + para);
		break;
	case 0: //参赛选手
		$(".score-detail").hide();
		$(".to-admin-tmp2").text("个人主页");
		$(".to-admin-tmp2").attr("href", "../main/main.html?" + para + "?" + urlNow.split("?")[3]);
		break;
}
//隐藏编辑按钮
if(parseInt(user_type) != 0) {
	$(".edit-project-name").hide();
	$(".edit-project-describe").hide();
	$(".edit-project-file-link").hide();
	$(".add-project-member").hide();
	$(".edit-th").hide();
	$(".add-project-teacher").hide();
	$(".list-group-item").hide();
}

$.ajax({
	"type": "get",
	"url": "http://localhost/administrator/showProject/" + project_id,
	"success": function(msg) {
		console.log(msg);
		var compititionType = "主赛道";
		if(msg[0].Project_type == "2") {
			compititionType = "专项赛道";
		}
		$("title").text(compititionType + "-" + msg[0].Project_name);
		team_id = msg[0].Team_id;
		pf_id = msg[0].File_id;
		switch(parseInt(msg[0].Project_level)) {
			case 1:
				{
					$(".project-status-content").text("初赛，");
					switch(parseInt(msg[0].Project_status1)) {
						case 1:
							$(".project-status-content").append("评选中");
							break;
						case 2:
							$(".project-status-content").append("已晋级");
							break;
					}
				}
				break;
			case 2:
				{
					$(".project-status-content").text("复赛，");
					switch(parseInt(msg[0].Project_status2)) {
						case 1:
							$(".project-status-content").append("评选中");
							break;
						case 2:
							$(".project-status-content").append("已晋级");
							break;
					}
				}
				break;
			case 3:
				$(".project-status-content").text("决赛，");
				switch(parseInt(msg[0].Project_status3)) {
					case 1:
						$(".project-status-content").append("评选中");
						break;
					case 2:
						$(".project-status-content").append("已晋级");
						break;
				}
				break;
		}

		if(msg[0].Score_1 != "" && msg[0].Score_1 != null) {
			$(".score-div").text("");
			$(".score-div").append('<span>评委一：' + msg[0].Score_1 + '</span>');
		}
		if(msg[0].Score_2 != "" && msg[0].Score_2 != null) {
			$(".score-div").append('<span>评委二：' + msg[0].Score_2 + '</span>');
		}
		if(msg[0].Score_3 != "" && msg[0].Score_3 != null) {
			$(".score-div").append('<span>评委三：' + msg[0].Score_3 + '</span>');
		}
		if(msg[0].Score_4 != "" && msg[0].Score_4 != null) {
			$(".score-div").append('<span>评委四：' + msg[0].Score_4 + '</span>');
		}
		if(msg[0].Score_5 != "" && msg[0].Score_5 != null) {
			$(".score-div").append('<span>评委五：' + msg[0].Score_5 + '</span>');
		}
		var file_link = '<a target="_blank" class="link-address" style="margin-right:40px;" href="http://' +
			msg[0].File_name + '">附件链接</a>链接密码：<span class="link-psw">' +
			msg[0].File_code + '</span>';
		$(".project-file").append(file_link);
		if(msg[0].Project_logo != "") {
			$(".admin-header-logo").attr("src", "../upload/" + msg[0].Project_logo);
		}
		for(i in msg) {
			$(".project-name").text(msg[i].Project_name);
			$(".p-admin").text(msg[i].Project_host);
			$(".p-school").text(msg[i].Project_school);
			$(".project-description").text(msg[i].Project_introduction);

			var type;
			switch(parseInt(msg[i].Member_type)) {
				case 1:
					type = "负责人";
					break;
				case 2:
					type = "团队成员";
					break;
				default:
					type = "团队成员";
					break;
			}
			var menberMsg = '<tr><td class="m-name">' + msg[i].Member_name + '</td><td class="m-type">' +
				type + '</td><td style="display: none;" class="m-school">' + msg[i].Member_school +
				'</td><td style="display: none;" class="m-professional">' + msg[i].Member_professional +
				'</td><td style="display: none;" class="m-id-num">' + msg[i].Member_IDNumber +
				'</td><td class="m-tel">' + msg[i].Member_tel + '</td><td class="m-email">' + msg[i].Member_mail +
				'</td><td style="display: none;" class="m-enrolTime">' + msg[i].Member_enrolTime +
				'</td><td><button class="admin-table-button delete-member">删除成员</button>' +
				'<button class="admin-table-button btn-check-member-detail">成员信息</button>' +
				'</td><td style="display: none;" class="m-id">' + msg[i].Member_id + '</td></tr>';

			if(parseInt(user_type) != 0) {
				menberMsg = '<tr><td class="m-name">' + msg[i].Member_name + '</td><td class="m-type">' +
					type + '</td><td style="display: none;" class="m-school">' + msg[i].Member_school +
					'</td><td style="display: none;" class="m-professional">' + msg[i].Member_professional +
					'</td><td style="display: none;" class="m-id-num">' + msg[i].Member_IDNumber +
					'</td><td class="m-tel">' + msg[i].Member_tel + '</td><td class="m-email">' + msg[i].Member_mail +
					'</td><td style="display: none;" class="m-enrolTime">' + msg[i].Member_enrolTime +
					'</td></tr>';
			}
			$(".project-menber").append(menberMsg);
		}

	},
	"error": function(msg) {
		layer.msg('服务器错误!', {
			icon: 0,
			time: 2000, //1.5后自动关闭
		});
	}

});
//指导老师信息
$.ajax({
	"type": "get",
	"url": "http://localhost/administrator/showProjectOfAdviser/" + project_id,
	"success": function(msg) {

		for(i in msg) {
			var type;
			switch(parseInt(msg[i].Adviser_rank)) {
				case 1:
					type = "助教";
					break;
				case 2:
					type = "讲师";
					break;
				case 3:
					type = "副教授";
					break;
				case 4:
					type = "教授";
					break;
				case 5:
					type = "无";
					break;
				default:
					type = "";
					break;
			}
			var teacherMsg = '<tr><td class="t-name">' + msg[i].Adviser_name + '</td><td class="t-school">' +
				msg[i].Adviser_school + '</td><td class="t-academy">' +
				msg[i].Adviser_academy + '</td><td class="t-rank">' + type +
				'</td><td><button class="admin-table-button delete-teacher">删除</button>' +
				'<button class="admin-table-button btn-edit-teacher">编辑</button></td>' +
				'<td style="display: none;" class="t-id">' + msg[i].Adviser_id + '</td></tr>';
			if(parseInt(user_type) != 0) {
				teacherMsg = '<tr><td class="t-name">' + msg[i].Adviser_name + '</td><td class="t-school">' +
					msg[i].Adviser_school + '</td><td class="t-academy">' +
					msg[i].Adviser_academy + '</td><td class="t-rank">' + type +
					'</td><td style="display: none;" class="t-id">' + msg[i].Adviser_id + '</td></tr>';

			}
			$(".project-teacher").append(teacherMsg);
		}

	},
	"error": function(msg) {
		layer.msg('服务器错误!', {
			icon: 0,
			time: 2000, //1.5后自动关闭
		});
	}

});

$(".btn-operation").on("click", function() {
	if($(this).text() == "保存") {
		var score = $(".input-score").val();
		alert(score);
		$(".input-score").removeClass("input-style");
		$(".input-score").addClass("input-style-text");
		$(".input-score").attr("readonly", "readonly");
		$(this).text("修改");
	} else {
		$(".input-score").removeClass("input-style-text");
		$(".input-score").addClass("input-style");
		$(".input-score").removeAttr("readonly");
		$(this).text("保存");
	}

});
//修改资料
$(".edit-project-name").on("click", function() {
	layer.open({
		type: 1,
		title: '修改项目名称',
		shift: 7,
		shadeClose: true,
		area: ['520px', '200px'],
		content: '<div class="layer-outside-input">项目名称：<input class="at-require msg-input new-project-name"value="' +
			$(".project-name").text() + '"  placeholder="请输入新项目名"/></div>',
		btn: [
			'保存修改', '取消修改'
		],
		btn1: function(index) {
			var newName = $(".new-project-name").val().trim();
			if(newName == "") {
				layer.msg('请输入新项目名！', {
					icon: 1,
					time: 1500, //1.5后自动关闭
				});
			} else {

				$.ajax({
					type: "post",
					url: "http://localhost/participant/updataProjectName",
					data: {
						"p_id": project_id,
						"p_name": $(".new-project-name").val()
					},
					"success": function(resp) {
						if(parseInt(resp.flag) == 1) {
							layer.msg('项目名称修改成功！', {
								icon: 0,
								time: 1500, //1.5后自动关闭
							});
							window.setTimeout("document.location.reload()", 1500);
						} else {
							layer.msg('项目名称修改失败，请重试！', {
								icon: 1,
								time: 1500, //1.5后自动关闭
							});
						}
					},
					"error": function() {
						layer.msg('无法连接服务器！', {
							icon: 1,
							time: 1500, //1.5后自动关闭
						});
					}
				});

			}
			layer.close(index);
		},
		btn2: function(index) {
			layer.close(index);
		}
	});
});
//修改项目简介
$(".edit-project-describe").on("click", function() {
	var oldDescribe = $(".project-description").text();

	layer.open({
		type: 1,
		title: '修改项目简介',
		shift: 7,
		shadeClose: true,
		area: ['560px', '300px'],
		content: '<div class="layer-outside-textarea"><span class="textarea-headline">项目简介：</span>' +
			'<textarea class="msg-textarea new-project-description"  placeholder="请输入项目简介"/></textarea></div>',
		success: function() {
			$(".new-project-description").val(oldDescribe);
		},
		btn: [
			'保存修改', '取消修改'
		],
		btn1: function(index) {
			var newDescription = $(".new-project-description").val().trim();
			if(newDescription == "") {
				layer.msg('请输入项目简介！', {
					icon: 1,
					time: 1500, //1.5后自动关闭
				});
			} else {
				$.ajax({
					type: "post",
					url: "http://localhost/participant/updateProject",
					data: {
						"p_id": project_id,
						"p_introduction": $(".new-project-description").val()
					},
					"success": function(resp) {
						if(parseInt(resp.flag) == 1) {
							layer.msg('项目简介修改成功！', {
								icon: 0,
								time: 1500, //1.5后自动关闭
							});
							window.setTimeout("document.location.reload()", 1500);
						} else {
							layer.msg('项目简介修改失败，请重试！', {
								icon: 1,
								time: 1500, //1.5后自动关闭
							});
						}
					},
					"error": function() {
						layer.msg('无法连接服务器！', {
							icon: 1,
							time: 1500, //1.5后自动关闭
						});
					}
				});
			}
			layer.close(index);
		},
		btn2: function(index) {
			layer.close(index);
		}
	});
});

//修改网盘链接和密码
$(".edit-project-file-link").on("click", function() {;
	layer.open({
		type: 1,
		title: '修改附件链接信息',
		shift: 7,
		shadeClose: true,
		area: ['560px', '260px'],
		content: '<div class="layer-outside-input">网盘链接：<input class="at-require msg-input new-project-link-address" value="' +
			$(".link-address").attr("href") + '"  placeholder="请输入网盘链接地址"/></div>' +
			'<div class="layer-outside-input">链接密码：<input class="at-require msg-input new-project-link-psw" value="' +
			$(".link-psw").text() + '" placeholder="请输入网盘链接密码，没有请填“无”"/></div>',
		btn: [
			'保存修改', '取消修改'
		],
		btn1: function(index) {
			var tempLink = $(".new-project-link-address").val().trim();
			var tempCode = $(".new-project-link-psw").val().trim();
			if(tempLink == "" || tempCode == "") {
				layer.msg('请将网盘链接信息填写完整！', {
					icon: 1,
					time: 1500, //1.5后自动关闭
				});
			}else {
				$.ajax({
					type: "post",
					url: "http://localhost/participant/updateLink",
					data: {
						"pf_id": pf_id,
						"pf_link": tempLink,
						"pf_code": tempCode
					},
					"success": function(resp) {
						if(parseInt(resp.flag) == 1) {
							layer.msg('项目附件网盘信息修改成功！', {
								icon: 0,
								time: 1500, //1.5后自动关闭
							});
							window.setTimeout("document.location.reload();", 1000);
						} else {
							layer.msg('项目附件网盘信息修改失败，请重试！', {
								icon: 1,
								time: 1500, //1.5后自动关闭
							});
						}
					},
					"error": function() {
						layer.msg('无法连接服务器！', {
							icon: 1,
							time: 1500, //1.5后自动关闭
						});
					}
				});
			}
			layer.close(index);
		},
		btn2: function(index) {
			layer.close(index);
		}
	});
});

//显示邀请记录
$(".list-group-item").on("click", function() {
	layer.open({
		type: 1,
		title: '邀请记录',
		shift: 7,
		shadeClose: true,
		area: ['560px', '300px'],
		content:'<table class="table table-striped table-member">'+
                '<thead>'+
                '<tr>'+
					'<th style="display: none;">邀请id</th>'+
                    '<th >姓名</th>'+
                    '<th >手机号</th>'+
					'<th style="display: none;">账户</th>'+
					'<th >邀请状态</th>'+
					'<th style="width:220px;" class="edit-th">编辑</th>'+
					'<th style="display: none;"></th>'+
                '</tr>'+
                '</thead>'+
                '<tbody class="invite-menber">'+
                
                '</tbody>'+
            '</table>'
		
	});
	$.ajax({
			"type": "get",
			"url": "http://localhost/participant/showInvite",
			"data": {
				"user_id": user_id,
			},
			"success": function(msg) {
				console.log(msg);
				for(i in msg) {
					var type;
					switch(parseInt(msg[i].Invite_status)) {
						case 0:
							type = "未处理";
							break;
						case 1:
							type = "接收邀请";
							break;
						case 2:
							type = "拒绝邀请";
							break;
						default:
							type = "";
							break;
					}
					var menberMsg = '<tr><td style="display: none;" class="i-id">' + msg[i].Invite_id +
					'</td><td class="ied-name">' + msg[i].Participant_name +
					'</td><td class="ied-tel">' + msg[i].Participant_phone +
					'</td><td style="display: none;" class="ied-account">' + msg[i].Participant_account +
					'</td><td class="ied-status">' + type +
					'</td><td><button class="admin-table-button delete-invite">删除邀请</button>' +
					'<button class="admin-table-button btn-invite-member-detail">成员信息</button>' +
					'</td><td style="display: none;" class="m-id">' + msg[i].Invited_user + '</td></tr>';
					$(".invite-menber").append(menberMsg);
				}
				
			},
			"error": function() {
				layer.msg('无法连接服务器！', {
					icon: 1,
					time: 1500, //1.5后自动关闭
				});
			}
	});
});

//查看邀请成员信息
$("body").on("click", ".btn-invite-member-detail", function() {
	var search_account = $(this).parent().parent().find(".ied-account").text();
	$.ajax({
						type: "get",
						url: "http://localhost/participant/searchParticipant",
						data: {
							"account": search_account,
						},
						"success": function(data) {
							if(data.flag==1)
							{
								layer.msg('不存在该用户！', {
									icon: 0,
									time: 1500, //1.5后自动关闭
								});
							}
							else{
								console.log(data);
								var temp_name = data[0].Participant_name;
								var temp_school = data[0].Participant_school;
								var temp_id_num = data[0].Participant_IDNumber;
								var temp_tel = data[0].Participant_phone;
								var temp_email = data[0].Participant_mail;
								var temp_id = data[0].Participant_id;
								layer.open({
									type: 1,
									title: '团队成员信息',
									shift: 7,
									shadeClose: true,
									area: ['580px', '360px'],
									content: '<div class="new-msg"><span class="member-id-now" style="display:none;">' + temp_id + '</span>' +
										'<div class="new-msg-inner">姓&emsp;&emsp;名：<input class="at-require msg-input-text member-name" /></div>' +
										'<div class="new-msg-inner">身份证号：<input class="at-require msg-input-text member-id-num" /></div>' +
										'<div class="new-msg-inner">学&emsp;&emsp;校：<input placeholder="请输入学校全称，如“中南财经政法大学”" class="at-require msg-input-text  member-school" /></div>' +
										'<div class="new-msg-inner">手机号码：<input class="at-tel msg-input-text  member-phone"/></div>' +
										'<div class="new-msg-inner">邮箱地址：<input class="at-email msg-input-text  member-email" /></div>' +
										'<div class="new-msg-inner"><button class="before-table-button layer-btn-edit-msg">邀请</button>' +
										'<button class="before-table-button layer-btn-cancel">取消</button></div></div>',
									success: function() {
										$(".member-name").val(temp_name);
										$(".member-id-num").val(temp_id_num);
										$(".member-school").val(temp_school);
										$(".member-phone").val(temp_tel);
										$(".member-email").val(temp_email);
										$(".member-name").attr("readonly", "readonly");
										$(".member-id-num").attr("readonly", "readonly");
										$(".member-school").attr("readonly", "readonly");
										$(".member-phone").attr("readonly", "readonly");
										$(".member-email").attr("readonly", "readonly");
										if(user_type != 0) {
											$(".layer-btn-edit-msg").hide();
										}
									}

								});
							}
						},
						"error": function() {
							layer.msg('无法连接服务器！', {
								icon: 1,
								time: 1500, //1.5后自动关闭
							});
						}
					});
});

//添加团队成员
$(".add-project-member").on("click", function() {
	var m_num = $(".table-member").find("tr").length - 1;
	//判断成员个数
	if(m_num >= 10) {
		layer.msg('团队成员人数已达上限！', {
			icon: 1,
			time: 1500, //1.5后自动关闭
		});
	} else {
		layer.open({
			type: 1,
			title: '搜索团队成员',
			shift: 7,
			shadeClose: true,
			area: ['580px', '150px'],
			content: '<div class="input-group">' +
					 '<input type="text" class="form-control search" placeholder="Search for...">' +
					 '<span class="input-group-btn">' +
					 '</span>' +
					 '</div>',
				/* '<div class="new-msg">' +
				'<div class="new-msg-inner">姓&emsp;&emsp;名：<input class="at-require msg-input new-member-name" /></div>' +
				'<div class="new-msg-inner">角&emsp;&emsp;色：<select class="msg-input  new-member-role">' +
				'<option value="2">团队成员</option></select></div>' +
				'<div class="new-msg-inner">身份证号：<input class="at-require msg-input  new-member-id-num" /></div>' +
				'<div class="new-msg-inner">学&emsp;&emsp;校：<input placeholder="请输入学校全称，如“中南财经政法大学”" class="at-require msg-input  new-member-school" /></div>' +
				'<div class="new-msg-inner">专&emsp;&emsp;业：<input class="at-require msg-input  new-member-profession" /></div>' +
				'<div class="new-msg-inner">手机号码：<input class="at-tel msg-input  new-member-phone"/></div>' +
				'<div class="new-msg-inner">邮箱地址：<input class="at-email msg-input  new-member-email" /></div>' +
				'<div class="new-msg-inner">入学年份：<select class="msg-input  new-member-learntime"><option value="2012" selected>2012</option>' +
				'<option value="2013">2013</option><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option></select></div></div>', */
			btn: [
				'搜索', '取消'
			],
			btn1: function(index) {
				var search_account = $(".search").val().trim();
				console.log(search_account);
				$.ajax({
						type: "get",
						url: "http://localhost/participant/searchParticipant",
						data: {
							"account": search_account,
						},
						"success": function(data) {
							if(data.flag==1)
							{
								layer.msg('不存在该用户！', {
									icon: 0,
									time: 1500, //1.5后自动关闭
								});
							}
							else{
								console.log(data);
								var temp_name = data[0].Participant_name;
								var temp_school = data[0].Participant_school;
								var temp_id_num = data[0].Participant_IDNumber;
								var temp_tel = data[0].Participant_phone;
								var temp_email = data[0].Participant_mail;
								var temp_id = data[0].Participant_id;
								layer.open({
									type: 1,
									title: '团队成员信息',
									shift: 7,
									shadeClose: true,
									area: ['580px', '360px'],
									content: '<div class="new-msg"><span class="member-id-now" style="display:none;">' + temp_id + '</span>' +
										'<div class="new-msg-inner">姓&emsp;&emsp;名：<input class="at-require msg-input-text member-name" /></div>' +
										'<div class="new-msg-inner">身份证号：<input class="at-require msg-input-text member-id-num" /></div>' +
										'<div class="new-msg-inner">学&emsp;&emsp;校：<input placeholder="请输入学校全称，如“中南财经政法大学”" class="at-require msg-input-text  member-school" /></div>' +
										'<div class="new-msg-inner">手机号码：<input class="at-tel msg-input-text  member-phone"/></div>' +
										'<div class="new-msg-inner">邮箱地址：<input class="at-email msg-input-text  member-email" /></div>' +
										'<div class="new-msg-inner"><button class="before-table-button layer-btn-edit-msg">邀请</button>' +
										'<button class="before-table-button layer-btn-cancel">取消</button></div></div>',
									success: function() {
										$(".member-name").val(temp_name);
										$(".member-id-num").val(temp_id_num);
										$(".member-school").val(temp_school);
										$(".member-phone").val(temp_tel);
										$(".member-email").val(temp_email);
										$(".member-name").attr("readonly", "readonly");
										$(".member-id-num").attr("readonly", "readonly");
										$(".member-school").attr("readonly", "readonly");
										$(".member-phone").attr("readonly", "readonly");
										$(".member-email").attr("readonly", "readonly");
										if(user_type != 0) {
											$(".layer-btn-edit-msg").hide();
										}
									}

								});
							}
						},
						"error": function() {
							layer.msg('无法连接服务器！', {
								icon: 1,
								time: 1500, //1.5后自动关闭
							});
						}
					});
/* 				var tempRole = $(".new-member-role").find("option:selected").val();
				var tempProfession = $(".new-member-profession").val().trim();
				var tempName = $(".new-member-name").val().trim();
				var tempSchool = $(".new-member-school").val().trim();
				var tempIdNum = $(".new-member-id-num").val().trim();
				var tempPhone = $(".new-member-phone").val().trim();
				var tempEmail = $(".new-member-email").val().trim();
				var tempLearnTime = $(".new-member-learntime").find("option:selected").val();
				if(tempProfession == "" || tempName == "" || tempSchool == "" || tempIdNum == "" || tempPhone == "" || tempEmail == "") {
					layer.msg('请将团队成员信息填写完整！', {
						icon: 0,
						time: 1500, //1.5后自动关闭
					});
				} else if(!idNumReg.test(tempIdNum)&&!taiIdReg.test(tempIdNum)&&!gangIdReg.test(tempIdNum)&&!aoIdReg.test(tempIdNum)) {
					layer.msg('身份证号码有误！', {
						icon: 0,
						time: 1500, //1.5后自动关闭
					});
				} else if(!telReg.test(tempPhone)) {
					layer.msg('手机格式有误！', {
						icon: 0,
						time: 1500, //1.5后自动关闭
					});
				} else if(!emailReg.test(tempEmail)) {
					layer.msg('邮箱格式有误！', {
						icon: 0,
						time: 1500, //1.5后自动关闭
					});
				} else {
					$.ajax({
						type: "post",
						url: "http://localhost/participant/addMember",
						data: {
							"m_id": team_id,
							"m_type": $(".new-member-role").find("option:selected").val(),
							"m_professional": tempProfession,
							"m_name": tempName,
							"m_school": tempSchool,
							"m_IDNum": tempIdNum,
							"m_tel": tempPhone,
							"m_mail": tempEmail,
							"m_enroltime": $(".new-member-learntime").find("option:selected").val(),
						},
						"success": function(resp) {
							switch(parseInt(resp.flag)) {
								case 1:
									layer.msg('新增成功！', {
										icon: 0,
										time: 1500, //1.5后自动关闭
									});
									window.setTimeout("document.location.reload();", 1000);
									break;
								default:
									layer.msg('新增失败，请重试！', {
										icon: 1,
										time: 1500, //1.5后自动关闭
									});
									window.setTimeout("document.location.reload();", 1000);
									break;
							}
						},
						"error": function() {
							layer.msg('无法连接服务器！', {
								icon: 1,
								time: 1500, //1.5后自动关闭
							});
						}
					});
				} */
			},
			btn2: function(index) {
				layer.close(index);
			}
		});
	}

});


//新增指导老师
$(".add-project-teacher").on("click", function() {
	var t_num = $(".table-teacher").find("tr").length - 1;
	//判断老师个数
	if(t_num >= 2) {
		layer.msg('指导老师人数已达上限！', {
			icon: 1,
			time: 1500, //1.5后自动关闭
		});
	} else {
		layer.open({
			type: 1,
			title: '添加指导老师',
			shift: 7,
			shadeClose: true,
			area: ['580px', '380px'],
			content: '<div class="new-msg">' +
				'<div class="new-msg-inner">姓&emsp;&emsp;名：<input class="at-require msg-input new-t-name" /></div>' +
				'<div class="new-msg-inner">学&emsp;&emsp;校：<input placeholder="请输入学校全称，如“中南财经政法大学”" class="at-require msg-input  new-t-school" /></div>' +
				'<div class="new-msg-inner">学&emsp;&emsp;院：<input  class="at-require msg-input  new-t-academy" /></div>' +
				'<div class="new-msg-inner">职&emsp;&emsp;称：<select class="msg-input  new-t-type"><option value="1" selected>助教</option>' +
				'<option value="2" >讲师</option><option value="3" >副教授</option><option value="4" >教授</option><option value="5" >无</option></select></div></div>',
			btn: [
				'新增', '取消'
			],
			btn1: function(index) {
				var tempName = $(".new-t-name").val().trim();
				var tempSchool = $(".new-t-school").val().trim();
				var tempAcandemy = $(".new-t-academy").val().trim();
				if(tempName == "" || tempSchool == "" || tempAcandemy == "") {
					layer.msg('请将指导老师信息填写完整', {
						icon: 0,
						time: 1500, //1.5后自动关闭
					});
				} else {

					$.ajax({
						type: "post",
						url: "http://localhost/participant/addAdviser",
						data: {
							"p_id": project_id,
							"a_name": tempName,
							"a_school": tempSchool,
							"a_academy": tempAcandemy,
							"a_rank": $(".new-t-type").find("option:selected").val()
						},
						"success": function(resp) {
							switch(parseInt(resp.flag)) {
								case 1:
									layer.msg('新增成功！', {
										icon: 0,
										time: 1500, //1.5后自动关闭
									});
									window.setTimeout("document.location.reload();", 1000);
									break;
								case 2:
									layer.msg('新增成功！', {
										icon: 0,
										time: 1500, //1.5后自动关闭
									});
									window.setTimeout("document.location.reload();", 1000);
									break;
								default:
									layer.msg('新增失败，请重试！', {
										icon: 1,
										time: 1500, //1.5后自动关闭
									});
									window.setTimeout("document.location.reload();", 1000);
									break;
							}
						},
						"error": function() {
							layer.msg('无法连接服务器！', {
								icon: 1,
								time: 1500, //1.5后自动关闭
							});
						}
					});
				}
			},
			btn2: function(index) {
				layer.close(index);
			}
		});
	}
});

//编辑老师信息
$("body").on("click", ".btn-edit-teacher", function() {
	var old_t_name = $(this).parent().parent().find(".t-name").text();
	var old_t_school = $(this).parent().parent().find(".t-school").text();
	var old_t_academy = $(this).parent().parent().find(".t-academy").text();
	var old_temp_rank = $(this).parent().parent().find(".t-rank").text();
	var old_t_id = $(this).parent().parent().find(".t-id").text();
	var old_t_rank;
	switch(old_temp_rank) {
		case "助教":
			old_t_rank = 1;
			break;
		case "讲师":
			old_t_rank = 2;
			break;
		case "副教授":
			old_t_rank = 3;
			break;
		case "教授":
			old_t_rank = 4;
			break;
		case "无":
			old_t_rank = 5;
			break;
	}
	layer.open({
		type: 1,
		title: '编辑指导老师信息',
		shift: 7,
		shadeClose: true,
		area: ['580px', '380px'],
		content: '<div class="new-msg">' +
			'<div class="new-msg-inner">姓&emsp;&emsp;名：<input class="at-require msg-input new-t-name" /></div>' +
			'<div class="new-msg-inner">学&emsp;&emsp;校：<input placeholder="请输入学校全称，如“中南财经政法大学”" class="at-require msg-input  new-t-school" /></div>' +
			'<div class="new-msg-inner">学&emsp;&emsp;院：<input class="at-require msg-input  new-t-academy" /></div>' +
			'<div class="new-msg-inner">职&emsp;&emsp;称：<select class="msg-input  new-t-type"><option value="1" selected>助教</option>' +
			'<option value="2" >讲师</option><option value="3" >副教授</option><option value="4" >教授</option><option value="5" >无</option></select></div></div>',
		"success": function() {
			$(".new-t-name").val(old_t_name);
			$(".new-t-school").val(old_t_school);
			$(".new-t-academy").val(old_t_academy);
			$(".new-t-type").val(old_t_rank);
		},
		btn: [
			'修改', '取消'
		],
		btn1: function(index) {
			var tempName = $(".new-t-name").val().trim();
			var tempSchool = $(".new-t-school").val().trim();
			var tempAcandemy = $(".new-t-academy").val().trim();
			if(tempName == "" || tempSchool == "" || tempAcandemy == "") {
				layer.msg('请将指导老师信息填写完整', {
					icon: 0,
					time: 1500, //1.5后自动关闭
				});
			} else {

				$.ajax({
					type: "post",
					url: "http://localhost/participant/updateAdviser",
					data: {
						"a_id": old_t_id,
						"a_name": tempName,
						"a_school": tempSchool,
						"a_academy": tempAcandemy,
						"a_rank": $(".new-t-type").find("option:selected").val()
					},
					"success": function(resp) {
						switch(parseInt(resp.flag)) {
							case 1:
								layer.msg('修改成功！', {
									icon: 0,
									time: 1500, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
							default:
								layer.msg('修改失败，请重试！', {
									icon: 1,
									time: 1500, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
						}
					},
					"error": function() {
						layer.msg('无法连接服务器！', {
							icon: 1,
							time: 1500, //1.5后自动关闭
						});
					}
				});

			}
		},
		btn2: function(index) {
			layer.close(index);
		}
	});
});

//删除邀请信息
$("body").on("click", ".delete-invite", function() {
	var i_id = $(this).parent().parent().find(".i-id").text();
		layer.open({
			title: '删除邀请',
			content: '确认删除该邀请信息？',
			area: [
				'100px', '200px'
			],
			btn: [
				'确认', '取消'
			],
			btn1: function(index) {
				$.ajax({
					type: "post",
					url: "http://localhost/participant/deleteInvite",
					data: {
						"i_id": i_id
					},
					"success": function(resp) {
						switch(parseInt(resp.flag)) {
							case 0:
								layer.msg('不包含该邀请信息，请刷新！', {
									icon: 0,
									time: 2000, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
							case 1:
								layer.msg('成功删除该邀请信息！', {
									icon: 1,
									time: 1500, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
							default:
								layer.msg('删除失败，请重试！', {
									icon: 0,
									time: 1500, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
						}
					},
					"error": function() {
						layer.msg('无法连接服务器！', {
							icon: 0,
							time: 1500, //1.5后自动关闭
						});
					}
				});
				layer.close(index);
			},
			btn2: function(index) {
				layer.close(index);
			}
		});

//	}
});

//删除指导老师
$("body").on("click", ".delete-teacher", function() {
	var t_id = $(this).parent().parent().find(".t-id").text();
//	var temp_type = $(this).parent().parent().find(".m-type").text();
//	if(temp_type == "负责人") {
//		layer.msg('项目负责人不可删除！', {
//			icon: 0,
//			time: 1500, //1.5后自动关闭
//		});
//	} else {

		layer.open({
			title: '删除指导老师',
			content: '确认删除该指导老师？',
			area: [
				'100px', '200px'
			],
			btn: [
				'确认', '取消'
			],
			btn1: function(index) {
				$.ajax({
					type: "post",
					url: "http://localhost/participant/deleteAdviser",
					data: {
						"a_id": t_id,
						"p_id": project_id
					},
					"success": function(resp) {
						switch(parseInt(resp.flag)) {
							case 0:
								layer.msg('该项目中不包含该指导老师！', {
									icon: 0,
									time: 2000, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
							case 1:
								layer.msg('成功删除第一位指导老师！', {
									icon: 1,
									time: 1500, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
							case 2:
								layer.msg('成功删除第二位指导老师！', {
									icon: 1,
									time: 1500, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
							default:
								layer.msg('删除失败，请重试！', {
									icon: 0,
									time: 1500, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
						}
					},
					"error": function() {
						layer.msg('无法连接服务器！', {
							icon: 0,
							time: 1500, //1.5后自动关闭
						});
					}
				});
				layer.close(index);
			},
			btn2: function(index) {
				layer.close(index);
			}
		});

//	}
});


//删除成员
$("body").on("click", ".delete-member", function() {
	var temp_id = $(this).parent().parent().find(".m-id").text();
	var temp_type = $(this).parent().parent().find(".m-type").text();
	if(temp_type == "负责人") {
		layer.msg('项目负责人不可删除！', {
			icon: 0,
			time: 1500, //1.5后自动关闭
		});
	} else {

		layer.open({
			title: '删除团队成员',
			content: '确认删除该团队成员？',
			area: [
				'100px', '200px'
			],
			btn: [
				'确认', '取消'
			],
			btn1: function(index) {
				$.ajax({
					type: "post",
					url: "http://localhost/participant/deleteMember",
					data: {
						"m_id": temp_id
					},
					"success": function(resp) {
						switch(parseInt(resp.flag)) {
							case 0:
								layer.msg('项目负责人不可删除，只能进行修改！', {
									icon: 0,
									time: 2000, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
							case 1:
								layer.msg('删除成功！', {
									icon: 1,
									time: 1500, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
							default:
								layer.msg('删除失败，请重试！', {
									icon: 0,
									time: 1500, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
						}
					},
					"error": function() {
						layer.msg('无法连接服务器！', {
							icon: 0,
							time: 1500, //1.5后自动关闭
						});
					}
				});
				layer.close(index);
			},
			btn2: function(index) {
				layer.close(index);
			}
		});

	}
});

//查看成员信息
$("body").on("click", ".btn-check-member-detail", function() {
	var temp_name = $(this).parent().parent().find(".m-name").text();
	var temp_type = $(this).parent().parent().find(".m-type").text();
	var temp_school = $(this).parent().parent().find(".m-school").text();
	var temp_professional = $(this).parent().parent().find(".m-professional").text();
	var temp_id_num = $(this).parent().parent().find(".m-id-num").text();
	var temp_tel = $(this).parent().parent().find(".m-tel").text();
	var temp_email = $(this).parent().parent().find(".m-email").text();
	var temp_enrolTime = $(this).parent().parent().find(".m-enrolTime").text();
	var temp_id = $(this).parent().parent().find(".m-id").text();
	layer.open({
		type: 1,
		title: '团队成员信息',
		shift: 7,
		shadeClose: true,
		area: ['580px', '560px'],
		content: '<div class="new-msg"><span class="member-id-now" style="display:none;">' + temp_id + '</span>' +
			'<div class="new-msg-inner">姓&emsp;&emsp;名：<input class="at-require msg-input-text member-name" /></div>' +
			'<div class="new-msg-inner">角&emsp;&emsp;色：<select class="msg-input-text  member-role" disabled="disabled"><option value="负责人">负责人</option>' +
			'<option value="团队成员">团队成员</option></select></div>' +
			'<div class="new-msg-inner">身份证号：<input class="at-require msg-input-text member-id-num" /></div>' +
			'<div class="new-msg-inner">学&emsp;&emsp;校：<input placeholder="请输入学校全称，如“中南财经政法大学”" class="at-require msg-input-text  member-school" /></div>' +
			'<div class="new-msg-inner">专&emsp;&emsp;业：<input class="at-require msg-input-text  member-profession" /></div>' +
			'<div class="new-msg-inner">手机号码：<input class="at-tel msg-input-text  member-phone"/></div>' +
			'<div class="new-msg-inner">邮箱地址：<input class="at-email msg-input-text  member-email" /></div>' +
			'<div class="new-msg-inner">入学年份：<select class="msg-input-text  member-learntime"><option value="2012" selected>2012</option>' +
			'<option value="2013">2013</option><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option></select></div>' +
			'<div class="new-msg-inner"><button class="before-table-button layer-btn-edit2-msg">修改</button>' +
			'<button class="before-table-button layer-btn-cancel">取消</button></div></div>',
		success: function() {
			$(".member-name").val(temp_name);
			$(".member-role").val(temp_type);
			$(".member-id-num").val(temp_id_num);
			$(".member-school").val(temp_school);
			$(".member-profession").val(temp_professional);
			$(".member-phone").val(temp_tel);
			$(".member-email").val(temp_email);
			$(".member-learntime").val(temp_enrolTime);
			$(".member-name").attr("readonly", "readonly");
			$(".member-role").attr("readonly", "readonly");
			$(".member-id-num").attr("readonly", "readonly");
			$(".member-school").attr("readonly", "readonly");
			$(".member-profession").attr("readonly", "readonly");
			$(".member-phone").attr("readonly", "readonly");
			$(".member-email").attr("readonly", "readonly");
			$(".member-learntime").attr("readonly", "readonly");
			$(".member-role").addClass("clear-appearance");
			$(".member-learntime").addClass("clear-appearance");
			if(user_type != 0) {
				$(".layer-btn-edit2-msg").hide();
			}
		}

	});
});

$("body").on("click", ".layer-btn-cancel", function() {
	layer.closeAll();
});

//弹出框中的邀请 layer-btn-edit-msg
$("body").on("click", ".layer-btn-edit-msg", function() {
	//邀请人的id  user_id 
	//队伍id  team_id 
	var member_id_now = $(".member-id-now").text(); //被邀请人的id
	//alert(member_id_now+"--"+user_id+"--"+team_id);
	$.ajax({
			type: "post",
			url: "http://localhost/participant/inviteMember",
			"async": false,
			data: {
				"user_id": user_id,
				"team_id": team_id,
				"member_id_now": member_id_now
			},
			"success": function(resp) {
				switch(parseInt(resp.flag)) {
					case 1:
						layer.msg('发送邀请成功！', {
							icon: 0,
							time: 2000, //2s后自动关闭
						});
						window.setTimeout("document.location.reload();", 1000);
						break;
					case 2:
						layer.msg('已发送过邀请！', {
							icon: 0,
							time: 3000, //2s后自动关闭
						});
						window.setTimeout("document.location.reload();", 1000);
						break;
					case 3:
						layer.msg('已发送过邀请且已通过！', {
							icon: 0,
							time: 3000, //2s后自动关闭
						});
						window.setTimeout("document.location.reload();", 1000);
						break;
					case 4:
						layer.open({
								title: '重新发送邀请',
								content: '邀请被拒绝，确认重新发送邀请？',
								area: [
									'100px', '200px'
								],
								btn: [
									'确认', '取消'
								],
								btn1: function(index) {
									$.ajax({
										type: "post",
										url: "http://localhost/participant/ReinviteMember",
										"async": false,
										data: {
											"user_id": user_id,
											"team_id": team_id,
											"member_id_now": member_id_now
										},
										"success": function(resp) {
										switch(parseInt(resp.flag)) {
											case 1:
												layer.msg('重新发送邀请成功！', {
													icon: 0,
													time: 1500, //1.5后自动关闭
												});
												window.setTimeout("document.location.reload();", 1000);
												break;
												default:
													layer.msg('重新发送失败，请重试！', {
														icon: 1,
														time: 1500, //1.5后自动关闭
													});
													window.setTimeout("document.location.reload();", 1000);
													break;
											}
										},
										"error": function() {
											layer.msg('无法连接服务器！', {
												icon: 1,
												time: 1500, //1.5后自动关闭
											});
										}
									});
									layer.close(index);
								},
								btn2: function(index) {
									layer.close(index);
								}
							});
						break;
					default:
						layer.msg('发送邀请失败，请重试！', {
							icon: 1,
							time: 1500, //1.5后自动关闭
						});
						window.setTimeout("document.location.reload();", 1000);
						break;
				}
			},
			"error": function() {
				layer.msg('无法连接服务器！', {
					icon: 1,
					time: 1500, //1.5后自动关闭
				});
			}
		});
});

//弹出框中的修改
$("body").on("click", ".layer-btn-edit2-msg", function() {
	$(".member-name").removeClass("msg-input-text");
	$(".member-role").removeClass("msg-input-text");
	$(".member-id-num").removeClass("msg-input-text");
	$(".member-school").removeClass("msg-input-text");
	$(".member-profession").removeClass("msg-input-text");
	$(".member-phone").removeClass("msg-input-text");
	$(".member-email").removeClass("msg-input-text");
	$(".member-learntime").removeClass("msg-input-text");
	$(".member-name").addClass("msg-input");
	$(".member-role").addClass("msg-input");
	$(".member-id-num").addClass("msg-input");
	$(".member-school").addClass("msg-input");
	$(".member-profession").addClass("msg-input");
	$(".member-phone").addClass("msg-input");
	$(".member-email").addClass("msg-input");
	$(".member-learntime").addClass("msg-input");
	$(".member-name").removeAttr("readonly");
	$(".member-role").removeAttr("readonly");
	$(".member-id-num").removeAttr("readonly");
	$(".member-school").removeAttr("readonly");
	$(".member-profession").removeAttr("readonly");
	$(".member-phone").removeAttr("readonly");
	$(".member-email").removeAttr("readonly");
	$(".member-learntime").removeAttr("readonly");
	$(".layer-btn-edit2-msg").addClass("layer-btn-save-msg");
	$(".layer-btn-edit2-msg").removeClass("layer-btn-edit2-msg");
	//三角
	$(".member-role").removeClass("clear-appearance");
	$(".member-learntime").removeClass("clear-appearance");
});
//保存修改
$("body").on("click", ".layer-btn-save-msg", function() {
	var new_m_name = $(".member-name").val();
	var new_temp_type = $(".member-role").val();
	var new_m_id_num = $(".member-id-num").val();
	var new_m_school = $(".member-school").val();
	var new_m_profession = $(".member-profession").val();
	var new_m_phone = $(".member-phone").val();
	var new_m_email = $(".member-email").val();
	var new_m_learntime = $(".member-learntime").val();
	var member_id_now = $(".member-id-now").text();
	var new_m_type = 1;
	if(new_temp_type == "团队成员") {
		new_m_type = 2;
	}
	if(new_m_name == "" || new_m_id_num == "" || new_m_school == "" || new_m_profession == "" || new_m_phone == "" || new_m_email == "") {
		layer.msg('请将团队成员信息填写完整！', {
			icon: 0,
			time: 1500, //1.5后自动关闭
		});
	} else if(!idNumReg.test(new_m_id_num)) {
		layer.msg('身份证号码有误！', {
			icon: 0,
			time: 1500, //1.5后自动关闭
		});
	} else if(!telReg.test(new_m_phone)) {
		layer.msg('手机格式有误！', {
			icon: 0,
			time: 1500, //1.5后自动关闭
		});
	} else if(!emailReg.test(new_m_email)) {
		layer.msg('邮箱格式有误！', {
			icon: 0,
			time: 1500, //1.5后自动关闭
		});
	} else {
		$.ajax({
			type: "post",
			url: "http://localhost/participant/updateMember",
			"async": false,
			data: {
				"m_id": member_id_now,
				"m_type": new_m_type,
				"m_professional": new_m_profession,
				"m_name": new_m_name,
				"m_school": new_m_school,
				"m_IDNum": new_m_id_num,
				"m_tel": new_m_phone,
				"m_mail": new_m_email,
				"m_enroltime": new_m_learntime
			},
			"success": function(resp) {
				switch(parseInt(resp.flag)) {
					case 1:
						layer.msg('修改成功！', {
							icon: 0,
							time: 1500, //1.5后自动关闭
						});
						window.setTimeout("document.location.reload();", 1000);
						break;
					default:
						layer.msg('修改失败，请重试！', {
							icon: 1,
							time: 1500, //1.5后自动关闭
						});
						window.setTimeout("document.location.reload();", 1000);
						break;
				}
			},
			"error": function() {
				layer.msg('无法连接服务器！', {
					icon: 1,
					time: 1500, //1.5后自动关闭
				});
			}
		});
	}
});
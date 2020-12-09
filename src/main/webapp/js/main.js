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
var account = urlNow.split("?")[2];
var dataUrl = "http://localhost/participant/" + account;

var telReg = /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
var idNumReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
var comb = /^[A-Za-z0-9]+$/;
$.ajax({
	"type": "get",
	"url": dataUrl,
	"success": function(data) {
		console.log(data);
		var sex;
		if(parseInt(data[0].Participant_sex) == 1) {
			sex = "男";
		} else {
			sex = "女";
		}
		$(".msg-name").append(data[0].Participant_name);
		$(".msg-sex").append(sex);
		$(".msg-school").append(data[0].Participant_school);
		$(".msg-id-num").append(data[0].Participant_IDNumber);
		$(".msg-phone").append(data[0].Participant_phone);
		$(".msg-email").append(data[0].Participant_mail);
		$(".msg-address").append(data[0].Participant_address);

		$(".sign-up").attr("href", "../signup/sign-up1.html?" + para + "?" + account);
		$(".add-project").attr("href", "../signup/sign-up1.html?" + para + "?" + account);

		for(i in data) {
			if(data[i].Project_id != "" && data[i].Project_id != undefined && data[i].Project_id != null) {
				var type;
				switch(parseInt(data[i].Project_level)) {
					case 1:
						type = "初赛-";
						switch(parseInt(data[i].Project_status1)) {
							case 1:
								type += "评选中";
								break;
							case 2:
								type += "已晋级";
								break;
							default:
								type += "状态错误";
								break;
						}
						break;
					case 2:
						type = "复赛-";
						switch(parseInt(data[i].Project_status2)) {
							case 1:
								type += "评选中";
								break;
							case 2:
								type += "已晋级";
								break;
							default:
								type += "状态错误";
								break;
						}
						break;
					case 3:
						type = "决赛-";
						switch(parseInt(data[i].Project_status3)) {
							case 1:
								type += "评选中";
								break;
							case 2:
								type += "已晋级";
								break;
							default:
								type += "状态错误";
								break;
						}
						break;
				}
				var projectMsg = '<tr><td>' + data[i].Project_name +
					'</td><td>' + data[i].Project_host + '</td>' +
					'<td><a target="_blank" href="http://' + data[i].File_name + '">附件链接</a></td><td>' +
					data[i].File_code + '</td><td>' + type +
					'</td><td><button class="admin-table-button btn-delete">删除项目</button>' +
					'<button class="admin-table-button btn-project-detail">查看详情</button></td><td style="display: none;" class="project_id">' +
					data[i].Project_id + '</td></tr>';
				$(".user-project").append(projectMsg);
			}
		}
		if($(".user-project").text().trim().length==0) {
			$(".project-list-content").append("暂无项目,快去报名吧~");
			$(".table").hide();
		}
	},
	"error": function() {
		layer.msg('服务器错误!', {
			icon: 0,
			time: 2000, //2s后自动关闭
		});
	}
});

//显示被邀请记录
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
                    '<th >邀请人姓名</th>'+
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
			"url": "http://localhost/participant/showInvited",
			"data": {
				"usered_id": user_id,
			},
			"success": function(msg) {
				console.log(msg);
				for(i in msg) {
					var type;
					switch(parseInt(msg[i].Invite_status)) {
						case 0:
							type = "未处理";
							var menberMsg = '<tr><td style="display: none;" class="i-id">' + msg[i].Invite_id +
							'</td><td class="ied-name">' + msg[i].Participant_name +
							'</td><td class="ied-tel">' + msg[i].Participant_phone +
							'</td><td style="display: none;" class="ied-account">' + msg[i].Participant_account +
							'</td><td class="ied-status">' + type +
							'</td><td><button class="admin-table-button accept-invite">接受邀请</button>' +
							'<button class="admin-table-button refuse-invite">拒绝邀请</button>' +
							'</td><td style="display: none;" class="m-id">' + msg[i].Invited_user + '</td></tr>';
							break;
						case 1:
							type = "接收邀请";
							var menberMsg = '<tr><td style="display: none;" class="i-id">' + msg[i].Invite_id +
							'</td><td class="ied-name">' + msg[i].Participant_name +
							'</td><td class="ied-tel">' + msg[i].Participant_phone +
							'</td><td style="display: none;" class="ied-account">' + msg[i].Participant_account +
							'</td><td class="ied-status">' + type +
							'</td><td><p>已接收邀请</p>' +
							'</td><td style="display: none;" class="m-id">' + msg[i].Invited_user + '</td></tr>';
							break;
						case 2:
							type = "拒绝邀请";
							var menberMsg = '<tr><td style="display: none;" class="i-id">' + msg[i].Invite_id +
							'</td><td class="ied-name">' + msg[i].Participant_name +
							'</td><td class="ied-tel">' + msg[i].Participant_phone +
							'</td><td style="display: none;" class="ied-account">' + msg[i].Participant_account +
							'</td><td class="ied-status">' + type +
							'</td><td><p>已拒绝邀请</p>' +
							'</td><td style="display: none;" class="m-id">' + msg[i].Invited_user + '</td></tr>';
							break;
						default:
							type = "";
							break;
					}
					
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

//接受邀请信息
$("body").on("click", ".accept-invite", function() {
	var i_id = $(this).parent().parent().find(".i-id").text();
		layer.open({
			title: '接受邀请',
			content: '确认接受该邀请信息？',
			area: [
				'100px', '200px'
			],
			btn: [
				'确认', '取消'
			],
			btn1: function(index) {
				$.ajax({
					type: "post",
					url: "http://localhost/participant/dealInvite",
					data: {
						"invite_id": i_id,
						"deal":1
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
								layer.msg('成功接受该邀请信息！', {
									icon: 1,
									time: 1500, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
							default:
								layer.msg('接受失败，请重试！', {
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

//拒绝邀请信息
$("body").on("click", ".refuse-invite", function() {
	var i_id = $(this).parent().parent().find(".i-id").text();
		layer.open({
			title: '拒绝邀请',
			content: '确认拒绝该邀请信息？',
			area: [
				'100px', '200px'
			],
			btn: [
				'确认', '取消'
			],
			btn1: function(index) {
				$.ajax({
					type: "post",
					url: "http://localhost/participant/dealInvite",
					data: {
						"invite_id": i_id,
						"deal":2
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
							case 2:
								layer.msg('成功拒绝该邀请信息！', {
									icon: 1,
									time: 1500, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
							default:
								layer.msg('拒绝失败，请重试！', {
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


//删除项目
$("body").on("click", ".btn-delete", function() {
	var projectId = $(this).parent().parent().find(".project_id").text();
	layer.open({
		title: '删除项目',
		content: '确认删除该项目？',

		area: [
			'100px', '200px'
		],
		btn: [
			'确认', '取消'
		],
		btn1: function(index) {
			$.ajax({
				type: "get",
				url: "http://localhost/participant/delectProjet",
				data: {
					"p_id": projectId
				},
				"success": function(resp) {
					switch(parseInt(resp.flag)) {
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
					alert("无法连接服务器！");
				},
			});
			layer.close(index);
		},
		btn2: function(index) {
			layer.close(index);
		}
	});

});
//编辑个人资料
$(".edit-user-msg").on("click", function() {
	var oldSex = $(".msg-sex").text().split("：")[1];
	var oldSex2;
	if(oldSex == "男") {
		oldSex2 = "女";
	} else {
		oldSex2 = "男";
	}
	layer.open({
		type: 1,
		title: '修改个人资料',
		shift: 7,
		shadeClose: true,
		area: ['520px', '480px'],
		content: '<div class="new-msg">' +
			'<div class="new-msg-inner">姓&emsp;&emsp;名：<input class="msg-input new-name" value="' + $(".msg-name").text().split("：")[1] + '"/></div>' +
			'<div class="new-msg-inner">性&emsp;&emsp;别：<select class="msg-input  new-sex"><option selected>' + oldSex + '</option>' +
			'<option>' + oldSex2 + '</option></select></div>' +
			'<div class="new-msg-inner">身份证号：<input class="msg-input  new-id-num" value="' + $(".msg-id-num").text().split("：")[1] + '"/></div>' +
			'<div class="new-msg-inner">学&emsp;&emsp;校：<input class="msg-input  new-school" value="' + $(".msg-school").text().split("：")[1] + '"/></div>' +
			'<div class="new-msg-inner">手机号码：<input class="msg-input  new-phone" value="' + $(".msg-phone").text().split("：")[1] + '"/></div>' +
			'<div class="new-msg-inner">邮箱地址：<input class="msg-input  new-email" value="' + $(".msg-email").text().split("：")[1] + '"/></div>' +
			'<div class="new-msg-inner">地&emsp;&emsp;址：<input class="msg-input  new-address" value="' + $(".msg-address").text().split("：")[1] + '"/></div></div>',
		btn: [
			'保存修改', '取消修改'
		],
		btn1: function(index) {
			var newSex = 1;
			if($(".new-sex").find("option:selected").val() == "男") {
				newSex = 1;
			} else {
				newSex = 2;
			}
			var tempIdNum = $(".new-id-num").val().trim();
			var tempName = $(".new-name").val().trim();
			var tempSchool = $(".new-school").val().trim();
			var tempPhone = $(".new-phone").val().trim();
			var tempEmail = $(".new-email").val().trim();
			var tempAdress = $(".new-address").val().trim();
			if(tempIdNum == "" || tempName == "" || tempSchool == "" || tempPhone == "" || tempEmail == "" || tempAdress == "") {
				layer.msg('请将信息填写完整！', {
					icon: 0,
					time: 1500, //1.5后自动关闭
				});
			} else if(!idNumReg.test(tempIdNum)) {
				layer.msg('请填写正确的身份证号！', {
					icon: 0,
					time: 1500, //1.5后自动关闭
				});
			} else if(!telReg.test(tempPhone)) {
				layer.msg('请填写正确的手机号码！', {
					icon: 0,
					time: 1500, //1.5后自动关闭
				});
			} else if(!emailReg.test(tempEmail)) {
				layer.msg('请填写正确的邮箱地址！', {
					icon: 0,
					time: 1500, //1.5后自动关闭
				});
			} else {

				$.ajax({
					type: "post",
					url: "http://localhost/participant/updateParticipant",
					data: {
						"p_id": user_id,
						"idNum": $(".new-id-num").val(),
						"name": $(".new-name").val(),
						"sex": newSex,
						"school": $(".new-school").val(),
						"phone": $(".new-phone").val(),
						"mail": $(".new-email").val(),
						"address": $(".new-address").val(),
					},
					"success": function(resp) {
						switch(parseInt(resp.flag)) {
							case 1:
								layer.msg('修改成功！', {
									icon: 1,
									time: 1500, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
							default:
								layer.msg('修改失败，请重试！', {
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

			}
		},
		btn2: function(index) {
			layer.close(index);
		}
	});

});

//查看详情
$("body").on("click", ".btn-project-detail", function() {
	var projectId = $(this).parent().parent().find(".project_id").text();
	var detailUrl = '../admin/admin-tmp.html?' + para + "?projectId=" + projectId + "?" + account;
	window.open(detailUrl);
});

//修改密码
$("body").on("click", ".edit-user-psw", function() {
	layer.open({
		type: 1,
		title: '修改密码',
		shift: 7,
		shadeClose: true,
		area: ['560px', '340px'],
		content: '<div class="layer-outside-input">原始密码：<input type="password" class="msg-input old-psw"' +
			' placeholder="请输入原始密码"/></div>' +
			'<div class="layer-outside-input">新&ensp;密&ensp;码：<input type="password" class="msg-input new-psw"' +
			'placeholder="请输入新密码"/></div>' +
			'<div class="layer-outside-input">确认密码：<input type="password" class="msg-input new-confirm-psw"' +
			'placeholder="再次输入新密码"/></div>',
		btn: [
			'确认', '取消'
		],
		btn1: function(index) {
			var tempOldPsw = $(".old-psw").val().trim();
			var tempNewPsw = $(".new-psw").val().trim();
			var tempConfirmPsw = $(".new-confirm-psw").val().trim();
			if(tempOldPsw == "" || tempNewPsw == "" || tempConfirmPsw == "") {
				layer.msg('请将信息填写完整！', {
					icon: 0,
					time: 1500, //1.5后自动关闭
				});
			} else if(tempNewPsw != tempConfirmPsw) {
				layer.msg('新密码与确认密码不一致！', {
					icon: 0,
					time: 1500, //1.5后自动关闭
				});
			} else if(tempNewPsw.length < 8 || !comb.test(tempNewPsw)) {
				layer.msg('密码由英文和数字组成，必须大于8位', {
					icon: 0,
					time: 1500, //1.5后自动关闭
				});
			} else {
				$.ajax({
					type: "post",
					url: "http://localhost/participant/forgetCode",
					data: {
						"account": account,
						"oldCode": tempOldPsw,
						"newCode": tempConfirmPsw
					},
					"success": function(resp) {
						console.log(resp.flag);
						switch(parseInt(resp.flag)) {
							case 0:
								layer.msg('该用户名不存在!', {
									icon: 0,
									time: 1500, //1.5后自动关闭
								});
								break;
							case 2:
								layer.msg('原始密码错误!', {
									icon: 0,
									time: 1500, //1.5后自动关闭
								});
								break;
							case 1:
								layer.msg('密码修改成功!', {
									icon: 1,
									time: 1500, //1.5后自动关闭
								});
								window.setTimeout("document.location.reload();", 1000);
								break;
							default:
								layer.msg('找回密码失败，请重试！', {
									icon: 0,
									time: 1500, //1.5后自动关闭
								});
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
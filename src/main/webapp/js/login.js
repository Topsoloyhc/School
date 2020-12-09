var idNumReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
var comb = /^[A-Za-z0-9]+$/;

function login() {
	var adminTel = $("#admin-tel").val();
	var adminPsw = $("#admin-password").val();
	var amidnoption = $("#select").find("option:selected").val();
	var data = amidnoption + "-" + adminTel + "-" + adminPsw;
	var userId;
	var userType;
	console.log("输入" + adminTel + adminPsw + amidnoption);
	//		async:false,
	if(adminTel == "" || adminPsw == "" || amidnoption == "0") {
		layer.msg('请将信息填写完整！', {
			icon: 2,
			time: 2000, //1.5后自动关闭
		});
	} else {
		$.ajax({
			"type": 'get',
			"url": 'http://localhost/login/' + data,
			success: function(code) {
				console.log(code);
				userId = code[0].user;
				userType = code[0].level;
				switch(parseInt(code[0].flag)) {
					case 0:
						layer.msg('密码错误，登录失败！', {
							icon: 2,
							time: 2000, //1.5后自动关闭
						});
						break;
					case 1:
						layer.msg('登录成功', {
							icon: 0,
							time: 1500, //1.5后自动关闭
						});
						switch(parseInt(userType)) { //0,参赛者/1-校级管理员/2-评委/3-最高管理员
							case 0:
								window.setTimeout("window.location='./main/main.html?userId=" + userId + "&userType=" + userType + "?" + adminTel + "'", 1000);
								break;
							case 1:
								window.setTimeout("window.location='./admin/admin-tmp2.html?userId=" + userId + "&userType=" + userType + "'", 1000)
								break;
							default:
								window.setTimeout("window.location='./admin/admin-tmp3.html?userId=" + userId + "&userType=" + userType + "'", 1000)
								break;
						}

						break;
					case 2:
						layer.msg('不存在该用户!', {
							icon: 0,
							time: 2000, //1.5后自动关闭
						});
						break;

				}
			},
			error: function() {
				layer.msg('服务器错误!', {
					icon: 0,
					time: 2000, //1.5后自动关闭
				});
			}
		});

	}

}
$(document).ready(function() {
	$("body").on("click", ".the-link-forget", function() {
		layer.open({
			type: 1,
			title: '找回密码',
			shift: 7,
			shadeClose: true,
			area: ['560px', '400px'],
			content: '<div class="layer-outside-input">用&ensp;户&ensp;名：<input class="msg-input account"' +
				' placeholder="请输入用户名"/></div>' +
				'<div class="layer-outside-input">身份证号：<input type="password" class="msg-input id-num"' +
				' placeholder="请输入身份证号"/></div>' +
				'<div class="layer-outside-input">新&ensp;密&ensp;码：<input type="password" class="msg-input new-psw"' +
				'placeholder="请输入新密码"/></div>' +
				'<div class="layer-outside-input">确认密码：<input type="password" class="msg-input new-confirm-psw"' +
				'placeholder="再次输入新密码"/></div>',
			btn: [
				'确认', '取消'
			],
			btn1: function(index) {
				var tempAccount = $(".account").val().trim();
				var tempIdNum = $(".id-num").val().trim();
				var tempNewPsw = $(".new-psw").val().trim();
				var tempConfirmPsw = $(".new-confirm-psw").val().trim();
				if(tempAccount == "" || tempIdNum == "" || tempNewPsw == "" || tempConfirmPsw == "") {
					layer.msg('请将信息填写完整！', {
						icon: 0,
						time: 1500, //1.5后自动关闭
					});
				} else if(!idNumReg.test(tempIdNum)) {
					layer.msg('请输入正确的身份证号码！', {
						icon: 0,
						time: 1500, //1.5后自动关闭
					});
				} else if(tempNewPsw.length < 8 || !comb.test(tempNewPsw)) {
					layer.msg('密码由英文和数字组成，必须大于8位', {
						icon: 0,
						time: 1500, //1.5后自动关闭
					});
				} else if(tempNewPsw != tempConfirmPsw) {
					layer.msg('新密码与确认密码不一致！', {
						icon: 0,
						time: 1500, //1.5后自动关闭
					});
				} else {
					$.ajax({
						type: "post",
						url: "http://localhost/participant/ModifyCode",
						data: {
							"account": tempAccount,
							"idNum": tempIdNum,
							"newCode": tempNewPsw
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
									layer.msg('用户与身份证号不匹配!', {
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
});
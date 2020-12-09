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
var urlNow=location.href.replace("#","");
var para=urlNow.split("?")[1]; 
var user_id=para.split("&")[0].split("=")[1];
var user_type=para.split("&")[1].split("=")[1];
var sort1=0;
var sort2=0;
var getDataUrl="http://localhost/administrator";//获取数据的url
var msgLink='<a href="../all-menber.html?userId='+user_id+'&userType=1" class="header-nav-item">决赛回执信息</a>';
$(".link-head").append(msgLink);
//获取管理员信息
$.ajax({
	type:"get",
	url:"http://localhost/administrator/findAdministrator?a_id="+user_id,
	"success":function(resp)
	{
		console.log(resp);
		$(".admin-header-message-title").text(resp.administratorSchool);
		$(".admin-header-logo").attr("src","../images/"+resp.administratorImage);
		$(".ad-phone").text(resp.administratorTel);
		$(".ad-email").text(resp.administratorMail);
	}
});
var table=$('#project-table').DataTable({
	"dom": 'frtip',
    "serverSide" : true,
    "ordering":false,
    "deferRender": true,//延迟渲染
    "order": [],
    "searching":false,//搜索（搜索框）
    "search": {
    "search": $("#project-table_filter").find("input").val()
  	},
    "pageLength" : 10,
    "lengthChange": true,
    "lengthMenu": [ 10, 25,50],
    "language":{
        "search": '<img style="width:26px;" src="../images/search.png"/>',
        "lengthMenu": '<div class="am-u-sm-offset-1"><p class="am-text-primary am-text-default">显示<select data-am-selected">'+'<option value="10" selected>10</option>'+'<option value="15">15</option>'
        +'<option value="20">20</option>'+'<option value="25">25</option>'+'</select>每页</p></div>',
        paginate: {
            "previous": '上一页',
            "next": '下一页'
        },
        zeroRecords: "暂无记录",
        info: '<div style="margin-left:60px;"><p class="am-text-primary am-text-default">显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项</p></div>',
        infoEmpty: '<div class="am-u-sm-offset-1"><p class="am-text-primary am-text-default">显示第 0 至 0 结果，共 0 项</p></div>',
        infoFiltered: ""
    },

    "sAjaxSource" : getDataUrl,
     "fnServerData" : function (sSource, aoData, fnCallback)
     {
     		console.log("sort1、2==="+sort1+sort2);
			 $.ajax ({
    		 "type" : 'post',
    		 "url" : sSource,
    		 "dataType" : "json",
    		 "data" :
    		 {
    			 "aoData": JSON.stringify (aoData),
    			 "a_id":user_id,
    			 "c_id":"1",
    			 "sort1":sort1,
				 "sort2":sort2
    		 },
    		 "success" : function (resp)
    		 {
    		 	console.log(resp);
    			fnCallback (resp);
    		 },
    		 "error":function ()
    		 {
                 alert("获取数据失败");
    		 }
    	});
    	
     },
     "aoColumns":[
     	{"mDataProp":"Project_type"},
        {"mDataProp":"Project_name"},
        {"mDataProp":"Project_host"},
        {"mDataProp":"File_name"},
        {"mDataProp":"File_code"},
        {"mDataProp":"Project_level","className":"p_status"},
        {"mDataProp":null,"className":"p_btn"},
        {"mDataProp":"Project_id","className":"project_id"},
        {"mDataProp":null}
    ],
    "columnDefs":[
    {
			"targets": 0,
			"render": function(data, type, row) {
				switch(parseInt(data)) {
					case 1:
						return "主赛道";
						break;
					case 2:
						return "专项赛道";
						break;
				}
			}
	},
    	{
            "targets": 3,
            "render": function(data, type, row){
              			var html ='<a href="http://'+data+'">附件链接</a>';
			            return html;
            }
      },
        {
            "targets": 5,
            "render": function(data, type, row){
                		switch(parseInt(data))
                		{
                			case 1:
                			return "初赛";
                			break;
                			case 2:
                			return "复赛";
                			break;
                			case 3:
                			return "决赛";
                			break;
                			default:
                			return "未晋级";
                			break;
                		}
            }
        },
        {
            "targets": 6,
            "render": function(data, type, row){
            		var status=parseInt(row.Project_status1);
            		var html;
            		if(status==2)
            			{
            			html = '已晋级';
            			}
            		else
            			{
            			html = '<button class="admin-table-button btn-pass">进入复赛</button>';
            			}
			            return html;
            }
        },
        {
            "targets": 8,
            "render": function(data, type, row){
                		var html = '<button class="admin-table-button btn-detail">查看详情</button>';
			            return html;
            }
        }
    ],

    "rowCallback":function( row, data, index ) {
        $('td:eq(7)', row).hide();
    },
    "initComplete":function(settings, json) {
		$("#project-table_filter").find("input").attr("placeholder","请输入搜索内容");
    }
});

function setWidth(){
	
			var maxwidth=document.body.clientWidth;

			var header=document.getElementById("header");
			header.style.width=(maxwidth)*1+"px";
			
			
			var footer=document.getElementById("footer");
			footer.style.width=(maxwidth)*1+"px";

			var adminheader=document.getElementById("adminheader");
			adminheader.style.width=(maxwidth)*1+"px";
			
			var admincontent=document.getElementById("admincontent");
			admincontent.style.width=(maxwidth)*1+"px";
			
		}
//晋级
$("body").on("click",".btn-pass",function () {
	var project_id=$(this).parent().parent().find(".project_id").text();
	var status=$(this).parent().parent().find(".p_status");
	var btn=$(this).parent().parent().find(".p_btn");
	layer.open({
		title: '项目晋级',
		content: '您最多可通过3个“主赛道”项目、1个“专项赛道”项目，确认晋级该项目？',
		area: [
			'100px', '200px'
		],
		btn: [
			'确认', '取消'
		],
		btn1: function(index) {
			$.ajax({
				"type":"get",
				"url":"http://localhost/administrator/auditpass/"+project_id+"-"+user_id,
				"success":function(code)
							{
								console.log(code);
								switch(parseInt(code.success))
								{
									case 1:
									layer.msg('已通过', {
											icon: 1,
											time: 2000, //1.5后自动关闭
										});
//									document.location.reload();//当前页面 
//									table.ajax.reload(null,false);
									status.text("已晋级");
									btn.text("已晋级");
									break;
									case 2:
										layer.msg('您已晋级3个“主赛道”项目，不可再晋级该类型项目！', {
												icon: 0,
												time: 2000, //1.5后自动关闭
											});
										break;
									case 3:
										layer.msg('您已晋级1个“专项赛道”项目，不可再晋级该类型项目！', {
												icon: 0,
												time: 2000, //1.5后自动关闭
											});
										break;
									default:
									layer.msg('服务器错误，请重试！', {
											icon: 0,
											time: 2000, //1.5后自动关闭
										});
									break;
								}
									
							},
							error:function()
							{
								layer.msg('服务器错误!', {
											icon: 0,
											time: 2000, //1.5后自动关闭
											});
							}
			});	
			layer.close(index);
		},
		btn2: function(index) {
			layer.close(index);
		}
	});
});


//查看详情
$("body").on("click",".btn-detail",function () {
	var project_id=$(this).parent().parent().find(".project_id").text();
	window.location='admin-tmp.html?' + para + "?projectId="+project_id;
});

//搜索
$(".competition-type").on("change",function(){
	var type=$(".competition-type").find("option:selected").val();
	var status=$(".project-status").find("option:selected").val();
	$("#project-table_filter").find('input').val(type+" "+status).keyup();
});
$(".project-status").on("change",function(){
	var type=$(".competition-type").find("option:selected").val();
	var status=$(".project-status").find("option:selected").val();
	$("#project-table_filter").find('input').val(type+" "+status).keyup();
});

//筛选
$(".btn-filter").on("click",function(){
	sort1=$(".competition-type").find("option:selected").val();
	sort2=$(".project-status").find("option:selected").val();
	table.ajax.reload();
});

var comb = /^[A-Za-z0-9]+$/;

//管理员修改密码
$("body").on("click", ".edit-pingwei-psw", function() {
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
					url: "http://localhost/administrator/modifyCode",
					data: {
						"a_id": user_id,
						"old_code": tempOldPsw,
						"new_code": tempConfirmPsw
					},
					"success": function(resp) {
						console.log(resp.flag);
						switch(parseInt(resp.flag)) {
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
								layer.msg('密码修改失败，请重试！', {
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


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
var urlNow=location.href;
var para=urlNow.split("?")[1]; 
var user_id=para.split("&")[0].split("=")[1];
var user_type=para.split("&")[1].split("=")[1];
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
$.ajax({
	type:"get",
	url:"http://localhost/ReturnReceipt/showNetworkLink?a_id="+user_id,
	"success":function(resp)
	{
		if(resp[0].link==""||resp[0].link==null||resp[0].link=="null")
		{
			$(".school-web-adress").attr("value","暂无网盘地址");
		}
		else
		{
			$(".school-web-adress").attr("value",resp[0].link);
			$(".school-web-adress").after('<a href="http://'+resp[0].link+'">打开链接</a>')
		}
		
		if(resp[0].code==""||resp[0].code==null||resp[0].code=="null")
		{
			$(".school-web-adress-psw").attr("value","无链接密码");
		}
		else
		{
			$(".school-web-adress-psw").attr("value",resp[0].code);
		}
	},
	"error":function()
	{
		console.log("连接不上服务器！");
	}
});

var getDataUrl="http://localhost/ReturnReceipt/getReturnReceipt";
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
     
			 $.ajax ({
    		 "type" : 'post',
    		 "url" : sSource,
    		 "dataType" : "json",
    		 "data" :
    		 {
    			 "aoData": JSON.stringify (aoData),
    			 "id":user_id
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
     	{"mDataProp":"Members_name"},
        {"mDataProp":"Members_sex"},
        {"mDataProp":"Members_category"},
        {"mDataProp":"Members_position"},
        {"mDataProp":"Members_tel"},
        {"mDataProp":null,"className":"p_btn"},
        {"mDataProp":"Information_id","className":"msg_id"}
    ],
    "columnDefs":[
        {
            "targets": 5,
            "render": function(data, type, row){
                		var html = '<button class="admin-table-button btn-detail">查看详情</button><button class="admin-table-button btn-all-member-delete">删除回执</button>';
			            return html;
            }
        }
    ],

    "rowCallback":function( row, data, index ) {
        $('td:eq(6)', row).hide();
    },
    "initComplete":function(settings, json) {
    }
});

//编辑网盘信息
$(".edit-school-web-adress").on("click",function(){
	$(".school-web-adress").removeAttr("readonly");
	$(".school-web-adress").removeClass("input-style-text");
	$(".school-web-adress").addClass("input-style");
	$(".school-web-adress-psw").removeAttr("readonly");
	$(".school-web-adress-psw").removeClass("input-style-text");
	$(".school-web-adress-psw").addClass("input-style");
	$(this).attr("onclick","saveWebAddress(this)");
	$(this).text("保存网盘地址");
});

//查看详情
$("body").on("click",".btn-detail",function () {
	var msg_id=$(this).parent().parent().find(".msg_id").text();
	window.open('member-msg.html?'+para+'?msgId='+msg_id);
});

//删除记录
$("body").on("click",".btn-all-member-delete",function () {
	var msg_id=$(this).parent().parent().find(".msg_id").text();
	layer.open({
			title: '删除回执记录',
			content: '确认删除这条回执记录？',
			area: [
				'100px', '200px'
			],
			btn: [
				'确认', '取消'
			],
			btn1: function(index) {
				$.ajax({
					type: "post",
					url: "http://localhost/ReturnReceipt/delectReturnReceipt",
					data: {
						"id": msg_id
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
});
$(".add-record").on("click",function(){
	window.location='member-msg.html?'+para;
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

//保存网盘地址
function saveWebAddress(obj)
{
	var link=$(".school-web-adress").val();
	var psw=$(".school-web-adress-psw").val();
	$.ajax({
			"type":"get",
			"url":"http://localhost/ReturnReceipt/addNetworkLink",
			"data":
			{
				"a_id":user_id,
				"i_code":psw,
      			"i_link":link
			},
			"success":function(resp)
			{
				console.log(resp);
				if(resp.success=="1")
				{
					alert("保存成功！");
					$(".school-web-adress").attr("readonly","readonly");
					$(".school-web-adress").removeClass("input-style");
					$(".school-web-adress").addClass("input-style-text");
					$(".school-web-adress-psw").attr("readonly","readonly");
					$(".school-web-adress-psw").removeClass("input-style");
					$(".school-web-adress-psw").addClass("input-style-text");
					$(".edit-school-web-adress").removeAttr("onclick");
					$(".edit-school-web-adress").text("编辑网盘地址");
				}
				else
				{
					alert("保存失败，请重试！");
				}
			},
			"error":function()
			{
				alert("error");
			}
		});
}
//导出回执
$(".export-record").on("click",function(){
	window.open("http://localhost/administrator/getOriginalFile");
});

//上传回执
$(".upload-huizhi").on("click",function(){
	var fileInput=$(".upload-huizhi-input")[0];
	var file = fileInput.files[0];
	if(file==null||file==undefined)
		{
			alert("请先选择文件！！！");
		}
	else
	{
		var formData = new FormData();
    	formData.append('file', file);
		$.ajax({
         	type:"post",
         	url:"http://localhost/administrator/uploadFile?fileName="+file.name,
         	data:formData,
         	contentType: false,
             /**
             * 必须false才会避开jQuery对 formdata 的默认处理
             * XMLHttpRequest会对 formdata 进行正确的处理
             */
            processData: false,
            enctype:"multipart/form-data",
         	success:function(res)
         	{
         		switch(parseInt(res.flag))
         		{
         		case 1:
         			alert("成功提交回执表！");
         			break;
         		case 2:
         			alert("成功更新回执表！");
         			break;
         		}
         		
         	},
         	error:function()
         	{
         		alert("上传失败,请重试！");
         	}
         });
	}
});

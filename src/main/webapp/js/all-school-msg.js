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
$(".to-admin-tmp2").attr("href", "./admin/admin-tmp3.html?" + para);
var msgLink='<a href="../all-school-hz.html?'+para+'" class="header-nav-item">各校回执信息</a>';
$(".link-head").append(msgLink);
$(".link-head").append('<a href="../all-school-msg.html?'+para+'" class="header-nav-item">各校宣传资料</a>');
var getDataUrl="http://localhost/ReturnReceipt/getReturnReceipt";
var linkDatas;
//获取学校网盘信息
$.ajax({
	type:"get",
	url:"http://localhost/administrator/getBook",
	"async":false,
	"success":function(resp)
	{
		console.log(resp);
		linkDatas=resp;
	}
});

var table=$('#project-table').DataTable({
	"dom": 'frtip',
//  "serverSide" : true,
    "ordering":false,
    "deferRender": true,//延迟渲染
    "order": [],
    "searching":true,//搜索（搜索框）
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
	"data":linkDatas,
    "columns":
    [
    {"data":"name"},
    {"data":"remark"},
    {"data":"code"}
    ],
    "columnDefs":[
        {
            "targets": 1,
            "render": function(data, type, row){
                		var html = '<a class="" href="http://'+data+'">网盘链接</a>';
			            return html;
            }
        }
    ],

    "rowCallback":function( row, data, index ) {
//      $('td:eq(6)', row).hide();
    },
    "initComplete":function(settings, json) {
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


//导出回执
$(".export-record").on("click",function(){
	window.open("http://localhost/ReturnReceipt/downLoadExcle");
});

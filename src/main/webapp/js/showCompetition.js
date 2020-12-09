var urlNow = location.href.replace("#", "");
var para = urlNow.split("?")[1];
var competition_id = para.split("&")[0].split("=")[1];

$.ajax ({
				"type": "get",
    		 	"url" :"http://localhost/showCompetitionDetail",
				"data": {
					"competition_id":para
				},
    		 	"success":function (resp)
    		 	{
					console.log(resp);
					var c = document.getElementById('con_main_left');
					c.innerHTML += '<p align="center">比赛名称:'+resp.competitionName+'</p><br>'+
					'<p align="center">比赛要求<br>'+resp.competitionRequest+'</p><br>'+
					'<p align="center">比赛奖励<br>'+resp.competitionReward+'</p>';
					/* for(i in msg)
					{
						num++;
						c.innerHTML += '<div class="img_text_list">'+
					  '<a href="showCompetition.html?'+msg[i].Competition_id+'"><img src="./官方新闻_全国财经类高校XXXX大赛_files/180628050020886.png" alt="关于'+msg[i].Competition_name+'的官方通知" title="关于'+msg[i].Competition_name+'的官方通知"></a>'+
					  '<span>[官方新闻]</span><strong><a href="showCompetition.html?'+msg[i].Competition_id+'">'+msg[i].Competition_name+'</a></strong>'+
					  '<p>“'+msg[i].Competition_name+'”比赛由'+msg[i].Competition_sponsor+'主办...<a href="showCompetition.html?'+msg[i].Competition_id+'">[详细]</a></p>'+
					  '</div>';
						//message = message+msg[0].Message_text.split("\n")[i]+"<br>";
						//alert(msg[i].Message_introduction);
						//var div = document.createElement('div');
					}
					//msg[0].Message_text.replace("/\n/g","<br>");
					//alert(msg[0].Message_text);
					p.innerHTML += '<div id="page"><span class="pageinfo">共<strong>1</strong>页<strong>'+num+'</strong>条记录</span><a href="#" class="homepage">首页</a><a href="#" class="nopage">上页</a><a href="#" class="listpage curpage">1</a><a href="#" class="nopage">下页</a><a href="#" class="endpage">尾页</a></div>';
					//var t = document.getElementById('title'); */
					//t.innerHTML += ''+msg[0].Message_introduction+'';
					//$("#task-info").modal("open");				
    		 	},
    		 	"error":function()
				{
					layer.msg("操作失败，请重试~",{time: 1000, icon:0});
				}
		});
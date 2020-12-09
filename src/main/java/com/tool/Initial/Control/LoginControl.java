package com.tool.Initial.Control;

import java.util.List;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.tool.Interceptor.AuthInterceptor;
import com.tool.Model.Administrator;
import com.tool.Model.Participant;
import com.tool.Service.AdministratorService;
import com.tool.Service.CompetitionService;
import com.tool.Service.ParticipantService;
import com.tool.Utils.RecordToJsonArrUtils;


public class LoginControl extends Controller{

	static AdministratorService administratorService = new AdministratorService();
	static ParticipantService participantService = new ParticipantService();
	static CompetitionService competitionService = new CompetitionService();
	
	public void index() {
		  render("财经院校比赛管理系统主页.html");
		}
	
	@Before(AuthInterceptor.class)
	public void LoginCheck() {
		renderJson("flag", 1);
	}
	
	//修改的功能，显示所有的比赛信息
	public void showAllCompetition() {
		List<Record> arr = competitionService.findallCOmpetition();
		renderJson(RecordToJsonArrUtils.RecordToJsonArr(arr));
	}
	
	//修改的功能，显示某一个比赛的全部信息
	public void showCompetitionDetail() {
		int c_id = Integer.parseInt(getPara("competition_id"));
		renderJson(competitionService.findById(c_id));
	}
	
	public void login(Integer type,String record,String password) {
	    type=Integer.parseInt(getPara(0));  //账户类型  1.管理员  2.参赛者
		record = getPara(1);     //账号
		password = getPara(2);   //账号密码

		int flag = 0;            //0,密码错误登陆失败/1,成功/2,不存在该用户
		int level = 0;           //0,参赛者/1-校级管理员/2-评委/3-最高管理员
		int id = 0;              //管理员id或者参赛者账号id
		
		switch(type){
		case 1:
			Administrator a = administratorService.findByAccount(record);
			if(a == null)
			{
				flag = 2;
			}
			else if(a.getAdministratorPassword().equals(password))
			{
				flag = 1;
				id = a.getAdministratorId();
				level = a.getAdministratorType();
			}
			break;
		case 2:
			Participant p = participantService.findByAccount(record);
			if(p == null)
			{
				flag = 2;
			}
			else if(p.getParticipantPassword().equals(password))
			{
				flag = 1;
				id = p.getParticipantId();
			}
			break;
		}
		
		if(flag == 1)   //存储session	
		{			
			  setSessionAttr("user",record);
			  setSessionAttr("type",type);
			  setSessionAttr("level",level);
		}
		System.out.println(getSessionAttr("user"));
		Record arr = new Record();
		arr.set("flag",flag);
		arr.set("user",id);
		arr.set("level", level);
				
		renderJson(RecordToJsonArrUtils.RecordToJson(arr));
	}
	
	public void outLogin() {   //退出登陆，清空当前session
		removeSessionAttr("type");
		removeSessionAttr("user");
		removeSessionAttr("level");
	}
	
}

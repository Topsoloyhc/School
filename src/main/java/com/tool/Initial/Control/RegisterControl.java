package com.tool.Initial.Control;

import java.util.List;

import com.jfinal.core.Controller;
import com.tool.Model.Participant;
import com.tool.Service.ParticipantService;

public class RegisterControl extends Controller{
	
	static ParticipantService participantService = new ParticipantService();

	public void index() {
		render("/reg/reg.html");
	}
	
	public void register() {
		if(getModel(Participant.class).save())
		{
			renderJson("flag",1);  //注册成功
		}
		else
		{
			renderJson("flag",0);  //注册失败
		}
		
	}
	
	public void judge(String account) {    //考虑用身份证号作为登陆账号？？？
		account = getPara(0);
		int flag = 0;
		List<Participant> pList = participantService.findall();
		
		for(Participant p:pList)
		{
			if(p.getParticipantAccount().equals(account))
				flag = 1;
		}
		renderJson("flag",flag);   //返回flag，存在相同账号为1，不能注册；否则为0
	}
	
}

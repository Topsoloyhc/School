package com.tool.Participant.Control;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.tool.Model.Participant;
import com.tool.Model.Team;
import com.tool.Service.AdministratorService;
import com.tool.Service.AdviserService;
import com.tool.Service.ParticipantService;
import com.tool.Service.ProjectService;
import com.tool.Service.Project_FileService;
import com.tool.Service.TeamService;
import com.tool.Service.Team_MemberService;

public class ApplyControl extends Controller{
	
	static AdministratorService administratorService = new AdministratorService();
	static ParticipantService participantService = new ParticipantService();
	static ProjectService projectService = new ProjectService();
	static Project_FileService project_FileService = new Project_FileService();
	static TeamService teamService = new TeamService();
	static Team_MemberService team_MemberService = new Team_MemberService();
	static AdviserService adviserService = new AdviserService();
	
	//报名，创建项目
	public void index() throws ParseException {
		int paticipant_id = getParaToInt("p_id");  //账号id
		int competition_id = getParaToInt("c_id"); //比赛id
		List<Team> tm_list = teamService.findByParticiantID(paticipant_id);
		if(tm_list.size()!=0)
		{
			renderJson("flag",0);
		}
		else {
			Participant participant = participantService.findById(paticipant_id);
			
			Record t = new Record();     //创建的团队
			Record t_m = new Record();   //成员列表
			Record p = new Record();     //创建的项目
			Record p_f = new Record();   //项目文件（以后将用ArrayList保证多个文件上传）
			Record a = new Record();     //指导老师列表
			
			Date date = new Date();//获得系统时间.
	        SimpleDateFormat sdf =   new SimpleDateFormat( " yyyy-MM-dd HH:mm:ss " );
	        String nowTime = sdf.format(date);
	        Date time = sdf.parse( nowTime );
			
	        int length = 0; //记录数量
	        
	        /**-----创建团队------*/
			t.set("Participant_id", paticipant_id);
			t.set("Team_name", "");
			t.set("Team_setTime", time);
			Db.save("team", t);
			//最新创建的团队id
			int Team_id = teamService.findall().get(teamService.findall().size()-1).getTeamId();
		
			/**-----创建指导老师---*/
			//开始的Adviser_id 
			int id1 = 0;
			if(adviserService.findall().size()>0)
			{
				id1 = adviserService.findall().get(adviserService.findall().size()-1).getAdviserId();
			}
			length = getPara("a_name").split(",").length;   //指导老师数量
			for(int i = 0;i<length;i++)
			{
				a.clear();
				a.set("Adviser_name", getPara("a_name").split(",")[i]);
				a.set("Adviser_school", getPara("a_school").split(",")[i]);
				a.set("Adviser_academy",getPara("a_academy").split(",")[i]);
				a.set("Adviser_rank", Integer.parseInt(getPara("a_rank").split(",")[i]));//职称
				Db.save("adviser", a);
			}
			//结束的Adviser_id
			int id2 = adviserService.findall().get(adviserService.findall().size()-1).getAdviserId();
			
			/*length = getPara("m_name").split(",").length;   //团队成员数量
			int m_type = 0;
			String school = "";
			for(int j = 0;j<length;j++)
			{
				m_type = Integer.parseInt(getPara("m_type").split(",")[j]);
				if(m_type == 1)
					school = getPara("m_school").split(",")[j];
			}*/
			
			/**-----创建项目------*/
			String school = getPara("m_school");
			p.set("Team_id", Team_id);
			p.set("Competition_id", competition_id);
			p.set("Project_host", participant.getParticipantName());
			p.set("Project_school", school);      //该项目是属于哪一个学校的
			p.set("Project_setTime", time);
			p.set("Project_level", 1);
			p.set("Project_type", getParaToInt("p_type"));         //项目类别
			p.set("Project_status1", 1);
			p.set("Project_status2", 1);
			p.set("Project_status3", 1);
			p.set("Adviser_1", id1+1);
			if(id1+1 == id2)
			{
				p.set("Adviser_2", null);
			}else
				p.set("Adviser_2", id2);	
			p.set("Project_name",getPara("p_name"));
			p.set("Project_introduction", getPara("p_i"));
			p.set("Project_logo",getPara("logo_name"));
	        Db.save("project", p);
	        //新创建的Project_id
	        int Project_id = projectService.findall().get(projectService.findall().size()-1).getProjectId();
	    	
			/**-----创建文件------*/
			p_f.set("Project_id", Project_id);
			p_f.set("File_name",  getPara("pf_name"));   //项目文件的网盘链接
			p_f.set("File_code",getPara("pf_code"));     //网盘密码
			Db.save("project_file", p_f);
			
			/**-----创建团队成员----*/
			//length = getPara("m_name").split(",").length;   //团队成员数量
			//for(int j = 0;j<length;j++)
			//{
				t_m.clear();
				t_m.set("Team_id", Team_id);
				t_m.set("Member_type", 1);
				t_m.set("Member_name", getPara("m_name"));
				t_m.set("Member_professional", getPara("m_professional"));
				t_m.set("Member_school", getPara("m_school"));
				t_m.set("Member_IDNumber", getPara("m_IDNumber"));
				t_m.set("Member_tel", getPara("m_tel"));
				t_m.set("Member_mail", getPara("m_mail"));
				t_m.set("Member_enrolTime", getPara("m_enrolTime"));
				Db.save("team_member", t_m);
			//}
			renderJson("flag",1);
		}
	}

	//判断是否可以创建项目（一个用户只能创建一个项目）
	public void check(int p_id) {
		int paticipant_id = getParaToInt("p_id");  //账号id
		List<Team> tm_list = teamService.findByParticiantID(paticipant_id);

		System.out.println(tm_list.size());
		
		if(tm_list.size()!=0)

		{
			renderJson("flag",0);
		}
		else {
			renderJson("flag",1);
		}
	}
	
	//上传Logo
	public void upLoadLogo() {
		getFile();
		renderText("upload Logo...");
	 }
	
	//上传文件
	public void upLoadFile() {
		getFile();
		renderText("upload File...");
	}
	
}

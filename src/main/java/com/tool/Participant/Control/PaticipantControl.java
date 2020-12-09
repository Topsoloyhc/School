package com.tool.Participant.Control;

import java.util.List;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.tool.Model.Adviser;
import com.tool.Model.Invite;
import com.tool.Model.Participant;
import com.tool.Model.Project;
import com.tool.Model.ProjectFile;
import com.tool.Model.Team;
import com.tool.Model.TeamMember;
import com.tool.Service.AdviserService;
import com.tool.Service.CompetitionService;
import com.tool.Service.InviteService;
import com.tool.Service.ParticipantService;
import com.tool.Service.ProjectService;
import com.tool.Service.Project_FileService;
import com.tool.Service.TeamService;
import com.tool.Service.Team_MemberService;
import com.tool.Utils.RecordToJsonArrUtils;

public class PaticipantControl extends Controller{
	
	static ParticipantService participantService = new ParticipantService();
	static Project_FileService project_FileService = new Project_FileService();
	static ProjectService projectService = new ProjectService();
	static Team_MemberService team_MemberService = new Team_MemberService();
	static AdviserService adviserService = new AdviserService();
	static TeamService teamService = new TeamService();
	static InviteService inviteService = new InviteService();
	static CompetitionService competitionService = new CompetitionService();
	
	//显示个人的主页面
	public void index(String account) {
		account = getPara(0);   //获取参赛者账号
		System.out.println("======"+account);
		Participant p = participantService.findByAccount(account);
		List<Record> arr1 = participantService.findPaticipantOfProject(p.getParticipantId());
		if(arr1.isEmpty())
		{
			renderJson(participantService.findByAccount(account));
		}
		else
		{
			renderJson(RecordToJsonArrUtils.RecordToJsonArr(arr1));
		}
		
	}
	
	//修改账户密码
	public void forgetCode() {
		String account = getPara("account");
		String oldCode = getPara("oldCode");
		String newCode = getPara("newCode");
		Participant p = participantService.findByAccount(account);
		if(p == null) 
		{
			renderJson("flag",0);
		}
		else if(p.getParticipantPassword().equals(oldCode))
		{
			p.setParticipantPassword(newCode);
			p.update();
			renderJson("flag",1);
		}
		else{
			renderJson("flag",2);
		}
	}
	
	//忘记账户密码
	public void ModifyCode() {
		String account = getPara("account");
		String idNum = getPara("idNum");
		String newCode = getPara("newCode");
		Participant p = participantService.findByAccount(account);
		if(p == null) 
		{
			renderJson("flag",0);
		}
		else if(p.getParticipantIdnumber().equals(idNum))
		{
			p.setParticipantPassword(newCode);
			p.update();
			renderJson("flag",1);
		}
		else{
			renderJson("flag",2);
		}
	}

	//删除项目
	public void delectProjet(int p_id) {
		/**先删除project_file表中信息
		 * 指导老师表中信息是否要删除？？？
		 * Team和Team Member删除*/
		p_id = Integer.parseInt(getPara("p_id"));
		Project project = projectService.findById(p_id);
		Team team = teamService.findById(project.getTeamId());
		project_FileService.deleteByParticipantId(p_id);  //删除project_file表中信息
		projectService.deleteById(p_id);              //删除project表中信息
		team_MemberService.delectByTeamID(team.getTeamId());  //删除Team_member中的信息
		teamService.deleteById(project.getTeamId());   //删除Team表中信息
		renderJson("flag",1);
	}

	//修改当前用户信息
	public void updateParticipant() {
		int p_id = Integer.parseInt(getPara("p_id"));    //当前用户id
		Participant p = participantService.findById(p_id);
		if(p!=null)
		{
			p.setParticipantIdnumber(getPara("idNum"));
			p.setParticipantName(getPara("name"));
			p.setParticipantSex(getPara("sex"));
			p.setParticipantSchool(getPara("school"));
			p.setParticipantPhone(getPara("phone"));
			p.setParticipantMail(getPara("mail"));
			p.setParticipantAddress(getPara("address"));
			p.update();
			renderJson("flag",1);
		}
		else
			renderJson("flag",0);
		
	}

	//修改项目简介
	public void updateProject(int p_id) {
		p_id = Integer.parseInt(getPara("p_id"));
		String p_introduction = getPara("p_introduction");
		Project p = projectService.findById(p_id);
		p.setProjectIntroduction(p_introduction);
		p.update();
		renderJson("flag",1);
	}
	
	//修改网盘链接
	public void updateLink(int pf_id) {
		pf_id = Integer.parseInt(getPara("pf_id"));
		String pf_link = getPara("pf_link");
		String pf_code = getPara("pf_code");
		ProjectFile pf = project_FileService.findById(pf_id);
		pf.setFileName(pf_link);
		pf.setFileCode(pf_code);
		pf.update();
		renderJson("flag",1);
	}
	
	//修改单个成员信息
	public void updateMember(int m_id) {
		m_id = Integer.parseInt(getPara("m_id"));
		TeamMember t_m = team_MemberService.findById(m_id);
		t_m.setMemberType(getParaToInt("m_type"));
		t_m.setMemberName(getPara("m_name"));
		t_m.setMemberProfessional(getPara("m_professional"));
		t_m.setMemberSchool(getPara("m_school"));
		t_m.setMemberIdnumber(getPara("m_IDNum"));
		t_m.setMemberTel(getPara("m_tel"));
		t_m.setMemberMail(getPara("m_mail"));
		t_m.setMemberEnroltime(getPara("m_enroltime"));
		t_m.update();
		renderJson("flag",1);
	}
	
	//修改单个指导老师信息
	public void updateAdviser(int a_id) {
		a_id = Integer.parseInt(getPara("a_id"));
		Adviser a = adviserService.findById(a_id);
		a.setAdviserName(getPara("a_name"));
		a.setAdviserSchool(getPara("a_school"));
		a.setAdviserAcademy(getPara("a_academy"));
		a.setAdviserRank(getParaToInt("a_rank"));
		a.update();
		renderJson("flag",1);
	}
	
	//修改项目名称
	public void updataProjectName(int p_id) {
		p_id = Integer.parseInt(getPara("p_id"));
		String p_name = getPara("p_name");
		Project p = projectService.findById(p_id);
		p.setProjectName(p_name);
		p.update();
		renderJson("flag",1);
	}
	
	//添加一个团队成员
	public void addMember() {
		TeamMember t_m = new TeamMember();
		t_m.setTeamId(Integer.parseInt(getPara("m_id")));  //team_id
		t_m.setMemberType(getParaToInt("m_type"));
		t_m.setMemberName(getPara("m_name"));
		t_m.setMemberProfessional(getPara("m_professional"));
		t_m.setMemberSchool(getPara("m_school"));
		t_m.setMemberIdnumber(getPara("m_IDNum"));
		t_m.setMemberTel(getPara("m_tel"));
		t_m.setMemberMail(getPara("m_mail"));
		t_m.setMemberEnroltime(getPara("m_enroltime"));
		t_m.save();
		renderJson("flag",1);
	}
	
	//修改的功能，依据账号名称搜索账户
	public void searchParticipant() {
		String account = getPara("account");   //获取参赛者账号
		System.out.println("======"+account);
		Participant p = participantService.findByAccount(account);
		if(p!=null){
			List<Record> arr1 = participantService.findPaticipantOfProject(p.getParticipantId());
			if(arr1.isEmpty())
			{
				renderJson(participantService.findByAccount(account));
			}
			else
			{
				renderJson(RecordToJsonArrUtils.RecordToJsonArr(arr1));
			}
		}
		else {
			renderJson("flag",1);
		}
		
	}
	
	//修改的功能，邀请一个队友，增加一条邀请记录
	public void inviteMember() {
		int u_id = Integer.parseInt(getPara("user_id")); //邀请人id
		int t_id = Integer.parseInt(getPara("team_id")); //队伍id
		int ued_id = Integer.parseInt(getPara("member_id_now")); //被邀请人id
		List<Invite> invite = inviteService.findByOtherId(u_id, ued_id, t_id);
		if(invite==null){
			Invite i = new Invite();
			i.setInviteUser(u_id);
			i.setInvitedUser(ued_id);
			i.setInviteTeam(t_id);
			i.save();
			renderJson("flag",1);
		}
		else if(invite.get(0).getInviteStatus()==0) {
			renderJson("flag",2);
		}
		else if(invite.get(0).getInviteStatus()==1) {
			renderJson("flag",3);
		}
		else if(invite.get(0).getInviteStatus()==2) {
			renderJson("flag",4);
		}
		
	}
	
	//修改的功能，邀请一个队友，被拒绝后重新发送邀请
	public void ReinviteMember() {
		int u_id = Integer.parseInt(getPara("user_id")); //邀请人id
		int t_id = Integer.parseInt(getPara("team_id")); //队伍id
		int ued_id = Integer.parseInt(getPara("member_id_now")); //被邀请人id
		List<Invite> invite = inviteService.findByOtherId(u_id, ued_id, t_id);
		invite.get(0).setInviteStatus(0);
		invite.get(0).update();
		renderJson("flag",1);	
	}
	
	//修改的功能，邀请一个队友，接受/拒绝邀请
	public void dealInvite() {
		int id = Integer.parseInt(getPara("invite_id")); //邀请信息的id	
		int deal = Integer.parseInt(getPara("deal"));  //处理的操作，1表示接受，2表示拒绝
		Invite i = inviteService.findById(id);
		i.setInviteStatus(deal);
		i.update();
		if(deal == 1) {
			int p_id = i.getInvitedUser(); //要添加至team_member中的用户id
			Participant p = participantService.findById(p_id);  //被邀请用户
			TeamMember t_m = new TeamMember();  //创建新的团队成员
			t_m.setTeamId(i.getInviteTeam());  //队伍id
			t_m.setMemberType(2);            //被邀请的人只能是团队成员
			t_m.setMemberName(p.getParticipantName());
			t_m.setMemberIdnumber(p.getParticipantIdnumber());
			t_m.setMemberSchool(p.getParticipantSchool());
			t_m.setMemberMail(p.getParticipantMail());
			t_m.setMemberTel(p.getParticipantPhone());
			//t_m.setMemberEnroltime(getPara("m_enrolTime"));//入学时间
			//t_m.setMemberProfessional(getPara("m_professional"));//所在专业
			t_m.save();
			renderJson("flag",1);
		}
		else {
			renderJson("flag",2);
		}
		
	}
	
	//修改的功能，删除邀请信息
	public void deleteInvite() {
		int i_id = Integer.parseInt(getPara("i_id"));
		Invite i = inviteService.findById(i_id);
		if(i.delete())
		{
			renderJson("flag",1);
		}
		else {
			renderJson("flag",0);
		}
		
	}
	
	//修改的功能，显示全部的邀请信息
	public void showInvite() {
		int u_id = Integer.parseInt(getPara("user_id"));
		List<Record> arr = inviteService.findInviteOfUser(u_id);
		renderJson(RecordToJsonArrUtils.RecordToJsonArr(arr));
	}
	
	//修改的功能，显示全部的被邀请信息
	public void showInvited() {
		int ued_id = Integer.parseInt(getPara("usered_id"));
		List<Record> arr = inviteService.findInvitedOfUser(ued_id);
		renderJson(RecordToJsonArrUtils.RecordToJsonArr(arr));				
	}
	
	
	//删除团队成员
	public void deleteMember(int m_id) {
		m_id = Integer.parseInt(getPara("m_id"));
		TeamMember t_m = team_MemberService.findById(m_id);
		if(t_m.getMemberType()==1)
		{
			renderJson("flag",0);
		}
		else
		{
			team_MemberService.deleteById(m_id);
			renderJson("flag",1);
		}
		
	}
	
	//添加指导老师
	public void addAdviser() {
		Adviser a = new Adviser();
		a.setAdviserName(getPara("a_name"));
		a.setAdviserSchool(getPara("a_school"));
		a.setAdviserAcademy(getPara("a_academy"));
		a.setAdviserRank(getParaToInt("a_rank"));
		int p_id = Integer.parseInt(getPara("p_id"));
		Project p = projectService.findById(p_id);
		if(p.getAdviser1()!=null&&p.getAdviser2()!=null) {
			renderJson("flag",0);
		}
		else if(p.getAdviser1()==null)
		{
			a.save();
			p.setAdviser1(adviserService.findall().get(adviserService.findall().size()-1).getAdviserId());
			p.update();
			renderJson("flag",1);
		}
		else if(p.getAdviser2()==null)
		{
			a.save();
			p.setAdviser2(adviserService.findall().get(adviserService.findall().size()-1).getAdviserId());
			p.update();
			renderJson("flag",2);
		}
		
	}
	
	//删除指导老师
	public void deleteAdviser() {
		int p_id = Integer.parseInt(getPara("p_id"));  //项目id
		Project p = projectService.findById(p_id);
		int a_id = Integer.parseInt(getPara("a_id"));  //指导老师id
		if(p.getAdviser1()!=null&&p.getAdviser1() == a_id)
		{
			p.setAdviser1(null);
			adviserService.deleteById(a_id);
			p.update();
			renderJson("flag",1);
		}
		else if(p.getAdviser2()!=null&&p.getAdviser2() == a_id)
		{
			p.setAdviser2(null);
			adviserService.deleteById(a_id);
			p.update();
			renderJson("flag",2);
		}
		else
		{
			renderJson("flag",0);
		}
		
	}
	

}

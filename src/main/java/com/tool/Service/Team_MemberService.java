package com.tool.Service;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.tool.Model.TeamMember;

public class Team_MemberService {

	private static final TeamMember dao = new TeamMember().dao();
	
	//分页
	public Page<TeamMember> paginate(int pageNumber, int pageSize) {
		return dao.paginate(pageNumber, pageSize, "select *", "from team_member order by id asc");   
	}
		
	public TeamMember findById(int id) {
		return dao.findById(id);
	}
		
	public void deleteById(int id) {
		dao.deleteById(id);		
	}
	
	public List<TeamMember> findall(){
	    return dao.find("select * from team_member");		
	}
	
	public void delectByTeamID(int t_id) {
		Db.delete("DELETE FROM team_member WHERE team_member.Team_id = "+t_id);
	}
}

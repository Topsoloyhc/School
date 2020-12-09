package com.tool.Service;

import java.util.List;

import com.jfinal.plugin.activerecord.Page;
import com.tool.Model.Team;

public class TeamService {


	private static final Team dao = new Team().dao();
	
	//分页
	public Page<Team> paginate(int pageNumber, int pageSize) {
		return dao.paginate(pageNumber, pageSize, "select *", "from team order by id asc");   
	}
		
	public Team findById(int id) {
		return dao.findById(id);
	}
		
	public void deleteById(int id) {
		dao.deleteById(id);		
	}
	
	public List<Team> findall(){
	    return dao.find("select * from team");	
	}
	
	public List<Team> findByParticiantID(int p_id) {
		return dao.find("SELECT * FROM team WHERE team.Participant_id = "+p_id);
	}
	
}

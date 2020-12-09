package com.tool.Service;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.tool.Model.Project;

public class ProjectService {

	private static final Project dao = new Project().dao();
	
	//分页
	public Page<Project> paginate(int pageNumber, int pageSize) {
		return dao.paginate(pageNumber, pageSize, "select *", "from project order by id asc");   
	}
		
	public Project findById(int id) {
		return dao.findById(id);
	}
		
	public void deleteById(int id) {
		dao.deleteById(id);		
	}
	
	public List<Project> findall(){
	    return dao.find("select * from project");	
	}
	
	public void update(int p_id) {
		Record p = 	Db.findById("project","Project_id",p_id).set("Project_status1", 2).set("Project_level", 2);
		Db.update("project","Project_id",p);
	}
	
	public void fianlUpdate(int p_id) {
		Record p = 	Db.findById("project","Project_id",p_id).set("Project_status2", 2).set("Project_level", 3);
		Db.update("project","Project_id",p);
	}
	
	//找到某个项目是否有相对应的评委打分
	public Project findByJudge(int p_id,int a_id) {
		return dao.findFirst("SELECT * FROM project WHERE Project_id = "+p_id+" AND (Judges_1 = "+a_id+" OR Judges_2 = "+a_id+" OR Judges_3 = "+a_id+" OR Judges_4 = "+a_id+" OR Judges_5 = "+a_id+")");
		
	}
	
}

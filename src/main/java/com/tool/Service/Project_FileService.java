package com.tool.Service;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.tool.Model.ProjectFile;

public class Project_FileService {
	
	private static final ProjectFile dao = new ProjectFile().dao();
	
	//分页
	public Page<ProjectFile> paginate(int pageNumber, int pageSize) {
		return dao.paginate(pageNumber, pageSize, "select *", "from project_file order by id asc");   
	}
		
	public ProjectFile findById(int id) {
		return dao.findById(id);
	}
		
	public void deleteById(int id) {
		dao.deleteById(id);		
	}
	
	public void deleteByParticipantId(int id) {
		Db.delete("DELETE FROM project_file WHERE project_file.Project_id = "+id);
	}
	
	public List<ProjectFile> findall(){
	    return dao.find("select * from project_file");		
	}

}

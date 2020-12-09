package com.tool.Service;

import java.util.List;

import com.jfinal.plugin.activerecord.Page;
import com.tool.Model.Adviser;

public class AdviserService {
	
	private static final Adviser dao = new Adviser().dao();
	
	//分页
	public Page<Adviser> paginate(int pageNumber, int pageSize) {
		return dao.paginate(pageNumber, pageSize, "select *", "from adviser order by id asc");   
	}
		
	public Adviser findById(int id) {
		return dao.findById(id);
	}
		
	public void deleteById(int id) {
		dao.deleteById(id);		
	}
	
	public List<Adviser> findall(){
	    return dao.find("select * from adviser");		
	}

}

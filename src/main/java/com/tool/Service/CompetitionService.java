package com.tool.Service;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.tool.Model.Competition;

public class CompetitionService {
	
	private static final Competition dao = new Competition().dao();
	
	//分页
	public Page<Competition> paginate(int pageNumber, int pageSize) {
		return dao.paginate(pageNumber, pageSize, "select *", "from competition order by id asc");   
	}
		
	public Competition findById(int id) {
		return dao.findById(id);
	}
		
	public void deleteById(int id) {
		dao.deleteById(id);		
	}
	
	public List<Record> findallCOmpetition(){
		List<Record> arr = Db.find((Db.getSqlPara("tool.findAllCompetition")));		
		return arr;
	}

}

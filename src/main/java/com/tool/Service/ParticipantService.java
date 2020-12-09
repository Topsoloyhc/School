package com.tool.Service;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.tool.Model.Participant;

public class ParticipantService {
	
	
	private static final Participant dao = new Participant().dao();
	
	//分页
	public Page<Participant> paginate(int pageNumber, int pageSize) {
		return dao.paginate(pageNumber, pageSize, "select *", "from participant order by id asc");   
	}
	
	public Participant findByAccount(String account) {
		return dao.findFirst("SELECT *  FROM participant WHERE participant.Participant_account ="+"\'"+account+"\'");
	}
	
	//找到一个参赛账号所负责的全部项目信息
	public List<Record> findPaticipantOfProject(int p_id) {
		return Db.find((Db.getSqlPara("tool.findPaticipantOfProject",p_id)));
	}
	
	public Participant findById(int id) {
		return dao.findFirst("SELECT *  FROM participant WHERE participant.Participant_id ="+id);
	}
		
	public void deleteById(int id) {
		dao.deleteById(id);		
	}
	
	public List<Participant> findall(){
	    return dao.find("select * from participant");		
	}

}

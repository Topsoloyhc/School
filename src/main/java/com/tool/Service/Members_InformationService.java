package com.tool.Service;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.tool.Model.MembersInformation;

public class Members_InformationService {
	
	private static final MembersInformation dao = new MembersInformation().dao();
	
	public MembersInformation findById(int id) {
		return dao.findById(id);
	}
		
	public void deleteById(int id) {
		dao.deleteById(id);		
	}
	
	public List<MembersInformation> findall(){
		return dao.find("select * from members_information");	
	}

	public List<Record> getAllReturnReceipt(int id) {
		List<Record> arr= Db.find((Db.getSqlPara("tool.getAllReturnReceipt",id)));
		return arr;
	}
	
}

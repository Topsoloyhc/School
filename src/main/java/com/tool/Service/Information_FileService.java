package com.tool.Service;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.tool.Model.InformationFile;

public class Information_FileService {
	
	private static final InformationFile dao = new InformationFile().dao();

	
	public InformationFile findById(int id) {
		return dao.findById(id);
	}
		
	public void deleteById(int id) {
		dao.deleteById(id);		
	}
	
	public List<Record> findall(){
	    return Db.find("SELECT * FROM information_file");	
	}
}

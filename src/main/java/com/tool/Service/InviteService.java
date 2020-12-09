package com.tool.Service;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.tool.Model.Invite;

public class InviteService {
	
	private static final Invite dao = new Invite().dao();
	
	//分页
	public Page<Invite> paginate(int pageNumber, int pageSize) {
		return dao.paginate(pageNumber, pageSize, "select *", "from invite order by id asc");   
	}
		
	public Invite findById(int id) {
		return dao.findById(id);
	}
		
	public void deleteById(int id) {
		dao.deleteById(id);		
	}
	
	public List<Invite> findall(){
	    return dao.find("select * from invite");		
	}
	
	public List<Invite> findByOtherId(int u_id,int ued_id,int team_id){
	    return dao.find("select * from invite where Invite_user = "+u_id+" and Invited_user = "+ued_id+" and Invite_team = "+team_id);		
	}
	
	//找到一个账号的全部邀请信息
	public List<Record> findInviteOfUser(int u_id) {
		return Db.find((Db.getSqlPara("tool.findInviteOfUser",u_id)));
	}
	
	//找到一个账号的全部被邀请信息
	public List<Record> findInvitedOfUser(int ued_id) {
		return Db.find((Db.getSqlPara("tool.findInvitedOfUser",ued_id)));
	}
}


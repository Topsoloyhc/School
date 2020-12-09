package com.tool.Service;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.tool.Model.Administrator;

public class AdministratorService {
	
	private static final Administrator dao = new Administrator().dao();
	
	//分页
	public Page<Administrator> paginate(int pageNumber, int pageSize) {
		return dao.paginate(pageNumber, pageSize, "select *", "from administrator order by id asc");   
	}
	
	public Administrator findByAccount(String account) {
		return dao.findFirst("SELECT *  FROM administrator WHERE  Administrator_account ="+"\'"+account+"\'");
	}
	
	//找到校级管理员所负责的全部项目 
	public List<Record> findAdminOfProject (int c_id,String school) {
		List<Record> arr= Db.find((Db.getSqlPara("tool.findAdminOfProject",c_id,school)));
		return arr;
	}
	
	//找到校级管理员所负责的全部项目   ----根据比赛类别和项目状态1同时筛选
	public List<Record> findAdminOfProjectSort (int c_id,String school,int sort1,int sort2) {
		List<Record> arr= Db.find((Db.getSqlPara("tool.findAdminOfProjectSort",c_id,school,sort1,sort2)));
		return arr;
	}
	
	//找到校级管理员所负责的全部项目   ----根据比赛类别筛选
	public List<Record> findAdminOfProjectSortByCompetion (int c_id,String school,int sort_style) {
		List<Record> arr= Db.find((Db.getSqlPara("tool.findAdminOfProjectSortByCompetion",c_id,school,sort_style)));
		return arr;
	}
	
	//找到校级管理员所负责的全部项目   ----根据项目状态1筛选
	public List<Record> findAdminOfProjectSortByProjectStatus1 (int c_id,String school,int sort_style) {
		List<Record> arr= Db.find((Db.getSqlPara("tool.findAdminOfProjectSortByProjectStatus1",c_id,school,sort_style)));
		return arr;
	}
	
	//找到某类型比赛通过校赛的全部项目 
	public List<Record> findAllProjectOfCompetion(int c_id) {
		List<Record> arr= Db.find((Db.getSqlPara("tool.findAllProjectOfCompetion",c_id)));
		return arr;
	}
	
	//找到某类型比赛通过校赛的全部项目 ----根据比赛类别和项目状态2同时筛选
	public List<Record> findAllProjectOfCompetionSort(int c_id,int sort1,int sort2) {
		List<Record> arr= Db.find((Db.getSqlPara("tool.findAllProjectOfCompetionSort",c_id,sort1,sort2)));
		return arr;
	}
	
	//找到某类型比赛通过校赛的全部项目 ----根据比赛类别筛选
	public List<Record> findAllProjectOfCompetionSortByCompetion(int c_id,int sort_style) {
		List<Record> arr= Db.find((Db.getSqlPara("tool.findAllProjectOfCompetionSortByCompetion",c_id,sort_style)));
		return arr;
	}
	
	//找到某类型比赛通过校赛的全部项目 ----根据项目状态2筛选
	public List<Record> findAllProjectOfCompetionSortByProjectStatus2(int c_id,int sort_style) {
		List<Record> arr= Db.find((Db.getSqlPara("tool.findAllProjectOfCompetionSortByProjectStatus2",c_id,sort_style)));
		return arr;
	}
	
	//找到一个项目的信息
	public List<Record> findProjectOfTeam(int p_id) {
		return Db.find((Db.getSqlPara("tool.findProjectOfTeam",p_id)));
	}
	
	//找到一个项目相对应的指导老师
	public List<Record> findProjectOfAdviser(int a_id) {
		return Db.find((Db.getSqlPara("tool.findAdviserById",a_id)));
	}
	 //找到一个比赛累计参赛项目、累计参赛学生人数的数量
	public int findNumOfProject(int c_id,int type) {
		int num = 0;
		
		switch(type) {
		case 1://累计参赛学生人数
			//System.out.println(Db.find(Db.getSqlPara("findNumOfProjectOfMember", c_id)).get(0).toString());
			num = dao.find("SELECT * FROM project WHERE project.Competition_id ="+c_id).size();
			break;
		case 2://累计参赛项目
			num = dao.find("SELECT * FROM project LEFT OUTER JOIN team_member ON project.Team_id = team_member.Team_id WHERE project.Competition_id = "+c_id).size();
			break;
		}
		return num;
	}
		
	public Administrator findById(int id) {
		return dao.findById(id);
	}
		
	public void deleteById(int id) {
		dao.deleteById(id);		
	}
	
	public List<Administrator> findall(){
	    return dao.find("select * from administrator");		
	}
	
	public void update(int a_id) {
		Record a = 	Db.findById("administrator","Administrator_id",a_id).set("Administrator_password", 123456);
		Db.update("administrator","Administrator_id",a);
	}
	
    /* author:zhouwei
     * function：返回各校宣传资料
     * */
	
    public List<Administrator> pressBook() {
    	return dao.find("select * from administrator where Administrator_type=1");
    }
}

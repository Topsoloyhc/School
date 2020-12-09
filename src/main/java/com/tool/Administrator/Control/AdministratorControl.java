package com.tool.Administrator.Control;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Clear;
import com.jfinal.core.Controller;
import com.jfinal.kit.PathKit;
import com.jfinal.plugin.activerecord.Record;
import com.tool.Model.Administrator;
import com.tool.Model.InformationFile;
import com.tool.Model.Project;
import com.tool.Model.ProjectFile;
import com.tool.Service.AdministratorService;
import com.tool.Service.Information_FileService;
import com.tool.Service.ProjectService;
import com.tool.Service.Project_FileService;
import com.tool.Utils.RecordToJsonArrUtils;


public class AdministratorControl extends Controller{
	
	static AdministratorService administratorService = new AdministratorService();
	static ProjectService projectService = new ProjectService();
	static Project_FileService project_fileService = new Project_FileService();
	static Information_FileService information_FileService = new Information_FileService();
	
	//显示管理员信息
	public void findAdministrator(int a_id) {
		a_id = Integer.parseInt(getPara("a_id"));   //获取管理员的id
		Administrator a = administratorService.findById(a_id);
		renderJson(a);
	}
	
	//显示校级管理员负责的全部项目信息
	public void index() {
		int a_id = Integer.parseInt(getPara("a_id"));   //获取管理员的id
		int c_id = Integer.parseInt(getPara("c_id"));   //获取比赛类型id
		//获取筛选的方式    0-不筛选/1-比赛类别-主赛道/2-比赛类别-振兴赛道/3-项目状态-待审核/4-项目状态-审核通过/
		//5-比赛类别-主赛道-项目状态-待审核/6-比赛类别-主赛道-项目状态-审核通过/7-比赛类别-振兴赛道-项目状态-待审核/8-比赛类别-振兴赛道-项目状态-审核通过
		int sort1 = Integer.parseInt(getPara("sort1"));   //获取筛选的方式    0-不筛选/1-比赛类别-主赛道/2-比赛类别-振兴赛道
		int sort2 = Integer.parseInt(getPara("sort2"));  //获取排序方式   0-不筛选/ 1-项目状态-待审核/2-项目状态-审核通过
		
		Administrator a = administratorService.findById(a_id);
		
		String aoData = getPara("aoData");
		
		JSONArray jsonarray = JSONArray.parseArray(aoData);
		String sEcho = null;
	    int iDisplayStart = 0; // 起始索引
	    int iDisplayLength = 0; // 每页显示的行数
	 
	    for (int i = 0; i < jsonarray.size(); i++) {
	        JSONObject obj = (JSONObject) jsonarray.get(i);
	        if (obj.get("name").equals("sEcho"))
	            sEcho = obj.get("value").toString();
	 
	        if (obj.get("name").equals("iDisplayStart"))
	            iDisplayStart = obj.getInteger("value");
	 
	        if (obj.get("name").equals("iDisplayLength"))
	            iDisplayLength = obj.getInteger("value");
	    }
	    
	    List<Record> arr = new ArrayList<Record>();
	    switch(sort1) {
	    case 0:
	    	switch(sort2) {
	    	case 0://0-0  均不筛选
	    		arr = administratorService.findAdminOfProject(c_id,a.getAdministratorSchool());
	    		break;
	    	case 1://0-1 项目状态-待审核
	    		arr = administratorService.findAdminOfProjectSortByProjectStatus1(c_id,a.getAdministratorSchool(),sort2);
	    		break;
	    	case 2://0-2 项目状态-审核通过
	    		arr = administratorService.findAdminOfProjectSortByProjectStatus1(c_id,a.getAdministratorSchool(),sort2);
	    		break;
	    	}
	    	break;
	    case 1:
	    	switch(sort2) {
	    	case 0://1-0  比赛类别-主赛道
		    	arr = administratorService.findAdminOfProjectSortByCompetion( c_id,a.getAdministratorSchool(),1);
	    		break;
	    	case 1://1-1 比赛类别-主赛道-项目状态-待审核
	    		arr = administratorService.findAdminOfProjectSort( c_id,a.getAdministratorSchool(),1,1);
	    		break;
	    	case 2://1-2 比赛类别-主赛道-项目状态-审核通过
	    		arr = administratorService.findAdminOfProjectSort(c_id,a.getAdministratorSchool(),1,2);
	    		break;
	    	}
	    	break;
	    case 2:
	    	switch(sort2) {
	    	case 0://2-0  比赛类别-振兴赛道
		    	arr = administratorService.findAdminOfProjectSortByCompetion(c_id,a.getAdministratorSchool(),2);
	    		break;
	    	case 1://2-1 比赛类别-振兴赛道-项目状态-待审核
	    		arr = administratorService.findAdminOfProjectSort(c_id,a.getAdministratorSchool(),2,1);
	    		break;
	    	case 2://2-2 比赛类别-振兴赛道-项目状态-审核通过
	    		arr = administratorService.findAdminOfProjectSort(c_id,a.getAdministratorSchool(),2,2);
	    		break;
	    	}
	    	break;
	    }
	    
	    //"sEcho"、"iTotalRecords"、"iTotalDisplayRecords"、"data"需在同一层级上
	    JSONObject getObj = new JSONObject();
	    getObj.put("sEcho", sEcho);// DataTable用于渲染的信息
	    getObj.put("iTotalRecords", arr.size());//全部数据的行数
	    getObj.put("iTotalDisplayRecords", arr.size());//显示的行数  
	    if(iDisplayStart+iDisplayLength<arr.size())
	    {
	    	getObj.put("data", RecordToJsonArrUtils.RecordToJsonArr(arr.subList(iDisplayStart, iDisplayStart+iDisplayLength)));//要以JSON格式返回
	    }
	    else
	    {
	    	getObj.put("data", RecordToJsonArrUtils.RecordToJsonArr(arr.subList(iDisplayStart, arr.size())));//要以JSON格式返回
	    }
	    renderJson(getObj);

	}
	
	//显示某比赛的通过校赛的项目信息
	public void showPlayoffProject() {
		int c_id = Integer.parseInt(getPara("c_id"));   //获取比赛类型id
		//获取筛选的方式    0-0不筛选/1-0比赛类别-主赛道/2-0比赛类别-振兴赛道/0-1-项目状态-待审核/0-2-项目状态-审核通过/
		//1-1-比赛类别-主赛道-项目状态-待审核/1-2-比赛类别-主赛道-项目状态-审核通过/2-1-比赛类别-振兴赛道-项目状态-待审核/2-2-比赛类别-振兴赛道-项目状态-审核通过
		int sort1 = Integer.parseInt(getPara("sort1"));   //获取筛选的方式    0-不筛选/1-比赛类别-主赛道/2-比赛类别-振兴赛道
		int sort2 = Integer.parseInt(getPara("sort2"));  //获取排序方式   0-不筛选/ 1-项目状态-待审核/2-项目状态-审核通过	
		String aoData = getPara("aoData");
		
		JSONArray jsonarray = JSONArray.parseArray(aoData);
		String sEcho = null;
	    int iDisplayStart = 0; // 起始索引
	    int iDisplayLength = 0; // 每页显示的行数
	 
	    for (int i = 0; i < jsonarray.size(); i++) {
	        JSONObject obj = (JSONObject) jsonarray.get(i);
	        if (obj.get("name").equals("sEcho"))
	            sEcho = obj.get("value").toString();
	 
	        if (obj.get("name").equals("iDisplayStart"))
	            iDisplayStart = obj.getInteger("value");
	 
	        if (obj.get("name").equals("iDisplayLength"))
	            iDisplayLength = obj.getInteger("value");
	    }
		
	    List<Record> arr = new ArrayList<Record>();
	    switch(sort1) {
	    case 0:
	    	switch(sort2) {
	    	case 0://0-0  均不筛选
	    		arr = administratorService.findAllProjectOfCompetion(c_id);
	    		break;
	    	case 1://0-1 项目状态-待审核
	    		arr = administratorService.findAllProjectOfCompetionSortByProjectStatus2(c_id,sort2);
	    		break;
	    	case 2://0-2 项目状态-审核通过
	    		arr = administratorService.findAllProjectOfCompetionSortByProjectStatus2(c_id,sort2);
	    		break;
	    	}
	    	break;
	    case 1:
	    	switch(sort2) {
	    	case 0://1-0  比赛类别-主赛道
		    	arr = administratorService.findAllProjectOfCompetionSortByCompetion(c_id,1);
	    		break;
	    	case 1://1-1 比赛类别-主赛道-项目状态-待审核
	    		arr = administratorService.findAllProjectOfCompetionSort(c_id,1,1);
	    		break;
	    	case 2://1-2 比赛类别-主赛道-项目状态-审核通过
	    		arr = administratorService.findAllProjectOfCompetionSort(c_id,1,2);
	    		break;
	    	}
	    	break;
	    case 2:
	    	switch(sort2) {
	    	case 0://2-0  比赛类别-振兴赛道
		    	arr = administratorService.findAllProjectOfCompetionSortByCompetion(c_id,2);
	    		break;
	    	case 1://2-1 比赛类别-振兴赛道-项目状态-待审核
	    		arr = administratorService.findAllProjectOfCompetionSort(c_id,2,1);
	    		break;
	    	case 2://2-2 比赛类别-振兴赛道-项目状态-审核通过
	    		arr = administratorService.findAllProjectOfCompetionSort(c_id,2,2);
	    		break;
	    	}
	    	break;
	    }
	    
	    JSONObject getObj = new JSONObject();
	    getObj.put("sEcho", sEcho);// DataTable用于渲染的信息
	    getObj.put("iTotalRecords", arr.size());//全部数据的行数
	    getObj.put("iTotalDisplayRecords", arr.size());//显示的行数  
	    if(iDisplayStart+iDisplayLength<arr.size())
	    {
	    	getObj.put("data", RecordToJsonArrUtils.RecordToJsonArr(arr.subList(iDisplayStart, iDisplayStart+iDisplayLength)));//要以JSON格式返回
	    }
	    else
	    {
	    	getObj.put("data", RecordToJsonArrUtils.RecordToJsonArr(arr.subList(iDisplayStart, arr.size())));//要以JSON格式返回
	    }
	    renderJson(getObj);

	}
	
	//显示一个项目的全部信息包括成员信息
	public void showProject(int p_id) {
		p_id = Integer.parseInt(getPara(0));   //获取项目的id
		List<Record> arr1 = administratorService.findProjectOfTeam(p_id);
		renderJson(RecordToJsonArrUtils.RecordToJsonArr(arr1));
	}
	
	//显示一个项目的指导老师信息
	public void showProjectOfAdviser(int p_id) {
		p_id = Integer.parseInt(getPara(0));   //获取项目的id
		Project p = projectService.findById(p_id);
		List<Record> arr2 = administratorService.findProjectOfAdviser(p.getAdviser1());
		List<Record> arr3 = new ArrayList<Record>();
		if(p.getAdviser2()==null)
		{}
		else
		{
			arr3 = administratorService.findProjectOfAdviser(p.getAdviser2());
		}
		arr2.addAll(arr3);
		renderJson(RecordToJsonArrUtils.RecordToJsonArr(arr2));
	}
	
	//显示一个比赛累计参赛项目、累计参赛学生人数的数量
	public void showNumOfCompetition() {  //type:1-累计参赛学生人数;2-累计参赛项目
		int type = getParaToInt(0);
		int c_id = getParaToInt(1);       //获取比赛id
		renderJson("num",administratorService.findNumOfProject(c_id, type));
		//renderText(""+administratorService.findNumOfProject(c_id, type));
	}
	
	//校赛审核通过项目
	public void auditpass(int p_id,int a_id) {
			p_id = Integer.parseInt(getPara(0));
			a_id = Integer.parseInt(getPara(1));
			Administrator a = administratorService.findById(a_id);
			Project p = projectService.findById(p_id); 
			switch(p.getProjectType()){
			case 1://主赛道
				if(a.getProjectMain()>=3)
				{
					renderJson("success",2);
				}
				else
				{
					a.setProjectMain(a.getProjectMain()+1);
					a.update();
					projectService.update(p_id);
					renderJson("success",1);
				}
				break;
			case 2://乡村振兴赛道
				if(a.getProjectVillage()>=1)
				{
					renderJson("success",3);
				}
				else
				{
					a.setProjectVillage(a.getProjectVillage()+1);
					a.update();
					projectService.update(p_id);
					renderJson("success",1);
				}
				break;
			default:break;
			}

		}
	
	
	//复赛审核通过项目
	public void auditFinalpass(int p_id) {
		p_id = Integer.parseInt(getPara(0));
		projectService.fianlUpdate(p_id);
		renderJson("success",1);
	}
	
	//打分
	public void markProject() {
		int p_id = Integer.parseInt(getPara("p_id"));
		int a_id = getParaToInt("a_id");
		String score = getPara("score");
		Project p = projectService.findById(p_id);
		Project p0 = projectService.findByJudge(p_id, a_id);
		/*float f = 0.00001f;  
		DecimalFormat df = new DecimalFormat("#########.#");  
		String s = df.format(Float.parseFloat(score)+f);  */
		System.out.println(Float.parseFloat(score));  
		if(p0!=null)
		{
			if(p0.getJudges1()!=null&&p0.getJudges1()==a_id)
			{
				p0.setScore1(score);
				p0.setJudges1(a_id);
				p0.update();
				renderJson("success",1);
			}
			else if(p0.getJudges2()!=null&&p0.getJudges2()==a_id)
			{
				p0.setScore2(score);
				p0.setJudges2(a_id);
				p0.update();
				renderJson("success",2);
			}
			else if(p0.getJudges3()!=null&&p0.getJudges3()==a_id)
			{
				p0.setScore3(score);
				p0.setJudges3(a_id);
				p0.update();
				renderJson("success",3);
			}
			else if(p0.getJudges4()!=null&&p0.getJudges4()==a_id)
			{
				p0.setScore4(score);
				p0.setJudges4(a_id);
				p0.update();
				renderJson("success",4);
			}
			else if(p0.getJudges5()!=null&&p0.getJudges5()==a_id)
			{
				p0.setScore5(score);
				p0.setJudges5(a_id);
				p0.update();
				renderJson("success",5);
			}
		}
		else if(p.getScore1()==null)
		{
			p.setScore1(score);
			p.setJudges1(a_id);
			p.update();
			renderJson("success",1);
		}
		else if(p.getScore2()==null)
		{
			p.setScore2(score);
			p.setJudges2(a_id);
			p.update();
			renderJson("success",2);
		}
		else if(p.getScore3()==null)
		{
			p.setScore3(score);
			p.setJudges3(a_id);
			p.update();
			renderJson("success",3);
		}
		else if(p.getScore4()==null)
		{
			p.setScore4(score);
			p.setJudges4(a_id);
			p.update();
			renderJson("success",4);
		}
		else if(p.getScore5()==null)
		{
			p.setScore5(score);
			p.setJudges5(a_id);
			p.update();
			renderJson("success",5);
		}
		else
		{
			renderJson("success",0);
		}
		
	}
	
	//下载文件
	public void downLoad(int f_id){
		f_id = Integer.parseInt(getPara(0));
		ProjectFile p = project_fileService.findById(f_id);
		System.out.println(p.getFileName());
		String the_path=PathKit.getWebRootPath()+"\\upload\\"+p.getFileName();
        
        File file=new File(the_path);
        
        //FileKit.delete(file);
        
        renderFile(file);
    }
   
	
	//修改密码
	public void modifyCode() {
		int a_id = getParaToInt("a_id");   //管理员id
		String old_code = getPara("old_code");  //原始密码
		String new_code = getPara("new_code");  //新密码
		Administrator a = administratorService.findById(a_id);
		if(a.getAdministratorPassword().equals(old_code))
		{
			a.setAdministratorPassword(new_code);
			if(a.update())
			{
				renderJson("flag",1);
			}
			else
				renderJson("flag",3);
		}
		else
		{
			renderJson("flag",2);
		}
	}
	
	@Clear
	 //返回宣传资料
	public void getBook() {
		JSONArray book=new JSONArray();
		for(Administrator a: administratorService.pressBook())
		{
			 JSONObject node=new JSONObject();
			
			 node.put("remark",a.getInformationRemarks());
			 node.put("code", a.getInformationCode());
			 node.put("name", a.getAdministratorSchool());
			 book.add(node);
		}
		renderJson(book);
	}
	
	/**
	 从这里开始是修改的部分
	 static Information_FileService information_FileService = new Information_FileService();
	 */
	//上传回执信息的表格
	public void uploadFile() {
		int flag = 1;
		InformationFile i_f = new InformationFile(); 
		String uploadFilename = getPara("fileName");    //获取上传文件的名称
		i_f.setFileName(uploadFilename);
		
		HttpServletRequest request = getRequest();
		String basePath = request.getContextPath();	
		//存储路径
/*		String path = getSession().getServletContext().getRealPath("upload/file/");
		UploadFile file = getFile("upload");  //这个是前端的表单名称
*/		
		String filedir=PathKit.getWebRootPath() + "\\upload\\file\\";
		String fPath=filedir + uploadFilename;   //上传文件名称
		/*判断是否存在旧有文件*/
		File oldFile=new File(fPath);   
        if(oldFile.exists()){
           System.out.println("-------------删除");
           //删除旧的
           oldFile.delete();
           flag += 1;             //表示文件发生了更新	
        }
        else
        {
        	i_f.save();            //新增文件做记录
        }
       
       //上传文件
       /* 对文件进行重命名的操作
        * String type = file.getFileName().substring(file.getFileName().lastIndexOf(".")); // 获取文件的后缀
		   fileName = System.currentTimeMillis() + type; // 对文件重命名取得的文件名+后缀*/		
/*        String dest = path + "/" + uploadFilename;
		file.getFile().renameTo(new File(dest));*/
		String realFile = basePath + "/upload/file/" +  uploadFilename;		
		String fname="/"+uploadFilename;
		setAttr("fname", fname);
		setAttr("url", realFile);
		renderJson("flag",flag);     //未发生文件更新，新上传文件返回为1
	}
	
	//显示全部的回执信息文件
	public void showInformationFile() {
		String aoData = getPara("aoData");
		
		JSONArray jsonarray = JSONArray.parseArray(aoData);
		String sEcho = null;
	    int iDisplayStart = 0; // 起始索引
	    int iDisplayLength = 0; // 每页显示的行数
	    
	    List<Record> arr = information_FileService.findall();
	    
	    for (int i = 0; i < jsonarray.size(); i++) {
	        JSONObject obj = (JSONObject) jsonarray.get(i);
	        if (obj.get("name").equals("sEcho"))
	            sEcho = obj.get("value").toString();
	 
	        if (obj.get("name").equals("iDisplayStart"))
	            iDisplayStart = obj.getInteger("value");
	 
	        if (obj.get("name").equals("iDisplayLength"))
	            iDisplayLength = obj.getInteger("value");
	    }
		
	    JSONObject getObj = new JSONObject();
	    getObj.put("sEcho", sEcho);// DataTable用于渲染的信息
	    getObj.put("iTotalRecords", arr.size());//全部数据的行数
	    getObj.put("iTotalDisplayRecords", arr.size());//显示的行数  
	    if(iDisplayStart+iDisplayLength<arr.size())
	    {
	    	getObj.put("data", RecordToJsonArrUtils.RecordToJsonArr(arr.subList(iDisplayStart, iDisplayStart+iDisplayLength)));//要以JSON格式返回
	    }
	    else
	    {
	    	getObj.put("data", RecordToJsonArrUtils.RecordToJsonArr(arr.subList(iDisplayStart, arr.size())));//要以JSON格式返回
	    }
	    renderJson(getObj);
		
	}
	
	//根据回执信息文件的id下载对应的文件
	public void downloadFile() {
		int if_id = Integer.parseInt(getPara("if_id"));
		InformationFile p = information_FileService.findById(if_id);
		System.out.println(p.getFileName());
		String the_path=PathKit.getWebRootPath()+"\\upload\\"+p.getFileName();
       
       File file=new File(the_path);
       
       //FileKit.delete(file);
       
       renderFile(file);
	}
	
	//下载高校回执表
	public void getOriginalFile() {
		String the_path=PathKit.getWebRootPath()+"\\upload\\file\\全国财经院校XXXX大赛决赛暨年会高校参赛回执统计表.xls";
       
       File file=new File(the_path);
       
       //FileKit.delete(file);
       
       renderFile(file);
	}
}

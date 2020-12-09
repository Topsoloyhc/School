package com.tool.Administrator.Control;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.tool.Model.Administrator;
import com.tool.Model.MembersInformation;
import com.tool.Service.AdministratorService;
import com.tool.Service.Members_InformationService;
import com.tool.Utils.ExcelExportUtil;
import com.tool.Utils.RecordToJsonArrUtils;

public class ReturnReceiptControl extends Controller{
	
	static Members_InformationService Members_InformationService = new Members_InformationService();
	static AdministratorService administratorService = new AdministratorService();
	
	//基本信息
	public void BasicInformation() {
		int flag = getParaToInt("flag");
		int a_id = getParaToInt("a_id");
		MembersInformation m_i = new MembersInformation();
		if(flag!=0)
		{
			m_i = Members_InformationService.findById(flag);
		}
		Administrator a = administratorService.findById(a_id);
		m_i.setAdministratorId(a_id);
		m_i.setMembersSchool(a.getAdministratorSchool());
//		m_i.setMembersId(membersId);                     录入信息的序号,前端未返回
		m_i.setMembersName(getPara("m_name"));
		m_i.setMembersSex(getPara("m_sex"));
		m_i.setMembersCategory(getPara("m_category"));
		m_i.setMembersPosition(getPara("m_position"));
		m_i.setMembersTel(getPara("m_tel"));
		m_i.setAccommodationNeed(getPara("a_need"));
		if(flag!=0)
		{
			m_i.update();
		}
		else
		{
			m_i.save();
		}
		renderJson("id",m_i.getInformationId());
	}
	
	//交通工具
	public void TrafficTools() throws ParseException {
		int id = getParaToInt("id");
		MembersInformation m_i = Members_InformationService.findById(id);
		m_i.setTrafficNum(getPara("t_num"));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        Date d1 = sdf1.parse(getPara("t_time"));  //出发日期
        Date d2 = sdf.parse(getPara("t_atime"));  //到达时间
        Date d3 = sdf.parse(getPara("t_ltime"));  //离站时间
        m_i.setTrafficTime(d1);
        m_i.setTrafficArrivetime(d2);
        m_i.setTrafficLeavetime(d3);
        m_i.setTrafficWay(getPara("t_way"));
        m_i.setTrafficArriveplace(getPara("t_aplace"));
        m_i.setTrafficLeaveplace(getPara("t_lplace"));
        m_i.update();
        renderJson("id",id);
	}
	
	//住宿信息
	public void HotelInformation() throws ParseException {
		int id = getParaToInt("id");
		MembersInformation m_i = Members_InformationService.findById(id);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date d1 = sdf.parse(getPara("a_time"));  //入住时间
        Date d2 = sdf.parse(getPara("a_leave"));  //离店时间
        m_i.setAccommodationTime(d1);
        m_i.setAccommodationLeave(d2);
        m_i.setAccommodationDays(getParaToInt("a_days"));
        m_i.setAccommodationType(getPara("a_type"));
        m_i.setInformationRemarks(getPara("i_remarks"));
        m_i.update();
        renderJson("success",1);
	}
	
	//添加网盘链接
	public void addNetworkLink() {
		int a_id = getParaToInt("a_id");
		Administrator a = administratorService.findById(a_id);
		a.setInformationRemarks(getPara("i_link"));
		a.setInformationCode(getPara("i_code"));
		a.update();
		renderJson("success",1);
	}
	
	//查看网盘链接
	public void showNetworkLink() {
		int a_id = getParaToInt("a_id");
		Administrator a = administratorService.findById(a_id);
		Record r = new Record();
		r.set("link",a.getInformationRemarks());
		r.set("code",a.getInformationCode());
		renderJson(RecordToJsonArrUtils.RecordToJson(r));
	}
	
	//根据管理员读取所有回执
	public void getReturnReceipt() {
		String aoData = getPara("aoData");
		
		JSONArray jsonarray = JSONArray.parseArray(aoData);
		String sEcho = null;
	    int iDisplayStart = 0; // 起始索引
	    int iDisplayLength = 0; // 每页显示的行数
	    
	    int id = getParaToInt("id");    //管理员id
	    
	    List<Record> arr = Members_InformationService.getAllReturnReceipt(id);
	    
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
	
	//根据回执id读取回执信息的接口
	public void showReturnReceipt() {
		int id = getParaToInt("id");   //回执id
		
		MembersInformation m_i =  Members_InformationService.findById(id);
		
		renderJson(m_i);
	}
	
	//根据回执id删除一条回执记录
	public void delectReturnReceipt() {
		int id = getParaToInt("id");   //回执id
		
		Members_InformationService.deleteById(id);
		
		renderJson("flag",1);
	}
	
	//导出相关回执信息的excel文档   -----校级管理员下载
	public void downLoadBySchool() {
		int a_id = getParaToInt("a_id");
		//用时间戳作为文件补充名，保证不重名
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String str = sdf.format(date);
		Administrator a = administratorService.findById(a_id);
		Map<String, String> map = new LinkedHashMap<String, String>();
		map = ExcelExportUtil.setMap();
		String sql = "SELECT * FROM members_information WHERE members_information.Members_school = "+"\'"+a.getAdministratorSchool()+"\'";
		File file = new File(a.getAdministratorSchool()+"回执表"+str+".xls");
		ExcelExportUtil.saveFile(map, sql, file);
		renderFile(file);
	}
	
	//导出相关回执信息的excel文档   -----最高管理员下载
	public void downLoadExcle() {
		//用时间戳作为文件补充名，保证不重名
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String str = sdf.format(date);
		Map<String, String> map = new LinkedHashMap<String, String>();
		map = ExcelExportUtil.setMap();
		String sql = "SELECT * FROM members_information ORDER BY members_information.Members_school";
		File file = new File("回执表"+str+".xls");
		ExcelExportUtil.saveFile(map, sql, file);
		renderFile(file);
	}
	
	//导出进入复赛项目的相关信息的excel文档   -----最高管理员下载
	public void downLoadExcleOfProject() {
		//用时间戳作为文件补充名，保证不重名
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String str = sdf.format(date);
		Map<String, String> map = new LinkedHashMap<String, String>();
		map = ExcelExportUtil.setProjectMap();
		String sql = "SELECT project.Project_school,project.Project_name FROM project WHERE project.Competition_id = 1 AND project.Project_level = 2 ORDER BY project.Project_name";
		File file = new File("项目信息表"+str+".xls");
		ExcelExportUtil.saveFile(map, sql, file);
		renderFile(file);
	}
	
}

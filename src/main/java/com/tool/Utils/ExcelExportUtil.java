package com.tool.Utils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.jfinal.kit.PathKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class ExcelExportUtil {

	private static final String FILEPATH = PathKit.getWebRootPath() + File.separator + "upload" + File.separator ;
	
	public static String getTitle(){
		 Date date = new Date();
		 SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");  
	     String title=FILEPATH+dateFormat.format(date)+"用户.xls";  
	     return title;
	}
	
	
	public static Map<String, String> setMap() {
		 Map<String, String> map = new LinkedHashMap<String, String>();
		 map.put("Members_school", "学校");
		 map.put("Members_id", "序号");
		 map.put("Members_name", "姓名");
		 map.put("Members_category", "人员类别");
		 map.put("Members_sex", "性别");
		 map.put("Members_position", "职务");
		 map.put("Members_tel", "手机");
		 map.put("Traffic_way", "出行方式");
		 map.put("Traffic_time", "出发日期");
		 map.put("Traffic_num", "车次或航班号");
		 map.put("Traffic_arriveplace", "到站地点");
		 map.put("Traffic_arrivetime", "到站时间");
		 map.put("Traffic_leaveplace", "离站地点");
		 map.put("Traffic_leavetime", "离站日期时间");
		 map.put("Accommodation_days", "入住天数");
		 map.put("Accommodation_time", "入住时间");
		 map.put("Accommodation_leave", "离店时间");
		 map.put("Accommodation_type", "单间/标间");
		 map.put("Accommodation_need", "是否需要清真餐");
		 map.put("Information_remarks", "备注");
		 return map;
	}
	
	public static Map<String, String> setProjectMap() {
		 Map<String, String> map = new LinkedHashMap<String, String>();
		 map.put("Project_school", "学校");
		 map.put("Project_name", "项目名称");
		 return map;
	}
	
	
	@SuppressWarnings("resource")
	public static File saveFile(Map<String, String> headData, String sql, File file) {
		// 创建工作薄
		HSSFWorkbook hssfWorkbook = new HSSFWorkbook();
		// sheet:一张表的简称
		// row:表里的行
		
		// 创建工作薄中的工作表
		HSSFSheet hssfSheet = hssfWorkbook.createSheet();
		// 创建行
		HSSFRow row = hssfSheet.createRow(0);
		// 创建单元格，设置表头 创建列
		HSSFCell cell = null;
		// 初始化索引
		int rowIndex = 0;
		int cellIndex = 0;

		// 创建标题行
		row = hssfSheet.createRow(rowIndex);
		rowIndex++;
		// 遍历标题
		@SuppressWarnings("rawtypes")
		Iterator it = headData.entrySet().iterator();
        while (it.hasNext()) {
            @SuppressWarnings("rawtypes")
			Map.Entry entity = (Entry) it.next();
            //创建列
			cell = row.createCell(cellIndex);
			//索引递增
			cellIndex++;
			//逐列插入标题
			cell.setCellValue(entity.getValue().toString());
        }
		
		/*for (String h : headData.keySet()) {
			//创建列
			cell = row.createCell(cellIndex);
			//索引递增
			cellIndex++;
			//逐列插入标题
			cell.setCellValue(headData.get(h));
		}*/

		// 得到所有记录 行：列
		List<Record> list = Db.find(sql);
		Record record = null;

		if (list != null) {
			// 获取所有的记录 有多少条记录就创建多少行
			for (int i = 0; i < list.size(); i++) {
				row = hssfSheet.createRow(rowIndex);
				// 得到所有的行 一个record就代表 一行
				record = list.get(i);
				//下一行索引
				rowIndex++;
				//刷新新行索引
				cellIndex = 0;
				// 在有所有的记录基础之上，便利传入进来的表头,再创建N行
				for (String h : headData.keySet()) {
					cell = row.createCell(cellIndex);
					cellIndex++;
					//按照每条记录匹配数据
					cell.setCellValue(record.get(h) == null ? "" : record.get(h).toString());
				}
			}
		}
		try {
			FileOutputStream fileOutputStreane = new FileOutputStream(file);
			hssfWorkbook.write(fileOutputStreane);
			fileOutputStreane.flush();
			fileOutputStreane.close();
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return file;
	}
}
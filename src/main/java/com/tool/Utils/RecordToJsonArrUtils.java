package com.tool.Utils;

import java.util.List;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.jfinal.plugin.activerecord.Record;

public class RecordToJsonArrUtils {   //将record数据封装成JSON格式
	   public static JSONArray  RecordToJsonArr(List<Record> arr){
		   JSONArray  diseaseAll=new JSONArray();
		   for(Record r:arr){
			   String a=JSONObject.toJSONString(r,SerializerFeature.WriteMapNullValue);
			   diseaseAll.add(JSONObject.parseObject(a).getJSONObject("columns"));
		   }

		 return diseaseAll;
	   }
	   
	   public static JSONArray  RecordToJson(Record arr){
		   JSONArray  diseaseAll=new JSONArray();
		   String a=JSONObject.toJSONString(arr,SerializerFeature.WriteMapNullValue);
		   diseaseAll.add(JSONObject.parseObject(a).getJSONObject("columns"));
		   return diseaseAll;
	   }
}

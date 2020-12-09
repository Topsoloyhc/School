package com.tool.Interceptor;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;

public class HeaderInterceptor implements Interceptor {

	public void intercept(Invocation inv) {
		      inv.getController().getResponse().setHeader("Access-Control-Allow-Origin", "*");
	       
	      
	          inv.invoke();    //在拦截器里面必须有invoke方法，否则会导致后台无法通过renderJson传递数据至前端
	   
		
	}

} 

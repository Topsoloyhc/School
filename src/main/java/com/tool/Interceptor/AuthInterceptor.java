package com.tool.Interceptor;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;

public class AuthInterceptor implements Interceptor {
    

	public void intercept(Invocation inv) {
		    Controller controller = inv.getController();
	        String loginUser = controller.getSessionAttr("user");
	      
	        if (loginUser!=null)
	        { 
	        	inv.invoke();  
	        	  System.out.println("Session   ..........");
	        }
	       
		
	}
}
package com.tool.Interceptor;

import org.apache.log4j.Logger;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.JFinal;

public class ExceptionIntoLogInterceptor implements Interceptor{
	 private static final Logger log = Logger.getLogger(ExceptionIntoLogInterceptor.class);


	    public  void intercept(Invocation invocation){
	        //Controller controller=invocation.getController();
	        //HttpServletRequest request=controller.getRequest();
	        try{
	            invocation.invoke();
	        }catch (Exception e){
	           
	            logWrite(invocation, e);
	        }finally {
	            
	            try{

	            }catch (Exception ee){

	            }
	        }


	    }


	    private void logWrite(Invocation inv,Exception e){
	        
	        if (JFinal.me().getConstants().getDevMode()){
	            e.printStackTrace();
	        }
	        StringBuilder sb =new StringBuilder("\n---Exception Log Begin---\n");
	        sb.append("Controller:").append(inv.getController().getClass().getName()).append("\n");
	        sb.append("Method:").append(inv.getMethodName()).append("\n");
	        sb.append("Exception Type:").append(e.getClass().getName()).append("\n");
	        sb.append("Exception Details:");
	        log.error(sb.toString(),e);

	    }
}

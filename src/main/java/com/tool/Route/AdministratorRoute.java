package com.tool.Route;

import com.jfinal.config.Routes;
import com.tool.Administrator.Control.AdministratorControl;
import com.tool.Administrator.Control.ReturnReceiptControl;
import com.tool.Interceptor.AuthInterceptor;

public class AdministratorRoute extends Routes{
	public void config() {
		setBaseViewPath("/");

		addInterceptor(new AuthInterceptor());
		
		add("administrator",AdministratorControl.class);
		
		add("ReturnReceipt",ReturnReceiptControl.class);
		
	}

}

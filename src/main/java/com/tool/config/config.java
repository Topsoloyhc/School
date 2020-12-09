package com.tool.config;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.json.JacksonFactory;
import com.jfinal.kit.PathKit;
import com.jfinal.kit.PropKit;
import com.jfinal.log.Log4jLogFactory;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.template.Engine;
import com.tool.Initial.Control.LoginControl;
import com.tool.Initial.Control.RegisterControl;
import com.tool.Interceptor.ExceptionIntoLogInterceptor;
import com.tool.Interceptor.HeaderInterceptor;
import com.tool.Model._MappingKit;
import com.tool.Route.AdministratorRoute;
import com.tool.Route.ParticipantRoute;


public class config extends JFinalConfig{
	
	//基础设置
	public void configConstant(Constants me)
	{
		//PropKit 读取工具，use方法可以获取到指定文件
	    PropKit.use("com/tool/config/jdbc.properties");
	    //是否开启开发者模式
	    me.setDevMode(PropKit.getBoolean("devMode"));
	    //设置字符集
	    me.setEncoding("UTF-8");
	    //设置Json格式
	    me.setJsonFactory(new JacksonFactory());
	    me.setJsonDatePattern("yyyy-MM-dd");
	    //设置上传下载的默认路径   此处注释掉了是为了将上传的图片和上传的回执信息文件分割开来
	    //me.setBaseUploadPath(PathKit.getWebRootPath()+"/upload");
	    //设置日志工厂
	    me.setLogFactory(new Log4jLogFactory());
	}
	
	
	
	//路由分包
    public void configRoute(Routes me) {
    	me.add("/",LoginControl.class);
    	me.add("/register",RegisterControl.class,"/");
    	me.add(new AdministratorRoute());
    	me.add(new ParticipantRoute());
    }
    
    //排至前端模板引擎
    public void configEngine(Engine me) { 	
    	
    }

    
	public static DruidPlugin createDruidPlugin() {
		return new DruidPlugin(PropKit.get("jdbc_url"), PropKit.get("jdbc_username"), PropKit.get("jdbc_password").trim());
	}
    

    public void configPlugin(Plugins me) {  	

    	DruidPlugin druidPlugin = new DruidPlugin(PropKit.get("jdbc_url"), PropKit.get("jdbc_username"), PropKit.get("jdbc_password").trim());
        me.add(druidPlugin);
    			
        ActiveRecordPlugin arp = new ActiveRecordPlugin(druidPlugin);
        
        arp.setBaseSqlTemplatePath(PathKit.getRootClassPath());
    	arp.addSqlTemplate("Tool.sql");
    	arp.setShowSql(true);
        
     
       _MappingKit.mapping(arp);
        me.add(arp);
       
       
    }
    

    //拦截器，配置文件里的为全局拦截器
    public void configInterceptor(Interceptors interceptors) {
    	 interceptors.addGlobalActionInterceptor(new ExceptionIntoLogInterceptor());
    	 interceptors.addGlobalActionInterceptor(new HeaderInterceptor());
    }
    

   
    public void configHandler(Handlers me) {
    
    	//me.add(new ResourceHandler());
    }
    
    
    public void afterJFinalStart() {
    }
     
 
    public void beforeJFinalStop() {
    }
    
}

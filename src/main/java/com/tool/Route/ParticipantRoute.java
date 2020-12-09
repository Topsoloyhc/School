package com.tool.Route;

import com.jfinal.config.Routes;
import com.tool.Interceptor.AuthInterceptor;
import com.tool.Participant.Control.ApplyControl;
import com.tool.Participant.Control.PaticipantControl;


public class ParticipantRoute extends Routes{

	public void config() {
		addInterceptor(new AuthInterceptor());
		add("participant",PaticipantControl.class);
		
		add("apply",ApplyControl.class);
			 
	}

}

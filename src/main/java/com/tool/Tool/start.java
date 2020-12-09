package com.tool.Tool;

import com.jfinal.core.JFinal;

public class start {

	public static void main(String[] args) {
		//eclipse
		JFinal.start("src/main/webapp",80,"/",5);
		
/*		//IDEA
		JFinal.start("src/main/webapp",80,"/");*/
	}
}

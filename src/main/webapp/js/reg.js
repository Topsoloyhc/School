var isDouble=1;
$(document).ready(function(){
		tel=/^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
		email=/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
		age= /^[0-9]*$/;
		comb=/^[A-Za-z0-9]+$/;
		var u_id=document.getElementById("u_id");
		var u_pwd=document.getElementById("u_pwd");
		var u_idnum=document.getElementById("u_idnum");
		var u_pwd1=document.getElementById("u_pwd1");
		var u_tel=document.getElementById("u_tel");
		var u_email=document.getElementById("u_email");
		var u_sch=document.getElementById("u_sch");
		var u_name=document.getElementById("u_name");
		var u_adress=document.getElementById("u_name");
		//实时验证姓名的正确性
		$("#u_name").blur(function(){
			if(u_name.value.length==0){
			$(".reg-warn8").show();}
			else{$(".reg-warn8").hide();}
		});
		
		//实时验证年龄的正确性
		$("#u_sch").blur(function(){
			if(u_sch.value.length==0){
			$(".reg-warn1").show();}
			else{$(".reg-warn1").hide();}
		});

		//实时验证身份证号
		$("#u_idnum").blur(function(){
			if(u_idnum.value.length==0){
			$(".reg-warn3").show();}
			else{$(".reg-warn3").hide();}
		});
		

		//实时验证电话号码格式正确性
		$("#u_tel").blur(function(){
			if(!tel.test(u_tel.value)){
			$(".reg-warn2").show();}
			else{$(".reg-warn2").hide();}
		});

		//实时验证电子邮箱格式正确性
		$("#u_email").blur(function(){
			if(!email.test(u_email.value)){
			$(".reg-warn4").show();}
			else{$(".reg-warn4").hide();}
		});

		//实时验证账号格式正确性
		$("#u_id").blur(function(){
			if(u_id.value.length<4 ||!comb.test(u_id.value)){
			$(".reg-warn5").show();}
			else{$(".reg-warn5").hide();
			$.ajax({
			url:"http://localhost/register/judge/"+u_id.value,
        	dataType:"json",
        	type:"get", 
        	success:function(data){
            	//处理返回的数据
            	switch(parseInt(data.flag))
            	{
            		case 1:
            			$(".reg-warn9").show();
            			isDouble=1;
            		break;
            		case 0:
            			$(".reg-warn9").hide();
            			isDouble=0;
            		break;
            	}
        	}
			});
			}
			
		});
		
		//实时验证密码格式正确性
		$("#u_pwd").blur(function(){
			if(u_pwd.value.length<8 ||!comb.test(u_pwd.value)){
			$(".reg-warn6").show();}
			else{$(".reg-warn6").hide();}
		});

		//实时验证确认密码
		$("#u_pwd1").blur(function(){
			if(u_pwd.value!=u_pwd1.value){
			$(".reg-warn7").show();}
			else{$(".reg-warn7").hide();}
		});

		

	});

	function checkfrm(){
		tel=/^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
		email=/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
		var idNumReg=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
		comb=/^[A-Za-z0-9]+$/;
		var u_id=document.getElementById("u_id");
		var u_pwd=document.getElementById("u_pwd");
		var u_idnum=document.getElementById("u_idnum");
		var u_pwd1=document.getElementById("u_pwd1");
		var u_tel=document.getElementById("u_tel");
		var u_email=document.getElementById("u_email");
		var u_add=document.getElementById("u_add");
		var u_sch=document.getElementById("u_sch");
		var u_name=document.getElementById("u_name");
		var u_sex=$("#sex").val(); 
		
		if(u_name.value.length==0)
		{	
			alert("姓名不可为空！");
			u_name.value = "";
			u_name.focus();
			return false;
		}
		
		if(u_idnum.value.length==0)
		{	
			alert("身份证号不可为空！");
			u_idnum.value = "";
			u_idnum.focus();
			return false;
		}
		
		if(u_sex!=1&&u_sex!=2)
		{
		alert("性别不可为空!")
		return false;
		}

		if(u_sch.value.length==0)
		{	
			alert("学校不可为空！");
			u_sch.value = "";
			u_sch.focus();
			return false;
		}

		if(!tel.test(u_tel.value))
		{
			alert("请输入正确的手机号");
			u_tel.value = "";
			u_tel.focus();
			return false;
		}

		if(!email.test(u_email.value))
		{
			alert("请输入正确的电子邮箱");
			u_email.value = "";
			u_email.focus();
			return false;
		}
		
		if(u_add.value.length==0)
		{	
			alert("地址不可为空！");
			u_add.value = "";
			u_add.focus();
			return false;
		}

		if(u_id.value.length<4 ||!comb.test(u_id.value))
		{
			alert("账号由英文和数字组成，必须大于4位");
			u_id.value = "";
			u_id.focus();
			return false;
		}
		
		
		if(!idNumReg.test(u_idnum.value))
		{
				alert("请输入正确的身份证号");
				u_idnum.value=""
				u_idnum.focus();
				return false;
		}

		$.ajax({
			url:"http://localhost/register/judge/"+u_id.value,
        	dataType:"json",
        	type:"get", 
        	success:function(data){
            	//处理返回的数据
            	switch(parseInt(data.flag))
            	{
            		case 1:
            			$(".reg-warn9").show();
            			isDouble=1;
            		break;
            		case 0:
            			$(".reg-warn9").hide();
            			isDouble=0;
            		break;
            	}
        	}
			});
		if(isDouble==1)
		{
			alert("该账号已存在，请使用其他账号");
			return false;
		}

		if(u_pwd.value.length<8 ||!comb.test(u_pwd.value))
		{
			alert("密码由英文和数字组成，必须大于8位");
			u_pwd.value = "";
			u_pwd.focus();
			return false;
		}

		if(u_pwd.value!=u_pwd1.value)
		{
			alert("两次输入的密码不同！");
			u_pwd1.value = "";
			u_pwd1.focus();
			return false;
		}

		if(!validate())
		{
			alert("验证码错误！");
			u_code.value = "";
			u_code.focus();
			return false;
		}
//		document.getElementById("form1").submit();//提交表单
		$.ajax({
        url:"http://localhost/register/register",
        dataType:"json",
        type:"post", 
        async:false,
        data:$("#form1").serialize(), //传递form的表单参数
        "success":function(data){
        	console.log(data);
        	switch(parseInt(data.flag))
        	{
        		case 1:
        			layer.msg('注册成功！', {
									icon: 0,
									time: 1500, //1.5后自动关闭
									});
					window.setTimeout("window.location='../login.html'",1000);
        		break;
        		case 0:
        			layer.msg('注册失败，请重试！', {
									icon: 1,
									time: 1500, //1.5后自动关闭
									});
        		break;
        	}
        },
        "error":function(){
        	alert("无法连接服务器！请重试或联系管理员微信：dyz_123698745、邮箱：1974794924@qq.com");
        }
    	});
		
		return true;
	}

	    var code ; //在全局定义验证码   
           
        function createCode(){
			code=""
			var checkCode=document.getElementById("code");
			var codeLength = 4;
			var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',   
             'S','T','U','V','W','X','Y','Z');
			for(var i=0;i<4;i++)
			{	
				var randomNumber=Math.floor(Math.random()*36);
				code+=random[randomNumber];
			}
			checkCode.value=code;
        } 
        //校验验证码   
        function validate(){
			var inputCode = document.getElementById("u_code").value.toUpperCase();		
		    if(inputCode.length <= 0 || inputCode != code) { 
                createCode();
				return false;    
            }
			else {
               return true; 
            } 

        }
        

    

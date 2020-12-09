var logo_name="";
var files;
var file_num=0;
var file_icon='../images/doc.png';
$(document).ready(function () {
    var imgInput = document.querySelector('#imgInput-real');
    if (imgInput !== null) {
        imgInput.addEventListener('change', function () {
        	var file = this.files[0];
            if (file.size/1024/1024 > 3) {
                alert('请上传3M以下的图片！')
            } else {
            	var formData = new FormData();
            	formData.append('file', this.files[0]);
            	logo_name=file.name;
            	 $.ajax({
                 	type:"post",
                 	url:"http://localhost/apply/upLoadLogo",
                 	data:formData,
                 	contentType: false,
                     /**
                     * 必须false才会避开jQuery对 formdata 的默认处理
                     * XMLHttpRequest会对 formdata 进行正确的处理
                     */
                    processData: false,
                    enctype:"multipart/form-data",
                 	success:function()
                 	{
                 		alert("上传成功");
                 	},
                 	error:function()
                 	{
                 		alert("上传失败！");
                 	}
                 });
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (ev) {
                    var url = reader.result;
                    $('#imgInput-img').attr('src',url);
                };
               
            }
            
        });
    }

    var fileInput = document.querySelector('#fileInput-real');
    if (fileInput !== null) {
        fileInput.addEventListener('change', function () {
        	var files_length=this.files.length;
        	if(files_length>3||file_num+files_length>3)
        	{
        		alert("最多上传3个附件！");
        	}
        	else
        	{
        		for(var i=0;i<files_length;i++)
        		{
        			var file = this.files[i];
            		if (file.size/1024/1024 > 20) 
            		{
                		alert('请上传20M以下的文件！')
            		} 
            		else {
            			var start = file.name.lastIndexOf(".")+1;
						var length = file.name.length;
						var fileType = file.name.substring(start,length);
						if(fileType=="doc"||fileType=="docx")
						{
							file_icon='../images/doc.png';
						}
						else if(fileType=="pdf")
						{
							file_icon='../images/pdf.png';
						}
//              		var formData = new FormData();
//          			formData.append('file', file);
//              		$.ajax({
//              		"type":"post",
//              		"url":"http://localhost/apply/upLoadFile",
//              		"data":file,
//              		data:formData,
//               		contentType: false,
//                  	/**
//                  	 * 必须false才会避开jQuery对 formdata 的默认处理
//                   	* XMLHttpRequest会对 formdata 进行正确的处理
//                   	*/
//                  	processData: false,
//              		"success":function()
//              		{
                			//返回文件id,以便删除
                			var html='<div class="one-file"><img class="file-icon" src="'+file_icon+'"/>'
                            +'<p class="file-name" title="'+file.name+'"><span class="file-id">'+'111'+'</span>'+file.name
                            +'</p><label onclick="deleteFile(this)" class="btn-delete-file">删除</label></div>';
                			$(".div-file").append(html);
                			file_num+=1;
//              			alert("上传成功");
//              		},
//              		"error":function()
//              		{
//              			alert("上传失败！");
//              		}
//              		});
            	}
        		}
        	}
        	
            
        });
    }
   
});

function deleteFile(obj){
    	layer.confirm('确认删除该附件吗？', {
  			btn: ['确认','取消'] //按钮
		}, function(){
			layer.closeAll('dialog');
  			var file_id=$(obj).parent().find(".file-id").text();
    		$(obj).parent().remove();
    		file_num-=1;
//  		layer.close();
		}, function(){
  			layer.close();
		});
    }
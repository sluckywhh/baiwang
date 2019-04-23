var bspffCpy = function(){
	var bspbh,bspnsrsbh;
	return{
		//页面初始化调用initPageg该方法
		initPage:function(){
			try{
				var result=signOCX.OperateDiskX("BSPFPCX","test");
			}catch(e){
				alertMsg.confirm("您没有安装税控服务器组件接口，将为您转到下载页面！", {
					okCall: function(){
						window.open(ctxPath+"/resources/download/kpkj.EXE");
					}
				});
				disableButtons(_$("#bspfpcxId"));
				return;
			}		
		  //检查版本号
		   checkSignOCXVersion();
		   if(_$("#ff").val()!="0"){
			   _$("#bspkcff").attr("style", "display:none;");
		   }
		},
		//报税盘查询
		readBsp:function(){
			if(_$("#bspklId").val()==""){
				alertMsg.warn("请输入报税盘口令！");
				_$('.gridTbody tr').remove();
				return;
			}
			var bspxxcxXML = "<?xml version=\"1.0\" encoding=\"gbk\"?>"
				+ "<business comment=\"报税盘信息查询\" id=\"BSPXXCX\">" + "<body yylxdm=\"1\">" + "<input><bspkl>"
				+ _$("#bspklId").val() + "</bspkl></input>" +"</body></business>";
			var result=signOCX.OperateDiskX("BSPXXCX",bspxxcxXML);
			var rxml = $($.parseXML(result));
			var retcode =rxml.find("returncode").text();
			var retmsg =rxml.find("returnmsg").text();
			if(retcode!="0"){
				alertMsg.error("操作失败:错误代码:"+retcode+",错误信息:"+retmsg);
				return;
			}
			bspbh = rxml.find("bspbh").text();
			bspnsrsbh = rxml.find("nsrsbh").text();
			if (bspnsrsbh!=_$("#nsrsbh").val()) {
				alertMsg.error("操作失败！当前税号与报税盘所属税号不同！");
				return;
			}
			var bspcxXml = "<?xml version=\"1.0\" encoding=\"gbk\"?>"
				 	+ "<business comment=\"成品油库存查询\" id=\"CPYKCCX\"><body yylxdm=\"1\"><input><bspkl>"
				 	+ _$("#bspklId").val() + "</bspkl><bspbh>"
				 	+ bspbh + "</bspbh></input></body></business>";
			var kccxResult=signOCX.OperateDiskX("BSPFPCX",bspcxXml);
			if ("ID不支持"==kccxResult) {
				alertMsg.error("操作失败！ID不支持，请检查报税盘控件是不是最新控件！");
				return;
			}
			var kccxrxml = $($.parseXML(kccxResult));
			var returncode =kccxrxml.find("returncode").text();
			var returnmsg =kccxrxml.find("returnmsg").text();

			if(returncode!='0'){
		    	alertMsg.error("操作失败!错误代码:"+returncode+"错误信息："+returnmsg);
		    	return;
		    }
			_$("#kccxResult").val(kccxResult);
			_$("form").submit();
		},
		//报税盘库存分发
		bspkcff:function(){
			if (bspnsrsbh!=_$("#nsrsbh").val()) {
				alertMsg.error("操作失败！当前税号与报税盘所属税号不同！");
				return;
			}
			if(_$("#bspklId").val()==""){
				alertMsg.warn("请输入报税盘口令！");
				_$('.gridTbody tr').remove();
				return;
			}
			var csszXML = "<?xml version=\"1.0\" encoding=\"gbk\"?>" +
			   "<business comment=\"参数设置\" id=\"CSSZ\"><body yylxdm=\"1\">" +
			   "<socketip>192.168.2.99</socketip><socketport>12399</socketport>" +
			   "<servletip>" + window.location.host.split(":")[0] + "</servletip>" +
			   //如果采用默认的80端口(update:即使添加了:80)，那么返回值并不是默认的80而是空字符
			   "<servletport>" + (window.location.port==""?"80":window.location.port) + "</servletport>" +
			   "<servlettype>" + (window.location.protocol=="http:"?"0":"1") + "</servlettype>" +
			   "</body></business>";
			var csszResult=signOCX.OperateDiskX("CSSZ",csszXML);
			var csszRxml = $($.parseXML(csszResult));
			var csszRcode =csszRxml.find("returncode").text();
			var csszRmsg =csszRxml.find("returnmsg").text();
			if(csszRcode!="0"){
			   alertMsg.error("操作失败！:代码:"+csszRcode+",信息:"+csszRmsg);
			   return;
			}
			var bspcxXml = "<?xml version=\"1.0\" encoding=\"gbk\"?>"
				 	+ "<business comment=\"成品油库存分发\" id=\"CPYKCFF\"><body yylxdm=\"1\"><input><nsrsbh>"
				 	+ _$("#nsrsbh").val()+"</nsrsbh><jqbh>"+_$("#jqbh").val()+"</jqbh><bspkl>"
				 	+ _$("#bspklId").val() + "</bspkl><bspbh>"
				 	+ bspbh + "</bspbh></input></body></business>";
			var kcffResult=signOCX.OperateDiskX("CPYKCFF",bspcxXml);
			if ("ID不支持"==kcffResult) {
				alertMsg.error("操作失败！ID不支持，请检查报税盘控件是不是最新控件！");
				return;
			}
			var kcffrxml = $($.parseXML(kcffResult));
			var returncode =kcffrxml.find("returncode").text();
			var returnmsg =kcffrxml.find("returnmsg").text();

			if(returncode=='0'){
		    	alertMsg.correct("操作成功!");
		    	navTab.reload(ctxPath+'/bspFpffCpy/init.do');
		    }else{
		    	alertMsg.error("操作失败!错误代码:"+returncode+"错误信息："+returnmsg);
		    }
		}
	};
}();
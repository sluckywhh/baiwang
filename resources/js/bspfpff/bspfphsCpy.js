var bspfphsCpy = function(){
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
				return;
			}
			
			// 检查版本号
			checkSignOCXVersion();
		},
//		//库存回收
		kchs:function(){
			if(_$("#bspklId").val()==""){
				alertMsg.error("请输入报税盘口令！");
				return;
			}
			var checkedTds = _$(":checked");
			if(checkedTds.length==0){
				alertMsg.error("至少选择一条记录！");
				return;
			}
			var flbms="";
			var hssls="";
			for(var i=0;i<checkedTds.length;i++){
				var tds = $(checkedTds[i]).parents("tr:first").children();
				var hssl = tds.find("input:text").val();
				if(isNaN(parseFloat(hssl))||parseFloat(hssl)==0){
					alertMsg.error("已选择的第"+(i+1)+"条记录所填的回收数量不合法！");
					return;
				}
				if(parseFloat(hssl)>tds.eq(4).text()){
					alertMsg.error("已选择的第"+(i+1)+"条记录所填的回收数量大于剩余数量！");
					return;
				}
				var flbm = tds.eq(3).text();
				flbms+=flbm+"_";
				hssls+=hssl+"_";
			}
			var bspxxcxXML = "<?xml version=\"1.0\" encoding=\"gbk\"?>"
				+ "<business comment=\"报税盘信息查询\" id=\"BSPXXCX\">" + "<body yylxdm=\"1\">" + "<input><bspkl>"
				+ _$("#bspklId").val() + "</bspkl></input>" +"</body></business>";
			var result=signOCX.OperateDiskX("BSPXXCX",bspxxcxXML);
			var rxml = $($.parseXML(result));
			var retcode =rxml.find("returncode").text();
			var retmsg =rxml.find("returnmsg").text();
			var bspbh;
			if(retcode=="0"){
				bspbh=rxml.find("bspbh").text();
			}else{
				alertMsg.error("查询结果:代码:"+retcode+",信息:"+retmsg);
				return;
			}
			if (rxml.find("nsrsbh").text()!=_$("#nsrsbh").val()) {
				alertMsg.error("操作失败！当前税号与报税盘所属税号不同！");
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
			var bspbh;
			if(csszRcode=="0"){
				bspbh=rxml.find("bspbh").text();
			}else{
				alertMsg.error("操作失败！:代码:"+csszRcode+",信息:"+csszRmsg);
				return;
			}
			
			var param = {
					flbms:flbms,
					hssls:hssls,
					bspbh:bspbh,
					async:false
	    	};
			ajaxLoad(ctxPath+"/bspfphsCpy/thbw.do",param,function(json){
				if(json.returncode!='0'){
					alertMsg.error("操作失败！："+json.returnmsg);
			    	return;
				}
				var bspkl =_$("#bspklId").val();
				var index =json.responseXml.indexOf("</jqbh>")+7;
				var hsXml= json.responseXml.substring(0,index)+"<bspkl>"+bspkl
				+"</bspkl>"+json.responseXml.substring(index,json.responseXml.length);
				var hsresult=signOCX.OperateDiskX("CPYKCSH",hsXml);
				if("ID不支持"==hsresult){
					alertMsg.error("成品油库存回收失败！"+hsresult+",请检查报税盘控件是否是最新");
					return;
				}
				var hsresultxml = $($.parseXML(hsresult));
				var returncode =hsresultxml.find("returncode").text();
				var returnmsg =hsresultxml.find("returnmsg").text();
				if(returncode=="0"){
					alertMsg.correct("成品油库存回收成功！");
					navTab.reload(ctxPath+'/bspfphsCpy/fphscx.do');
					_$("#bspklId").val(bspkl);
				}else{
					alertMsg.error("成品油库存回收失败！:代码:"+returncode+",信息:"+returnmsg);
					return;
				}
			});
		}
	};
	}();
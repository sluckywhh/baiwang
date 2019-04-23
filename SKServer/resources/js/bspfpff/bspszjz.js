var bspszjz = function(){
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
					disableButtons(_$("#bspszjzId"));
					return;
				}
				// 检查版本号
				checkSignOCXVersion();
			},
			bspjzsz:function (){
				var bspkl=_$("#bspklId").val();
				if(bspkl==""){
					alertMsg.warn("请输入报税盘口令！");
					return;
				}
				var param = {
						bspkl:""	
				}
				ajaxLoad(ctxPath+"/bspjzsz/szjzXML.do",param,function(json){
					var index =json.requestXml.indexOf("</nsrsbh>")+9;
					var bspjzszXml= json.requestXml.substring(0,index)+"<bspkl>"+_$("#bspklId").val()
					+"</bspkl>"+json.requestXml.substring(index,json.requestXml.length);
					var result=signOCX.OperateDiskX("BSPJZSZ1",bspjzszXml);
					bspszjz.bspszjzxg(result);
				});
				
				
			},
			bspszjzxg:function(result){
				var param ={
						jxbspXML:result,
						async:false
				 }
				ajaxLoad(ctxPath+"/bspjzsz/jxbspXML.do",param,function(json){
					if(0==json.returncode){
						_$("#bspszid").val(json.bspdqsj);
						_$("#fwqdqsjid").val(json.fwqdqsj);
						alertMsg.correct("校准时钟成功！");
					}
				});
			}
	}
	}();
var bspfphsD = function(){
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
		//刷新下面列表
		changTable:function(fplxdm){
			navTab.reload(ctxPath+'/bspfphsd/fphscx.do',
			{data:{fplxdm:fplxdm}});
		},
		fphs:function(a){
			var tds = $(a).parents("tr:first").children();
			var param = {
				fplxdm:_$("#fplxdmId").val(),
				fpdm:tds.eq(0).text(),
				qshm:tds.eq(1).text(),
				zzhm:tds.eq(2).text(),
				fpfs:tds.eq(3).text(),
				syfs:tds.eq(4).text(),
				lgrq:tds.eq(5).text(),
				async:false
				
			}
			var tr = $(a).parent().parent();
			alertMsg.confirm("确认发票回收?", {
				okCall: function(){
					if(_$("#bspklId").val()==""){
						alertMsg.warn("请输入报税盘口令！");
						return;
					}
					ajaxLoad(ctxPath+"/bspfphsd/qrfphs.do",param,function(json){
						var index =json.responseXml.indexOf("</nsrsbh>")+9;
						var bsphsXml= json.responseXml.substring(0,index)+"<bspkl>"+_$("#bspklId").val()
						+"</bspkl>"+json.responseXml.substring(index,json.responseXml.length);
						bspfphsD.bspfphs(bsphsXml,param.fpdm,param.qshm);
					});
					
				}
			});
		},
		bspfphs:function (responseXml,fpdm,qshm) {
			var bspfpOneResultXML = signOCX.OperateDiskX("BSPFPSH1", responseXml);
			var param1 = {
					bspfpOneResultXML:bspfpOneResultXML,
					fplxdm:_$("#fplxdmId").val(),
					fpdm:fpdm,
					qshm:qshm,
					async:false
				}
			var fplgxxthReturncode;
			var bsphsTwoXml;
			ajaxLoad(ctxPath+"/bspfphsd/bspfpOneResult.do",param1,function(json){
				bsphsTwoXml=json.bsphsTwoXml;
				fplgxxthReturncode=json.fplgxxthReturncode;
			});
			if(fplgxxthReturncode=='0'){
				var bsphsTwoResultXML = signOCX.OperateDiskX("BSPFPSH2", bsphsTwoXml);
				var param = {
						resultXml:bsphsTwoResultXML,
						async:false
					}
				ajaxLoad(ctxPath+"/bspfphsd/resultBspffhs.do",param,function(json){
					if(0==json.returncode){
						alertMsg.correct(json.returnmsg);
						bspfphsD.changTable(_$("#fplxdmId").val());
					}else{
						alertMsg.error(json.returnmsg);
					}
				});
			}
		}
	}
	}();
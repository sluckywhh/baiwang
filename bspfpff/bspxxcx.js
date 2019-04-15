var bspxxcx = function(){
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
					disableButtons(_$("#bspxxcxBtn"));
					return;
				}
				// 检查版本号
				checkSignOCXVersion();
			},
			bspxxcx:function (){
				var bspkl=_$("#bspklId").val();
				if(bspkl==""){
					alertMsg.warn("请输入报税盘口令！");
					return;
				}
				var bspxxcxXML = "<?xml version=\"1.0\" encoding=\"gbk\"?>"
					+ "<business comment=\"报税盘信息查询\" id=\"BSPXXCX\">" + "<body yylxdm=\"1\">" + "<input><bspkl>"
					+ _$("#bspklId").val() + "</bspkl></input>" +"</body></business>";
				 var result=signOCX.OperateDiskX("BSPXXCX",bspxxcxXML);
				 var rxml = $($.parseXML(result));
					var returncode =rxml.find("returncode").text();
					var returnmsg =rxml.find("returnmsg").text();
					if(returncode=="0"){
						alertMsg.correct("查询结果:代码:"+returncode+",信息:"+returnmsg);
						_$("#bspbh").text(rxml.find("bspbh").text());
						_$("#nsrsbh").text(rxml.find("nsrsbh").text());
						_$("#nsrmc").text(rxml.find("nsrmc").text());
						var swjgdm=rxml.find("swjgdm").text();
						_$("#swjgdm").text(swjgdm.substring(3));
						_$("#swjgmc").text(rxml.find("swjgmc").text());
						var dqsz=rxml.find("dqsz").text();
						var y =dqsz.substring(0,4);
						var m =dqsz.substring(4,6);
						var d =dqsz.substring(6,8);
						var h =dqsz.substring(8,10);
						var mm =dqsz.substring(10,12);
						var s =dqsz.substring(12,14);
						var date =y+"-"+m+"-"+d+" "+h+":"+mm+":"+s;
						_$("#dqsz").text(date);
						var qysj =rxml.find("qysj").text()
						var y =qysj.substring(0,4);
						var m =qysj.substring(4,6);
						var d =qysj.substring(6,8);
						var h =qysj.substring(8,10);
						var mm =qysj.substring(10,12);
						var s =qysj.substring(12,14);
						var qysjdate =y+"-"+m+"-"+d+" "+h+":"+mm+":"+s;
						_$("#qysj").text(qysjdate);
						
						
						_$("#ffbz").text(rxml.find("ffbz").text());
						_$("#bbh").text(rxml.find("bbh").text());
						var kpjh = Number( rxml.find("kpjh").text()) ;
						_$("#kpjh").text(kpjh);
						_$("#blxx").text(rxml.find("blxx").text());
						_$("#qylx").text(rxml.find("qylx").text());
					}else{
						alertMsg.warn("查询结果:代码:"+returncode+",信息:"+returnmsg);
					}
				
			}
		
		};
	}();
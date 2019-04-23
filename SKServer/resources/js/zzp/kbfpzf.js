var kbfpzf = function(){
	return {
		initPage:function(){
			limit_money_input(_$("#zfzs"));
			var hideMsg = _$("#hideMsg").val();
			if(hideMsg){
				alertMsg.error(hideMsg);
				disableButtons(_$("button"));
			}
		},
		kbfpzf:function(fplxdm){
			if(!checkKey()){
				return;
			}
			checkPerm(function(){

				var zfzs=_$("#zfzs").val();
				if((zfzs*1) < 1 || ((zfzs * 1) >999) ){
					alert("您的输入不合法，作废张数范围为1-999！");
					return;
				}
				if(zfzs.indexOf(".")!=-1){
					alert("您的输入不合法，作废张数必须为正整数！");
					return;
				}
				var startFphm=_$("table td").eq(3).text();
				var stopFphm=startFphm*1 +zfzs*1 -1;
				var leng=(startFphm.length-(stopFphm+"").length)*1;
				for(var i=0;i<leng;i++){
					stopFphm="0"+stopFphm;
				}
				var trainFlag;
                if(sk_version == "TRAIN"){
                    trainFlag = true;
                }else {
                	trainFlag =false;
				}
				var fpdm=_$("table td").eq(1).text();
				alertMsg.confirm("是否作废发票代码："+fpdm+"<br/>发票号码："+startFphm+"——"+stopFphm+"的发票段？",{okCall:function () {
					disableButtons(_$("button"));
					ajaxLoad(ctxPath+"/zzp/"+(fplxdm=="004"?"zzpkbfpzf":fplxdm=="007"?"zppkbfpzf":fplxdm=="025"?"zzsjpkbfpzf":fplxdm=="005"?"jdcpkbzf":"escpkbzf")+".do",{zfzs:_$("#zfzs").val(),trainF:trainFlag,fpdm:fpdm,fphm:startFphm},function(json){
						alertMsg.confirm("发票代码："+json.fpmxStart.fpdm+"<br/>发票号码："+json.fpmxStart.fphm+"-"+json.fpmx.fphm+"发票段作废成功，是否继续作废？",{
							okCall:function(){
								navTab.reload();
							}
						});
					});
				}});

			})
		}
	}
}();
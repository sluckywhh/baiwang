var glyqx_qxyj=function(){
	return {
		quyjdialog:function(){
			var sel=_$(".pageContent table tr.selected");
			if(sel.size()==0){
				alertMsg.info("请选择行");
			}else{
				var url = ctxPath+"/glyqx/toGlyqx.do?yczydm="+sel.attr("glydm");
				$.pdialog.open(url,"gly_glyqx","管理员权限移交",{
					width:600,
					height:500
				});
			}
			
		},
		quyj:function(){
			var ysel=_$(".pageContent table tr.selected");
			var sel=$("#dia table tr.selected");
			if(sel.size()==0){
				alertMsg.error("请选择行");
			}else{
				if(ysel.attr("glydm")==sel.attr("glydm")){
					alertMsg.info("管理员不可以相同");
				}else{
					alertMsg.confirm("确定将"+ysel.attr("glydm")+"管理员权限移交给"+sel.attr("glydm")+"管理员？", {
						okCall: function(){
							ajaxLoad(ctxPath+"/glyqx/glyqxyj.do?yglydm="+ysel.attr("glydm")+"&nglydm="+sel.attr("glydm"),function(json){
									alertMsg.info(json.message);
							});							
						}
					});
				}
			}
		}
	}
}();
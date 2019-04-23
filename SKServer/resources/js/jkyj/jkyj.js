var jkyj=function(){
	return {
		initPage:function(){
			
		},
		hide_div:function(id){
			$("#div_"+id).hide();
		},jkplsz:function(json){
			dialogAjaxDone(json);
			$("#jkplsz_list_index_btn").click();
		},downSbbdc:function(json){
			dialogAjaxDone(json);
			if(json.code=="200"){
				$.pdialog.closeCurrent();
				if(json.address=="gz"){
					location.href=ctxPath + "/sbbdcgz/downXml.do?filename="+json.filename+"&filepath="+json.filepath;
				}else{
					location.href=ctxPath + "/sbbdchb/downXml.do?filename="+json.filename+"&filepath="+json.filepath;
				}
			}
		}
	}
}();

var djgl_plkp=function(){
	var cache,fpmx;
	return {
		getRowData:function(sel){
			fpmx = null;
			var djh = sel.attr("rel");
			ajaxLoad(ctxPath+"/djkp/djmx.do?djh="+djh,function(json){
				var table = _$("table:last").empty();
				$.each(json.data,function(i,n){
					table.append("<tr><td>"+(i+1)+"</td><td>"+n.hwmc+"</td>" +
							"<td>"+n.jldw+"</td><td>"+n.ggxh+"</td><td>"+n.spsl+"</td><td>"+n.spdj+"</td>" +
							"<td>"+n.je+"</td><td>"+n.sl+"</td><td>"+n.se+"</td>");
				});
			});
		},
		initPage:function(){
			cache={};
			fpmx=null;
		}
	};
}();
var sbcx = function() {
	var cache;
	return {
		getFpzl:function(){
			var fpzl=_$("#fpzl").val();	
			var smonth=_$("#month").val();
			var param = {
					fpzl:fpzl,
					smonth:smonth,
					async : false
				}
			if(fpzl!=-1&&smonth.length!==0){
				ajaxLoad(ctxPath + "/fptj/fpzl.do", param, function(json) {				
					var list=json.list;
					var res="";	
					_$("#kpr").empty();
					_$("#kpr").append("<option value='-1' >"+"全部"+"</option>");
					for(var i=0;i<list.length;i++){
						res=list[i];
						_$("#kpr").append("<option value='"+res+"'>"+res+"</option>");
					}
				},"json");
		}else{
			_$("#kpr").empty();
			_$("#kpr").append("<option value='-1' selected='selected'>"+"请选择"+"</option>");
		}
			},
			getKpr:function(){	
				var kpry=_$("#kpr")[0];
				for( var i=1;i<kpry.length;i++){
					if(kpry[i].value == _$("#kpr_selected").val()){
						kpry[i].selected = true;
					}
				}
			}
			
	};
}();
var dcmb = function() {
	var cache;
	return {
		static_n : function() {
//		$("#dj_pchTy").focus(function() {
//			$.post(ctxPath + "/djgl/queryFppch.do", function(json) {
//				$("#dj_pchTy").autocomplete(json.message.split("|"));
//			}, "json");
//		});
//		$("#djdc_pchTy").focus(function() {
//			var mbmc=$("#djdc_mbmc").val();
//			$.post(ctxPath + "/djgl/queryFppch.do",{mbmc:mbmc}, function(json) {
//				$("#djdc_pchTy").autocomplete(json.message.split("|"));
//			}, "json");
//		});
		},
		moveOption:function(e1,e2)
		{
		  try
		  {
		    for(var i=0;i<e1.options.length;i++)
		    {
		      if(e1.options[i].selected)
		      {
		        var e = e1.options[i];
		        e2.options.add(new Option(e.text, e.value));
		        e1.remove(i);
		        i=i-1
		      }
		    }
		    document.getElementById('yxzd').value=dcmb.getvalue(document.getElementById('list2'));
		  }
		  catch(e){}
		},
		 getvalue:function(geto)
		{
		  var allvalue = "";
		  for(var i=0;i<geto.options.length;i++)
		  {
		    allvalue +=geto.options[i].value + ",";
		  }
		  return allvalue;
		},
		//添加模板时触发
		submitDcmb:function(){
			var yxzd=$("#yxzd").val();
			var mbmc=$("#dcmb_mbmc").val();
			var bz=$("#dcmb_bz").val();
			var stm=$("#stm").val();
			if(mbmc==""){
				alert("请输入模板名称！");
				return;
			}
			$.post(ctxPath + "/dcmb/dcmbAdd.do", {yxzd:yxzd,mbmc:mbmc,bz:bz,stm:stm}, function(json) {
				$("#dcmb_sql").val(json.sql);
				alert(json.message);
				$.pdialog.closeCurrent();
				navTab.reload(ctxPath + "/dcmb/mblist.do");
			}, "json");
		},
		//编辑模板后点击保存时，触发
		submitDcmbEdit:function(){
			var id=$("#dcmb_id").val();
			var mbmc=$("#dcmb_mbmc").val();
			var yxzd=$("#yxzd").val();
			var bz=$("#dcmb_bz").val();
			var stm=$("#stm").val();
			$.post(ctxPath + "/dcmb/dcmbEdit.do", {yxzd:yxzd,mbmc:mbmc,id:id,bz:bz,stm:stm}, function(json) {
				$("#dcmb_sql").val(json.sql);
				alert(json.message);
				$.pdialog.closeCurrent();
				navTab.reload(ctxPath + "/dcmb/mblist.do");
			}, "json");
		},
		//获取视图的名称及查询视图
		getStm:function(){
			var stm=$("#stm").val();
			$.post(ctxPath + "/dcmb/dcmbStm.do", {stm:stm}, function(json) {
				var list=json.list;
				var res="";
				$("#list1").empty();
				$("#list2").empty();
				for(var i=0;i<list.length;i++){
					res=list[i];
					$("#list1").append("<option value='"+res+"'>"+res+"</option>");
				}
			}, "json");
		}
	};
}();
var fwqgl = function() {
	return {
		initplsc : function() {

		},
		url : function(a) {
			var tds = $(a).parents("tr:first").children();
			var url_ = tds.find("input:text").val();
			if (url_==null&&url_.trim()==''&&!isUrl(url_)) {
				alert("请输入合适的域名或IP地址");
				return;
			}
			var param = {
				jqbh : tds.eq(3).text(),
				url : url_
			};
			ajaxLoad(ctxPath + "/mxsc/edit.do", param, function(json) {
				alertMsg.correct(json.data);
				_$("#fpmxscId").click();
			});
		},
		save : function(a) {
			var tds = $(a).parents("tr:first").children();
			var url_ = tds.find("input:text").val();
			if (url_==null&&url_.trim()==''&&!isUrl(url_)) {
				alert("请输入合适的域名或IP地址");
				return;
			}
			var param = {
				jqbh : tds.eq(3).text(),
				url : url_
			};
			ajaxLoad(ctxPath + "/mxsc/save.do", param, function(json) {
				alertMsg.correct(json.message);
				_$("#fpmxscId").click();
			});
		},
		nsrsbh:function(){
			var nsrsbh_ids="";
			var $box=$.pdialog.getCurrent();
			var sd=$box.find("input:checked").filter("[name='nsrsbh_ids']");
			if(sd.length==0){
				alertMsg.error("请选择信息");
			}else{
				$box.find("input:checked").filter("[name='nsrsbh_ids']").each(function(i){
				var val=$(this).val();
				nsrsbh_ids+=i==0?val:","+val;
				});
				ajaxLoad(ctxPath + "/fptjbydsh/nsrsbh.do?nsrsbh_ids="+nsrsbh_ids, function(json) {
					alertMsg.correct(json.message);
					if(json.statusCode==200){
						var expressCompany = $("#fptj_dsh_fwqxxList");
						 
						var str = '';
						var addFwqxxList = json.addFwqxxList;
						for(var i=0;i<addFwqxxList.length;i++) {
							fwqxx=addFwqxxList[i];
							str += '<option value="'+fwqxx.jqbh+'">'+'纳税人名称：'+fwqxx.kpdwmc+'；税号：'+fwqxx.kpdwdm+'；核心板编号：'+fwqxx.jqbh+'</option>';
						}
						expressCompany.append(str);
					}
				});
				
			}
		},
		removeOption:function(){
			var expressCompany = $("#fptj_dsh_fwqxxList")[0];
			var index=expressCompany.selectedIndex;
			var jqbh=expressCompany.options[index].value;
			ajaxLoad(ctxPath + "/fptjbydsh/removeOption.do?jqbh="+jqbh, function(json) {
				if(json.statusCode==200){
					expressCompany.options.remove(index); 
				}
			});
		},
		removeOptions:function(){
			var expressCompany = $("#fptj_dsh_fwqxxList")[0];
			ajaxLoad(ctxPath + "/fptjbydsh/removeOption.do", function(json) {
				if(json.statusCode==200){
					expressCompany.options.length=1; 
				}
			});
		},
		fwqlxType:function(type){
			if(type=="0"){
				$_('#dkh').val("");
				$_('#dkh').removeAttr("readonly");
				$_('#qybz').show();	
			}else{
				$_('#dkh').val("12368");
				$_('#dkh').attr("readonly", "readonly");
				$_('#qybz').hide();
			}
		},
		ywlxType:function(type){
			if(type=="0"){
				$_('#zcmsq').attr("style", "display:block;");
				$_('#zcmcx').attr("style", "display:none;");
				$_('#zcmgx').attr("style", "display:none;");
				$_('#zcxxcx').attr("style", "display:none;");
				$_('#lxgx').attr("style", "display:none;");
				$_('#zcmxx').hide();
				$_('#zcxx').hide();
				$_('#lxzcmxx').hide();
			}else if(type=="1"){
				$_('#zcmsq').attr("style", "display:none;");
				$_('#zcmcx').attr("style", "display:block;");
				$_('#zcmgx').attr("style", "display:none;");
				$_('#zcxxcx').attr("style", "display:none;");
				$_('#lxgx').attr("style", "display:none;");
				$_('#zcxx').hide();
				$_('#lxzcmxx').hide();
			}else if(type=="2"){
				$_('#zcmsq').attr("style", "display:none;");
				$_('#zcmcx').attr("style", "display:none;");
				$_('#zcmgx').attr("style", "display:none;");
				$_('#zcxxcx').attr("style", "display:block;");
				$_('#lxgx').attr("style", "display:none;");
				$_('#zcmxx').hide();
				$_('#lxzcmxx').hide();
			}else if(type=="3"){
				$_('#zcmsq').attr("style", "display:none;");
				$_('#zcmcx').attr("style", "display:none;");
				$_('#zcmgx').attr("style", "display:none;");
				$_('#zcxxcx').attr("style", "display:none;");
				$_('#lxgx').attr("style", "display:block;");
				$_('#zcmxx').hide();
				$_('#zcxx').hide();
				$_('#lxzcmxx').show();
			}
		},
		zcmcx : function() {
			if (!/^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$/i.test($_("#ipdz").val())) {
				alertMsg.error("请输入合法的IP！");
				return;
			}
			ajaxLoad(ctxPath + "/fwqgl/zcmcx.do",$_("#zcmForm").serialize(), function(json) {
				if(json.statusCode==200){
					$_("#zcm").text(json.zcm);
					$_("#licdate").val(json.licdate);
					$_('#licdate').attr("style", "display:block;");
					$_('#zcm').attr("style", "display:block;");
					$_('#zcmgx').attr("style", "display:block;");
					$_('#zcmxx').show();
				}else{
					alertMsg.correct(json.message);	
				}
			});
		},
		zcxxcx : function() {
			if (!/^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$/i.test($_("#ipdz").val())) {
				alertMsg.error("请输入合法的IP！");
				return;
			}
			ajaxLoad(ctxPath + "/fwqgl/zcxxcx.do",$_("#zcmForm").serialize(), function(json) {
				if(json.statusCode==200){
					$_("#hostname").val(json.hostname);
					$_("#productname").val(json.productname);
					$_("#sn").val(json.sn);
					$_("#uuid").val(json.uuid);
					$_('#zcxx').show();
				}else{
					alertMsg.correct(json.message);	
				}
			});
		},
		lxgx : function() {
			if (!/^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$/i.test($_("#ipdz").val())) {
				alertMsg.error("请输入合法的IP！");
				return;
			}
			if (!/^([A-F0-9]{268,368})$/i.test($_("#lxzcm").val())) {
				alertMsg.error("请输入合法的注册码！");
				return;
			}
			ajaxLoad(ctxPath + "/fwqgl/lxgx.do",$_("#zcmForm").serialize(), function(json) {
				if(json.statusCode==200){
					alertMsg.correct(json.message);
				}else{
					alertMsg.correct(json.message);	
				}
			});
		},
		xgkl:function(){
			var ids="";
			var $box=$.pdialog.getCurrent();
			var sd=$box.find("input:checked").filter("[name='ids']");
			if(sd.length==0){
				alertMsg.error("请选择信息");
			}else{
				$box.find("input:checked").filter("[name='ids']").each(function(i){
				var val=$(this).val();
				ids+=i==0?val:","+val;
				});
				$.pdialog.open(ctxPath + "/fwqgl/toXgkl.do?idsStr="+ids, "fwqgl_xgkl_dlg","修改口令",{width:500,height:160});
			}
		}
	};
}();
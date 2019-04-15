var zzp_fphf=function(){
	return {
		xfdialog:function(){
			var url = ctxPath+"/zzp/sgfphf.do?kpddm="+_$("#kpddm").val();
			$.pdialog.open(url,"fpxf_sgfpxf","手工代码段修复",{
				width:400,
				height:290
			});
		},
		initPage:function(){
			var _this=this;
			if($_("#fplxdm").val()=='026'||$_("#fplxdm").val()=='025'||$_("#fplxdm").val()=='005'||$_("#fplxdm").val()=='006'){
				$_("#fpdm").val("");
				$_("#fpdm").attr("maxlength","12");
			}else{
				$_("#fpdm").attr("maxlength","10");
				$_("#fpdm").val("");
			}
			$_("#fplxdm").bind("change",function(){
				if($_("#fplxdm").val()=='026'||$_("#fplxdm").val()=='025'||$_("#fplxdm").val()=='005'||$_("#fplxdm").val()=='006'){
					$_("#fpdm").val("");
					$_("#fpdm").attr("maxlength","12");
				}else{
					$_("#fpdm").attr("maxlength","10");
					$_("#fpdm").val("");
				}
			});
			$_("#qshm").bind("blur",function(){
				var $_qshm=$_("#qshm").val();
				var $_fpfs=$_("#fpfs").val();		
				$_("#zzhm").val(Number($_qshm)+Number($_fpfs)-1);
			});
			$_("#fpfs").bind("change",function(){
				var $_qshm=$_("#qshm").val();
				var $_fpfs=$_("#fpfs").val();		
				$_("#zzhm").val( Number($_qshm)+Number($_fpfs)-1);				
			});
			
		},
		xfcg:function(json){
			alertMsg.info(json.message);
		}
	
	};
}();
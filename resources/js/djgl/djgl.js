var djgl = function() {
	var cache;
	return {
		djsc : function(json) {
			dialogAjaxDone(json);
			$.pdialog.closeCurrent();
		},
		insertDjzdgl : function(zddmLh) {
			navTab.reload(ctxPath + "/zdpz/zdpz.do?zdlx=2&zddmLh="
					+ zddmLh.val());
		},
		fz : function(zddmLh) {
			var vl=zddmLh.val();
			var tds = $(zddmLh).parents("tr:first").children();
			var idvl = tds.find("input:checkbox")[0].id;
			_$("#"+idvl).val(vl);
		},
		djqkClose : function(json) {
			dialogAjaxDone(json);
			$.pdialog.closeCurrent();
		},
		djqk : function() {
			var qssj1 = $("#djrq_q").val().replaceAll("-","");
			var zzsj1 = $("#djrq_e").val().replaceAll("-","");
			if(parseInt(qssj1)>parseInt(zzsj1)){
					alert('单据起始日期大于了终止日期');
					return;
				}
			$.post(ctxPath + "/djgl/djqk.do", {
				dj_pch : $("#dj_pch").val(),
				djrq_q : $("#djrq_q").val(),
				djrq_e : $("#djrq_e").val()
			}, function(json) {
				dialogAjaxDone(json);
				$.pdialog.closeCurrent();
				navTab.reload(ctxPath + "/djgl/initDjgl.do");
			}, "json");
		},
		djdc : function(json) {
			dialogAjaxDone(json);
			$.pdialog.closeCurrent();
		},
		initPage : function() {
			cache = {};
			$(function() {
//				$("#dj_pch").focus(function() {
//					$.post(ctxPath + "/djgl/queryFppch.do", function(json) {
//						$("#dj_pch").autocomplete(json.message.split("|"));
//					}, "json");
//				});
//				$("#djdc_pch").focus(function() {
//					$.post(ctxPath + "/djgl/queryFppch.do", function(json) {
//						$("#djdc_pch").autocomplete(json.message.split("|"));
//					}, "json");
//				});
				$("#djdc_excel").click(function() {
					var qssj1 = $("#djdc_qssj").val().replaceAll("-","");
					var zzsj1 = $("#djdc_zzsj").val().replaceAll("-","");
					if (!($("#djdc_qssj").val().length == 0)&&!($("#djdc_zzsj").val().length == 0)){
						if(parseInt(qssj1)>parseInt(zzsj1)){
							alert('单据起始日期大于了终止日期');
							return;
						}
					}
					$("#djdc_form").submit();
					$.pdialog.closeCurrent();
				});
				$("#djdc_excelty").click(function() {
					var qssj1 = $("#djdc_qssj").val().replaceAll("-","");
					var zzsj1 = $("#djdc_zzsj").val().replaceAll("-","");
					var kpsjq=$("#djdc_kpsjq").val().replaceAll("-","");
					var kpsjz=$("#djdc_kpsjz").val().replaceAll("-","");
					var mbmc =_$("#djdc_mbmc").val();
					if(!($("#djdc_kpsjq").val().length == 0)&&!($("#djdc_kpsjz").val().length == 0)){
						if(parseInt(kpsjq)>parseInt(kpsjz)){
							alert('开票起始日期大于了终止日期');
							return;
						}
					}
					if (!($("#djdc_qssj").val().length == 0)&&!($("#djdc_zzsj").val().length == 0)){
						if(parseInt(qssj1)>parseInt(zzsj1)){
							alert('单据起始日期大于了终止日期');
							return;
						}
					}
					$("#djdc_form").submit();
					$.pdialog.closeCurrent();
				});
			})
		},
		closeWindow : function() {
			ajaxLoad(ctxPath + "/sys/singleLoginOut.do", "", function() {
				window.opener = null;
				window.open('', '_self');
				window.close();
			});
		},
		mbxz : function() {
			window.location.href=ctxPath+"/resources/download/pldrmb.zip";
		}
	};
}();
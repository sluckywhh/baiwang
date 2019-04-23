var fpcx_tb = function() {
	var cache, fpmx, defaultZbj, defaultYbj;
	return {
		initPage : function() {
			cache = {}, fpmx = null, defaultZbj = 6, defaultYbj = -6,
			disableButtons(_$("#tbzt"));
		},
		preview : function() {
			if (!checkPrint()) {
				return;
			}
		},
		qhzt : function() {
			enableButtons(_$("#tbzt"));
			var fpxxJson = _$(".pageContent table tr td").children(":last")
					.children("span").text();
			fpmx = $.parseJSON(fpxxJson);
		},
		tb : function() {
			_$("#jqbh").val(fpmx.jqbh);
			_$("#qmbz").val(fpmx.qmbz);
			_$("#scbz").val(fpmx.scbz);
			_$("#yqbz").val(fpmx.yqbz);
			_$("#fpzt").val(fpmx.fpzt);
			_$("#zfrq").val(fpmx.zfrq);
			ajaxLoad(ctxPath + "/fpcxtb/tb.do", _$("#fpcxtb_form").serialize(), function(json) {
				alertMsg.correct(json.message);
			})
			
		},
		rzxh : function(fplxdm) {
			if (!checkPrint()) {
				return;
			}
			ajaxLoad(ctxPath + "/dzfp/rzxh.do?fplxdm=" + fplxdm, function(json) {
				printRzxh(json);
			})
		}

	}
}();
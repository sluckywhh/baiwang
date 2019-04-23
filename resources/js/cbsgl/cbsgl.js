var cbsgl = function() {
	return {
		cb : function() {
			var sel = _$(".pageContent table tr td input:checked");
			if (sel.size() == 0) {
				alertMsg.warn("请勾选一条需要抄报的数据！");
				return;
			}
			if (sel.size() >= 2) {
				alertMsg.error("一次仅支持勾选一条抄报数据！");
				return;
			}
			var inputChecked = sel.eq(0).attr("title");
			var jqbh = inputChecked;
			var param = {
				jqbh : jqbh,
				async : true
			};
			alertMsg.info(jqbh + "的核心板抄报开始,请稍等......");
			ajaxLoad(ctxPath + "/cbsgl/autocb.do", param, function(json) {
				alertMsg.info(jqbh + "的核心板抄报结束！");
				_$('form[rel]:first').submit();
			});
			
		}
	};

}();

var sbhzcx = function() {
	return {
		cxtj : function(param) {
			if (param == 1) {
				_$("#cxdy_cxfs").val("0");
				_$("#cxdy_PagerForm").submit();
			} else {
				_$("#cxdy_cxfs").val("1");
				_$("#cxdy_PagerForm").submit();
			}
		}
	};
}();
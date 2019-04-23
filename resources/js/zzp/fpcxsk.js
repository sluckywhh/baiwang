var fpcx_sk = function() {
	var cache, fpmx, defaultZbj, defaultYbj, defaultQDZbj, defaultQDYbj;
	return {
		initPage : function() {
			cache = {}, fpmx = null, defaultZbj = 6, defaultYbj = -6,
					defaultQDZbj = 4, defaultQDYbj = 4.5;
			disableButtons(_$("#ck"));
			disableButtons(_$("#qdck"));
			disableButtons(_$("#tbzt"));
		},
		preview : function() {
			if (!checkPrint()) {
				return;
			}
			this.initYLData();
		},
		qhzt : function() {
			enableButtons(_$("#ck"));
			enableButtons(_$("#tbzt"));
			var fpxxJson = _$(".pageContent table tr td").children(":last")
					.children("span").text();
			fpmx = $.parseJSON(fpxxJson);
			if(fpmx.tspz=='02'){
				var mc=fpmx.ghdwmc;
				fpmx.ghdwmc=fpmx.xhdwmc;
				fpmx.xhdwmc=mc;
				var dm=fpmx.ghdwdm;
				fpmx.ghdwdm=fpmx.xhdwdm;
				fpmx.xhdwdm=dm;
				var dh=fpmx.ghdwdzdh;
				fpmx.ghdwdzdh=fpmx.xhdwdzdh;
				fpmx.xhdwdzdh=dh;
				var zh=fpmx.ghdwyhzh;
				fpmx.ghdwyhzh=fpmx.xhdwyhzh;
				fpmx.xhdwyhzh=zh;
			}
			if (fpmx.qdbz == "1") {
				enableButtons(_$("#qdck"));
			}
		},
		tb : function() {
			_$("#jqbh").val(fpmx.jqbh);
			_$("#qmbz").val(fpmx.qmbz);
			_$("#scbz").val(fpmx.scbz);
			_$("#yqbz").val(fpmx.yqbz);
			_$("#fpzt").val(fpmx.fpzt);
			_$("#zfrq").val(fpmx.zfrq);
			ajaxLoad(ctxPath + "/fpcxsk/tb.do", _$("#fpcxsk_form").serialize(), function(json) {
				alertMsg.correct(json.message);
			})
			
		},
		printfp : function() {
			fpcxsk.initPrintData();
			$.cookie("dyfs") == "1" ? LODOP.PRINTA() : LODOP.PRINT();
		},
		initYLData : function() {
			if (fpmx.fplxdm == "004") {
				this.initPrintDatazp(true);
			} else {
				this.initPrintDatapp(true);
			}
			LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 890, 700, "");
			LODOP.SET_SHOW_MODE("HIDE_PBUTTIN_PREVIEW", 1);
			LODOP.PREVIEW();
		},
		initPrintDatapp : function(yl) {
			LODOP.PRINT_INITA((yl ? defaultZbj : $.cookie("zbj_zzsp") || 0)
					+ "mm", (yl ? defaultYbj : $.cookie("ybj_zzsp") || 0)
					+ "mm", "230mm", "159mm", "增值税普通发票");
			LODOP.SET_PRINT_PAGESIZE(1, 2300, 1590, "CreateCustomPage");
			var fpmxPrint = $.extend({
				fplxdm : "007"
			}, fpmx, {
				jshjdx : je2Upper(fpmx.jshj),
				ewm : fpmx.qmz,
				mxzb : filterMxzbPrint(fpmx)
			});
			printZzspp(fpmxPrint);
		},
		initPrintDatazp : function(yl) {
			LODOP.PRINT_INITA((yl ? defaultZbj : $.cookie("zbj_zzsz") || 0)
					+ "mm", (yl ? defaultYbj : $.cookie("ybj_zzsz") || 0)
					+ "mm", "230mm", "159mm", "增值税专用发票");
			LODOP.SET_PRINT_PAGESIZE(1, 2300, 1590, "CreateCustomPage");
			var fpmxPrint = $.extend({
				fplxdm : "004"
			}, fpmx, {
				jshjdx : je2Upper(fpmx.jshj),
				ewm : fpmx.qmz,
				mxzb : filterMxzbPrint(fpmx)
			});
			printZzszp(fpmxPrint);
		},
		initPrintQDDatazp : function(yl) {
			LODOP.PRINT_INITA(
					(yl ? defaultQDZbj : $.cookie("zbj_qd_zzsz") || 0) + "mm",
					(yl ? defaultQDYbj : $.cookie("ybj_qd_zzsz") || 0) + "mm",
					775, 959, "增值税专用发票（清单）");
			var fpmxPrint = $.extend({
				fplxdm : "004"
			}, fpmx, {
				mxzb : filterMxzbQDPrint(fpmx)
			});
			printZzszpQD(fpmxPrint);
		},
		initPrintQDDatapp : function(yl) {
			LODOP.PRINT_INITA(
					(yl ? defaultQDZbj : $.cookie("zbj_qd_zzsp") || 0) + "mm",
					(yl ? defaultQDYbj : $.cookie("ybj_qd_zzsp") || 0) + "mm",
					775, 959, "增值税普通发票（清单）");
			var fpmxPrint = $.extend({
				fplxdm : "007"
			}, fpmx, {
				mxzb : filterMxzbQDPrint(fpmx)
			});
			printZzsppQD(fpmxPrint);
		},
		initYLQDData : function() {
			if (!checkPrint()) {
				return;
			}
			if (fpmx.fplxdm == "004") {
				this.initPrintQDDatazp(true);
			} else {
				this.initPrintQDDatapp(true);
			}
			LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 850, 750, "");
			LODOP.SET_SHOW_MODE("HIDE_PBUTTIN_PREVIEW", 1);
			LODOP.PREVIEW();

		},
		rzxh : function(fplxdm) {
			if (!checkPrint()) {
				return;
			}
			ajaxLoad(ctxPath + "/zzp/rzxh.do?fplxdm=" + fplxdm, function(json) {
				printRzxh(json);
			})
		}

	}
}();
var bspff = function() {
	return {
		// 页面初始化调用initPageg该方法
		initPage : function() {
			try {
				var result = signOCX.OperateDiskX("BSPFPCX", "test");
			} catch (e) {
				alertMsg.confirm("您没有安装税控服务器组件接口，将为您转到下载页面！", {
					okCall : function() {
						window.open(ctxPath + "/resources/download/kpkj.EXE");
					}
				});
				disableButtons(_$("#bspfpcxId"));
				return;
			}
			// 检查版本号
			checkSignOCXVersion();
		},
		// 报税盘查询
		readBsp : function() {
			var requestxml = _$("#requestXmlId").val();
			// alert("打印出"+requestxml);
			if (_$("#bspklId").val() == "") {
				alertMsg.warn("请输入报税盘口令！");
				return;
			}
			if (_$("#f_fplxdmId").val() == "") {
				alertMsg.warn("请选择发票类型代码！");
				return;
			}
			if (requestxml == "failed") {
				alert("获取抄报数据失败！");
				return;
			}
			var param = {
				bspkl : _$("#bspklId").val(),
				fplxdm : _$("#f_fplxdmId").val(),
				ffresult : _$("#ffresultid").val(),
				async : false
			}
			ajaxLoad(ctxPath + "/bspfpff/requestXml.do", param, function(json) {
				_$("#ffresultid").val(json.ffresult);
				// alert(json.requestXml);
				var result = signOCX.OperateDiskX("BSPFPCX", json.requestXml);
				// alert("报税盘返回："+result);
				_$("#responseXmlId").val(result);
			});

		},
		// 报税盘分发，拼接报税盘分发报文
		fpff : function(a) {
			var tds = $(a).parents("tr:first").children();
			var param = {
				bspkl : _$("#bspklId").val(),
				fplxdm : _$("#f_fplxdmId").val(),
				fpdm : tds.eq(0).text(),
				qshm : tds.eq(1).text(),
				zzhm : tds.eq(2).text(),
				fpfs : tds.eq(3).text(),
				lgrq : tds.eq(4).text(),
				fffs : tds.find("input:text").val(),
				ffresult : "true"
			}
			if (tds.find("input:text").val() == "") {
				alertMsg.warn("请输入发票分发份数！");
				return;
			}
			var fpfs = tds.find("input:text").val();
			var fffs = param.fpfs;
			// alert("输入份数"+tds.find("input:text").val());
			// alert("发票份数"+param.fpfs);
			if (parseInt(fffs) < parseInt(fpfs)) {
				alertMsg.warn("分发份数不能大于现有发票份数！");
				return;
			}
			var tr = $(a).parent().parent();
			alertMsg.confirm("确认分发?", {
				okCall : function() {
					ajaxLoad(ctxPath + "/bspfpff/fpff.do", param,
							function(json) {
								// alert(json.ffresult);
								_$("#ffresultid").val(json.ffresult);
								// alert(_$("#ffresultid").val());
								var a = json.fpffXml;
								bspff.ffBspResult(json.fpffXml);
							});

				}
			});
		},
		// 分发报文跟税控盘交互
		ffBspResult : function(fpffXmll) {
			var fpffXml = fpffXmll;
			var result = signOCX.OperateDiskX("BSPFPFF", fpffXml);
			var param = {
				resultXml : result
			}
			_$("resultXmlId").val(result);
			ajaxLoad(ctxPath + "/bspfpff/resultBspff.do", param,
					function(json) {
						if (0 == json.returncode) {
							alertMsg.correct(json.returnmsg);
							_$("#ffresultid").val("true");
							_$("#bspfpcxId").click();
						}

					});
		}

	}
}();
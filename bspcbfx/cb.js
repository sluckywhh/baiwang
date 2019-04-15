var cbbsp = function() {
	return {
		initPage : function() {
			try {
				var result = signOCX.OperateDiskX("BSPFPCX", "test");
			} catch (e) {
				alertMsg.confirm("您没有安装税控服务器组件接口，将为您转到下载页面！", {
					okCall : function() {
						window.open(ctxPath + "/resources/download/kpkj.EXE");
					}
				});
				disableButtons(_$("#bspcxzzId"));
				disableButtons(_$("#bspcxhyId"));
				return;
			}
			
			// 检查控件的版本号
			if (!checkSignOCXVersion()) {
				return;
			}
			var csszXML = _$("#csszid").val();
			// alert("发送报文"+csszXML);
			var result = signOCX.OperateDiskX("CSSZ", csszXML);
			// alert("报税盘反会结果"+result);
			_$("#csszResultXMLId").val(result);

			var param = {
				csszResultXML : result
			}
			ajaxLoad(ctxPath + "/Cbsj/csszResule.do", param);

		},
		cbForBsp : function() {
			var table = _$(".pageContent .gridTbody table :first");
			var trs = table.find("tr");
			if (_$("#bspklId").val() == "") {
				alertMsg.warn("请输入报税盘口令！");
				return;
			}
			trs.each(function(i, n) {
				var tds = $(n).children();
				var param = {
					bspkl : _$("#bspklId").val(),
					fplxdm : tds.eq(0).text(),
					kpjzrq : tds.eq(1).text(),
					bsqsrq : tds.eq(2).text(),
					bsjzrq : tds.eq(3).text(),
					zxbsrq : tds.eq(4).text(),
					dqsz:tds.eq(5).text()
				}

				if (param.fplxdm == 004 || param.fplxdm == 007) {
					ajaxLoad(ctxPath + "/Cbsj/montageXML.do", param, function(
							json) {
						cbbsp.cbHyForBsp(json.requestXml, param.fplxdm,
								param.bsqsrq, param.bsjzrq,param.dqsz);
					});
				}

			});

		},
		hycb : function(bt) {
			if (_$("#bspklId").val() == "") {
				alertMsg.warn("请输入报税盘口令！");
				return;
			}
			var tds = $(bt).parents("tr:first").children();
			var param = {
				bspkl : _$("#bspklId").val(),
				fplxdm : tds.eq(0).text()
			}
			ajaxLoad(ctxPath + "/Cbsj/montageXML.do", param, function(json) {
				cbbsp.cbHyForBsp(json.requestXml, param.fplxdm);
			})
		},
		cbHyForBsp : function(args, fplxdm, bsqsrq, bsjzrq,dqsz) {
			if (args == null)
				return;
			var result = signOCX.OperateDiskX("SJCB", args);
			var param = {
				resultFplxdm : fplxdm,
				resultbspXML : result,
				bsqsrq : bsqsrq,
				bsjzrq : bsjzrq,
				dqsz:dqsz,
				async : false
			}
			ajaxLoad(ctxPath + "/Cbsj/resultTjxx.do", param, function(json) {

			});
			// alert("result"+result);
			var rxml = $($.parseXML(result));
			var returncode = rxml.find("returncode").text();
			// alert("returncoded"+returncode);
			var returnmsg = rxml.find("returnmsg").text();
			// alert("returnmsgd"+returnmsg);
			if (returncode == '0') {
				alert("抄报结果:发票类型" + fplxdm + returnmsg);
			} else {
				alert("抄报结果:发票类型" + fplxdm + ",错误代码:" + returncode + ","
						+ returnmsg);
			}

		}
	};
}();
var wscb = function() {
	return {
		initPage : function() {
			var param = {
				async : false
			};
			ajaxLoad(ctxPath + "/Cbsjd/initBtn.do", param, function(json) {
				for ( var i = 0; i < json.msg.length; i++) {
					var fplx = json.msg[i].fplxdm;
					var zt = json.msg[i].btnzt;
					var table = $("#wscbId").find("table");
					var trs = table.find("tr");
					trs.each(function(i, n) {
						var tds = $(n).children();
						var fpdmmc = tds.eq(0).text();
						if ("发票代码" != fpdmmc) {
							var fplxTitle = tds.eq(0).attr("title");
							if (fplx == fplxTitle && fplxTitle != undefined
									&& "0" == zt) {
								// $("#hyxxid").find("table").find(".buttonContent").find("button").attr("disabled","disabled");
								 tds.find(".button").attr("class",
								 "buttonDisabled");
								 tds.find("button").attr("disabled",
								 "disabled");
								return;
							}
							;
						}
						;
					});

				}
				// if(lls!="" && llq!="" && lls!=undefined && llq!=undefined){
				// var sbtnzt = lls.btnzt;
				// var qbtnzt = llq.btnzt;
				// if("0"==sbtnzt && "0"==qbtnzt){
				// disableButtons(_$("#bspcxzzId"));
				// }
				// }
			});

		},
		hzcb : function(bt) {
			var tds = $(bt).parents("tr:first").children();
//			var scyq = false;
			var param = {
				fplxdm : tds.eq(0).attr("title"),
				kfpzsj : tds.eq(1).text(),
				bsqsrq : tds.eq(2).text(),
				bszzrq : tds.eq(3).text(),
				zxbsrq : tds.eq(4).text(),
				dqsz : tds.eq(5).text(),
//				async : false
			};
			ajaxLoad(ctxPath + "/wscb/cbhz.do", param, function(json) {
				alertMsg.correct(json.message);
			});
//			// 查询数据库发票明细表发票是否上传完毕
//			ajaxLoad(ctxPath + "/wscb/fpmxwscbcx.do", param, function(json) {
//				var scbzSize = json.scbzSize;
//				var yqbzSize = json.yqbzSize;
//				if (scbzSize != 0 && yqbzSize != 0) {
//					var scfpdm = json.scfpdm;
//					var scfphm = json.scfphm;
//					var yqfpdm = json.yqfpdm;
//					var yqfphm = json.yqfphm;
////					alert(scfphm);
//					if (0 < (scbzSize * 1) && 0 < (yqbzSize * 1)) {
//						alert(param.fplxdm + "发票明细，还有" + scbzSize
//								+ "张未上传,第一张未上传发票代码:" + scfpdm + "发票号码:" + scfphm
//								+ "," + yqbzSize + "张未验签成功,第一张未验签成功的发票代码:"
//								+ yqfpdm + "发票号码:" + yqfphm + "。");
//					}
//				}
//
//				if (yqbzSize == 0 && scbzSize != 0) {
//					var scfpdm = json.scfpdm;
//					var scfphm = json.scfphm;
//					if (0 < (scbzSize * 1)) {
//						alert(param.fplxdm + "发票明细，还有" + scbzSize
//								+ "张未上传，第一张未上传发票代码:" + scfpdm + "发票号码:" + scfphm
//								+ "," + "请确认该发票类型的发票明细全部成功上传税务机关才能抄报汇总数据 。");
//					}
//				}
//				if (scbzSize == 0 && yqbzSize != 0) {
//					var yqfpdm = json.yqfpdm;
//					var yqfphm = json.yqfphm;
//					if (0 < (yqbzSize * 1)) {
//						alert(param.fplxdm + "发票明细，还有" + yqbzSize
//								+ "张未验签成功,第一张未验签成功的发票代码:" + yqfpdm + "发票号码:"
//								+ yqfphm + "。");
//					}
//				}
//				if (scbzSize == 0 && yqbzSize == 0) {
//					scyq = true;
////					//alert(scyq);
//				}
//			});
			//alert(scyq);
//			if (scyq == true) {
				//alert("3");
//				ajaxLoad(ctxPath + "/wscb/cbhz.do", param, function(json) {
//					alertMsg.correct(json.message);
//				});
//			}

		},
		fxjksj : function(bt) {
			var tds = $(bt).parents("tr:first").children();
			var param = {
				fplxdm : tds.eq(0).attr("title"),
				kfpzsj : tds.eq(1).text(),
				bsqsrq : tds.eq(2).text(),
				bszzrq : tds.eq(3).text(),
				zxbsrq : tds.eq(4).text(),
				dqsz : tds.eq(5).text()
			};
			ajaxLoad(ctxPath + "/wscb/fx.do", param, function(json) {
				alertMsg.correct(json.message)
			});
		}

	}
}();

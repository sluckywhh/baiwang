var pldyfp = function() {
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
				return;
			}
			// 检查控件的版本号
			checkSignOCXVersion();
		},
		pldy : function() {
			var csszXML;
			if (_$("#skysklId").val() == "") {
				alertMsg.warn("请输入税控钥匙口令！");
				return;
			}
			var sel1 = _$(".pageContent table tr td input:checked");
			if (sel1.size() == 0) {
				alertMsg.warn("请勾选一条打印数据！");
				return;
			}
			var inputChecked1 = sel1.eq(0).attr("title");
			var fpdmFphm1 = inputChecked1.split("_");
			var fpdm1 = fpdmFphm1[0];
			var fphm1 = fpdmFphm1[1];
			alertMsg
					.confirm(
							"打印第一份发票代码：" + fpdm1 + ",发票号码：" + fphm1 + ",打印份数："
									+ sel1.size(),
							{
								okCall : function() {
									var xy = location.protocol;// 获取协议名称
									var dkh = location.port;// 获取端口号
									var hostname = location.hostname;// ip地址
									if (dkh == "") {
										if ("http:" == xy) {
											dkh = "80";
										}
										if ("https:" == xy) {
											dkh = "443";
										}
									}
									var param = {
										skyskl : _$("#skysklId").val(),
										dkh : dkh,
										hostname : hostname,
										async : false
									}

									ajaxLoad(
											ctxPath + "/pldyfp/csszPldy.do",
											param,
											function(json) {
												var index = json.csszXML
														.indexOf("</servletport>") + 14;
												var Xml = json.csszXML
														.substring(0, index)
														+ "<keypwd>"
														+ _$("#skysklId").val()
														+ "</keypwd>"
														+ json.csszXML
																.substring(
																		index,
																		json.csszXML.length);
												csszXML = Xml;

											});
									// alert(csszXML);
									var result = sk.Operate(csszXML);
									// alert(result);
									var rxml = $($.parseXML(result));
									var returncode = rxml.find("returncode")
											.text();
									// alert("returncode"+returncode);
									var returnmsg = rxml.find("returnmsg")
											.text();
									if (returncode != '0') {
										alertMsg.warn("参数设置结果:" + returncode
												+ returnmsg);
										return;
									}
									var sel = _$(".pageContent table tr td input:checked");
									for (var i = 0; i < sel.size(); i++) {
										var inputChecked = sel.eq(i).attr(
												"title");
										var fpdmFphm = inputChecked.split("_");
										var fpdm = fpdmFphm[0];
										var fphm = fpdmFphm[1];
										if (i >= 1) {
											var fhm = _$("#hm").val();
											var fhm1 = fhm - 1;
											fhm1 = fhm1 + "";
											if (fhm1.length == 7) {
												fhm1 = "0" + fhm1;
												fhm = "0" + fhm;
											} else if (fhm1.length == 6) {
												fhm1 = "00" + fhm1;
												fhm = "00" + fhm;
											} else if (fhm1.length == 5) {
												fhm1 = "000" + fhm1;
												fhm = "000" + fhm;
											} else if (fhm1.length == 4) {
												fhm1 = "0000" + fhm1;
												fhm = "0000" + fhm;
											} else if (fhm1.length == 3) {
												fhm1 = "00000" + fhm1;
												fhm = "00000" + fhm;
											} else if (fhm1.length == 2) {
												fhm1 = "000000" + fhm1;
												fhm = "000000" + fhm;
											} else if (fhm1.length == 1) {
												fhm1 = "0000000" + fhm1;
												fhm = "0000000" + fhm;
											}
											if (fphm != fhm) {
												var a = confirm("发票号码为" + fhm1
														+ "的发票出现断号是否继续打印发票号码为"
														+ fphm + "的发票！");
												if (a == true) {
												}
												if (a == false) {
													_$('form[rel]:first')
															.submit();
													return;
												}
											}
										}
										var param = {
											fplxdm : _$("#fplxdm_id").val(),
											fpdm : fpdm,
											fphm : fphm,
											dylx : _$("#dylx").val(),
											async : false
										}
										var dyfpXML;
										ajaxLoad(ctxPath
												+ "/pldyfp/pjfpdybw.do", param,
												function(json) {
													dyfpXML = json.dyfpXML;
												});
										// alert(dyfpXML);
										var result = sk.Operate(dyfpXML);
										// alert(result);
										var rxml = $($.parseXML(result));
										var returncode = rxml
												.find("returncode").text();
										var returnmsg = rxml.find("returnmsg")
												.text();
										var fplxdm = _$("#fplxdm_id").val();
										var param1 = {
											fplxdm : fplxdm,
											fpdm : fpdm,
											fphm : fphm,
											returncode : returncode,
											async : false
										}
										ajaxLoad(ctxPath + "/pldyfp/dybz.do",
												param1, function(json) {
												});
										if (returncode != '0') {
											alertMsg.warn("打印出现问题:"
													+ returncode + returnmsg);
											return;
										}
										var hm = parseInt(fphm, 10) + 1;
										_$("#hm").attr("value", hm);
									}
									_$('form[rel]:first').submit();
								}
							});

			// navTab.reload();
		},
		// 刷新下面列表
		changTable : function() {
			// navTab.reload();
			ajaxLoad(ctxPath + '/pldyfp/pldyfpInit.do', function() {

			})
		},
		fpzf : function() {
			var sel = _$(".pageContent table tr td input:checked");
			if (sel.size() >= 2) {
				alertMsg.error("仅支持单张作废！");
			} else {
				if (sel.size() == 0) {
					alertMsg.error("请勾选要作废的发票！");
				} else {
					alertMsg
							.confirm(
									"确定作废此发票？",
									{
										okCall : function() {
											if (!checkKey()) {
												return;
											}
											checkPerm(function() {
												var id = _$(
														".pageContent table tr td input:checked")
														.attr("rel");
												ajaxLoad(
														ctxPath
																+ "/pldyfp/fpzf.do?id="
																+ id,
														function(json) {
															if (json.statusCode == DWZ.statusCode.ok) {
																_$(
																		"#pldyfp_form_id")
																		.submit();
																alertMsg
																		.info("发票作废成功");
															}
														});
											});

										}
									});
				}
			}

		},

		zfck : function() {
			var sel = _$(".pageContent table tr td input:checked");
			if (sel.size() >= 2) {
				alertMsg.error("仅支持单张作废重开！");
			} else {
				if (sel.size() == 0) {
					alertMsg.error("请勾选要作废重开的发票！");
				} else {
					alertMsg
							.confirm(
									"确定作废重开此发票？",
									{
										okCall : function() {
											if (!checkKey()) {
												return;
											}
											checkPerm(function() {
												var id = _$(
														".pageContent table tr td input:checked")
														.attr("rel");
												ajaxLoad(
														ctxPath
																+ "/pldyfp/zfck.do?id="
																+ id,
														function(json) {
															if (json.statusCode == DWZ.statusCode.ok) {
																_$(
																		"#pldyfp_form_id")
																		.submit();
																alertMsg
																		.info(json.message);
																return;
															}
														});
											});

										}
									});
				}
			}

		},

		pfpzf : function() {
			var sel = _$(".pageContent table tr td input:checked");
			if (sel.size() >= 2) {
				alertMsg.error("仅支持单张作废！");
			} else {
				if (sel.size() == 0) {
					alertMsg.error("请勾选要作废的发票！");
				} else {
					alertMsg
							.confirm(
									"确定作废此发票？",
									{
										okCall : function() {
											if (!checkKey()) {
												return;
											}
											checkPerm(function() {
												var id = _$(
														".pageContent table tr td input:checked")
														.attr("rel");
												ajaxLoad(
														ctxPath
																+ "/pldyfp/pfpzf.do?id="
																+ id,
														function(json) {
															if (json.statusCode == DWZ.statusCode.ok) {
																_$(
																		"#pldyfp_form_id")
																		.submit();
																alertMsg
																		.info("发票作废成功");
															}
														});
											});

										}
									});
				}
			}

		},
		pzfck : function() {
			var sel = _$(".pageContent table tr td input:checked");
			if (sel.size() >= 2) {
				alertMsg.error("仅支持单张作废重开！");
			} else {
				if (sel.size() == 0) {
					alertMsg.error("请勾选要作废重开的发票！");
				} else {
					alertMsg
							.confirm(
									"确定作废重开此发票？",
									{
										okCall : function() {
											if (!checkKey()) {
												return;
											}
											checkPerm(function() {
												var id = _$(
														".pageContent table tr td input:checked")
														.attr("rel");
												ajaxLoad(
														ctxPath
																+ "/pldyfp/pzfck.do?id="
																+ id,
														function(json) {
															if (json.statusCode == DWZ.statusCode.ok) {
																_$(
																		"#pldyfp_form_id")
																		.submit();
																alertMsg
																		.info(json.message);
																return;
															}
														});
											});

										}
									});
				}
			}

		},

		jfpzf : function() {
			var sel = _$(".pageContent table tr td input:checked");
			if (sel.size() >= 2) {
				alertMsg.error("仅支持单张作废！");
			} else {
				if (sel.size() == 0) {
					alertMsg.error("请勾选要作废的发票！");
				} else {
					alertMsg
							.confirm(
									"确定作废此发票？",
									{
										okCall : function() {
											if (!checkKey()) {
												return;
											}
											checkPerm(function() {
												var id = _$(
														".pageContent table tr td input:checked")
														.attr("rel");
												ajaxLoad(
														ctxPath
																+ "/pldyfp/jfpzf.do?id="
																+ id,
														function(json) {
															if (json.statusCode == DWZ.statusCode.ok) {
																_$(
																		"#pldyfp_form_id")
																		.submit();
																alertMsg
																		.info("发票作废成功");
															}
														});
											});

										}
									});
				}
			}

		},
		jzfck : function() {
			var sel = _$(".pageContent table tr td input:checked");
			if (sel.size() >= 2) {
				alertMsg.error("仅支持单张作废重开！");
			} else {
				if (sel.size() == 0) {
					alertMsg.error("请勾选要作废重开的发票！");
				} else {
					alertMsg
							.confirm(
									"确定作废重开此发票？",
									{
										okCall : function() {
											if (!checkKey()) {
												return;
											}
											checkPerm(function() {
												var id = _$(
														".pageContent table tr td input:checked")
														.attr("rel");
												ajaxLoad(
														ctxPath
																+ "/pldyfp/jzfck.do?id="
																+ id,
														function(json) {
															if (json.statusCode == DWZ.statusCode.ok) {
																_$(
																		"#pldyfp_form_id")
																		.submit();
																alertMsg
																		.info(json.message);
																return;
															}
														});
											});

										}
									});
				}
			}

		},

		jdcfpzf : function() {
			var sel = _$(".pageContent table tr td input:checked");
			if (sel.size() >= 2) {
				alertMsg.error("仅支持单张作废！");
			} else {
				if (sel.size() == 0) {
					alertMsg.error("请勾选要作废的发票！");
				} else {
					alertMsg
							.confirm(
									"确定作废此发票？",
									{
										okCall : function() {
											if (!checkKey()) {
												return;
											}
											checkPerm(function() {
												var id = _$(
														".pageContent table tr td input:checked")
														.attr("rel");
												ajaxLoad(
														ctxPath
																+ "/pldyfp/jdcfpzf.do?id="
																+ id,
														function(json) {
															if (json.statusCode == DWZ.statusCode.ok) {
																_$(
																		"#pldyfp_form_id")
																		.submit();
																alertMsg
																		.info("发票作废成功");
															}
														});
											});

										}
									});
				}
			}

		},
		jdczfck : function() {
			var sel = _$(".pageContent table tr td input:checked");
			if (sel.size() >= 2) {
				alertMsg.error("仅支持单张作废重开！");
			} else {
				if (sel.size() == 0) {
					alertMsg.error("请勾选要作废重开的发票！");
				} else {
					alertMsg
							.confirm(
									"确定作废重开此发票？",
									{
										okCall : function() {
											if (!checkKey()) {
												return;
											}
											checkPerm(function() {
												var id = _$(
														".pageContent table tr td input:checked")
														.attr("rel");
												ajaxLoad(
														ctxPath
																+ "/pldyfp/jdczfck.do?id="
																+ id,
														function(json) {
															if (json.statusCode == DWZ.statusCode.ok) {
																_$(
																		"#pldyfp_form_id")
																		.submit();
																alertMsg
																		.info(json.message);
																return;
															}
														});
											});

										}
									});
				}
			}

		},

		escfpzf : function() {
			var sel = _$(".pageContent table tr td input:checked");
			if (sel.size() >= 2) {
				alertMsg.error("仅支持单张作废！");
			} else {
				if (sel.size() == 0) {
					alertMsg.error("请勾选要作废的发票！");
				} else {
					alertMsg
							.confirm(
									"确定作废此发票？",
									{
										okCall : function() {
											if (!checkKey()) {
												return;
											}
											checkPerm(function() {
												var id = _$(
														".pageContent table tr td input:checked")
														.attr("rel");
												ajaxLoad(
														ctxPath
																+ "/pldyfp/escfpzf.do?id="
																+ id,
														function(json) {
															if (json.statusCode == DWZ.statusCode.ok) {
																_$(
																		"#pldyfp_form_id")
																		.submit();
																alertMsg
																		.info("发票作废成功");
															}
														});
											});

										}
									});
				}
			}

		},
		esczfck : function() {
			var sel = _$(".pageContent table tr td input:checked");
			if (sel.size() >= 2) {
				alertMsg.error("仅支持单张作废重开！");
			} else {
				if (sel.size() == 0) {
					alertMsg.error("请勾选要作废重开的发票！");
				} else {
					alertMsg
							.confirm(
									"确定作废重开此发票？",
									{
										okCall : function() {
											if (!checkKey()) {
												return;
											}
											checkPerm(function() {
												var id = _$(
														".pageContent table tr td input:checked")
														.attr("rel");
												ajaxLoad(
														ctxPath
																+ "/pldyfp/esczfck.do?id="
																+ id,
														function(json) {
															if (json.statusCode == DWZ.statusCode.ok) {
																_$(
																		"#pldyfp_form_id")
																		.submit();
																alertMsg
																		.info(json.message);
																return;
															}
														});
											});

										}
									});
				}
			}

		},
		
		ybjsz : function() {
			$.pdialog.open(ctxPath + "/pldyfp/ybjym.do", "ybjsz_id", "页边距设置", {
				width : 450,
				height : 250,
				callback : function() {
					$("#bc_id").bind("click", pldyfp.szybjz);
				}
			});

		},
		szybjz : function() {

			var param = {
				fplxdm : $("#fplxdmid").val(),
				sbj : $("#zbj_id").val(),
				zbj : $("#ybj_id").val(),
				async : false
			}

			var tzybjXML;
			ajaxLoad(ctxPath + "/pldyfp/tzybj.do", param, function(json) {
				tzybjXML = json.tzybjXML;
			});
			// alert(tzybjXML);
			var result = sk.Operate(tzybjXML);
			// alert(result);
			var rxml = $($.parseXML(result));
			var returncode = rxml.find("returncode").text();
			// alert("returncode"+returncode);
			alert("您设置的\n上边距为:" + $("#zbj_id").val() + "mm" + "\n左边距为:"
					+ $("#ybj_id").val() + "mm");
			$.pdialog.close("ybjsz_id");
		},
		dmxqddy : function() {
			if (!$.PRINT) {
				$.PRINT = document.getElementById("sk");
			}
			var sel1 = _$(".pageContent table tr td input:checked");
			if (sel1.size() == 0) {
				alertMsg.warn("请勾选一条打印数据！");
				return;
			} else {
				for (var i = 0; i < sel1.size(); i++) {
					var inputChecked1 = sel1.eq(i).attr("title");
					var qdbz = inputChecked1.split("_")[2];
					if (qdbz == '1') {
						var id = sel1.eq(i).attr("rel");
						if (_$("#fplxdm_id").val() == 004) {
							ajaxLoad(ctxPath + "/zzp/oneDetail.do?id=" + id, {
								async : false
							}, function(json) {
								ocxPrint($.extend({
									fplxdm : "004",
									dylx : "1"
								}, json));
							})
						} else if (_$("#fplxdm_id").val() == 007) {
							ajaxLoad(ctxPath + "/zzspp/oneDetail.do?id=" + id,
									{
										async : false
									}, function(json) {
										ocxPrint($.extend({
											fplxdm : "007",
											dylx : "1"
										}, json));
									})

						} else {
							alertMsg.warn("该票种不支持清单打印！");
						}
					}
				}
			}
			// var fpmx='';
			// var id='b86e203a-b55c-4320-bef1-9281814d2b5a';
			// ajaxLoad(ctxPath + "/zzp/oneDetail.do?id=" + id, {
			// async : false
			// }, function(json) {
			// console.log(json);
			// alert(json.id);
			// ocxPrint($.extend({fplxdm:"004",dylx:"1"},json));
			// });
			// //

		}
	}
}();

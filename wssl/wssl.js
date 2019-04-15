var wssl = function() {

	var maxRowIndex;
	return {
		openWsslDlg : function() {
			var url = ctxPath + "/wssl/wsslDlg.do?";
			$.pdialog.open(url, "wssl_dlg", "申领", {
						width : 380,
						height : 450
					});
		},
		showDetail : function(tr) {
			var tbody = _$("#sldetail").empty();
			$(tr).find(">td:last span").each(function() {
				tbody.append("<tr>" + $(this).html().replaceAll("span", "td")
						+ "</tr>");
			});
		},
		showFpjxx : function(json) {
			var _this = this;
			// 显示提示信息
			dialogAjaxDone(json);
			if (json.statusCode == "200") {
				// 关闭对话框
				$.pdialog.closeCurrent();
				// 刷新页面更新结果回执
			}
		},

		showDetails1 : function() {
			$("#yjsm").hide();
			$("#yhxy").attr("checked", false);
			enableButtons($("#sl_bt"));
			$("#sjr").hide();
			$("#sjdz").hide();
			$("#yddh").hide();
			$("#gddh").hide();
			$("#yb").hide();
		},
		showDetails2 : function() {
			$("#sjr").show();
			$("#sjdz").show();
			$("#yddh").show();
			$("#gddh").show();
			$("#yb").show();
			$("#yjsm").show();
			disableButtons($("#sl_bt"));
		},
		showDetails3 : function() {
			if ($("#yhxy").prop("checked")) {
				enableButtons($("#sl_bt"));
			} else {
				disableButtons($("#sl_bt"));
			}
		},
		showDetails4 : function() {
			var sjrstr = $("#sjrxm").val();
			// var yddh = sjrModel.getYddh();
			var array = new Array();
			array = sjrstr.split(",");
			var i = 0;
			var sjdz = array[i++];
			var yddh = array[i++];
			var gddh = array[i++];
			var yb = array[i++];
			$("#_sjdz").val(sjdz);
			$("#_yddh").val(yddh);
			$("#_gddh").val(gddh);
			$("#_yb").val(yb);
		},
		showDetails5 : function() {
			// var zjlx = $("#jbrxx").find("option:selected").attr("zjlx");
			var zjhm = $("#jbrxx").find("option:selected").attr("zjhm");
			// $("#zjlx").find("option[value='"
			// +zjlx+"']").attr("selected",true);
			$("#zjhm").val(zjhm);

		},

		// 增加行
		addRow : function() {

			/* alert("fpdm"+"="+$("#fpdm").val()+","+"qshm"+"="+$("#qshm").val()+","+"zzhm"+"="+$("#zzhm").val()); */

			maxRowIndex++;
			var newLine = "<tr id='option"
					+ maxRowIndex
					+ "' name='option"
					+ maxRowIndex
					+ "'><td>"
					+ maxRowIndex
					+ "</td>"
					+ "<td><input id='fpdm_"
					+ maxRowIndex
					+ "' name='fpdm' maxlength='12' onkeyup='value=value.replace(/[^\\d]/g,"
					+ '""'
					+ ")' class='required' style='width:80px ; '/></td>"
					+ "<td><input id='qshm_"
					+ maxRowIndex
					+ "' name='qshm' maxlength='8' onkeyup='value=value.replace(/[^\\d]/g,"
					+ '""'
					+ ")' class='required' style='width:60px;   '/></td>"
					+ "<td><input id='zzhm_"
					+ maxRowIndex
					+ "' name='zzhm' maxlength='8' onkeyup='value=value.replace(/[^\\d]/g,"
					+ '""'
					+ ")' class='required' style='width:60px;   '/></td>"
					+ "<td><input id='fpsl_"
					+ maxRowIndex
					+ "' name='fpsl' maxlength='8' onkeyup='value=value.replace(/[^\\d]/g,"
					+ '""'
					+ ")' class='required' style='width:60px;   '/></td></tr>";
			$("#fyxmdiv").append(newLine);
		},
		delRow : function() {
			if (maxRowIndex > 1) {
				$("#option" + maxRowIndex).remove();
				maxRowIndex--;
			}
		},
		jy : function() {

			for (var i = 1; i <= maxRowIndex; i++) {
				var a = $("#fpdm_" + i).val();
				var b = $("#qshm_" + i).val();
				var c = $("#zzhm_" + i).val();
				var d = $("#fpsl_" + i).val();

				if (i == maxRowIndex) {
					if (a == "") {
						alert("所有字段不能为空！请填写此信息");
						$("#fpdm_" + i).focus();
						return false;
					} else if (b == "") {
						alert("所有数据不能为空！请填写此信息");
						$("#qshm_" + i).focus();
						return false;
					} else if (c == "") {
						alert("所有字段不能为空！请填写此信息");
						$("#zzhm_" + i).focus();
						return false;
					} else if (d == "") {
						alert("所有字段不能为空！请填写此信息");
						$("#fpsl_" + i).focus();
						return false;
					} else {
						$("#qwe").submit();
					}

				} else {
					if (a == "") {
						alert("所有字段不能为空！请填写此信息");
						$("#fpdm_" + i).focus();
						return false;
					} else if (b == "") {
						alert("所有字段不能为空！请填写此信息");
						$("#qshm_" + i).focus();
						return false;
					} else if (c == "") {
						alert("所有字段不能为空！请填写此信息");
						$("#zzhm_" + i).focus();
						return false;
					} else if (d == "") {
						alert("所有字段不能为空！请填写此信息");
						$("#fpsl_" + i).focus();
						return false;
					}
				}
			}
		},
		querySljg : function() {
			var fplx_dm = $("#fplx_dm2").val();
			$("#fpzl_dm").find("option[flag='zzz']").remove();
			if (fplx_dm) {
				ajaxLoad(ctxPath + "/wssl/cxSlz.do?fplx_dm=" + fplx_dm, {
							async : false 
						}, function(json) {
							var fpzlList = json.fpzlList;
							for (var i = 0; i < fpzlList.length; i++) {
								if (fplx_dm == "025" || fplx_dm == "026"
										|| fplx_dm == "005" || fplx_dm == "009") {
									$("#fpzl_dm")
											.append("<option  flag='zzz' value='"
													+ json.fpzlList[i].fpzl_dm
													+ "'>"
													+ json.fpzlList[i].fpzl_mc
													+ "</option>");
								} else if (fplx_dm == "004" || fplx_dm == "007") {
									$("#fpzl_dm")
											.append("<option flag='zzz' value='"
													+ json.fpzlList[i].fpzldm
													+ "'>"
													+ json.fpzlList[i].fpzlmc
													+ "</option>");

								}
							}

							if (json.result == "success") {
								alertMsg.error("原来的申领请求正在处理中，无法发起新的申领请求！");
								disableButtons($_("#sl_bt"));
							} else {
								enableButtons($_("#sl_bt"));
							}
							// alert(json.fpzlList.toString());
						});
			}

		},
		initPage : function() {
			maxRowIndex = 1;
		}
	}
}();
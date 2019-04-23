$(function() {
	var notIE = '<object id="signOCX" TYPE="application/x-itst-activex" ALIGN="baseline" BORDER="0" WIDTH="0" HEIGHT="0" clsid="{D71CA6D9-E61D-4131-91AF-B4178C1067C6}"></object>'
			+ '<object id="sk" TYPE="application/x-itst-activex" ALIGN="baseline" BORDER="0" WIDTH="0" HEIGHT="0" clsid="{003BD8F2-A6C3-48EF-9B72-ECFD8FC4D49F}"></object>';
	var isIE = '<object id="signOCX" classid="clsid:D71CA6D9-E61D-4131-91AF-B4178C1067C6" style="display:none;"></object>'
			+ '<object id="sk" style="display:none;" classid="clsid:003BD8F2-A6C3-48EF-9B72-ECFD8FC4D49F" codebase="NISEC_SKSCX.ocx#version=1,0,0,1"></object>';
	if (navigator.appVersion.indexOf("MSIE") >= 0
			|| navigator.appVersion.indexOf("Trident") >= 0) {
		$("body").append(isIE);
	} else {
		$("body").append(notIE);
	}
	if (khdqmjgsj > 0 && czylx == 1) {
		var dsqm = setInterval(function() {
			if (checkKey()) {
				ajaxLoad(ctxPath + "/sys/searchNeedQmFp.do", {
					global : false,
					async : false
				}, function(json) {
					signData(json);
				})
			} else {
				clearInterval(dsqm);
			}
		}, khdqmjgsj);
	}
})
function checkOCXPrint() {
	if (!$.PRINT) {
		$.PRINT = document.getElementById("sk");
	}
	try {
		// 输入错误发票类型代码测试控件安装
		$.PRINT.Operate();
	} catch (e) {
		var ret = e.message.indexOf("参数") > -1;
		if (!ret) {
			alertMsg.confirm("尚未安装发票签名控件，点击确定下载？", {
				okCall : function() {
					window.open(ctxPath + "/resources/download/kpkj.EXE");
				}

			});
		}
		return ret;
	}
}
function checkKey() {
	if (khdqmjgsj <= 0) {
		return true;
	}
	if (!$.ocx) {
		$.ocx = document.getElementById("sk");
	}
	var ocxNotInstalled = false;
	try {
		// 输入错误发票类型代码测试控件安装
		$.ocx.InvoSignX('000', '', '');
	} catch (e) {
		ocxNotInstalled = true;
	}
	if (ocxNotInstalled) {
		alertMsg.confirm("尚未安装发票签名控件，点击确定下载？", {
			okCall : function() {
				window.open(ctxPath + "/resources/download/kpkj.EXE");
			}
		});
		return false;
	} else if (usbzskl == "") {
		alertMsg.error("尚未设置证书口令，点击确定设置？", {
			okCall : function() {
				$.pdialog.open(ctxPath + "/sys/zskl.do", "zskl_dlg", "设置证书口令",
						{
							width : 470,
							height : 180
						});
			}
		})
		return false;
	} else {
		if (!checkSignOCXVersion()) {
			return false;
		}
		var msg = "";
		var rtnMsg = $.ocx.VerifyKeyX(nsrsbh, usbzskl);
		if (rtnMsg.indexOf("未插USBKEY") != -1) {
			msg = "未检测到签名设备";
		} else if (rtnMsg.indexOf("证书口令验证失败") != -1) {
			msg = "证书口令验证失败";
		} else if (rtnMsg.indexOf("证书身份验证失败") != -1) {
			msg = "证书身份验证失败，此设备不属于纳税人：" + nsrsbh;
		} else if (rtnMsg != "成功") {
			msg = rtnMsg;
		}
		if (msg) {
			alertMsg.error(msg + ",将影响到您的正常开票业务。");
			return false;
		}
		return true;
	}
}

function checkspbmbb() {
    ajaxLoad(ctxPath + "/bbkz/bbjy.do", function(json) {
       var statusCode = json.returnCode;
       var message = json.message;
	   if (statusCode == "1"){
       	alertMsg.warn(message);
       	return true;
	   }
	   if (statusCode == "2"){
	   	alertMsg.warn(message);
           disableButtons(_$("#xz,#sc,#zk,#jg,#qd,#kj,#fyxm,#fs"));
	   }
    })
}
function checkSignOCXVersion() {
	var rtn = document
			.getElementById("signOCX")
			.OperateDiskX(
					'',
					'<?xml version="1.0" encoding="gbk"?><business comment="获取库信息" id="HQKXX"><body yylxdm="1"><input><item>version</item></input></body></business>');
	if (rtn.indexOf("不支持") != -1) {
		alertMsg.confirm("发票签名控件不是最新，请更新！点击确定下载？", {
			okCall : function() {
				window.open(ctxPath + "/resources/download/kpkj.EXE");
			}
		});
		if (_$("#bspklId")) {
			_$("#bspklId").attr("disabled", "disabled");
		}
		if (_$("#bspkl")) {
			_$("#bspkl").attr("disabled", "disabled");
		}
		if (_$("#skysklId")) {
			_$("#skysklId").attr("disabled", "disabled");
		}
		return false;
	} else {
		var versionStr = rtn.substring(rtn.indexOf("<returnitem>") + 12, rtn
				.indexOf("</returnitem>"));
		var version = versionStr.split(".");
		if (!(version[0] >= 3 && version[1] >= 3 && version[2] >= 1 && version[3] >= 19)) {
			alertMsg.confirm("发票签名控件不是最新，当前版本:" + versionStr + "，请更新！点击确定下载？",
					{
						okCall : function() {
							window.open(ctxPath
									+ "/resources/download/kpkj.EXE");
						}
					});
			if (_$("#bspklId")) {
				_$("#bspklId").attr("disabled", "disabled");
			}
			if (_$("#bspkl")) {
				_$("#bspkl").attr("disabled", "disabled");
			}
			if (_$("#skysklId")) {
				_$("#skysklId").attr("disabled", "disabled");
			}
			return false;
		}
	}
	return true;
}
function signData(args) {
	var fpmxJSON = args.fpmx;
	if (!fpmxJSON) {
		return;
	}
	var pass = false;
	var data = {
		global : false
	};
	for (var i = 0; i < fpmxJSON.length; i++) {
		var oa = fpmxJSON[i];
		var fpmx = oa[0];
		var fplxdm = oa[1][0];
		if ("0" != fpmx.substring(fpmx.indexOf("<returncode>") + 12, fpmx
				.indexOf("</returncode>"))) {
			continue;
		}
		// 电子发票—0.00时验签失败，替换成0.00
		if (fplxdm == "026") {
			fpmx = fpmx.replaceAll("<se>-0.00</se>", "<se>0.00</se>");
		}
		fpmx = fpmx.replaceAll("<tspz>00</tspz>", "<tspz></tspz>");
		var rtn = $.ocx.InvoSignX(fplxdm, usbzskl, fpmx);
		if ("0" != rtn.substring(rtn.indexOf("<returncode>") + 12, rtn
				.indexOf("</returncode>"))) {
			alertMsg.error(rtn);
			continue;
		}
		var qmz = rtn.substring(rtn.indexOf("<returndata>") + 12, rtn
				.indexOf("</returndata>"))
		data["qmz" + i] = oa[1].join(",") + "," + qmz;
		pass = true;
	}
	if (pass) {
		ajaxLoad(ctxPath + "/sys/updateQmz.do", data)
	}
}
var ctxPath = "/SKServer";
var khdqmjgsj = 20000;
var ewmsize = "1.8";
var no_check_bank_account = "0";
if (ewmsize == "") {
    ewmsize = 1.8;
}
var czylx = 0;
var usbzskl = "";
var nsrsbh = "44001020458010000";
var sk_version = "";
var pageToken = "ab3a019b84e2a1a7d41444e0da93d989";
var by1 = "0,0,0,0,0,0,0,0,0,0,06,0,0,0,0";
var min_ypsl = ""; //最小余票数量（预警值）
if (min_ypsl == "") {
    min_ypsl = 0; //默认值
} else {
    min_ypsl = parseInt(min_ypsl);
}
$(function() {
    DWZ.init("/SKServer/resources/dwz/dwz.frag.xml", {
        //	loginUrl:"login_dialog.html", loginTitle:"登录",	// 弹出登录对话框
        loginUrl: ctxPath + "/index.jsp?relogin=true&_=" + new Date().getTime(), // 跳到登录页面
        statusCode: { ok: 200, error: 300, timeout: 301 }, //【可选】
        pageInfo: { pageNum: "pageNum", numPerPage: "pageSize", orderField: "orderField", orderDirection: "orderDirection" }, //【可选】
        debug: false, // 调试模式 【true|false】
        callback: function() {
            initEnv();
            $("#themeList").theme({ themeBase: "/SKServer/resources/dwz/themes" }); // themeBase 相对于index页面的主题base路径
            setTimeout(initHomePage, 200);
            qcookie();
        }

    });
});
//取数据库中的cookie值（by1）
function qcookie() {
    if (by1 == "") {
        return;
    }
    var c = by1.split(",");
    $.cookie("zbj_zzsz", c[0] == "null" ? 0 : (c[0] || 0), { path: "/", expires: 100000 });
    $.cookie("ybj_zzsz", c[1] == "null" ? 0 : (c[1] || 0), { path: "/", expires: 100000 });
    $.cookie("zbj_zzsp", c[2] == "null" ? 0 : (c[2] || 0), { path: "/", expires: 100000 });
    $.cookie("ybj_zzsp", c[3] == "null" ? 0 : (c[3] || 0), { path: "/", expires: 100000 });
    $.cookie("zbj_qd_zzsz", c[4] == "null" ? 0 : (c[4] || 0), { path: "/", expires: 100000 });
    $.cookie("ybj_qd_zzsz", c[5] == "null" ? 0 : (c[5] || 0), { path: "/", expires: 100000 });
    $.cookie("zbj_qd_zzsp", c[6] == "null" ? 0 : (c[6] || 0), { path: "/", expires: 100000 });
    $.cookie("ybj_qd_zzsp", c[7] == "null" ? 0 : (c[7] || 0), { path: "/", expires: 100000 });
    $.cookie("zbj_jsfp", c[8] == "null" ? 0 : (c[8] || 0), { path: "/", expires: 100000 });
    $.cookie("ybj_jsfp", c[9] == "null" ? 0 : (c[9] || 0), { path: "/", expires: 100000 });
    $.cookie("jsfpbs", c[10] == "null" ? "06" : (c[10] || "06"), { path: "/", expires: 100000 });
    $.cookie("zbj_jdcfp", c[11] == "null" ? 0 : (c[11] || 0), { path: "/", expires: 100000 });
    $.cookie("ybj_jdcfp", c[12] == "null" ? 0 : (c[12] || 0), { path: "/", expires: 100000 });
    $.cookie("zbj_escfp", c[13] == "null" ? 0 : (c[13] || 0), { path: "/", expires: 100000 });
    $.cookie("ybj_escfp", c[14] == "null" ? 0 : (c[14] || 0), { path: "/", expires: 100000 });
}

function initHomePage() {
    window.ajaxLoad = function(url, data, callback) {
        if ($.isFunction(data)) {
            $("#ajaxHidden").loadUrl(url, {}, data);
        } else {
            $("#ajaxHidden").loadUrl(url, data, callback);
        }
    }
    window.ie6 = $.browser.version == "6.0";
    Number.prototype.toFixed = function(s) {
        s = s || 0;
        var that = Math.abs(this);
        var pow = Math.pow(10, s);
        var plus = (that * pow);
        //对于四舍五入两位时对于精度丢失的进行处理，例如286.49999999999按照286.5处理
        if (s == 2) {
            var strPlus = new String(plus);
            var pos = strPlus.indexOf(".");
            if (pos > 0 && strPlus.substring(pos + 1, pos + 2) == 4 && /^9{6,}$/.test(strPlus.substring(pos + 2, pos + 8))) {
                plus = parseInt(plus) + 1;
            }
        }
        var changenum = (parseInt(plus + 0.5) / pow).toString();
        var index = changenum.indexOf(".");
        if (index < 0 && s > 0) {
            changenum = changenum + ".";
            for (var i = 0; i < s; i++) {
                changenum = changenum + "0";
            }
        } else {
            index = changenum.length - index;
            for (var i = 0; i < (s - index) + 1; i++) {
                changenum = changenum + "0";
            }
        }
        return (this < 0 ? "-" : "") + changenum;
    }
    checkSyfp();
    kpdxxjy();
}

function checkSyfp() {
    if (czylx != 1) {
        return;
    }
    ajaxLoad(ctxPath + "/fwqxx/fplgxx.do?format=json", function(json) {
        var min = min_ypsl;
        var map = new HashMap();
        var alertB = false;
        var alertStr = "当前开票点余票过少，已不足" + min + "张，请确认!<br/>"
        $.each(json.data, function(i, n) {
            if (map.containsKey("fp_" + n.fplxdm)) {
                return true;
            }
            map.put("fp_" + n.fplxdm, true);
            if (n.zsyfs < min) {
                alertB = true;
                alertStr += (n.fplxdm == "004" ? "增值税专用发票" : n.fplxdm == "007" ? "增值税普通发票" : n.fplxdm == "026" ? "增值税普通发票(电子)" : n.fplxdm == "005" ? "机动车销售统一发票" : "增值税普通发票（卷式）") + "共剩余" + n.zsyfs + "张。<br/>";
            }
        })
        if (alertB) {
            alertMsg.warn(alertStr);
        }
    })
}
/*开票点信息存在值为时默认时更新开票点信息*/
function kpdxxjy() {
    ajaxLoad(ctxPath + "/sys/kpdxxjy.do", function(data) {
        if (data == false) {
            $.pdialog.open(ctxPath + "/sys/kpdxDialog.do", "kpdxxUpdateOnLogin", "编辑开票点信息", {
                width: 470,
                height: 200
            })

        }
    });
}
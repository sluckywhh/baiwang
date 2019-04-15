/**
 * Created by zhao on 2017/7/24.
 */

var gxfpcx = function () {

    return {
        initPage: function () {
            _$("#rqtr").hide();
            _$("#kprq").hide();
            _$("#kprqfw").text("可查询的发票开票日期范围：" + _$("#dqkgxfp_kprqfw").val());
        },
        changeinput: function () {
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var str = year + "" + month + "" + d.getDate();
            var firstDay = year + "" + month + "1";
            var selextedText = _$("#cxfw").find("option:selected").text();
            if ("未到期发票" == selextedText) {
                _$("#rqtr").show();
                _$("#kprq").show();
                _$("#kprqfw").text("可查询的发票开票日期范围：" + firstDay + "-" + str);
            } else if ("单票查询" == selextedText) {
                _$("#rqtr").hide();
                _$("#kprq").hide();
                _$("#kprqfw").text("可查询的发票开票日期范围：" + _$("#dqkgxfp_kprqfw").val());
            }
        }
    }
}();

var fpgx = function () {
    return {
        switchIsAuth: function () {
            var selextedText = _$("#rzzt").find("option:selected").text();
            if ("已认证" == selextedText) {
                _$("#kprqOrsmrq").text("确认/扫描日期：");
                _$("#gxztOrrzfs").text("认证方式：");
                _$("#gxzt").parent().parent().remove();
                _$("#gxztOrrzfs").next().append($("<select id='rzfs' name='rzfs' > <option value='-1' ${param.rzfs eq '-1' ? 'selected':''}>全部</option><option value='0' ${param.rzfs eq '0' ? 'selected':''}>勾选认证</option><option value='1' ${param.rzfs eq '1' ? 'selected':''}>扫描认证</option></select>"));
                _$("#rzfs").combox();
            } else if ("未认证" == selextedText) {
                _$("#kprqOrsmrq").text("开票日期：");
                _$("#gxztOrrzfs").text("勾选状态：");
                _$("#rzfs").parent().parent().remove();
                _$("#gxztOrrzfs").next().append($("<select id='gxzt' name='gxzt' > <option value='-1' ${param.gxzt eq '-1' ? 'selected':''}>全部</option><option value='0' ${param.gxzt eq '0' ? 'selected':''}>未勾选</option><option value='1' ${param.gxzt eq '1' ? 'selected':''}>已勾选</option></select>"));
                _$("#gxzt").combox();
            }
        },
        submitChanged: function () {
            var changedStatus = _$("table:last").find("#sfgx[value='1']");
            if (changedStatus.length == 0) {
                alertMsg.info("请选择需要提交的数据");
                return;
            }
            var gxStatusArray = "";
            var fpdmArray = "";
            var fphmArray = "";
            var kprqArray = "";
            $.each(changedStatus, function (index, obj) {
                var $tr = $(obj).parent().parent().parent();
                var isChecked = $tr.find("#sfgx").attr("checked");
                var gxStatus;
                if (isChecked == "checked") {
                    gxStatus = "1";
                } else {
                    gxStatus = "0";
                }
                var fpdm = $tr.find("#fpdm").text();
                var fphm = $tr.find("#fphm").text();
                var kprq = $tr.find("#kprq").text();
                gxStatusArray += "=" + gxStatus;
                fpdmArray += "=" + fpdm;
                fphmArray += "=" + fphm;
                kprqArray += "=" + kprq;
            });
            var params = {"gxzt": gxStatusArray, "fpdm": fpdmArray, "fphm": fphmArray, "kprq": kprqArray};
            ajaxLoad(ctxPath + "/fpqr/saveCheckedFp.do", params, function (json) {
                var code = json.statusCode;
                if (code != "200") {
                    alertMsg.error("错误代码：" + code + "<br/>错误信息：" + json.message);
                    return;
                }
                var buttons = [{
                    name: "确定", call: function () {
                        _$("#fpgx_query_form").submit();
                    }, keyCode: DWZ.keyCode.ENTER
                }];
                alertMsg._open("correct", "操作成功！", buttons);
            });
        },
        ondblclick_dktj: function (skssq) {
            navTab.openTab("dktj_nav", ctxPath + "/fpqr/toDktj.do?skssq=" + skssq, {title: "抵扣统计"});
        }
    }
}();
var fpqr = function () {
    return {
        doFpqr: function () {
            var qmz = null;
            ajaxLoad(ctxPath + "/fpqr/doubleComfirm.do", {async: false}, function (json) {
                qmz = json.qmz;
            });
            if (qmz == null || qmz == "") {
                alertMsg.info("没有找到需要确认的发票，请先进行发票勾选！");
                return;
            }
            ajaxLoad(ctxPath + "/fpqr/doFinalComfirm.do", {}, function (json) {
                var statusCode = json.statusCode;
                if (statusCode == "200") {
                    var buttons = [{
                        name: "确定", call: function () {
                            _$("#fpqr_form").submit();
                        }, keyCode: DWZ.keyCode.ENTER
                    }];
                    alertMsg._open("correct", "确认成功！", buttons);
                } else if (statusCode == "80100") {
                    var str = "查询您税款所属期" + json.nowSsq + "的申报状态出现异常，请稍后再试！";
                    alert(str);
                } else if (statusCode == "80102") {
                    var str = "平台获取到您税款所属期" + json.nowSsq + "的申报工作已完成，本批次发票请您在下期进行勾选认证操作!";
                    alert(str);
                } else if (statusCode == "80101" || statusCode == "80103") {
                    $.pdialog.open(ctxPath + "/fpqr/toSbycDialog.do?statusCode=" + statusCode, "fpqr_sbyc_dialog", "提示", {
                        width: 600,
                        height: 300
                    });
                }
            });
        }
    }
}();
var sbzt = function () {
    return {
        doComfirm: function () {
            var value = $("input[type='radio']:checked").val();
            var url = ctxPath + "/fpqr/doFinalComfirm.do?isGetSbzt=";
            if ("2" == value) {
                $.pdialog.closeCurrent();
                return;
            } else if ("0" == value) {
                url = url + "0";
            } else if ("1" == value) {
                url = url + "1";
            }
            ajaxLoad(url, {}, function (json) {
                var statusCode = json.statusCode;
                var message = json.message;
                if (statusCode == "200") {
                    var buttons = [{
                        name: "确定", call: function () {
                            _$("#fpqr_form").submit();
                        }, keyCode: DWZ.keyCode.ENTER
                    }];
                    alertMsg._open("correct", "确认成功！", buttons);
                } else {
                    alertMsg.error("错误代码：" + statusCode + "<br/>错误信息：" + message);
                }
            });
            $.pdialog.closeCurrent();
        }
    }
}();

var dktj = function () {
    return {
        ckmx: function () {
            var rq = _$("#skssq").val();
            if (rq == null) {
                alertMsg.error("请选择日期" );
            } else {
                navTab.openTab("ckmx_nav", ctxPath + "/fpqr/toCkmx.do?skssq=" + rq, {title: "查看明细"});
            }
        }
    }

}();

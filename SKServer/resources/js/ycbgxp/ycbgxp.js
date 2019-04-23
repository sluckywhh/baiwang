/**
 * Created by zhao on 2018/1/3.
 */
var ycbgxp = function () {
    return {
        init: function () {
           // var index = getIndex($(this).find("td:first").attr("rowindex"));
            _$("#choiceJqbh").click(function () {
                var from = $("#from").val()
                 var fromUrl = (from == "1" ? "ycbgxp":"servicepj")
                $.pdialog.open(ctxPath + "/"+fromUrl+"/choiceJqbh.do?&targetType=dialog" , "ycbgxp_choiceJqbh_dlg", "选择核心板", {


                width: 850,
                    height: 450
                });
            });
            _$("#ycbg").click(function () {
                var fplxdm = "";
                //TODO:bglx为03的时候，需要传fplxdm
                var isHaveCheckbox = false;
                if (_$("#bglx").val() == "03") {
                    var trs = _$("#addfplx table tbody tr");
                    $.each(trs, function () {
                        var checkedElement = $(this).find("td:eq(0) input").is(":checked");
                        if (checkedElement) {
                            fplxdm += "," + $(this).find("td:eq(1) div").text();
                            isHaveCheckbox = true;
                        }
                    });
                    fplxdm = fplxdm.substr(1, fplxdm.length);
                }
                if (!isHaveCheckbox && _$("#bglx")=='03') {
                    alertMsg.warn("请先选择发票类型！");
                    return;
                }
                if (!_$("#serverrand").val()) {
                    alertMsg.warn("请先查询变更信息！");
                    return;
                }
                ajaxLoad(ctxPath + "/ycbgxp/doYcbg.do", {
                    jqbh: _$("#jqbh").val(),
                    serverrand: _$("#serverrand").val(),
                    bglx: _$("#bglx").val(),
                    fplx_dm: fplxdm
                }, function (json) {
                    DWZ.ajaxDone(json);
                });
            });
        },
        addListener: function () {
            $_("#isNeedBg").click(function () {
                var jqbhs = "";
                var isSelect = false;
                $_("table").find("tbody  tr").each(function () {
                    var isChecked = $(this).find("td:eq(0) div input").is(":checked");
                    if (isChecked) {
                        isSelect = true;
                        var jqbh = $(this).find("td:eq(1) div").text();
                        jqbhs += jqbh + ",";
                    }
                });
                if (!isSelect) {
                    alertMsg.warn("请勾选需要查询的数据！");
                    return;
                }
                ajaxLoad(ctxPath + "/ycbgxp/plcxYcbg.do", {
                    jqbhs: jqbhs,
                    bglx: _$("#bglx :selected").val()
                }, function (json) {
                    var result = json.result;
                    var index = 0;
                    $_("table").find("tbody  tr").each(function () {
                        var isChecked = $(this).find("td:eq(0) div input").is(":checked");
                        if (isChecked) {
                            $(this).find("td:eq(4) div").text(result[index++]);
                        } else {
                            $(this).find("td:eq(4) div").text("");
                        }
                    });

                })
            });
            $_("#importhxb").click(function () {
                var jqbhs = new Array();
                var nsrsbhs = new Array();
                $_("table").find("tbody  tr").each(function () {
                    var isChecked = $(this).find("td:eq(0) div input").is(":checked");
                    if (isChecked) {
                        isSelect = true;
                        var jqbh = $(this).find("td:eq(1) div").text();
                        var nsrsbh = $(this).find("td:eq(2) div").text();
                        jqbhs.push(jqbh);
                        nsrsbhs.push(nsrsbh);
                    }
                });
            zcm.setjqbhlist(nsrsbhs,jqbhs);
                $.pdialog.closeCurrent();
            });
        },
        setJqbh: function (tr) {
            var jqbhDiv = $(tr).find("td:eq(1) div");
            var jqbh = jqbhDiv.text();
            _$("#bgxp_jqbh").val(jqbh);
            $.pdialog.closeCurrent();
            _$("#queryBgxx").trigger("click");
        },
        setNsrshb: function (tr) {
            var nsrDiv = $(tr).find("td:eq(2) div");
            var nsrshb = nsrDiv.text();
            _$("#bgxp_nsrsbh").val(nsrshb);
            $.pdialog.closeCurrent();
        },

        setData: function (json) {
            if (json.bglx == "01") {
                _$("#bglx2").text("基本信息变更");
            } else if (json.bglx == "03") {
                _$("#bglx2").text("增加票种");
            }
            if (json.zsbg == "true") {
                _$("#zsbg").text("是");
            } else {
                _$("#zsbg").text("否");
            }
            if (json.wwcaddfplx != undefined) {
                _$("#wwcaddfplx").text(json.wwcaddfplx.fplx);
            }
        }

    }
}();
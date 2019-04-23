var kpzdgl = function () {
    return {
        initAdd: function (fwqlx) {
            $_("#zdlxDiv").hide();
            if ($_("#zdlxDiv").attr("zdlxShow") == '1') {//sys_parm表中zdlx配置为1 时
                var fplxdms = $_("[name='fplxdm']");
                if (fwqlx == '1') {//税控盘
                    fplxdms.each(function () {
                        if ($(this).val() == '026') {
                            $_("#zdlxDiv").show();
                        }
                    });
                }
                fplxdms.change(function () {
                    fplxdms.each(function () {
                        if ($(this).val() == '026') {
                            if ($(this).attr("checked")) {
                                $_("#zdlxDiv").show();
                            } else {
                                $_("#zdlxDiv").hide();
                                $_("[name='zdlx']").val("0");
                            }
                        }
                    });
                });
            }
        },
        initEdit: function (zdlx) {
            $_("#zdlxDiv").hide();
            if ($_("#zdlxDiv").attr("zdlxShow") == '1') {//sys_parm表中zdlx配置为1 时
                var fplxdms = $_("[name='fplxdm']");
                fplxdms.each(function () {
                    if ($(this).val() == '026' && $(this).attr("checked")) {
                        $_("#zdlxDiv").show();
                    }
                });
                fplxdms.change(function () {
                    fplxdms.each(function () {
                        if ($(this).val() == '026') {
                            if ($(this).attr("checked")) {
                                $_("[name='zdlx']").val(zdlx);
                                $_("#zdlxDiv").show();
                            } else {
                                $_("#zdlxDiv").hide();
                                $_("[name='zdlx']").val("0");
                            }
                        }
                    });
                });
            }
        }
    };
}();
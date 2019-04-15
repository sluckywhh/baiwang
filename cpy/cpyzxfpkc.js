/**
 * Created by pgh on 2018/1/18.
 */
var cpyzxfpkc = function () {
    return {
        initPage: function () {

        },
        setjqbh: function (tr) {
            var jqbhDiv = $(tr).find("td:eq(0) div");
            var jqbh = jqbhDiv.text();
            _$("#jqbh").val(jqbh);
            $.pdialog.closeCurrent();
        },
        searhfwqxx: function () {
            $.pdialog.open(ctxPath + "/ycbgxp/choiceJqbh.do?cpyzxfpkc=1&targetType=dialog", "ycbgxp_choiceJqbh_dlg", "选择核心板", {
                width: 850,
                height: 450
            });
        },
        cpyxz: function () {
            var jqbh = _$("#jqbh").val();
            if (jqbh == "") {
                alertMsg.error("请选择核心板！");
                return;
            }
            $.pdialog.open(ctxPath + "/cpy_zxfpkc/opencpyxz.do?jqbh=" + jqbh, "opencpyxz_dlg", "成品油选择下载", {
                width: 550,
                height: 350
            });
        },
        cpyth: function () {
            var jqbh = _$("#jqbh").val();
            if (jqbh == "") {
                alertMsg.error("请选择核心板！");
                return;
            }
            $.pdialog.open(ctxPath + "/cpy_zxfpkc/opencpyth.do?jqbh=" + jqbh, "opencpyth_dlg", "成品油选择退回", {
                width: 550,
                height: 350
            });
        },
        choicembjqbh: function () {
            var jqbh = _$("#jqbh").val();
            if (jqbh == "") {
                alertMsg.error("请选择调拨核心板！");
                return;
            }
            $.pdialog.open(ctxPath + "/cpy_kcdb/choicembjqbh.do?jqbh=" + jqbh, "choicembjqbh_dlg", "选择目标核心板", {
                width: 550,
                height: 350
            });
        },
        setmbjqbh: function (tr) {
            var mbjqbhDiv = $(tr).find("td:eq(0) div");
            var mbjqbh = mbjqbhDiv.text();
            _$("#mbjqbh").val(mbjqbh);
            $.pdialog.closeCurrent();
        },
        openkcdb:function () {
            var jqbh = _$("#jqbh").val();
            if (jqbh == "") {
                alertMsg.error("请选择调拨核心板！");
                return;
            }
            var mbjqbh = _$("#mbjqbh").val();
            if (mbjqbh == "") {
                alertMsg.error("请选择目标核心板！");
                return;
            }
            $.pdialog.open(ctxPath + "/cpy_kcdb/openkcdb.do?jqbh=" + jqbh+"&mbjqbh="+mbjqbh, "openkcdb_dlg", "选择目标核心板", {
                width: 550,
                height: 350
            });
        }
    }
}();
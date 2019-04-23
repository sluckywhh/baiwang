var sjrz = function () {
    return {
        exportSjrz: function () {
            var qzsj=_$("#qzsj").val();
            var zzsj=_$("#zzsj").val();
            var nsrsbh=_$("#nsrsbh").val();
            var czydm=_$("#czydm").val();
            location.href = ctxPath + "/sjrz/exportSjrz.do?czydm="+czydm+"&nsrsbh="+nsrsbh+"&qzsj="+qzsj+"&zzsj="+zzsj;
        },
        ylSjrz:function () {
            var qzsj=_$("#qzsj").val();
            var zzsj=_$("#zzsj").val();
            var nsrsbh=_$("#nsrsbh").val();
            var czydm=_$("#czydm").val();
            $.pdialog.open(ctxPath + "/sjrz/sjrzyl.do?czydm="+czydm+"&nsrsbh="+nsrsbh+"&qzsj="+qzsj+"&zzsj="+zzsj, "sjrz_dlg", "审计日志信息", {
                width: 500,
                height: 300,
                callback: function () {
                }

            });
        },
        initPage:function () {
            var _this = this;
            _$("#dc").click(function(){
                _this.exportSjrz();
            });
            _$("#yl").click(function(){
                _this.ylSjrz();
            });

        }
    }
}();

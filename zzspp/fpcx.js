var zzspp_fpcx = function () {
    var cache, fpmx, defaultZbj, defaultYbj, defaultQDZbj, defaultQDYbj;
    return {
        initPage: function () {
            cache = {}, fpmx = null, defaultZbj = 6, defaultYbj = -6, defaultQDZbj = 4, defaultQDYbj = 4.5;
            limit_money_input(_$(".searchContent input[name='zxje'],.searchContent input[name='zdje']"));
            disableButtons(_$("#yl,#dy,#qdyl,#qddy,#zf,#cxqm"));
            getCxze();
        },
        preview: function () {
            if (!checkPrint()) {
                return;
            }
            this.getRowData();
            if (fpmx) {
                this.initYLData();
            }
        },
        qhzt: function (tr) {
            var fpzt = $(tr).children().eq(7).attr("val");
            var qdbz = $(tr).children().eq(8).attr("val");
            var yqsb = $(tr).children().eq(9).text();
            if (fpzt == "00" || fpzt == "01") {
                enableButtons(_$("#zf"));
            } else {
                disableButtons(_$("#zf"));
            }
            if (fpzt != "02") {
                enableButtons(_$("#yl,#dy,#qddyx"));
            } else {
                disableButtons(_$("#yl,#dy,#qddyx"));
            }
            if (qdbz == "1") {
                enableButtons(_$("#qdyl,#qddy"));
            } else {
                disableButtons(_$("#qdyl,#qddy"));
            }
            if (yqsb == "验签失败") {
                enableButtons(_$("#cxqm"));
            } else {
                disableButtons(_$("#cxqm"));
            }
        },
        fpzf: function () {
            var sel = _$(".pageContent table tr.selected");
            if (sel.size() == 0) {
                alertMsg.error("请选择行");
            } else {
                alertMsg.confirm("确定作废此发票？", {
                    okCall: function () {
                        if (!checkKey()) {
                            return;
                        }
                        checkPerm(function () {
                            var id = _$(".pageContent table tr.selected").attr("rel");
                            var trainF =_$("#trainFlag").val();
                            if(trainF=="train"){
                                var trainFlag = true;
                            }else{
                                var trainFlag = false;
                            }
                            ajaxLoad(ctxPath + "/zzspp/fpzf.do?id=" + id + "&trainFlag=" + trainFlag, function (json) {
                                if (json.statusCode == DWZ.statusCode.ok) {
                                    _$("#zzspp_fpcx_form").submit();
                                    alertMsg.info("发票作废成功");
                                }
                            });
                        });

                    }
                });
            }
        },
        getRowData: function () {
            fpmx = null;
            var sel = _$(".pageContent table tr.selected");
            if (sel.size() == 0) {
                alertMsg.error("请选择行");
            } else {
                var id = sel.attr("rel");
                if (cache[id]) {
                    fpmx = cache[id];
                } else {
                    ajaxLoad(ctxPath + "/zzspp/oneDetail.do?id=" + id, {async: false}, function (json) {
                        cache[id] = fpmx = json;
                        if (fpmx.tspz == '02') {
                            var mc = fpmx.ghdwmc;
                            fpmx.ghdwmc = fpmx.xhdwmc;
                            fpmx.xhdwmc = mc;
                            var dm = fpmx.ghdwdm;
                            fpmx.ghdwdm = fpmx.xhdwdm;
                            fpmx.xhdwdm = dm;
                            var dh = fpmx.ghdwdzdh;
                            fpmx.ghdwdzdh = fpmx.xhdwdzdh;
                            fpmx.xhdwdzdh = dh;
                            var zh = fpmx.ghdwyhzh;
                            fpmx.ghdwyhzh = fpmx.xhdwyhzh;
                            fpmx.xhdwyhzh = zh;
                        }
                    })
                }
            }
        },
        prePrint: function () {
            var _this = this;
            if (!checkPrint()) {
                return;
            }
            this.getRowData();
            if (fpmx) {
                _this.printfp();
            }
        },
        printfp: function () {
            zzspp_fpcx.initPrintData();
            $.cookie("dyfs") == "1" ? LODOP.PRINTA() : LODOP.PRINT();
        },
        initYLData: function () {
            this.initPrintData(true);
            LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 890, 700, "");
            LODOP.SET_SHOW_MODE("HIDE_PBUTTIN_PREVIEW", 1);
            LODOP.PREVIEW();
        },
        initPrintData: function (yl) {
            LODOP.PRINT_INITA((yl ? defaultZbj : $.cookie("zbj_zzsp") || 0) + "mm", (yl ? defaultYbj : $.cookie("ybj_zzsp") || 0) + "mm", "230mm", "159mm", "增值税普通发票");
            LODOP.SET_PRINT_PAGESIZE(1, 2300, 1590, "CreateCustomPage");
            var fpmxPrint = $.extend({fplxdm: "007"}, fpmx, {
                jshjdx: je2Upper(fpmx.jshj),
                ewm: fpmx.qmz,
                mxzb: filterMxzbPrint(fpmx)
            });
            printZzspp(fpmxPrint);
        },
        prePrintQD: function () {
            var _this = this;
            if (!checkPrint()) {
                return;
            }
            this.getRowData();
            if (fpmx) {
                _this.printfpQD();
            }
        },
        printfpQD: function () {
            if (fpmx.mxzb.length - 1 > 500) {
                alert("当前发票明细条数大于500建议用多明细清单打印！");
                return;
            } else {
                zzspp_fpcx.initPrintQDData();
                $.cookie("dyfs") == "1" ? LODOP.PRINTA() : LODOP.PRINT();
            }
        },
        initYLQDData: function () {
            if (!checkPrint()) {
                return;
            }
            this.getRowData();
            if (fpmx) {
                if (fpmx.mxzb.length - 1 > 500) {
                    alert("当前发票明细条数大于500建议用多明细清单打印！");
                    return;
                } else {
                    this.initPrintQDData(true);
                    LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 850, 750, "");
                    LODOP.SET_SHOW_MODE("HIDE_PBUTTIN_PREVIEW", 1);
                    LODOP.PREVIEW();
                }
            }
        },
        initPrintQDData: function (yl) {

            LODOP.PRINT_INITA((yl ? defaultQDZbj : $.cookie("zbj_qd_zzsp") || 0) + "mm", (yl ? defaultQDYbj : $.cookie("ybj_qd_zzsp") || 0) + "mm", 775, 959, "增值税普通发票（清单）");
            var fpmxPrint = $.extend({fplxdm: "007"}, fpmx, {
                mxzb: filterMxzbQDPrint(fpmx)
            });
            printZzsppQD(fpmxPrint);
        },
        qddyx: function () {
            var _this = this;
            if (!checkOCXPrint()) {
                return;
            }
            this.getRowData();
            if (fpmx) {
                ocxPrint($.extend({fplxdm: "007", dylx: "1"}, fpmx));
            }
        },
        //复制开具
        fzkj: function () {
            this.getRowData();

            if (fpmx) {
                if(fpmx.tspz=="08"){
                    alertMsg.info("此功能暂不支持成品油发票！");
                    return;
                }
                if (fpmx.fpzt == "01") {
                    alertMsg.info("此功能暂不支持负数发票！");
                    return;
                } else if (fpmx.fpzt == "02") {
                    alertMsg.info("此功能暂不支持空白作废发票！");
                    return;
                } else if (fpmx.fpzt == "03") {
                    alertMsg.info("此功能暂不支持正数作废发票！");
                    return;
                } else if (fpmx.fpzt == "04") {
                    alertMsg.info("此功能暂不支持负数作废发票！");
                    return;
                }
                if (fpmx.zsfs == "2") {
                    alertMsg.info("此功能暂不支持差额征税发票！");
                    return;
                } else if (fpmx.zsfs == "1") {
                    alertMsg.info("此功能暂不支持减按征税发票！");
                    return;
                }
                navTab.openTab("zzspp_zsfpkj_nav", ctxPath + "/zzspp_spbm/init.do?fzkj=true", {title: "增普正数开具(spbm)"});
            }

        },
        getFpmx: function () {
            return fpmx;
        }
    }
}();
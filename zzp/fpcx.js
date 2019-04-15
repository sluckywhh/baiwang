var zzp_fpcx = function () {
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
                enableButtons(_$("#qdyl,#qddy,#qddyx"));
            } else {
                disableButtons(_$("#qdyl,#qddy,#qddyx"));
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
                            if (sk_version == "TRAIN") {
                                var trainFlag = true;
                            } else {
                                var trainFlag = false;
                            }
                            var id = _$(".pageContent table tr.selected").attr("rel");
                            ajaxLoad(ctxPath + "/zzp/fpzf.do?id=" + id + "&trainFlag=" + trainFlag, function (json) {
                                if (json.statusCode == DWZ.statusCode.ok) {
                                    _$("#zzp_fpcx_form").submit()
                                    alertMsg.info("发票作废成功");
                                }
                            })
                        })
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
                    ajaxLoad(ctxPath + "/zzp/oneDetail.do?id=" + id, {async: false}, function (json) {
                        cache[id] = fpmx = json;
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
            zzp_fpcx.initPrintData();
            $.cookie("dyfs") == "1" ? LODOP.PRINTA() : LODOP.PRINT();
        },
        initYLData: function () {
            this.initPrintData(true);
            LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 890, 700, "");
            LODOP.SET_SHOW_MODE("HIDE_PBUTTIN_PREVIEW", 1);
            LODOP.PREVIEW();
        },
        initPrintData: function (yl) {
            LODOP.PRINT_INITA((yl ? defaultZbj : $.cookie("zbj_zzsz") || 0) + "mm", (yl ? defaultYbj : $.cookie("ybj_zzsz") || 0) + "mm", "230mm", "159mm", "增值税专用发票");
            LODOP.SET_PRINT_PAGESIZE(1, 2300, 1590, "CreateCustomPage");
            var fpmxPrint = $.extend({fplxdm: "004"}, fpmx, {
                jshjdx: je2Upper(fpmx.jshj),
                ewm: fpmx.qmz,
                mxzb: filterMxzbPrint(fpmx)
            });
            printZzszp(fpmxPrint);
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
                zzp_fpcx.initPrintQDData();
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
        rzxh: function (fplxdm) {
            if (!checkPrint()) {
                return;
            }
            ajaxLoad(ctxPath + "/zzp/rzxh.do?fplxdm=" + fplxdm, function (json) {
                printRzxh(json);
            })
        },
        initPrintQDData: function (yl) {
            LODOP.PRINT_INITA((yl ? defaultQDZbj : $.cookie("zbj_qd_zzsz") || 0) + "mm", (yl ? defaultQDYbj : $.cookie("ybj_qd_zzsz") || 0) + "mm", 775, 959, "增值税专用发票（清单）");
            var fpmxPrint = $.extend({fplxdm: "004"}, fpmx, {
                mxzb: filterMxzbQDPrint(fpmx)
            });
            printZzszpQD(fpmxPrint);
        },
        qddyx: function () {
            var _this = this;
            if (!checkOCXPrint()) {
                return;
            }
            this.getRowData();
            if (fpmx) {
                ocxPrint($.extend({fplxdm: "004", dylx: "1"}, fpmx));
            }
        },
        exportExcel: function (mx) {
            var header = "开票日期@发票代码@发票号码@合计金额@税额@价税合计@发票状态@购方单位名称@购方单位代码@主要商品名称@作废日期@开票人@复核人@收款人@备注@原发票代码@原发票号码";
            var headerAtt = "kprq@fpdm@fphm@hjje@se@jshj@fpzt@ghdwmc@ghdwdm@zyspmc@zfrq@kpr@fhr@skr@bz@yfpdm@yfphm";
            if (mx) {
                header = "发票序号@" + header + "@发票明细行号@商品名称@规格型号@单位@数量@单价@金额@税率@明细税额";
                headerAtt = "fphh@" + headerAtt + "@mxhh@spmc@ggxh@dw@spsl@spdj@je@sl@mxse";
            }

            if (mx) {
                var op = {
                    form: _$('form[rel]'),
                    fileName: "增值税发票明细(子表)导出",
                    param: [{name: "header", value: header},
                        {name: "headerAtt", value: headerAtt},
                        {name: "orderDirection", value: "dczb"}]
                };
            } else {
                var op = {
                    form: _$('form[rel]'),
                    fileName: "增值税发票明细导出",
                    param: [{name: "header", value: header},
                        {name: "headerAtt", value: headerAtt}]
                };
            }
            exportExcel(op);
        },
        yyysj: function () {
            var sel = _$(".pageContent table tr.selected");
            if (sel.size() == 0) {
                alertMsg.error("请选择行");
            } else {
                var by1 = sel.attr("by1");
                var tds = sel.children();
                var fpzt = tds.eq(7).attr("val");
                if (by1 == "ABC" && (fpzt == "00" || fpzt == "03")) {
                    $.pdialog.open(ctxPath + "/zzp/yyysj.do?fpdm=" + tds.eq(2).text() + "&fphm=" + tds.eq(3).text(), "abc_yyysj_dlg", "原业务登记数据", {
                        width: 660,
                        height: 400
                    })
                } else {
                    alertMsg.error("请选择使用业务登记数据开具的正数或正废发票");
                }
            }
        },
        cxqm: function (fplx) {
            disableButtons(_$("#cxqm"));
            var sel = _$(".pageContent table tr.selected");
            var fpdm = sel.children().eq(2).text();
            var fphm = sel.children().eq(3).text();
            ajaxLoad(ctxPath + "/zzp/cxqm.do", {fplxdm: fplx, fpdm: fpdm, fphm: fphm}, function (json) {
                alertMsg.correct(json.message);
            });
        },
        //复制开具
        fzkj: function () {
            this.getRowData();

            if (fpmx) {
                if (fpmx.tspz == "08") {
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

                navTab.openTab("zzp_zsfpkj_nav", ctxPath + "/zzp_spbm/init.do?fzkj=true", {title: "增专发票开具(spbm)"});
            }

        },
        getFpmx: function () {
            return fpmx;
        },
        dczzpxml: function () {
            var op = {
                form: _$('form[rel]'),
                fileName: "增值税专用发票明细",
                param: [{name: "dcxml", value: "1"},
                    {name: "orderDirection", value: "dczb"}]
            };
            exportExcel(op);
        },
        dczzsppxml: function () {
            var op = {
                form: _$('form[rel]'),
                fileName: "增值税普通发票明细",
                param: [{name: "dcxml", value: "2"},
                    {name: "orderDirection", value: "dczb"}]
            };
            exportExcel(op);
        },
        wjjmxml: function () {
            if (!checkOCXPrint()) {
                return;
            }
            var xml = "<?xml version=\"1.0\" encoding=\"gbk\"?>" +
                "<business id=\"20008\" comment=\"中机数据加密\">" +
                "<body yylxdm=\"1\">" +
                "</body>" +
                "</business>";
            var jmxml = $.PRINT.Operate(xml);
            if (jmxml.indexOf("<returncode>0</returncode>") != -1) {
                alertMsg.correct("加密成功");
            } else {
                if (jmxml.indexOf("<returnmsg>加载失败AES失败</returnmsg>") != -1) {
                    alertMsg.confirm("尚未安装中机数据导出需要的库，点击确定下载？", {
                        okCall: function () {
                            window.open(ctxPath + "/resources/download/zjjk.exe");
                        }
                    });
                } else {
                    alertMsg.error(jmxml.substring(jmxml.indexOf("<returnmsg>") + 11, jmxml.indexOf("</returnmsg>")));
                }
            }
        }
    }
}();
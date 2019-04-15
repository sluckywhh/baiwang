var zzsjp_fpcx = function () {
    var cache, fpmx, defaultZbj, defaultYbj, defaultQDZbj, defaultQDYbj;
    return {
        initPage: function () {
            cache = {}, fpmx = null, defaultZbj = 6, defaultYbj = -6, defaultQDZbj = 4, defaultQDYbj = 4.5;
            limit_money_input(_$(".searchContent input[name='zxje'],.searchContent input[name='zdje']"));
            disableButtons(_$("#yl,#dy,#qdyl,#qddy,#zf,#cxqm"));
            getCxze();
        },
        exportExcel: function (mx) {
            var header = "开票日期@发票代码@发票号码@合计金额@税额@价税合计@发票状态@购方单位名称@购方单位代码@作废日期@开票人@收款人@备注@原发票代码@原发票号码";
            var headerAtt = "kprq@fpdm@fphm@hjje@se@jshj@fpzt@ghdwmc@ghdwdm@zfrq@kpr@skr@bz@yfpdm@yfphm";
            if (mx) {
                header = "发票序号@" + header + "@发票明细行号@商品名称@数量@单价@金额@税率@明细税额";
                headerAtt = "fphh@" + headerAtt + "@mxhh@spmc@spsl@spdj@je@sl@mxse";
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
        qhzt: function (tr) {
            var fpzt = $(tr).children().eq(7).attr("val");
            var yqsb = $(tr).children().eq(8).text();
            if (fpzt == "00" || fpzt == "01") {
                enableButtons(_$("#zf"));
            } else {
                disableButtons(_$("#zf"));
            }
            if (fpzt != "02") {
                enableButtons(_$("#yl,#dy"));
            } else {
                disableButtons(_$("#yl,#dy"));
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
                            ajaxLoad(ctxPath + "/zzsjp/fpzf.do?id=" + id, function (json) {
                                if (json.statusCode == DWZ.statusCode.ok) {
                                    _$("#zzp_fpcx_form").submit();
                                    alertMsg.info("发票作废成功");
                                }
                            });
                        });

                    }
                });
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
                    ajaxLoad(ctxPath + "/zzsjp/oneDetail.do?id=" + id, {async: false}, function (json) {
                        cache[id] = fpmx = json;
                    })
                }
            }
        },
        printfp: function () {
            zzsjp_fpcx.initPrintData();
            $.cookie("dyfs") == "1" ? LODOP.PRINTA() : LODOP.PRINT();
        },
        initPrintData: function (yl) {
            fpmx.ewm = fpmx.jym;
            printJsfp(fpmx, yl);
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
        initYLData: function () {
            this.initPrintData(true);
            LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 890, 700, "");
            LODOP.SET_SHOW_MODE("HIDE_PBUTTIN_PREVIEW", 1);
            LODOP.PREVIEW();
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
            var jplxs = $.cookie("jsfpbs") || "06";
            var jplx = (jplxs == "04") ? "07" : ((jplxs == "05") ? "06" : jplxs);
            if (fpmx) {
                var fppy = fpmx.fppy;
                if (fppy != jplx) {
                    var fppymc;
                    if (fppy == "06") {
                        fppymc = "76×177.8(mm)新";
                    } else if (fppy == "07") {
                        fppymc = "57×177.8(mm)新";
                    } else if (fppy == "08") {
                        fppymc = "76×152.4(mm)新";
                    }
                    alertMsg.info("当前设置票样与该发票票样不一致，请设置为：" + fppymc + "票样后再进行此功能操作！");
                    return;
                }
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
                // if (fpmx.zsfs == "2") {
                //     alertMsg.info("此功能暂不支持差额征税发票！");
                //     return;
                // } else if (fpmx.zsfs == "1") {
                //     alertMsg.info("此功能暂不支持减按征税发票！");
                //     return;
                // }
                navTab.openTab("zzsjp_zsfpkj_nav", ctxPath + "/zzsjp_spbm/init.do?fzkj=true", {title: "增值税普通发票（卷式）"});
            }

        },
        getFpmx: function () {
            return fpmx;
        }
    }
}();
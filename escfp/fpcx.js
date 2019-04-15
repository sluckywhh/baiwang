var escfp_fpcx = function () {
    var cache, fpmx, defaultZbj, defaultYbj;
    return {
        initPage: function () {
            cache = {}, fpmx = null, defaultZbj = -2.2, defaultYbj = -19;
            limit_money_input(_$(".searchContent input[name='zxje'],.searchContent input[name='zdje']"));
            disableButtons(_$("#yl,#dy,#zf,#cxqm"));
            //计算总额
            var cjhj = 0;
            _$("tr #cjhj").each(function () {
                cjhj += +_$(this).text();
            })

            _$(".table").after("<div class='panelBar' > <div style='color: red' align='center'><th>本页总车价合计：" + cjhj.toFixed(2) + "</th></div></div>")

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
            var fpzt = $(tr).children().eq(6).attr("val");
            var yqsb = $(tr).children().eq(7).text();
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
                            ajaxLoad(ctxPath + "/escfp_fpcx/fpzf.do?id=" + id, function (json) {
                                if (json.statusCode == DWZ.statusCode.ok) {
                                    _$("#escfp_fpcx_form").submit();
                                    alertMsg.info("发票作废成功");
                                }
                            });
                        });

                    }
                });
            }
        },
        exportExcel: function () {
            var header = "开票日期@发票代码@发票号码@车价合计@合计税额@发票状态@买方单位/个人名称@买方单位/个人代码@卖方单位/个人名称@卖方单位/个人代码@车牌照号@登记证号@车辆类型@车架号/车辆识别号@厂牌型号@转入地车辆管理所名称" +
                "@经营、拍卖单位名称@经营、拍卖单位纳税人识别号@二手车市场名称@二手车市场识别号@开票人@增值税标志@原发票代码@原发票号码@作废人@作废日期@作废原因";
            var headerAtt = "kprq@fpdm@fphm@cjhj@hjse@fpzt@gfmc@gfdm@xfmc@xfdm@cpzh@djzh@cllx@clsbh@cpxh@zrdclglsmc@jypmdwmc@jypmdwsbh@escscmc@escscsbh@kpr@zzsbz@yfpdm@yfphm@zfr@zfrq@zfyy";
            var op = {
                form: _$('form[rel]'),
                fileName: "二手车发票导出",
                param: [{name: "header", value: header},
                    {name: "headerAtt", value: headerAtt}]
            };
            exportExcel(op);
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
                    ajaxLoad(ctxPath + "/escfp_fpcx/oneDetail.do?id=" + id, {async: false}, function (json) {
                        cache[id] = fpmx = json;
                    })
                }
            }
        },
        initYLData: function () {
            this.initPrintData(true);
            LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 850, 750, "");
            LODOP.SET_SHOW_MODE("HIDE_PBUTTIN_PREVIEW", 1);
            LODOP.PREVIEW();
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
            if (!checkPrint()) {
                return;
            }
            escfp_fpcx.initPrintData();
            $.cookie("dyfs") == "1" ? LODOP.PRINTA() : LODOP.PRINT();
        },
        initPrintData: function (yl) {
            var fpmxPrint = $.extend({fplxdm: "006"}, fpmx, {
                ewm: fpmx.qmz
            });
            printEscfp(fpmxPrint, yl);
        }
    }
}();

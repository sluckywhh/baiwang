/**
 * Created by pgh on 2017/1/22.
 */
var jdcfp_fpcx = function () {
    var cache, fpmx, defaultZbj, defaultYbj;
    return {
        initPage: function () {
            cache = {}, fpmx = null, defaultZbj = -2.2, defaultYbj = -19;
            limit_money_input(_$(".searchContent input[name='zxje'],.searchContent input[name='zdje']"));
            disableButtons(_$("#yl,#dy,#zf,#cxqm"));
            //计算总额
            var bhsj = 0;
            var zzsse = 0;
            var jshj = 0;
            _$("tr #bhsj").each(function () {
                bhsj += +_$(this).text();
            })
            _$("tr #zzsse").each(function () {
                zzsse += +_$(this).text();
            })
            _$("tr #jshj").each(function () {
                jshj += +_$(this).text();
            })
            _$(".table").after("<div class='panelBar' > <div style='color: red' align='center'><th>本页总不含税价：" + bhsj.toFixed(2) + "，</th><th>总增值税税额：" + zzsse.toFixed(2) + "，</th><th>总价税合计：" + jshj.toFixed(2) + "</th></div></div>")

        },
        preview: function () {
            if(!checkPrint()){
                return;
            }
            this.getRowData();
            if (fpmx) {
                this.initYLData();
            }
        },
        qhzt: function (tr) {
            var fpzt = $(tr).children().eq(8).attr("val");
            var yqsb = $(tr).children().eq(9).text();
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
                            ajaxLoad(ctxPath + "/jdcfp_fpcx/fpzf.do?id=" + id, function (json) {
                                if (json.statusCode == DWZ.statusCode.ok) {
                                    _$("#jdcfp_fpcx_form").submit();
                                    alertMsg.info("发票作废成功");
                                }
                            });
                        });

                    }
                });
            }
        },
        exportExcel: function () {
            var header = "开票日期@发票代码@发票号码@不含税价@增值税税额@价税合计@增值税税率@发票状态@购方单位名称@购方单位代码@身份证号码/组织机构代码@生产企业名称@车辆类型@厂牌型号@产地@合格证号@进口证明书号@商检单号@发动机号码@车架号码/车辆识别代号@完税凭证号码@吨位@限乘人数@作废日期@开票人@备注@原发票代码@原发票号码";
            var headerAtt = "kprq@fpdm@fphm@bhsj@zzsse@jshj@zzssl@fpzt@gmfmc@ghfsbh@sfzhm@scqymc@cllx@cpxh@cd@hgzh@jkzmsh@sjdh@fdjhm@clsbdh@wspzhm@dw@xcrs@zfrq@kpr@bz@yfpdm@yfphm";
            var op = {
                form: _$('form[rel]'),
                fileName: "机动车发票导出",
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
                    ajaxLoad(ctxPath + "/jdcfp_fpcx/oneDetail.do?id=" + id, {async: false}, function (json) {
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
            jdcfp_fpcx.initPrintData();
            $.cookie("dyfs") == "1" ? LODOP.PRINTA() : LODOP.PRINT();
        },
        initPrintData: function (yl) {
            var fpmxPrint = $.extend({fplxdm: "005"}, fpmx, {
                ewm: fpmx.qmz
            });
            printJdcfp(fpmxPrint, yl);
        },
        dcjdcxml: function () {
            var op = {
                form: _$('form[rel]'),
                fileName: "机动车发票导出",
                param: [{name: "dcxml", value: "1"}]
            };
            exportExcel(op);
        },
        dcjdcxml2: function () {

            var op = {
                form: _$('form[rel]'),
                fileName: "机动车发票明细导出",
                param: [{name: "dcxml", value: "2"}]
            };
            exportExcel(op);

        }

    }
}();

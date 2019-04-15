var dzfp_fpcx = function () {
    var cache, fpmx, defaultZbj, defaultYbj, defaultQDZbj, defaultQDYbj;
    return {
        initPage: function () {
            cache = {}, fpmx = null, defaultZbj = 6, defaultYbj = -6, defaultQDZbj = 4, defaultQDYbj = 4.5;
            limit_money_input(_$(".searchContent input[name='zxje'],.searchContent input[name='zdje']"));
            disableButtons(_$("#yl,#dy,#qdyl,#qddy,#zf,#cxqm,#updatesjhmandyxdz,#fpts,#bsxz"));
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
            var tsbz = $(tr).children().eq(10).text();
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
            if(tsbz=="是"||fpzt == "02"){
                disableButtons(_$("#fpts"));
                enableButtons(_$("#bsxz"));
            }else {
                enableButtons(_$("#fpts"));
                disableButtons(_$("#bsxz"));
            }
            enableButtons(_$("#updatesjhmandyxdz"));
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
                            ajaxLoad(ctxPath + "/dzfp/fpzf.do?id=" + id, function (json) {
                                if (json.statusCode == DWZ.statusCode.ok) {
                                    _$("#dzfp_fpcx_form").submit();
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
                    ajaxLoad(ctxPath + "/dzfp/oneDetail.do?id=" + id, {async: false}, function (json) {
                        cache[id] = fpmx = json;
                        if (fpmx.tspz == 02) {
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
            dzfp_fpcx.initPrintData();
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
            var fpmxPrint = $.extend({fplxdm: "026"}, fpmx, {
                jshjdx: je2Upper(fpmx.jshj),
                ewm: fpmx.qmz,
                mxzb: filterMxzbPrint(fpmx)
            });
            printDzfp(fpmxPrint);
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
            dzfp_fpcx.initPrintQDData();
            $.cookie("dyfs") == "1" ? LODOP.PRINTA() : LODOP.PRINT();
        },
        initYLQDData: function () {
            if (!checkPrint()) {
                return;
            }
            this.getRowData();
            if (fpmx) {
                this.initPrintQDData(true);
                LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 850, 750, "");
                LODOP.SET_SHOW_MODE("HIDE_PBUTTIN_PREVIEW", 1);
                LODOP.PREVIEW();
            }
        },
        initPrintQDData: function (yl) {
            LODOP.PRINT_INITA((yl ? defaultQDZbj : $.cookie("zbj_qd_zzsp") || 0) + "mm", (yl ? defaultQDYbj : $.cookie("ybj_qd_zzsp") || 0) + "mm", 775, 959, "增值税电子发票（清单）");
            var fpmxPrint = $.extend({fplxdm: "026"}, fpmx, {
                mxzb: filterMxzbQDPrint(fpmx)
            });
            printDzfpQD(fpmxPrint);
        },
        //复制开具
        fzkj: function () {
            this.getRowData();
            if (fpmx) {
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
                if (fpmx.tspz == 08) {
                    alertMsg.info("此功能暂不支持成品油发票！");
                    return;
                }
                navTab.openTab("dzfp_zsfpkj_nav", ctxPath + "/dzfp_spbm/init.do?fzkj=true", {title: "正数发票开具(spbm)"});
            }
        },
        getFpmx: function () {
            return fpmx;
        },
        //修改购方客户电话、购方客户邮箱、对账单号
        updatesjhmandyxdz: function () {
            this.getRowData();
            var url = ctxPath + "/dzfp/updatesjhmandyxdz.do?sjhm=" + fpmx.gfkhdh + "&yxdz=" + fpmx.gfkhyx + "&dzdh=" + fpmx.dzdh + "&fpdm=" + fpmx.fpdm + "&fphm=" + fpmx.fphm;
            $.pdialog.open(url, "updatesjhmandyxdz_dlg", "修改购方客户电话、购方客户邮箱、对账单号", {
                width: 460,
                height: 240
            })
        },
        
        //修改推送
        xgfpts:function (json) {
            dialogAjaxDone(json);
            alertMsg.confirm("修改成功，是否立即推送？", {
                okCall: function(){
                    ajaxLoad(ctxPath + "/dzfp/cxfpts.do?fpdm=" + fpmx.fpdm+ "&fphm=" + fpmx.fphm+ "&nsrsbh=" + fpmx.xhdwdm, function (jsons) {
                        if (jsons.sfxz == 1) {
                            var url = ctxPath + "/dzfp_spbm/tobswjxzgs.do?fpdm=" + jsons.fpdm + "&fphm=" + jsons.fphm + "&nsrsbh=" + jsons.nsrsbh;
                            $.pdialog.open(url, "wjxzgs_dlg", "文件下载格式", {
                                width: 460,
                                height: 240
                            })
                        }
                    });
                }
            });
            //_$('form[rel]:first').submit();
        },
        //推送
        fpts:function () {
            this.getRowData();
            ajaxLoad(ctxPath + "/dzfp/cxfpts.do?fpdm=" + fpmx.fpdm+ "&fphm=" + fpmx.fphm+ "&nsrsbh=" + fpmx.xhdwdm, function (jsons) {
                if (jsons.sfxz == 1) {
                    var url = ctxPath + "/dzfp_spbm/tobswjxzgs.do?fpdm=" + jsons.fpdm + "&fphm=" + jsons.fphm + "&nsrsbh=" + jsons.nsrsbh;
                    $.pdialog.open(url, "wjxzgs_dlg", "文件下载格式", {
                        width: 460,
                        height: 240
                    })
                }
            });
           // _$('form[rel]:first').submit();
        },
        //版式下载
        bsxz:function () {
            this.getRowData();
            var url = ctxPath + "/dzfp_spbm/tobswjxzgs.do?fpdm=" + fpmx.fpdm + "&fphm=" + fpmx.fphm + "&nsrsbh=" + fpmx.nsrsbh;
            $.pdialog.open(url, "wjxzgs_dlg", "文件下载格式", {
                width: 460,
                height: 240
            })
        },
        //修改校验
        xgjy:function () {
            var valid = this.sjhandyxjy();
            if(valid){
                $_("#updateshjandyx_form").submit();
            }

        },
        sjhandyxjy:function () {
            var sjhm = $_("#sjhm").val();
            if (sjhm != "" && !(/^1(3|4|5|7|8)\d{9}$/.test(sjhm))) {
                alert("请输入正确的手机号码！");
                return false;
            }

            var yxdz = $_("#yxdz").val();
            if (yxdz != "" && !(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(yxdz))) {
                alert("请输入正确的邮箱地址！");
                return false;
            }
            var dzdh = $_("#dzdh").val();
            if (dzdh != "" && (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(dzdh))) {
                alert("请输入正确对账单号！");
                return false;
            }
            return true;
        }
    }
}();
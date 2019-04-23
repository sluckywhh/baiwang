var splxxx = function () {
    var fskj = false, blxx = "", jplx, zsfs = "0";
    return {
        ggsppc: function (tr, index, sfhs, fplxdm, isCpy, qysj,nowTime) {
            var _this = this;
            var tds = $(tr).children();
            var yhzcdel = $(tr).attr("yhzcdel");
            if (yhzcdel == "Y") {
                alert("所选商品编码信息不可用,请维护后再使用！");
                return;
            }
            var dqsj=$("#dqsj").val();
            if(!dqsj){
                dqsj=nowTime;
            }
            if(qysj.replace("-", "")>dqsj) {
                alertMsg.warn("该商品编码启用时间为："+qysj+",请重新选择！");
                return;
            }
            var spbm = tds.eq(1).text();
            var sl = tds.eq(6).attr("sl");
            var mslx = tds.eq(11).attr("mslx");
            var yhlx = tds.eq(10).text();
            var spmc = tds.eq(2).text();
            var map = cpy_zzp_fpkj_spbm.getMap();
            if (isCpy) {
                if (!map[spbm.substring(0, 19)]) {
                    alertMsg.warn("只能选择成品油相关税收编码！");
                    return;
                }
            } else {
                var date = new Date();
                var year = date.getFullYear() * 1;
                var month = date.getMonth() + 1;
                var day = date.getDate();
                if (map[spbm.substring(0, 19)] && (year > 2018 || (year == 2018 && month > 3 ) || (year == 2018 && month == 3 && day >= 1))) {
                    alertMsg.warn("不能选择成品油相关税收编码！");
                    return;
                }
            }
            if (zsfs == "1" && yhlx.indexOf("简易征收减按") < 0) {
                alert("请先在“税收编码维护”菜单下，对商品进行相应优惠政策维护！");
                return;
            }
            if (fplxdm == "004" && spbm.substring(0, 1) == "6") {
                alert("6开头的商品编码不能用来开具增值税专票，请检查！");
                return;
            }

            if ((fplxdm == "007" || fplxdm == "026" || fplxdm == "025") && spbm.substring(0, 1) == "6" && !((sl == 0 && sl + "" != "") && mslx == "2")) {
                alert("6开头的商品编码用来开具增值税" + fplxdm == "025" ? "卷式发票" : fplxdm == "026" ? "电子发票" : "普通发票" + "时，税率必须为0，免税类型必须为“不征税”，请检查！");
                return;
            }

            if (jplx == "01" || jplx == "00") {
                if (countStrLength(spmc) > 16) {
                    alert("商品名称最多为16个字符或8个汉字，请检查！");
                    return;
                }
            } else if (jplx == "02" || jplx == "03") {
                if (countStrLength(spmc) > 20) {
                    alert("商品名称最多为20个字符或10个汉字，请检查！");
                    return;
                }
            }
            // } else if (jplx == "04" || jplx == "05") {
            //     if (countStrLength(spmc) > 40) {
            //         alert("商品名称最多为40个字符或20个汉字，请检查！");
            //         return;
            //     }
            // }
            //回填费用项目
            _$("#spmc_" + index).val(tds.eq(2).text());
            _$("#ggxh_" + index).val(tds.eq(3).text());
            _$("#dw_" + index).val(tds.eq(4).text());
            var dj = tds.eq(5).text();
            _$("#spdj_" + index).val(dj);
            var kysl = tds.eq(7).attr("kysl");
            var slSel = _$("#sl_" + index);
            slSel.children("[src='bm']").remove();
            var szsmStr = slSel.html();
                $.each(kysl.split("、"), function (i, n) {
                    var one = $.trim(n) == 0 ? 0 : $.trim(n);
                    if(one!=0 && one != "0.015"){
                        one=(one*1).toFixed(2);
                    }
                    if (szsmStr.indexOf(one) < 0) {
                        if (!(zsfs != 1 && one == "0.015")) {
                            szsmStr += ("<option src='bm' value='" + one + "'>" + ((one + "").length > 4 && (one + "").substring(4, 5) * 1 > 0 ? (one * 100).toFixed(1) : (one * 100).toFixed()) + "%</option>");
                        }
                    }
                });
                if (szsmStr.indexOf("3%") < 0) {
                    szsmStr += ("<option value='0.03'>3%</option>");
                }
            if (fplxdm == "007" || fplxdm == "026" || fplxdm == "025") {
                if (szsmStr.indexOf(">0%<") < 0) {
                    szsmStr += ("<option value='0'>0%</option>");
                }
            }
            if (fplxdm == "004") {
                szsmStr = szsmStr.replace("<option value=\"0\">0%</option>", "");
            }
            if (blxx != "" && blxx != null && blxx.substring(4, 6) == "08") {
                if (fplxdm == "004") {
                    szsmStr = "<option value='0.015'>1.5%</option><option value='0.03'>3%</option><option value='0.05'>5%</option>";
                    if (kysl.indexOf("0.015") < 0) {
                        szsmStr = "<option value='0.03'>3%</option><option value='0.05'>5%</option>";
                    }
                }
                if (fplxdm == "007" || fplxdm == "026" || fplxdm == "025") {
                    szsmStr = "<option value='0'>0%</option><option value='0.03'>3%</option><option value='0.05'>5%</option>";
                }
            }
            var tspzx  = _$("#tspz").val()
            if (blxx != "" && blxx != null && blxx.substring(0, 2) == "01" && tspzx == "02") {
                szsmStr = "<option value='0'>0%</option>"
            }

            if ((fplxdm == "007" || fplxdm == "026" || fplxdm == "025") && spbm.substring(0, 2) == "60") {
                szsmStr = "<option value='0'>0%</option>";

            }
            if (zsfs == "1") {
                szsmStr = "<option value='0.015'>1.5%</option>";
            }
            _$("#sl_" + index).html(sortSl(szsmStr));
            var selectedSl = sl == 0 ? 0 : (sl == "0.015" ? sl : (sl*1).toFixed(2));
            if(ie6){
                setTimeout(function () {
                    _$("#sl_" + index).val(selectedSl);
                },500)
            }else {
                _$("#sl_" + index).val(selectedSl);
            }
            var hsbz = tds.eq(8).attr("hsbz") == "Y";
            //如果是卷票的小数点后保留两位
            if (fplxdm == "025") {
                if (sfhs && !hsbz) {
                    _$("#spdj_" + index).attr("optDj", dj).val(delRight((dj * (1 + sl * 1)).toFixed(3)));
                } else if (!sfhs && hsbz) {
                    _$("#spdj_" + index).attr("optDj", dj).val(delRight((dj / (1 + sl * 1)).toFixed(3)));
                } else {
                    _$("#spdj_" + index).val(delRight(dj));
                    _$("#spdj_" + index).removeAttr("optDj");
                }
            } else {
                if (sfhs && !hsbz) {
                    _$("#spdj_" + index).attr("optDj", dj).val(delRight((dj * (1 + sl * 1)).toFixed(6)));
                } else if (!sfhs && hsbz) {
                    _$("#spdj_" + index).attr("optDj", dj).val(delRight((dj / (1 + sl * 1)).toFixed(6)));
                } else {
                    _$("#spdj_" + index).val(delRight(dj));
                    _$("#spdj_" + index).removeAttr("optDj");
                }
            }
            _$("#je_" + index + ",#se_" + index + ",#spsl_" + index).val("");
            _$("#spbm_" + index).val(spbm);
            _$("#syyh_" + index).val(tds.eq(9).attr("syyh"));
            _$("#yhlx_" + index).val(tds.eq(10).text());
            _$("#mslx_" + index).val(mslx);
            //更改商品使用次数，和最新使用时间
            ajaxLoad(ctxPath + "/spxx/updateSppc.do", {bm: $(tr).attr("rel")}, function (json) {
                if (json.statusCode == DWZ.statusCode.ok) {
                    //$.pdialog.closeCurrent();
                }
            });
            var current = $.pdialog.getCurrent();
            if (current) {
                $.pdialog.closeCurrent();
            }
            reFocus(_$("#spsl_" + index), true);
            //差额征税
            if (_$("#cezs").text() == "普通征税") {
                _$("#spsl_1").val("");
                $.pdialog.open(ctxPath + "/zzspp_spbm/cezs.do", "zzspp_cezs_dlg", "差额设置", {
                    width: 400,
                    height: 200,
                    callback: function () {
                        $("#hsxse").focus();
                        $("#dlg_save_bt").click(function () {
                            _this.checkCezs();
                        });
                    }
                });
            }

        },
        spxx: function (index, hsbz, fplxdm, fskj1, blxx1, jplx1, zsfs1, isCpy) {
            if (blxx1 != "") {
                blxx = blxx1;
            }
            if (jplx1 != "") {
                jplx = jplx1;
            } else {
                jplx = "10";
            }
            zsfs = zsfs1 != "" ? zsfs1 : "0";
            fskj = fskj1;
            var url = ctxPath + "/spxx/splxList.do?targetType=dialog&index=" + index + "&hsbz=" + hsbz + "&fplxdm=" + fplxdm;
            if (isCpy) {
                url += url + "&isCpy=y"
            }
            $.pdialog.open(url, "splx_dlg", "选择税收编码", {
                width: 910,
                height: 500,
                callback: function () {
                    reFocus($_("#bm"));
                }
            });

        },
        //此方法只有在快速选择商品编码功能后台查出一条记录时调用
        spxx1: function (index, hsbz, fplxdm, fskj1, blxx1, jplx1, zsfs1) {
            if (blxx1 != "") {
                blxx = blxx1;
            }
            if (jplx1 != "") {
                jplx = jplx1;
            } else {
                jplx = "10";
            }
            zsfs = zsfs1 != "" ? zsfs1 : "0";
            fskj = fskj1;
        },

        //此方法只有在快速选择商品编码功能后台查出多条(大于一条)时调用
        spxxQuickChoice: function (index, hsbz, fplxdm, fskj1, blxx1, jplx1, zsfs1, spmc, isCpy) {
            if (blxx1 != "") {
                blxx = blxx1;
            }
            if (jplx1 != "") {
                jplx = jplx1;
            } else {
                jplx = "10";
            }
            zsfs = zsfs1 != "" ? zsfs1 : "0";
            fskj = fskj1;
            var url = ctxPath + "/spxx/quickChoiceSpbm.do?targetType=dialog&index=" + index + "&mc=" + encodeURIComponent(spmc) + "&hsbz=" + hsbz + "&fplxdm=" + fplxdm + (isCpy ? "&isCpy=" + isCpy : "" );
            $.pdialog.open(url, "splx_dlg", "选择税收编码", {
                width: 910,
                height: 500
            });
        },
        /**
         * 机动车专用弹出商品编码框
         * @param hsbz
         * @param fskj1
         * @param fplxdm
         *
         */
        spxx_jdc: function (hsbz, fskj1, fplxdm) {
            fskj = fskj1;
            var url = ctxPath + "/spxx/splxList.do?targetType=dialog&hsbz=" + hsbz + "&fplxdm=" + fplxdm;
            $.pdialog.open(url, "splx_dlg", "选择税收编码", {
                width: 910,
                height: 500
            });
        },
        initEditJdcPage: function () {
            limit_money_input($_("#dw,#xcrs"));
        },
        checkJdcxx: function () {
            var xcrs = $_("#xcrs").val();
            if (xcrs.indexOf(".") != -1) {
                alert("限乘人数必须为正整数！");
                return false;
            }
            return true;
        },
        htspxx_jdc: function (tr) {
            var tds = $(tr).children();
            var spbm = tds.eq(1).text();
            if (!spbm.startsWith("1090305") && !spbm.startsWith("1090306") && !spbm.startsWith("1090307") && !spbm.startsWith("1090309") && !spbm.startsWith("1090312") && !spbm.startsWith("1090315")) {
                alertMsg.info("只能选择机动车相关的税收编码！")
                return;
            }
            var yhzcdel = $(tr).attr("yhzcdel");
            if (yhzcdel == "Y") {
                alert("所选商品编码信息不可用,请维护后再使用！");
                return;
            }
            var spmc = tds.eq(2).text();
            var sl = tds.eq(6).attr("sl");
            var dj = tds.eq(5).children("div").text();
            var mslx = tds.eq(11).attr("mslx");
            var yhlx = tds.eq(10).text();
            var hsbz = tds.eq(8).attr("hsbz");
            _$("#cllx").val("");
            _$("#cd").val("");
            _$("#hgzh").val("");
            _$("#jkzmsh").val("");
            _$("#sjdh").val("");
            _$("#fdjhm").val("");
            _$("#clsbdh").val("");
            _$("#wspzhm").val("");
            _$("#dw").val("");
            _$("#xcrs").val("");
            _$("#jshj").val(0.00);
            _$("#jshjdx").text("零元整");
            _$("#zzsse").text("0.00");
            _$("#bhsj").text("0.00");
            _$("#scqymc").val("");
            ajaxLoad(ctxPath + "/spxx/queryJdcSpbmxx.do?bm=" + spbm, {async: false}, function (json) {
                if (spbm.length > 19) {
                    _$("#cpxh").val(spmc);
                    _$("#cllx").val(spmc);
                } else if (spbm.length == 19) {
                    _$("#cllx").val(spmc);
                }
                var jdc = json.jdcModel;
                if (jdc != undefined) {
                    _$("#cd").val(jdc.cd);
                    _$("#hgzh").val(jdc.hgzh);
                    _$("#jkzmsh").val(jdc.jkzmsh);
                    _$("#sjdh").val(jdc.sjdh);
                    _$("#fdjhm").val(jdc.fdjhm);
                    _$("#clsbdh").val(jdc.clsbdm);
                    _$("#wspzhm").val(jdc.wspzhm);
                    _$("#dw").val(jdc.dw);
                    _$("#xcrs").val(jdc.xcrs);
                    _$("#scqymc").val(jdc.scqymc);
                    if (jdc.cpxh != "" && jdc.cpxh != null) {
                        _$("#cpxh").val(jdc.cpxh);
                    }
                    if (jdc.cllx != "" && jdc.cllx != null) {
                        _$("#cllx").val(jdc.cllx);
                    }
                }
            });

            var yhzcbs = tds.eq(9).attr("syyh");
            _$("#spbm").val(spbm);
            _$("#zxbm").val(spbm.substring(19, spbm.length));
            _$("#yhzcbs").val(yhzcbs);
            _$("#lslbs").val(mslx);
            _$("#zzstsgl").val(yhlx);
            var kysl = tds.eq(7).attr("kysl");
            _$("#zzssl").children("[src='bm']").remove();
            var szsmStr = _$("#zzssl").html();
            $.each(kysl.split("、"), function (i, n) {
                var one = $.trim(n) == 0 ? 0 : $.trim(n);
                if(one!=0 && one != "0.015"){
                    one=(one*1).toFixed(2);
                }
                if (szsmStr.indexOf(one) < 0) {
                    szsmStr += ("<option src='bm' value='" + one + "'>" + ((one + "").length > 4 && (one + "").substring(4, 5) * 1 > 0 ? (one * 100).toFixed(1) : (one * 100).toFixed()) + "%</option>");
                }
            });
            _$("#zzssl").remove();
            _$(".table2 > tbody  tr").eq(9).find("td").eq(1).html("<select  awidth='50' id='zzssl' name='zzssl'>" + szsmStr + "</select>")
            _$("#zzssl").val((sl*1).toFixed(2));
            _$("#zzssl").combox();
            if (_$("#fsbz").text() != "") {
                dj = -dj;
            }
            if (dj != "" && dj != null) {
                var bhsj, jshj, zzsse;
                sl = _$("#zzssl").val();
                if (hsbz == 'N') {
                    bhsj = (dj * 1).toFixed(2);
                    _$("#bhsj").text(bhsj);
                    zzsse = (bhsj * sl).toFixed(2);
                    _$("#zzsse").text(zzsse);
                    jshj = bhsj * 1 + zzsse * 1;
                    _$("#jshj").val(jshj.toFixed(2));
                    _$("#jshjdx").text(je2Upper(jshj));
                } else if (hsbz == 'Y') {
                    jshj = (dj * 1).toFixed(2);
                    bhsj = (jshj / (1 + (sl * 1))).toFixed(2)
                    _$("#jshj").val(jshj);
                    _$("#bhsj").text(bhsj);
                    _$("#zzsse").text((jshj - bhsj).toFixed(2));
                    _$("#jshjdx").text(je2Upper(jshj));
                }
            }
            //jdc_zsfpkj_spbm.addListener();
            //税率变化计算
            _$("#zzssl").bind("change", function () {
                var jshj = _$("#jshj").val() * 1;
                if (jshj != "") {
                    var sl = _$("#zzssl").val() * 1;
                    var bhsj = (jshj / (1 + sl)).toFixed(2);
                    var se = (jshj - bhsj).toFixed(2);
                    _$("#zzsse").text(se);
                    _$("#bhsj").text(bhsj);
                }
            });
            var current = $.pdialog.getCurrent();
            if (current) {
                $.pdialog.closeCurrent();
            }


        },
        htspxx_esc: function (tr) {
            var tds = $(tr).children();
            var spbm = tds.eq(1).text();
            if (!spbm.startsWith("1090305") && !spbm.startsWith("1090306") && !spbm.startsWith("1090307") && !spbm.startsWith("1090309") && !spbm.startsWith("1090312") && !spbm.startsWith("1090315")) {
                alertMsg.info("只能选择机动车相关的税收编码！");
                return;
            }
            var yhzcdel = $(tr).attr("yhzcdel");
            if (yhzcdel == "Y") {
                alert("所选商品编码信息不可用,请维护后再使用！");
                return;
            }
            var spmc = tds.eq(2).text();
            var sl = tds.eq(6).attr("sl");
            var mslx = tds.eq(11).attr("mslx");
            var yhlx = tds.eq(10).text();
            var hsbz = tds.eq(8).attr("hsbz");
            _$("#cllx").val("");
            _$("#cpxh").val("");
            _$("#jshj").val("");
            _$("#jshj_xx").val("");
            if (spbm.length > 19) {
                _$("#cpxh").val(spmc);
                _$("#cllx").val(spmc);
            } else if (spbm.length == 19) {
                _$("#cllx").val(spmc);
            }
            var yhzcbs = tds.eq(9).attr("syyh");
            _$("#spbm").val(spbm);
            _$("#zxbm").val(spbm.substring(19, spbm.length));
            _$("#yhzcbs").val(yhzcbs);
            _$("#lslbs").val(mslx);
            _$("#zzstsgl").val(yhlx);

            var current = $.pdialog.getCurrent();
            if (current) {
                $.pdialog.closeCurrent();
            }

        },
        checkCezs: function () {
            var hsxse = $("#hsxse").val();
            var kce = $("#kce").val();
            if (hsxse == "") {
                alert("请输入含税销售额！");
                //$("#hsxse").focus();
                reFocus($_("#hsxse"))
                return;
            }
            if (kce == "") {
                alert("请输入扣除额！");
                $("#kce").focus();
                return;
            }
            hsxse = hsxse * 1;
            kce = kce * 1;

            var sl = _$("#sl_1").val() * 1;
            _$("#hsxseBz").val(hsxse);
            _$("#kceBz").val(kce);
            _$("#spdj_1").val("");
            _$("#kcegtxse").remove();
            if (hsxse - kce < 0) {
                // _$("#sl_1").attr("disabled", "disabled");
                _$("#se_1").val("0.00");
                _$("#se_1").parent().append($("<input type='hidden' id='kcegtxse' value='y'>"));
            } else {
                _$("#sl_1").removeAttr("disabled");
                _$("#se_1").val((fskj ? "-" : "") + ((hsxse - kce) - (hsxse - kce) / (1 + sl)).toFixed(2));
            }
            _$("#je_1").val((fskj ? "-" : "") + (Math.abs(hsxse) - Math.abs((_$("#se_1").val()) * 1)).toFixed(2));
            _$("#jshj").text("￥" + (fskj ? "-" : "") + hsxse.toFixed(2));
            _$("#hjje").text("￥" + _$("#je_1").val());
            _$("#hjse").text("￥" + _$("#se_1").val());
            _$("#hzhjje").text("￥" + _$("#je_1").val());
            _$("#hzhjse").text("￥" + _$("#se_1").val());
            _$("#jshjdx").text(je2Upper(hsxse.toFixed(2)));
            _$("#cezsBz").val("差额征税：" + kce.toFixed(2) + "。");
            $.pdialog.closeCurrent();
        },
        //税号商品展示
        shsp: function () {
            var url = ctxPath + "/spxx/shspList.do?targetType=dialog";
            $.pdialog.open(url, "sjspList_dlg", "税收编码同步", {
                width: 800,
                height: 500
            });
        },
        //同步升级商品
        tbsjsp: function () {
            //获取选中的checkBox
            var nsrsbh = $_("input[id^='sh_']:checked");
            //$.pdialog.closeCurrent();
            var ss = "";
            nsrsbh.each(function () {
                ss = ss + this.value + ",";
            });
            ajaxLoad(ctxPath + "/spxx/tbsp.do", {nsrsbh: ss}, function (json) {
                if (json.statusCode == DWZ.statusCode.ok) {
                    alertMsg.correct(json.message);
                    $.pdialog.closeCurrent();
                }
            });
        },
        //下载
        exportSp: function () {
            location.href = ctxPath + "/spxx/exportSp.do";
        },
        //查询该省份下的商品编码列表
        sjspxx: function () {
            var url = ctxPath + "/spxx/sjsp.do?targetType=dialog";
            $.pdialog.open(url, "sjsp_dlg", "选择税收编码", {
                width: 910,
                height: 500
            });

        }
    };


}();
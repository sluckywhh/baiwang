var cpy_zzp_hzsqd_spbm = function () {
    // 修改了 js和controller类
    var nowRowCount, szsmStr, sfhs, scsm, isMulti, leng, myse, zsfs, qdbz, ptSzsmStr, isSjje;//是否涉及金额
    var map = {
        "1070101010100000000": 1388,
        "1070101010200000000": 1388,
        "1070101010300000000": 1388,
        "1070101010400000000": 1388,
        "1070101010500000000": 1388,
        "1070101030100000000": 1176,
        "1070101030200000000": 1176,
        "1070101030300000000": 1176,
        "1070101030400000000": 1176,
        "1070101020200000000": 1176,
        "1070101050100000000": 1385,
        "1070101050200000000": 1385,
        "1070101050300000000": 1385,
        "1070101060100000000": 1282,
        "1070101070100000000": 1126,
        "1070101070200000000": 1126,
        "1070101070300000000": 1126,
        "1070101040100000000": 1015,
        "1070101040200000000": 1015,
        "1070101040300000000": 1015,
        "1070101020100000000": 1246
    };
    return {
        addRow: function (p) {
            zsfs = _$("#zsfs").val();
            if (nowRowCount == 7) {
                disableButtons(_$("#add"));
            }
            enableButtons(_$("#del"));

            if (nowRowCount == 1 && zsfs == "2") {
                alert("差额征税商品行最大行数为1，不能继续添加！");
                return;
            }
            if (nowRowCount == 8 && zsfs == "1") {
                alert("已到减按征税最大行数，无法继续新增费用项目。");
                return;
            }
            nowRowCount++;
            var tr = _$("<tr index='"
                + nowRowCount
                + "'><td><input name='spmc_"
                + nowRowCount
                + "' id='spmc_"
                + nowRowCount
                + "' style='width:163px;' maxlength='92' /></td>"
                + "<td><input name='spdj_"
                + nowRowCount
                + "' id='spdj_"
                + nowRowCount
                + "' style='width:116px;text-align:right' maxlength='13' " + (isSjje ? " disabled='disabled' " : "") + "/></td>"
                + "<td><input name='spsl_"
                + nowRowCount
                + "' id='spsl_"
                + nowRowCount
                + "' style='width:75px;text-align:right' maxlength='13' " + (isSjje ? " disabled='disabled' " : "") + "/></td>"
                + "<td><input name='je_"
                + nowRowCount
                + "' id='je_"
                + nowRowCount
                + "' style='width:116px;text-align:right' maxlength='16'/></td>"
                + "<td><select name='sl_"
                + nowRowCount
                + "' id='sl_"
                + nowRowCount
                + "' style='width:98%;'>"
                + szsmStr
                + "</select></td>"
                + "<td><input name='se_"
                + nowRowCount
                + "' realSe_"
                + nowRowCount
                + "=''"
                // + " onblur='cpy_zzp_hzsqd_spbm.se_onBlur(" + nowRowCount
                // + ");'"
                + " readonly='readonly'"
                + " id='se_"
                + nowRowCount
                + "' type='text' style='width:134px;text-align:right' style='disabled:true'/>"
                + "<input id='hsbz_" + nowRowCount + "' name='hsbz_"
                + nowRowCount + "' " + "value='" + (sfhs ? "y" : "n")
                + "' type='hidden'/>" + "<input id='spbm_" + nowRowCount
                + "' name='spbm_" + nowRowCount + "' " + " type='hidden'/>"
                + "<input id='qyspbm_" + nowRowCount + "' name='qyspbm_"
                + nowRowCount + "' " + " type='hidden'/>"
                + "<input id='syyh_" + nowRowCount + "' name='syyh_"
                + nowRowCount + "' " + "type='hidden'/>"
                + "<input id='yhlx_" + nowRowCount + "' name='yhlx_"
                + nowRowCount + "' " + " type='hidden'/>"
                + "<input id='mslx_" + nowRowCount + "' name='mslx_"
                + nowRowCount + "' " + " type='hidden'/></td></tr>");
            _$("#fyxmdiv tr[placeholder]:first").before(tr).remove();// di为fyxmdiv表单下面的带placeholder属性的第一个tr
            limit_money_input(_$("#spsl_" + nowRowCount
                + ",#spdj_"// 限制金额输出
                + nowRowCount + ",#je_" + nowRowCount + ",#se_"
                + nowRowCount));
            if (p != "not_focus") {
                reFocus(_$("#spmc_" + nowRowCount)[0]);
            }
            // 绑定事件
            cpy_zzp_hzsqd_spbm.addRowDbclick(tr);
        },
        se_onBlur: function (index) {
            zsfs = _$("#zsfs").val();
            var realSe = $("#se_" + index).attr("realSe_" + index);
            var se = $("#se_" + index).val();
            var ce = Math.abs(realSe * 1) - Math.abs(se * 1);// 真实税额和用户填写的税额之差
            if (Math.abs(ce).toFixed(2) > 0.1 || (se.indexOf("-") != 0)) {
                alert("填写税额与实际值不符，请重新填写！");
                $("#se_" + index).val(realSe);
            }
            cpy_zzp_hzsqd_spbm.reCountHjje();
        },
        addRowDbclick: function (tr) {
            quicklyChoiceSpbm(tr, sfhs, "004", false, zsfs,true);
            tr.bind("dblclick", this.spxx);
            tr.find("input[id^='spsl'],input[id^='spdj']").bind("change",
                function () {
                    var index = getIndex(this.id);// 获取行角标
                    var temp = Number(this.value).toFixed(6);// 将商品数量或商品单价四舍五入保留6位小数
                    if (temp == "NaN") {
                        temp = this.value.substring(
                            this.value.indexOf("-"), this.value.length);
                    }
                    temp = delRight(String(temp));// 删除所有最右边的0
                    var isdj = this.id.indexOf("dj") != -1;// 是否是单价
                    this.value = temp = (temp == "" ? "" : (isdj
                        ? temp
                        : -Math.abs(temp)));
                    var otherValue = isdj
                        ? _$("#spsl_" + index).val()
                        : _$("#spdj_" + index).val();
                    if (temp != "" || otherValue != "") {
                        var plusJe = temp * otherValue;
                        if (Math.abs(plusJe) > 9999999999.99) {
                            alert("您的输入有误,请修正单价或数量");
                            this.value = "";
                            return;
                        }
                        var result = (plusJe).toFixed(2);
                        _$("#je_" + index).val(result == 0 ? "" : result);
                    }
                    if (temp != "" || otherValue != "") {
                        var result = (temp * otherValue).toFixed(2);
                        _$("#je_" + index).val(result == 0 ? "" : result);
                    }
                    if (isdj) {
                        $(this).removeAttr("optDj");
                        _$("#hsbz_" + index).val(sfhs ? "y" : "n");
                    }
                    cpy_zzp_hzsqd_spbm.reCountRow(index, true);
                });
            tr.find("input[id^='je']").bind("change", function () {
                var index = getIndex(this.id);
                this.value = this.value.replace(/-/, "")
                    * (-1).toFixed(2);
                if (this.value.replace("-", "") > 9999999999.99) {
                    alert("您的输入有误,请修金额大小");
                    this.value = "";
                    return;
                }
                if (this.value == 0) {
                    this.value = "";
                }
                var index = getIndex(this.id);
                var spsl = _$("#spsl_" + index);
                var spdj = _$("#spdj_" + index);
                if (spsl.val() != "") {
                    if (isSjje) {
                        spdj.val("");
                    } else {
                        spdj.val(delRight((this.value / spsl.val())
                            .toFixed(6)));
                        spdj.removeAttr("optDj");
                        _$("#hsbz_" + index).val(sfhs ? "y" : "n");
                    }
                } else if (spdj.val() != "") {
                    if (isSjje) {
                        spdj.val("");
                    } else {
                        spsl.val(delRight((this.value / spdj.val())
                            .toFixed(6)));
                    }

                }
                cpy_zzp_hzsqd_spbm.reCountRow(index);
            });
            tr.find("input[id^='se']").bind("change", function () {
                if (qdbz) {
                    this.value = this.value.replace(/-/, "")
                        * (-1).toFixed(2);
                    var se = _$("#se_1").val() * 1;
                    var je = _$("#je_1").val() * 1;
                    if (sfhs) {
                        je = je - se;
                    }
                    var sl = _$("#sl_1").val() * 1;
                    if (je != "" && je != null) {
                        var ce;
                        if (isMulti == "0") {// 0为单税率
                            if (je != "") {
                                ce = Math.abs(je * sl) - Math.abs(se);
                                if (ce >= 1 || ce <= -1) {
                                    alert("金额或税额输入不正确，请检查！");
                                    _$("#se_1").val("");
                                    cpy_zzp_hzsqd_spbm.reCountHjje();
                                    return;
                                }
                            }
                        } else if (isMulti == "1") {// 如果为多税率
                            ce = Math.abs(se) - Math.abs(je);
                            if (ce >= 0) {
                                alert("金额或税额输入不正确，请检查！");
                                _$("#se_1").val("");
                                cpy_zzp_hzsqd_spbm.reCountHjje();
                                return;
                            }
                        }

                    }
                    _$("#se_1").val(se.toFixed(2));
                    cpy_zzp_hzsqd_spbm.reCountHjje();

                }

            });
            tr.find("select[id^='sl']").bind("change", function () {
                var index = getIndex(this.id);
                _$("#spdj_" + index).removeAttr("optDj");
                if (_$("#je_" + index).val() == "") {
                    return;
                }
                cpy_zzp_hzsqd_spbm.reCountRow(index);
            })
        },
        // 打开商品编码dlg
        spxx: function () {
            var index = getIndex($(this).attr("index"));
            splxxx.spxx(index, sfhs, "004", true, "", "", zsfs, true);
        },
        tk: function () {
            _$("#hzdd_spbm0").hide();
            _$("#hzdd_spbm1").hide();
            _$("#hzdd_spbm2").hide();
            _$("#hzdd_spbm3").hide();
            _$("#hzdd_spbm4").hide();
            _$("#hzdd_spbm5").show();
        },
        chooseSqlx: function () {
            _$("#hzdd_spbm0").hide();
            _$("#hzdd_spbm1").show();
            _$("#hzdd_spbm2").hide();
            _$("#hzdd_spbm3").hide();
            _$("#hzdd_spbm4").hide();
            _$("#hzdd_spbm5").hide();
            //如果是涉及金额
            var slOrje = _$("input[name='slOrje']:checked").val();
            //涉及金额，数量不能更改
            if (slOrje == "02") {
                isSjje = true;
            } else {
                isSjje = false;
            }
            _$("#isSjje").val(slOrje);
            cpy_zzp_hzsqd_spbm.addListener();
        },
        xyb: function () {
            if (!_$("#fpdm_s").attr("disabled")) {
                if (!/\d{10}/.test(_$("#fpdm_s").val())) {
                    alert("发票代码填写有误！");
                    return;
                } else if (!/\d{8}/.test(_$("#fphm_s").val())) {
                    alert("发票号码填写有误！");
                    return;
                }
            }
            _$("#zsfs").val("0");
            // 申请单
            ajaxLoad(ctxPath + "/cpy_hzsqdspbm/sqdjy.do", _$("#hzsqd_spbm_form")
                .serialize(), function (json) {
                _$("#hzdd_spbm1").hide();
                _$("#hzdd_spbm3").show();
                _$("#kprq").text(json.kprq);// 开票日期
                _$("#jbr").text(json.jbr);// 经办人
                _$("#qsqdh").text(json.sqdh);// 申请单号
                _$("#fpdm").text(json.fpdm == null ? "" : json.fpdm);// 发票代码
                _$("#fphm").text(json.fphm == null ? "" : json.fphm);// 发票号码

                _$("#cezs").parent().parent().show();
                _$("#jazs").parent().parent().show();


                cpy_zzp_hzsqd_spbm.cxHtSqd(json);

            });
        },
        toggleCezs: function () {
            var cezs = _$("#cezs");
            if (cezs.text() == "差额征税") {// 差额征税
                do {
                    cpy_zzp_hzsqd_spbm.delRow();
                } while (nowRowCount >= 0);
                nowRowCount = 0;
                zsfs = "2";
                cezs.text("普通征税");
                _$("#zsfs").val("2");
                cpy_zzp_hzsqd_spbm.addRow();
                _$("#jazs,#price").parent().parent().hide();
                _$("#spdj_1").attr("readonly", true);
                _$("#je_1").attr("readonly", true);

            } else { // 普通征税
                do {
                    cpy_zzp_hzsqd_spbm.delRow();
                } while (nowRowCount >= 0);
                nowRowCount = 0;
                zsfs = "0";
                _$("#zsfs").val("0");
                _$("#price,#jazs").parent().parent().show();
                cezs.text("差额征税");
            }
        },
        //减按征税与普通征税之间切换 TODO
        toggleJazs: function () {
            var jazs = _$("#jazs");
            if (jazs.text() == "减按征税") {
                do {
                    cpy_zzp_hzsqd_spbm.delRow();
                } while (nowRowCount >= 0);
                zsfs = "1";
                _$("#zsfs").val("1");
                jazs.text('普通征税');
                qdbz = false;
                _$("#qd").parent().parent().hide();
                _$("#spmctitle").text("货物或应税劳务名称");
                sfhs = true;
                // _$("#sfhsstr").html("金额<span style='color:red'>(含税)</span>");
                // _$("#djsfhsstr").html("单价<span style='color:red'>(含税)</span>");
                //_$("#ghdwmc,#ghdwdm,#ghdwyhzh,#ghdwdzdh,#bz").val("");
                _$("#jshj").text("￥" + "0.00");
                _$("#jshjdx").text(je2Upper(0));
                _$("#hjje").text("￥" + "0.00");
                _$("#hjse").text("￥" + "0.00");
                _$("#zk,#price,#qd,#cezs,#fyxm,#fyxmmb,#fyxmdrsm").parent().parent().hide();
                var fyxm_table = _$("#fyxms");
                fyxm_table.empty();
                for (var index = 1; index <= 8; index++) {
                    fyxm_table.append(this.newPlaceHolder());
                }
                nowRowCount = 0;
                ptSzsmStr = szsmStr;
                szsmStr = "<option value='0.015'>1.5%</option>";
                //this.addRow();
            } else {//普通征税
                do {
                    cpy_zzp_hzsqd_spbm.delRow();
                } while (nowRowCount >= 0);
                nowRowCount = 0;
                zsfs = "0";
                _$("#zsfs").val("0");
                _$("#price,#cezs").parent().parent().show();
                jazs.text("减按征税");
                szsmStr = ptSzsmStr;
                //_$("#cezs").text("差额征税").show();
            }
        },

        dunHandler: function (bm, dj, sl) {
            bm = bm.substring(0, 19);
            if (bm && dj) {
                if (map[bm]) {
                    dj = (dj / map[bm]).toFixed(6);
                }
            }
            if (bm && sl) {
                if (map[bm]) {
                    sl = (sl * map[bm]).toFixed(6);
                }
            }
            return {dj: dj, sl: sl};
        },
        cxHtSqd: function (args) {
            var spbm = false;
            var sqdmx = args.yfpmx;// 原发票明细
            if (sqdmx.bmbbbh != null && sqdmx.bmbbbh != "") {// 编码表版本号不为空，说明带有商品编码
                spbm = true;
                _$("#spbmbbh").val(sqdmx.bmbbbh);
                _$("#zsfs").val(sqdmx.zsfs);
            }
            var sqlx = sqdmx.sqlx;// 申请类型
            var sfyyfp = args.sfyyfp;// 是否有原发票
            _$("#xhdwmc").val(sqdmx.xhdwmc);
            _$("#xhdwdm").val(sqdmx.xhdwdm);
            _$("#ghdwmc").val(sqdmx.ghdwmc);
            _$("#ghdwdm").val(sqdmx.ghdwdm);
            if (sqdmx.sqlx > 1) {
                _$("#xhdwmc").attr("readonly", "readonly");
                _$("#xhdwdm").attr("readonly", "readonly");
            } else {
                _$("#ghdwmc").attr("readonly", "readonly");
                _$("#ghdwdm").attr("readonly", "readonly");
            }
            if (sqdmx.mxzb != null && sqdmx.mxzb != "") {// 判断明细子表是否为空
                leng = sqdmx.mxzb.length;
                isMulti = sqdmx.isMutiRate;// 是否为多税率
            } else {
                cpy_zzp_hzsqd_spbm.reDeal(args);
                return;
            }
            cpy_zzp_hzsqd_spbm.reDeal(args);
            if (sqdmx.zsfs == "2") {
                disableButtons(_$("#price"));
                _$("#cezs").text("普通征税");
                _$("#zsfs").val("2");
            } else if (sqdmx.zsfs == "0") {
                _$("#cezs").text("差额征税");
                _$("#zsfs").val("0");
            } else if (sqdmx.zsfs == "1") {
                _$("#jazs").text("普通征税");
                _$("#zsfs").val("1");
            }
            if (sqdmx.zsfs == "1") {
                ptSzsmStr = szsmStr;
                szsmStr = "<option value='0.015'>1.5%</option>";
            }
            if (sqdmx.je) {
                _$("#jym").parent().append($("<input id='yfpHjje' value='" + (sqdmx.je) + "' type='hidden'/>"));
            }
            if(sfhs){
                this.toggleSfhs();
            }
            for (var i = 1; i <= sqdmx.mxzb.length; i++) {
                if (_$("#slOrje").val() == '02') {
                    isSjje = true;
                }
                var mx = sqdmx.mxzb[i - 1];
                cpy_zzp_hzsqd_spbm.addRow("not_focus");
                var tr = _$("#spmc_" + i).parents("tr:first");

                //如果是吨转化为升
                var bm = mx.spbm;
                var dj = mx.spdj;
                var sl = mx.spsl;
                if (mx.dw == '吨') {
                    var __ret = this.dunHandler(bm, dj, sl);
                    dj = __ret.dj;
                    sl = __ret.sl;
                }
                _$("#spmc_" + i).val(mx.spmc);
                if (mx.spsl == null || mx.spsl == "") {
                    _$("#spsl_" + i).val("");
                } else {
                    if (isSjje) {
                        _$("#spsl_" + i).val("");
                    } else {
                        _$("#spsl_" + i).val(delRight(-sl * 1 + ""));
                    }

                }

                var spdj = _$("#spdj_" + i);
                if (mx.spsl == null || mx.spsl == "") {
                    spdj.val("");
                } else {
                    if (isSjje) {
                        spdj.val("");
                    } else {
                        spdj.val(dj);
                    }
                }
                if (spbm) {
                    _$("#spbm_" + i).val(mx.spbm);
                    _$("#qyspbm_" + i).val(mx.zxbm);
                    _$("#syyh_" + i).val(mx.yhzcbs);
                    _$("#yhlx_" + i).val(mx.zzstsgl);
                    _$("#mslx_" + i).val(mx.lslbs);
                }
                _$("#je_" + i).val((-mx.je).toFixed(2));
                //_$("#sl_"+i).append($("<option value='0.015'>1.5%</option>"));
                _$("#sl_" + i).val(mx.sl);
                // _$("#sl_" + i).attr("disabled", true);
                _$("#se_" + i).val((-mx.se).toFixed(2));
                if (sqdmx.zsfs == "0") {
                    _$("#se_" + i).attr("realSe_" + i,
                        ((-mx.je * mx.sl)).toFixed(2));
                } else if (sqdmx.zsfs == "2" || sqdmx.zsfs == "1") {
                    _$("#se_" + i).attr("realSe_" + i, (-mx.se).toFixed(2));
                    _$("#spdj_" + i).attr("readonly", "readonly");
                    _$("#spsl_" + i).attr("readonly", "readonly");
                    _$("#je_" + i).attr("readonly", "readonly");
                    _$("#sl_" + i).attr("disabled", "disabled");
                }

                _$("#hsbz_" + i).val("n");
                // tr.unbind("dblclick");
                // _$("#je_" + i).attr("readonly", "readonly");
                // _$("#spdj_" + i).attr("readonly", "readonly");
                // _$("#spsl_" + i).attr("readonly", "readonly");
                _$("#se_" + i).attr("readonly", "readonly");

            }
            if (zsfs == "1") {
                cpy_zzp_hzsqd_spbm.toggleSfhs();
                disableButtons(_$("#price"));
            }
            if (sqdmx.mxzb.length == 1 && sqdmx.mxzb[0].spmc == "详见对应正数发票及清单") {// 为清单的情况
                qdbz = true;
                _$("#fyxmdiv tr[index=1]").unbind("dblclick");
                _$("#sl_1").attr("disabled", "disabled");
                _$("#spdj_1").attr("readonly", "readonly");
                _$("#spsl_1").attr("readonly", "readonly");
                _$("#se_1").removeAttr("readonly");
                _$("#add").parent().parent().hide();
                _$("#del").parent().parent().hide();
            } else {
                qdbz = false;
            }
            // disableButtons(_$("#del"));
            // disableButtons(_$("#add"));
            cpy_zzp_hzsqd_spbm.reCountHjje();
            this.toggleSfhs();
            this.toggleSfhs();
        },
        init: function () {
            disableButtons(_$("#del"));
            nowRowCount = 0, szsmStr = "", sfhs = false, ptSzsmStr = "";
            qdbz = false;
            //cpy_zzp_hzsqd_spbm.toggleSfhs();
        },
        reDeal: function (args) {
            cpy_zzp_hzsqd_spbm.init();
            // 变化输入框为文字显示购货方或销货方
            var sqdmx = args.yfpmx;// 原发票明细
            _$("#scsm").val(sqdmx.scsm);// 上传说明
            _$("#insqdh").val(sqdmx.sqdh);// 申请单号
            _$("#infpdm").val(sqdmx.fpdm);// 发票代码
            _$("#infphm").val(sqdmx.fphm);// 发票号码
            _$("#insqlx").val(sqdmx.sqlx);// 申请类型
            var sqlx = sqdmx.sqlx;
            var index = [];
            if (sqlx == 0) {
                index = [0, 1];
            } else if (sqlx == 1) {
                index = [0, 2];
            } else if (sqlx == 2) {
                index = [3];
            }
            _$("#sqlx_td :radio").attr("disabled", "disabled").each(
                function (i, n) {
                    $(n).attr("disabled", true);
                    for (var j = 0; j < index.length; j++) {
                        if (i == index[j]) {
                            $(n).attr("checked", "checked");
                        }
                    }
                    if (i == index[index.length - 1]) {
                        $(n).removeAttr("disabled");
                    }
                });
            // 生成占位行
            for (var index = 1; index <= 8; index++) {
                _$("#fyxmdiv tr:last").prev().after(cpy_zzp_hzsqd_spbm
                    .newPlaceHolder());
            }
            // 税种税目
            $.each(eval(args.szsm), function (i, n) {
                if (isMulti == "1" && leng == 1) {
                    szsmStr = ("<option></option>");
                } else {
                    szsmStr += ("<option value='" + n + "'>" + n * 100 + "%</option>");
                }

            });
            // 选取纳税人
            // _$(":text#ghdwmc,:text#ghdwdm,:text#xhdwmc,:text#xhdwdm").dblclick(selectNsr);
            // 默认添加一行
            // addRow();
        },
        addListener: function () {
            _$("#sqdtx :radio[id='sqlx3']").change(function () {
                _$("#sqdtx :radio[id='sqlx0']").attr("checked", false);
                _$("#sqdtx :radio[name='sqlx']").each(function () {
                    if ($(this).val() < 2) {
                        $(this).attr("disabled", true);
                    }
                });
                cpy_zzp_hzsqd_spbm.enableFpdmhm();
            });
            _$("#sqdtx :radio[id='sqlx0']").change(function () {
                _$("#sqdtx :radio[id='sqlx3']").attr("checked", false);
                _$("#sqdtx :radio[id='sqlx1']").attr("checked", true);
                _$("#sqdtx :radio[name='sqlx']").each(function () {
                    if ($(this).val() < 2) {
                        $(this).removeAttr("disabled");
                    }
                });
                cpy_zzp_hzsqd_spbm.disableFpdmhm();
            });
            _$("#sqdtx :radio[id='sqlx2']").change(function () {
                cpy_zzp_hzsqd_spbm.enableFpdmhm();
            });
            _$("#sqdtx :radio[id='sqlx1']").change(function () {
                cpy_zzp_hzsqd_spbm.disableFpdmhm();
            });
            cpy_zzp_hzsqd_spbm.disableFpdmhm();
        },
        enableFpdmhm: function () {
            _$("#fpdm_s,#fphm_s").removeAttr("disabled");
        },
        disableFpdmhm: function () {
            _$("#fpdm_s,#fphm_s").attr("disabled", "disabled").val("");
        },
        newPlaceHolder: function () {
            return "<tr placeholder='y'><td/><td/><td/><td/><td/><td>"
                + "<input type='text' style='visibility:hidden;' disabled='disabled'/></td></tr>"
        },
        shxz: function () {
            _$("hzdd_spbm3").hide();
            _$("#hzdd_spbm0").hide();
            _$("#hzdd_spbm1").hide();
            _$("#hzdd_spbm2").hide();
            _$("#hzdd_spbm4").show();

        },
        fh: function () {
            _$("#hzdd_spbm0").show();
            _$("#hzdd_spbm2").show();
            _$("#hzdd_spbm1").hide();
            _$("#hzdd_spbm3").hide();
            _$("#hzdd_spbm4").hide();
            _$("#hzdd_spbm5").hide();
        },
        qx: function () {
            _$("#hzdd_spbm3").hide();
            _$("#hzdd_spbm2").show();
            _$(".searchBar").show();
        },
        hzxz: function () {
            var inputs = _$("#hzdd_spbm4 td input");
            var sjq = inputs.eq(0).val();
            var sjz = inputs.eq(1).val();
            var date1 = new Date(sjq.replace(/\-/g, '/'));
            var date2 = new Date(sjz.replace(/\-/g, '/'));
            if (date1.getTime() - date2.getTime() > 0) {
                alert("起始日期不能大于终止日期！");
                return;
            }
            location.href = ctxPath + "/cpy_hzsqdspbm/shxz.do?kpsjq=" + sjq
                + "&kpsjz=" + sjz + "&hzxxb=" + inputs.eq(2).val();
        },
        reCountHjje: function () {
            var hjje = 0, se = 0, jshj = 0;
            _$("#fyxmdiv :text[id^='je']").each(function () {
                hjje += $(this).val() * 1;
            });
            _$("#fyxmdiv :text[id^='se']").each(function () {
                se += $(this).val() * 1;
            });
            hjje += _$("#hjzkje").text() * 1;// TODO:合计折扣金额？
            se += _$("#hjzkse").text() * 1;// 合计折扣税额？
            if (sfhs) {
                jshj = hjje.toFixed(2);// 价税合计？
                hjje = jshj - se;
            } else {
                jshj = (hjje + se).toFixed(2);
            }
            _$("#hzhjje").text("￥" + hjje.toFixed(2));
            _$("#hzhjse").text("￥" + se.toFixed(2));
        },
        delRow: function () {
            if (nowRowCount == 1) {
                disableButtons(_$("#del"));
            } else if (nowRowCount == 8) {
                enableButtons(_$("#add"));
            }
            nowRowCount--;
            _$("#fyxmdiv tr[index]:last").before(cpy_zzp_hzsqd_spbm
                .newPlaceHolder()).remove();
            reFocus(_$("#spmc_" + nowRowCount)[0]);
            cpy_zzp_hzsqd_spbm.reCountHjje();
        },
        // 是否含税切换
        toggleSfhs: function () {
            if (sfhs) {
                sfhs = false;
                _$("#sfhsstr").text("金额(不含税)");
                _$("#djsfhsstr").text("单价(不含税)");
                _$("#fyxmdiv :text[id^='je']").each(function () {
                    if (this.value != "") {
                        var index = getIndex(this.id);
                        this.value = (this.value - _$("#se_" + index).val())
                            .toFixed(2);
                    }
                });
                _$("#fyxmdiv :text[id^='spdj']").each(function () {
                    if (this.value != "") {
                        var optDj = $(this).attr("optDj");
                        if (optDj) {
                            $(this).attr("optDj", this.value);
                            this.value = optDj;
                        } else {
                            $(this).attr("optDj", this.value);
                            var index = getIndex(this.id);
                            this.value = delRight((this.value / (1 + _$("#sl_"
                                + index).val()
                            * 1)).toFixed(6));
                        }
                    }
                })
            } else {
                sfhs = true;
                _$("#sfhsstr").html("金额<span style='color:red'>(含税)</span>");
                _$("#djsfhsstr").html("单价<span style='color:red'>(含税)</span>");
                _$("#fyxmdiv :text[id^='je']").each(function () {
                    if (this.value != "") {
                        var index = getIndex(this.id);
                        this.value = (this.value * 1 + _$("#se_" + index).val()
                        * 1).toFixed(2);
                    }
                });
                _$("#fyxmdiv :text[id^='spdj']").each(function () {
                    if (this.value != "") {
                        var optDj = $(this).attr("optDj");
                        if (optDj) {
                            $(this).attr("optDj", this.value);
                            this.value = optDj;
                        } else {
                            $(this).attr("optDj", this.value);
                            var index = getIndex(this.id);
                            this.value = delRight((this.value * (1 + _$("#sl_"
                                + index).val()
                            * 1)).toFixed(6));
                        }
                    }
                })
            }
        },
        validateSqd: function (a) {
            var isReturn = false;
            if (!isSjje) {
                _$("#fyxmdiv tbody input[id^='spsl_']").each(function () {
                    if (!$(this).val()) {
                        alertMsg.warn("‘涉及数量’必须填写所有商品数量！");
                        isReturn = true;
                        return;
                    }
                });
            }
            if (isReturn) {
                return false;
            }
            if (_$("#yfpHjje")) {
                var hzhjje = _$("#hzhjje").text();
                var yfpHjje = _$("#yfpHjje").val();
                hzhjje = hzhjje.substring(1, hzhjje.length);
                if (hzhjje * 1 + yfpHjje * 1 < 0) {
                    alertMsg.warn("红字信息表金额不能大于原蓝票金额！");
                    return false;
                }
            }
            if (nowRowCount == 0) {
                alert("请添加费用项目");
                cpy_zzp_hzsqd_spbm.addRow("");
                return false;
            }
            var ghdwmc = _$(":text#ghdwmc,:text#xhdwmc")[0];
            if (ghdwmc.value == "") {
                alert("纳税人名称不能为空");
                reFocus(ghdwmc);
                return false;
            } else if (countStrLength(ghdwmc.value) > 100) {
                alert("纳税人名称最多为100个字符或50个汉字");
                reFocus(ghdwmc);
                return false;
            }
            var ghdwdm = _$(":text#ghdwdm,:text#xhdwdm")[0];
            var regex = /^[A-Z0-9]{7,20}$/;
            if (ghdwdm.value == "") {
                alert("纳税人识别号不能为空");
                reFocus(ghdwdm);
                return false;
            } else if (!regex.test(ghdwdm.value)) {
                alert("纳税人识别号为(7-20位)数字或大写字母");
                reFocus(ghdwdm);
                return false;
            } else if (ghdwdm.value * 1 == 0) {
                alert("纳税人识别号不能全为0");
                reFocus(ghdwdm);
                return false;
            }
            var lxdh = _$("#lxdh")[0];
            if (countStrLength(lxdh.value) > 40) {
                alert("联系电话最多为40个字符或20个汉字");
                reFocus(lxdh);
                return false;
            }
            var sqly = _$("#sqly")[0];
            if (countStrLength(sqly.value) > 400) {
                alert("申请理由最多为400个字符或200个汉字");
                reFocus(sqly);
                return false;
            }
            var spmcs = _$("#fyxmdiv :text[id^='spmc']");
            for (var i = 0; i < spmcs.length; i++) {
                var spmc = spmcs[i];
                var index = getIndex(spmc.id);
                var ggxh = _$("#ggxh_" + index)[0];
                var dw = _$("#dw_" + index)[0];
                var je = _$("#je_" + index)[0];
                if (spmc.value == "") {
                    alert("货物或应税劳务名称不能为空");
                    reFocus(spmc);
                    return false;
                } else if (countStrLength(spmc.value) > 92) {
                    alert("货物或应税劳务名称最多为92个字符或46个汉字");
                    reFocus(spmc);
                    return false;
                }
                if (je.value == "") {
                    alert("金额不能为空");
                    reFocus(je);
                    return false;
                }
            }
            if (a) {
                _$("#extraDiv").remove();
                var extraDiv = _$("<div id='extraDiv'/>").hide();
                _$("#hzsqd_sc_spbm_form").append(extraDiv);
                extraDiv.append("<input name='hjje' value='"
                    + delLeftMoney(_$("#hzhjje").text()) + "'/>");
                extraDiv.append("<input name='hjse' value='"
                    + delLeftMoney(_$("#hzhjse").text()) + "'/>");
                // 转换含税金额
                _$("#fyxmdiv :text[id^='je']").each(function () {
                    var realJe, index = getIndex(this.id);
                    if (sfhs) {
                        realJe = (_$("#je_" + index).val() - _$("#se_" + index)
                            .val()).toFixed(2);
                    } else {
                        realJe = _$("#je_" + index).val();
                    }
                    extraDiv.append("<input name='realJe_" + index
                        + "' value='" + realJe + "'/>");
                });

                // 追加税额
                _$("#fyxmdiv :text[id^='se']").each(function () {
                    extraDiv.append("<input name='" + this.name + "' value='"
                        + this.value + "'/>");
                });
                // 追加税率
                _$("#fyxmdiv select[id^='sl_']").each(function () {
                    extraDiv.append("<input name='" + this.name + "' value='"
                        + this.value + "'/>");

                });
                // 计算总体含税和行含税标志不一致时的实际单价
                _$("#fyxmdiv :text[id^='spdj']").each(function () {
                    var realDj = this.value, index = getIndex(this.id);
                    if (realDj != ""
                        && sfhs != (_$("#hsbz_" + index).val() == "y")) {
                        realDj = $(this).attr("optDj");
                    }
                    extraDiv.append("<input name='realDj_" + index
                        + "' value='" + realDj + "'/>");
                });
                // 判断是否统一税率
                var slArray = _$("#fyxmdiv select[id^=sl]").get();
                var isAll = true;
                for (var i = 1; i < slArray.length; i++) {
                    var index = getIndex(slArray[i].id);
                    if (slArray[i].value != slArray[0].value) {
                        isAll = false;
                        break;
                    }
                }
                if (isAll) {
                    extraDiv.append("<input name='isMutiRate' value='"
                        + slArray[0].value + "'/>")
                }
            }
            var hjje = _$("#hzhjje").text();
            if (hjje.replace("￥-", "") > 9999999999.99) {
                alert("合计金额超出单张发票开票金额限额！");
                return false;
            }
            return true;
        },
        save: function () {
            var boo = cpy_zzp_hzsqd_spbm.validateSqd(true);
            if (boo) {
                ajaxLoad(ctxPath + "/cpy_hzsqdspbm/save.do",
                    _$("#hzsqd_sc_spbm_form").serialize(), function (json) {
                        alertMsg.correct(json.message);
                    });
            }
        },
        reCountRow: function (index, changeDjSl) {
            if (zsfs == "1") {
                var sl = _$("#sl_" + index).val() * 1;
                var dj = _$("#spdj_" + index).val();
                var spsl = _$("#spsl_" + index).val();
                var je = _$("#je_" + index).val();
                if (sl != "" && spsl != "") {
                    _$("#se_" + index).val((dj * spsl * sl / (1 + 0.05)).toFixed(2));
                } else {
                    _$("#se_" + index).val((je * sl / (1 + 0.05)).toFixed(2));
                }
                this.reCountHjje();
                return;
            }
            if (zsfs == "2") {
                var hsxse = _$("#hsxseBz").val() * 1;
                var kce = _$("#kceBz").val() * 1;
                var sl = _$("#sl_1").val() * 1;
                var spsl = _$("#spsl_1").val() * 1;
                if (_$("#kcegtxse").val() == "y") {
                    _$("#se_1").val("0.00");
                    _$("#se_1").attr("realSe_" + index, "0.00");
                    _$("#je_1").val("-" + hsxse.toFixed(2));
                } else {
                    _$("#se_1")
                        .val("-"
                            + ((hsxse - kce) - (hsxse - kce) / (1 + sl))
                                .toFixed(2));

                    _$("#se_1").attr("realSe_" + index,
                        "-" + ((hsxse - kce) - (hsxse - kce) / (1 + sl)));
                    _$("#je_1").val("-"
                        + (hsxse - ((hsxse - kce) - (hsxse - kce) / (1 + sl)))
                            .toFixed(2));
                }
                if (spsl != 0) {
                    _$("#spdj_1").val(delRight((_$("#je_1").val() / spsl)
                        .toFixed(6)));
                }
                _$("#hzhjje").text("￥" + _$("#je_1").val());
                _$("#hzhjse").text("￥" + _$("#se_1").val());
                return;
            }
            var sl = _$("#sl_" + index).val() * 1;
            if (sfhs) {
                _$("#se_" + index)
                    .val((_$("#je_" + index).val() * sl / (1 + sl))
                        .toFixed(2));
                _$("#se_" + index).attr("realSe_" + index,
                    (_$("#je_" + index).val() * sl / (1 + sl)));
            } else {
                _$("#se_" + index).val((_$("#je_" + index).val() * sl)
                    .toFixed(2));
                _$("#se_" + index).attr("realSe_" + index,
                    (_$("#je_" + index).val() * sl));
            }
            if (changeDjSl && _$("#se_" + index).val() == 0) {
                _$("#se_" + index).val("0.00");
                _$("#se_" + index).attr("realSe_" + index, "0.00");
            }
            cpy_zzp_hzsqd_spbm.reCountHjje();
        },
        sc: function () {
            var boo = cpy_zzp_hzsqd_spbm.validateSqd(true);
            if (boo) {
                _$("#fyxms select:disabled[id^=sl]").each(function () {
                    $(this).removeAttr("disabled");
                });
                ajaxLoad(ctxPath + "/cpy_hzsqdspbm/sc.do",
                    _$("#hzsqd_sc_spbm_form").serialize(), function (json) {
                        if (json.xxbbh != "" && json.xxbbh != null) {
                            _$("#spbmbbh")
                                .before("<input id='xxbbh' type='hidden' value='"
                                    + json.xxbbh + "'></input>");// 信息表编号
                        }
                        alertMsg.correct(json.message);
                    });
            }
        },
        dc: function () {
            var id = getDwzIds(_$("#hzdd_spbm2 .gridTbody"), "ids", true);
            if (id == "z=z") {
                alertMsg.error("没有选中任何数据!");
                return;
            }
            location.href = ctxPath + "/cpy_hzsqdspbm/dcsqd.do?" + id;
        },

        drawSqd: function (args) {
            var sqdmx = args.yfpmx;
            if (sqdmx.sqlx > 1) {
                _$("#xhdwdm").attr("readonly", true);
                _$("#xhdwmc").attr("readonly", true);
            } else {
                _$("#ghdwmc").attr("readonly", true);
                _$("#ghdwdm").attr("readonly", true);
            }
            _$("#kprq").text(args.kprq);
            _$("#jbr").text(sqdmx.jbrmc);
            _$("#qsqdh").text(sqdmx.sqdh);
            _$("#fpdm").text(sqdmx.fpdm == null ? "" : sqdmx.fpdm);
            _$("#fphm").text(sqdmx.fphm == null ? "" : sqdmx.fphm);
            _$("#ghdwmc").val(sqdmx.ghdwmc);
            _$("#ghdwdm").val(sqdmx.ghdwdm);
            _$("#xhdwmc").val(sqdmx.xhdwmc);
            _$("#xhdwdm").val(sqdmx.xhdwdm);
            _$("#spbmbbh").val(sqdmx.bmbbbh);
            _$("#spbmbbh").before("<input id='xxbbh' type='hidden' value='"
                + sqdmx.xxbbh + "'></input>");// 信息表标号
            _$("#lxdh").val(sqdmx.lxdh);
            _$("#sqly").val(sqdmx.sqly);
            _$("#zsfs").val(sqdmx.zsfs);
            _$("#cezs").parent().parent().hide();
            var xxbbh = _$("#xxbbh").val();
            if (xxbbh != null && xxbbh != "") {
                _$("#xhdwdm").attr("readonly", true);
                _$("#xhdwmc").attr("readonly", true);
                _$("#ghdwmc").attr("readonly", true);
                _$("#ghdwdm").attr("readonly", true);
                _$("#lxdh").attr("readonly", true);
                _$("#sqly").attr("readonly", true);
                _$("#add").parent().parent().hide();
                _$("#del").parent().parent().hide();
                _$("#save").parent().parent().hide();
                _$("#scb").parent().parent().hide();
                _$("#cezs").parent().parent().hide();
            }
            isMulti = sqdmx.isMutiRate;
            leng = sqdmx.mxzb.length;
            cpy_zzp_hzsqd_spbm.reDeal(args);
            if (sqdmx.zsfs == "2") {
                _$("#cezs").text("普通征税");
                _$("#zsfs").val("2");
            } else if (sqdmx.zsfs == "0") {
                _$("#cezs").text("差额征税");
                _$("#zsfs").val("0");
            } else if (sqdmx.zsfs == "1") {
                _$("#jazs").text("普通征税");
                _$("#zsfs").val("1");
            }
            if (sqdmx.zsfs == "1") {
                ptSzsmStr = szsmStr;
                szsmStr = "<option value='0.015'>1.5%</option>";
            }

            for (var i = 1; i <= sqdmx.mxzb.length; i++) {
                var mx = sqdmx.mxzb[i - 1];
                if (!mx.spsl ||mx.spsl == '0') {
                    isSjje = true;
                }
                cpy_zzp_hzsqd_spbm.addRow();
                _$("#spmc_" + i).val(mx.spmc);
                _$("#spsl_" + i).val(delRight(mx.spsl + ""));
                var spdj = _$("#spdj_" + i);
                if (mx.hsbz) {
                    spdj.val((mx.spdj / (1 + mx.sl)).toFixed(6)).attr("optDj",
                        (mx.spdj).toFixed(6));
                } else {
                    spdj.val((mx.spdj).toFixed(6)).attr("optDj",
                        (mx.spdj * (1 + mx.sl)));
                }
                spdj.val(delRight(spdj.val())).attr("optDj",
                    delRight(spdj.attr("optDj")));
                _$("#je_" + i).val((mx.je).toFixed(2));

                if (isMulti == "1") {
                    _$("<option></option>").appendTo(_$("#sl_" + i));
                }
                _$("#spbm_" + i).val(mx.spbm);
                _$("#qyspbm_" + i).val(mx.zxbm);
                _$("#syyh_" + i).val(mx.yhzcbs);
                _$("#yhlx_" + i).val(mx.zzstsgl);
                _$("#mslx_" + i).val(mx.lslbs);
                _$("#sl_" + i).val(mx.sl);
                // _$("#sl_" + i).attr("disabled", true);
                _$("#se_" + i).val(mx.se.toFixed(2));
                // 重新计算税额
                _$("#se_" + i).attr("realSe_" + i, (mx.je * mx.sl).toFixed(2));
                _$("#hsbz_" + i).val(mx.hsbz ? "y" : "n");
                // _$("#je_" + i).attr("readonly", "readonly");
                // _$("#spdj_" + i).attr("readonly", "readonly");
                // _$("#spsl_" + i).attr("readonly", "readonly");
                _$("#spmc_" + i).attr("readonly", "readonly");
                _$("#se_" + i).attr("readonly", "readonly");
                if (xxbbh != null && xxbbh != "") {
                    _$("#spdj_" + i + ",#spsl_" + i + ",#je_" + i).attr(
                        "readonly", true);
                    _$("#sl_" + i).attr("disabled", true);
                    _$("spmc_" + i).parent().unbind("dblclick");
                }
            }
            if (sqdmx.mxzb.length == 1 && sqdmx.mxzb[0].spmc == "详见对应正数发票及清单") {// 为清单的情况
                qdbz = true;
                _$("#fyxmdiv tr[index=1]").unbind("dblclick");
                _$("#sl_1").attr("disabled", "disabled");
                _$("#spdj_1").attr("readonly", "readonly");
                _$("#spsl_1").attr("readonly", "readonly");
                _$("#se_1").removeAttr("readonly");
                _$("#add").parent().parent().hide();
                _$("#del").parent().parent().hide();
            } else {
                qdbz = false;
            }
            if (_$("#zsfs").val() == "2") {
                // _$("#add").parent().parent().hide();
                // _$("#del").parent().parent().hide();
                _$("#price").parent().parent().hide();
                _$("#spdj_1").attr("readonly", true);
                _$("#spsl_1").attr("readonly", true);
                _$("#je_1").attr("readonly", true);
                _$("#sl_1").attr("disabled", true);
                _$("#se_1").attr("readonly", "readonly");
                _$("#mslx_1").parent()
                    .append("<input name='sl_1' type='hidden' value='"
                        + _$("#sl_1").val() + "'/>");

            }
            if (zsfs == "1") {
                cpy_zzp_hzsqd_spbm.toggleSfhs();
                disableButtons(_$("#price"));
            }
            cpy_zzp_hzsqd_spbm.reCountHjje();
            // if (sqdmx.sqlx > 1) {
            // disableButtons(_$("#add"));
            // disableButtons(_$("#del"));
            // _$("#fyxmdiv tr[index]").each(function() {
            // _$(this).unbind("dblclick");
            // });
            // }

        },
        dbclickht: function () {
            var sel = _$(".pageContent table tr.selected");
            var id = sel.attr("rel");
            ajaxLoad(ctxPath + "/cpy_hzsqdspbm/drawedit.do?id=" + id, {
                async: false
            }, function (json) {
                _$("#hzdd_spbm0").hide();
                _$("#hzdd_spbm2").hide();
                _$("#hzdd_spbm1").hide();
                _$("#hzdd_spbm3").show();
                cpy_zzp_hzsqd_spbm.drawSqd(json);

            });
        },
        printsqd: function () {
            var oneRowHeight = 35;
            var toAdd = 7 * oneRowHeight;
            var cao = _$("#caoxxbbh").val();
            LODOP.PRINT_INITA("0", "0", "210mm", "297mm", "红字信息表打印");
            // LODOP.ADD_PRINT_TEXT(15, 20, 315, 20, "附件");
            // LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
            // LODOP.SET_PRINT_STYLEA(0, "Bold", 1);

            LODOP.ADD_PRINT_TEXT(30, 20, 710, 20, "开具红字增值税专用发票信息表");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
            LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(67, 21, 233, 20, "填开日期：" + _$("#kprq").text());
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            // LODOP.ADD_PRINT_TEXT(67, 508, 240, 20, "NO." +
            // _$("#qsqdh").text());
            // LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_RECT(90, 20, 730, 601 + toAdd, 0, 1);
            LODOP.ADD_PRINT_RECT(90, 20, 730, 60, 0, 1);
            LODOP.ADD_PRINT_RECT(150, 20, 730, 118 + toAdd, 0, 1);// 上半部分包括明细的大矩形
            LODOP.ADD_PRINT_RECT(90, 20, 89, 601 + toAdd, 0, 1);// 左大矩形
            LODOP.ADD_PRINT_RECT(90, 109, 141, 30, 0, 1);// 销售方名称矩形
            LODOP.ADD_PRINT_RECT(90, 250, 141, 30, 0, 1);// 填写名称的矩形
            LODOP.ADD_PRINT_RECT(120, 109, 141, 30, 0, 1);// 税务机关代码矩形
            LODOP.ADD_PRINT_RECT(90, 390, 75, 60, 0, 1);// 购买方矩形
            LODOP.ADD_PRINT_RECT(90, 464, 135, 30, 0, 1);// 购买方名称矩形
            LODOP.ADD_PRINT_RECT(120, 464, 135, 30, 0, 1);// 购买方名称代码矩形
            LODOP.ADD_PRINT_RECT(90, 599, 151, 30, 0, 1);// 购买方名称填写
            LODOP.ADD_PRINT_TEXT(109, 37, 58, 20, "销售方");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(98, 127, 98, 20, "名       称");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(127, 127, 108, 20, "纳税人识别号");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(110, 406, 63, 20, "购买方");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(98, 483, 98, 20, "名       称");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(127, 481, 107, 20, "纳税人识别号");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);

            var xhdwmc = cpy_zzp_hzsqd_spbm.considerVal("xhdwmc");
            if (countStrLength(xhdwmc) <= 16) {
                LODOP.ADD_PRINT_TEXT(99, 250, 140, 23, xhdwmc);
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
                LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            } else {
                LODOP.ADD_PRINT_TEXT(95, 250, 140, 33, xhdwmc);
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
                LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
                LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            }
            LODOP.ADD_PRINT_TEXT(130, 252, 140, 15, cpy_zzp_hzsqd_spbm
                .considerVal("xhdwdm"));
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(130, 602, 140, 15, cpy_zzp_hzsqd_spbm
                .considerVal("ghdwdm"));
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            var ghdwmc = cpy_zzp_hzsqd_spbm.considerVal("ghdwmc");
            if (countStrLength(ghdwmc) <= 16) {
                LODOP.ADD_PRINT_TEXT(98, 600, 130, 23, ghdwmc);
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
                LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            } else {
                LODOP.ADD_PRINT_TEXT(95, 600, 130, 36, ghdwmc);
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
                LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
                LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            }
            LODOP.ADD_PRINT_TEXT(158 + toAdd / 2, 44, 50, 150, "开具红字专用发票内容");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(650, 41, 42, 24, "说明");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(292 + toAdd, 130, 129, 19, "一、购买方");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 13);
            LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
            LODOP.ADD_PRINT_TEXT(326 + toAdd, 151, 380, 19,
                "对应蓝字专用发票抵扣增值税销项税额情况：");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(360 + toAdd, 241, 84, 19, "1、已抵扣");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(390 + toAdd, 241, 84, 19, "2、未抵扣");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(426 + toAdd, 240, 302, 19, "对应蓝字专用发票的代码：");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(426 + toAdd, 545, 61, 19, "号码：");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(501 + toAdd, 130, 129, 19, "二、销售方");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 13);
            LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
            LODOP.ADD_PRINT_TEXT(537 + toAdd, 240, 298, 19, "对应蓝字专用发票的代码：");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(537 + toAdd, 545, 61, 19, "号码：");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            var checks = [];
            _$("#sqlx_td :radio").each(function () {
                checks.push($(this).attr("checked") ? "√" : "　");
            });
            LODOP.ADD_PRINT_TEXT(292 + toAdd, 224, 25, 20, checks[0]);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 14);
            LODOP.SET_PRINT_STYLEA(0, "TextFrame", 5);
            LODOP.ADD_PRINT_TEXT(360 + toAdd, 324, 25, 20, checks[1]);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 14);
            LODOP.SET_PRINT_STYLEA(0, "TextFrame", 5);
            LODOP.ADD_PRINT_TEXT(390 + toAdd, 324, 25, 20, checks[2]);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 14);
            LODOP.SET_PRINT_STYLEA(0, "TextFrame", 5);
            LODOP.ADD_PRINT_TEXT(501 + toAdd, 224, 25, 20, checks[3]);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 14);
            LODOP.SET_PRINT_STYLEA(0, "TextFrame", 5);
            // LODOP.ADD_PRINT_TEXT(707 + toAdd, 58, 535, 19,
            // "申明：我单位提供的<申请单>内容真实，否则将承担相关法律责任。");
            // LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
            LODOP.ADD_PRINT_TEXT(735 + toAdd, 58, 199, 19, "申请方经办人："
                + _$("#jbr").text());
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(735 + toAdd, 256, 204, 19, "联系电话："
                + _$("#lxdh").val());// TODO:
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(735 + toAdd, 459, 155, 19, "申请方名称<印章>：");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_LINE(443 + toAdd, 430, 443 + toAdd, 520, 0, 1);
            LODOP.ADD_PRINT_LINE(443 + toAdd, 580, 443 + toAdd, 670, 0, 1);
            LODOP.ADD_PRINT_LINE(552 + toAdd, 430, 552 + toAdd, 520, 0, 1);
            LODOP.ADD_PRINT_LINE(552 + toAdd, 580, 552 + toAdd, 670, 0, 1);
            LODOP.ADD_PRINT_RECT(590 + toAdd, 20, 730, 101, 0, 1);
            LODOP.ADD_PRINT_RECT(590 + toAdd, 20, 90, 101, 0, 1);
            LODOP.ADD_PRINT_TEXT(600 + toAdd, 37, 60, 85, "红字专用发票信息表编号");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(625 + toAdd, 300, 450, 50, _$("#xxbbh").val());
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 17);
            if (checks[0] == "√") {
                LODOP.ADD_PRINT_TEXT(426 + toAdd, 435, 228, 19, _$("#fpdm")
                    .text());
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
                LODOP.ADD_PRINT_TEXT(426 + toAdd, 593, 228, 19, _$("#fphm")
                    .text());
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            } else {
                LODOP.ADD_PRINT_TEXT(535 + toAdd, 435, 228, 19, _$("#fpdm")
                    .text());
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
                LODOP.ADD_PRINT_TEXT(535 + toAdd, 593, 228, 19, _$("#fphm")
                    .text());
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            }
            LODOP.ADD_PRINT_LINE(755 + toAdd, 605, 755 + toAdd, 750, 0, 1);
            LODOP.ADD_PRINT_TEXT(762 + toAdd, 57, 693, 19,
                "注：本申请单一式两联：第一联，申请方留存；第二联，申请方所属主管税务机关留存。");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            // 表格中间的五条竖线
            LODOP.ADD_PRINT_LINE(268 + toAdd, 250, 150, 250, 0, 1);
            LODOP.ADD_PRINT_LINE(268 + toAdd, 390, 150, 390, 0, 1);
            LODOP.ADD_PRINT_LINE(268 + toAdd, 465, 150, 465, 0, 1);
            LODOP.ADD_PRINT_LINE(268 + toAdd, 600, 150, 600, 0, 1);
            LODOP.ADD_PRINT_LINE(268 + toAdd, 670, 150, 670, 0, 1);
            // LODOP.ADD_PRINT_LINE(177, 109, 177, 750, 0, 1);
            LODOP.ADD_PRINT_TEXT(154, 120, 153, 20, "货物（劳务服务）");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(175, 160, 50, 20, "名称");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(165, 305, 43, 20, "数量");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(165, 413, 42, 20, "单价");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(165, 515, 42, 20, "金额");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(165, 618, 42, 20, "税率");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(165, 695, 43, 20, "税额");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            // TODO:
            LODOP.ADD_PRINT_TEXT(488, 161, 43, 20, "合计");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(488, 295, 48, 20, "----");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.ADD_PRINT_TEXT(488, 410, 46, 20, "----");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            // TODO : 注释掉合计金额
            LODOP.ADD_PRINT_TEXT(488, 465, 135, 20, _$("#hzhjje").text());
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP.ADD_PRINT_TEXT(243 + toAdd, 600, 70, 20, "--");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            LODOP
                .ADD_PRINT_TEXT(243 + toAdd, 670, 88, 20, _$("#hzhjse")
                    .text());
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
            LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            for (var i = 0; i < 9; i++) {
                LODOP
                    .ADD_PRINT_RECT(198 + oneRowHeight * i, 109, 642, 35,
                        0, 1);
            }
            for (var i = 0; i < nowRowCount; i++) {
                var spmc = _$("#spmc_" + (i + 1)).val();
                if (countStrLength(spmc) <= 22) {
                    LODOP.ADD_PRINT_TEXT(209 + i * oneRowHeight, 109, 141, 20,
                        spmc);
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
                    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
                } else {
                    LODOP.ADD_PRINT_TEXT(198 + i * oneRowHeight, 109, 145, 35,
                        spmc);
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
                    LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
                    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
                }
                LODOP.ADD_PRINT_TEXT(209 + i * oneRowHeight, 250, 140, 35,
                    _$("#spsl_" + (i + 1)).val());
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
                LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
                var dj = _$("#spdj_" + (i + 1));
                var realDj = dj.val();
                if (realDj != ""
                    && sfhs != (_$("#hsbz_" + (i + 1)).val() == "y")) {
                    realDj = dj.attr("optDj");
                }
                LODOP.ADD_PRINT_TEXT(209 + i * oneRowHeight, 390, 75, 35,
                    realDj);
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
                LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
                var realJe = _$("#je_" + (i + 1)).val();
                realJe = sfhs ? realJe - _$("#se_" + (i + 1)).val() : realJe
                    * 1;
                LODOP.ADD_PRINT_TEXT(209 + i * oneRowHeight, 465, 135, 35,
                    realJe.toFixed(2));
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
                LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
                if (qdbz && isMulti == "1") {

                } else {
                    LODOP.ADD_PRINT_TEXT(209 + i * oneRowHeight, 600, 70, 35, (zsfs == "1" || zsfs == "2" ? "***" :
                        _$("#sl_" + (i + 1)).val() * 100 + "%"));
                    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
                    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
                }

                LODOP.ADD_PRINT_TEXT(209 + i * oneRowHeight, 670, 85, 35,
                    _$("#se_" + (i + 1)).val());
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
                LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
            }
            LODOP.PREVIEW();

        },
        dy: function () {
            var boo = cpy_zzp_hzsqd_spbm.validateSqd(true);
            if (boo) {
                cpy_zzp_hzsqd_spbm.printsqd();
            } else {

            }
        },

        considerVal: function (a) {
            var ele = _$("#" + a);
            var title = ele.attr("title");
            return title ? title : ele.val();
        }
    }
}();

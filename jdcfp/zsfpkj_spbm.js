/**
 * Created by zzq on 2017/1/11.
 */
var jdc_zsfpkj_spbm = function () {
    var szsmStr = "", fskj = false;
    var fpmx;
    return {
        initFsDlg: function () {
            //limit_money_input($_("#yfpdm,#yfphm,#rfpdm,#rfphm"));
        },
        initPage: function () {
            szsmStr = "";
            fskj = false;
            fpmx = null;
            var _this = this;
            _$("#yl").parent().parent().hide();
            disableButtons(_$("#kj,#fs,#xyz,#dy"));
            ajaxLoad(ctxPath + "/jdcfp/check.do", {async: false}, function (json) {
                enableButtons(_$("#kj,#xyz,#dy,#fs"));
                _$("#fpdm").text(json.dqph.dqfpdm);
                _$("#fpdm_copy").text(json.dqph.dqfpdm);
                _$("#fphm").text(json.dqph.dqfphm);
                _$("#fphm_copy").text(json.dqph.dqfphm);
                _$("#jqbh").text(json.jqbh);
                _$("#kprq").text(json.kprq);
                _$("#kpr").val(json.kpr);
                _$("#xhdwmc").val(json.xhdwmc);
                _$("#nsrsbh").val(json.xhdwdm);
                _$("#zgswjg").val(json.swjgmc);
                _$("#swjgdm").val(json.swjgdm);

                _$("#dh").val(json.dh);
                _$("#zh").val(json.zh);
                _$("#dz").val(json.dz);
                _$("#khyh").val(json.khyh);
                szsmStr = genSzsm(json.szsm.group);
                _$("#zzssl").append(szsmStr);
                if(json.blxx){
                    zzspp_fpkj_spbm.getPrompt(json.blxx);
                }
                //转登记纳税人税率option位置调整
                if (json.blxx != "" && json.blxx != null && json.blxx.substring(4, 6) == "05") {
                    szsmStr = adjustSloption(szsmStr);
                }
                checkspbmbb();
            })
            this.addListener();
            _$("#kj").click(function () {
                _this.kjfp();
            });
            _$("#fs").click(function () {
                _this.fskj();
            });
            _$("#yl").click(function () {
                _this.yl();
            });
            _$("#dy").parent().parent().hide();
            _$("#dy").click(function () {
                _this.dy();
            });
            _$("#xyz").parent().parent().hide();
            _$("#xyz").click(function () {
                _this.xyz();
            });
            limit_money_input(_$("#dw,#xcrs,#jshj"));
            //只支持对IE6和IE8的标准模式，不支持兼容模式
            if (ie6) {
                var tables = _$(".jdcfp-content-center table");
                tables.eq(2).height(94);
                tables.eq(6).height(160);
                tables.eq(7).find("td").eq(1).css("padding-left", "138px");
            }
        },
        addListener: function () {
            _$("#ghfsbh,#sfzhm,#clsbdh").bind("change", function () {
                _$(this).val($(this).val().toUpperCase());
            });
            _$("#jshj").bind("change", function () {
                var jshj = _$("#jshj").val();
                jshj = Math.abs((jshj * 1).toFixed(2));
                _$("#jshjdx").text(je2Upper(jshj));
                if (fskj) {
                    _$("#jshj").val(-Math.abs(jshj).toFixed(2));
                } else {
                    _$("#jshj").val(Math.abs(jshj).toFixed(2));
                }
                if (jshj != "") {
                    var sl = _$("#zzssl").val() * 1;
                    var bhsj = (jshj / (1 + sl)).toFixed(2);
                    var se = jshj - bhsj;
                    if (fskj) {
                        _$("#zzsse").text(-Math.abs(se).toFixed(2));
                        _$("#bhsj").text(-Math.abs(bhsj).toFixed(2));
                    } else {
                        _$("#zzsse").text(Math.abs(se).toFixed(2));
                        _$("#bhsj").text(Math.abs(bhsj).toFixed(2));
                    }
                }
            });
            _$("#cpxh,#cllx").bind("dblclick", function () {
                //TODO 商品编码弹出框处理方法
                splxxx.spxx_jdc(true, false, "005");
            });
            //税率变化计算
            _$("#zzssl").bind("change", function () {
                var jshj = Math.abs(_$("#jshj").val() * 1);
                if (jshj != "") {
                    var sl = _$("#zzssl").val() * 1;
                    var bhsj = (jshj / (1 + sl)).toFixed(2);
                    var se = (jshj - bhsj).toFixed(2);
                    if (fskj) {
                        _$("#zzsse").text(-(Math.abs(se)).toFixed(2));
                        _$("#bhsj").text(-(Math.abs(bhsj)).toFixed(2));
                    } else {
                        _$("#zzsse").text((Math.abs(se)).toFixed(2));
                        _$("#bhsj").text((Math.abs(bhsj)).toFixed(2));
                    }
                }
            });

        },
        //开具前校验各项
        validateForm: function () {
            _$("#zzsjdc_fpkj_spbm_form :text:not(:disabled),textarea").val(function () {
                return qj2bj($.trim(this.value));
            });
            var cllx = _$("#cllx").val();
            var cpxh = _$("#cpxh").val();
            var cd = _$("#cd").val();
            var hgzh = _$("#hgzh").val();
            var jkzmsh = _$("#jkzmsh").val();
            var sjdh = _$("#sjdh").val();
            var dh = _$("#dh").val();
            var zh = _$("#zh").val();
            var dz = _$("#dz").val();
            var wspzhm = _$("#wspzhm").val();
            var dw = _$("#dw").val();
            var xcrs = _$("#xcrs").val();
            var scqymc = _$("#scqymc").val();
            var xhdwmc = _$("#xhdwmc").val();
            var xhdwdm = _$("#nsrsbh").val();
            var gmfmc = _$("#gmfmc").val();
            var ghfsbh = _$("#ghfsbh").val();
            var sfzhm = _$("#sfzhm").val();
            var fdjhm = _$("#fdjhm").val();
            var clsbdh = _$("#clsbdh").val();
            var jshj = _$("#jshj").val();
            var khyh = _$("#khyh").val();
            var zzssl = _$("#zzssl").val();
            var zzsse = _$("#zzsse").text();
            var bhsj = _$("#bhsj").text();
            var kpr = _$("#kpr").text();
            var spbm = _$("#spbm").val();
            limit_money_input(jshj);
            limit_money_input(zzsse);
            var regex = /^[A-Z0-9]{7,20}$/;
            if (ghfsbh != "" && !regex.test(ghfsbh)) {
                alert("购货单位识别号为(7-20位)数字或大写字母");
                return false;
            }
            if (ghfsbh != "" && ghfsbh * 1 == 0) {
                alert("购货单位识别号不能全为0！");
                return false;
            }


            // if (spbm.substring(0, 11) == "10903050108") {
            //     if ((bhsj * 1) < 1300000) {
            //         alert("选择10903050108“超豪华小轿车”不含税价必须大于1300000元!");
            //         return false;
            //     }
            // }
            // var str = spbm.substring(0, 11);
            // str = new Number(str);
            // if ((str >= 10903050101 && str <= 10903050107) || str == 10903050202) {
            //     if ((bhsj * 1) >= 1300000) {
            //         alert("不含税额大于等于1300000元，请选择10903050108“超豪华小汽车”税收分类编码！");
            //         return false;
            //     }
            // }
            var regex = /^[a-zA-Z0-9*]{0,23}$/;
            if (clsbdh != "" && !regex.test(clsbdh)) {
                alert("车辆识别代码/车架号码为不多于23位的数字或字母");
                reFocus(_$("#clsbdh"));
                return false;
            }

            /**
             * 非空校验
             */
            if (cpxh == "") {
                alert("厂牌型号不能为空");
                return false;
            }
            if (gmfmc == "") {
                alert("购货单位名称不能为空");
                return false;
            }
            if (cllx == "" || cllx == null) {
                alert("请选择商品编码（双击车辆类型或厂牌型号选择商品编码）");
                return false;
            }
            if (cd == "") {
                alert("产地不能为空！");
                return false;
            }
            if (gmfmc == "") {
                alert("购买方名称不能为空！");
                return false;
            }
            if (scqymc == "") {
                alert("生产企业名称不能为空！")
                return false;
            }

            if (sfzhm == "") {
                alert("身份证号码不能为空！");
                return false;
            }
            if (cllx == "") {
                alert("车辆类型不能为空！");
                return false;
            }

            if (clsbdh == "") {
                alert("车辆识别代码/车架号码不能为空！");
                return false;
            }

            if (jshj == "") {
                alert("价税合计不能为空！");
                return false;
            }
            if (zzsse == "") {
                alert("税额不能为空！");
                return false;
            }
            if (bhsj == "") {
                alert("不含税价不能为空！");
                return false;
            }
            if (zzssl == "") {
                alert("增值税税率不能为空！");
                return false;
            }
            if (fskj) {
                if (jshj.replace("-", "") > 1000000000.00) {
                    alert("价税合计超出单张发票开票金额限额！");
                    return false;
                }
            } else {
                if(jshj>1000000000.00){
                    alert("价税合计超出单张发票开票金额限额！");
                    return false;
                }
            }

            /**
             * 长度校验
             */
            if (countStrLength(gmfmc) > 108) {
                alert("购货单位名称最多为108个英文和数字或54个汉字");
                return false;
            }
            if (countStrLength(xhdwmc) > 100) {
                alert("销货单位名称长度不能超过100！");
                return false;
            }
            if (countStrLength(xhdwdm) > 20) {
                alert("销货单位纳税人识别号长度不能超过20！");
                return false;
            }
            if (countStrLength(gmfmc) > 80) {
                alert("购买方名称不能超过80位！");
                return false;
            }
            if (countStrLength(sfzhm) > 22) {
                alert("身份证/组织机构代码不能超过22位！");
                return false;
            }
            if (countStrLength(ghfsbh) > 20) {
                alert("纳税人识别号不能超过20位！");
                return false;
            }
            if (countStrLength(cllx) > 40) {
                alert("车辆类型不能超过40位！");
                return false;
            }
            if (countStrLength(cpxh) > 60) {
                alert("厂牌型号不能超过60位！");
                return false;
            }
            if (countStrLength(cd) > 32) {
                alert("产地不能超过32位！");
                return false;
            }
            if (countStrLength(hgzh) > 50) {
                alert("合格证号不能超过50位！");
                return false;
            }
            if (countStrLength(jkzmsh) > 36) {
                alert("进口证明号不能超过36位！");
                return false;
            }
            if (countStrLength(sjdh) > 32) {
                alert("商检单号不能超过32位！");
                return false;
            }
            if (countStrLength(fdjhm) > 60) {
                alert("发动机号码不能超过60位！");
                return false;
            }
            if (countStrLength(clsbdh) > 23) {
                alert("车架识别代码/车辆号码不能超过23位！");
                return false;
            }

            if (countStrLength(jshj) > 14) {
                alert("价税合计不能超过14位！");
                return false;
            }
            if (countStrLength(dh) > 40) {
                alert("电话不能超过40位！");
                return false;
            }
            if (countStrLength(zh) > 40) {
                alert("账号不能超过40位！");
                return false;
            }
            if (countStrLength(dz) > 80) {
                alert("地址不能超过80位！");
                return false;
            }
            if (countStrLength(khyh) > 80) {
                alert("开户银行不能超过80位！");
                return false;
            }
            if (countStrLength(zzssl) > 6) {
                alert("增值税税率不能超过6位！");
                return false;
            }
            if (fskj) {
                if (bhsj.replace("-", "") > 1000000000.00) {
                    alert("不含税价超出单张发票开票金额限额！");
                    return false;
                }
            } else {
                if(bhsj>1000000000.00){
                    alert("不含税价超出单张发票开票金额限额！");
                    return false;
                }
            }
            if (countStrLength(bhsj) > 14) {
                alert("不含税价不能超过14位！");
                return false;
            }
            if (countStrLength(wspzhm) > 32) {
                alert("完税凭证号码不能超过32位！");
                return false;
            }
            if (countStrLength(dw) > 8) {
                alert("吨位不能超过8位！");
                return false;
            }
            if (countStrLength(xcrs) > 12) {
                alert("限乘人数不能超过12位！");
                return false;
            }
            if (countStrLength(scqymc) > 80) {
                alert("生产企业名称不能超过80位！");
                return false;
            }

            if (xcrs.indexOf(".") != -1) {
                alert("限乘人数必须为整数！");
                return false;
            }

            return true;
        },
        //开具发票
        kjfp: function () {
            if (!checkPrint()) {
                return;
            }
            if (!checkKey()) {
                return;
            }

            var result = this.validateForm();
            if (!result) {
                return;
            }
            _$("#extraDiv").remove();

            var extraDiv = _$("<div id='extraDiv'/>").hide();
            _$("#zzsjdc_fpkj_spbm_form").append(extraDiv);
            extraDiv.append("<input name='kprq' value='"
                + _$("#kprq").text() + "'/>");
            extraDiv.append("<input name='fpdm' value='"
                + _$("#fpdm").text() + "'/>");
            extraDiv.append("<input name='fphm' value='"
                + _$("#fphm").text() + "'/>");
            extraDiv.append("<input name='jqbh' value='"
                + _$("#jqbh").text() + "'/>");
            extraDiv.append("<input name='gmfmc' value='"
                + _$("#gmfmc").val() + "'/>");
            extraDiv.append("<input name='ghfsbh' value='"
                + _$("#ghfsbh").val() + "'/>");
            extraDiv.append("<input name='bhsj' value='"
                + _$("#bhsj").text() + "'/>");
            extraDiv.append("<input name='zzsse' value='"
                + _$("#zzsse").text() + "'/>");
            if (_$("#fsbz").text() == "(负数)") {
                extraDiv.append("<input name='zzssl' value='"
                    + _$("#zzssl").val() + "'/>");
                extraDiv.append("<input name='jshj' value='"
                    + _$("#jshj").val() + "'/>");
            }
            if (_$("#fsbz").size() > 0) {
                //1位负数开具
                extraDiv.append("<input name='fskj' value='1'/>");
            }
            _$("#zzsjdc_fpkj_spbm_form").submit();
        },
        /**
         * 负数开具：先弹出填写原发票代码号码框，然后带出原票信息
         */
        fskj: function () {
            var _this = this;
            $.pdialog.open(ctxPath + "/jdcfp/fskjDialog.do", "jdcfp_fskjDlg", "负数发票代码号码填写、确认", {
                width: 550,
                height: 245,
                callback: function () {
                    $_("#dlg_next_bt").click(function () {
                        if (!_this.checkFpdmhm()) {
                            return;
                        }
                        _this.preFskj();
                        ajaxLoad(ctxPath + "/jdcfp/searchYfp.do", {
                            yfpdm: $_("#yfpdm").val(),
                            yfphm: $_("#yfphm").val()
                        }, function (json) {
                            if (json.errMessage) {
                                alert(json.errMessage);
                                disableButtons(_$("#kj,#fs,#yl,#dy"));
                                return;
                            }
                            enableButtons(_$("#kj"));
                            if (json.rightMessage) {
                                alert(json.rightMessage);
                            }
                            _this.setValueFromYfp(json.yfpmx, json.sfyyfp,json.sgkj);
                        })
                    });
                }
            })
        },
        setValueFromYfp: function (yfp, sfyyfp,sgkj) {
            var yfpdm, yfphm;
            if (sfyyfp == true) {
                yfpdm = yfp.fpdm;
                yfphm = yfp.fphm;
                /**
                 * 回填页面信息
                 */
                _$("#gmfmc").val(yfp.gmfmc);
                _$("#sfzhm").val(yfp.sfzhm);
                _$("#ghfsbh").val(yfp.ghfsbh);
                _$("#cllx").val(yfp.cllx);
                _$("#cpxh").val(yfp.cpxh);
                _$("#cd").val(yfp.cd);
                _$("#hgzh").val(yfp.hgzh);
                _$("#jkzmsh").val(yfp.jkzmsh);
                _$("#sjdh").val(yfp.sjdh);
                _$("#fdjhm").val(yfp.fdjhm);
                _$("#clsbdh").val(yfp.clsbdh);
                _$("#jshj").val((-yfp.jshj).toFixed(2));
                _$("#jshjdx").text(je2Upper(yfp.jshj * 1));
                _$("#xhdwmc").val(yfp.xhdwmc);
                _$("#dh").val(yfp.dh);
                _$("#nsrsbh").val(yfp.nsrsbh);
                _$("#zh").val(yfp.zh);
                _$("#dz").val(yfp.dz);
                _$("#khyh").val(yfp.khyh);
                _$("#zgswjg").val(yfp.zgswjg);
                _$("#swjgdm").val(yfp.swjgdm);
                _$("#wspzhm").val(yfp.wspzhm);
                _$("#dw").val(yfp.dw);
                _$("#xcrs").val(yfp.xcrs);
                _$("#scqymc").val(yfp.scqymc);
                _$("#dw").val(yfp.dw);
                //var se = (yfp.jshj * 1 * yfp.zzssl).toFixed(2);
                _$("#zzsse").text((-(yfp.zzsse * 1)).toFixed(2));
                _$("#bhsj").text((-(yfp.bhsj * 1)).toFixed(2));
                var zzsslHtml = _$("#zzssl").html();
                if (_$("#zzssl").attr("disabled") == "disabled") {
                } else {
                    _$("#zzssl").parent().parent().remove();
                    _$("#zzsslbox").append($("<select id='zzssl' name='zzssl' width='50'>" + zzsslHtml + "</select>"));
                }
                yfp.zzssl= (yfp.zzssl== 0 ? 0: (yfp.zzssl =='0.015' ? yfp.zzssl : (yfp.zzssl *1).toFixed(2)));
                if(zzsslHtml.indexOf(yfp.zzssl) < 0){
                    zzsslHtml=zzsslHtml+"<option value='"+yfp.zzssl+"'>"+yfp.zzssl*100+"%</option>";
                }
                _$("#zzssl").html(zzsslHtml);
                _$("#zzssl").val(yfp.zzssl);
                _$("#jshj,#zzssl").attr("disabled", "disabled");
                // _$("#zzssl").combox("disabled");
                _$("#spbm").val(yfp.spbm);
                _$("#zxbm").val(yfp.zxbm);
                _$("#bmbbbh").val(yfp.bmbbbh);
                _$("#yhzcbs").val(yfp.yhzcbs);
                _$("#lslbs").val(yfp.lslbs);
                _$("#zzstsgl").val(yfp.zzstsgl);
            } else {
                yfpdm = "000000000000";
                yfphm = "00000000";
                _$("#bhsj").text("");
                _$("#jshj").val("");
                _$("#jshjdx").text("");
                _$("#zzsse").text("");
                if(sgkj==true){
                    yfpdm=$_("#yfpdm").val();
                    yfphm=$_("#yfphm").val();
                }
            }
            var yfpxx = _$("<div id='yfpxx'/>").hide();
            _$("#zzsjdc_fpkj_spbm_form").append(yfpxx);
            yfpxx.append("<input name='yfpdm' value='"
                + yfpdm + "'/>");
            yfpxx.append("<input name='yfphm' value='"
                + yfphm + "'/>");
        },
        /**
         * 整理开具负数需要的状态
         */
        preFskj: function () {
            fskj = true;
            _$("#jshjdx").css({"display": "inline-block", "width": "320px"})
            _$("#fsbz").remove();
            _$("#jshjdx").before($("<span id='fsbz' style='color: red'>(负数)</span>"));
            enableButtons(_$("#kj"));
            $.pdialog.closeCurrent();
        },
        checkFpdmhm: function () {
            var fpdm = $_("#yfpdm").val();
            var fphm = $_("#yfphm").val();
            var rfpdm = $_("#rfpdm").val();
            var rfphm = $_("#rfphm").val();
            if (fpdm == "" || rfpdm == "") {
                alert("发票代码不能为空！")
                return false;
            }
            if (fphm == "" || rfphm == "") {
                alert("发票代码不能为空！")
                return false;
            }
            if (fpdm != rfpdm) {
                alert("发票代码两次输入不一致！")
                return false;
            }
            if (fphm != rfphm) {
                alert("发票号码两次输入不一致！")
                return false;
            }
            return true;
        },
        initPrintData: function (yl) {
            var fpmxPrint = $.extend({fplxdm: "005"}, fpmx, {
                ewm: fpmx.ewm
            });
            printJdcfp(fpmxPrint, yl);
        },
        //预览
        yl: function () {
            jdc_zsfpkj_spbm.initPrintData(true);
            LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 850, 750, "");
            LODOP.SET_SHOW_MODE("HIDE_PBUTTIN_PREVIEW", 1);
            LODOP.PREVIEW();
        },
        //打印
        dy: function () {
            jdc_zsfpkj_spbm.initPrintData(false);
            $.cookie("dyfs") == "1" ? LODOP.PRINTA() : LODOP.PRINT();
        },
        //下一张
        xyz: function () {
            navTab.reload(null, {
                data: {
                    ghdwmc: _$("#gmfmc").val(),
                    ghdwdm: _$("#ghfsbh").val()
                }
            });
        },
        //开具成功
        kjcg: function (json) {
            navTabAjaxDone(json);
            if (json.statusCode == DWZ.statusCode.ok) {
                _$("#dy,#xyz,#yl").parent().parent().show();
                disableButtons(_$("#kj,#fs"));
                _$("#cpxh,#cllx").unbind("dblclick");
                _$("#zzssl").unbind("change");
                //var sl=_$("#zzssl").val();
                //_$("#zzssl").parent().parent().replaceWith($("<select id='zzssl' name='zzssl' width='120' disabled='disabled'><option value='"+sl+"'>"+(sl*100)+"%</option></select>"));
                _$("#fpdm").text(json.kjjg.fpdm);
                _$("#fphm").text(json.kjjg.fphm);
                fpmx = json.kjjg;
                var skm = json.kjjg.skm;
                for (var i = 1; i <= 5; i++) {
                    _$("#skm").append($("<span style='font-size:14px;font-family: Courier New;'/>").text(skm.substring(i * 38 - 38, i * 38))).append("<br/>");
                }
                var kprq = json.kjjg.kprq;
                _$("#kprq").text(kprq.substring(0, 4) + "年" + kprq.substring(4, 6) + "月" + kprq.substring(6, 8) + "日");
                var jym = json.kjjg.jym;
                _$("#jym").text(jym);
                fpmx = json.kjjg;
                fpmx.ewm = json.ewm;
                _$("#zzsjdc_fpkj_spbm_form input").attr("readonly", "readonly");
                _$("#zzsjdc_fpkj_spbm_form select").attr("disabled", "disabled");
            }

        }

    }
}();

/**
 * Created by zzq on 2017/12/11.
 */
var esc_zsfpkj_spbm = function () {
    var szsmStr = "", fskj = false;var qylx;
    var fpmx;
    return {
        initFsDlg: function () {

        },
        popSpbm: function () {
            splxxx.spxx_jdc(true, false, "006");
        },
        initPage: function () {
            fskj=false;
            szsmStr = "";
            fpmx=null;
            disableButtons(_$("#kj,#fs,#xyz,#dy,#yl"));
            ajaxLoad(ctxPath + "/escfp/check.do", {async: false}, function (json) {

                _$("#fpdm").text(json.dqph.dqfpdm);
                _$("#fpdm_copy").text(json.dqph.dqfpdm);
                _$("#fphm").text(json.dqph.dqfphm);
                _$("#fphm_copy").text(json.dqph.dqfphm);
                _$("#jqbh").text(json.jqbh);
                _$("#kprq").text(json.kprq);
                _$("#kpr").text(json.kpr);
                qylx = json.qylx;
                _$("#jypmdwmc,#jypmdwsbh,#jypmdwdz,#escscmc,#escscsbh,#escscdz").attr("readonly", "readonly");
                if (qylx == "01" || qylx == "02") {
                    _$("#jypmdwmc").val(json.xhdwmc);
                    _$("#jypmdwdz").val(json.dz);
                    _$("#jypmdwsbh").val(json.xhdwdm);
                    _$("#jypmdwkhyhzh").val(json.khhzh);
                    _$("#jypmdwdh").val(json.dh);
                    //经营单位，自动带入卖方信息
                    if (qylx == "01") {
                        _$("#xfmc").val(json.xhdwmc);
                        _$("#xfdz").val(json.dz);
                        _$("#xfsfzh").val(json.xhdwdm);
                        _$("#xfdh").val(json.dh);
                        _$("#xfmc,#xfdz,#xfsfzh,#xfdh").attr("readonly", "readonly");
                    }
                    //_$("#zzsesc_fpkj_spbm_form").append($("<input name='qylx' value='"+qylx+"'/>").attr("hidden","true"));


                } else if (qylx == "03") {
                    _$("#escscmc").val(json.xhdwmc);
                    _$("#escscdz").val(json.dz);
                    _$("#escscsbh").val(json.xhdwdm);
                    _$("#escsckhyhzh").val(json.khhzh);
                    _$("#escscdh").val(json.dh);
                } else if (qylx == "00") {
                    alertMsg.warn("非二手机动车纳税人不能开具二手机动车发票！");
                    return;
                } else {
                    alertMsg.warn("请先维护企业类型！");
                    return;
                }
                enableButtons(_$("#kj,#fs"));
                checkspbmbb();
            });
            var _this = this;
            _$("#yl").click(this.yl);
            _$("#dy").click(this.dy);
            _$("#kj").click(this.kjfp);
            _$("#fs").click(this.fskj);
            _$("#xyz").click(this.xyz);
            _$("#cpxh").dblclick(this.popSpbm);
            _$("#cllx").dblclick(this.popSpbm);
            limit_money_input(_$("#jshj_xx"));
            _$("#jshj_xx").bind("change", function () {
                if (!fskj) {
                    var jshj_xx = (this.value * 1).toFixed(2);
                    _$("#jshj_xx").val(jshj_xx);
                    _$("#jshj").val(je2Upper(jshj_xx));
                } else {
                    var jshj_xx = Math.abs(this.value * 1).toFixed(2);
                    _$("#jshj_xx").val("-" + jshj_xx);
                    _$("#jshj").val(je2Upper(jshj_xx));
                }

            });

            // $.pdialog.open(ctxPath + "/escfp/initDialog.do", "escfp_clgzsxxDlg", "车辆购置税和增值税开票信息", {
            //     width: 570,
            //     height: 400,
            //     callback: function () {
            //         $_('.ykp,.ykj,.wkpj').hide();
            //         $_(".kplx").click(function () {
            //             _this.checkRadio();
            //         });
            //         $_("#dlg_next_bt").click(function () {
            //             var kplx = $_(".kplx:checked").val();
            //             if (kplx != undefined) {
            //                 var zzswspzhm=$_("#ywspzhm").val();
            //                 var fpdm = $_("#fpdm").val();
            //                 var fphm = $_("#fphm").val();
            //                 var xse = $_("#xse").val();
            //                 var ykpsl = $_("#zzssl").val();
            //                 var ykpse = $_("#zzsse").val();
            //                 if (kplx == "01") {
            //                     if (fpdm != "") {
            //                         _$("#zzsesc_fpkj_spbm_form").append($("<input name='ykfpdm' value='" + fpdm + "'/>").attr("style", "display:none"));
            //                     }
            //                     if (fphm != "") {
            //                         _$("#zzsesc_fpkj_spbm_form").append($("<input name='ykfphm' value='" + fphm + "'/>").attr("style", "display:none"));
            //                     }
            //                     if (xse != "") {
            //                         _$("#zzsesc_fpkj_spbm_form").append($("<input name='ykpxse' value='" + xse + "'/>").attr("style", "display:none"));
            //                     }
            //                     if (ykpsl != "") {
            //                         _$("#zzsesc_fpkj_spbm_form").append($("<input name='ykpsl' value='" + ykpsl + "'/>").attr("style", "display:none"));
            //                     }
            //                     if (ykpse != "") {
            //                         _$("#zzsesc_fpkj_spbm_form").append($("<input name='ykpse' value='" + ykpse + "'/>").attr("style", "display:none"));
            //                     }
            //                 } else if (kplx == "05") {
            //                     if (xse != "") {
            //                         _$("#zzsesc_fpkj_spbm_form").append($("<input name='ykpxse' value='" + xse + "'/>").attr("style", "display:none"));
            //                     }
            //                     if (ykpsl != "") {
            //                         _$("#zzsesc_fpkj_spbm_form").append($("<input name='ykpsl' value='" + ykpsl + "'/>").attr("style", "display:none"));
            //                     }
            //                     if (ykpse != "") {
            //                         _$("#zzsesc_fpkj_spbm_form").append($("<input name='ykpse' value='" + ykpse + "'/>").attr("style", "display:none"));
            //                     }
            //                     if (zzswspzhm != "") {
            //                         _$("#zzsesc_fpkj_spbm_form").append($("<input name='zzswspzhm' value='" + zzswspzhm + "'/>").attr("style", "display:none"));
            //                         _$("#zzsesc_fpkj_spbm_form").append($("<input name='kjwspzbs' value='1'/>").attr("style", "display:none"));
            //                     }else {
            //                         _$("#zzsesc_fpkj_spbm_form").append($("<input name='kjwspzbs' value='0'/>").attr("style", "display:none"));
            //                     }
            //                 }
            //             }
            //             var wspzhm = $_("#wspzhm").val();
            //             if (wspzhm != "") {
            //                 _$("#zzsesc_fpkj_spbm_form").append($("<input name='cgswspzhm' value='" + wspzhm + "'/>").attr("style", "display:none"));
            //             }
            //             $.pdialog.closeCurrent();
            //         });
            //     }
            // });
        },
        checkRadio: function () {
            var _kplx = $_('input:radio[name="kplx"]:checked').val();
            if (_kplx == '01') {
                $_('.ykp,.ykj,.wkpj').hide();
                $_('.ykp,.wkpj').show();
            } else if (_kplx == '05') {
                $_('.ykp,.ykj,.wkpj').hide();
                $_('.ykj,.wkpj').show();
            } else {
                $_('.ykp,.ykj,.wkpj').hide();
            }

        },
        checkEscData: function () {
            _$("#zzsesc_fpkj_spbm_form :text:not(:disabled),textarea").val(function () {
                return qj2bj($.trim(this.value));
            });
            var mfmc = _$("#mfmc").val();
            var mfsfzh = _$("#mfsfzh").val();
            var mfdz = _$("#mfdz").val();
            var mfdh = _$("#mfdh").val();
            var xfmc = _$("#xfmc").val();
            var xfsfzh = _$("#xfsfzh").val();
            var xfdz = _$("#xfdz").val();
            var xfdh = _$("#xfdh").val();
            var cpzh = _$("#cpzh").val();
            var djzh = _$("#djzh").val();
            var cllx = _$("#cllx").val();
            var clsbdm = _$("#clsbdm").val();
            var cpxh = _$("#cpxh").val();
            var zrdcgs = _$("#zrdcgs").val();
            var jshj_xx = _$("#jshj_xx").val();
            var jypmdwmc = _$("#jypmdwmc").val();
            var jypmdwdz = _$("#jypmdwdz").val();
            var jypmdwsbh = _$("#jypmdwsbh").val();
            var jypmdwkhyhzh = _$("#jypmdwkhyhzh").val();
            var jypmdwdh = _$("#jypmdwdh").val();
            var escscmc = _$("#escscmc").val();
            var escscdz = _$("#escscdz").val();
            var escscsbh = _$("#escscsbh").val();
            var escsckhyhzh = _$("#escsckhyhzh").val();
            var escscdh = _$("#escscdh").val();
            var bz = _$("#bz").val();

            /**
             *校验非空
             */
            if (mfmc.trim() == "") {
                alertMsg.warn("买方单位/个人不能为空！");
                return false;
            }
            if (mfsfzh.trim() == "") {
                alertMsg.warn("买方单位代码/身份证号码不能为空！");
                return false;
            }
            var regex = /^[A-Z0-9\-]*$/;
            if (!regex.test(mfsfzh)){
                alertMsg.warn("买方单位代码/身份证号码只能大写字母数字或-！");
                return false;
            }
            if (xfmc.trim() == "") {
                alertMsg.warn("卖方单位/个人不能为空！");
                return false;
            }
            if (!regex.test(xfsfzh)){
                alertMsg.warn("卖方单位代码/身份证号码只能大写字母数字或-！");
                return false;
            }
            if (xfsfzh.trim() == "") {
                alertMsg.warn("卖方单位代码/身份证号码不能为空！");
                return false;
            }
            if (cpzh.trim() == "") {
                alertMsg.warn("车牌照号不能为空！");
                return false;
            }
            if (djzh.trim() == "") {
                alertMsg.warn("登记证号不能为空");
                return false;
            }
            if (cllx.trim() == "") {
                alertMsg.warn("车辆类型不能为空！");
                return false;
            }
            if (clsbdm.trim() == "") {
                alertMsg.warn("车架号/车辆识别代号不能为空!");
                return false;
            }
            if (cpxh.trim() == "") {
                alertMsg.warn("厂牌型号不能为空！");
                return false;
            }
            if (zrdcgs.trim() == "") {
                alertMsg.warn("转入地车辆管理所名称不能为空！");
                return false;
            }
            if (jshj_xx.trim() == "") {
                alertMsg.warn("车价合计小写不能为空！");
                return false;
            }
            if (cllx == "" || cllx == null) {
                alert("请选择商品编码（双击车辆类型或厂牌型号选择商品编码）");
                return false;
            }
            if ((jypmdwmc.trim() == "" || jypmdwsbh.trim() == "" || escscmc.trim() != "" || escscdz.trim() != "" || escscsbh.trim() != "" || escsckhyhzh.trim() != "" || escscdh.trim() != "")
                && (escscmc.trim() == "" || escscsbh.trim() == "" || jypmdwmc.trim() != "" || jypmdwdz.trim() != "" || jypmdwsbh.trim() != "" || jypmdwkhyhzh.trim() != "" || jypmdwdh.trim() != "")) {
                alertMsg.warn("经营拍卖单位和二手车市场有且只能填一项，且名称和纳税人识别号为必填项！");
                return false;
            }
            //经营拍卖单位校验银行账号电话不能为空
            if (qylx == "01" || qylx == "02") {
                if (jypmdwkhyhzh.trim() == "" ||jypmdwdh.trim() == ""){
                    alertMsg.warn("卖方银行、账号、电话不能为空！");
                    return false;
                }
            }

            /*
            //二手车市场银行账号电话不能为空
            if (qylx == "03"){
                 if (escsckhyhzh.trim() || escscdh.trim() == ""){
                     alertMsg.warn("卖方银行、账号、电话不能为空！");
                     return false;
                 }
             }*/
            /**
             * 校验长度
             */
            if (countStrLength(mfmc) > 80) {
                alertMsg.warn("买方单位/个人长度不能超过80位");
                return false;
            }
            if (countStrLength(mfsfzh) > 22) {
                alertMsg.warn("买方单位代码/身份证号码长度不能超过22位");
                return false;
            }
            if (countStrLength(mfdz) > 80) {
                alertMsg.warn("买方单位/个人住址长度不能超过80位");
                return false;
            }
            if (countStrLength(mfdh) > 20) {
                alertMsg.warn("买方单位/电话长度不能超过20位");
                return false;
            }
            if (countStrLength(xfmc) > 80) {
                alertMsg.warn("卖方单位/个人长度不能超过80位");
                return false;
            }
            if (countStrLength(xfsfzh) > 22) {
                alertMsg.warn("卖方单位代码/身份证号码长度不能超过22位");
                return false;
            }
            if (countStrLength(xfdz) > 80) {
                alertMsg.warn("卖方单位代码/身份证号码长度不能超过80位");
                return false;
            }
            if (countStrLength(xfdh) > 20) {
                alertMsg.warn("卖方单位/电话长度不能超过20位");
                return false;
            }
            if (countStrLength(cpzh) > 20) {
                alertMsg.warn("车牌照号长度不能超过20位");
                return false;
            }
            if (countStrLength(djzh) > 20) {
                alertMsg.warn("登记证号长度不能超过20位");
                return false;
            }
            if (countStrLength(cllx) > 40) {
                alertMsg.warn("车辆类型长度不能超过40位");
                return false;
            }
            if (countStrLength(clsbdm) > 23) {
                alertMsg.warn("车架号/车辆识别代码长度不能超过23位");
                return false;
            }
            if (countStrLength(cpxh) > 60) {
                alertMsg.warn("厂牌型号长度不能超过60位");
                return false;
            }
            if (countStrLength(zrdcgs) > 80) {
                alertMsg.warn("转入地车辆管理所名称长度不能超过80位");
                return false;
            }
            //单独校验金额
            if (jshj_xx * 1 > 1000000000) {
                alertMsg.warn("车价合计最大不能超过10亿！");
                return false;
            }
            if (countStrLength(jypmdwmc) > 80) {
                alertMsg.warn("经营、拍卖单位名称长度不能超过80位");
                return false;
            }
            if (countStrLength(jypmdwdz) > 80) {
                alertMsg.warn("经营、拍卖单位地址长度不能超过80位");
                return false;
            }
            if (countStrLength(jypmdwsbh) > 20) {
                alertMsg.warn("经营、拍卖单位纳税人识别号长度不能超过20位");
                return false;
            }
            if (countStrLength(jypmdwkhyhzh) > 120) {
                alertMsg.warn("经营、拍卖单位开户银行、账号长度不能超过120位");
                return false;
            }
            if (countStrLength(jypmdwdh) > 20) {
                alertMsg.warn("经营、拍卖单位/电话长度不能超过20位");
                return false;
            }
            if (countStrLength(escscmc) > 80) {
                alertMsg.warn("二手车辆市场名称长度不能超过20位");
                return false;
            }
            if (countStrLength(escscsbh) > 20) {
                alertMsg.warn("二手车辆市场纳税人识别号长度不能超过20位");
                return false;
            }
            if (countStrLength(escscdz) > 80) {
                alertMsg.warn("二手车辆市场地址长度不能超过80位");
                return false;
            }
            if (countStrLength(escsckhyhzh) > 120) {
                alertMsg.warn("二手车辆市场开户银行、账号长度不能超过120位");
                return false;
            }
            if (countStrLength(escscdh) > 20) {
                alertMsg.warn("二手车辆市场电话长度不能超过20位");
                return false;
            }
            if (countStrLength(bz) > 186) {
                alertMsg.warn("备注最多为186个字符或98个汉字");
                return false;
            }
            return true;

        },
        fskj: function () {
            var _this = this;
            $.pdialog.open(ctxPath + "/escfp/fskjDialog.do", "escfp_fskjDlg", "负数发票代码号码填写、确认", {
                width: 550,
                height: 245,
                callback: function () {
                    $_("#dlg_next_bt").click(function () {
                        if (!esc_zsfpkj_spbm.checkFpdmhm()) {
                            return;
                        }
                        esc_zsfpkj_spbm.preFskj();
                        ajaxLoad(ctxPath + "/escfp/searchYfp.do", {
                            yfpdm: $_("#yfpdm").val(),
                            yfphm: $_("#yfphm").val()
                        }, function (json) {
                            if (json.errMessage) {
                                alert(json.errMessage);
                                if($.pdialog){
                                    $.pdialog.closeCurrent();
                                }
                                //disableButtons(_$("#kj,#fs,#yl,#dy"));
                                return;
                            }
                            enableButtons(_$("#kj"));
                            if (json.rightMessage) {
                                alert(json.rightMessage);
                            }
                            if(json.sfyyfp && json.hjjeString <= 0 ){
                                alert("原发票已开具过负数发票！");
                                disableButtons(_$("#kj,#fs,#yl,#dy"));
                                return;
                            }
                            _$("#hjjeString").val(json.hjjeString);
                            esc_zsfpkj_spbm.setValueFromYfp(json.yfpmx, json.sfyyfp);
                        })
                    });
                }
            })
        },
        setValueFromYfp: function (yfp, sfyyfp) {
            var yfpdm, yfphm;
            if (sfyyfp == true) {
                yfpdm = yfp.fpdm;
                yfphm = yfp.fphm;
                /**
                 * 回填页面信息
                 */
                _$("#mfmc").val(yfp.gfmc);
                _$("#mfsfzh").val(yfp.gfdm);
                _$("#mfdz").val(yfp.gfdz);
                _$("#mfdh").val(yfp.gfdh);
                _$("#xfmc").val(yfp.xfmc);
                _$("#xfsfzh").val(yfp.xfdm);
                _$("#xfdz").val(yfp.xfdz);
                _$("#xfdh").val(yfp.xfdh);
                _$("#cpzh").val(yfp.cpzh);
                _$("#djzh").val(yfp.djzh);
                _$("#cllx").val(yfp.cllx);
                _$("#clsbdm").val(yfp.clsbh);
                _$("#cpxh").val(yfp.cpxh);
                _$("#zrdcgs").val(yfp.zrdclglsmc);
                _$("#jshj_xx").val(-(yfp.cjhj * 1).toFixed(2));
                _$("#jshj").val(je2Upper((yfp.cjhj * 1).toFixed(2)));
                _$("#kpflx").val(yfp.kpflx);
                if (yfp.kpflx == "01" || yfp.kpflx == "02") {
                    _$("#jypmdwmc").val(yfp.jypmdwmc);
                    _$("#jypmdwdz").val(yfp.jypmdwdz);
                    _$("#jypmdwsbh").val(yfp.jypmdwsbh);
                    _$("#jypmdwkhyhzh").val(yfp.jypmdwyhzh);
                    _$("#jypmdwdh").val(yfp.jypmdwdh);
                    if (_$("#escscmc").val() && _$("#escscsbh").val()) {
                        _$("#escscmc").val("");
                        _$("#escscsbh").val("");
                        _$("#escscdz").val("");
                        _$("#escsckhyhzh").val("");
                        _$("#escscdh").val("");
                    }
                    if (yfp.kpflx == "01") {
                        _$("#xfmc").val(yfp.xfmc);
                        _$("#xfdz").val(yfp.xfdz);
                        _$("#xfsfzh").val(yfp.xfdm);
                        _$("#xfdh").val(yfp.xfdh);
                        _$("#xfmc,#xfdz,#xfsfzh,#xfdh").attr("readonly", "readonly");
                    }
                } else if (yfp.kpflx == "03") {
                    _$("#escscmc").val(yfp.escscmc);
                    _$("#escscsbh").val(yfp.escscsbh);
                    _$("#escscdz").val(yfp.escscdz);
                    _$("#escsckhyhzh").val(yfp.escscyhzh);
                    _$("#escscdh").val(yfp.escscdh);
                    if (_$("#jypmdwmc").val() && _$("#jypmdwsbh").val()) {
                        _$("#jypmdwmc").val("");
                        _$("#jypmdwdz").val("");
                        _$("#jypmdwsbh").val("");
                        _$("#jypmdwkhyhzh").val("");
                        _$("#jypmdwdh").val("");
                    }
                }
                _$("#bz").val(yfp.bz);
                _$("#spbm").val(yfp.spbm);
                _$("#zxbm").val(yfp.zxbm);
                _$("#bmbbbh").val(yfp.bmbbbh);
                _$("#yhzcbs").val(yfp.yhzcbs);
                _$("#lslbs").val(yfp.lslbs);
                _$("#zzstsgl").val(yfp.zzstsgl);
            } else {
                yfpdm = $_("#yfpdm").val();
                yfphm = $_("#yfphm").val();
                _$("#jshj").val("");
                _$("#jshj_xx").val("");
            }
            var yfpxx = _$("<div id='yfpxx'/>").hide();
            _$("#zzsesc_fpkj_spbm_form").append(yfpxx);
            yfpxx.append("<input name='yfpdm' value='"
                + yfpdm + "'/>");
            yfpxx.append("<input name='yfphm' value='"
                + yfphm + "'/>");
        },
        preFskj: function () {
            fskj = true;
            _$("#jshj").css({"display": "inline-block", "width": "320px"})
            _$("#fsbz").remove();
            _$("#jshj").before($("<span id='fsbz' style='color: red'>(负数)</span>"));
            _$("#zzsesc_fpkj_spbm_form").append($("<input style='display:none'  name='fskj' value='1'/>"));
            _$("#jshj_xx").attr("style", "width: 155px;margin-left: 18px;margin-top: 2px;");
            _$("#jypmdwsbh").attr("style", "width: 200px;margin-left: 18px;margin-top: 3px;");
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
        yl: function () {
            if (!checkPrint()) {
                return;
            }
            printEscfp(fpmx, true);
            LODOP.PREVIEW();
        },
        dy: function () {
            if (!checkPrint()) {
                return;
            }
            printEscfp(fpmx);
            LODOP.PRINT();
        },
        kjfp: function () {
            if (!checkPrint()) {
                return;
            }
            if (!checkKey()) {
                return;
            }

            if (!esc_zsfpkj_spbm.checkEscData()) {
                return;
            }

            _$("#zzsesc_fpkj_spbm_form").submit();
        },
        kjcg: function (json) {
            navTabAjaxDone(json);
            if (json.statusCode == DWZ.statusCode.ok) {
                _$("#dy,#xyz,#yl").parent().parent().show();
                enableButtons(_$("#dy,#yl,#xyz"));
                disableButtons(_$("#kj,#fs"));
                _$("#cpxh,#cllx").unbind("dblclick");
                _$("#fpdm").text(json.kjjg.fpdm);
                _$("#fphm").text(json.kjjg.fphm);
                fpmx = json.kjjg;
                fpmx.ewm = json.ewm;
                var skm = json.kjjg.skm;
                _$("#skm").text(skm);
                var kprq = json.kjjg.kprq;
                _$("#kprq").text(kprq.substring(0, 4) + "年" + kprq.substring(4, 6) + "月" + kprq.substring(6, 8) + "日");
                // var jym = json.kjjg.jym;
                // _$("#jym").text(jym);
                _$("#zzsesc_fpkj_spbm_form input").attr("readonly", "readonly");
            }
        },
        //下一张
        xyz: function () {
            navTab.reload();
        },
        createData: function () {
            var h36 = "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
                h40 = h36 + "啊啊啊啊";
            h6 = "啊啊啊啊啊啊";
            h30 = "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊";
            h20 = "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊";
            y72 = "QWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQQ",
                y80 = y72 + "12345678";
            s8 = "12345678";
            s12 = "123456789012";
            s20 = "12345678901234567890";
            h10 = "啊啊啊啊啊啊啊啊啊啊啊啊";
            var fpmx = {};
            fpmx.kprq = "2017年12月07日";
            fpmx.fpdm = s12;//固定12位
            fpmx.fphm = s8;//固定8位
            fpmx.jqbh = s12;//固定12位
            fpmx.skm = "90909090909090909090";//固定20位
            fpmx.mfmc = h36;//max 72
            fpmx.mfsfzh = "1234567890123456789012";//max 22
            fpmx.mfdz = h40;//max 80 汉字28-56英文48-46
            fpmx.mfdh = s20;//max 20
            fpmx.xfmc = h36;//max 72
            fpmx.xfsfzh = "1234567890123456789012";//max 22
            fpmx.xfdz = h40;// max 80
            fpmx.xfdh = s20;// max 20
            fpmx.cpzh = "京AAAA23F24AAAAAAAAA";// max 20
            fpmx.djzh = s20;// max 20
            fpmx.cllx = h20;// max 40
            fpmx.clsbdm = s20 + "KKK";// max 23
            fpmx.cpxh = h30;// max 60
            fpmx.glsmc = h40;// max 80
            fpmx.cjhj = je2Upper(999999999.99);// max 十亿
            fpmx.je = "1000000000.00￥"; // max 10 0000 0000
            fpmx.jypmdw = h40;//max 80
            fpmx.jypmdwdz = h40;// max 80
            fpmx.jypmdwsbh = s20;// 20
            fpmx.jypmdwkhyhzh = h40 + h20;// 120
            fpmx.jypmdwdh = s20; // 20
            fpmx.escscmc = h40;// 80 40
            fpmx.escscsbh = s20;// 20
            fpmx.escscdz = h40;// 80 38
            fpmx.escsckhyhzh = h40 + h40 + h40;// 120 60
            fpmx.escscdh = s20;// 20  12
            fpmx.bz = h40 + h40 + h20 + h10 + "ASDFGHJKLM";// 230 120
            fpmx.kpr = " 啊啊啊啊啊";// 20
            return fpmx;
        }

    }
}();

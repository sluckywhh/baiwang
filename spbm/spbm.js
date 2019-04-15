var spbmInit = function () {
    var tree, map, treeData, tsgls, kysl, sIndex;
    var zbm = [
        "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
        "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60",
        "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80",
        "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99",
        "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX", "AY", "AZ",
        "BA", "BB", "BC", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BK", "BL", "BM", "BN", "BO", "BP", "BQ", "BR", "BS", "BT", "BU", "BV", "BW", "BX", "BY", "BZ",
        "CA", "CB", "CC", "CD", "CE", "CF", "CG", "CH", "CI", "CJ", "CK", "CL", "CM", "CN", "CO", "CP", "CQ", "CR", "CS", "CT", "CU", "CV", "CW", "CX", "CY", "CZ",
        "DA", "DB", "DC", "DD", "DE", "DF", "DG", "DH", "DI", "DJ", "DK", "DL", "DM", "DN", "DO", "DP", "DQ", "DR", "DS", "DT", "DU", "DV", "DW", "DX", "DY", "DZ",
        "EA", "EB", "EC", "ED", "EE", "EF", "EG", "EH", "EI", "EJ", "EK", "EL", "EM", "EN", "EO", "EP", "EQ", "ER", "ES", "ET", "EU", "EV", "EW", "EX", "EY", "EZ",
        "FA", "FB", "FC", "FD", "FE", "FF", "FG", "FH", "FI", "FJ", "FK", "FL", "FM", "FN", "FO", "FP", "FQ", "FR", "FS", "FT", "FU", "FV", "FW", "FX", "FY", "FZ",
        "GA", "GB", "GC", "GD", "GE", "GF", "GG", "GH", "GI", "GJ", "GK", "GL", "GM", "GN", "GO", "GP", "GQ", "GR", "GS", "GT", "GU", "GV", "GW", "GX", "GY", "GZ",
        "HA", "HB", "HC", "HD", "HE", "HF", "HG", "HH", "HI", "HJ", "HK", "HL", "HM", "HN", "HO", "HP", "HQ", "HR", "HS", "HT", "HU", "HV", "HW", "HX", "HY", "HZ",
        "IA", "IB", "IC", "ID", "IE", "IF", "IG", "IH", "II", "IJ", "IK", "IL", "IM", "IN", "IO", "IP", "IQ", "IR", "IS", "IT", "IU", "IV", "IW", "IX", "IY", "IZ",
        "JA", "JB", "JC", "JD", "JE", "JF", "JG", "JH", "JI", "JJ", "JK", "JL", "JM", "JN", "JO", "JP", "JQ", "JR", "JS", "JT", "JU", "JV", "JW", "JX", "JY", "JZ",
        "KA", "KB", "KC", "KD", "KE", "KF", "KG", "KH", "KI", "KJ", "KK", "KL", "KM", "KN", "KO", "KP", "KQ", "KR", "KS", "KT", "KU", "KV", "KW", "KX", "KY", "KZ",
        "LA", "LB", "LC", "LD", "LE", "LF", "LG", "LH", "LI", "LJ", "LK", "LL", "LM", "LN", "LO", "LP", "LQ", "LR", "LS", "LT", "LU", "LV", "LW", "LX", "LY", "LZ",
        "MA", "MB", "MC", "MD", "ME", "MF", "MG", "MH", "MI", "MJ", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ",
        "NA", "NB", "NC", "ND", "NE", "NF", "NG", "NH", "NI", "NJ", "NK", "NL", "NM", "NN", "NO", "NP", "NQ", "NR", "NS", "NT", "NU", "NV", "NW", "NX", "NY", "NZ",
        "OA", "OB", "OC", "OD", "OE", "OF", "OG", "OH", "OI", "OJ", "OK", "OL", "OM", "ON", "OO", "OP", "OQ", "OR", "OS", "OT", "OU", "OV", "OW", "OX", "OY", "OZ",
        "PA", "PB", "PC", "PD", "PE", "PF", "PG", "PH", "PI", "PJ", "PK", "PL", "PM", "PN", "PO", "PP", "PQ", "PR", "PS", "PT", "PU", "PV", "PW", "PX", "PY", "PZ",
        "QA", "QB", "QC", "QD", "QE", "QF", "QG", "QH", "QI", "QJ", "QK", "QL", "QM", "QN", "QO", "QP", "QQ", "QR", "QS", "QT", "QU", "QV", "QW", "QX", "QY", "QZ",
        "RA", "RB", "RC", "RD", "RE", "RF", "RG", "RH", "RI", "RJ", "RK", "RL", "RM", "RN", "RO", "RP", "RQ", "RR", "RS", "RT", "RU", "RV", "RW", "RX", "RY", "RZ",
        "SA", "SB", "SC", "SD", "SE", "SF", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SP", "SQ", "SR", "SS", "ST", "SU", "SV", "SW", "SX", "SY", "SZ",
        "TA", "TB", "TC", "TD", "TE", "TF", "TG", "TH", "TI", "TJ", "TK", "TL", "TM", "TN", "TO", "TP", "TQ", "TR", "TS", "TT", "TU", "TV", "TW", "TX", "TY", "TZ",
        "UA", "UB", "UC", "UD", "UE", "UF", "UG", "UH", "UI", "UJ", "UK", "UL", "UM", "UN", "UO", "UP", "UQ", "UR", "US", "UT", "UU", "UV", "UW", "UX", "UY", "UZ",
        "VA", "VB", "VC", "VD", "VE", "VF", "VG", "VH", "VI", "VJ", "VK", "VL", "VM", "VN", "VO", "VP", "VQ", "VR", "VS", "VT", "VU", "VV", "VW", "VX", "VY", "VZ",
        "WA", "WB", "WC", "WD", "WE", "WF", "WG", "WH", "WI", "WJ", "WK", "WL", "WM", "WN", "WO", "WP", "WQ", "WR", "WS", "WT", "WU", "WV", "WW", "WX", "WY", "WZ",
        "XA", "XB", "XC", "XD", "XE", "XF", "XG", "XH", "XI", "XJ", "XK", "XL", "XM", "XN", "XO", "XP", "XQ", "XR", "XS", "XT", "XU", "XV", "XW", "XX", "XY", "XZ",
        "YA", "YB", "YC", "YD", "YE", "YF", "YG", "YH", "YI", "YJ", "YK", "YL", "YM", "YN", "YO", "YP", "YQ", "YR", "YS", "YT", "YU", "YV", "YW", "YX", "YY", "YZ",
        "ZA", "ZB", "ZC", "ZD", "ZE", "ZF", "ZG", "ZH", "ZI", "ZJ", "ZK", "ZL", "ZM", "ZN", "ZO", "ZP", "ZQ", "ZR", "ZS", "ZT", "ZU", "ZV", "ZW", "ZX", "ZY", "ZZ"];
    return {
        initPage: function () {

            var $this = this;
            tree = null;
            map = new HashMap();
            tsgls = null;
            treeData = [];
            kysl = null;
            sIndex = 0;
            _$("#spbm_search_input").unbind("change").change($this.resetSindex);
            var setting = {
                data: {
                    simpleData: {
                        enable: false
                    }
                },
                view: {
                    showLine: false,
                    selectedMulti: false,
                    dblClickExpand: false,
                    fontCss: function (treeId, treeNode) {
                        return treeNode.zdy == 0 ? {} : {color: "green"};
                    }
                },
                callback: {
                    onClick: function (e, treeId, treeNode) {
                        $this.loadTable({bm: treeNode.id, zdy: treeNode.zdy});
                    },
                    beforeDrag: function (treeId, treeNodes) {
                        return treeNodes[0] && treeNodes[0].zdy == "1" && treeNodes[0].id.length > 19;
                    },
                    beforeDrop: function (treeId, treeNodes, targetNode, moveType) {
                        // 可以放置到自定义节点或局端叶子节点或局端节点下全是自定义节点
                        var pass = true;
                        if (moveType != "inner" || treeNodes[0].pId == targetNode.id || treeNodes[0].id == targetNode.id) {
                            return false;
                        }
                        var newArray = new Array();

                        var len = treeNodes[0].id.length;

                        function fingAllNodes(aa, bb, hzw) {
                            for (var j = 0; j < aa.length; j++) {
                                var oldId, newId, newPid;
                                oldId = aa[j].id;
                                if (bb) {
                                    newId = targetNode.id + hzw
                                        + oldId.substring(len);
                                } else {
                                    newId = targetNode.id
                                        + oldId.substring(len - 2);
                                }
                                newPid = newId.substring(0, newId.length - 2);
                                aa[j].newId = newId;
                                aa[j].newPid = newPid;
                                newArray.push(newId + "_" + newPid + "_"
                                    + oldId);
                                var childrenNodes = aa[j].isParent;
                                if (childrenNodes) {
                                    return fingAllNodes(aa[j].children, bb);
                                }
                            }
                        }

                        if (targetNode.zdy == "0" && targetNode.children) {
                            for (var i = 0; i < targetNode.children.length; i++) {
                                if (targetNode.children[i].zdy == "0") {
                                    pass = false;
                                    break;
                                }
                            }
                        }
                        if (pass) {
                            pass = false;
                            // 如果 targetNode = null代表是跟节点

                            var firstNode, lasttwo = "";
                            var isCz = false;
                            var tarNode = targetNode;
                            if (targetNode.isParent) {
                                // 判断目标节点中是否含有拖拽目标跟节点的后两位

                                var dropIdLasTwoVlaue = treeNodes[0].id
                                    .substring(treeNodes[0].id.length - 2);
                                firstNode = targetNode.id + dropIdLasTwoVlaue;
                                var targetNodes = targetNode.children;

                                var chiNodes = new Array();
                                for (var j = 0; j < targetNodes.length; j++) {
                                    var cTarget = targetNodes[j].id
                                        .substring(targetNodes[j].id.length
                                            - 2);
                                    chiNodes.push(cTarget);

                                }
                                // 如果存在id后两位需要生成新的id后两位

                                for (var i = 0; i < targetNodes.length; i++) {
                                    var cTarget = targetNodes[i].id;
                                    if (cTarget == firstNode) {
                                        isCz = true;
                                        break;
                                    }

                                }
                                if (isCz) {

                                    for (var i = 0; i < zbm.length; i++) {

                                        if (chiNodes.indexOf(zbm[i]) == -1) {
                                            lasttwo = zbm[i];
                                            break;
                                        }
                                        ;

                                    }
                                }
                            }
                            fingAllNodes(treeNodes, isCz, lasttwo);
                            ajaxLoad(ctxPath + "/spxx/drop.do", {
                                async: false,
                                ids: newArray.join(",")
                            }, function (json) {
                                pass = true;
                            });
                        }
                        return pass;
                    },
                    onDrop: function (event, treeId, treeNodes, targetNode, moveType) {
                        if (targetNode) {
                            $this.initPage();
                            var sel = tree.getNodeByParam("id", treeNodes[0].newId);
                            tree.selectNode(sel);
                        }
                    }
                },
                edit: {
                    enable: true,
                    showRemoveBtn: false,
                    showRenameBtn: false
                }
            };
            ajaxLoad(ctxPath + "/spbm/loadAll.do", {async: false}, function (json) {
                $.each(json, function (i, n) {
                    map.put(n.id, n);
                });
                $.each(json, function (i, n) {
                    var pId = n.pId;
                    if (pId != "0") {
                        var node = map.get(pId);
                        if (node) {
                            if (!node.children) {
                                node.children = [];
                                node.childMap = new HashMap();
                            }
                            if (node.childMap.containsKey(n.id)) {
                                node.childMap.put(n.id, n);
                                node.children = node.childMap.values();
                            } else {
                                node.children.push(n);
                            }
                            node.childMap.put(n.id, n);
                        }
                    } else {
                        treeData.push(n);
                    }
                });
                var treeBox = _$("#spbmInitTree").addClass("ztree");
                tree = $.fn.zTree.init(treeBox, setting, treeData);
                if (ie6) {
                    treeBox.find("> li > a").css("margin-left", "-14px");
                }
            });
        },
        loadTable: function (p) {
            var box = _$("#spbmInitBox");
            box.loadUrl(ctxPath + "/spbm/detail.do", p, function (json) {
                box.find("[layoutH]").layoutH();
            });
        },
        search: function (s) {
            if (!s) {
                return;
            }
            var nodes = tree.getNodesByFilter(
                function (node) {
                    if (node.name.indexOf(s) != -1) {
                        return true;
                    }
                }, false);
            if (nodes.length == 0) {
                return;
            }
            tree.selectNode(nodes[sIndex++]);
            sIndex = sIndex % nodes.length;
        },
        checkSel: function (cmd) {
            var sels = tree.getSelectedNodes();
            if (sels.length == 0) {
                alertMsg.error("请选择节点");
                return false;
            }
            var sel = sels[0];
            if (cmd == "add") {
                //判断是否能新增
                if (sel.hzx == 'Y' && sel.zdy == 0) {
                    alertMsg.error("不允许增加子类！");
                    return false;
                } else {
                    return true;
                }

            } else if (cmd == "edit") {
                //判断是否能编辑
                if (sel.hzx == 'Y' && sel.zdy == 0 && sel.id.substring(0, 4) != "3030") {
                    alertMsg.error("该节点不允许编辑！");
                    return false;
                } else {
                    return true;
                }

            } else if (cmd == "del") {
                //判断是否能删除
                if (sel.zdy == 0) {
                    alertMsg.error("非自定义编码不能删除！");
                    return false;
                } else {
                    return true;
                }
            }
            return false;
        },
        add: function () {

            //判断是否能够添加节点
            if (!this.checkSel("add")) {
                return;
            }

            var sel = tree.getSelectedNodes()[0]; //获取当前选择添加节点的目标节点

            //编码不能超过40位
            if (sel.id.length == 39) {
                alertMsg.error("此节点不允许再增加子类！");
                return false;
            }

            var bm;
            if (sel.isParent) {
                var count = sel.children.length + 1;
                if (count > 775) { //父节点的编码 + 01-99/AA-ZZ，如果超过了ZZ时提示不能继续新增 //TODO
                    alertMsg.error("此节点不允许再增加子类！");
                    return false;
                } else {
                    var child = "";
                    $.each(sel.children, function (i, n) {
                        child = (child != "" ? (child + "、") : child) + n.id.substr(n.id.length - 2, 2);
                    });
                    bm = sel.id + this.getBm(child);
                }
            } else {
                bm = sel.id + '01';
            }

            $.pdialog.open(ctxPath + "/spbm/toAddSpbm.do?bm=" + bm + "&zdy=" + sel.zdy, "add_spbm_dlg", "商品和服务税收分类编码——添加", {
                width: 740,
                height: 385,
                callback: function () {
                    if(bm.match(/^10701010[1-7][0-9]*$/)){
                        $_("#jldw").bind("change",function () {
                            var value=this.value;
                            var dj=$_("#dj").val();
                            if(dj){
                                dj=dj*1;
                                if("吨"==value){
                                    //吨转升
                                    //汽油	    1,388
                                    //柴油	    1,176
                                    // 石脑油	1,385
                                    // 溶剂油	1,282
                                    // 润滑油	1,126
                                    // 燃料油	1,015
                                    // 航空煤油	1,246

                                    if(bm.startsWith("10701010101")){
                                        dj=(dj/1388).toFixed(2);
                                    }else if (bm.startsWith("10701010301")){
                                        dj=(dj/1176).toFixed(2);
                                    }else if (bm.startsWith("10701010301")){
                                        dj=(dj/1176).toFixed(2);
                                    }else if (bm.startsWith("10701010501")){
                                        dj=(dj/1385).toFixed(2);
                                    }else if (bm.startsWith("10701010601")){
                                        dj=(dj/1282).toFixed(2);
                                    }else if (bm.startsWith("10701010701")){
                                        dj=(dj/1126).toFixed(2);
                                    }else if (bm.startsWith("10701010401")){
                                        dj=(dj/1015).toFixed(2);
                                    }else if (bm.startsWith("10701010201")){
                                        dj=(dj/1246).toFixed(2);
                                    }
                                }else {
                                    if(bm.startsWith("10701010101")){
                                        dj=(dj*1388).toFixed(2);
                                    }else if (bm.startsWith("10701010301")){
                                        dj=(dj*1176).toFixed(2);
                                    }else if (bm.startsWith("10701010301")){
                                        dj=(dj*1176).toFixed(2);
                                    }else if (bm.startsWith("10701010501")){
                                        dj=(dj*1385).toFixed(2);
                                    }else if (bm.startsWith("10701010601")){
                                        dj=(dj*1282).toFixed(2);
                                    }else if (bm.startsWith("10701010701")){
                                        dj=(dj*1126).toFixed(2);
                                    }else if (bm.startsWith("10701010401")){
                                        dj=(dj*1015).toFixed(2);
                                    }else if (bm.startsWith("10701010201")){
                                        dj=(dj*1246).toFixed(2);
                                    }
                                }
                            }
                            $_("#dj").val(dj);
                        });
                    }
                    $_("#jdcSpbm").click(function () {
                        var jdcMc=$_("#jdcSpbm").text();
                        if(jdcMc=="添加机动车基本信息"){
                            $_("#jdcJbxxTable").removeAttr("style");
                            $_("#jdcSpbm").text("关闭添加机动车基本信息")
                        }else if(jdcMc=="关闭添加机动车基本信息"){
                            $_("#jdcJbxxTable").attr("style","display:none");
                            $_("#jdcSpbm").text("添加机动车基本信息")
                            $_("#jdcJbxxTable input").val("");
                        }   
                    });
                    limit_money_input($_("#dj"));

                    tsgls = $.parseJSON($_("#tsgls").text());
                    kysl = null;
                    kysl = "0.03" + "、" + "0.00";
                    var sls = $.parseJSON($_("#yhzcsl").text());
                    $.each(sls, function (i, n) {
                        kysl = n.substring(0, n.length - 1) / 100 + "、" + kysl;
                    });

                    var bm_bz = bm.substr(0, 1);
                    if (bm_bz == '6') {
                        $_("#rsl option[value='0%']").attr("selected", "selected");
                        $_("#rsl").attr("disabled", "disabled");
                        $_("#mslx option[value='2']").attr("selected", "selected");
                        $_("#mslx").attr("disabled", "disabled");
                        $_("#syyh").attr("checked", "checked");
                        $_("#syyh").attr("value", "Y");
                        $_("#syyh").attr("disabled", "disabled");
                        $_("#yhlx option[value='不征税']").attr("selected", "selected");
                        $_("#yhlx").attr("disabled", "disabled");
                    }
                }
            });
        },
        validateAddSpbm: function () { //校验数据
            var mc = $_("#mc").val(); //名称

            if (!mc) {
                alertMsg.error("商品名称不能为空");
                return false;
            }
            if(countStrLength(mc)>92){
                alertMsg.warn("商品名称最多为92个字符或46个汉字!");
                return false;
            }
            var rsl = $_("#rsl").val(); //税率
            if (!rsl) {
                alertMsg.error("需指定税率！");
                return false;
            }

            var dj = $_("#dj").val();
            if (dj) {
                dj = delRight(dj);
                $_("#dj").val(new Number(dj).toFixed(6));
            }

            $_("#kysl").val(kysl);
            $_("#rsl").removeAttr("disabled");
            $_("#hsbz").removeAttr("disabled");
            $_("#mslx").removeAttr("disabled");
            $_("#syyh").removeAttr("disabled");
            $_("#yhlx").removeAttr("disabled");

            var cllx = $_("#cllx").val();
            var cpxh = $_("#cpxh").val();

            var cd = $_("#cd").val();
            var hgzh = $_("#hgzh").val();
            var jkzmsh = $_("#jkzmsh").val();
            var sjdh = $_("#sjdh").val();
            var wspzhm = $_("#wspzhm").val();
            var dw = $_("#dw").val();
            var xcrs = $_("#xcrs").val();
            var scqymc = $_("#scqymc").val();

            var fdjhm = $_("#fdjhm").val();
            var clsbdh = $_("#clsbdh").val();

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
            return true;
        },
        realAddSpbm: function (json) { //在zTree中添加节点
            if (json.ok) {
                $.pdialog.closeCurrent();
                var sel = tree.getSelectedNodes()[0]; //获取当前选择添加节点的目标节点
                sel.isParent = true;
                tree.addNodes(sel, {id: json.bm, pId: sel.id, isParent: false, name: json.mc, zdy: '1'});
            } else {
                var dj = $_("#dj").val();
                if (dj) {
                    dj = delRight(dj);
                    $_("#dj").val(dj);
                }
                alertMsg.error(json.message);
            }
        },
        edit: function () {

            //判断是否能够编辑节点
            if (!this.checkSel("edit")) {
                return;
            }

            var sel = tree.getSelectedNodes()[0]; //获取当前选择添加节点的目标节点

            $.pdialog.open(ctxPath + "/spbm/toEditSpbm.do?bm=" + sel.id + "&zdy=" + sel.zdy, "edit_spbm_dlg", "商品和服务税收分类编码——编辑", {
                width: 740,
                height: 385,
                callback: function () {
                    var bm =sel.id;
                    if(bm.match(/^10701010[1-7][0-9]*$/)){
                        $_("#jldw").bind("change",function () {
                            var value=this.value;
                            var dj=$_("#dj").val();
                            if(dj){
                                dj=dj*1;
                                if("升"==value){
                                    //吨转升
                                    //汽油	    1,388
                                    //柴油	    1,176
                                    // 石脑油	1,385
                                    // 溶剂油	1,282
                                    // 润滑油	1,126
                                    // 燃料油	1,015
                                    // 航空煤油	1,246

                                    if(bm.startsWith("10701010101")){
                                        dj=(dj/1388).toFixed(2);
                                    }else if (bm.startsWith("10701010301")){
                                        dj=(dj/1176).toFixed(2);
                                    }else if (bm.startsWith("10701010301")){
                                        dj=(dj/1176).toFixed(2);
                                    }else if (bm.startsWith("10701010501")){
                                        dj=(dj/1385).toFixed(2);
                                    }else if (bm.startsWith("10701010601")){
                                        dj=(dj/1282).toFixed(2);
                                    }else if (bm.startsWith("10701010701")){
                                        dj=(dj/1126).toFixed(2);
                                    }else if (bm.startsWith("10701010401")){
                                        dj=(dj/1015).toFixed(2);
                                    }else if (bm.startsWith("10701010201")){
                                        dj=(dj/1246).toFixed(2);
                                    }
                                }else {
                                    if(bm.startsWith("10701010101")){
                                        dj=(dj*1388).toFixed(2);
                                    }else if (bm.startsWith("10701010301")){
                                        dj=(dj*1176).toFixed(2);
                                    }else if (bm.startsWith("10701010301")){
                                        dj=(dj*1176).toFixed(2);
                                    }else if (bm.startsWith("10701010501")){
                                        dj=(dj*1385).toFixed(2);
                                    }else if (bm.startsWith("10701010601")){
                                        dj=(dj*1282).toFixed(2);
                                    }else if (bm.startsWith("10701010701")){
                                        dj=(dj*1126).toFixed(2);
                                    }else if (bm.startsWith("10701010401")){
                                        dj=(dj*1015).toFixed(2);
                                    }else if (bm.startsWith("10701010201")){
                                        dj=(dj*1246).toFixed(2);
                                    }
                                }
                            }
                            $_("#dj").val(dj);
                        });
                    }
                    $_("#editJdcSpbmBtn").click(function () {
                        var jdcMc=$_("#editJdcSpbmBtn").text();
                        if(jdcMc=="编辑机动车基本信息"){
                            $_("#jdcJbxxTable").removeAttr("style");
                            $_("#editJdcSpbmBtn").text("关闭编辑机动车基本信息")
                        }else if(jdcMc=="关闭编辑机动车基本信息"){
                            $_("#jdcJbxxTable").attr("style","display:none");
                            $_("#editJdcSpbmBtn").text("编辑机动车基本信息")
                        }
                    });

                    limit_money_input($_("#dj"));

                    if (sel.id.length == 19) {
                        $_("#mc").attr('class', 'readonly');
                        $_("#mc").attr('readonly', 'readonly');
                        $_("#sm").attr('class', 'readonly');
                        $_("#sm").attr('readonly', 'readonly');
                    }

                    tsgls = $.parseJSON($_("#tsgls").text());
                    kysl = $_("#kysl").val();

                    var mc = $_("#mc");
                    var pyjx = toPinyinJX(mc.toPinyin());
                    $_("input[name='jm']").val(pyjx.substring(0, 10));

                    var syyh = $_("#syyh").val();
                    if (syyh == 'Y') {
                        $_("#yhlx").removeAttr('disabled');
                    }

                    if ($_("#rsl").val() == '1.5%') {
                        $_("#rsl").attr("disabled", "disabled");
                        $_("#hsbz").attr("disabled", "disabled");
                    }

                    var bm_bz = sel.id.substr(0, 1);
                    if (bm_bz == '6') {
                        $_("#rsl option[value='0%']").attr("selected", "selected");
                        $_("#rsl").attr("disabled", "disabled");
                        $_("#mslx option[value='2']").attr("selected", "selected");
                        $_("#mslx").attr("disabled", "disabled");
                        $_("#syyh").attr("checked", "checked");
                        $_("#syyh").attr("value", "Y");
                        $_("#syyh").attr("disabled", "disabled");
                        $_("#yhlx option[value='不征税']").attr("selected", "selected");
                        $_("#yhlx").attr("disabled", "disabled");
                    }
                }
            });
        },
        realEditSpbm: function (json) { //在zTree中添加节点
            if (json.ok) {
                $.pdialog.closeCurrent();
                var sel = tree.getSelectedNodes()[0]; //获取当前选择添加节点的目标节点
                sel.name = json.mc;
                sel.zdy = '1';
                tree.updateNode(sel);
            } else {
                alertMsg.error(json.message);
            }
        },
        del: function () {
            //判断是否能够删除节点
            if (!this.checkSel("del")) {
                return;
            }

            var sel = tree.getSelectedNodes()[0]; //获取当前选择添加节点的目标节点

            alertMsg.confirm("确定要删除自定义编码\"" + sel.name + "\"？", {
                okCall: function () {
                    ajaxLoad(ctxPath + "/spbm/deleteSpbm.do", {async: false, bm: sel.id}, function (json) {
                        if (json.ok) {
                            tree.removeNode(sel); //删除节点
                        } else {
                            alertMsg.error("非自定义编码不能删除！");
                            return;
                        }

                    });
                }
            });

        },
        genPinyin: function (src) {
            var that = $(src);
            var pyjx = toPinyinJX(that.toPinyin());
            $_("input[name='jm']").val(pyjx.substring(0, 10));
        },
        isUseYhlx: function (syyh) {
            var checked = $(syyh).attr("checked");

            //如果不使用优惠，则改变优惠类型、税率、含税标志、免税类型
            if (!checked) {
                $(syyh).attr("value", "N"); //设置值为N
                $_("#yhlx").attr("disabled", "disabled"); //优惠类型不可选
                $_("#rsl").removeAttr("disabled"); //税率可选
                $_("#hsbz").removeAttr("disabled"); //含税标志可变
                $_("#hsbz").removeAttr("checked"); //含税标志不选中

                $_("#mslx").val('');
                $_("#yhlx").val('');

                var sls = $.parseJSON($_("#yhzcsl").text());
                kysl = '';

                var has3 = false;
                var has0 = false;
                //每次变换优惠政策都要先将税率清空，再进行插入
                $_("#rsl").empty();
                if (sls) {
                    $.each(sls, function (i, n) {
                        $_("#rsl").append("<option value='" + n + "'>" + n + "</option>");
                        if (n == '3%') {
                            has3 = true;
                        }
                        if (n == '0%') {
                            has0 = true;
                        }
                        kysl = (kysl && kysl != '' ? kysl + "、" : kysl) + n.substring(0, n.length - 1) / 100;
                    });
                }

                if (!has3) {
                    $_("#rsl").append("<option value='3%'>3%</option>");
                    kysl = (kysl && kysl != '' ? kysl + "、" : kysl) + "0.03";
                }
                if (!has0) {
                    kysl = (kysl && kysl != '' ? kysl + "、" : kysl) + "0.00";
                    $_("#rsl").append("<option value='0%'>0%</option>");
                }
                $_("#rsl").prepend("<option value='' hidden='hidden'></option>");

                $_("#rsl").val('');
            } else { //如果使用优惠，则优惠类型可用，同时情况免税类型和优惠类型
                $(syyh).attr("value", "Y");
                $_("#yhlx").removeAttr("disabled");
                $_("#mslx").val('');
                $_("#yhlx").val('');
            }
        },
        changeSl: function (sl) {
            if ($(sl).val() != "0%") {
                $_("#mslx option[value='0']").attr("selected", "selected");
            } else {
                $_("#mslx option[value='3']").attr("selected", "selected");
            }

            var sls = $.parseJSON($_("#yhzcsl").text());

            var has3 = false;
            var has0 = false;
            if (!kysl) {
                $.each(sls, function (i, n) {
//					$_("#rsl").prepend("<option value='" + n + "'>" + n + "</option>") ;
                    if (n == '3%') {
                        has3 = true;
                    }
                    if (n == '0%') {
                        has0 = true;
                    }
                    kysl = (kysl && kysl != '' ? kysl + "、" : kysl) + n.substring(0, n.length - 1) / 100;
                });

                if (!has3) {
                    kysl = (kysl != '' ? kysl + "、" : kysl) + "0.03";
                }
                if (!has0) {
                    kysl = (kysl != '' ? kysl + "、" : kysl) + "0.00";
                }
            }
        },
        changeYhlx: function (yhlx) {

            var yhsl = tsgls[$(yhlx).val()];
            var sls = $.parseJSON($_("#yhzcsl").text()) || [];
            kysl = '';
            var has3 = false;
            var has0 = false;
            //每次变换优惠政策都要先将税率清空，再进行插入
            $_("#rsl").empty();
            $.each(sls, function (i, n) {
                $_("#rsl").append("<option value='" + n + "'>" + n + "</option>");
                if (n == '3%') {
                    has3 = true;
                }
                if (n == '0%') {
                    has0 = true;
                }
                kysl = (kysl && kysl != '' ? kysl + "、" : kysl) + n.substring(0, n.length - 1) / 100;
            });

            if (yhsl) {
                var yhsls = yhsl.split("、");
                $.each(yhsls, function (i, n) {
                    n = (n == '1.5%_5%' ? '1.5%' : n);
                    if (kysl.indexOf(n) == -1 && n != '3%' && n != '0%') {
                        kysl = (kysl != '' ? kysl + "、" : kysl) + n.substring(0, n.length - 1) / 100;
                        $_("#rsl").append("<option value='" + n + "'>" + n + "</option>");
                    }
                });
            }

            if (!has3) {
                $_("#rsl").append("<option value='3%'>3%</option>");
                kysl = (kysl != '' ? kysl + "、" : kysl) + "0.03";
            }
            if (!has0) {
                kysl = (kysl != '' ? kysl + "、" : kysl) + "0.00";
                $_("#rsl").append("<option value='0%'>0%</option>");
            }

            $_("#rsl").prepend("<option value='' hidden='hidden'></option>");

            if ($(yhlx).val() == '按5%简易征收减按1.5%计征') {
                $_("#rsl option[value='1.5%']").attr("selected", "selected");
                $_("#rsl").attr("disabled", "disabled");
                $_("#hsbz").attr("checked", "checked");
                $_("#hsbz").attr("value", "Y");
                $_("#hsbz").attr("disabled", "disabled");
            } else {
                $_("#rsl").val('');
                $_("#rsl").removeAttr("disabled");
                $_("#hsbz").removeAttr("disabled");
            }

        },
        changeHsbz: function (hsbz) {
            var checked = $(hsbz).attr("checked");
            if (!checked) {
                $(hsbz).attr("value", "N");
            } else {
                $(hsbz).attr("value", "Y");
            }
        },
        getBm: function (child) {
            var kybm = null;
            $.each(zbm, function (i, n) {
                if (child.indexOf(n) == -1) {
                    kybm = n;
                    return false;
                }
            });
            return kybm;
        },
        spbmexcelImport: function () {
            //判断是否能够添加节点
            if (!this.checkSel("add")) {
                return;
            }

            var sel = tree.getSelectedNodes()[0]; //获取当前选择添加节点的目标节点

            //编码不能超过40位
            if (sel.id.length == 39) {
                alertMsg.error("此节点不允许再增加子类！");
                return false;
            }

            var bm = sel.id;
            $.pdialog.open(ctxPath + "/spbm/toImport.do?bm=" + bm + "&zdy=" + sel.zdy, "import_spbm_dlg", "商品和服务税收分类编码——导入", {
                width: 500,
                height: 300
            });
        },
        resetSindex: function () {
            sIndex = 0;
        },
        realImport: function (json) {
            dialogAjaxDone(json);
            var cunt = 0;
            var sel = tree.getSelectedNodes()[0]; //获取当前选择添加节点的目标节点
            var lists = json.list;
            if (lists != undefined) {
                for (var i = 0; i < lists.length; i++) {
                    var dirinfo = lists[i].dirInfo;
                    var nownodes = tree.addNodes(sel, {
                        id: dirinfo.bm,
                        pId: dirinfo.pid,
                        isParent: false,
                        name: dirinfo.mc,
                        zdy: '1'
                    })[0];
                    var details = lists[i].detailList;

                    for (var a = 0; a < details.length; a++) {
                        var detail = details[a];
                        tree.addNodes(nownodes, {
                            id: detail.bm,
                            pId: detail.pid,
                            isParent: false,
                            name: detail.mc,
                            zdy: '1'
                        });
                        cunt++;
                    }

                }
                alertMsg.correct("成功导入" + cunt + "条商品编码");
            }
        },
        closeNowDialog: function () {
            
            $.pdialog.closeCurrent();
            alertMsg.correct("保存成功！");
        }

    };
}();
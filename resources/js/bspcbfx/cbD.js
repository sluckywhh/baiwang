var cbbspD = function () {
    var hybtn;// 货运按钮对象
    var slFour;
    var slSeven;
    var zpbtn;// 增专增普按钮对象
    return {
        initPage: function () {
            try {
                var result = signOCX.OperateDiskX("BSPFPCX", "test");

            } catch (e) {
                alertMsg.confirm("您没有安装税控服务器组件接口，将为您转到下载页面！", {
                    okCall: function () {
                        window.open(ctxPath + "/resources/download/kpkj.EXE");
                    }
                });
                disableButtons(_$("#bspcxhyId"));
                disableButtons(_$("#bspcbhzhyId"));
                disableButtons(_$("#bspcxzzId"));
                disableButtons(_$("#bspcbzzhzid"));
                return;
            }
            // 检查控件的版本号
            if (!checkSignOCXVersion()) {
                return;
            }
            var param = {
                async: false
            };
            ajaxLoad(ctxPath + "/Cbsjd/initBtn.do", param, function (json) {
                if ("0" == json.msg) {
                    return;
                }
                var lls;
                var llq;
                var llsTitle;
                var llqTitle;
                for (var i = 0; i < json.msg.length; i++) {
                    var fplx = json.msg[i].fplxdm;
                    var zt = json.msg[i].btnzt;
                    if ("004" == fplx || "007" == fplx) {
                        // lls= json.msg[i];
                        // var table= $("#zpTableId").find("table");
                        var trs = $("#zpTableId").find("tr");
                        trs.each(function (i, n) {
                            var tds = $(n).children();
                            var fpdmmc = tds.eq(0).text();
                            if ("发票代码" != fpdmmc) {
                                var fplxTitle = tds.eq(0).attr("title");
                                if (fplx == fplxTitle && fplxTitle != undefined
                                    && "0" == zt) {
                                    // $("#hyxxid").find("table").find(".buttonContent").find("button").attr("disabled","disabled");
                                    tds.find(".button").attr("class",
                                        "buttonDisabled");
                                    tds.find("button").attr("disabled",
                                        "disabled");
                                    // lls="";
                                    // llq="";
                                    return;
                                }
                                ;
                            }
                            ;
                        });
                    }
                    // else if("007"==fplx){
                    // llq= json.msg[i];
                    // }
                    else {
                        var table = $("#hyxxid").find("table");
                        var trs = table.find("tr");
                        trs.each(function (i, n) {
                            var tds = $(n).children();
                            var fpdmmc = tds.eq(0).text();
                            if ("发票代码" != fpdmmc) {
                                var fplxTitle = tds.eq(0).attr("title");
                                if ("004" == fplxTitle) {
                                    llsTitle = fplxTitle;
                                }
                                if ("007" == llqTitle) {
                                    llqTitle = fplxTitle;
                                }
                                if (fplx == fplxTitle && fplxTitle != undefined
                                    && "0" == zt) {
                                    // $("#hyxxid").find("table").find(".buttonContent").find("button").attr("disabled","disabled");
                                    tds.find(".button").attr("class",
                                        "buttonDisabled");
                                    tds.find("button").attr("disabled",
                                        "disabled");
                                    // lls="";
                                    // llq="";
                                    return;
                                }
                                ;
                            }
                            ;
                        });
                    }
                    ;
                }
                // if(lls!="" && llq!="" && lls!=undefined && llq!=undefined ){
                // var sbtnzt = lls.btnzt;
                // var qbtnzt = llq.btnzt;
                // if("0"==sbtnzt && "0"==qbtnzt){
                // lls="";
                // llq="";
                // // disableButtons(_$("#bspcxzzId"));
                // // disableButtons(_$("#bspcbzzhzid"));
                // disableButtons(_$("#bspcxzzId"));
                // disableButtons(_$("#bspcbzzhzid"));
                // return;
                // }
                // }else if(lls!="" && lls!=undefined && llqTitle==""){
                // var sbtnzt = lls.btnzt;
                // if("0"==sbtnzt){
                // lls="";
                // // disableButtons(_$("#bspcxzzId"));
                // // disableButtons(_$("#bspcbzzhzid"));
                // disableButtons(_$("#bspcxzzId"));
                // disableButtons(_$("#bspcbzzhzid"));
                // return;
                // };
                // }else if(llq!="" && llq!=undefined && llsTitle==""){
                // var qbtnzt = llq.btnzt;
                // if( "0"==qbtnzt){
                // llq="";
                // // disableButtons(_$("#bspcxzzId"));
                // // disableButtons(_$("#bspcbzzhzid"));
                // disableButtons(_$("#bspcxzzId"));
                // disableButtons(_$("#bspcbzzhzid"));
                // return;
                // }
                // }
            });

        },
        // 解锁抄报按钮
        cbfxBtnjs: function () {
            var param = {
                async: false
            };
            if (confirm("如果您手动解锁抄报按钮，需要重新抄报所有票种，否则会影响上次抄报返写！")) {
                ajaxLoad(ctxPath + "/Fxsj/jcCbFxBtn.do", param, function (json) {
                    var msg = json.msg;
                    if (msg >= 0) {
                        navTab.reload();
                        alert("解锁成功!");
                    }
                });
            } else {
                // alert("取消");
            }

        },
        // 004和007抄报分开
        cbbsp: function (bt) {
            // var table = _$(".pageContent .gridTbody table :first");
            var tds = $(bt).parents("tr:first").children();
            var pkl = document.getElementById("bspklId").value;
            if (pkl == "") {
                alertMsg.warn("请输入报税盘口令！");
                return;
            }
            var bspxxcxXML = "<?xml version=\"1.0\" encoding=\"gbk\"?>"
                + "<business comment=\"报税盘信息查询\" id=\"BSPXXCX\">" + "<body yylxdm=\"1\">" + "<input><bspkl>"
                + _$("#bspklId").val() + "</bspkl></input>" + "</body></business>";
            var result = signOCX.OperateDiskX("BSPXXCX", bspxxcxXML);
            var rxml = $($.parseXML(result));
            var retcode = rxml.find("returncode").text();
            var retmsg = rxml.find("returnmsg").text();
            if (retcode != "0") {
                alertMsg.error("操作失败:错误代码:" + retcode + ",错误信息:" + retmsg);
                return;
            }
            zpbtn = tds;
            var y;

            // var tds = $(n).children();
            var param = {
                fplxdm: tds.eq(0).attr("title"),
                kpjzrq: tds.eq(1).text(),
                bsqsrq: tds.eq(2).text(),
                bsjzrq: tds.eq(3).text(),
                zxbsrq: tds.eq(4).text(),
                dqsz: tds.eq(5).text(),
                bbh: rxml.find("bbh").text(),
                async: false
            };

            // 判断报税盘机器编号和开票机号与税控服务器是否相等
            ajaxLoad(ctxPath + "/Cbsjd/pdbspXML.do", param, function (json) {
                var index = json.requestXml.indexOf("</nsrsbh>") + 9;
                var bspcbXml = json.requestXml.substring(0, index)
                    + "<bspkl>"
                    + pkl
                    + "</bspkl>"
                    + json.requestXml.substring(index,
                        json.requestXml.length);

                var result = signOCX.OperateDiskX("BSPSJCB1", bspcbXml);
                var rxml = $($.parseXML(result));
                var returncode = rxml.find("returncode").text();
                var returnmsg = rxml.find("returnmsg").text();
                var length = returnmsg.length;
                var retunrnmsglength;
                if (length > 21) {
                    retunrnmsglength = returnmsg.substring(0, 16);
                } else {
                    retunrnmsglength = returnmsg.substring(0, 15);
                }
                if (returncode != 0 && "报税盘纳税人识别号与服务器不一致" == retunrnmsglength) {
                    alert("报税盘返回错误：" + returncode + "," + returnmsg);
                    y = false;
                } else if (returncode != 0
                    && "报税盘开票机编号与服务器不一致" == retunrnmsglength) {
                    alert("报税盘返回错误：" + returncode + "," + returnmsg);
                    y = false;
                }
                var bxml = $($.parseXML(bspcbXml));
                var skpbh = bxml.find("jqbh").text();

                // var
                // rbspscsj=cbbspD.initscbspsj(_$("#bspklId").val(),skpbh,param.fplxdm);
                // if(rbspscsj!=0){
                // y=false;
                // }

            });
            if (y == false) {
                return;
            }
            // 跟后台交互，获取tjxx（统计信息）
            ajaxLoad(ctxPath + "/Cbsjd/montageXML.do", param, function (json) {
                var index = json.requestXml.indexOf("</nsrsbh>") + 9;
                var bspcbXml = json.requestXml.substring(0, index)
                    + "<bspkl>"
                    + pkl
                    + "</bspkl>"
                    + json.requestXml.substring(index,
                        json.requestXml.length);
                cbbspD.cbmxforBsp(bspcbXml, param.fplxdm, param.bsqsrq,
                    param.bsjzrq, json.tjxx, param.dqsz);
            });

        },
        // 第一步报税盘点击报税盘抄报,004和007一起抄报的方法
        cbForBsp: function () {
            var table = _$(".pageContent .gridTbody table :first");
            var trs = table.find("tr");
            var pkl = document.getElementById("bspklId").value;
            if (pkl == "") {
                alertMsg.warn("请输入报税盘口令！");
                return;
            }
            var bspxxcxXML = "<?xml version=\"1.0\" encoding=\"gbk\"?>"
                + "<business comment=\"报税盘信息查询\" id=\"BSPXXCX\">" + "<body yylxdm=\"1\">" + "<input><bspkl>"
                + _$("#bspklId").val() + "</bspkl></input>" + "</body></business>";
            var result = signOCX.OperateDiskX("BSPXXCX", bspxxcxXML);
            var rxml = $($.parseXML(result));
            var retcode = rxml.find("returncode").text();
            var retmsg = rxml.find("returnmsg").text();
            if (retcode != "0") {
                alertMsg.error("操作失败:错误代码:" + retcode + ",错误信息:" + retmsg);
                return;
            }
            var y;
            trs
                .each(function (i, n) {
                    var tds = $(n).children();
                    var param = {
                        fplxdm: tds.eq(0).attr("title"),
                        kpjzrq: tds.eq(1).text(),
                        bsqsrq: tds.eq(2).text(),
                        bsjzrq: tds.eq(3).text(),
                        zxbsrq: tds.eq(4).text(),
                        dqsz: tds.eq(5).text(),
                        bbh: rxml.find("bbh").text(),
                        async: false
                    };

                    if (param.fplxdm == 004 || param.fplxdm == 007) {
                        if (y == false) {
                            return;
                        }
                        // 判断报税盘机器编号和开票机号与税控服务器是否相等
                        ajaxLoad(
                            ctxPath + "/Cbsjd/pdbspXML.do",
                            param,
                            function (json) {
                                var index = json.requestXml
                                        .indexOf("</nsrsbh>") + 9;
                                var bspcbXml = json.requestXml
                                        .substring(0, index)
                                    + "<bspkl>"
                                    + pkl
                                    + "</bspkl>"
                                    + json.requestXml.substring(
                                        index,
                                        json.requestXml.length);
                                var result = signOCX.OperateDiskX(
                                    "BSPSJCB1", bspcbXml);
                                var rxml = $($.parseXML(result));
                                var returncode = rxml
                                    .find("returncode").text();
                                var returnmsg = rxml.find("returnmsg")
                                    .text();
                                var length = returnmsg.length;
                                var retunrnmsglength;
                                if (length > 21) {
                                    retunrnmsglength = returnmsg
                                        .substring(0, 16);
                                } else {
                                    retunrnmsglength = returnmsg
                                        .substring(0, 15);
                                }
                                if (returncode != 0
                                    && "报税盘纳税人识别号与服务器不一致" == retunrnmsglength) {
                                    alert("报税盘返回错误：" + returncode + ","
                                        + returnmsg);
                                    y = false;
                                } else if (returncode != 0
                                    && "报税盘开票机编号与服务器不一致" == retunrnmsglength) {
                                    alert("报税盘返回错误：" + returncode + ","
                                        + returnmsg);
                                    y = false;
                                }
                            });
                        if (y == false) {
                            return;
                        }
                        // 跟后台交互，获取tjxx（统计信息）
                        ajaxLoad(
                            ctxPath + "/Cbsjd/montageXML.do",
                            param,
                            function (json) {
                                var index = json.requestXml
                                        .indexOf("</nsrsbh>") + 9;
                                var bspcbXml = json.requestXml
                                        .substring(0, index)
                                    + "<bspkl>"
                                    + pkl
                                    + "</bspkl>"
                                    + json.requestXml.substring(
                                        index,
                                        json.requestXml.length);
                                cbbspD.cbmxforBsp(bspcbXml,
                                    param.fplxdm, param.bsqsrq,
                                    param.bsjzrq, json.tjxx,
                                    param.dqsz);
                            });
                    }
                });

        },
        // 009,026抄报到报税盘
        hycb: function (bt) {
            var y;
            var pkl = document.getElementById("bspklId").value;
            if (pkl == "") {
                alertMsg.warn("请输入报税盘口令！");
                return;
            }
            var bspxxcxXML = "<?xml version=\"1.0\" encoding=\"gbk\"?>"
                + "<business comment=\"报税盘信息查询\" id=\"BSPXXCX\">" + "<body yylxdm=\"1\">" + "<input><bspkl>"
                + _$("#bspklId").val() + "</bspkl></input>" + "</body></business>";
            var result = signOCX.OperateDiskX("BSPXXCX", bspxxcxXML);
            var rxml = $($.parseXML(result));
            var retcode = rxml.find("returncode").text();
            var retmsg = rxml.find("returnmsg").text();
            if (retcode != "0") {
                alertMsg.error("操作失败:错误代码:" + retcode + ",错误信息:" + retmsg);
                return;
            }
            var tds = $(bt).parents("tr:first").children();
            hybtn = tds;
            var param = {
                bspkl: pkl,
                fplxdm: tds.eq(0).attr("title"),
                kpjzrq: tds.eq(1).text(),
                bsqsrq: tds.eq(2).text(),
                bsjzrq: tds.eq(3).text(),
                zxbsrq: tds.eq(4).text(),
                dqsz: tds.eq(5).text(),
                bbh: rxml.find("bbh").text(),
                async: false
            };
            // 判断报税盘机器编号和开票机号与税控服务器是否相等
            ajaxLoad(ctxPath + "/Cbsjd/pdbspXML.do", param, function (json) {
                var index = json.requestXml.indexOf("</nsrsbh>") + 9;
                var bspcbXml = json.requestXml.substring(0, index)
                    + "<bspkl>"
                    + pkl
                    + "</bspkl>"
                    + json.requestXml.substring(index,
                        json.requestXml.length);
                var result = signOCX.OperateDiskX("BSPSJCB1", bspcbXml);
                var rxml = $($.parseXML(result));
                var returncode = rxml.find("returncode").text();
                var returnmsg = rxml.find("returnmsg").text();
                var length = returnmsg.length;
                var retunrnmsglength;
                if (length > 21) {
                    retunrnmsglength = returnmsg.substring(0, 16);
                } else {
                    retunrnmsglength = returnmsg.substring(0, 15);
                }
                if (returncode != 0 && "报税盘纳税人识别号与服务器不一致" == retunrnmsglength) {
                    alert("报税盘返回错误：" + returncode + "," + returnmsg);
                    y = false;
                } else if (returncode != 0
                    && "报税盘开票机编号与服务器不一致" == retunrnmsglength) {
                    alert("报税盘返回错误：" + returncode + "," + returnmsg);
                    y = false;
                }
                var bxml = $($.parseXML(bspcbXml));
                var skpbh = bxml.find("jqbh").text();
                // var
                // rbspscsj=cbbspD.initscbspsj(_$("#bspklId").val(),skpbh,param.fplxdm);
                // if(rbspscsj!=0){
                // y=false;
                // }
            });
            if (y == false) {
                return;
            }
            // 拼装汇总报文
            ajaxLoad(ctxPath + "/Cbsjd/montageXML.do", param, function (json) {
                var index = json.requestXml.indexOf("</nsrsbh>") + 9;
                var bspcbXml = json.requestXml.substring(0, index)
                    + "<bspkl>"
                    + pkl
                    + "</bspkl>"
                    + json.requestXml.substring(index,
                        json.requestXml.length);
                cbbspD.cbmxforBsp(bspcbXml, param.fplxdm, param.bsqsrq,
                    param.bsjzrq, json.tjxx, param.dqsz);
            });
        },
        // 抄报明细到报税盘
        cbmxforBsp: function (args, fplxdm, bsqsrq, bsjzrq, tjxx, dqsz) {
            var kprq;
            var dayshu;
            // 计算出“报税起始日期”和“报税截止日期”
            dayshu = cbbspD.DateCompare(bsqsrq, bsjzrq);
            var bsqsrq1 = bsqsrq.replaceAll("-", "");
            var bsjzrq1 = bsjzrq.replaceAll("-", "");
            var dqsz1 = dqsz.replaceAll("-", "");
            // 报税盘数据抄报1，第一次跟报税盘交互
            var result = signOCX.OperateDiskX("BSPSJCB1", args);
            // 报税盘返回结果
            var rxml = $($.parseXML(result));
            var returncode = rxml.find("returncode").text();
            var returnmsg = rxml.find("returnmsg").text();
            //增加报税盘版本号
            var bspbbh = rxml.find("bspbbh").text();
            // 判断“报税截止日期”大于“当前时钟”
            if (parseInt(bsjzrq1) > parseInt(dqsz1)) {
                // 计算“起始日期”和“税控服务器当前时钟”的天数
                dayshu = cbbspD.DateCompare(bsqsrq, dqsz);
                // “税控服务器当前时钟减一天”，是因为税控服务器当天不抄报数据
                if (bspbbh.substr(0,2) == '20' || bspbbh.substr(0,2) == '10'||bspbbh.substr(0,2) == '30') {
                    dayshu = dayshu - 1;
                }
                bsjzrq = cbbspD.dayMinusOne(dqsz);
            }
            var sxh = 1;
            var result2;
            if (returncode == '0') {
                for (var i = 0; i <= dayshu; i++) {
                    // 开票日期累加
                    var repnewdt = cbbspD.dayAddOne(bsqsrq, i);
                    kprq = repnewdt.replaceAll("-", "");
                    var param = {
                        fplxdm: fplxdm,
                        kprq: kprq,
                        sxh: sxh,
                        bsjzrq: bsjzrq1,
                        bspbbh: bspbbh,
                        async: false
                    };
                    var bspCbmx;
                    var fpmx;
                    ajaxLoad(ctxPath + "/Cbsjd/mxsjcb.do", param,
                        function (json) {
                            bspCbmx = json.bspCbmx;
                            fpmx = json.fpmx;
                        });
                    if (fpmx != "") {
                        // 抄报明细，调用报税盘抄报明细第二步骤
                        var bspsjcb2Result = signOCX.OperateDiskX("BSPSJCB2",
                            bspCbmx);
                        var bspsjcb2rxml = $($.parseXML(bspsjcb2Result));
                        var bspsjcb2returncode = rxml.find("returncode").text();
                        var bspsjcb2returnmsg = rxml.find("returnmsg").text();
                        if (returncode != '0') {
                            alertMsg.error("报税盘抄报明细错误：" + bspsjcb2returncode
                                + bspsjcb2returnmsg);
                            break;
                        }
                        result2 = bspsjcb2Result;
                        sxh++;
                    }
                    // 如果全部没有明细，就把抄报汇总返回结果赋值给最后结果
                    if (result2 == null || result2 == "") {
                        result2 = result;
                    }

                }
                // 调用最后一步，存入数据库
                cbbspD.cbHyForBsp(result2, fplxdm, bsqsrq, bsjzrq, tjxx, dqsz);
            } else {
                alertMsg.error("报税盘错误信息：" + returncode + returnmsg);
            }
        },
        // 抄报数据最后结果，和后台交互存入数据库
        cbHyForBsp: function (result2, fplxdm, bsqsrq, bsjzrq, tjxx, dqsz) {
            if (result2 == null)
                return;
            var param = {
                resultFplxdm: fplxdm,
                bsqsrq: bsqsrq,
                bsjzrq: bsjzrq,
                tjxx: tjxx,
                dqsz: dqsz,
                resultbspXML: result2,
                async: false
            };
            ajaxLoad(ctxPath + "/Cbsjd/resultTjxx.do", param, function (json) {

            });
            // alert("result"+result);
            var rxml = $($.parseXML(result2));
            var returncode = rxml.find("returncode").text();
            // alert("returncoded"+returncode);
            var returnmsg = rxml.find("returnmsg").text();
            // alert("returnmsgd"+returnmsg);
            if (returncode == '0') {
                if ("004" == fplxdm) {
                    zpbtn.find("button").attr("disabled", "disabled");
                    zpbtn.find(".button").attr("class", "buttonDisabled");
                } else if ("007" == fplxdm) {
                    zpbtn.find("button").attr("disabled", "disabled");
                    zpbtn.find(".button").attr("class", "buttonDisabled");
                } else {
                    hybtn.find(".button").attr("class", "buttonDisabled");
                    hybtn.find("button").attr("disabled", "disabled");
                }

                // if("004"==fplxdm){
                // slFour=fplxdm;
                //
                // }else if("007"==fplxdm){
                // slSeven=fplxdm;
                // }else{
                // hybtn.find(".button").attr("class","buttonDisabled");
                // hybtn.find("button").attr("disabled","disabled");
                // }
                alert("抄报结果:发票类型" + fplxdm + returnmsg);
                // if(slFour!="" && slSeven!=""){
                // if("004"==slFour && "007"==slSeven){
                // slFour="";
                // slSeven="";
                // disableButtons(_$("#bspcxzzId"));
                // return;
                // }
                // }else if(slFour!=""){
                // if("004"==slFour ){
                // slFour="";
                // disableButtons(_$("#bspcxzzId"));
                // return;
                // }
                //
                // }else if(slSeven!=""){
                // if( "007"==slSeven){
                // slSeven="";
                // disableButtons(_$("#bspcxzzId"));
                // return;
                // }
                // }

            }

        },
        dayAddOne: function (mm, i) {
            var arr = mm.split("-");
            var newdt = new Date(Number(arr[0]), Number(arr[1]) - 1,
                Number(arr[2]) + i);
            var m = newdt.getMonth() + 1;
            if (m < 10) {
                m = "0" + m;
            }
            ;
            var d = newdt.getDate();
            if (d < 10) {
                d = "0" + d;
            }
            // repnewdt = newdt.getFullYear() + "-" + (newdt.getMonth()+1) + "-"
            // + newdt.getDate();
            repnewdt = newdt.getFullYear() + "-" + m + "-" + d;
            return repnewdt;
        },
        DateCompare: function (asStartDate, asEndDate) {
            var miStart = Date.parse(asStartDate.replace(/\-/g, '/'));
            var miEnd = Date.parse(asEndDate.replace(/\-/g, '/'));
            return (miEnd - miStart) / (1000 * 24 * 3600);
        },
        dayMinusOne: function (mm) {
            var arr = mm.split("-");
            var dn;
            if (Number(arr[2]) > 1) {
                dn = Number(arr[2]) - 1;
            } else {
                dn = Number(arr[2]);
            }
            var newdt = new Date(Number(arr[0]), Number(arr[1]) - 1, dn);
            var m = newdt.getMonth() + 1;
            if (m < 10) {
                m = "0" + m;
            }
            ;
            var d = newdt.getDate();
            if (d < 10) {
                d = "0" + d;
            }
            repnewdt = newdt.getFullYear() + "-" + m + "-" + d;
            return repnewdt;
        },
        // 报税盘只抄报汇总，增专增普发票004，007抄报汇总数据
        zzzpcbhz: function () {
            var table = _$(".pageContent .gridTbody table :first");
            var trs = table.find("tr");
            var pkl = document.getElementById("bspklId").value;
            if (pkl == "") {
                alertMsg.warn("请输入报税盘口令！");
                return;
            }
            var y;
            // 先判断004，007,数据库发票是否上传完整
            var scbzFour = false;
            var scbzSeven = false;
            trs
                .each(function (i, n) {
                    var tds = $(n).children();
                    var paramscbz = {
                        fplxdm: tds.eq(0).attr("title"),
                        bsqsrq: tds.eq(2).text(),
                        bsjzrq: tds.eq(3).text(),
                        async: false
                    };
                    // 查询数据库发票明细表发票是否上传完毕
                    if (paramscbz.fplxdm == 004 || paramscbz.fplxdm == 007) {
                        ajaxLoad(
                            ctxPath + "/Cbsjd/fpmxbscbzcx.do",
                            paramscbz,
                            function (json) {
                                var scbzSize = json.scbzSize;
                                var yqbzSize = json.yqbzSize;
                                if (0 < (scbzSize * 1)
                                    && 0 < (yqbzSize * 1)) {
                                    alert(paramscbz.fplxdm + "发票明细，还有"
                                        + scbzSize + "张未上传,"
                                        + yqbzSize + "张未验签成功。");
                                } else if (0 < (scbzSize * 1)) {
                                    alert(paramscbz.fplxdm
                                        + "发票明细，还有"
                                        + scbzSize
                                        + "张未上传，请确认该发票类型的发票明细全部成功上传税务机关才能抄报汇总数据。");
                                } else if (0 < (yqbzSize * 1)) {
                                    alert(paramscbz.fplxdm + "发票明细，还有"
                                        + yqbzSize + "张未验签成功。");
                                } else {
                                    if (paramscbz.fplxdm == 004) {
                                        scbzFour = true;
                                    }
                                    if (paramscbz.fplxdm == 007) {
                                        scbzSeven = true;
                                    }
                                }
                            });
                    }
                });
            // 004，007发票上传完整可以抄报汇总
            if (scbzFour == true && scbzSeven == true) {
                if (confirm("(抄报汇总数据)发票明细已成功上传税务机关。是否确认抄报汇总？")) {
                    trs
                        .each(function (i, n) {
                            var tds = $(n).children();
                            var param = {
                                fplxdm: tds.eq(0).attr("title"),
                                kpjzrq: tds.eq(1).text(),
                                bsqsrq: tds.eq(2).text(),
                                bsjzrq: tds.eq(3).text(),
                                zxbsrq: tds.eq(4).text(),
                                dqsz: tds.eq(5).text(),
                                async: false
                            };
                            if (param.fplxdm == 004 || param.fplxdm == 007) {
                                if (y == false) {
                                    return;
                                }
                                // 判断报税盘机器编号和开票机号与税控服务器是否相等
                                ajaxLoad(
                                    ctxPath + "/Cbsjd/pdbspXML.do",
                                    param,
                                    function (json) {
                                        var index = json.requestXml
                                                .indexOf("</nsrsbh>") + 9;
                                        var bspcbXml = json.requestXml
                                                .substring(0, index)
                                            + "<bspkl>"
                                            + pkl
                                            + "</bspkl>"
                                            + json.requestXml
                                                .substring(
                                                    index,
                                                    json.requestXml.length);
                                        var result = signOCX
                                            .OperateDiskX(
                                                "BSPSJCB1",
                                                bspcbXml);
                                        var rxml = $($.parseXML(result));
                                        var returncode = rxml.find(
                                            "returncode").text();
                                        var returnmsg = rxml.find(
                                            "returnmsg").text();
                                        var length = returnmsg.length;
                                        var retunrnmsglength;
                                        if (length > 21) {
                                            retunrnmsglength = returnmsg
                                                .substring(0, 16);
                                        } else {
                                            retunrnmsglength = returnmsg
                                                .substring(0, 15);
                                        }
                                        if (returncode != 0
                                            && "报税盘纳税人识别号与服务器不一致" == retunrnmsglength) {
                                            alert("报税盘返回错误："
                                                + returncode + ","
                                                + returnmsg);
                                            y = false;
                                        } else if (returncode != 0
                                            && "报税盘开票机编号与服务器不一致" == retunrnmsglength) {
                                            alert("报税盘返回错误："
                                                + returncode + ","
                                                + returnmsg);
                                            y = false;
                                        }
                                    });
                                if (y == false) {
                                    return;
                                }
                                ajaxLoad(
                                    ctxPath + "/Cbsjd/montageXML.do",
                                    param,
                                    function (json) {
                                        var index = json.requestXml
                                                .indexOf("</nsrsbh>") + 9;
                                        var bspcbXml = json.requestXml
                                                .substring(0, index)
                                            + "<bspkl>"
                                            + pkl
                                            + "</bspkl>"
                                            + json.requestXml
                                                .substring(
                                                    index,
                                                    json.requestXml.length);
                                        // 抄报汇总数据
                                        var result = signOCX
                                            .OperateDiskX(
                                                "BSPSJCB1",
                                                bspcbXml);
                                        cbbspD.bspcbhzresult(result,
                                            param.fplxdm,
                                            param.bsqsrq,
                                            param.bsjzrq,
                                            json.tjxx, param.dqsz);
                                    });
                            }
                        });
                }
            }
        },
        // 报税盘只抄报汇总，货运026，025，等其他发票抄报汇总数据
        hycbhz: function (bt) {
            var y;
            var pkl = document.getElementById("bspklId").value;
            if (pkl == "") {
                alertMsg.warn("请输入报税盘口令！");
                return;
            }
            var tds = $(bt).parents("tr:first").children();
            hybtn = tds;
            var paramscbz = {
                fplxdm: tds.eq(0).attr("title"),
                bsqsrq: tds.eq(2).text(),
                bsjzrq: tds.eq(3).text(),
                async: false
            };
            var scbz = false;
            ajaxLoad(ctxPath + "/Cbsjd/fpmxbscbzcx.do", paramscbz, function (json) {
                var scbzSize = json.scbzSize;
                var yqbzSize = json.yqbzSize;
                if (0 < (scbzSize * 1) && 0 < (yqbzSize * 1)) {
                    alert(paramscbz.fplxdm + "发票明细，还有" + scbzSize + "张未上传,"
                        + yqbzSize + "张未验签成功。");
                } else if (0 < (scbzSize * 1)) {
                    alert(paramscbz.fplxdm + "发票明细，还有" + scbzSize
                        + "张未上传，请确认该发票类型的发票明细全部成功上传税务机关才能抄报汇总数据。");
                } else if (0 < (yqbzSize * 1)) {
                    alert(paramscbz.fplxdm + "发票明细，还有" + yqbzSize + "张未验签成功。");
                } else {
                    scbz = true;
                }
            });
            if (scbz) {
                if (confirm("(抄报汇总数据)发票明细已成功上传税务机关。是否确认抄报汇总？")) {
                    var param = {
                        bspkl: pkl,
                        fplxdm: tds.eq(0).attr("title"),
                        kpjzrq: tds.eq(1).text(),
                        bsqsrq: tds.eq(2).text(),
                        bsjzrq: tds.eq(3).text(),
                        zxbsrq: tds.eq(4).text(),
                        dqsz: tds.eq(5).text(),
                        async: false
                    };
                    // 判断报税盘机器编号和开票机号与税控服务器是否相等
                    ajaxLoad(
                        ctxPath + "/Cbsjd/pdbspXML.do",
                        param,
                        function (json) {
                            var index = json.requestXml
                                    .indexOf("</nsrsbh>") + 9;
                            var bspcbXml = json.requestXml.substring(0,
                                    index)
                                + "<bspkl>"
                                + pkl
                                + "</bspkl>"
                                + json.requestXml.substring(index,
                                    json.requestXml.length);
                            var result = signOCX.OperateDiskX("BSPSJCB1",
                                bspcbXml);
                            var rxml = $($.parseXML(result));
                            var returncode = rxml.find("returncode").text();
                            var returnmsg = rxml.find("returnmsg").text();
                            var length = returnmsg.length;
                            var retunrnmsglength;
                            if (length > 21) {
                                retunrnmsglength = returnmsg.substring(0,
                                    16);
                            } else {
                                retunrnmsglength = returnmsg.substring(0,
                                    15);
                            }
                            if (returncode != 0
                                && "报税盘纳税人识别号与服务器不一致" == retunrnmsglength) {
                                alert("报税盘返回错误：" + returncode + ","
                                    + returnmsg);
                                y = false;
                            } else if (returncode != 0
                                && "报税盘开票机编号与服务器不一致" == retunrnmsglength) {
                                alert("报税盘返回错误：" + returncode + ","
                                    + returnmsg);
                                y = false;
                            }
                            var bxml = $($.parseXML(bspcbXml));
                            var skpbh = bxml.find("jqbh").text();

                            // var
                            // rbspscsj=cbbspD.initscbspsj(_$("#bspklId").val(),skpbh,param.fplxdm);
                            // if(rbspscsj!=0){
                            // y=false;
                            // }
                        });
                    if (y == false) {
                        return;
                    }
                    // 拼装汇总报文
                    ajaxLoad(ctxPath + "/Cbsjd/montageXML.do", param,
                        function (json) {
                            var index = json.requestXml
                                    .indexOf("</nsrsbh>") + 9;
                            var bspcbXml = json.requestXml.substring(0,
                                    index)
                                + "<bspkl>"
                                + pkl
                                + "</bspkl>"
                                + json.requestXml.substring(index,
                                    json.requestXml.length);
                            // 报税盘数据抄报1，第一次跟报税盘交互
                            var result = signOCX.OperateDiskX("BSPSJCB1",
                                bspcbXml);
                            cbbspD.bspcbhzresult(result, param.fplxdm,
                                param.bsqsrq, param.bsjzrq, json.tjxx,
                                param.dqsz);
                        });
                }

            }

        },
        // 汇总写入报税盘返回数据，并提交后台
        bspcbhzresult: function (bspcbXmlresult, fplxdm, bsqsrq, bsjzrq, tjxx,
                                 dqsz) {
            if (bspcbXmlresult == null)
                return;
            var param = {
                resultFplxdm: fplxdm,
                bsqsrq: bsqsrq,
                bsjzrq: bsjzrq,
                tjxx: tjxx,
                dqsz: dqsz,
                resultbspXML: bspcbXmlresult,
                async: false
            };
            ajaxLoad(ctxPath + "/Cbsjd/bspcbhzresultTjxx.do", param, function (json) {

            });
            // alert("result"+result);
            var rxml = $($.parseXML(bspcbXmlresult));
            var returncode = rxml.find("returncode").text();
            // alert("returncoded"+returncode);
            var returnmsg = rxml.find("returnmsg").text();
            // alert("returnmsgd"+returnmsg);
            if (returncode == '0') {
                if ("004" == fplxdm) {
                    // slFour=fplxdm;
                    zpbtn.find("button").attr("disabled", "disabled");
                    zpbtn.find(".button").attr("class", "buttonDisabled");

                } else if ("007" == fplxdm) {
                    // /slSeven=fplxdm;
                    zpbtn.find("button").attr("disabled", "disabled");
                    zpbtn.find(".button").attr("class", "buttonDisabled");
                } else {
                    hybtn.find(".button").attr("class", "buttonDisabled");
                    hybtn.find("button").attr("disabled", "disabled");
                }
                alert("抄报结果:发票类型" + fplxdm + returnmsg);
                // if(slFour!="" && slSeven!=""){
                // if("004"==slFour && "007"==slSeven){
                // slFour="";
                // slSeven="";
                // disableButtons(_$("#bspcxzzId"));
                // disableButtons(_$("#bspcbzzhzid"));
                // return;
                // }
                // }else if(slFour!=""){
                // if("004"==slFour ){
                // slFour="";
                // disableButtons(_$("#bspcxzzId"));
                // disableButtons(_$("#bspcbzzhzid"));
                // return;
                // }
                //
                // }else if(slSeven!=""){
                // if( "007"==slSeven){
                // slSeven="";
                // disableButtons(_$("#bspcxzzId"));
                // disableButtons(_$("#bspcbzzhzid"));
                // return;
                // }
                // }
            }
        },
        // 报税盘只抄报汇总，增专增普发票004，007分开抄报汇总数据
        zzzpcbhzfk: function (bt) {
            // var table = _$(".pageContent .gridTbody table :first");
            // var trs = table.find("tr");
            var pkl = document.getElementById("bspklId").value;
            if (pkl == "") {
                alertMsg.warn("请输入报税盘口令！");
                return;
            }
            var y;
            // 先判断004，007,数据库发票是否上传完整
            var scbzFour = false;
            var scbzSeven = false;
            var tds = $(bt).parents("tr:first").children();
            zpbtn = tds;
            // var tds = $(n).children();
            var paramscbz = {
                fplxdm: tds.eq(0).attr("title"),
                bsqsrq: tds.eq(2).text(),
                bsjzrq: tds.eq(3).text(),
                async: false
            };
            // 查询数据库发票明细表发票是否上传完毕
            ajaxLoad(ctxPath + "/Cbsjd/fpmxbscbzcx.do", paramscbz, function (json) {
                var scbzSize = json.scbzSize;
                var yqbzSize = json.yqbzSize;
                if (0 < (scbzSize * 1) && 0 < (yqbzSize * 1)) {
                    alert(paramscbz.fplxdm + "发票明细，还有" + scbzSize + "张未上传,"
                        + yqbzSize + "张未验签成功。");
                } else if (0 < (scbzSize * 1)) {
                    alert(paramscbz.fplxdm + "发票明细，还有" + scbzSize
                        + "张未上传，请确认该发票类型的发票明细全部成功上传税务机关才能抄报汇总数据。");
                } else if (0 < (yqbzSize * 1)) {
                    alert(paramscbz.fplxdm + "发票明细，还有" + yqbzSize + "张未验签成功。");
                } else {
                    if (paramscbz.fplxdm == 004) {
                        scbzFour = true;
                    }
                    if (paramscbz.fplxdm == 007) {
                        scbzSeven = true;
                    }
                }
            });

            // 004，007发票上传完整分开抄报汇总
            if (scbzFour == true || scbzSeven == true) {
                if (confirm("(抄报汇总数据)发票明细已成功上传税务机关。是否确认抄报汇总？")) {
                    var tds = $(bt).parents("tr:first").children();
                    var param = {
                        fplxdm: tds.eq(0).attr("title"),
                        kpjzrq: tds.eq(1).text(),
                        bsqsrq: tds.eq(2).text(),
                        bsjzrq: tds.eq(3).text(),
                        zxbsrq: tds.eq(4).text(),
                        dqsz: tds.eq(5).text(),
                        async: false
                    };
                    if (param.fplxdm == 004 || param.fplxdm == 007) {
                        if (y == false) {
                            return;
                        }
                        // 判断报税盘机器编号和开票机号与税控服务器是否相等
                        ajaxLoad(
                            ctxPath + "/Cbsjd/pdbspXML.do",
                            param,
                            function (json) {
                                var index = json.requestXml
                                        .indexOf("</nsrsbh>") + 9;
                                var bspcbXml = json.requestXml.substring(0,
                                        index)
                                    + "<bspkl>"
                                    + pkl
                                    + "</bspkl>"
                                    + json.requestXml.substring(index,
                                        json.requestXml.length);
                                var result = signOCX.OperateDiskX(
                                    "BSPSJCB1", bspcbXml);
                                var rxml = $($.parseXML(result));
                                var returncode = rxml.find("returncode")
                                    .text();
                                var returnmsg = rxml.find("returnmsg")
                                    .text();
                                var length = returnmsg.length;
                                var retunrnmsglength;
                                if (length > 21) {
                                    retunrnmsglength = returnmsg.substring(
                                        0, 16);
                                } else {
                                    retunrnmsglength = returnmsg.substring(
                                        0, 15);
                                }
                                if (returncode != 0
                                    && "报税盘纳税人识别号与服务器不一致" == retunrnmsglength) {
                                    alert("报税盘返回错误：" + returncode + ","
                                        + returnmsg);
                                    y = false;
                                } else if (returncode != 0
                                    && "报税盘开票机编号与服务器不一致" == retunrnmsglength) {
                                    alert("报税盘返回错误：" + returncode + ","
                                        + returnmsg);
                                    y = false;
                                }
                                var bxml = $($.parseXML(bspcbXml));
                                var skpbh = bxml.find("jqbh").text();

                                // var
                                // rbspscsj=cbbspD.initscbspsj(_$("#bspklId").val(),skpbh,param.fplxdm);
                                // if(rbspscsj!=0){
                                // y=false;
                                // }
                            });
                        if (y == false) {
                            return;
                        }
                        ajaxLoad(ctxPath + "/Cbsjd/montageXML.do", param,
                            function (json) {
                                var index = json.requestXml
                                        .indexOf("</nsrsbh>") + 9;
                                var bspcbXml = json.requestXml.substring(0,
                                        index)
                                    + "<bspkl>"
                                    + pkl
                                    + "</bspkl>"
                                    + json.requestXml.substring(index,
                                        json.requestXml.length);
                                // 抄报汇总数据
                                var result = signOCX.OperateDiskX(
                                    "BSPSJCB1", bspcbXml);
                                cbbspD.bspcbhzresult(result, param.fplxdm,
                                    param.bsqsrq, param.bsjzrq,
                                    json.tjxx, param.dqsz);
                            });
                    }

                }
            }
        },
        initscbspsj: function (bspkl, skpbh, fplxdm) {
            var sccbsjXML = "<?xml version=\"1.0\" encoding=\"gbk\"?>"
                + "<business comment=\"抄报数据删除\" id=\"CBSJSC\">"
                + "<body yylxdm=\"1\">" + "<input>" + "<bspkl>" + bspkl
                + "</bspkl>" + "<skpbh>" + skpbh + "</skpbh>" + "<fplxdm>"
                + fplxdm + "</fplxdm>" + "</input></body></business>";
            // 调用监控数据删除控件方法
            var result = signOCX.OperateDiskX("JKSJSC", sccbsjXML);
            if ("ID不支持" == result) {
                alert("报税盘删除监控数据信息失败:" + result + ",请检查报税盘控件是否是最新");
                navTab.reload();
                return;
            }
            // 把XML报文变成对象
            var rxml = $($.parseXML(result));
            var returncode = rxml.find("returncode").text();
            var returnmsg = rxml.find("returnmsg").text();
            if (returncode != '0') {
                alert(fplxdm + "报税盘删除抄报数据失败信息:错误代码：" + returncode + ",结果:"
                    + returnmsg);
            }
            return returncode;
        },
        cbsjsc: function () {
            var pkl = document.getElementById("bspklId").value;
            if (pkl == "") {
                alertMsg.warn("请输入报税盘口令！");
                return;
            }
            var result = false;
            var allFplxdm = "";
            ajaxLoad(ctxPath + "/Cbsjd/cbsjsc.do", function (json) {
                var fwskFpxlList = json.fwskFpxlList;
                var jqbh = json.jqbh;

                for (var i = 0; i < fwskFpxlList.length; i++) {
                    var fplxdm = fwskFpxlList[i]["fplxdm"];
                    var returncode = cbbspD.initscbspsj(pkl,
                        jqbh, fplxdm);
                    if (returncode == "0") {
                        allFplxdm += fplxdm + ",";
                        result = true;
                    }
                }
                if (result) {
                    alertMsg.correct(allFplxdm + '删除抄报数据成功');
                }

            });

        }
    };
}();

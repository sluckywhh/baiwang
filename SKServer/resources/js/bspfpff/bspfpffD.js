var bspffD = function () {
    var fpffjg = false;//判断发票是否分发完成
    return {
        //页面初始化调用initPageg该方法
        initPage: function () {
            try {
                var result = signOCX.OperateDiskX("BSPFPCX", "test");
            } catch (e) {
                alertMsg.confirm("您没有安装税控服务器组件接口，将为您转到下载页面！", {
                    okCall: function () {
                        window.open(ctxPath + "/resources/download/kpkj.EXE");
                    }
                });
                disableButtons(_$("#bspfpcxId"));
                return;
            }
            //检查版本号
            checkSignOCXVersion();
        },
        //报税盘查询
        readBsp: function () {
            var requestxml = _$("#requestXmlId").val();
            if (_$("#bspklId").val() == "") {
                alertMsg.warn("请输入报税盘口令！");
                _$('.gridTbody tr').remove();
                return;
            }
            if (_$("#f_fplxdmId").val() == "") {
                alertMsg.warn("请选择发票类型代码！");
                _$('.gridTbody tr').remove();
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
            var param = {
                fplxdm: _$("#f_fplxdmId").val(),
                ffresult: _$("#ffresultid").val(),
                bbh:rxml.find("bbh").text(),
                async: false
            }
            ajaxLoad(ctxPath + "/bspFpffD/requestXml.do", param, function (json) {
                _$("#ffresultid").val(json.ffresult);
                var index = json.requestXml.indexOf("</nsrsbh>") + 9;
                var bspcxXml = json.requestXml.substring(0, index) + "<bspkl>" + _$("#bspklId").val()
                    + "</bspkl>" + json.requestXml.substring(index, json.requestXml.length);
                var result = signOCX.OperateDiskX("BSPFPCX", bspcxXml);
                var rxml = $($.parseXML(result));
                var returncode = rxml.find("returncode").text();
                var returnmsg = rxml.find("returnmsg").text();

                if (returncode != '0') {
                    if (fpffjg == true && returncode == '09d106') {
                        alertMsg.correct("报税盘操作:报税盘发票分发完毕！");
                        _$('.gridTbody tr').remove();
                        fpffjg = false;
                        return;
                    }
                    _$('.gridTbody tr').remove();
                    _$("#responseXmlId").val(result);
                    alertMsg.warn("报税盘操作失败:" + returncode + returnmsg);
                    return;
                }
                _$("#responseXmlId").val(result);
                _$("form").submit();
            });

        },
        //报税盘分发，拼接报税盘分发报文
        fpff: function (a) {
            var tds = $(a).parents("tr:first").children();
            var param = {
                fplxdm: _$("#f_fplxdmId").val(),
                fpdm: tds.eq(0).text(),
                qshm: tds.eq(1).text(),
                zzhm: tds.eq(2).text(),
                fpfs: tds.eq(3).text(),
                lgrq: tds.eq(4).text(),
                fffs: tds.find("input:text").val(),
                ffresult: "true"
            }
            if (tds.find("input:text").val() == "") {
                alertMsg.warn("请输入发票分发份数！");
                return;
            }
            if (tds.find("input:text").val() == "0") {
                alertMsg.warn("发票分发份数必须大于0！");
                return;
            }
            var fpfs = tds.find("input:text").val();
            var fffs = param.fpfs;
            if (parseInt(fffs) < parseInt(fpfs)) {
                alertMsg.warn("分发份数不能大于现有发票份数！");
                return;
            }
            var tr = $(a).parent().parent();
            alertMsg.confirm("确认分发?", {
                okCall: function () {
                    ajaxLoad(ctxPath + "/bspFpffD/fpff.do", param, function (json) {
                        var index = json.fpffXml.indexOf("</nsrsbh>") + 9;
                        var bspfpffXml = json.fpffXml.substring(0, index) + "<bspkl>" + _$("#bspklId").val()
                            + "</bspkl>" + json.fpffXml.substring(index, json.fpffXml.length);
                        _$("#ffresultid").val(json.ffresult);
                        bspffD.ffBspResult(bspfpffXml);
                    });

                }
            });
        },
        //分发报文跟税控盘交互
        ffBspResult: function (fpffXmll) {
            var fpffXml = fpffXmll;
            var result = signOCX.OperateDiskX("BSPFPFF1", fpffXml);
            var param = {
                resultXml: result,
                fplxdm: _$("#f_fplxdmId").val()
            }
            _$("resultXmlId").val(result);
            ajaxLoad(ctxPath + "/bspFpffD/resultBspff.do", param, function (json) {
                if (0 == json.returncode) {
                    fpffjg = true;
                    alertMsg.correct(json.returnmsg);
                    _$("#ffresultid").val("true");
                    _$("#bspfpcxId").click();
                }

            });
        }

    }
}();
var bspfx = function () {
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
                disableButtons(_$("#bspfxzzId"));
                disableButtons(_$("#bsphyfx_Id"));
                return;
            }
            // 检查版本号
            checkSignOCXVersion();
        },
        taxDiscInformationQuery: function () {
            var bspxxcxXML = "<?xml version=\"1.0\" encoding=\"gbk\"?>"
                + "<business comment=\"报税盘信息查询\" id=\"BSPXXCX\">" + "<body yylxdm=\"1\">" + "<input><bspkl>"
                + document.getElementById("bspkl").value + "</bspkl></input>" + "</body></business>";
            var result = signOCX.OperateDiskX("BSPXXCX", bspxxcxXML);
            var rxml = $($.parseXML(result));
            var retcode = rxml.find("returncode").text();
            var retmsg = rxml.find("returnmsg").text();
            if (retcode != "0") {
                alertMsg.error("操作失败:错误代码:" + retcode + ",错误信息:" + retmsg);
                return;
            }
            return rxml;
        },
        fxForBsp: function () {
            var table = _$(".pageContent .gridTbody table :first");
            var trs = table.find("tr");
            var pkl = document.getElementById("bspkl").value;
            if (pkl == "") {
                alertMsg.warn("请输入报税盘口令！");
                return;
            }
            var taxDiscInformation=bspfx.taxDiscInformationQuery();
            trs.each(function (i, n) {
                var tds = $(n).children();
                var param = {
                    fplxdm: tds.eq(0).attr("title"),
                    kpjzrq: tds.eq(1).text(),
                    bsqsrq: tds.eq(2).text(),
                    bsjzrq: tds.eq(3).text(),
                    zxbsrq: tds.eq(4).text(),
                    bbh: taxDiscInformation.find("bbh").text(),
                    async: false
                }
                if (param.fplxdm == 004 || param.fplxdm == 007) {
                    //var success = false;
                    ajaxLoad(ctxPath + "/Fxsj/fwskSjCxXML.do", param, function (json) {
                        var index = json.requestXml.indexOf("<input>") + 7;
                        var fxXml = json.requestXml.substring(0, index) + "<bspkl>" + pkl
                            + "</bspkl>" + json.requestXml.substring(index, json.requestXml.length);
                        //success = bspfx.fxskfwq(fxXml,param.fplxdm);
                        bspfx.fxskfwq(fxXml, param.fplxdm);
                    });
                    //return success;
                }

            });
            navTab.reload();
        },
        hyfx: function (bt) {//026,009,005返写
            var pkl = document.getElementById("bspkl").value;
            if (pkl == "") {
                alertMsg.warn("请输入报税盘口令！");
                return;
            }
            var taxDiscInformation=bspfx.taxDiscInformationQuery();
            var tds = $(bt).parents("tr:first").children();
            var param = {
                //bspkl:_$("#bspklId").val(),
                fplxdm: tds.eq(0).attr("title"),
                bbh: taxDiscInformation.find("bbh").text()
            }
            ajaxLoad(ctxPath + "/Fxsj/hyfpSjCxXML.do", param, function (json) {
                var index = json.requestXml.indexOf("<input>") + 7;
                var fxXml = json.requestXml.substring(0, index) + "<bspkl>" + pkl
                    + "</bspkl>" + json.requestXml.substring(index, json.requestXml.length);
                bspfx.fxskfwq(fxXml, param.fplxdm);
            })
        },
        fxskfwq: function (requestXml) {
            var pkl = document.getElementById("bspkl").value;
            if (requestXml == null)return;
            var result = signOCX.OperateDiskX("JKSJCX", requestXml);
            var param = {
                xml: result,
                async: false
            };
            //var success = false;
            ajaxLoad(ctxPath + "/Fxsj/doGxjksj.do", param, function (json) {
                if ("0" != json.bspreturncode) {
                    //alertMsg.error("操作失败"+json.bspreturnmsg);
                    alert("操作失败" + json.bspreturnmsg);
                } else {
                    //*************删除监控数据***********
                    //拼接删除监控数据报文
                    var scjksjXML = "<?xml version=\"1.0\" encoding=\"gbk\"?>" +
                        "<business comment=\"监控数据删除\" id=\"JKSJSC\">"
                        + "<body yylxdm=\"1\">"
                        + "<input>"
                        + "<bspkl>" + pkl + "</bspkl>"
                        + "<skpbh>" + json.skpbh + "</skpbh>"
                        + "<fplxdm>" + json.fplxdm + "</fplxdm>"
                        + "</input></body></business>";
                    //调用监控数据删除控件方法
                    var result = signOCX.OperateDiskX("JKSJSC", scjksjXML);
                    if ("ID不支持" == result) {
                        alert("报税盘删除监控数据信息失败:" + result + ",请检查报税盘控件是否是最新");
                        navTab.reload();
                        return;
                    }
                    //把XML报文变成对象
                    var rxml = $($.parseXML(result));
                    var returncode = rxml.find("returncode").text();
                    var returnmsg = rxml.find("returnmsg").text();
                    if (returncode == '0') {
                        alertMsg.correct('更新监控数据成功');
                    } else {
                        alert("报税盘删除监控数据信息失败:错误代码：" + returncode + ",结果:" + returnmsg);
                    }
                    //success = true;

                }
            });
            //return success;
        }
    }
}();


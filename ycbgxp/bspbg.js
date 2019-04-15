/**
 * Created by pgh on 2018/1/3.
 */
var bspbg = function () {
    var bspbh, nsrsbh, bbh, qysj;
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
                disableButtons(_$("#bspfpcxBg"));
                return;
            }
            // 检查版本号
            checkSignOCXVersion();
        },
        //报税盘查询
        readBsp: function () {
            var bspkl = _$("#bspklId").val();
            if (bspkl == "") {
                alertMsg.warn("请输入报税盘口令！");
                return;
            }
            var bspxxcxXML = "<?xml version=\"1.0\" encoding=\"gbk\"?>"
                + "<business comment=\"报税盘信息查询\" id=\"BSPXXCX\">" + "<body yylxdm=\"1\">" + "<input><bspkl>"
                + bspkl + "</bspkl></input>" + "</body></business>";
            var result = signOCX.OperateDiskX("BSPXXCX", bspxxcxXML);
            if ("ID不支持" == result) {
                alertMsg.error("ID不支持，请检查报税盘控件是不是最新控件");
            } else {
                var rxml = $($.parseXML(result));
                var returncode = rxml.find("returncode").text();
                var returnmsg = rxml.find("returnmsg").text();
                if (returncode == "0") {
                    _$("#bspbh").val(rxml.find("bspbh").text());
                    _$("#nsrsbh").val(rxml.find("nsrsbh").text());
                    _$("#bbh").val(rxml.find("bbh").text());
                    nsrsbh = rxml.find("nsrsbh").text();
                    bspbh = rxml.find("bspbh").text();
                    bbh = rxml.find("bbh").text();
                    qysj = rxml.find("qysj").text();
                    _$("#bspbg_form").submit();
                } else {
                    alertMsg.warn("查询结果:代码:" + returncode + ",信息:" + returnmsg);
                }
            }
        },
        //更改报税盘
        updateBsp: function () {
            var bspkl = _$("#bspklId").val();
            var serverrand = _$("#serverrand").val();
            if (bspkl == "") {
                alertMsg.warn("请输入报税盘口令！");
                return;
            }
            var bspxxxgXML = "<?xml version=\"1.0\" encoding=\"gbk\"?>"
                + "<business comment=\"远程变更请求\" id=\"YCBGQQ\">" + "<body yylxdm=\"1\">" + "<input><nsrsbh>" + nsrsbh
                + "</nsrsbh><skpbh>" + bspbh + "</skpbh><skpkl>" + bspkl + "</skpkl><serverRand>" + serverrand + "</serverRand></input>" + "</body></business>";
            var result = signOCX.OperateDiskX("YCBGQQ", bspxxxgXML);
            if ("ID不支持" == result) {
                alertMsg.error("ID不支持，请检查报税盘控件是不是最新控件");
            } else {
                var rxml = $($.parseXML(result));
                var returncode = rxml.find("returncode").text();
                var returnmsg = rxml.find("returnmsg").text();
                if (returncode == "0") {
                    var clientRand = rxml.find("clientRand").text();
                    var RTCRand = rxml.find("RTCRand").text();
                    var clientAuthMw = rxml.find("clientAuthMw").text();
                    var param = {
                        clientRand: clientRand,
                        RTCRand: RTCRand,
                        clientAuthMw: clientAuthMw,
                        nsrsbh: nsrsbh,
                        bspbh: bspbh,
                        bbh: bbh,
                        serverrand: serverrand,
                        qysj: qysj
                    }
                    ajaxLoad(ctxPath + "/bspbg/updateBspxx.do", param, function (json) {
                        var bgxpmw = json;
                        var groups = json.pzhdxx;
                        var groupxml = "";
                        if (groups!="") {
                            var group=groups.group;
                            if (group instanceof HashMap) {
                                groupxml += "<group xh=\"" + (group.get("xh") == null ? "" : group.get("xh")) + "\"><fplx_dm>" + (group.get("fplx_dm") == null ? "" : group.get("fplx_dm")) + "</fplx_dm><fphdxx_mw>" + (group.get("fphdxx_mw") == null ? "" : group.get("fphdxx_mw"))
                                    + "</fphdxx_mw><RTCjkxx_mw>" + (group.get("RTCjkxx_mw") == null ? "" : group.get("RTCjkxx_mw")) + "</RTCjkxx_mw></group>";
                            } else {
                                for (var i = 0; i < groups.length; i++) {
                                    groupxml += "<group xh=\"" + (group.get("xh") == null ? "" : group.get("xh")) + "\"><fplx_dm>" + (group.get("fplx_dm") == null ? "" : group.get("fplx_dm")) + "</fplx_dm><fphdxx_mw>" + (group.get("fphdxx_mw") == null ? "" : group.get("fphdxx_mw"))
                                        + "</fphdxx_mw><RTCjkxx_mw>" + (group.get("RTCjkxx_mw") == null ? "" : group.get("RTCjkxx_mw")) + "</RTCjkxx_mw></group>";
                                }
                            }
                        }
                        var bspxxupXML = "<?xml version=\"1.0\" encoding=\"gbk\"?>"
                            + "<business comment=\"远程变更写盘\" id=\"YCBGXP\">" + "<body>" + "<output><sbbh>" + (bgxpmw.sbbh == null ? "" : bgxpmw.sbbh)
                            + "</sbbh><bglx>" + (bgxpmw.bglx == null ? "" : bgxpmw.bglx) + "</bglx><serverAuthMw>" + (bgxpmw.serverAuthMw == null ? "" : bgxpmw.serverAuthMw) + "</serverAuthMw><daxx_mw>" + (bgxpmw.daxx_mw == null ? "" : bgxpmw.daxx_mw)
                            + "</daxx_mw><pzhdxx>" + groupxml + "</pzhdxx></output>" + "</body></business>";
                        var Upresult = signOCX.OperateDiskX("YCBGXP", bspxxupXML);
                        if ("ID不支持" == Upresult) {
                            alertMsg.error("ID不支持，请检查报税盘控件是不是最新控件");
                        } else {
                            var uprxml = $($.parseXML(Upresult));
                            var upreturncode = uprxml.find("returncode").text();
                            var upreturnmsg = uprxml.find("returnmsg").text();
                            var upparam = {
                                bspbh: bspbh,
                                bbh: bbh,
                                upreturncode: upreturncode,
                                upreturnmsg: upreturnmsg
                            }
                            ajaxLoad(ctxPath + "/bspbg/upBspxxJg.do", upparam, function (upjgjson) {
                                if ("00" == upjgjson.returncode) {
                                    alertMsg.correct("报税盘变更成功！");
                                    _$("#field .gridScroller").empty();
                                } else {
                                    alertMsg.warn(upjgjson.returnmsg);
                                }
                            });
                        }
                    });
                } else {
                    alertMsg.warn(returnmsg);
                }
            }
        }
    }
}()

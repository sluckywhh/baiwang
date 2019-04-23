/**
 * Created by xjg on 2018/8/16.
 */
var fwpj = function () {
    return {
        initpage: function () {
            var yhlx = _$("#yhlx").val();
            if (yhlx == "0") {
                _$("#choiceJqbh").click(function () {
                    $.pdialog.open(ctxPath + "/servicepj/choiceJqbh.do?&targetType=dialog", "ycbgxp_choiceJqbh_dlg", "选择核心板", {
                        width: 850,
                        height: 450
                    });
                })
            } else {
                ajaxLoad(ctxPath + "/servicepj/check.do", {async: false}, function (json) {
                    _$("#jqbh").val(json.jqbh);
                });

            }
            disableButtons(_$("#syncMyself"));
            disableButtons(_$("#syncAll"));
        },
        pjcg : function (json) {
            if(json.statusCode=="200") {
                var message2 = json.message;
                var message3 = json.scMessage;
                if (message2 != null && message2 != "" && message2 != undefined) {
                    if (message3 != null && message3 != "" && message3 != undefined) {
                        alertMsg.correct(message2+","+message3);
                    }else {
                        alertMsg.correct(message2);
                    }
                    disableButtons(_$("#choiceJqbh"));
                    disableButtons(_$("#evaluation"));
                    _$("#lxr").attr("disabled","disabled");
                    _$("#lxdh").attr("disabled","disabled");
                    _$("#opinion").attr("disabled","disabled");
                    enableButtons(_$("#syncMyself"));
                    enableButtons(_$("#syncAll"));
                }
                /*if (message3 != null && message3 != "" && message3 != undefined) {
                    alertMsg.correct(message3);
                }*/
            }
        },
        syncfwpj: function (tbAll) {
          if(tbAll ==1){
              if(!confirm("同步所有评价信息,将不会更新以往季度的评价信息,点击确定继续")){
                  return false;
              }
              ajaxLoad(ctxPath + "/servicepj/syncFwpj.do?tball="+'TBALL',  function (json) {
                  if (json.statusCode == DWZ.statusCode.ok) {
                      alertMsg.correct(json.message);
                      disableButtons(_$("#syncMyself"));
                      disableButtons(_$("#syncAll"));
                  }
              });
          }else {
              ajaxLoad(ctxPath + "/servicepj/syncFwpj.do", function (json) {
                  if (json.statusCode == DWZ.statusCode.ok) {
                      alertMsg.correct(json.message);
                      disableButtons(_$("#syncMyself"));
                  }
              });
          }
        },
        setJqbh: function (tr) {
            var jqbhDiv = $(tr).find("td:eq(0) div");
            var jqbh = jqbhDiv.text();
            _$("#jqbh_fwpj").val(jqbh);
            $.pdialog.closeCurrent();
        },
        setNsrshb: function (tr) {
            var nsrDiv = $(tr).find("td:eq(1) div");
            var nsrshb = nsrDiv.text();
            _$("#nsrsbh_fwpj").val(nsrshb);
            $.pdialog.closeCurrent();
        },
        checkservicepj: function() {
            var lxr = _$("#lxr").val();
            var lxdh = _$("#lxdh").val();
            var ztpj =  _$('input[name="activity"]:checked ').val();
            var opinion = _$("#opinion").val();
           /* if (lxr == "") {
                alertMsg.error("请填写联系人!")
            }
            //电话验证
            var mobile = /^1[3|5|8]\d{9}$/, phone = /^0\d{2,3}-?\d{7,8}$/;
            //联系人验证
            var lxrgz = /^[\u4E00-\u9FA5]{1,5}$/;
            var jylxr = lxrgz.test(lxr);
            var jydh = mobile.test(lxdh);

            if (!jylxr) {
                alertMsg.error("联系人仅支持中文字符!");
                return false;
            }
            if (lxdh == "") {
                alertMsg.error("请填写联系电话!");
                return false;
            }
            if (!jydh) {
                alertMsg.error("联系电话格式不正确!");
                return false;
            }*/
            if (ztpj == undefined) {
                alertMsg.error("请对税控服务总体评价做出选择!");
                return false;
            }
           if (ztpj == "1" && opinion == "") {
                var yj = _$("#opinion")[0];
                alertMsg.error("请提出宝贵的意见!");
                reFocus(yj);
                return false;
            }
            if (opinion.length > 199) {
                alertMsg.error("您的意见请保持在200字以内!");
                return false;
            }
            _$("#yj").val(opinion);
            return true;
        }

    }
}();
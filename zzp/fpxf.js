var fpxf_all = function () {
    return {
        init: function () {
             //_$("#shouldhide").hide();
        },
        xfcg: function () {
            var len = _$(".fpxf td[xf='1']").length;
            if (len) {
                alertMsg.info("成功修复" + len + "张发票");
            }
        },
        cxfplx: function () {
            var _this = this;

            var kpd = _$("#kpddm").val();
            if(kpd=="-1"){
                _$("[id$=allFplx]").remove();
                return ;
            }
            var param = {
                kpd: kpd
            }
            // ajaxLoad(ctxPath+"/zzp/cxfplx.do",param);
            ajaxLoad(ctxPath + "/zzp/cxfplx.do", param, function (json) {
                var str = '';
                var res = '';
                var lable = '';
                var fplxdmsAll = json.fplxdmsAll;
                var selectFplxdm = _$("#fplxdmToXf").val();
                //清空发票类型下拉框
                _$("[id$=allFplx]").remove();
                //给发票类型下拉框追加一个默认的下拉框样式
               // var td = _$("#selectTable > tbody tr ").eq(1).find("td").eq(3);
                var td = _$("#fplxtd");
                td.append("<select id='allFplx' name='fplxdm'></select>")
                _$("#allFplx").append("<option value='-1' >" + "请选择" + "</option>");
                //追加option
                for (var i = 0; i < fplxdmsAll.length; i++) {
                    for(var prop in fplxdmsAll[i]){
                        if(fplxdmsAll[i].hasOwnProperty(prop)){
                            str += '<option value="' + prop + '">' + fplxdmsAll[i][prop] + '</option>';
                        }
                    }
                }
                _$("#allFplx").append(str);
                _$("#allFplx").combox();
            })
        },
        fpxf: function () {
            var isCheckedfplx = '';
            var isCheckedkpd = '';
            var xffs = _$("#fpxffs").val();
            var yhlx = _$("#yhlx").val();
            //日期&&管理员
            if (xffs != "1" && yhlx == "0") {
                isCheckedkpd = _$("#kpddm").val();
                isCheckedfplx = _$("#allFplx").val();
            }
            //代码号码&&管理员
            if (xffs == "1" && yhlx == "0") {
                isCheckedkpd = _$("#kpddm").val();
                isCheckedfplx = _$("#allFplx").val();
            }
            //日期&&操作员
            if (xffs != "1" && yhlx == "1") {
                isCheckedfplx = _$("#fplx2").val();
            }
            //代码号码&&操作员
            if(xffs=="1" && yhlx=="1"){
                isCheckedfplx = _$("#fplx3").val();
            }
            //管理员状态 默认kpd为空 value= -1     操作员默认kpd value=""
            if(isCheckedkpd=="-1"){
                alertMsg.warn("请选择开票终端!");
                return;
            }
            if (typeof isCheckedfplx == "undefined" || isCheckedfplx==""||isCheckedfplx=="-1") {
                alertMsg.warn("请选择要修复的发票类型！");
                return;
            }
                _$('form:first').submit();
        }
    }
}();
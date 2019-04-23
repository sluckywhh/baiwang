var CreatedOKLodop7766 = null, CLodopIsLocal;

//====判断是否需要 Web打印服务CLodop:===
//===(不支持插件的浏览器版本需要用它)===
function needCLodop() {
    try {
        var ua = navigator.userAgent;
        if (ua.match(/Windows\sPhone/i))
            return true;
        if (ua.match(/iPhone|iPod|iPad/i))
            return true;
        if (ua.match(/Android/i))
            return true;
        if (ua.match(/Edge\D?\d+/i))
            return true;

        var verTrident = ua.match(/Trident\D?\d+/i);
        var verIE = ua.match(/MSIE\D?\d+/i);
        var verOPR = ua.match(/OPR\D?\d+/i);
        var verFF = ua.match(/Firefox\D?\d+/i);
        var x64 = ua.match(/x64/i);
        if ((!verTrident) && (!verIE) && (x64))
            return true;
        else if (verFF) {
            verFF = verFF[0].match(/\d+/);
            if ((verFF[0] >= 41) || (x64))
                return true;
        } else if (verOPR) {
            verOPR = verOPR[0].match(/\d+/);
            if (verOPR[0] >= 32)
                return true;
        } else if ((!verTrident) && (!verIE)) {
            var verChrome = ua.match(/Chrome\D?\d+/i);
            if (verChrome) {
                verChrome = verChrome[0].match(/\d+/);
                if (verChrome[0] >= 41)
                    return true;
            }
        }
        return false;
    } catch (err) {
        return true;
    }
}

//====页面引用CLodop云打印必须的JS文件,用双端口(8000和18000）避免其中某个被占用：====
if (needCLodop()) {
    var src1 = "http://localhost:8000/CLodopfuncs.js?priority=1";
    var src2 = "http://localhost:18000/CLodopfuncs.js?priority=0";

    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    var oscript = document.createElement("script");
    oscript.src = src1;
    head.insertBefore(oscript, head.firstChild);
    oscript = document.createElement("script");
    oscript.src = src2;
    head.insertBefore(oscript, head.firstChild);
    CLodopIsLocal = !!((src1 + src2).match(/\/\/localho|\/\/127.0.0./i));
}

//====获取LODOP对象的主过程：====
function getLodop(oOBJECT, oEMBED) {
    var strHtmInstall = "<div style='position:absolute;z-index:109999;top:30%;width:100%;padding:30px 0;text-align:center;background:#393D49'><font color='#fff'>打印控件未安装!点击这里<a style='color:red' href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font></div>";
    var strHtmUpdate = "<div style='position:absolute;z-index:99999;top:30%;width:100%;padding:30px 0;text-align:center;background:#393D49'><font color='#fff'>打印控件需要升级!点击这里<a style='color:red' href='install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font></div>";
    var strHtm64_Install = "<div style='position:absolute;z-index:99999;top:30%;width:100%;padding:30px 0;text-align:center;background:#393D49'><font color='#fff'>打印控件未安装!点击这里<a style='color:red' href='install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font></div>";
    var strHtm64_Update = "<div style='position:absolute;z-index:99999;top:30%;width:100%;padding:30px 0;text-align:center;background:#393D49'><font color='#fff'>打印控件需要升级!点击这里<a style='color:red' href='install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font></div>";
    var strHtmFireFox = "<div style='position:absolute;z-index:99999;top:30%;width:100%;padding:30px 0;text-align:center;background:#393D49'><font color='#fff'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font></div>";
    var strHtmChrome = "<div style='position:absolute;z-index:99999;top:30%;width:100%;padding:30px 0;text-align:center;background:#393D49'><font color='#fff'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font></div>";
    var strCLodopInstall_1 = "<div style='position:absolute;z-index:99999;top:30%;width:100%;padding:30px 0;text-align:center;background:#393D49'><font color='#fff'>Web打印服务CLodop未安装启动，点击这里<a style='color:red' href='CLodop_Setup_for_Win32NT.exe' target='_self'>下载执行安装</a>";
    var strCLodopInstall_2 = "<br>（若此前已安装过，可<a style='color:red' href='CLodop.protocol:setup' target='_self'>点这里直接再次启动</a>）";
    var strCLodopInstall_3 = "，成功后请刷新本页面。</font></div>";
    var strCLodopUpdate = "<div style='position:absolute;z-index:99999;top:30%;width:100%;padding:30px 0;text-align:center;background:#393D49'><font color='#fff'>Web打印服务CLodop需升级!点击这里<a style='color:red' href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行升级</a>,升级后请刷新页面。</font></div>";
    var LODOP;
    try {
        var ua = navigator.userAgent;
        var isIE = !!(ua.match(/MSIE/i)) || !!(ua.match(/Trident/i));
        if (needCLodop()) {
            try {
                LODOP = getCLodop();
            } catch (err) { }
            if (!LODOP && document.readyState !== "complete") {
                alert("网页还没下载完毕，请稍等一下再操作.");
                return;
            }
            if (!LODOP) {
                document.body.innerHTML = strCLodopInstall_1 + (CLodopIsLocal ? strCLodopInstall_2 : "") + strCLodopInstall_3 + document.body.innerHTML;
                return;
            } else {
                if (CLODOP.CVERSION < "3.0.7.5") {
                    document.body.innerHTML = strCLodopUpdate + document.body.innerHTML;
                }
                if (oEMBED && oEMBED.parentNode)
                    oEMBED.parentNode.removeChild(oEMBED);
                if (oOBJECT && oOBJECT.parentNode)
                    oOBJECT.parentNode.removeChild(oOBJECT);
            }
        } else {
            var is64IE = isIE && !!(ua.match(/x64/i));
            //=====如果页面有Lodop就直接使用，没有则新建:==========
            if (oOBJECT || oEMBED) {
                if (isIE)
                    LODOP = oOBJECT;
                else
                    LODOP = oEMBED;
            } else if (!CreatedOKLodop7766) {
                LODOP = document.createElement("object");
                LODOP.setAttribute("width", 0);
                LODOP.setAttribute("height", 0);
                LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE)
                    LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                else
                    LODOP.setAttribute("type", "application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodop7766 = LODOP;
            } else
                LODOP = CreatedOKLodop7766;
            //=====Lodop插件未安装时提示下载地址:==========
            if ((!LODOP) || (!LODOP.VERSION)) {
                if (ua.indexOf('Chrome') >= 0)
                    document.body.innerHTML = strHtmChrome + document.body.innerHTML;
                if (ua.indexOf('Firefox') >= 0)
                    document.body.innerHTML = strHtmFireFox + document.body.innerHTML;
                document.body.innerHTML = (is64IE ? strHtm64_Install : strHtmInstall) + document.body.innerHTML;
                return LODOP;
            }
        }
        if (LODOP.VERSION < "6.2.2.6") {
            if (!needCLodop())
                document.body.innerHTML = (is64IE ? strHtm64_Update : strHtmUpdate) + document.body.innerHTML;
            return LODOP;
        }
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):==



        //=======================================================
        return LODOP;
    } catch (err) {
        alert("getLodop出错:" + err);
    }
}

var LODOP; //声明为全局变量
/**
 * 机动车业务委托书--打印
 * 
 */

function printMotorVehicleBusinessProxy(t_proxy, t_name_yw, t_name_hm, t_name_hp, t_vin, t_addressee, t_addressee_mobile, t_addressee_address) {

    if (t_addressee_mobile) {
        var t_addressee_mobile = t_addressee_mobile.split("");

        var tt0 = t_addressee_mobile[0] ? t_addressee_mobile[0] : "&nbsp;";
        var tt1 = t_addressee_mobile[1] ? t_addressee_mobile[1] : "&nbsp;";
        var tt2 = t_addressee_mobile[2] ? t_addressee_mobile[2] : "&nbsp;";
        var tt3 = t_addressee_mobile[3] ? t_addressee_mobile[3] : "&nbsp;";
        var tt4 = t_addressee_mobile[4] ? t_addressee_mobile[4] : "&nbsp;";
        var tt5 = t_addressee_mobile[5] ? t_addressee_mobile[5] : "&nbsp;";
        var tt6 = t_addressee_mobile[6] ? t_addressee_mobile[6] : "&nbsp;";
        var tt7 = t_addressee_mobile[7] ? t_addressee_mobile[7] : "&nbsp;";
        var tt8 = t_addressee_mobile[8] ? t_addressee_mobile[8] : "&nbsp;";
        var tt9 = t_addressee_mobile[9] ? t_addressee_mobile[9] : "&nbsp;";
        var tt10 = t_addressee_mobile[10] ? t_addressee_mobile[10] : "&nbsp;";

    } else {
        var tt0 = "&nbsp;";
        var tt1 = "&nbsp;";
        var tt2 = "&nbsp;";
        var tt3 = "&nbsp;";
        var tt4 = "&nbsp;";
        var tt5 = "&nbsp;";
        var tt6 = "&nbsp;";
        var tt7 = "&nbsp;";
        var tt8 = "&nbsp;";
        var tt9 = "&nbsp;";
        var tt10 = "&nbsp;";
    }
    var t_addressee = t_addressee ? t_addressee : "";
    var t_addressee_address = t_addressee_address ? t_addressee_address : "";

    LODOP = getLodop();
    LODOP.PRINT_INIT("机动车业务委托书");

    LODOP.ADD_PRINT_TEXT(50, 0, 280, 50, "机动车业务委托书");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 24);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    LODOP.SET_PRINT_STYLEA(0, "Horient", 2);

    var page1Html = '<style>td{padding:4px}</style><table border="1" style="width: 100%;border-collapse: collapse;table-layout:fixed;">' +
        '<tr>' +
        '<td rowspan="7" colspan="3" style="width:60px;height:210px;text-align:center"><strong>委<br>托<br>业<br>务<br>事<br>项<br>*</strong></td>' +
        '<td colspan="24" style="border-bottom: none;">东莞市公安局交通警察支队车辆管理所:</td>' +
        '</tr>' +
        '<tr style="font-size:16px;">' +
        '<td colspan="24" style="border-bottom: none;border-top: none;text-align: center">兹委托<span style="padding:0 2cm;border-bottom: 1px solid #000;">' + t_proxy + '</span>办理以下机动车</td></tr><tr style="font-size:16px;"><td colspan="24" style="border-bottom: none;border-top: none;"><span style="padding:0 2cm;border-bottom: 1px solid #000;">' + t_name_yw + '</span>业务，具体如下:</td></tr><tr style="font-size:16px;"><td colspan="7" style="text-align:right;">号牌号码:&nbsp;&nbsp;</td>' +
        '<td colspan="17">&nbsp;&nbsp;' + t_name_hm + '</td>' +
        '</tr>' +
        '<tr style="font-size:16px;">' +
        '<td colspan="7" style="text-align:right;">号牌种类:&nbsp;&nbsp;</td><td colspan="17">&nbsp;&nbsp;' + t_name_hp + '</td>' +
        '</tr>' +
        '<tr style="font-size:16px;">' +
        '<td colspan="7" style="text-align:right;">车辆识别代码:&nbsp;&nbsp;</td><td colspan="17">&nbsp;&nbsp;' + t_vin + '</td></tr><tr style="font-size:16px;"><td colspan="7" style="text-align:right;">委托书有效期限:&nbsp;&nbsp;</td><td colspan="17">&nbsp;&nbsp;自签署之日起<span	style="padding:0 0.8cm;border-bottom: 1px solid #000;">60</span>日内有效</td>' +
        '</tr>' +
        '<tr style="font-size:16px;">' +
        '<td rowspan="3" style="width:20px;height:180px;text-align:center;border-right:none">*</td>' +
        '<td rowspan="3" style="font-size:12px;width:20px;height:180px;text-align:center;border-right:none;border-left:none">机动车号牌邮寄领取申请表</td>' +
        '<td rowspan="3" style="font-size:6px;width:20px;height:180px;text-align:center;border-left:none">机<br>动<br>车<br>注<br>册<br>转<br>移<br>转<br>入<br>补<br>换<br>号<br>牌<br>业<br>务<br>必<br>填<br>*</td>' +
        '<td colspan="10" style="width:200px;height:50px;">收件人:' + t_addressee + '</td>' +
        '<td colspan="3" style="width:60px;">手机号码*</td>' +
        '<td style="text-align:center;">' + tt0 + '</td>' +
        '<td style="text-align:center;">' + tt1 + '</td>' +
        '<td style="text-align:center;">' + tt2 + '</td>' +
        '<td style="text-align:center;">' + tt3 + '</td>' +
        '<td style="text-align:center;">' + tt4 + '</td>' +
        '<td style="text-align:center;">' + tt5 + '</td>' +
        '<td style="text-align:center;">' + tt6 + '</td>' +
        '<td style="text-align:center;">' + tt7 + '</td>' +
        '<td style="text-align:center;">' + tt8 + '</td>' +
        '<td style="text-align:center;">' + tt9 + '</td>' +
        '<td style="text-align:center;">' + tt10 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td colspan="2" style="width:40px;text-align:center">收件<br>地址</td>' +
        '<td colspan="22" style="text-align:center;height:72px;">' + t_addressee_address + '</td></tr><tr><td colspan="24" style="font-size: 14px;"><div>说明：</div><div style="text-indent:2em"><strong>1、邮政速递将在3至5个工作日内将号牌直接寄递到车主，并在广东省内提供免费固封服务。</strong></div><div style="text-indent:2em">2、邮寄费用：收件人签收支付，广东省内（含东莞市）：35元/件；省外：45元/件。</div>	<div style="text-indent:2em"><strong>3、凡是填写了有效邮寄信息将视为接受以上条款并默认选择“邮政寄递领牌”方式领取号牌。</strong></div></td></tr><tr><td colspan="3" style="text-align:center;"><strong> 注<br>意<br>事<br>项<br>*</strong>' +
        '</td>' +
        '<td colspan="24" style="font-size: 12px;letter-spacing: 1px;"><div style="line-height:1.6;text-indent:2em"><strong>1、机动车登记行政事业收费由车管所收取，常见业务收费标准为：a：注册登记：机动车号牌100元，行驶证10元，登记证书10元，临时号牌5元/张；b：市内转移登记：机动车号牌100元，行驶证10元，临时号牌5元/张；c：变更登记：行驶证10元；d：迁出：临时号牌5元/张；e：抵押/解除抵押登记：免费。f：核发临时号牌：5元/张。（临时号牌客车核发2张，货车核发1张）</strong></div><div style="line-height:1.6;text-indent:2em"><strong>2、除行政事业性收费外，公安机关不收取任何费用。</strong></div>	<div style="line-height:1.6;text-indent:2em"><strong>3、任何名目的“包牌费”“上牌费”等均与公安机关无关，属于企业市场行为，车主有权拒绝接受。对于企业单方强制收费的，车主有权向市消费者协会进行投诉。</strong></div><div style="line-height:1.6;text-indent:2em"><strong>4、机动车号牌是否寄递由车主自愿选择。</strong>如果不选择邮政寄递的，请车主本人在业务办结15个工作日后（省牌厂制牌后集中送到车管所需要进行交接登记，入库，出库等工作，约14个工作日）<strong>持身份证明、行驶证以及临时号牌原件</strong>回办证机关领取，<strong>不得代领</strong>。领取地址：广东省东莞市寮步镇寮城中路2号路东莞车管所。	</div>	<div style="line-height:1.6;text-indent:2em">5、本委托书由受托方提交，受托方保证仅在受托范围内办理业务。</div>	<div style="line-height:1.6;text-indent:2em">6、委托方、受托方的身份证明等复印件作为本委托书的附件附后。</div>	<div style="line-height:1.6;text-indent:2em">7、申请补领机动车登记证书<strong>不得代办</strong>。</div>	<div style="line-height:1.6;text-indent:2em">8、委托书的填写应准确完整，不得涂改，否则无效。</div><div style="line-height:1.6;text-indent:2em">9、签名或盖公章要求：委（受）托方属于个人的签名，属于单位的盖公章，如受托方属于单位的还需经办人签名。</div></td>' +
        '</tr>' +
        '<tr><td colspan="27" style="font-size: 16px;text-indent: 2em;padding: 4px;line-height:1.6;"><strong>委(受)托方对本页所有内容已详细阅读和明确，并对委托书的真实性负责。受托方在委托事项内签署有关文件，保证提供的凭证真实有效，代表委托方的真实意愿，并愿意承担相应的法律责任。</strong></td>' + '</tr>' +
        '<tr><td rowspan="4" colspan="3" style="text-align:center;height: 160px;">	<strong>签<br>名<br>确<br>认<br>*</strong></td><td colspan="12" style="border-bottom: none;vertical-align: top">委托方(签字或盖章)&nbsp;&nbsp;:</td>	<td colspan="12" style="border-bottom: none;vertical-align: top">受托方(签字或盖章)&nbsp;&nbsp;:</td>' +
        '</tr>' +
        '<tr>' +
        '<td colspan="12" style="border-top: none;border-bottom: none;"><div style="width: 90%;border-bottom: 1px solid #000;margin: 0 auto"></div>	</td><td colspan="12" style="border-top: none;border-bottom: none;"><div style="width: 90%;border-bottom: 1px solid #000;margin: 0 auto"></div></td>' +
        '</tr>' +
        '<tr><td colspan="12" style="border-top: none;border-bottom: none;">&nbsp;</td><td colspan="12" style="border-top: none;border-bottom: none;vertical-align: bottom">经办人签名：<span style="width:60%;display: inline-block;border-bottom: 1px solid #000;"></span></td></tr><tr><td colspan="12" style="border-top: none;border-bottom: none;vertical-align: bottom">签署日期:<span style="width:70px;display: inline-block;border-bottom: 1px solid #000;"></span>年<span style="border-bottom: 1px solid #000;width:40px;display: inline-block;"></span>月<span style="border-bottom: 1px solid #000;width:40px;display: inline-block;"></span>日</td><td colspan="12" style="border-top: none;border-bottom: none;vertical-align: bottom">签署日期:<span style="width:70px;display: inline-block;border-bottom: 1px solid #000;"></span>年<span style="border-bottom: 1px solid #000;width:40px;display: inline-block;"></span>月<span style="border-bottom: 1px solid #000;width:40px;display: inline-block;"></span>日</td>' +
        '</tr>' +
        '</table>';


    LODOP.ADD_PRINT_HTM(90, 0, "RightMargin:15mm", "BottomMargin:15mm", page1Html);
    LODOP.SET_PRINT_STYLEA(0, "Horient", 2);

    LODOP.PREVIEW();
}

/**
 * 机动车注册、转移、注销登记/转入申请表--打印
 * 
 */

function printWorkApplication(owner_name1, owner_post1, owner_address1, owner_mobile1, owner_tel1, proxy_id, proxy_id_tel, sqsx, car_number_type, car_number, car_brand, vin, purpose, qianchuArea) {

    /**
     * 申请事项 sqsx 
     * 转移登记 (换号 不换号 换号（已税） 不换号（已税）市内迁出 进口车换号 进口车不换号)
     * 车辆转入 (车辆迁入)
     * 车辆转出 (变更迁出)
     */
    console.log(sqsx)
    var sqsxA = (sqsx == "车辆迁入" ? "&#254;" : "&#168;"); //车辆转入 (车辆迁入)
    var sqsxB = (sqsx == "变更迁出" ? "&#254;" : "&#168;"); //车辆转出 (变更迁出)
    if (sqsx == "换号" || sqsx == "不换号" || sqsx == "换号（已税）" || sqsx == "不换号（已税）" || sqsx == "市内迁出" || sqsx == "进口车换号" || sqsx == "进口车不换号") {
        var sqsxC = "&#254;";  //转移登记
    } else {
        var sqsxC = "&#168;";  //转移登记
    }
    // 车辆转出地址
    if (qianchuArea) {
        var areaProvince = qianchuArea.split(",")[0];
        var areaCity = qianchuArea.split(",")[1];
    } else {
        var areaProvince = "&nbsp;&nbsp;&nbsp;&nbsp;";
        var areaCity = "&nbsp;&nbsp;&nbsp;&nbsp;";
    }

    /**
    * 使用性质 ABC
    * <span style="font-family:Wingdings;">&#168;</span>
    * <span style="font-family:Wingdings;">&#254;</span>
    */
    console.log(purpose);
    var purposeA = (purpose == "A" ? "&#254;" : "&#168;"); //非营运
    var purposeB = (purpose == "B" ? "&#254;" : "&#168;"); //公路客运
    var purposeC = (purpose == "C" ? "&#254;" : "&#168;"); //公交客运
    var purposeD = (purpose == "D" ? "&#254;" : "&#168;"); //出租客运
    var purposeE = (purpose == "E" ? "&#254;" : "&#168;"); //旅游客运
    var purposeF = (purpose == "F" ? "&#254;" : "&#168;"); //货运
    var purposeG = (purpose == "G" ? "&#254;" : "&#168;"); //租赁
    var purposeH = (purpose == "H" ? "&#254;" : "&#168;"); //租赁
    var purposeI = (purpose == "I" ? "&#254;" : "&#168;"); //消防
    var purposeJ = (purpose == "J" ? "&#254;" : "&#168;"); //救护

    console.log(purposeA);


    LODOP = getLodop();
    LODOP.PRINT_INIT("机动车注册、转移、注销登记/转入申请表");

    LODOP.ADD_PRINT_TEXT(50, 10, 626, 54, "机动车注册、转移、注销登记/转入申请表");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 24);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    LODOP.SET_PRINT_STYLEA(0, "Horient", 2);

    var htmlprintWorkApplication = `<table border="1"
    style="border-collapse: collapse;table-layout: fixed;width: 100%;">
    <style>
        td {
            border-color: #000;
            vertical-align: middle;
            text-align: center;
        }
    </style>
    <tbody>
        <tr>
            <td colspan="28" style="height:50px"><strong>申请人信息栏</strong></td>
        </tr>

        <tr>
            <td rowspan="3" colspan="2" style="width:50px;">机<br>动<br>车<br>所<br>有<br>人</td>
            <td colspan="6" style="height:64px">姓名/名称</td>
            <td colspan="10">${owner_name1}</td>
            <td colspan="4">邮政编码</td>
            <td colspan="6">${owner_post1}</td>
        </tr>

        <tr>
            <td colspan="6" style="height:64px">邮寄地址</td>
            <td colspan="20">${owner_address1}</td>
        </tr>

        <tr>
            <td colspan="6" style="height:64px">手机号码</td>
            <td colspan="10">${owner_mobile1}</td>
            <td colspan="4">固定电话</td>
            <td colspan="6">${owner_tel1}</td>
        </tr>

        <tr>
            <td colspan="2">代<br>理<br>人</td>
            <td colspan="6" style="height:64px">姓名/名称</td>
            <td colspan="6">${proxy_id}</td>
            <td colspan="4">手机号码</td>
            <td colspan="10">${proxy_id_tel}</td>
        </tr>

        <tr>
            <td colspan="28" style="height:50px"><strong>申请业务事项</strong></td>
        </tr>

        <tr>
            <td rowspan="2" colspan="4" style="height: 100px;width: 100px;">申请事项</td>
            <td colspan="24" style="border-bottom:none;">
                <div style="width: 25%;text-align: center;float: left;"><span
                style="font-family:Wingdings;font-size:18px;">&#168;</span>注册登记</div>
                <div style="width: 25%;text-align: center;float: left;"><span
                        style="font-family:Wingdings;font-size:18px;">&#168;</span>注销登记</div>
                <div style="width: 25%;text-align: center;float: left;"><span
                        style="font-family:Wingdings;font-size:18px;">${sqsxC}</span>转移登记</div>
                <div style="width: 25%;text-align: center;float: left;"><span
                        style="font-family:Wingdings;font-size:18px;">${sqsxA}</span>车辆转入</div>
            </td>
        </tr>

        <tr>
            <td colspan="24">
                <div style="text-align:left;float: left;width: 20%;"><span
                        style="font-family:Wingdings;font-size:18px;">${sqsxB}</span>车辆转出</div>
                <div>转出至：${areaProvince}省(自治区、直辖市) ${areaCity}市（地、州）</div>
            </td>
        </tr>

        <tr>
            <td colspan="6" style="height:64px;width: 150px;">号牌种类</td>
            <td colspan='8'>${car_number_type}</td>
            <td colspan="6">号牌号码</td>
            <td colspan='8'>${car_number}</td>
        </tr>

        <tr>
            <td rowspan="4" style="width:25px;">机<br>动<br>车</td>
            <td colspan="5" style="width:125px;height:64px;">品牌型号</td>
            <td colspan="8">${car_brand}</td>
            <td colspan="6">车辆识别代号</td>
            <td colspan="8">${vin}</td>
        </tr>

        <tr>
            <td rowspan="3" colspan="5">使用性质</td>
            <td colspan="22" style="height:60px;font-size: 12px;">
                <div style="text-align:center;float: left;width: 14%"><span
                        style="font-family:Wingdings;">${purposeA}</span>非营运</div>
                <div style="text-align:center;float: left;width: 14%"><span
                        style="font-family:Wingdings;">${purposeB}</span>公路客运</div>
                <div style="text-align:center;float: left;width: 14%"><span
                        style="font-family:Wingdings;">${purposeC}</span>公交客运</div>
                <div style="text-align:center;float: left;width: 14%"><span
                        style="font-family:Wingdings;">${purposeD}</span>出租客运</div>
                <div style="text-align:center;float: left;width: 14%"><span
                        style="font-family:Wingdings;">${purposeE}</span>旅游客运</div>
                <div style="text-align:center;float: left;width: 14%"><span
                        style="font-family:Wingdings;">${purposeG}</span>租赁</div>
                <div style="text-align:center;float: left;width: 14%"><span
                        style="font-family:Wingdings;">&#168;</span>教练</div>
            </td>
        </tr>

        <tr>
            <td colspan="22" style="height:60px;font-size: 12px;">
                <div style="text-align:center;float: left;width: 16.6%"><span
                        style="font-family:Wingdings;">&#168;</span>接送幼儿</div>
                <div style="text-align:center;float: left;width: 16.6%"><span
                        style="font-family:Wingdings;">&#168;</span>接送小学生</div>
                <div style="text-align:center;float: left;width: 16.6%"><span
                        style="font-family:Wingdings;">&#168;</span>接送中小学生</div>
                <div style="text-align:center;float: left;width: 16.6%"><span
                        style="font-family:Wingdings;">&#168;</span>接送初中生</div>
                <div style="text-align:center;float: left;width: 16.6%"><span
                        style="font-family:Wingdings;">&#168;</span>危险货物运输</div>
                <div style="text-align:center;float: left;width: 16.6%"><span
                        style="font-family:Wingdings;">${purposeF}</span>货运</div>
            </td>
        </tr>

        <tr>
            <td colspan="22" style="height:60px;font-size: 12px;">
                <div style="text-align:center;float: left;width: 9%"><span
                        style="font-family:Wingdings;">${purposeI}</span>消防</div>
                <div style="text-align:center;float: left;width: 9%"><span
                        style="font-family:Wingdings;">${purposeJ}</span>救护</div>
                <div style="text-align:center;float: left;width: 13.5%"><span
                        style="font-family:Wingdings;">&#168;</span>工程救险</div>
                <div style="text-align:center;float: left;width: 9%"><span
                        style="font-family:Wingdings;">${purposeH}</span>警用</div>
                <div style="text-align:center;float: left;width: 15%"><span
                        style="font-family:Wingdings;">&#168;</span>出租营转非</div>
                <div style="text-align:center;float: left;width: 13.5%"><span
                        style="font-family:Wingdings;">&#168;</span>营转非</div>
                <div style="text-align:center;float: left;width: 15.5%"><span
                        style="font-family:Wingdings;">&#168;</span>预约出租客运</div>
                <div style="text-align:center;float: left;width: 15.5%"><span
                        style="font-family:Wingdings;">&#168;</span>预约出租转非</div>
            </td>
        </tr>

     
        <tr>
          <td colspan="12"  style="font-size: 15px;padding: 10px;text-align: left;text-indent: 2em;">机动车所有人及代理人对申请材料的真实有效性负责。</td>
        <td colspan="16"  style="font-size: 15px;padding: 10px">
            <div style="float:left">机动车所有人（代理人）签字：</div>
            <div  style="height:100px;"></div>
            <div style="float:right">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </td>
    </tr>
    </tbody>
</table>`;


    LODOP.ADD_PRINT_HTM(90, "9mm", "RightMargin:15mm", "BottomMargin:15mm", htmlprintWorkApplication);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 14);
    LODOP.SET_PRINT_STYLEA(0, "Horient", 2);

    LODOP.PREVIEW();
}

/** 数字金额大写转换(可以处理整数,小数,负数) */
function smalltoBIG(n) {
    var fraction = ['角', '分'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);

    var s = '';

    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);

    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

//字符串长度，一个中文为两个英文
function countStrLength(str) {
    var _str = str + "";
    if (!_str) {
        return 0;
    }
    var count = 0;
    for (var i = 0; i < _str.length; i++) {
        var c = _str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || c >= 0xff9f && c <= 0xff60) {
            count++;
        } else {
            count += 2;
        }
    }
    return count;
}

function printReceipt2(data) {

    /**
    * 业务流水号 commerce_sn
    * 业务名称 commerce_type_name
    * 代办店铺 company_branch_name
    * 车牌号码 car_number
    * 车辆类型 car_type
    * 品牌/型号 car_brand
    * 经办人  operate_name
    * 收据号码 receipt_sn
    * 补打收据号码 receipt_sn2
    * 收款金额 ss_money
    */
    var nowTime = LODOP.FORMAT("TIME:yyyy-mm-dd hh:mm:ss", "now"); //打印时间
    var ss_UpperMoney = smalltoBIG(data.ss_money);

    LODOP.PRINT_INIT("打印收据");
    LODOP.SET_PRINT_PAGESIZE(0, "176mm", "85mm", "打印收据");

    LODOP.ADD_PRINT_SETUP_BKIMG("<img border='0' src='http://testcar.hileader.com/images/shouju.png'>");
    LODOP.SET_SHOW_MODE("BKIMG_LEFT", 0);
    LODOP.SET_SHOW_MODE("BKIMG_TOP", 0);
    LODOP.SET_SHOW_MODE("BKIMG_WIDTH", "176mm");
    LODOP.SET_SHOW_MODE("BKIMG_HEIGHT", "85mm");
    LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", true);

    LODOP.ADD_PRINT_TEXT("21mm", "21mm", "40mm", "6.6mm", data.commerce_sn);
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#FF0000");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.ADD_PRINT_TEXT("21mm", "66mm", "42mm", "6.6mm", nowTime);
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#FF0000");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

    LODOP.ADD_PRINT_TEXT("32mm", "46.5mm", "120mm", "6.6mm", "车牌:粤S" + data.car_number + " " + data.car_brand + " " + data.car_number_type_name);
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#FF0000");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

    LODOP.ADD_PRINT_TEXT("41.5mm", "33.5mm", "136mm", "6.6mm", data.commerce_type_name + '(' + data.company_branch_name + ')');
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#FF0000");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

    LODOP.ADD_PRINT_TEXT("53mm", "45mm", "100mm", "6.6mm", ss_UpperMoney);
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#FF0000");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

    LODOP.ADD_PRINT_TEXT("53mm", "121mm", "42mm", "6.6mm", "¥" + data.ss_money + "元");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#FF0000");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

    LODOP.ADD_PRINT_TEXT("72mm", "36mm", "32mm", "6.6mm", data.operate_name);
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#FF0000");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

    LODOP.ADD_PRINT_TEXT("72mm", "90mm", "30mm", "6.6mm", data.operate_name);
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#FF0000");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

    LODOP.ADD_PRINT_TEXT("75mm", "140mm", "30mm", "6.6mm", data.receipt_sn);
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#FF0000");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 14);

    LODOP.PREVIEW();
}



function printReceipt(data) {
    var nowTime = LODOP.FORMAT("TIME:yyyy-mm-dd hh:mm:ss", "now"); //打印时间
    var ss_UpperMoney = smalltoBIG(data.ss_money);

    LODOP.PRINT_INITA( "0mm", "0mm", "176mm", "97mm", "打印收据");
    LODOP.SET_PRINT_PAGESIZE(1, "176mm", "97mm", "打印收据");

    LODOP.ADD_PRINT_TEXT(28,197,301,33,"旧车中心收款凭证");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLEA(0,"Bold",1);
    LODOP.SET_PRINT_STYLEA(0,"Horient",2);
    LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
    LODOP.SET_PRINT_STYLEA(0,"LineSpacing",5);
    LODOP.ADD_PRINT_RECT(96,80,540,166,0,1);
    LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
    LODOP.ADD_PRINT_RECT(138,177,433,1,0,1);
    LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
    LODOP.ADD_PRINT_RECT(177,120,489,1,0,1);
    LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
    LODOP.ADD_PRINT_TEXT(121,123,60,24,"今收到");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
    LODOP.ADD_PRINT_TEXT(160,84,50,24,"项目");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
    LODOP.ADD_PRINT_TEXT(200,84,82,24,"金额大写:");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
    LODOP.ADD_PRINT_TEXT(200,407,60,24,"小写：");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
    LODOP.ADD_PRINT_TEXT(235,84,205,24,"注：凭此单据换取发票。");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
    LODOP.ADD_PRINT_TEXT(270,84,76,24,"经办人：");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
    LODOP.ADD_PRINT_TEXT(270,270,76,24,"收款人：");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);

    LODOP.ADD_PRINT_TEXT(74,84,160,24, data.commerce_sn);
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000FF");
    LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);

    LODOP.ADD_PRINT_TEXT(74,260,180,24,nowTime);
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000FF");
    LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
    
    LODOP.ADD_PRINT_TEXT(120,187,431,24,"车牌:粤S" + data.car_number + " " + data.car_brand + " " + data.car_number_type_name);
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000FF");
    LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
    LODOP.ADD_PRINT_TEXT(159,133,487,24,data.commerce_type_name + '(' + data.company_branch_name + ')');
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000FF");
    LODOP.ADD_PRINT_TEXT(199,162,242,24,ss_UpperMoney);
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000FF");
    LODOP.ADD_PRINT_TEXT(199,460,160,24,"¥" + data.ss_money + "元");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000FF");
    LODOP.ADD_PRINT_TEXT(270,340,160,24,data.operate_name); // 收款人
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12); 
    LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000FF");
    LODOP.ADD_PRINT_TEXT(270,160,95,24,data.operate_name); //"经办人" 
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000FF");
    LODOP.ADD_PRINT_TEXT(286,507,104,24, data.receipt_sn);
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"FontColor","#0000FF");
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

    LODOP.PREVIEW();
}


/**
 * 打印发票
 */
function printEscfp(data,skm, jym) {
    LODOP.PRINT_INITA( "0mm", "0mm", "216.51mm", "178.01mm", "二手车销售统一发票");
    LODOP.SET_PRINT_PAGESIZE(1, "216.51mm", "178.01mm", "二手车销售统一发票");
    LODOP.ADD_PRINT_SHAPE(2, "30.27mm", "9mm", "200mm", "131mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "51.01mm", "9.21mm", "200mm", "0.21mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "58.21mm", "9.21mm", "200mm", "0.21mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "66.2mm", "9.21mm", "200mm", "0.21mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(1, "74mm", "9.21mm", "200mm", "0.21mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "81.81mm", "9.21mm", "200mm", "0.21mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "89.51mm", "9.21mm", "200mm", "0.21mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "97.29mm", "9.21mm", "200mm", "0.21mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "105.09mm", "9.21mm", "200mm", "0.21mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "113mm", "9.21mm", "200mm", "0.21mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "120.6mm", "9.21mm", "200mm", "0.21mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "128.4mm", "9.21mm", "200mm", "0.21mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "144.01mm", "9.21mm", "200mm", "0.21mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "151.9mm", "9.21mm", "200mm", "0.21mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(1, "30.27mm", "28.71mm", "0.21mm", "21.01mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "30.27mm", "100.99mm", "0.21mm", "21.01mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(1, "30.22mm", "109.01mm", "0.21mm", "21.01mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "51.01mm", "49mm", "0.21mm", "100.7mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "51.01mm", "114.91mm", "0.21mm", "7.2mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "66.2mm", "114.91mm", "0.21mm", "7.81mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "51.01mm", "152.51mm", "0.21mm", "30.8mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "58.21mm", "164.49mm", "0.21mm", "7.99mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "74mm", "164.49mm", "0.21mm", "31.09mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "81.81mm", "84.01mm", "0.21mm", "15.5mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "81.81mm", "102mm", "0.21mm", "15.5mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "81.81mm", "142.9mm", "0.21mm", "15.5mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "97.29mm", "152.51mm", "0.21mm", "7.81mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "113mm", "134.99mm", "0.21mm", "7.59mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "113mm", "152.51mm", "0.21mm", "7.59mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "120.6mm", "164.49mm", "0.21mm", "7.81mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "120.6mm", "177.01mm", "0.21mm", "7.81mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "128.4mm", "110.99mm", "0.21mm", "15.61mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "128.4mm", "128.91mm", "0.21mm", "15.61mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "144.01mm", "165.5mm", "0.21mm", "7.91mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "144.01mm", "177.01mm", "0.21mm", "7.81mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_SHAPE(0, "136.5mm", "110.99mm", "98mm", "0.21mm", 0, 1, "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_TEXT("34.32mm", "9.95mm", "20mm", "16.48mm", "机打代码\n机打号码\n机器编号");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LineSpacing", 3);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 3);
    LODOP.ADD_PRINT_TEXT("8.23mm", "70.54mm", "78mm", "6.11mm", "二手车销售统一发票");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 8);
    LODOP.ADD_PRINT_TEXT(73, 322, 200, 20, "发票联");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 24);
    LODOP.ADD_PRINT_TEXT(89, 36, 100, 19, "开票日期：");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 3);
    LODOP.ADD_PRINT_TEXT("11.54mm", "160.52mm", "20mm", "5mm", "发票代码");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 3);
    LODOP.ADD_PRINT_TEXT("19.31mm", "160.52mm", "19mm", "5mm", "发票号码");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 3);
    LODOP.ADD_PRINT_TEXT(125, 383, 31, 71, "税控码");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LineSpacing", 5);
    LODOP.ADD_PRINT_TEXT(201, 44, 154, 19, "买方单位/个人 ");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 9);
    LODOP.ADD_PRINT_TEXT(231, 34, 158, 20, "买方单位/个人住址");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 4);
    LODOP.ADD_PRINT_TEXT(258, 38, 154, 19, "卖方单位/个人");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 9);
    LODOP.ADD_PRINT_TEXT(289, 34, 158, 20, "卖方单位/个人住址");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 4);
    LODOP.ADD_PRINT_TEXT(318, 42, 169, 20, "车牌照号");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 28);
    LODOP.ADD_PRINT_TEXT(348, 33, 160, 20, "车架号/车辆识别代码");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 3);
    LODOP.ADD_PRINT_TEXT(377, 40, 157, 20, "车价合计（大写）");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 6);
    LODOP.ADD_PRINT_TEXT(406, 40, 151, 20, "经营、拍卖单位");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 8);
    LODOP.ADD_PRINT_TEXT(435, 39, 147, 20, "经营、拍卖单位地址");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 3);
    LODOP.ADD_PRINT_TEXT(466, 31, 170, 20, "开户银行、账户");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 8);
    LODOP.ADD_PRINT_TEXT(509, 21, 195, 20, "二手车市场");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 16);
    LODOP.ADD_PRINT_TEXT(553, 43, 144, 20, "开户银行、账户");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 7);
    LODOP.ADD_PRINT_TEXT(586, 40, 100, 20, "备 注：");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 5);
    LODOP.ADD_PRINT_TEXT(616, 40, 147, 20, "开票单位（盖章）");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 3);
    LODOP.ADD_PRINT_TEXT(616, 472, 153, 20, "开票人");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 3);
    LODOP.ADD_PRINT_TEXT(489, 425, 71, 19, "纳 税 人  ");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_TEXT(503, 418, 73, 20, "识 别 号");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_TEXT(525, 425, 61, 20, "地    址");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_TEXT(553, 617, 63, 20, "电话");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 2);
    LODOP.ADD_PRINT_TEXT(465, 617, 58, 20, "电话");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 2);
    LODOP.ADD_PRINT_TEXT(431, 514, 63, 20, "纳 税 人");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_TEXT(444, 512, 66, 20, "识 别 号");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_TEXT(201, 437, 143, 20, "单位代码/身份证号码");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 2);
    LODOP.ADD_PRINT_TEXT(230, 574, 52, 20, "电话");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 2);
    LODOP.ADD_PRINT_TEXT(259, 437, 143, 20, "单位代码/身份证号码");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 2);
    LODOP.ADD_PRINT_TEXT(288, 574, 52, 20, "电话");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 2);
    LODOP.ADD_PRINT_TEXT(318, 314, 79, 20, "登记证号");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 2);
    LODOP.ADD_PRINT_TEXT(348, 314, 79, 20, "厂牌型号");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 2);
    LODOP.ADD_PRINT_TEXT(318, 533, 100, 20, "车 辆 类 型");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.ADD_PRINT_TEXT(341, 533, 100, 20, "转入地车辆");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 2);
    LODOP.ADD_PRINT_TEXT(355, 533, 100, 20, "管理所名称");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 2);
    LODOP.ADD_PRINT_TEXT(377, 565, 70, 20, "小写");
    LODOP.SET_PRINT_STYLEA(0, "FontColor", "#7D7402");
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "LetterSpacing", 2);
    LODOP.ADD_PRINT_TEXT("10.48mm", 666, 135, 20, data.invoices_info.invoices_code); //开票代码
    LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.ADD_PRINT_TEXT("18.0mm", 666, 100, 20, data.invoices_info.invoices_no); //开票号码
    LODOP.SET_PRINT_STYLEA(0, "PreviewOnly", 1);
    LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);

    LODOP.ADD_PRINT_TEXT(89, 108, 122, 20, data.invoices_info.kp_date); //开票日期
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
    LODOP.ADD_PRINT_TEXT(122, 127, 237, 20, data.invoices_info.invoices_code); //开票代码
    LODOP.SET_PRINT_STYLEA(0, "FontName", "courier New");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    LODOP.ADD_PRINT_TEXT(145, 127, 235, 20,data.invoices_info.invoices_no);//开票号码
    LODOP.SET_PRINT_STYLEA(0, "FontName", "courier New");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12); 
    LODOP.ADD_PRINT_TEXT(168, 127, 238, 20, '机器编号'); //机器编号
    LODOP.SET_PRINT_STYLEA(0, "FontName", "courier New");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    if (countStrLength(data.origin_owner.name) <= 30) {
        LODOP.ADD_PRINT_TEXT(200, 190, 238, 40, data.origin_owner.name); //买方单位/个人
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    } else {
        LODOP.ADD_PRINT_TEXT(195, 190, 238, 40, data.origin_owner.name);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    LODOP.ADD_PRINT_TEXT(198, 576, 215, 20, data.origin_owner.identity); //买方单位/个人ID
    LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
    if (countStrLength(data.origin_owner.address) <= 46) { //买方单位/个人dz
        LODOP.ADD_PRINT_TEXT(229, 190, 384, 20, data.origin_owner.address);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    } else {
        LODOP.ADD_PRINT_TEXT(224, 190, 384, 20, data.origin_owner.address);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    if (countStrLength(data.origin_owner.mobile) <= 15) { //买方单位/个人dh 
        LODOP.ADD_PRINT_TEXT(233, 627, 164, 20, data.origin_owner.mobile);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    } else {
        LODOP.ADD_PRINT_TEXT(225, 627, 164, 20, data.origin_owner.mobile);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    if (countStrLength(data.new_owner.name) <= 30) {
        LODOP.ADD_PRINT_TEXT(258, 190, 240, 20, data.new_owner.name); //卖方单位/个人
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    } else {
        LODOP.ADD_PRINT_TEXT(253, 190, 240, 20, data.new_owner.name);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }

    LODOP.ADD_PRINT_TEXT(258, 576, 207, 20, data.new_owner.identity); //卖方单位/个人ID
    LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
    if (countStrLength(data.new_owner.address) <= 46) {
        LODOP.ADD_PRINT_TEXT(290, 190, 384, 20, data.new_owner.address);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    } else {
        LODOP.ADD_PRINT_TEXT(285, 190, 384, 20, data.new_owner.address); //卖方单位/个人dz
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    if (countStrLength(data.new_owner.mobile) <= 15) { //卖方单位/个人dh
        LODOP.ADD_PRINT_TEXT(289, 627, 164, 20, data.new_owner.mobile);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    } else {
        LODOP.ADD_PRINT_TEXT(281, 627, 164, 20, data.new_owner.mobile);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    if (countStrLength("粤S"+data.car_info.car_number) <= 10) { //车牌照号
        LODOP.ADD_PRINT_TEXT(318, 186, 125, 20,"粤S"+data.car_info.car_number);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    } else {
        LODOP.ADD_PRINT_TEXT(312, 192, 125, 20,"粤S"+data.car_info.car_number);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    if (countStrLength(data.car_info.register_number) <= 14) { //登记证号
        LODOP.ADD_PRINT_TEXT(318, 392, 145, 20, data.car_info.register_number);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
    } else {
        LODOP.ADD_PRINT_TEXT(315, 390, 154, 20, data.car_info.register_number);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    if (countStrLength(data.car_info.car_type) <= 16) { //车辆类型
        LODOP.ADD_PRINT_TEXT(318, 627, 160, 20, data.car_info.car_type);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    } else {
        LODOP.ADD_PRINT_TEXT(313, 630, 160, 20, data.car_info.car_type);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    if (countStrLength(data.car_info.car_stand) <= 13) { //vin
        LODOP.ADD_PRINT_TEXT(348, 188, 131, 20, data.car_info.car_stand);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
    } else {
        LODOP.ADD_PRINT_TEXT(341, 188, 131, 20, data.car_info.car_stand);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    if (countStrLength(data.car_info.car_brand) <= 16) { //厂牌型号
        LODOP.ADD_PRINT_TEXT(348, 393, 137, 20, data.car_info.car_brand);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    } else if(data.car_info.car_brand <=44){
        LODOP.ADD_PRINT_TEXT(344, 393, 137, 20, data.car_info.car_brand);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }else {
        LODOP.ADD_PRINT_TEXT(340, 393, 150, 20, data.car_info.car_brand);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    if (countStrLength(data.car_info.car_manage) <= 20) { //转入地车辆管理所名称
        LODOP.ADD_PRINT_TEXT(347, 626, 175, 20, data.car_info.car_manage);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    } else if (countStrLength(data.car_info.car_manage) <= 58) {
        LODOP.ADD_PRINT_TEXT(343, 626, 175, 20, data.car_info.car_manage);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    } else {
        LODOP.ADD_PRINT_TEXT(340, 625, 175, 20, data.car_info.car_manage);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    var cjhjdx = smalltoBIG(data.invoices_info.car_price); //车价合计(大写)
    // LODOP.ADD_PRINT_TEXT(378, 186, 378, 20, (fpmx.fpzt == "01" ? "负数：" + cjhjdx : cjhjdx)); //车价合计(大写)
    LODOP.ADD_PRINT_TEXT(378, 186, 378, 20,  cjhjdx); //车价合计(大写)
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    LODOP.ADD_PRINT_TEXT(376, 620, 185, 20, "￥" + (data.invoices_info.car_price * 1).toFixed(2)); //车价合计(小写)
    LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    if (countStrLength(data.invoices_info.company_name) <= 64) { //经营、拍卖单位
        LODOP.ADD_PRINT_TEXT(407, 190, 600, 20, data.invoices_info.company_name);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    } else {
        LODOP.ADD_PRINT_TEXT(405, 190, 600, 20, data.invoices_info.company_name);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    if (countStrLength(data.invoices_info.company_addr) <= 26) { //经营、拍卖单位地址
        LODOP.ADD_PRINT_TEXT(436, 188, 326, 20, data.invoices_info.company_addr);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    } else {
        LODOP.ADD_PRINT_TEXT(436, 190, 326, 20, data.invoices_info.company_addr);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    LODOP.ADD_PRINT_TEXT(436, 576, 210, 20, data.invoices_info.identification_no); //经营、拍卖单位识别号
    LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
    if (countStrLength(data.invoices_info.company_bank_account) <= 58) { //经营、拍卖单位银行账号
        LODOP.ADD_PRINT_TEXT(466, 188, 435, 20, data.invoices_info.company_bank_account);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    } else {
        LODOP.ADD_PRINT_TEXT(464, 188, 435, 20, data.invoices_info.company_bank_account);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    if (countStrLength(data.invoices_info.company_tel) <= 12) { //经营、拍卖单位电话
        LODOP.ADD_PRINT_TEXT(466, 671, 130, 20, data.invoices_info.company_tel);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
    } else {
        LODOP.ADD_PRINT_TEXT(460, 671, 130, 20, data.invoices_info.company_tel);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    if (countStrLength(data.invoices_info.company_name) <= 28) {  //二手车市场的名字
        LODOP.ADD_PRINT_TEXT(493, 188, 243, 56, data.invoices_info.company_name);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    } else {
        LODOP.ADD_PRINT_TEXT(493, 188, 237, 56, data.invoices_info.company_name);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    LODOP.ADD_PRINT_TEXT(496, 493, 291, 20, data.invoices_info.identification_no);   //二手车市场的识别号
    LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
    if (countStrLength(data.invoices_info.company_bank_account) <= 60) {   //二手车市场的银行账号
        LODOP.ADD_PRINT_TEXT(553, 187 , 441, 20, data.invoices_info.company_bank_account);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    } else {
        LODOP.ADD_PRINT_TEXT(549, 187, 441, 20, data.invoices_info.company_bank_account);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    if (countStrLength(data.invoices_info.company_tel) <= 12) {   //二手车市场的电话
        LODOP.ADD_PRINT_TEXT(550, 671, 128, 20, data.invoices_info.company_tel);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 11);
    } else {
        LODOP.ADD_PRINT_TEXT(547, 671, 128, 20, data.invoices_info.company_tel);
        LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    if (countStrLength(data.invoices_info.remark) <= 120) { //备注
        LODOP.ADD_PRINT_TEXT(583, 122, 677, 40, data.invoices_info.remark);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    } else {
        LODOP.ADD_PRINT_TEXT(578, 115, 680, 40, data.invoices_info.remark);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    LODOP.ADD_PRINT_TEXT(616, 585, 114, 20, data.invoices_info.operate_name); //开票人
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    LODOP.ADD_PRINT_TEXT(140, 429, 361, 43, skm); //税控码
    LODOP.SET_PRINT_STYLEA(0, "FontName", "Courier New");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
    if (countStrLength( data.invoices_info.company_addr) <= 38) {   //二手车市场的地址
        LODOP.ADD_PRINT_TEXT(521, 489, 310, 20,  data.invoices_info.company_addr);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
    } else {
        LODOP.ADD_PRINT_TEXT(519, 492, 310, 20,  data.invoices_info.company_addr);
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 9);
        LODOP.SET_PRINT_STYLEA(0, "LineSpacing", -4);
    }
    // LODOP.ADD_PRINT_IMAGE(15, 40, 66, 66, "data:image/png;base64," + fpmx.ewm); //二维码
    LODOP.ADD_PRINT_IMAGE(15, 40, 66, 66, "data:image/png;base64," + "iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAIAAAD6XpeDAAADFElEQVR42u3aUY7jIBAE0Nz/0tkTrBybKppJnj+jkQf3w3JT8HoVrvcH1//+fuWeqfvf/Zu74zn6ggcPHrwfwXsvXJ/cZ6UQU894FziFfbsO8ODBgwfvMV5qcFONz0741MRdcoEHDx48eEfhrSzGpyZHY+EPDx48ePC+H6/98U/933YwDQ8ePHjwzsI7IcBdaUD+yniO3lWABw8evC/GawS4fv/Dp8f8Dg8evC/De5evlcVsqhFoBAtH1BYePHjw4D1e800dHGoHzamit7GXagIPHjx48C7Hk2ocGqFqe2wpjEazttRtwoMHDx68S7ypzclUIdrwp004ePDgwYOX6RvaYXGqQWgH1o0mqBEswIMHDx686/rvLHq7SWk849Tm7Uf3gQcPHjx4ke9fe1O0HVhXurjCs8deDHjw4MGDV8VLfbQbhd65QTq1kIcHDx48ePfw2huPjSalsRBuLN7r4Ts8ePDgwYv3Ae2Adedm6cp1dDANDx48ePDieezU5m39ME/h2VP1qb+F8ODBg/cjeKlGYOdCdWoBPrUx+1EwDQ8ePHjwEuM5IqhdKVaqSUmFyCuTDB48ePDgPX+uqcGlFr8NmKlg+vZ94MGDBw/eY7x2AJ26f6PoUweTlsYJDx48ePAej3OqEKlFfRtm5/hvvxjw4MGDB+8xXntB2tiwbRS90Zg0An148ODBg3dvPy8WmJZD6p0HfqYm9FIwDQ8ePHjwHjcs7WB6asHb2CxNTaDYxiw8ePDgwYvjtRfmO9OKVHEbQXmlYYEHDx68H8eb2sDc+Xv74FMqcH9NvRnw4MGDB+/xfVLNRXtxvXMMsUNN8ODBgwfvsiY7P9RTTUF783nleZcmLjx48ODBm/jW1gPl1Ec+Vbh2KNHYNIYHDx48ePNFP61hSTULjcAaHjx48ODl8dqL1hOC5kbTsbMBhAcPHjx45+K1F9dTwfTODe2xhgUePHjw4MWD18YDN0LnxqRcqgM8ePDgwRsPptsf7Z2HdhoTIlZDePDgwYOXqOHSQ658zHeOpxFY7wwQ4MGDBw/e5fUPq0y5JEcNfjcAAAAASUVORK5CYII=");
    LODOP.SET_PRINT_STYLEA(0, "Stretch", 1);

    LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 850, 750, "");
    LODOP.SET_SHOW_MODE("HIDE_PBUTTIN_PREVIEW", 1);
    LODOP.PREVIEW();
}

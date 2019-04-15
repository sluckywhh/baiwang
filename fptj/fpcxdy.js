
var fpsbprint=function(){
    var nsrshh,qyname,dzdh,datedy,fpqdtjModels;
    return {
        initYLData: function() {
            if(!checkPrint()){
                return;
            }
            fpqdtjModels = $.parseJSON(_$("span[id='fpqdtjModels']").text());
            dylx = _$("#pniddy").val();
            if (fpqdtjModels == null || (dylx != 1 && fpqdtjModels.length == 0)){
                alert('对不起，没有数据不能打印');
                return false;
            } else {
                this.initPrintData(true,dylx);
                LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 900, 1000, "");
                LODOP.SET_SHOW_MODE("HIDE_PBUTTIN_PREVIEW", 1);
                //打印设计LODOP.PRINT_DESIGN();
                //打印预览
                LODOP.PREVIEW();
            }
        },
        printfp:function(){
            dylx = _$("#pniddy").val();
            fpqdtjModels = $.parseJSON(_$("span[id='fpqdtjModels']").text());
            if (fpqdtjModels == null || (dylx != 1 && fpqdtjModels.length == 0)){
                alert('对不起，没有数据不能打印');
                return false;
            }else{
                this.initPrintData(true,dylx);
                LODOP.PRINT();
            }
        },
        initPrintData:function(yl,dylx){
            datedy = _$("#kprq").val();
            dzdh = _$("#dzdh").val();
            strtest = datedy.split("-");
            var dyyear = strtest[0];
            var dymonth = strtest[1];
            //获取当前时间
            var mydate = new Date();
            var myYear = mydate.getFullYear();//年
            var myMonth = mydate.getMonth() + 1;//月0-11
            var myDay = mydate.getDate();//日

            var fpqdtjmodelzbt = fpqdtjModels[0];
            var fpqdtjModel = fpqdtjModels[1];
            var fplxdm = fpqdtjModels[2];

            var fptjModelhide = _$("#fptjModelhide").val();
            //alert(fptjModelhide);
            //表格名称
            var tablename;
            var tpname;
            if(fplxdm == "004"){
                tablename = "专用发票";
                tpname = "专用增值税发票";
            }else if(fplxdm == "007"){
                tablename = "普通发票";
                tpname = "普通增值税发票";
            }else if(fplxdm == "026"){
                tablename = "电子发票";
                tpname = "普通增值税发票(电子)";
            }else if(fplxdm == "025"){
                tablename = "卷式发票";
                tpname = "普通增值税发票(卷式)";
            }else if(fplxdm == "005"){
            	tablename = "机动车发票";
            	tpname = "机动车销售统一发票";
            }
            var str = "";
            if (dylx == 1) {
                str = tpname+"汇总表(" + dyyear + "年" + dymonth + "月)";
            } else if (dylx == 2) {
                str = "正数发票清单(" + dyyear + "年" + dymonth + "月)";
            } else if (dylx == 3) {
                str = "负数发票清单(" + dyyear + "年" + dymonth + "月)";
            } else if (dylx == 4) {
                str = "正数发票废票清单(" + dyyear + "年" + dymonth + "月)";
            } else if (dylx == 5) {
                str = "负数发票废票清单(" + dyyear + "年" + dymonth + "月)";
            } else if(dylx == 6) {
                str = "空白发票废票清单(" + dyyear + "年" + dymonth + "月)";
            }
            nsrshh = _$("#nsrshh").val();
            qyname = _$("#qyname").val();
            kpr=_$("#kpr").val();
            czylx=_$("#kpr_czylx").val();
            czydm=_$("#kpr_czydm").val();
            if (dylx == 1) {
                LODOP.PRINT_INITA("1.3mm","-2.59mm","210.11mm","297.1mm",tablename+"汇总表");
                LODOP.SET_PRINT_PAGESIZE(1,2100,2970,"CreateCustomPage");
                LODOP.ADD_PRINT_TEXT(58,187,300,43,tablename+"汇总表");
                LODOP.SET_PRINT_STYLEA(0,"FontSize",18);
                LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
                LODOP.SET_PRINT_STYLEA(0,"Horient",2);
                LODOP.ADD_PRINT_TEXT(111,82,70,20,"制表日期：\n");
                LODOP.ADD_PRINT_TEXT(131,82,70,20,"所属期间：");
                LODOP.ADD_PRINT_TEXT(151,82,122,20,tablename+"统计表：");
                //LODOP.ADD_PRINT_TEXT(171,82,131,20,tpname+"汇总表");
                LODOP.ADD_PRINT_TEXT(171,82,300,20,str);
                LODOP.ADD_PRINT_TEXT(191,82,94,20,"纳税人登记号：");
                LODOP.ADD_PRINT_TEXT(211,82,70,20,"企业名称：");
                LODOP.ADD_PRINT_TEXT(231,82,70,20,"地址电话：");
                if(czylx == 0){LODOP.ADD_PRINT_TEXT(251,82,94,20,"开票人：");}
                LODOP.ADD_PRINT_TEXT(111,149,95,20,myYear + "年" + myMonth + "月" + myDay + "日");
                LODOP.ADD_PRINT_TEXT(131,149,95,20,dymonth + "月份~~" + dymonth + "月");
                LODOP.ADD_PRINT_TEXT(151,190,38,20,"1-0" + dylx);
                //LODOP.ADD_PRINT_TEXT(171,213,100,20,"("+dyyear+"年"+dymonth+"月)");
                LODOP.ADD_PRINT_TEXT(191,176,137,20,nsrshh);
                LODOP.ADD_PRINT_TEXT(211,152,400,20,qyname);
                LODOP.ADD_PRINT_TEXT(231,152,400,20,dzdh);               
                if(czylx == 0){
                    if(kpr == -1){
                        LODOP.ADD_PRINT_TEXT(251,176,137,20,czydm);
                     }else{
                        LODOP.ADD_PRINT_TEXT(251,176,137,20,kpr);
                                 }
                        LODOP.ADD_PRINT_LINE(272,82,271,582,0,2);
                        LODOP.ADD_PRINT_TEXT(280,82,145,20,"★  发票领用存情况  ★");
                 }else{
                        LODOP.ADD_PRINT_LINE(262,82,261,582,0,2);
                        LODOP.ADD_PRINT_TEXT(272,82,145,20,"★  发票领用存情况  ★");
                       }
                LODOP.ADD_PRINT_TEXT(297,82,85,20,"期初库存份数");
                LODOP.ADD_PRINT_TEXT(317,82,85,20,"购进发票份数");
                LODOP.ADD_PRINT_TEXT(337,82,85,20,"退回发票份数");
                LODOP.ADD_PRINT_TEXT(297,167,85,20,_$("#qckcfs").text());
                //LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
                LODOP.ADD_PRINT_TEXT(317,167,85,20,_$("#gjfpfs").text());
                LODOP.ADD_PRINT_TEXT(337,167,85,20,_$("#thfpfs").text());
                LODOP.ADD_PRINT_TEXT(297,252,85,20,"正数发票份数");
                LODOP.ADD_PRINT_TEXT(317,252,85,20,"正数废票份数");
                LODOP.ADD_PRINT_TEXT(337,252,85,20,"期末库存份数");
                LODOP.ADD_PRINT_TEXT(297,337,85,20,_$("#zsfpfs").text());
                LODOP.ADD_PRINT_TEXT(317,337,85,20,_$("#zffpfs").text());
                LODOP.ADD_PRINT_TEXT(337,337,85,20,_$("#qmkcfs").text());
                LODOP.ADD_PRINT_TEXT(297,422,85,20,"负数发票份数");
                LODOP.ADD_PRINT_TEXT(317,422,85,20,"负数废票份数");
                LODOP.ADD_PRINT_TEXT(297,507,85,20,_$("#fsfpfs").text());
                LODOP.ADD_PRINT_TEXT(317,507,85,20,_$("#fffpfs").text());
                LODOP.ADD_PRINT_TEXT(337,422,85,20,"空废发票份数");
                LODOP.ADD_PRINT_TEXT(337,507,85,20,_$("#kffpfs").text());
                LODOP.ADD_PRINT_LINE(368,82,367,582,0,2);
                LODOP.ADD_PRINT_TEXT(378,82,105,20,"★  销项情况  ★");
                LODOP.ADD_PRINT_TEXT(398,82,88,20,"金额单位：元");

                //序号框宽度
                var xhwidth = 37;
                //项目名称宽度
                var xmmcwidth = 85;
                //表格总体宽度设置
                var tablewidth = 630;

                //alert(parseInt(Number((tablewidth - xhwidth - xmmcwidth) / Number(fpqdtjmodelzbt.length - 2))));
                //序号_及项目名称外其它等宽_序号不是传过来的，是循环出来的
                var widthcl = parseInt(Number((tablewidth - xhwidth - xmmcwidth) / Number(fpqdtjmodelzbt.length - 1)));
                //头部左边距
                var headleft = 82;
                //头部内容左边距
                var headtextleft = 85;
                //头部上边距
                var headtop = 428;
                //头部内容上边距
                var headtexttop = 433;
                //外框与文本框之间的左边距
                var paddingleft = 10;
                for (var x = 0; x <= fpqdtjmodelzbt.length; x++) {
                    if (x == 0) {
                        LODOP.ADD_PRINT_RECT(headtop, headleft, 37, 30, 0, 1);
                        LODOP.ADD_PRINT_TEXT(headtexttop, headtextleft, 35, 20, "序号");
                        headleft = headleft + xhwidth;
                        headtextleft = headleft + paddingleft;
                    } else if(x == 1){
                        LODOP.ADD_PRINT_RECT(headtop, headleft, 85, 30, 0, 1);
                        LODOP.ADD_PRINT_TEXT(headtexttop, headtextleft, 81, 20, fpqdtjmodelzbt[x - 1]);
                        headleft = headleft + xmmcwidth;
                        headtextleft = headleft + paddingleft;
                    } else {
                        LODOP.ADD_PRINT_RECT(headtop, headleft, widthcl, 30, 0, 1);
                        LODOP.ADD_PRINT_TEXT(headtexttop, headtextleft, 60, 20, fpqdtjmodelzbt[x - 1]);
                        headleft = headleft + widthcl;
                        headtextleft = headleft + paddingleft;
                    }
                }

                var inittop = headtop + 30;
                var oldinittop = inittop;
                var initleft = 82;
                var oldleft = 82;
                //文字框上边界
                //var texttop = 442;
                var texttop = inittop + 12;
                var oldtexttop = texttop;
                //文字框左边界
                var textleft = 87;
                var oldtextleft = 87;
                //TODO : 循环行
                for (var i = 0; i < fpqdtjModel.length; i++) {
                    //TODO : 循环列
                    var testdemo = fpqdtjModel[i].columnNameModelList;
                    initleft = oldleft;
                    textleft = oldtextleft;
                    for (var j = 0; j <= testdemo.length; j++) {
                        if (j == 0) {
                            //TODO : 上,左,宽，高
                            LODOP.ADD_PRINT_RECT(inittop, initleft, 37, 30, 0, 1);
                            LODOP.ADD_PRINT_TEXT(texttop, textleft, 35, 20, i + 1);
                            initleft = initleft + xhwidth;
                            textleft = initleft + 5;
                        } else if(j == 1){
                            var str = testdemo[j - 1].columnVal;
                            //TODO : 上   ，  左   ， 宽 ， 高
                            LODOP.ADD_PRINT_RECT(inittop, initleft, 85, 30, 0, 1);
                            LODOP.ADD_PRINT_TEXT(texttop, textleft, 81, 20, str);
                            initleft = initleft + xmmcwidth;
                            textleft = initleft + 5;
                        }else {
                            var str = testdemo[j - 1].columnVal;
                            //TODO : 上   ，  左   ， 宽 ， 高
                            LODOP.ADD_PRINT_RECT(inittop, initleft, widthcl, 30, 0, 1);
                            if(str.length * 9 > widthcl){
                                LODOP.ADD_PRINT_TEXT(texttop-8, textleft, widthcl - 3, 20, str);
                                LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
                            }else{
                                LODOP.ADD_PRINT_TEXT(texttop, textleft, widthcl - 3, 20, str);
                            }
                            initleft = initleft + widthcl;
                            textleft = initleft + 5;
                        }
                    }
                    inittop += 30;
                    texttop = inittop + 12;
                }
            } else {

                var fpqdtjModel = fpqdtjModels[1];

                //宽210.1mm高297.1mm
                LODOP.PRINT_INITA("1.3mm", "-2.6mm", "210.1mm", "297.1mm",tablename+"汇总表");
                // LODOP.SET_PRINT_PAGESIZE(1, 2970, 2100, "CreateCustomPage");
                LODOP.SET_PRINT_PAGESIZE(1, 2100,2900,"CreateCustomPage");
                LODOP.ADD_PRINT_TEXT(32, 265, 206, 40, tablename+"明细表");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
                LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
                LODOP.ADD_PRINT_TEXT(78, 23, 73, 20, "制表日期：\n\n");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(104, 23, 122, 20, tablename+"统计表：");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(130, 23, 300, 20, str);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(155, 23, 110, 20, "纳税人登记号：");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(179, 23, 72, 20, "企业名称：");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(204, 23, 72, 20, "地址电话：");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                if(czylx == 0){ 
                	LODOP.ADD_PRINT_TEXT(229, 23, 72, 20, "开票人：");
                    LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                    LODOP.ADD_PRINT_TEXT(229, 217, 2140, 20, "金额单位：元");
                    LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                  }else{
                	  LODOP.ADD_PRINT_TEXT(226, 23, 100, 20, "金额单位：元");
                      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                  }
               
                
                
                //填制表日期
                LODOP.ADD_PRINT_TEXT(78, 105, 407, 20, myYear + "年" + myMonth + "月" + myDay + "日");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(104, 131, 405, 20, "1-0" + dylx);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                // LODOP.ADD_PRINT_TEXT(130,192,379,20,"填正数发票清单表");
                LODOP.ADD_PRINT_TEXT(155, 135, 882, 20,nsrshh);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(179, 95, 929, 20, qyname);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(204, 97, 925, 20, dzdh);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                if(czylx == 0){
                	 if(kpr == -1){
                		 LODOP.ADD_PRINT_TEXT(229, 97, 925, 20,czydm);
                         LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                	 }else{
                		 LODOP.ADD_PRINT_TEXT(229, 97, 925, 20,kpr);
                         LODOP.SET_PRINT_STYLEA(0,"ItemType",1); 
                	 }           	
                }

                LODOP.ADD_PRINT_RECT(252,26,37,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,62,65,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,126,89,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,214,70,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,283,74,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,356,136,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,492,104,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,596,104,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,699,34,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(258,29,36,20,"序号");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(258,65,60,20,"发票种类");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(258,142,60,20,"类别代码");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(258,217,65,20,"发票号码");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(258,288,63,20,"开票日期");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(258,360,131,20,"购方税号");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(258,494,100,20,"合计金额");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(256,595,100,20,"合计税额");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(256,702,36,20,"税率");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);


                var page=0;
                var j = 0;
                var pageCount =Math.ceil(fpqdtjModel.length/24) ;
                if (fpqdtjModel.length > 0) {
                    for (var i = 0; i < fpqdtjModel.length; i++) {
                        //边框

                        LODOP.ADD_PRINT_RECT(280+ (28 * j ),26,37,29,0,1);
                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),62,65,29,0,1);
                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),126,89,29,0,1);

                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),214,70,29,0,1);

                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),283,74,29,0,1);
                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),356,136,29,0,1);
                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),492,104,29,0,1);
                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),596,104,29,0,1);
                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),699,34,29,0,1);

                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),29,36,20,i+1);
                        //填发票种类
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),65,60,20,fpqdtjModel[i].fplxdmmc);
                        //填发票号码
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),132,85,20,fpqdtjModel[i].fpdm);
                        //填发票号码
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),217,65,20,fpqdtjModel[i].fphm);
                        //填开票日期
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),288,63,20,fpqdtjModel[i].kprq);
                        //填购房税号
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),360,131,20,fpqdtjModel[i].ghdwsbh);
                        //填合计金额
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),496,100,20,fpqdtjModel[i].hjje);
                        //填税额
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),601,100,20,fpqdtjModel[i].hjse);
                        //填率
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),702,36,20,fpqdtjModel[i].sl);
                        j++;

                        if(i==fpqdtjModel.length-1 && i%24!=0){
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 23, 65, 20, "填表人：");

                            //LODOP.ADD_PRINT_TEXT(height+33,131,131,20,"填表人姓名");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 164, 61, 20, "抽样员：");

                            //LODOP.ADD_PRINT_TEXT(height+33,319,128,20,"填抽样员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 282, 58, 20, "录入员：");

                            //LODOP.ADD_PRINT_TEXT(height+33,514,115,20,"填录入员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 387, 57, 20, "复核员：");

                            //LODOP.ADD_PRINT_TEXT(height+33,684,105,20,"填复核员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 509, 58, 20, "审核员：");


                            page++;
                            LODOP.ADD_PRINT_TEXT(1000,23,40,20,"第"+page+"页");
                            LODOP.ADD_PRINT_TEXT(1000,70,49,20,"总"+pageCount+"页");
                        }else if(i%23==0&&i!=0){
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 23, 65, 20, "填表人：");
                            //LODOP.ADD_PRINT_TEXT(height+33,131,131,20,"填表人姓名");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 164, 61, 20, "抽样员：");

                            //LODOP.ADD_PRINT_TEXT(height+33,319,128,20,"填抽样员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 282, 58, 20, "录入员：");
                            //LODOP.ADD_PRINT_TEXT(height+33,514,115,20,"填录入员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 387, 57, 20, "复核员：");
                            //LODOP.ADD_PRINT_TEXT(height+33,684,105,20,"填复核员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 509, 58, 20, "审核员：");
                            //LODOP.ADD_PRINT_TEXT(height+33,854,138,20,"填审核员");
                            j=0;
                            page++;
                            LODOP.ADD_PRINT_TEXT(1000,23,40,20,"第"+page+"页");
                            LODOP.ADD_PRINT_TEXT(1000,70,49,20,"总"+pageCount+"页");
                            LODOP.NewPage();

                        }else if(i==0&&i==(fpqdtjModel.length-1)){
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 23, 65, 20, "填表人：");
                            //LODOP.ADD_PRINT_TEXT(height+33,131,131,20,"填表人姓名");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 164, 61, 20, "抽样员：");

                            //LODOP.ADD_PRINT_TEXT(height+33,319,128,20,"填抽样员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 282, 58, 20, "录入员：");
                            //LODOP.ADD_PRINT_TEXT(height+33,514,115,20,"填录入员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 387, 57, 20, "复核员：");
                            //LODOP.ADD_PRINT_TEXT(height+33,684,105,20,"填复核员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 509, 58, 20, "审核员：");
                            //LODOP.ADD_PRINT_TEXT(height+33,854,138,20,"填审核员");
                            j=0;
                            page++;
                            LODOP.ADD_PRINT_TEXT(1000,23,40,20,"第"+page+"页");
                            LODOP.ADD_PRINT_TEXT(1000,70,49,20,"总"+pageCount+"页");
                            LODOP.NewPage();
                        }
                    }
                }

            }
        },
        initYLDataForKpd:function(){
            if(!checkPrint()){
                return;
            }
            fpqdtjModels = $.parseJSON(_$("span[id='fpqdtjModels']").text());
            dylx = _$("#pniddy").val();
            if (fpqdtjModels == null || (dylx != 1 && fpqdtjModels.length == 0)){
                alert('对不起，没有数据不能打印');
                return false;
            } else {
                this.initPrintDataForKpd(true,dylx);
                //return false;
                LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 900, 1000, "");
                LODOP.SET_SHOW_MODE("HIDE_PBUTTIN_PREVIEW", 1);
                //打印设计LODOP.PRINT_DESIGN();
                //打印预览
                LODOP.PREVIEW();
            }
        },
        printfpForKpd : function(){
            fpqdtjModels = $.parseJSON(_$("span[id='fpqdtjModels']").text());
            dylx = _$("#pniddy").val();
            if (fpqdtjModels == null || (dylx != 1 && fpqdtjModels.length == 0)){
                alert('对不起，没有数据不能打印');
                return false;
            }else{
                this.initPrintDataForKpd(true,dylx);
                LODOP.PRINT();
            }
        },
        initPrintDataForKpd : function(yl,dylx){
            datedy = _$("#kprq").val();
            dzdh = _$("#dzdh").val();
            strtest = datedy.split("-");
            var dyyear = strtest[0];
            var dymonth = strtest[1];
            //获取当前时间
            var mydate = new Date();
            var myYear = mydate.getFullYear();//年
            var myMonth = mydate.getMonth() + 1;//月0-11
            var myDay = mydate.getDate();//日
            var pnid = _$("#pnidtt").text();
            //var fpqdtjmodelzb = fpqdtjModels;
            var fpqdtjmodelzbt = fpqdtjModels[0];
            var fpqdtjModel = fpqdtjModels[1];
            var fplxdm = fpqdtjModels[2];
            // dylx = $("input[name='pnidtt']:checked").val();
            //var dylx=2;
            //表格名称
            var tablename;
            var tpname;
            if(fplxdm == "004"){
                tablename = "专用发票";
                tpname = "专用增值税发票";
            }else if(fplxdm == "007"){
                tablename = "普通发票";
                tpname = "普通增值税发票";
            }else if(fplxdm == "026"){
                tablename = "电子发票";
                tpname = "普通增值税发票(电子)";
            }else if(fplxdm == "025"){
                tablename = "卷式发票";
                tpname = "普通增值税发票(卷式)";
            }else if(fplxdm =="005"){
            	tablename = "机动车发票";
                tpname = "机动车销售统一发票";
            }

            var str = "";
            if (dylx == 1) {
                str = tpname+"汇总表(" + dyyear + "年" + dymonth + "月)";
            } else if (dylx == 2) {
                str = "正数发票清单(" + dyyear + "年" + dymonth + "月)";
            } else if (dylx == 3) {
                str = "负数发票清单(" + dyyear + "年" + dymonth + "月)";
            } else if (dylx == 4) {
                str = "正数发票废票清单(" + dyyear + "年" + dymonth + "月)";
            } else if (dylx == 5) {
                str = "负数发票废票清单(" + dyyear + "年" + dymonth + "月)";
            } else if(dylx == 6) {
                str = "空白发票废票清单(" + dyyear + "年" + dymonth + "月)";
            }
            nsrshh = _$("#nsrshh").val();
            qyname = _$("#qyname").val();
            kpry=_$("#kpry").val();
            czylx=_$("#kpr_czylx").val();
            czydm=_$("#kpr_czydm").val();
            if (dylx == 1) {
                LODOP.PRINT_INITA("1.3mm","-2.59mm","210.11mm","297.1mm",tablename+"汇总表");
                LODOP.SET_PRINT_PAGESIZE(1,2100,2970,"CreateCustomPage");
                LODOP.ADD_PRINT_TEXT(58,187,300,43,tablename+"汇总表");
                LODOP.SET_PRINT_STYLEA(0,"FontSize",18);
                LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
                LODOP.SET_PRINT_STYLEA(0,"Horient",2);
                LODOP.ADD_PRINT_TEXT(111,82,70,20,"制表日期：\n");
                LODOP.ADD_PRINT_TEXT(131,82,70,20,"所属期间：");
                LODOP.ADD_PRINT_TEXT(151,82,122,20,tablename+"统计表：");
                //LODOP.ADD_PRINT_TEXT(171,82,131,20,tpname+"汇总表");
                LODOP.ADD_PRINT_TEXT(171,82,300,20,str);
                LODOP.ADD_PRINT_TEXT(191,82,94,20,"纳税人登记号：");
                LODOP.ADD_PRINT_TEXT(211,82,70,20,"企业名称：");
                LODOP.ADD_PRINT_TEXT(231,82,70,20,"地址电话：");
                if(czylx == 0){LODOP.ADD_PRINT_TEXT(251,82,94,20,"开票人：");}
                LODOP.ADD_PRINT_TEXT(111,149,95,20,myYear + "年" + myMonth + "月" + myDay + "日");
                LODOP.ADD_PRINT_TEXT(131,149,95,20,dymonth + "月份~~" + dymonth + "月");
                LODOP.ADD_PRINT_TEXT(151,190,38,20,"1-0" + dylx);
                //LODOP.ADD_PRINT_TEXT(171,213,100,20,"("+dyyear+"年"+dymonth+"月)");
                LODOP.ADD_PRINT_TEXT(191,176,137,20,nsrshh);
                LODOP.ADD_PRINT_TEXT(211,152,400,20,qyname);
                LODOP.ADD_PRINT_TEXT(231,152,400,20,dzdh);
                if(czylx == 0){
                     if(kpry == -1){
                         LODOP.ADD_PRINT_TEXT(251,176,137,20,czydm);
                      }else{
                         LODOP.ADD_PRINT_TEXT(251,176,137,20,kpry);
                                  }
                         LODOP.ADD_PRINT_LINE(272,82,271,582,0,2);
                         LODOP.ADD_PRINT_TEXT(280,82,145,20,"★  发票领用存情况  ★");
                  }else{
                         LODOP.ADD_PRINT_LINE(262,82,261,582,0,2);
                         LODOP.ADD_PRINT_TEXT(272,82,145,20,"★  发票领用存情况  ★");
                        }
                LODOP.ADD_PRINT_TEXT(297,82,85,20,"正数发票份数");
                LODOP.ADD_PRINT_TEXT(317,82,85,20,"负数发票份数");
                LODOP.ADD_PRINT_TEXT(337,82,85,20,"空废发票份数");
                LODOP.ADD_PRINT_TEXT(297,167,85,20,_$("#zsfpfs").text());
                LODOP.ADD_PRINT_TEXT(317,167,85,20,_$("#fsfpfs").text());
                LODOP.ADD_PRINT_TEXT(337,167,85,20,_$("#kffpfs").text());
                LODOP.ADD_PRINT_TEXT(297,232,85,20,"正数废票份数");
                LODOP.ADD_PRINT_TEXT(317,232,85,20,"负数废票份数");
                LODOP.ADD_PRINT_TEXT(337,232,85,20,"合计发票份数");
                LODOP.ADD_PRINT_TEXT(297,317,85,20,_$("#zffpfs").text());
                LODOP.ADD_PRINT_TEXT(317,317,85,20,_$("#fffpfs").text());
                LODOP.ADD_PRINT_TEXT(337,317,85,20,_$("#hjfs").text());
                LODOP.ADD_PRINT_LINE(368,82,367,582,0,2);
                LODOP.ADD_PRINT_TEXT(378,82,105,20,"★  销项情况  ★");
                LODOP.ADD_PRINT_TEXT(398,82,88,20,"金额单位：元");

                //序号框宽度
                var xhwidth = 37;
                //项目名称宽度
                var xmmcwidth = 85;
                //表格总体宽度设置
                var tablewidth = 630;

                //序号_及项目名称外其它等宽_序号不是传过来的，是循环出来的
                var widthcl = parseInt(Number((tablewidth - xhwidth - xmmcwidth) / Number(fpqdtjmodelzbt.length - 1)));
                //头部左边距
                var headleft = 82;
                //头部内容左边距
                var headtextleft = 85;
                //头部上边距
                var headtop = 428;
                //头部内容上边距
                var headtexttop = 433;
                //外框与文本框之间的左边距
                var paddingleft = 10;
                for (var x = 0; x <= fpqdtjmodelzbt.length; x++) {
                    if (x == 0) {
                        LODOP.ADD_PRINT_RECT(headtop, headleft, 37, 30, 0, 1);
                        LODOP.ADD_PRINT_TEXT(headtexttop, headtextleft, 35, 20, "序号");
                        headleft = headleft + xhwidth;
                        headtextleft = headleft + paddingleft;
                    } else if(x == 1){
                        LODOP.ADD_PRINT_RECT(headtop, headleft, 85, 30, 0, 1);
                        LODOP.ADD_PRINT_TEXT(headtexttop, headtextleft, 81, 20, fpqdtjmodelzbt[x - 1]);
                        headleft = headleft + xmmcwidth;
                        headtextleft = headleft + paddingleft;
                    } else {
                        LODOP.ADD_PRINT_RECT(headtop, headleft, widthcl, 30, 0, 1);
                        LODOP.ADD_PRINT_TEXT(headtexttop, headtextleft, 60, 20, fpqdtjmodelzbt[x - 1]);
                        headleft = headleft + widthcl;
                        headtextleft = headleft + paddingleft;
                    }
                }

                var inittop = headtop + 30;
                var oldinittop = inittop;
                var initleft = 82;
                var oldleft = 82;
                //文字框上边界
                //var texttop = 442;
                var texttop = inittop + 12;
                var oldtexttop = texttop;
                //文字框左边界
                var textleft = 87;
                var oldtextleft = 87;
                //TODO : 循环行
                for (var i = 0; i < fpqdtjModel.length; i++) {
                    //TODO : 循环列
                    var testdemo = fpqdtjModel[i].columnNameModelList;
                    initleft = oldleft;
                    textleft = oldtextleft;
                    for (var j = 0; j <= testdemo.length; j++) {
                        if (j == 0) {
                            //TODO : 上,左,宽，高
                            LODOP.ADD_PRINT_RECT(inittop, initleft, 37, 30, 0, 1);
                            LODOP.ADD_PRINT_TEXT(texttop, textleft, 35, 20, i + 1);
                            initleft = initleft + xhwidth;
                            textleft = initleft + 5;
                        } else if(j == 1){
                            var str = testdemo[j - 1].columnVal;
                            //TODO : 上   ，  左   ， 宽 ， 高
                            LODOP.ADD_PRINT_RECT(inittop, initleft, 85, 30, 0, 1);
                            LODOP.ADD_PRINT_TEXT(texttop, textleft, 81, 20, str);
                            initleft = initleft + xmmcwidth;
                            textleft = initleft + 5;
                        }else {
                            var str = testdemo[j - 1].columnVal;
                            //TODO : 上   ，  左   ， 宽 ， 高
                            LODOP.ADD_PRINT_RECT(inittop, initleft, widthcl, 30, 0, 1);
                            if(str.length * 9 > widthcl){
                                LODOP.ADD_PRINT_TEXT(texttop-8, textleft, widthcl - 3, 20, str);
                                LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
                            }else{
                                LODOP.ADD_PRINT_TEXT(texttop, textleft, widthcl - 3, 20, str);
                            }
                            initleft = initleft + widthcl;
                            textleft = initleft + 5;
                        }
                    }
                    inittop += 30;
                    texttop = inittop + 12;
                }
            } else {

                var fpqdtjModel = fpqdtjModels[1];

                //宽210.1mm高297.1mm
                LODOP.PRINT_INITA("1.3mm", "-2.6mm", "210.1mm", "297.1mm",tablename+"汇总表");
                // LODOP.SET_PRINT_PAGESIZE(1, 2970, 2100, "CreateCustomPage");
                LODOP.SET_PRINT_PAGESIZE(1, 2100,2900,"CreateCustomPage");
                LODOP.ADD_PRINT_TEXT(32, 265, 206, 40, tablename+"明细表");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
                LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
                LODOP.ADD_PRINT_TEXT(78, 23, 73, 20, "制表日期：\n\n");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(104, 23, 122, 20, tablename+"统计表：");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(130, 23, 300, 20, str);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(155, 23, 110, 20, "纳税人登记号：");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(179, 23, 72, 20, "企业名称：");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(204, 23, 72, 20, "地址电话：");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);             
                if(czylx == 0){ 
                	LODOP.ADD_PRINT_TEXT(229, 23, 72, 20, "开票人：");
                    LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                    LODOP.ADD_PRINT_TEXT(229, 217, 2140, 20, "金额单位：元");
                    LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                  }else{
                	  LODOP.ADD_PRINT_TEXT(226, 23, 100, 20, "金额单位：元");
                      LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                  }
                //填制表日期
                LODOP.ADD_PRINT_TEXT(78, 105, 407, 20, myYear + "年" + myMonth + "月" + myDay + "日");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(104, 131, 405, 20, "1-0" + dylx);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                // LODOP.ADD_PRINT_TEXT(130,192,379,20,"填正数发票清单表");
                LODOP.ADD_PRINT_TEXT(155, 135, 882, 20,nsrshh);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(179, 95, 929, 20, qyname);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(204, 97, 925, 20, dzdh);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                if(czylx == 0){
               	 if(kpry == -1){
               		 LODOP.ADD_PRINT_TEXT(229, 97, 925, 20,czydm);
                        LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
               	 }else{
               		 LODOP.ADD_PRINT_TEXT(229, 97, 925, 20,kpry);
                        LODOP.SET_PRINT_STYLEA(0,"ItemType",1); 
               	 }           	
               }


                LODOP.ADD_PRINT_RECT(252,26,37,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,62,65,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,126,89,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,214,70,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,283,74,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,356,136,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,492,104,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,596,104,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_RECT(252,699,34,29,0,1);
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(258,29,36,20,"序号");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(258,65,60,20,"发票种类");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(258,142,60,20,"类别代码");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(258,217,65,20,"发票号码");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(258,288,63,20,"开票日期");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(258,360,131,20,"购方税号");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(258,494,100,20,"合计金额");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(256,595,100,20,"合计税额");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
                LODOP.ADD_PRINT_TEXT(256,702,36,20,"税率");
                LODOP.SET_PRINT_STYLEA(0,"ItemType",1);


                var page=0;
                var j = 0;
                var pageCount =Math.ceil(fpqdtjModel.length/24) ;
                if (fpqdtjModel.length > 0) {
                    for (var i = 0; i < fpqdtjModel.length; i++) {
                        //边框

                        LODOP.ADD_PRINT_RECT(280+ (28 * j ),26,37,29,0,1);
                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),62,65,29,0,1);
                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),126,89,29,0,1);

                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),214,70,29,0,1);

                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),283,74,29,0,1);
                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),356,136,29,0,1);
                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),492,104,29,0,1);
                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),596,104,29,0,1);
                        LODOP.ADD_PRINT_RECT(280+ (28 * j  ),699,34,29,0,1);

                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),29,36,20,i+1);
                        //填发票种类
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),65,60,20,fpqdtjModel[i].fplxdmmc);
                        //填发票号码
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),132,85,20,fpqdtjModel[i].fpdm);
                        //填发票号码
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),217,65,20,fpqdtjModel[i].fphm);
                        //填开票日期
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),288,63,20,fpqdtjModel[i].kprq);
                        //填购房税号
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),360,131,20,fpqdtjModel[i].ghdwsbh);
                        //填合计金额
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),496,100,20,fpqdtjModel[i].hjje);
                        //填税额
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),601,100,20,fpqdtjModel[i].hjse);
                        //填率
                        LODOP.ADD_PRINT_TEXT(286+ (28 * j  ),702,36,20,fpqdtjModel[i].sl);
                        j++;

                        if(i==fpqdtjModel.length-1 && i%24!=0){
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 23, 65, 20, "填表人：");

                            //LODOP.ADD_PRINT_TEXT(height+33,131,131,20,"填表人姓名");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 164, 61, 20, "抽样员：");

                            //LODOP.ADD_PRINT_TEXT(height+33,319,128,20,"填抽样员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 282, 58, 20, "录入员：");

                            //LODOP.ADD_PRINT_TEXT(height+33,514,115,20,"填录入员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 387, 57, 20, "复核员：");

                            //LODOP.ADD_PRINT_TEXT(height+33,684,105,20,"填复核员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 509, 58, 20, "审核员：");


                            page++;
                            LODOP.ADD_PRINT_TEXT(1000,23,40,20,"第"+page+"页");
                            LODOP.ADD_PRINT_TEXT(1000,70,49,20,"总"+pageCount+"页");
                        }else if(i%23==0&&i!=0){
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 23, 65, 20, "填表人：");
                            //LODOP.ADD_PRINT_TEXT(height+33,131,131,20,"填表人姓名");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 164, 61, 20, "抽样员：");

                            //LODOP.ADD_PRINT_TEXT(height+33,319,128,20,"填抽样员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 282, 58, 20, "录入员：");
                            //LODOP.ADD_PRINT_TEXT(height+33,514,115,20,"填录入员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 387, 57, 20, "复核员：");
                            //LODOP.ADD_PRINT_TEXT(height+33,684,105,20,"填复核员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 509, 58, 20, "审核员：");
                            //LODOP.ADD_PRINT_TEXT(height+33,854,138,20,"填审核员");
                            j=0;
                            page++;
                            LODOP.ADD_PRINT_TEXT(1000,23,40,20,"第"+page+"页");
                            LODOP.ADD_PRINT_TEXT(1000,70,49,20,"总"+pageCount+"页");
                            LODOP.NewPage();

                        }else if(i==0&&i==(fpqdtjModel.length-1)){
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 23, 65, 20, "填表人：");
                            //LODOP.ADD_PRINT_TEXT(height+33,131,131,20,"填表人姓名");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 164, 61, 20, "抽样员：");

                            //LODOP.ADD_PRINT_TEXT(height+33,319,128,20,"填抽样员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 282, 58, 20, "录入员：");
                            //LODOP.ADD_PRINT_TEXT(height+33,514,115,20,"填录入员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 387, 57, 20, "复核员：");
                            //LODOP.ADD_PRINT_TEXT(height+33,684,105,20,"填复核员");
                            LODOP.ADD_PRINT_TEXT(286+ (28 * j  ), 509, 58, 20, "审核员：");
                            //LODOP.ADD_PRINT_TEXT(height+33,854,138,20,"填审核员");
                            j=0;
                            page++;
                            LODOP.ADD_PRINT_TEXT(1000,23,40,20,"第"+page+"页");
                            LODOP.ADD_PRINT_TEXT(1000,70,49,20,"总"+pageCount+"页");
                            LODOP.NewPage();
                        }
                    }
                }

            }
        },
        exportExcel:function(){
            var op = {
                form:_$('form[rel]'),
                fileName:"多税号统计导出",
                param:[{name:"header",value:"开票日期@发票代码@发票号码@合计金额@税额@价税合计@购方单位名称@购方单位代码@主要商品名称@开票人"},
                    {name:"headerAtt",value:"kprq@fpdm@fphm@hjje@se@jshj@ghdwmc@ghdwdm@zyspmc@kpr"}]
            }
            exportExcel(op)
        }
    }
}();


function checkPrint() {
    if (LODOP==null||typeof(LODOP.VERSION)=="undefined"||LODOP.VERSION!='6.1.9.8'){
        alertMsg.confirm("尚未安装打印控件或者不是最新版本，点击确定下载？", {
            okCall: function(){
                window.open(ctxPath+"/resources/download/install_ZCSBprintControl32.exe");
            }
        });
        return false;
    }else{
        LODOP.SET_LICENSES("ZCSB技术处研发中心","545C44BD459DBBAFB79F18A0F8160A12","","");
        return true;
    }
}
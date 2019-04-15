var zzp_xfHzsqd = function() {
	var nowRowCount, szsmStr, sfhs, scsm, isMulti, leng, myse;
	return {
		addRow : function(p) {
			if (nowRowCount == 7) {
				disableButtons(_$("#add"));
			}
			enableButtons(_$("#del"));
			nowRowCount++;
			var tr = _$("<tr index='"+nowRowCount+"'><td><input name='spmc_"+nowRowCount
			+"' id='spmc_"+nowRowCount+"' type='text' style='width:163px;' maxlength='72' readonly='readonly'/></td>"
						+ "<td><input name='spdj_"+nowRowCount+"' id='spdj_"+nowRowCount
			+"' type='text' style='width:116px;text-align:right' maxlength='13' readonly='readonly'/></td>"
						+ "<td><input name='spsl_"+nowRowCount+"' id='spsl_"+nowRowCount
			+"' type='text' style='width:75px;text-align:right' maxlength='13' readonly='readonly'/></td>"
						+ "<td><input name='je_"+nowRowCount+"' id='je_"+nowRowCount
			+"' type='text' style='width:116px;text-align:right' maxlength='16' readonly='readonly'/></td>"
					+ "<td><input name='sl_"
					+ nowRowCount
					+ "' id='sl_"
					+ nowRowCount
					+ "' type='text' style='width:54px;text-align:left' readonly='readonly'></td>"
					+ "<td><input name='se_"
					+ nowRowCount
					+ "' id='se_"
					+ nowRowCount
					+ "' type='text' style='width:134px;text-align:right' readonly='readonly'/>"
					+ "<input id='hsbz_"
					+ nowRowCount
					+ "' name='hsbz_"
					+ nowRowCount
					+ "' "
					+ "value='"
					+ (sfhs ? "y" : "n")
					+ "' type='hidden'/></td></tr>");
			_$("#fyxmdiv tr[placeholder]:first").before(tr).remove();
			limit_money_input(_$("#spsl_" + nowRowCount + ",#spdj_"
					+ nowRowCount + ",#je_" + nowRowCount));
			if (p != "not_focus") {
				reFocus(_$("#spmc_" + nowRowCount)[0]);
			}
		},
		tk : function(sel) {
			_$("#sqlsh").val(sel.attr("sqlsh"));
			_$("#sqfs").val(sel.attr("sqfs"));
			var sqlx=sel.attr("sqyy");
			if(sqlx=="0"){
				_$("#sqf1").attr("checked", "checked");
				_$("#sqlx0").attr("checked", "checked");
				_$("#wdk").removeAttr("checked");
				_$("#sqf2").removeAttr("checked");
			}else if(sqlx=="1"){
				_$("#sqf1").attr("checked", "checked");
				_$("#wdk").attr("checked", "checked");
				_$("#sqlx0").removeAttr("checked");
				_$("#sqf2").removeAttr("checked");
			}else if(sqlx=="2"){
				_$("#sqf2").attr("checked", "checked");
				_$("#sqf1").removeAttr("checked");
				_$("#sqlx0").removeAttr("checked");
				_$("#wdk").removeAttr("checked");
			}
			if(sel.attr("clbz")=="2"){
				_$("#hzdd0").hide();
				_$("#hzdd2").hide();
				_$("#fpdm_s").val(sel.attr("lzfpdm"));
				_$("#fphm_s").val(sel.attr("lzfphm"));
				_$("#savebtn").attr("style", "display:none;");
				_$("#scbtn").attr("style", "display:none;");
				//_$("#bhdiv").attr("style", "display:none;");
				zzp_xfHzsqd.xyb();
			}else{
			_$("#hzdd0").hide();
			_$("#hzdd2").hide();
			_$("#hzdd_spbm1").show();
			_$("#fpdm_s").val(sel.attr("lzfpdm"));
			_$("#fphm_s").val(sel.attr("lzfphm"));
			_$("#fpdm_s").attr("readonly", "readonly");
			_$("#fphm_s").attr("readonly", "readonly");
			}
		},
		xyb : function() {
			ajaxLoad(ctxPath + "/xfHzsqd/sqdjy.do", _$("#hzsqd_form")
					.serialize(), function(json) {
				_$("#hzdd_spbm1").hide();
				_$("#hzdd3").show();
				_$("#kprq").text(json.kprq);
				_$("#jbr").text(json.jbr);
				_$("#swjgmc").val(json.swjgmc);
				_$("#qsqdh").text(json.sqdh);
				_$("#fpdm").text(json.fpdm);
				_$("#fphm").text(json.fphm);
				_$("#insqlsh").val(json.sqlsh);
				_$("#insqfs").val(json.sqfs);
				var sqlx=json.sqlx;
				_$("#insqlx").val(sqlx);
				if(sqlx=="0"){
					_$("#sqlxRadio").attr("checked", "checked");
					_$("#sqlxRadio0").attr("checked", "checked");
					_$("#sqlxRadio1").removeAttr("checked");
					_$("#sqlxRadio2").removeAttr("checked");
				}else if(sqlx=="1"){
					_$("#sqlxRadio").attr("checked", "checked");
					_$("#sqlxRadio1").attr("checked", "checked");
					_$("#sqlxRadio0").removeAttr("checked");
					_$("#sqlxRadio2").removeAttr("checked");
				}else if(sqlx=="2"){
					_$("#sqlxRadio2").attr("checked", "checked");
					_$("#sqlxRadio").removeAttr("checked");
					_$("#sqlxRadio0").removeAttr("checked");
					_$("#sqlxRadio1").removeAttr("checked");
				}
				zzp_xfHzsqd.cxHtSqd(json);

			});
		},
		cxHtSqd : function(args) {
			if(args.zsfs=="1"||args.zsfs=="2"){
				disableButtons(_$("#price"));
			}
			if(args.zdbz=="0"){
				disableButtons(_$("#save"));
			}
			if(args.zdbz=="1"){
				disableButtons(_$("#scb"));
			}
			if(args.zdbz=="2"){
				disableButtons(_$("#save"));
				disableButtons(_$("#scb"));
				//disableButtons(_$("#bhbtn"));
			}
			var sqdmx = args.yfpmx;
			var fpmxzbs = args.fpmxzbs;
			if (fpmxzbs != null) {
				leng = fpmxzbs.length;
				isMulti = sqdmx.isMutiRate;
			} else {
				zzp_xfHzsqd.reDeal(args);
				_$("#ghdwmc").val(args.ghdwmc);
				_$("#ghdwdm").val(args.ghdwdm);
				_$("#ghdwmc").attr("readonly", "readonly");
				_$("#ghdwdm").attr("readonly", "readonly");
				return;
			}
			zzp_xfHzsqd.reDeal(args);
			for ( var i = 1; i <= fpmxzbs.length; i++) {
				zzp_xfHzsqd.addRow("not_focus");
				var mx = fpmxzbs[i - 1];
				_$("#spmc_" + i).val(mx.spmc);
				if (mx.spsl == null || mx.spsl == "") {
					_$("#spsl_" + i).val("");
				} else {
					if (""==args.sqlsh||(args.sqlx=="2"&&args.sqfs=="0")) {
						_$("#spsl_" + i).val(delRight(-mx.spsl + ""));
					}else{
						_$("#spsl_" + i).val(delRight(mx.spsl + ""));
					}
				}

				var spdj = _$("#spdj_" + i);
				if (mx.spdj == null || mx.spdj == "") {
					spdj.val("");
				} else {
					spdj.val(mx.spdj);
				}
				if (""==args.sqlsh) {
					_$("#je_" + i).val((-mx.je).toFixed(2));
					_$("#se_" + i).val((-mx.se).toFixed(2));
				}else{
					_$("#je_" + i).val((mx.je).toFixed(2));
					_$("#se_" + i).val((mx.se).toFixed(2));
				}
				if(mx.sl!=null&&mx.sl!=""&&mx.sl!="99.01"){
					_$("#sl_" + i).val(mx.sl*100+"%");
					_$("#sl_" + i).attr("sl", mx.sl);
				}else{
					_$("#sl_" + i).val("");
					_$("#sl_" + i).attr("sl", 0);
				}
				_$("#hsbz_" + i).val("n");
			}
			_$("#xxbbh").val(sqdmx.xxbbh== null ? "" : sqdmx.xxbbh);
			_$("#xhdwmc").val(sqdmx.xhdwmc);
			_$("#xhdwdm").val(sqdmx.xhdwsbh);
			_$("#ghdwmc").val(sqdmx.ghdwmc);
			_$("#ghdwdm").val(sqdmx.ghdwsbh);
			_$("#lxdh").val(sqdmx.lxfs);
			_$("#xhdwmc").attr("readonly", "readonly");
			_$("#xhdwdm").attr("readonly", "readonly");
			_$("#ghdwmc").attr("readonly", "readonly");
			_$("#ghdwdm").attr("readonly", "readonly");
			//_$("#lxdh").attr("readonly", "readonly");
			_$("#sqly").val(args.sqly);
			if(sqdmx.clbz=="2"){
				_$("#lxdh").attr("readonly", "readonly");
				_$("#sqly").attr("readonly", "readonly");
			}
			zzp_xfHzsqd.reCountHjje();
		},
		init : function() {
			disableButtons(_$("#del"));
			nowRowCount = 0, szsmStr = "", sfhs = false;
		},
		reDeal : function(args) {
			zzp_xfHzsqd.init();
			//变化输入框为文字显示购货方或销货方
			_$("#zsfs").val(args.zsfs);
			_$("#scsm").val(args.scsm);
			_$("#insqdh").val(args.sqdh);
			_$("#infpdm").val(args.fpdm);
			_$("#infphm").val(args.fphm);
			_$("#insqlx").val(args.sqlx);
			_$("#spsm").val(args.spsm);
			//生成占位行
			for ( var index = 1; index <= 8; index++) {
				_$("#fyxmdiv tr:last").prev().after(
						zzp_xfHzsqd.newPlaceHolder());
			}
		},
		newPlaceHolder : function() {
			return "<tr placeholder='y'><td/><td/><td/><td/><td/><td>"
					+ "<input type='text' style='visibility:hidden;' disabled='disabled'/></td></tr>";
		},
		shxz : function() {
			_$("hzdd3").hide();
			_$("#hzdd0").hide();
			_$("#hzdd_spbm1").hide();
			_$("#hzdd2").hide();
			_$("#hzdd4").show();

		},
		fh : function() {
			_$("#hzdd0").show();
			_$("#hzdd2").show();
			_$("#hzdd_spbm1").hide();
			_$("#hzdd3").hide();
			_$("#hzdd4").hide();
		},
		fhcx : function() {
			if(_$("#hzxxbTab").attr("tgornot")=="tg"){
				this.yshck();
			}else{
			_$("#hzdd0").show();
			_$("#hzdd2").show();
			_$("#hzdd_spbm1").hide();
			_$("#hzdd3").hide();
			_$("#hzdd4").hide();
			}
		},
		qx : function() {
			_$("#hzdd3").hide();
			_$("#hzdd2").show();
			_$(".searchBar").show();
		},
		hzxz : function() {
			var inputs = _$("#hzdd4 td input");
			location.href = ctxPath + "/hzsqd/shxz.do?kpsjq="
					+ inputs.eq(0).val() + "&kpsjz=" + inputs.eq(1).val()
					+ "&hzxxb=" + inputs.eq(2).val();
		},
		reCountHjje : function() {
			var hjje = 0, se = 0, jshj = 0;
			_$("#fyxmdiv :text[id^='je']").each(function() {
				hjje += $(this).val() * 1;
			});
			_$("#fyxmdiv :text[id^='se']").each(function() {
				se += $(this).val() * 1;
			});
			hjje += _$("#hjzkje").text() * 1;
			se += _$("#hjzkse").text() * 1;
			if (sfhs) {
				jshj = hjje.toFixed(2);
				hjje = jshj - se;
			} else {
				jshj = (hjje + se).toFixed(2);
			}
			_$("#hzhjje").text("￥" + hjje.toFixed(2));
			_$("#hzhjse").text("￥" + se.toFixed(2));
		},
		toggleSfhs : function() {
			if (sfhs) {
				sfhs = false;
				_$("#sfhsstr").text("金额(不含税)");
				_$("#djsfhsstr").text("单价(不含税)");
				_$("#fyxmdiv :text[id^='je']").each(function() {
					if (this.value != "") {
						var index = getIndex(this.id);
						this.value = (this.value - _$(
								"#se_" + index).val()).toFixed(2);
					}
				});
				_$("#fyxmdiv :text[id^='spdj']").each(function() {
					if (this.value != "") {
						var optDj = $(this).attr("optDj");
						if (optDj) {
							$(this).attr("optDj",
									this.value);
							this.value = optDj;
						} else {
							$(this).attr("optDj",
									this.value);
							var index = getIndex(this.id);
							this.value = delRight((this.value / (1 + _$("#sl_" + index).attr("sl") * 1)).toFixed(6));
						}
					}
				});
			} else {
				sfhs = true;
				_$("#sfhsstr").html("金额<span style='color:red'>(含税)</span>");
				_$("#djsfhsstr").html("单价<span style='color:red'>(含税)</span>");
				_$("#fyxmdiv :text[id^='je']").each(function() {
					if (this.value != "") {
						var index = getIndex(this.id);
						this.value = (this.value * 1 + _$(
								"#se_" + index).val() * 1)
								.toFixed(2);
					}
				});
				_$("#fyxmdiv :text[id^='spdj']").each(function() {
					if (this.value != "") {
						var optDj = $(this).attr("optDj");
						if (optDj) {
							$(this).attr("optDj",
									this.value);
							this.value = optDj;
						} else {
							$(this).attr("optDj",
									this.value);
							var index = getIndex(this.id);
							this.value = delRight((this.value * (1 + _$("#sl_" + index).attr("sl") * 1)).toFixed(6));
						}
					}
				});
			}
		},
		validateSqd : function() {
			if (nowRowCount == 0) {
				alert("请添加费用项目");
				zzp_xfHzsqd.addRow();
				return false;
			}
			var hzxxb_sq_sp_bhsm = $("#hzxxb_sq_sp_bhsm")[0];
			if (countStrLength(hzxxb_sq_sp_bhsm.value) > 240) {
				alert("驳回说明最多为240个字符或120个汉字");
				reFocus(hzxxb_sq_sp_bhsm);
				return false;
			}
			return true;
		},
		save : function() {
			var boo = zzp_xfHzsqd.validateSqly(true);
			if (boo) {
				ajaxLoad(ctxPath + "/xfHzsqd/save.do", _$("#hzsqd_sc_spbm_form").serialize(),function(json) {
					alertMsg.correct(json.message);	
				});
			}
		},
		reCountRow:function(index,changeDjSl){
			var sl = _$("#sl_"+index).val()*1;
			if(sfhs){
				_$("#se_"+index).val((_$("#je_"+index).val()*sl/(1+sl)).toFixed(2));
			}else{
				_$("#se_"+index).val((_$("#je_"+index).val()*sl).toFixed(2));
			}
			if(changeDjSl&&_$("#se_"+index).val()==0){
				_$("#se_"+index).val("0.00");
			}
			zzp_xfHzsqd.reCountHjje();
		},
		
		bh:function(){
			ajaxLoad(ctxPath + "/xfHzsqd/bh.do", _$("#hzsqd_sc_spbm_form").serialize(), function(json) {
				alertMsg.correct(json.message);
			});
		},
		openSpsmDlg : function(){
			$.pdialog.open(ctxPath+"/xfHzsqd/toXfHzxxbBh.do","zzp_xfHzxxbBh_dlg","驳回说明",{
				width:320,
				height:230,
				callback:function(){	
					$("#dlg_hzxxb_sq_bhsm_bt").click(function(){
						var boo = zzp_xfHzsqd.validateSqd();
						if (boo) {
						ajaxLoad(ctxPath + "/xfHzsqd/bh.do", {fpdm:_$("#infpdm").val(),fphm:_$("#infphm").val(),spsm:$("#hzxxb_sq_sp_bhsm").val(),sqlsh:_$("#insqlsh").val()}, function(json) {
							_$("#spsm").val(json.spsm);
							alertMsg.correct(json.message);
							$.pdialog.closeCurrent();
						});}
					});
					$("#hzxxb_sq_sp_bhsm").val(_$("#spsm").val());
				}
			});
		
		},
		validateSqly:function(){
			var lxdh = _$("#lxdh")[0];
			if (countStrLength(lxdh.value) > 30) {
				alert("联系电话最多为30个字符或15个汉字");
				reFocus(lxdh);
				return false;
			}
			var sqly = _$("#sqly")[0];
			if (countStrLength(sqly.value) > 400) {
				alert("申请理由最多为400个字符或200个汉字");
				reFocus(sqly);
				return false;
			}
			return true;
		},
		
		sc:function(){
			var boo = zzp_xfHzsqd.validateSqly();
			if (boo) {
				ajaxLoad(ctxPath + "/xfHzsqd/sc.do", _$("#hzsqd_sc_spbm_form").serialize(), function(json) {
					alertMsg.correct(json.message);
					if (json.message== "上传成功") {
						_$("#scbtn").attr("style", "display:none;");
						_$("#bhdiv").attr("style", "display:none;");
					}
				});
				
			}
		},
		dc:function(){
			var id=getDwzIds(_$("#hzdd2 .gridTbody"),"ids",true);
			if(id=="z=z"){
				alertMsg.error("没有选中任何数据!");
				return;
			}
			//location.href = ctxPath + "/hzsqd/dcsqd.do?"+id;
			ajaxLoad(ctxPath + "/xfHzsqd/dcsqdjy.do",id, function(json) {
				if(json.errormsg!=null){
					alertMsg.error(json.errormsg);
					return;
				}
				location.href = ctxPath + "/hzsqdspbm/dcsqd.do?ids="+json.sqdhs;
			});
		},
		dlt:function(){
			var id=getDwzIds(_$("#hzdd2 .gridTbody"),"ids",true);
			if(id=="z=z"){
				alertMsg.error("没有选中任何数据!");
				return;
			}
			alertMsg.confirm("确定删除？", {
                okCall: function(){
					ajaxLoad(ctxPath + "/xfHzsqd/dltsqdjy.do?"+id,{async:false}, function(json) {
						if(json.warningmsg!=null){
							alertMsg.confirm(json.warningmsg, {
				                okCall: function(){
				                	ajaxLoad(ctxPath + "/xfHzsqd/dltSqd.do?"+id,{async:false}, function(json) {
										if(json.message!=null){
											navTab.reload(ctxPath + "/xfHzsqd/init.do");
											alertMsg.correct(json.message);
										}
									});
				                }
				            });
		
						}else{
							ajaxLoad(ctxPath + "/xfHzsqd/dltSqd.do?"+id,{async:false}, function(json) {
								if(json.message!=null){
									navTab.reload(ctxPath + "/xfHzsqd/init.do");
									alertMsg.correct(json.message);
								}
							});
						}
					});
                }
            });
		},
		drawSqd:function(args){
			var sqdmx = args.yfpmx;
			_$("#kprq").text(args.kprq);
			_$("#jbr").text(sqdmx.jbrmc);
			_$("#qsqdh").text(sqdmx.sqdh);
			_$("#xxbbh").val(sqdmx.xxbbh== null ? "" : sqdmx.xxbbh);
			_$("#fpdm").text(sqdmx.fpdm == null ? "" : sqdmx.fpdm);
			_$("#fphm").text(sqdmx.fphm == null ? "" : sqdmx.fphm);
			_$("#ghdwmc").val(sqdmx.ghdwmc);
			_$("#ghdwdm").val(sqdmx.ghdwdm);
			_$("#xhdwmc").val(sqdmx.xhdwmc);
			_$("#xhdwdm").val(sqdmx.xhdwdm);
			isMulti=sqdmx.isMutiRate;
			leng=sqdmx.mxzb.length;
			zzp_xfHzsqd.reDeal(args);
			for(var i=1;i<=sqdmx.mxzb.length;i++){
				zzp_xfHzsqd.addRow();
				var mx = sqdmx.mxzb[i-1];
				_$("#spmc_"+i).val(mx.spmc);
				_$("#spsl_"+i).val(delRight(mx.spsl+""));
				var spdj = _$("#spdj_"+i);
				if(mx.hsbz){
					spdj.val((mx.spdj/(1+mx.sl)).toFixed(6)).attr("optDj",(mx.spdj).toFixed(6));
				}else{
					spdj.val((mx.spdj).toFixed(6)).attr("optDj",(mx.spdj*(1+mx.sl)));
				}
				spdj.val(delRight(spdj.val())).attr("optDj",delRight(spdj.attr("optDj")));
				_$("#je_"+i).val((mx.je).toFixed(2));
				
				if(isMulti=="1"){
					_$("<option></option>").appendTo(_$("#sl_" + i));
				}
				_$("#sl_"+i).val(mx.sl);
				_$("#se_"+i).val(mx.se.toFixed(2));
				_$("#hsbz_"+i).val(mx.hsbz?"y":"n");
			}
			zzp_xfHzsqd.reCountHjje();
		},
		dbclickht:function(){
			var sel=_$(".pageContent table tr.selected");
			var id = sel.attr("rel");
			ajaxLoad(ctxPath + "/xfHzsqd/drawedit.do?id="+id,{async:false}, function(json) {
				_$("#hzdd0").hide();
				_$("#hzdd2").hide();
				_$("#hzdd_spbm1").hide();
				_$("#hzdd3").show();
				zzp_xfHzsqd.drawSqd(json);

			})
		},
		printsqd:function(){
			var oneRowHeight = 18;
			var toAdd = (nowRowCount-1)*oneRowHeight;
			var cao=_$("#caoxxbbh").val();
			LODOP.PRINT_INITA(0,0,"210mm","297mm","红字申请单打印");
			LODOP.ADD_PRINT_TEXT(30,236,315,20,"开具红字增值税专用发票申请单");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
			LODOP.SET_PRINT_STYLEA(0,"Bold",1);
			LODOP.SET_PRINT_STYLEA(0,"Horient",2);
			LODOP.ADD_PRINT_TEXT(67,21,233,20,"填开日期："+_$("#kprq").text());
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_RECT(90,20,730,503+toAdd,0,1);
			LODOP.ADD_PRINT_RECT(90,20,730,60,0,1);
			LODOP.ADD_PRINT_RECT(150,20,730,79+toAdd,0,1);
			LODOP.ADD_PRINT_RECT(90,20,89,503+toAdd,0,1);
			LODOP.ADD_PRINT_RECT(90,109,117,34,0,1);
			LODOP.ADD_PRINT_RECT(90,226,167,34,0,1);
			LODOP.ADD_PRINT_RECT(123,109,117,27,0,1);
			LODOP.ADD_PRINT_RECT(90,393,76,60,0,1);
			LODOP.ADD_PRINT_RECT(90,468,117,34,0,1);
			LODOP.ADD_PRINT_RECT(123,468,117,27,0,1);
			LODOP.ADD_PRINT_RECT(90,584,166,34,0,1);
			LODOP.ADD_PRINT_TEXT(109,37,58,20,"销售方");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(98,120,98,20,"名       称");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(127,117,108,20,"税务登记代码");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(110,406,63,20,"购买方");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(98,481,98,20,"名       称");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(127,478,107,20,"税务登记代码");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			
			var xhdwmc = zzp_xfHzsqd.considerVal("xhdwmc");
			if(countStrLength(xhdwmc)<=20){
				LODOP.ADD_PRINT_TEXT(99,227,171,20,xhdwmc);
				LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			}else{
				LODOP.ADD_PRINT_TEXT(93,229,171,33,xhdwmc);
				LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
				LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-4);
			}
			LODOP.ADD_PRINT_TEXT(127,227,171,20,zzp_xfHzsqd.considerVal("xhdwdm"));
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			
			LODOP.ADD_PRINT_TEXT(127,588,172,20,zzp_xfHzsqd.considerVal("ghdwdm"));
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			
			var ghdwmc = zzp_xfHzsqd.considerVal("ghdwmc");
			if(countStrLength(ghdwmc)<=20){
				LODOP.ADD_PRINT_TEXT(98,588,168,20,ghdwmc);
				LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			}else{
				LODOP.ADD_PRINT_TEXT(93,588,168,36,ghdwmc);
				LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
				LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-4);

			}
			LODOP.ADD_PRINT_TEXT(158+toAdd/2,28,76,63,"开具红字专用发票内容");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(374,41,42,24,"说明");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(262+toAdd,130,129,19,"一、购买方");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.SET_PRINT_STYLEA(0,"Bold",1);
			LODOP.ADD_PRINT_TEXT(286+toAdd,141,315,19,"对应蓝字专用发票抵扣增值税销项税额情况");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(310+toAdd,205,84,19,"1、已抵扣");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(334+toAdd,205,84,19,"2、未抵扣");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(360+toAdd,205,302,19,"对应蓝字专用发票的代码：");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(360+toAdd,515,61,19,"号码：");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(386+toAdd,130,129,19,"二、销售方");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.SET_PRINT_STYLEA(0,"Bold",1);
			LODOP.ADD_PRINT_TEXT(412+toAdd,205,302,19,"对应蓝字专用发票的代码：");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(412+toAdd,515,61,19,"号码：");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_LINE(470+toAdd,21,470+toAdd,750,0,1);
			var checks = [];
			_$("#sqlx_td :radio").each(function(){
				checks.push($(this).attr("checked")?"√":"　");
			})
			LODOP.ADD_PRINT_TEXT(262+toAdd,220,25,20,checks[0]);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
			LODOP.SET_PRINT_STYLEA(0,"TextFrame",5);
			LODOP.ADD_PRINT_TEXT(309+toAdd,280,25,20,checks[1]);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
			LODOP.SET_PRINT_STYLEA(0,"TextFrame",5);
			LODOP.ADD_PRINT_TEXT(333+toAdd,280,25,20,checks[2]);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
			LODOP.SET_PRINT_STYLEA(0,"TextFrame",5);
			LODOP.ADD_PRINT_TEXT(386+toAdd,220,25,20,checks[3]);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
			LODOP.SET_PRINT_STYLEA(0,"TextFrame",5);
			//LODOP.ADD_PRINT_TEXT(643+toAdd,303,442,24,_$("#sqly").val());
			//LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(488+toAdd,39,70,96,"红字专用发票信息表编号");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(517+toAdd,178,740,20,_$("#xxbbh").val());
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(605+toAdd,48,199,19,"经办人："+_$("#jbr").text());
			LODOP.SET_PRINT_STYLEA(0,"FontSize",10.6);
			LODOP.ADD_PRINT_TEXT(605+toAdd,200,204,19,"负责人：");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",10.6);
			LODOP.ADD_PRINT_TEXT(605+toAdd,366,740,19,"主管税务机关名称<印章>："+_$("#swjgmc").val());
			LODOP.SET_PRINT_STYLEA(0,"FontSize",10.6);
			LODOP.ADD_PRINT_LINE(376+toAdd,385,376+toAdd,511,0,1);
			LODOP.ADD_PRINT_LINE(376+toAdd,550,376+toAdd,675,0,1);
			LODOP.ADD_PRINT_LINE(428+toAdd,385,428+toAdd,511,0,1);
			LODOP.ADD_PRINT_LINE(428+toAdd,550,428+toAdd,675,0,1);
			if(checks[0]=="√"){
				LODOP.ADD_PRINT_TEXT(360+toAdd,395,228,19,_$("#fpdm").text());
				LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
				LODOP.ADD_PRINT_TEXT(360+toAdd,560,228,19,_$("#fphm").text());
				LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			}else{
				LODOP.ADD_PRINT_TEXT(412+toAdd,395,228,19,_$("#fpdm").text());
				LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
				LODOP.ADD_PRINT_TEXT(412+toAdd,560,228,19,_$("#fphm").text());
				LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			}
			LODOP.ADD_PRINT_LINE(623+toAdd,535,623+toAdd,740,0,1);
			LODOP.ADD_PRINT_TEXT(632+toAdd,20,740,19,"注：1.本通知单一式三联：第一联，申请方主管税务机关留存；第二联，申请方送交方留存；第三联，申请方留存。");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",10.6);
			LODOP.ADD_PRINT_TEXT(655+toAdd,47,640,19,"2.通知单应与申请单一一对应。");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",10.6);
			LODOP.ADD_PRINT_LINE(228+toAdd,268,150,268,0,1);
			LODOP.ADD_PRINT_LINE(228+toAdd,339,150,339,0,1);
			LODOP.ADD_PRINT_LINE(228+toAdd,427,150,427,0,1);
			LODOP.ADD_PRINT_LINE(228+toAdd,549,150,549,0,1);
			LODOP.ADD_PRINT_LINE(228+toAdd,608,150,608,0,1);
			LODOP.ADD_PRINT_LINE(177,109,177,750,0,1);
			LODOP.ADD_PRINT_TEXT(154,114,153,20,"货物或应税劳务名称");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(154,284,43,20,"数量");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(154,363,42,20,"单价");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(154,470,42,20,"金额");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(154,562,42,20,"税率");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(154,658,43,20,"税额");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(208+toAdd,161,43,20,"合计");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(208+toAdd,287,48,20,"----");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(208+toAdd,364,46,20,"----");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(208+toAdd,432,115,20,_$("#hzhjje").text());
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
			LODOP.ADD_PRINT_TEXT(208+toAdd,561,40,20,"----");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(208+toAdd,623,125,20,_$("#hzhjse").text());
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
			
			for(var i=0;i<nowRowCount;i++){
				var spmc = _$("#spmc_"+(i+1)).val();
				if(countStrLength(spmc)<=22){
					LODOP.ADD_PRINT_TEXT(182+i*oneRowHeight,112,163,15,spmc);
					LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
				}else{
					LODOP.ADD_PRINT_TEXT(178+i*oneRowHeight,112,163,20,spmc);
					LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
					LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-4);
				}
				LODOP.ADD_PRINT_TEXT(182+i*oneRowHeight,266,71,15,_$("#spsl_"+(i+1)).val());
				LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
				LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
				var dj = _$("#spdj_"+(i+1));
				var realDj = dj.val();
				if(realDj!=""&&sfhs!=(_$("#hsbz_"+(i+1)).val()=="y")){
					realDj = dj.attr("optDj");
				}
				LODOP.ADD_PRINT_TEXT(182+i*oneRowHeight,338,86,15,realDj);
				LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
				LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
				var realJe = _$("#je_"+(i+1)).val();
				realJe = sfhs?realJe-_$("#se_"+(i+1)).val():realJe*1;
				LODOP.ADD_PRINT_TEXT(182+i*oneRowHeight,435,112,15,realJe.toFixed(2));
				LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
				LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
				if(_$("#zsfs").val()=="2"||_$("#zsfs").val()=="1"){
					LODOP.ADD_PRINT_TEXT(182+i*oneRowHeight,549,58,15,"***");
				}else{
					LODOP.ADD_PRINT_TEXT(182+i*oneRowHeight,549,58,15,_$("#sl_"+(i+1)).val());
				}
				LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
				LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
				LODOP.ADD_PRINT_TEXT(182+i*oneRowHeight,613,135,15,_$("#se_"+(i+1)).val());
				LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
				LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
			}
			LODOP.PREVIEW();
		},
		dy:function(){
			var boo = zzp_xfHzsqd.validateSqly(true);
			if (boo) {
				zzp_xfHzsqd.printsqd();
			}
		},
		considerVal:function(a){
			var ele = _$("#"+a);
			var title = ele.attr("title");
			return title?title:ele.val();
		}
	}
}();
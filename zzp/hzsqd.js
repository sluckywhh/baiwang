var zzp_hzsqd = function() {
	var nowRowCount, szsmStr, sfhs, scsm, isMulti, leng, myse;
	return {
		addRow : function(p) {
			if (nowRowCount == 7) {
				disableButtons(_$("#add"));
			}
			enableButtons(_$("#del"));
			nowRowCount++;
			var tr = _$("<tr index='"+nowRowCount+"'><td><input name='spmc_"+nowRowCount
			+"' id='spmc_"+nowRowCount+"' style='width:163px;' maxlength='72'/></td>"
						+ "<td><input name='spdj_"+nowRowCount+"' id='spdj_"+nowRowCount
			+"' style='width:116px;text-align:right' maxlength='13'/></td>"
						+ "<td><input name='spsl_"+nowRowCount+"' id='spsl_"+nowRowCount
			+"' style='width:75px;text-align:right' maxlength='13'/></td>"
						+ "<td><input name='je_"+nowRowCount+"' id='je_"+nowRowCount
			+"' style='width:116px;text-align:right' maxlength='16'/></td>"
					+ "<td><select name='sl_"
					+ nowRowCount
					+ "' id='sl_"
					+ nowRowCount
					+ "' style='width:98%;'>"
					+ szsmStr
					+ "</select></td>"
					+ "<td><input name='se_"
					+ nowRowCount
					+ "' id='se_"
					+ nowRowCount
					+ "' type='text' style='width:134px;text-align:right' disabled='disabled'/>"
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
			//绑定事件
			zzp_hzsqd.addRowDbclick(tr);
		},
		addRowDbclick : function(tr) {
			tr.bind("dblclick",function() {
				var url = ctxPath + "/zzp/selFyxm.do?targetType=dialog&index=" + getIndex($(this).attr("index"));
				url += "&hsbz=" + sfhs;
				$.pdialog.open(url, "zzp_selFyxm_dlg","选择费用项目", {
					width : 725,
					height : 440
				})
			})
			tr.find("input[id^='spsl'],input[id^='spdj']").bind("change",function(){
				var index = getIndex(this.id);
				var temp = new Number(this.value)
						.toFixed(6);
				if (temp == "NaN") {
					temp = this.value.substring(this.value
							.indexOf("-"),
							this.value.length);
				}
				temp = delRight(new String(temp));
				var isdj = this.id.indexOf("dj") != -1;
				this.value = temp = temp == "" ? ""
						: isdj ? temp : -Math.abs(temp);
				var otherValue = isdj ? _$("#spsl_" + index)
						.val() : _$("#spdj_" + index).val();
						if(temp!=""||otherValue!=""){
							var plusJe = temp*otherValue;
							if(Math.abs(plusJe)>99999999999.99){
								alert("您的输入有误,请修正单价或数量");
								this.value="";
								return;
							}
							var result=(plusJe).toFixed(2);
							_$("#je_"+index).val(result==0?"":result);
						}
				if (temp != "" || otherValue != "") {
					var result = (temp * otherValue)
							.toFixed(2);
					_$("#je_" + index).val(
							result == 0 ? "" : result);
				}
				if (isdj) {
					$(this).removeAttr("optDj");
					_$("#hsbz_" + index).val(
							sfhs ? "y" : "n");
				}
				zzp_hzsqd.reCountRow(index, true);
			})
			tr.find("input[id^='je']").bind("change",function() {
				if (this.value == 0) {
					this.value = "";
				} else {
					var temp = (-Math.abs(this.value)).toFixed(2);
					if (temp == "NaN") {
						temp = this.value.substring(this.value
								.indexOf("-"), this.value.length);
					}
					this.value = temp;
				}
				var index = getIndex(this.id);
				var spsl = _$("#spsl_" + index);
				var spdj = _$("#spdj_" + index);
				if (spsl.val() != "") {
					spdj.val(delRight((this.value / spsl.val()).toFixed(6)));
					spdj.removeAttr("optDj");
					_$("#hsbz_" + index).val(sfhs ? "y" : "n");
				} else if (spdj.val() != "") {
					spsl.val(delRight((this.value / spdj.val()).toFixed(6)));
				}
				zzp_hzsqd.reCountRow(index);
			})
			tr.find("select[id^='sl']").bind("change",function(){
				var index = getIndex(this.id);
				_$("#spdj_"+index).removeAttr("optDj");
				if(_$("#je_"+index).val()==""){
					return;
				}
				zzp_hzsqd.reCountRow(index);
			})
		},
		tk : function() {
			_$("#hzdd0").hide();
			_$("#hzdd2").hide();
			_$("#hzdd1").show();
			this.addListener();
		},
		xyb : function() {
			if(!_$("#fpdm_s").attr("disabled")){
				if(!/\d{10}/.test(_$("#fpdm_s").val())){
					alert("发票代码填写有误！");
					return;
				}else if(!/\d{8}/.test(_$("#fphm_s").val())){
					alert("发票号码填写有误！");
					return;
				}
			}
			ajaxLoad(ctxPath + "/hzsqd/sqdjy.do", _$("#hzsqd_form")
					.serialize(), function(json) {
				_$("#hzdd1").hide();
				_$("#hzdd3").show();
				_$("#kprq").text(json.kprq);
				_$("#jbr").text(json.jbr);
				_$("#qsqdh").text(json.sqdh);
				_$("#fpdm").text(json.fpdm == null ? "" : json.fpdm);
				_$("#fphm").text(json.fphm == null ? "" : json.fphm);
				zzp_hzsqd.cxHtSqd(json);

			})
		},
		cxHtSqd : function(args) {
			var sqdmx = args.yfpmx;
			var sqlx = sqdmx.sqlx;
			var sfyyfp = args.sfyyfp;
			if (sqdmx.mxzb != null) {
				leng = sqdmx.mxzb.length;
				isMulti = sqdmx.isMutiRate;
			} else {
				zzp_hzsqd.reDeal(args);
				_$("#ghdwmc").val(args.ghdwmc);
				_$("#ghdwdm").val(args.ghdwdm);
				_$("#ghdwmc").attr("readonly", "readonly");
				_$("#ghdwdm").attr("readonly", "readonly");
				return;
			}
			zzp_hzsqd.reDeal(args);
			for ( var i = 1; i <= sqdmx.mxzb.length; i++) {
				zzp_hzsqd.addRow("not_focus");
				var mx = sqdmx.mxzb[i - 1];
				_$("#spmc_" + i).val(mx.spmc);
				if (mx.spsl == null || mx.spsl == "") {
					_$("#spsl_" + i).val("");
				} else {
					_$("#spsl_" + i).val(delRight(-mx.spsl + ""));
				}
				
				var spdj = _$("#spdj_" + i);
				if (mx.spsl == null || mx.spsl == "") {
					spdj.val("");
				} else {
					spdj.val(mx.spdj);
				}
				
				//if(mx.hsbz){
				//	$("#je_"+i).val((-mx.je-mx.se).toFixed(2));
				//}else{
				//	$("#je_"+i).val((-mx.je).toFixed(2));
				//}
				_$("#je_" + i).val((-mx.je).toFixed(2));
				
				//if(isMulti=="1"){
				//$("<option></option>").appendTo($("#sl_" + i));
				//}
				_$("#sl_" + i).val(mx.sl);
				//$("#sl_"+i).attr('onchange','selectedIndex='+document.getElementById("sl_"+i).selectedIndex);
				_$("#se_" + i).val((-mx.se).toFixed(2));
				
				_$("#hsbz_" + i).val("n");
			}
			_$("#xhdwmc").val(sqdmx.xhdwmc);
			_$("#xhdwdm").val(sqdmx.xhdwdm);
			_$("#ghdwmc").val(sqdmx.ghdwmc);
			_$("#ghdwdm").val(sqdmx.ghdwdm);
			if (sqdmx.sqlx > 4) {
				_$("#xhdwmc").attr("readonly", "readonly");
				_$("#xhdwdm").attr("readonly", "readonly");
			} else {
				_$("#ghdwmc").attr("readonly", "readonly");
				_$("#ghdwdm").attr("readonly", "readonly");
			}
			if(sk_version=="ABC"){
				_$("#je_" + i).attr("readonly", "readonly");
				_$("#spdj_" + i).attr("readonly", "readonly");
				_$("#spsl_" + i).attr("readonly", "readonly");
				_$("#spmc_" + i).attr("readonly", "readonly");
			}
			zzp_hzsqd.reCountHjje();
		},
		init : function() {
			disableButtons(_$("#del"));
			nowRowCount = 0, szsmStr = "", sfhs = false;
		},
		reDeal : function(args) {
			zzp_hzsqd.init();
			//变化输入框为文字显示购货方或销货方
			var sqdmx = args.yfpmx;
			_$("#scsm").val(sqdmx.scsm);
			_$("#insqdh").val(sqdmx.sqdh);
			_$("#infpdm").val(sqdmx.fpdm);
			_$("#infphm").val(sqdmx.fphm);
			_$("#insqlx").val(sqdmx.sqlx);
			var sqlx = sqdmx.sqlx;
			var index = [];
			if (sqlx == 0) {
				index = [ 0, 1 ];
			} else if (sqlx <= 4) {
				index = [ 0, 2, sqlx * 1 + 2 ];
			} else {
				index = [ 7, sqlx * 1 + 3 ];
			}
			_$("#sqlx_td :radio").attr("disabled", "disabled").each(function(i, n) {
				for ( var j = 0; j < index.length; j++) {
					if (i == index[j]) {
						$(n).attr("checked", "checked");
					}
				}
				if (i == index[index.length - 1]) {
					$(n).removeAttr("disabled");
				}
			})
			//生成占位行
			for ( var index = 1; index <= 8; index++) {
				_$("#fyxmdiv tr:last").prev().after(
						zzp_hzsqd.newPlaceHolder());
			}
			//税种税目
			$.each(eval(args.szsm),function(i, n) {
				if (isMulti == "1" && leng == 1) {
					szsmStr = ("<option></option>");
				} else {
					szsmStr += ("<option value='"+n+"'>" + n
							* 100 + "%</option>");
				}

			});
			//选取纳税人
			//_$(":text#ghdwmc,:text#ghdwdm,:text#xhdwmc,:text#xhdwdm").dblclick(selectNsr);
			//默认添加一行
			//addRow();
		},
		addListener : function() {
			_$("#sqdtx :radio[name='sqf']").change(function() {
				if (this.value == 1) {
					_$("#sqdtx :radio[name='sqlx']").each(
						function() {
							if (this.value > 4) {
								$(this).attr(
										"disabled",
										"disabled");
							} else {
								$(this).removeAttr(
										"disabled");
							}
					});
					_$("#wdk").removeAttr("disabled");
					_$("#sqlx0").attr("checked", "checked");
					zzp_hzsqd.disableFpdmhm();
				} else {
					_$("#sqdtx :radio[name='sqlx']").each(
						function() {
							if (this.value <= 4) {
								$(this).attr(
										"disabled",
										"disabled");
							} else {
								$(this).removeAttr(
										"disabled");
							}
					});
					_$("#wdk").attr("disabled", "disabled")
							.removeAttr("checked");
					_$("#sqlx5").attr("checked", "checked");
					zzp_hzsqd.enableFpdmhm();
				}
			});
			_$("#wdk").change(function() {
				_$("#sqlx1").attr("checked", "checked");
				zzp_hzsqd.enableFpdmhm();
			})
			_$("#sqdtx :radio[name='sqlx']").change(function() {
				if (this.value <= 4) {
					if (this.value == 0) {
						zzp_hzsqd.disableFpdmhm();
						_$("#wdk").removeAttr("checked");
					} else {
						_$("#wdk").attr("checked", "checked");
						zzp_hzsqd.enableFpdmhm();
					}
				}
			});
			zzp_hzsqd.disableFpdmhm();
		},
		enableFpdmhm : function() {
			_$("#fpdm_s,#fphm_s").removeAttr("disabled");
		},
		disableFpdmhm : function() {
			_$("#fpdm_s,#fphm_s").attr("disabled", "disabled").val("");
		},
		newPlaceHolder : function() {
			return "<tr placeholder='y'><td/><td/><td/><td/><td/><td>"
					+ "<input type='text' style='visibility:hidden;' disabled='disabled'/></td></tr>"
		},
		shxz : function() {
			_$("hzdd3").hide();
			_$("#hzdd0").hide();
			_$("#hzdd1").hide();
			_$("#hzdd2").hide();
			_$("#hzdd4").show();

		},
		fh : function() {
			_$("#hzdd0").show();
			_$("#hzdd2").show();
			_$("#hzdd1").hide();
			_$("#hzdd3").hide();
			_$("#hzdd4").hide();
		},
		qx : function() {
			_$("#hzdd3").hide();
			_$("#hzdd2").show();
			_$(".searchBar").show();
		},
		hzxz : function() {
			var inputs = _$("#hzdd4 td input");
			var sjq=inputs.eq(0).val();
			var sjz=inputs.eq(1).val();
			var date1=new Date(sjq.replace(/\-/g,'/'));
			var date2=new Date(sjz.replace(/\-/g,'/'));
			if(date1.getTime()-date2.getTime()>0){
				alert("起始日期不能大于终止日期！");
				return;
			}
			location.href = ctxPath + "/hzsqd/shxz.do?kpsjq="+ sjq + "&kpsjz=" + sjz+ "&hzxxb=" + inputs.eq(2).val();
		},
		reCountHjje : function() {
			var hjje = 0, se = 0, jshj = 0;
			_$("#fyxmdiv :text[id^='je']").each(function() {
				hjje += $(this).val() * 1;
			})
			_$("#fyxmdiv :text[id^='se']").each(function() {
				se += $(this).val() * 1;
			})
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
		delRow : function() {
			if (nowRowCount == 1) {
				disableButtons(_$("#del"));
			} else if (nowRowCount == 8) {
				enableButtons(_$("#add"));
			}
			nowRowCount--;
			_$("#fyxmdiv tr[index]:last")
					.before(zzp_hzsqd.newPlaceHolder()).remove();
			reFocus(_$("#spmc_" + nowRowCount)[0]);
			zzp_hzsqd.reCountHjje();
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
				})
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
							this.value = delRight((this.value / (1 + _$("#sl_" + index).val() * 1)).toFixed(6));
						}
					}
				})
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
				})
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
							this.value = delRight((this.value * (1 + _$("#sl_" + index).val() * 1)).toFixed(6));
						}
					}
				})
			}
		},
		validateSqd : function(a) {
			if (nowRowCount == 0) {
				alert("请添加费用项目");
				zzp_hzsqd.addRow();
				return false;
			}
			var ghdwmc = _$(":text#ghdwmc,:text#xhdwmc")[0];
			if (ghdwmc.value == "") {
				alert("纳税人名称不能为空");
				reFocus(ghdwmc);
				return false;
			} else if (countStrLength(ghdwmc.value) > 100) {
				alert("纳税人名称最多为100个字符或50个汉字");
				reFocus(ghdwmc);
				return false;
			}
			var ghdwdm = _$(":text#ghdwdm,:text#xhdwdm")[0];
			var regex = /^[a-zA-Z0-9]{15,20}$/;
			if (ghdwdm.value == "") {
				alert("纳税人识别号不能为空");
				reFocus(ghdwdm)
				return false;
			} else if (!regex.test(ghdwdm.value)) {
				alert("纳税人识别号为15-20位数字或大写字母");
				reFocus(ghdwdm)
				return false;
			}
			var lxdh = _$("#lxdh")[0];
			if (countStrLength(lxdh.value) > 40) {
				alert("联系电话最多为40个字符或20个汉字");
				reFocus(lxdh)
				return false;
			}
			var sqly = _$("#sqly")[0];
			if (countStrLength(sqly.value) > 400) {
				alert("申请理由最多为400个字符或200个汉字");
				reFocus(sqly)
				return false;
			}
			var spmcs = _$("#fyxmdiv :text[id^='spmc']");
			for ( var i = 0; i < spmcs.length; i++) {
				var spmc = spmcs[i];
				var index = getIndex(spmc.id);
				var ggxh = _$("#ggxh_" + index)[0];
				var dw = _$("#dw_" + index)[0];
				var je = _$("#je_" + index)[0];
				if (spmc.value == "") {
					alert("货物或应税劳务名称不能为空");
					reFocus(spmc);
					return false;
				} else if (countStrLength(spmc.value) > 72) {
					alert("货物或应税劳务名称最多为72个字符或36个汉字");
					reFocus(spmc);
					return false;
				}
				if (je.value == "") {
					alert("金额不能为空");
					reFocus(je);
					return false;
				}
			}
			if (a) {
				_$("#extraDiv").remove();
				var extraDiv = _$("<div id='extraDiv'/>").hide();
				_$("#hzsqd_sc_form").append(extraDiv);
				extraDiv.append("<input name='hjje' value='" + delLeftMoney(_$("#hzhjje").text()) + "'/>");
				extraDiv.append("<input name='hjse' value='" + delLeftMoney(_$("#hzhjse").text()) + "'/>");
				//转换含税金额
				_$("#fyxmdiv :text[id^='je']").each(function() {
					var realJe, index = getIndex(this.id);
					if (sfhs) {
						realJe = (_$("#je_" + index).val() - _$(
								"#se_" + index).val())
								.toFixed(2);
					} else {
						realJe = _$("#je_" + index).val();
					}
					extraDiv.append("<input name='realJe_"+index+"' value='"+realJe+"'/>");
				})
				//追加税额
				_$("#fyxmdiv :text[id^='se']").each(function() {
					extraDiv.append("<input name='"+this.name+"' value='"+this.value+"'/>");
				})
				//计算总体含税和行含税标志不一致时的实际单价
				_$("#fyxmdiv :text[id^='spdj']").each(function() {
					var realDj = this.value, index = getIndex(this.id);
					if (realDj != ""
							&& sfhs != (_$("#hsbz_" + index)
									.val() == "y")) {
						realDj = $(this).attr("optDj");
					}
					extraDiv.append("<input name='realDj_"+index+"' value='"+realDj+"'/>");
				})
				//判断是否统一税率
				var slArray = _$("#fyxmdiv select[id^=sl]").get();
				var isAll = true;
				for ( var i = 1; i < slArray.length; i++) {
					var index = getIndex(slArray[i].id);
					if (slArray[i].value != slArray[0].value) {
						isAll = false;
						break;
					}
				}
				if (isAll) {
					extraDiv.append("<input name='isMutiRate' value='"+slArray[0].value+"'/>")
				}
			}
			return true;
		},
		save : function() {
			var boo = zzp_hzsqd.validateSqd(true);
			if (boo) {
				ajaxLoad(ctxPath + "/hzsqd/save.do", _$("#hzsqd_sc_form").serialize(),function(json) {
					alertMsg.correct(json.message);	
				})
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
			zzp_hzsqd.reCountHjje();
		},
		sc:function(){
			var boo = zzp_hzsqd.validateSqd(true);
			if (boo) {
				ajaxLoad(ctxPath + "/hzsqd/sc.do", _$("#hzsqd_sc_form").serialize(), function(json) {
					alertMsg.correct(json.message);
				})
			}
		},
		dc:function(){
			var id=getDwzIds(_$("#hzdd2 .gridTbody"),"ids",true);
			if(id=="z=z"){
				alertMsg.error("没有选中任何数据!");
				return;
			}
			location.href = ctxPath + "/hzsqd/dcsqd.do?"+id;
		},
		drawSqd:function(args){
			var sqdmx = args.yfpmx;
			_$("#kprq").text(args.kprq);
			_$("#jbr").text(sqdmx.jbrmc);
			_$("#qsqdh").text(sqdmx.sqdh);
			_$("#fpdm").text(sqdmx.fpdm == null ? "" : sqdmx.fpdm);
			_$("#fphm").text(sqdmx.fphm == null ? "" : sqdmx.fphm);
			_$("#ghdwmc").val(sqdmx.ghdwmc);
			_$("#ghdwdm").val(sqdmx.ghdwdm);
			_$("#xhdwmc").val(sqdmx.xhdwmc);
			_$("#xhdwdm").val(sqdmx.xhdwdm);
			isMulti=sqdmx.isMutiRate;
			leng=sqdmx.mxzb.length;
			zzp_hzsqd.reDeal(args);
			for(var i=1;i<=sqdmx.mxzb.length;i++){
				zzp_hzsqd.addRow();
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
			zzp_hzsqd.reCountHjje();
		},
		dbclickht:function(){
			var sel=_$(".pageContent table tr.selected");
			var id = sel.attr("rel");
			ajaxLoad(ctxPath + "/hzsqd/drawedit.do?id="+id,{async:false}, function(json) {
				_$("#hzdd0").hide();
				_$("#hzdd2").hide();
				_$("#hzdd1").hide();
				_$("#hzdd3").show();
				zzp_hzsqd.drawSqd(json);

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
			LODOP.ADD_PRINT_TEXT(67,508,240,20,"NO."+_$("#qsqdh").text());
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_RECT(90,20,730,601+toAdd,0,1);
			LODOP.ADD_PRINT_RECT(90,20,730,60,0,1);
			LODOP.ADD_PRINT_RECT(150,20,730,79+toAdd,0,1);
			LODOP.ADD_PRINT_RECT(90,20,89,601+toAdd,0,1);
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
			
			var xhdwmc = zzp_hzsqd.considerVal("xhdwmc");
			if(countStrLength(xhdwmc)<=20){
				LODOP.ADD_PRINT_TEXT(99,227,171,20,xhdwmc);
				LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			}else{
				LODOP.ADD_PRINT_TEXT(93,229,171,33,xhdwmc);
				LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
				LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-4);
			}
			LODOP.ADD_PRINT_TEXT(127,227,171,20,zzp_hzsqd.considerVal("xhdwdm"));
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			
			LODOP.ADD_PRINT_TEXT(127,588,172,20,zzp_hzsqd.considerVal("ghdwdm"));
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			
			var ghdwmc = zzp_hzsqd.considerVal("ghdwmc");
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
			LODOP.ADD_PRINT_TEXT(463,41,42,24,"说明");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(252+toAdd,130,129,19,"一、购买方申请");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.SET_PRINT_STYLEA(0,"Bold",1);
			LODOP.ADD_PRINT_TEXT(276+toAdd,141,315,19,"对应蓝字专用发票抵扣增值税销项税额情况");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(300+toAdd,141,84,19,"1、已抵扣");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(324+toAdd,141,84,19,"2、未抵扣");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(348+toAdd,152,112,19,"（1）无法认证");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(373+toAdd,152,209,19,"（2）纳税人识别号认证不符");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(396+toAdd,152,306,19,"（3）增值税专用发票代码、号码认证不符");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(420+toAdd,152,308,19,"（4）所购货物不属于增值税扣税项目范围");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(446+toAdd,152,302,19,"对应蓝字专用发票密码区内打印的代码：");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(471+toAdd,392,61,19,"号码：");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(511+toAdd,130,129,19,"二、销售方申请");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.SET_PRINT_STYLEA(0,"Bold",1);
			LODOP.ADD_PRINT_TEXT(538+toAdd,152,210,19,"（1）因开票有误购买方拒收的");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(563+toAdd,152,239,19,"（2）因开票有误等原因尚未交付的");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(587+toAdd,152,298,19,"对应蓝字专用发票密码区内打印的代码：");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(609+toAdd,392,56,19,"号码：");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(643+toAdd,118,186,19,"开具红字专用发票理由：");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			var checks = [];
			_$("#sqlx_td :radio").each(function(){
				checks.push($(this).attr("checked")?"√":"　");
			})
			LODOP.ADD_PRINT_TEXT(252+toAdd,258,25,20,checks[0]);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
			LODOP.SET_PRINT_STYLEA(0,"TextFrame",5);
			LODOP.ADD_PRINT_TEXT(299+toAdd,224,25,20,checks[1]);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
			LODOP.SET_PRINT_STYLEA(0,"TextFrame",5);
			LODOP.ADD_PRINT_TEXT(323+toAdd,224,25,20,checks[2]);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
			LODOP.SET_PRINT_STYLEA(0,"TextFrame",5);
			LODOP.ADD_PRINT_TEXT(347+toAdd,263,25,20,checks[3]);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
			LODOP.SET_PRINT_STYLEA(0,"TextFrame",5);
			LODOP.ADD_PRINT_TEXT(372+toAdd,360,25,20,checks[4]);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
			LODOP.SET_PRINT_STYLEA(0,"TextFrame",5);
			LODOP.ADD_PRINT_TEXT(395+toAdd,457,25,20,checks[5]);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
			LODOP.SET_PRINT_STYLEA(0,"TextFrame",5);
			LODOP.ADD_PRINT_TEXT(419+toAdd,457,25,20,checks[6]);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
			LODOP.SET_PRINT_STYLEA(0,"TextFrame",5);
			LODOP.ADD_PRINT_TEXT(511+toAdd,258,25,20,checks[7]);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
			LODOP.SET_PRINT_STYLEA(0,"TextFrame",5);
			LODOP.ADD_PRINT_TEXT(537+toAdd,361,25,20,checks[8]);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
			LODOP.SET_PRINT_STYLEA(0,"TextFrame",5);
			LODOP.ADD_PRINT_TEXT(562+toAdd,390,25,20,checks[9]);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
			LODOP.SET_PRINT_STYLEA(0,"TextFrame",5);
			LODOP.ADD_PRINT_TEXT(643+toAdd,303,442,24,_$("#sqly").val());
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(707+toAdd,58,535,19,"申明：我单位提供的<申请单>内容真实，否则将承担相关法律责任。");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.SET_PRINT_STYLEA(0,"Bold",1);
			LODOP.ADD_PRINT_TEXT(735+toAdd,58,199,19,"申请方经办人："+_$("#jbr").text());
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(735+toAdd,256,204,19,"联系电话："+_$("#lxdh").val());
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_TEXT(735+toAdd,459,155,19,"申请方名称<印章>：");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			LODOP.ADD_PRINT_LINE(466+toAdd,443,466+toAdd,643,0,1);
			LODOP.ADD_PRINT_LINE(491+toAdd,443,491+toAdd,643,0,1);
			LODOP.ADD_PRINT_LINE(607+toAdd,443,607+toAdd,643,0,1);
			LODOP.ADD_PRINT_LINE(629+toAdd,443,629+toAdd,643,0,1);
			if(checks[0]=="√"){
				LODOP.ADD_PRINT_TEXT(446+toAdd,453,228,19,_$("#fpdm").text());
				LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
				LODOP.ADD_PRINT_TEXT(471+toAdd,453,228,19,_$("#fphm").text());
				LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			}else{
				LODOP.ADD_PRINT_TEXT(587+toAdd,453,228,19,_$("#fpdm").text());
				LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
				LODOP.ADD_PRINT_TEXT(609+toAdd,453,228,19,_$("#fphm").text());
				LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
			}
			LODOP.ADD_PRINT_LINE(755+toAdd,605,755+toAdd,750,0,1);
			LODOP.ADD_PRINT_TEXT(762+toAdd,57,693,19,"注：本申请单一式两联：第一联，申请方留存；第二联，申请方所属主管税务机关留存。");
			LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
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
				LODOP.ADD_PRINT_TEXT(182+i*oneRowHeight,549,58,15,_$("#sl_"+(i+1)).val());
				LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
				LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
				LODOP.ADD_PRINT_TEXT(182+i*oneRowHeight,613,135,15,_$("#se_"+(i+1)).val());
				LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
				LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
			}
			LODOP.PREVIEW();
		},
		dy:function(){
			var boo = zzp_hzsqd.validateSqd(true);
			if (boo) {
				zzp_hzsqd.printsqd();
			} else {

			}
		},
		considerVal:function(a){
			var ele = _$("#"+a);
			var title = ele.attr("title");
			return title?title:ele.val();
		}
	}
}();


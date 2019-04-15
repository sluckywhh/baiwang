var spbmcsh = function() {
	var tree,map,treeData;
	return {
		initPage : function() {
			// 取出选中的省份
			var prov = $("#provs").val();
			// 首次加载参数设置为0(默认加载北京的编码信息)；
			if (typeof (prov) == undefined || prov == null || prov == "") {
				prov = "0";
			}
			// 清空编码明细编辑区和树
			$("#spbmInitTree").html("");
			$("#spbmInitBox").html("");
			var $this = this;
			tree = null;
			map = new HashMap();
			treeData = [];
			var setting = {
				data : {
					simpleData : {
						enable : false
					}
				},
				view : {
					showLine : false,
					fontCss : function(treeId, treeNode) {
						return treeNode.zdy == 0 ? {} : {
							color : "green"
						};
					}
				},
				callback : {
					onClick : function(e, treeId, treeNode) {
						$this.loadTable({
							bm : treeNode.id,
							"provId" : $("#provs").val(),
							"zdy" : treeNode.zdy
						});
					}
				}
			};
			//解决IE6的乱码问题
			prov=encodeURI(prov);
			$.post(ctxPath + "/spbmcsh/loadInfo.do?prov="+prov,null,function(json){
				// 第一次加载 生成省份下拉选
				// 获取省份信息
				var provs = json.provs;
				if (prov == "0") {
					var $provsSel = $("#provs");
					$.each(provs, function(i, n) {
						if (n.prov_name == "北京市") {
							$provsSel.append("<option id='" + n.prov_name
									+ "' selected='selected'>" + n.prov_name
									+ "</option>");
						}else{
							$provsSel.append("<option id='" + n.prov_name + "'>"
									+ n.prov_name + "</option>");
						}
					});
				}
				// 判断返回的code值
				if (json.statusCode == "200") {
					// 获取编码信息
					var bms = json.bms;
					// 解析编码信息，生成ztree
					$.each(bms, function(i, n) {
						map.put(n.id, n);
					});
					$.each(bms, function(i, n) {
						var pId = n.pId;
						if (pId != "0") {
							var node = map.get(pId);
							if (node) {
								if (!node.children) {
									node.children = [];
								}
								node.children.push(n);
							}
						} else {
							treeData.push(n);
						}
					});
					var treeBox = _$("#spbmInitTree").addClass("ztree");
					tree = $.fn.zTree.init(treeBox, setting, treeData);
					if (ie6) {
						treeBox.find("> li > a").css("margin-left", "-14px");
					}
				} else if (json.statusCode == "300") {
					alertMsg.error(json.message);
				}
			});
		},

		loadTable : function(p) {
			var box = _$("#spbmInitBox");
			box.loadUrl(ctxPath + "/spbmcsh/detail.do", p, function(json) {
				box.find("[layoutH]").layoutH();
			});
		},

		drtb : function() {
			$_("#prov").val($("#provs").val());
		},

		// 导入同步回调处理
		drtbhd : function(json) {
			//显示更新信息
			dialogAjaxDone(json);
			//关闭对话框
			$.pdialog.closeCurrent();
			//同步成功，则加载当前省份的树
			if(json.statusCode=="200"){
				spbmcsh.initPage();
			}
		},
		wltb:function(){
			var prov=$("#provs").val();
			//解决IE6乱码问题
			prov=encodeURI(prov);
			ajaxLoad(ctxPath + "/spbmcsh/wltb.do?prov="+prov, function(json) {
				dialogAjaxDone(json);
				//同步成功，则加载当前省份的树
				if(json.statusCode=="200"){
					spbmcsh.initPage();
				}
			});
		}
	}
}()
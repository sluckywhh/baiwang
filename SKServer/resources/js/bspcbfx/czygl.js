var czygl = function(){
	function addChild(par,data,pn){
		$.each(data,function(i,n){
			var append = false;
			if(!pn){
				append = n[0]=="999999";
			}else{
				append = n[2]==pn[0];
			}
			if(append){
				var ulInner = $("<li><a tvalue='"+n[0]+"'>"+n[1]+n[0]+"</a><ul></ul></li>").appendTo(par).children("ul");
				addChild(ulInner,data,n);
			}
		})
		var ul = par.find("> li > ul")
		if(ul.children().length==0){
			ul.remove();
		}
	}
	return {
		initPage:function(){
			_$("#xzzzjgid").click(function(){
				$.pdialog.open(ctxPath+"/Czygl/addZzjgMenu.do","组织结构",{width:480,height:240})
			})
		},
		toggleType:function(type){
			if(sk_version=="CBC"){//建行
				if(type=="1"){
					$_('#kpdid').show();	
				}else{
					$_('#kpdid').hide();
				}
				
				ajaxLoad(ctxPath+"/Czyglny/changeCzy.do",function(json){
					var p = $_("#kpdid");
					p.children("div").remove();
					var sel = $("<select name='kpddm' class='combox'><option value=''>请选择开票点</option></select>").appendTo(p)
					$.each(json.kpdlist,function(i,n){
						sel.append("<option value='"+n.kpddm+"'>"+n.kpdmc+"-"+n.kpddm+"</option>")
					})
					sel.combox();
				});
			}else{
				if(type=="1" || type=="2" || type=="5"){
					if(type=="1"){
						$_('#kjhnfp,#kpdid,#czylxid').show();	
					}
					if(type=="2" || type=="5"){
						$_('#kpdid,#czylxid').show();
						$_('#kjhnfp').hide();
					}
					ajaxLoad(ctxPath+"/Czyglny/changeCzy.do",function(json){
						var p = $_("#kpdid");
						p.children("div").remove();
						var sel = $("<select name='kpddm' class='combox'><option value=''>请选择开票点</option></select>").appendTo(p)
						$.each(json.kpdlist,function(i,n){
							sel.append("<option value='"+n.kpddm+"'>"+n.kpdmc+"-"+n.kpddm+"</option>")
						})
						sel.combox();
					})
				}else{
					$_('#kjhnfp,#kpdid').hide();
				}
			}
		},
		reTree:function(){
			var treeContainer = $_(".pageContent");
			var data = $.parseJSON(treeContainer.next().text());
			tree = $("<ul class='tree treeFolder collapse'></ul>").appendTo(treeContainer);
			addChild(tree,data);
			tree.jTree();
		},
		sel:function(){
			var a = $_('.pageContent div.selected:first a');
			if(a.length==0){
				alertMsg.error("请选择机构！");
			}else{
				$("#zzjgdm").val(a.attr('tvalue')).next().text(a.text());
				$("#ognamid").val(a.text());
				$.pdialog.closeCurrent();
			}
			
		},
		//普通管理版本的
		modify:function(){
			ajaxLoad(ctxPath+"/Czygl/resetYhkl.do",function(json){
				if(json.success=='0'){
					alertMsg.correct("重置密码成功,重置密码为00000000");
				}else{
					alertMsg.error("重置密码失败");
				}
				$_("#qxid").click();
				
			})
			
		},
		//农行版本
		modifyny:function(){
			ajaxLoad(ctxPath+"/Czyglny/resetYhkl.do",function(json){
				if(json.success=='0'){
					alertMsg.correct("重置密码成功,重置密码为00000000");
				}else{
					alertMsg.error("重置密码失败");
				}
				$_("#nyqxid").click();
				
			})
			
		},
		//中行版本
		modifyzh:function(){
			ajaxLoad(ctxPath+"/Czyglzh/resetYhkl.do",function(json){
				if(json.success=='0'){
					alertMsg.correct("重置密码成功,重置密码为00000000");
				}else{
					alertMsg.error("重置密码失败");
				}
				$_("#zhqxid").click();
				
			})
			
		},
		qubz:function(bt){
			var tds = $(bt).parents("tr:first").children();
			var param = {
					id:tds.eq(0).text(),
					qybz:tds.eq(4).attr("title")
				
			}
			 ajaxLoad(ctxPath+"/Czygl/modifyQybz.do",param,function(json){
				alertMsg.correct(json.message);
				navTab.reload();
			}) 
		},
		qubzny:function(bt){
			var tds = $(bt).parents("tr:first").children();
			var param = {
					id:tds.eq(0).text(),
					qybz:tds.eq(4).attr("title")
				
			}
			 ajaxLoad(ctxPath+"/Czyglny/modifyQybz.do",param,function(json){
				alertMsg.correct(json.message);
				navTab.reload();
			}) 
		},
		qubzzh:function(bt){
			var tds = $(bt).parents("tr:first").children();
			var param = {
					id:tds.eq(0).text(),
					qybz:tds.eq(4).attr("title")
				
			}
			 ajaxLoad(ctxPath+"/Czyglzh/modifyQybz.do",param,function(json){
				alertMsg.correct(json.message);
				navTab.reload();
			}) 
		}
	}
}();
var fphz = function() {
	return {
		nowmonthrhz : function(hzdata) {
			var hz=hzdata.split("_");
			var jqbh=hz[0];
			var date=hz[1];
			var param = {
					jqbh :jqbh,
					date:date,
					nowmonth : true,
					async : false
				};
			ajaxLoad(ctxPath+"/fprhz/cxhz.do",param,function(json){			 
			});
			_$('form[rel]:first').submit();
			ajaxLoad(ctxPath+"/fprhz/dsnm.do",param,function(json){	
				yy=json.yy;
			});
			alertMsg.info(yy);
		},
		yhzts:function(){//提示
			alertMsg.warn("月汇总比对不一致，保证日汇总全部成功后再进行月汇总！");
		},
		rhz : function(hzdata) {		
			var hz=hzdata.split("_");
			var jqbh=hz[0];
			var date=hz[1];
			var param = {
					jqbh :jqbh,
					date:date,
					nowmonth : false,
					async : false
				};
			ajaxLoad(ctxPath+"/fprhz/cxhz.do",param,function(json){			 
			});
			var $box=$.pdialog.getCurrent();
			var sd=$box.find('form[rel]:first');
			_$(sd).submit();
			_$('form[rel]:first').submit();
			ajaxLoad(ctxPath+"/fprhz/dsnm.do",param,function(json){	
				yy=json.yy;
			});
			alertMsg.info(yy);
		}
	};
}();
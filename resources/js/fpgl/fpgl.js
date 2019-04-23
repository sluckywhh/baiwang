var fpgl = function(){
	return {
		hsjldc:function(){
			var op = {
				form:_$('form[rel]'),
				param:[{name:"header",value:"开票点/管理员代码@开票点/管理员名称@发票代码@起始号码@终止号码@发票份数@操作员@登记时间"},
					   {name:"headerAtt",value:"kpddm@kpdmc@fpdm@qshm@zzhm@fs@czydm@djsj"}]
			}
			exportExcel(op);
		}
	}
}()
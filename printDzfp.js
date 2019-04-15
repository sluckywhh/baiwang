function printDzfp(fpmx){
	/**
	 * {
	 * 	fplxdm
	 * 	fpzt
	 * 	fpdm
	 * 	fphm
	 * 	jqbh
	 * 	kprq
	 * 	ghdwmc
	 * 	ghdwdm
	 * 	ghdwdzdh
	 * 	ghdwyhzh
	 * 	zb
	 * 	hjje
	 * 	hjse
	 * 	jshj
	 * 	jshjdx
	 * 	xhdwmc
	 * 	xhdwdm
	 *  xhdwdzdh
	 *  xhdwyhzh
	 *  skr
	 *  fhr
	 *  kpr
	 *  zb:{
	 *  	spmc,ggxh,dw,spsl,spdj,je,sl,se
	 *  }
	 * }
	 * */
	LODOP.ADD_PRINT_TEXT("6.9mm","88mm","78.2mm","5mm","增值税普通发票（电子）");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",2);
	if(fpmx.fpzt=='01'){
		LODOP.ADD_PRINT_TEXT(65,248,100,32,"销项负数");
		LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
		LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
	}
	if(fpmx.tspz=='02'){
		LODOP.ADD_PRINT_TEXT(65,208,100,32,"收购");
		LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
		LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
	}
	LODOP.ADD_PRINT_TEXT(42,159,132,15,fpmx.fpdm);
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",15);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#FF0000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",2);
	LODOP.ADD_PRINT_SHAPE(1,"16.9mm","86.5mm","65.1mm","1",0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_SHAPE(0,"18mm","86.5mm","65.1mm","1",0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(42,634,113,20,fpmx.fphm);
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",15);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#FF0000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_IMAGE(39,595,26,24,"data:image/jpeg;base64,/9j/" +
			"4AAQSkZJRgABAAEAYABgAAD//gAfTEVBRCBUZWNobm9sb2dpZXMgSW5jLiBWMS4wMQD/2wCEAAgFB" +
			"gcGBQgHBgcJCAgJDBQNDAsLDBgREg4UHRkeHhwZHBsgJC4nICIrIhscKDYoKy8xMzQzHyY4PDgyPC" +
			"4yMzEBCAkJDAoMFw0NFzEhHCExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTE" +
			"xMTExMTExMTExMf/EAaIAAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKCwEAAwEBAQEBAQEBAQAAA" +
			"AAAAAECAwQFBgcICQoLEAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrH" +
			"BFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h" +
			"5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OX" +
			"m5+jp6vHy8/T19vf4+foRAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQ" +
			"kjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3" +
			"h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm" +
			"5+jp6vLz9PX29/j5+v/AABEIABoAGwMBEQACEQEDEQH/2gAMAwEAAhEDEQA/APQvil421rwNBHqUOjWt" +
			"9pG5I5JTcFZUY5/hxjHHXNAEnjfx+2j+CbLXvD9qmpSalJFHaRsThi4yM457Yx60AbvgnV9R1rw1Z3+s6" +
			"c2mX0ynzbZgRtIOM4PIz1waANygDz748WsV94Iis5yVjuNRtoiw6gM+CfyJoA8dstRvtBurH4f6vvabS/" +
			"ENvNbNjhoixzj25DD/AHqAOhu/GHiWbw3q3jmDWbiB7HVvs8engj7P5A4Klcck+vWgD3uwn+02NvcYx5s" +
			"Svj0yAaAPJ/iPqHifXPHdt4QttEJ0pbq0ukvgrYAQh3JPTHUY9vegC78WfA0mp+JfDniXSoDJd2V7Cl0qd" +
			"Wi3ghv+A/yPtQBx2qaeTq15aJ4W8U/2JNqH2ybTkjj8uWUHqG6hT1xQB79bY+zRYjMQ2DCH+HjpQBLQAUAFABQB/9k=");
	LODOP.SET_PRINT_STYLEA(0,"Stretch",2);
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT("23.3mm","168mm","19.6mm","4.5mm","开票日期：");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_SHAPE(2,"29.9mm","20.1mm","201.1mm","95mm",0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_SHAPE(2,"29.9mm","20.1mm","201.1mm","22mm",0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_SHAPE(2,"29.9mm","20.1mm","7.4mm","22mm",0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_SHAPE(2,"29.9mm","136mm","5mm","22mm",0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_SHAPE(2,"51.6mm","20.1mm","201.1mm","54mm",0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_SHAPE(1,196,276,1,202,0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_SHAPE(1,195,372,1,169,0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_SHAPE(1,195,419,1,169,0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_SHAPE(1,196,495,1,169,0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_SHAPE(1,195,571,1,169,0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_SHAPE(1,195,684,1,169,0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_SHAPE(1,196,726,1,169,0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_SHAPE(2,"105.3mm","20.1mm","7.4mm","19.6mm",0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_SHAPE(2,"105.3mm","136mm","5mm","19.6mm",0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(120,84,18,76,"购货单位");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LineSpacing",1);
	LODOP.ADD_PRINT_TEXT(118,107,114,20,"名        称：");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(136,107,114,20,"纳税人识别号：");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(155,107,58,20,"地址、");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",3);
	LODOP.ADD_PRINT_TEXT(155,157,62,20,"电话：");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",3);
	LODOP.ADD_PRINT_TEXT(175,107,111,20,"开户行及账号：");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(123,517,18,71,"密码区");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LineSpacing",6);
	LODOP.ADD_PRINT_TEXT(200,108,155,17,"货物或应税劳务名称");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",2);
	LODOP.ADD_PRINT_TEXT(200,295,86,17,"规格型号");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",2);
	LODOP.ADD_PRINT_TEXT(200,382,60,17,"单位");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",2);
	LODOP.ADD_PRINT_TEXT(200,438,61,17,"数量");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",12);
	LODOP.ADD_PRINT_TEXT(200,512,80,17,"单价");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",12);
	LODOP.ADD_PRINT_TEXT(200,602,90,17,"金额");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",24);
	LODOP.ADD_PRINT_TEXT(200,691,60,17,"税率");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",2);
	LODOP.ADD_PRINT_TEXT(200,755,90,17,"税额");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",24);
	LODOP.ADD_PRINT_SHAPE(0,364,77,758,1,0,1,"#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(348,127,103,17,"合         计");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(375,115,146,17,"价税合计（大写）");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",2);
	
	LODOP.ADD_PRINT_TEXT(374,288,15,15,"○");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
	LODOP.ADD_PRINT_TEXT(374,288,15,15,"×");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
			
	LODOP.ADD_PRINT_TEXT(375,620,65,17,"（小写）");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(405,84,18,71,"销货单位");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-2);
	LODOP.ADD_PRINT_TEXT(404,107,109,20,"名        称：");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(420,107,108,20,"纳税人识别号：");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(439,107,58,20,"地址、");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",3);
	LODOP.ADD_PRINT_TEXT(439,157,61,20,"电话：");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",3);
	LODOP.ADD_PRINT_TEXT(454,107,109,20,"开户行及账号：");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(411,518,18,59,"备\n\n注");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(476,90,68,19,"收款人：");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(476,306,60,19,"复核：");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(476,474,68,19,"开票人：");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(476,626,130,19,"销货单位：（章）");
	LODOP.SET_PRINT_STYLEA(0,"FontName","宋体");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#008000");
	LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);
	LODOP.ADD_PRINT_TEXT(74,148,162,15,"机器编号：");
	LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",1);
	LODOP.ADD_PRINT_TEXT(92,145,147,15,fpmx.jqbh);
	LODOP.SET_PRINT_STYLEA(0,"FontName","Courier New");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
	LODOP.ADD_PRINT_TEXT(52,778,78,15,fpmx.fpdm);
	LODOP.ADD_PRINT_TEXT(66,762,87,15,fpmx.fphm);
	LODOP.SET_PRINT_STYLEA(0,"FontName","Courier New");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
	var kprq = fpmx.kprq;
	kprq = kprq.substring(0,4)+"年"+kprq.substring(4,6)+"月"+kprq.substring(6,8)+"日";
	LODOP.ADD_PRINT_TEXT("23.3mm",714,121,15,kprq);
	LODOP.SET_PRINT_STYLEA(0,"FontName","Courier New");
	LODOP.ADD_PRINT_IMAGE(33,78,66,66,"data:image/png;base64,"+fpmx.ewm);
	LODOP.SET_PRINT_STYLEA(0,"Stretch",2);
	var ghdwmc = fpmx.ghdwmc;
	var ghdwmcLen = countStrLength(ghdwmc);
	if(ghdwmcLen<=50){
		LODOP.ADD_PRINT_TEXT(119,208,315,16,ghdwmc);
	}else if(ghdwmcLen<=56){
		LODOP.ADD_PRINT_TEXT(115,208,315,16,ghdwmc);
		LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
		LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-5);
	}else if(ghdwmcLen<=64){
		if(ghdwmcLen<=60){
			LODOP.ADD_PRINT_TEXT(119,208,315,16,ghdwmc);
		}else{
			LODOP.ADD_PRINT_TEXT(116,208,315,16,ghdwmc);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-4);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
	}else{
		if(ghdwmcLen<=75){
			LODOP.ADD_PRINT_TEXT(119,208,315,16,ghdwmc);
		}else{
			LODOP.ADD_PRINT_TEXT(117,208,315,16,ghdwmc);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-3);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
	}
	LODOP.ADD_PRINT_TEXT(135,225,290,15,fpmx.ghdwdm);
	LODOP.SET_PRINT_STYLEA(0,"FontName","Courier New");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
	var ghdwdzdh = fpmx.ghdwdzdh;
	var ghdwdzdhLen = countStrLength(ghdwdzdh);
	if(ghdwdzdhLen<=50){
		LODOP.ADD_PRINT_TEXT(156,208,315,16,ghdwdzdh);
	}else if(ghdwdzdhLen<=56){
		LODOP.ADD_PRINT_TEXT(151,208,315,16,ghdwdzdh);
		LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
		LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-5);
	}else if(ghdwdzdhLen<=64){
		if(ghdwdzdhLen<=60){
			LODOP.ADD_PRINT_TEXT(156,208,315,16,ghdwdzdh);
		}else{
			LODOP.ADD_PRINT_TEXT(152,208,315,16,ghdwdzdh);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-4);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
	}else{
		if(ghdwdzdhLen<=75){
			LODOP.ADD_PRINT_TEXT(156,208,315,16,ghdwdzdh);
		}else{
			LODOP.ADD_PRINT_TEXT(153,208,315,16,ghdwdzdh);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-3);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
	}
	var ghdwyhzh = fpmx.ghdwyhzh;
	var ghdwyhzhLen = countStrLength(ghdwyhzh);
	if(ghdwyhzhLen<=50){
		LODOP.ADD_PRINT_TEXT(175,208,315,16,ghdwyhzh);
	}else if(ghdwyhzhLen<=56){
		LODOP.ADD_PRINT_TEXT(170,208,315,16,ghdwyhzh);
		LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
		LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-5);
	}else if(ghdwyhzhLen<=64){
		if(ghdwyhzhLen<=60){
			LODOP.ADD_PRINT_TEXT(175,208,315,16,ghdwyhzh);
		}else{
			LODOP.ADD_PRINT_TEXT(171,208,315,16,ghdwyhzh);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-4);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
	}else{
		if(ghdwyhzhLen<=75){
			LODOP.ADD_PRINT_TEXT(175,208,315,16,ghdwyhzh);
		}else{
			LODOP.ADD_PRINT_TEXT(172,208,315,16,ghdwyhzh);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-3);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
	}
	printSkmOneByOne(fpmx.skm,120,551);
	var slFlag = true;
	$.each(fpmx.mxzb,function(i,n){
		if((fpmx.qdbz=="1"&&(n.fphxz==3||n.fphxz==4))||(fpmx.qdbz=="0"&&(n.fphxz<=2))){
			if(n.sl!=0 || (n.sl+"")=="" || (n.sl==0&&n.se!=0)){
				slFlag = false;
			}
			var spbmSl=n.sl;
			if(n.spbm){
				if(n.lslbs=="1"){
					spbmSl="免税";
				}
				if(n.lslbs=="2"){
					spbmSl="不征税";
				}
				if(n.lslbs=="3"){
					spbmSl="0%";
				}
			}
			if(fpmx.bmbbbh){
				if(fpmx.qdbz=="1"&&fpmx.zhsl==0&&n.fphxz==3){
					spbmSl="0%";
				}
			}
			//差额征税
			if(fpmx.zsfs=="2" && n.sl==0){
				spbmSl = "0***";
			}
			if(fpmx.zsfs=="2" && n.sl!=0){
				spbmSl = "1***";
			}
			addPrintLineDzfp(i,n.spmc,n.ggxh,n.dw,n.spsl?delRight(n.spsl.toFixed(6)):"",n.spdj?delRight(n.spdj.toFixed(6)):"",n.je.toFixed(2),spbmSl,n.se.toFixed(2));
		}
	});
	var hjje = (fpmx.hjje*1).toFixed(2);
	var hjjeLen = countStrLength(hjje);
	LODOP.ADD_PRINT_TEXT(345,551,129,20,hjje);
	LODOP.SET_PRINT_STYLEA(0,"FontName","Courier New");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
	LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
	addMoney(346,551+129-hjjeLen*9.2-12);
	var hjse = (fpmx.se*1).toFixed(2);
	var hjseLen = countStrLength(hjse);
	if(hjse==0){
		hjse="***";
	}else{
		addMoney(346,696+135-hjseLen*9.2-12);
	}
	LODOP.ADD_PRINT_TEXT(345,696,135,20,hjse);
	LODOP.SET_PRINT_STYLEA(0,"FontName","Courier New");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
	LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
	LODOP.ADD_PRINT_TEXT(376,307,311,20,(fpmx.jshj<0?'(负数)':'') + fpmx.jshjdx);
	addMoney(374,680);
	LODOP.SET_PRINT_STYLEA(0,"Stretch",2);
	LODOP.ADD_PRINT_TEXT(373,695,135,20,fpmx.jshj.toFixed(2));
	LODOP.SET_PRINT_STYLEA(0,"FontName","Courier New");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
	var xhdwmc = fpmx.xhdwmc;
	var xhdwmcLen = countStrLength(xhdwmc);
	if(xhdwmcLen<=50){
		LODOP.ADD_PRINT_TEXT(405,208,315,16,xhdwmc);
	}else if(xhdwmcLen<=56){
		LODOP.ADD_PRINT_TEXT(401,208,315,16,xhdwmc);
		LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
		LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-5);
	}else if(xhdwmcLen<=64){
		if(xhdwmcLen<=60){
			LODOP.ADD_PRINT_TEXT(405,208,315,16,xhdwmc);
		}else{
			LODOP.ADD_PRINT_TEXT(402,208,315,16,xhdwmc);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-4);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
	}else{
		if(xhdwmcLen<=75){
			LODOP.ADD_PRINT_TEXT(405,208,315,16,xhdwmc);
		}else{
			LODOP.ADD_PRINT_TEXT(403,208,315,16,xhdwmc);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-3);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
	}
	LODOP.ADD_PRINT_TEXT(419,225,276,15,fpmx.xhdwdm);
	LODOP.SET_PRINT_STYLEA(0,"FontName","Courier New");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
	var xhdwdzdh = fpmx.xhdwdzdh;
	var xhdwdzdhLen = countStrLength(xhdwdzdh);
	if(xhdwdzdhLen<=50){
		LODOP.ADD_PRINT_TEXT(438,208,315,16,xhdwdzdh);
	}else if(xhdwdzdhLen<=56){
		LODOP.ADD_PRINT_TEXT(434,208,315,16,xhdwdzdh);
		LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
		LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-5);
	}else if(xhdwdzdhLen<=64){
		if(xhdwdzdhLen<=60){
			LODOP.ADD_PRINT_TEXT(438,208,315,16,xhdwdzdh);
		}else{
			LODOP.ADD_PRINT_TEXT(435,208,315,16,xhdwdzdh);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-4);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
	}else{
		if(xhdwdzdhLen<=75){
			LODOP.ADD_PRINT_TEXT(438,208,315,16,xhdwdzdh);
		}else{
			LODOP.ADD_PRINT_TEXT(436,208,315,16,xhdwdzdh);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-3);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
	}
	var xhdwyhzh = fpmx.xhdwyhzh;
	var xhdwyhzhLen = countStrLength(xhdwyhzh);
	if(xhdwyhzhLen<=50){
		LODOP.ADD_PRINT_TEXT(455,208,315,16,xhdwyhzh);
	}else if(xhdwyhzhLen<=56){
		LODOP.ADD_PRINT_TEXT(451,208,315,16,xhdwyhzh);
		LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
		LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-5);
	}else if(xhdwyhzhLen<=64){
		if(xhdwyhzhLen<=60){
			LODOP.ADD_PRINT_TEXT(455,208,315,16,xhdwyhzh);
		}else{
			LODOP.ADD_PRINT_TEXT(452,208,315,16,xhdwyhzh);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-4);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
	}else{
		if(xhdwyhzhLen<=75){
			LODOP.ADD_PRINT_TEXT(455,208,315,16,xhdwyhzh);
		}else{
			LODOP.ADD_PRINT_TEXT(453,208,315,16,xhdwyhzh);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-3);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
	}
			
	var bzLen = countStrLength(fpmx.bz);
	if(bzLen<=130){
		LODOP.ADD_PRINT_TEXT(405,539,307,61,fpmx.bz?fpmx.bz:"");
	}else{
		LODOP.ADD_PRINT_TEXT(403,539,307,61,fpmx.bz?fpmx.bz:"");
		LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-3);
	}
	LODOP.ADD_PRINT_TEXT(477,152,152,15,fpmx.skr);
	LODOP.ADD_PRINT_TEXT(477,359,115,15,fpmx.fhr);
	var kpr = fpmx.kpr;
	var kprLen = countStrLength(kpr);
	if(kprLen<=14){
		LODOP.ADD_PRINT_TEXT(476,536,91,15,kpr);
		LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	}else{
		LODOP.ADD_PRINT_TEXT(477,536,91,15,kpr);
	}
}
function printDzfpQD(fpmx){
	LODOP.SET_PRINT_STYLE("FontColor","#0000FF");
	LODOP.ADD_PRINT_TEXT(41,216,330,35,"销售货物或者提供应税劳务清单");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	LODOP.SET_PRINT_STYLEA(0,"Bold",1);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.SET_PRINT_STYLEA(0,"Horient",2);
	LODOP.ADD_PRINT_TEXT(90,20,534,22,"购货单位名称:"+fpmx.ghdwmc);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(120,20,535,23,"销货单位名称:"+fpmx.xhdwmc);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(154,20,358,24,"所属增值税普通发票（电子）代码:"+fpmx.fpdm);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(154,395,157,23,"号码:"+fpmx.fphm);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(154,585,114,25," 第#页/共&页");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",2);
	LODOP.ADD_PRINT_LINE(840,70,190,71,0,1);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_LINE(780,300,190,301,0,1);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_LINE(780,358,190,359,0,1);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_LINE(780,400,190,401,0,1);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_LINE(780,454,190,455,0,1);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_LINE(780,528,190,529,0,1);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_LINE(780,613,190,614,0,1);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_LINE(780,642,190,643,0,1);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_LINE(841,20,840,710,0,1);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_LINE(191,20,190,710,0,1);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_LINE(840,20,190,21,0,1);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_LINE(190,710,840,711,0,1);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(195,20,50,20,"序号");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(195,120,145,20,"货物（劳务）名称");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_LINE(215,20,216,710,0,1);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(195,307,54,20,"规格型号");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(195,365,34,20,"单位");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(195,411,40,20,"数量");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(195,475,40,20,"单价");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(195,552,40,20,"金额");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(195,617,35,20,"税率");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(195,662,40,20,"税额");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(850,36,143,25,"销货单位（章）:");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	var kprq = fpmx.kprq;
	kprq = kprq.substring(0,4)+"年"+kprq.substring(4,6)+"月"+kprq.substring(6,8)+"日";
	LODOP.ADD_PRINT_TEXT(850,473,223,25,"开票日期:"+kprq);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(875,36,600,25,"注：本清单一式两联：第一联，销售方留存；第二联，销售方送交购买方。");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_LINE(781,20,782,710,0,1);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(800,24,44,25,"备注");
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(788,72,630,47,fpmx.bz);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(760,20,50,20,"合计");
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	LODOP.ADD_PRINT_TEXT(740,20,50,20,"小计");
	LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
	LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
	var upV = 220;
	var num = 0;
	var mxzbArr = fpmx.mxzb;
	var qdxms = new Array();
	for(var i=0;i<mxzbArr.length;i++){
		var mxzb = mxzbArr[i];
		if(mxzb.fphxz<3){
			qdxms.push(mxzb);
		}
	}
	var qdPages = Math.ceil(qdxms.length/26);//总页数
	var qdPage = 0;//页号-1
	var pageXjje = 0;//单页小计金额
	var pageXjse = 0;//单页小计税额
	var pageHjje = 0;//此页为止合计金额
	var pageHjse = 0;//此页为止合计税额
	var qdslFlag = true;
	var qdslPageFlag = true;
	for(var n=0;n<qdxms.length;n++){
		var mxzb = qdxms[n];
		LODOP.ADD_PRINT_TEXT(upV+20*num,20,50,20,n+1);
		LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
		LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
		
		var spmc = mxzb.spmc;
		var mcLen = countStrLength(spmc);
		if(mcLen<=34){
			LODOP.ADD_PRINT_TEXT(upV+20*num,75,217,20,spmc);
		}else if(mcLen<=36){
			LODOP.ADD_PRINT_TEXT(upV+20*num,75,217,20,spmc);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
		}else{
			LODOP.ADD_PRINT_TEXT(upV+20*num,75,217,20,spmc);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-3);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
		LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
		
		var ggxh = mxzb.ggxh;
		var ggLen = countStrLength(ggxh);
		if(ggLen<=8){
			LODOP.ADD_PRINT_TEXT(upV+20*num,301,58,20,ggxh);
		}else if(ggLen<=16){
			LODOP.ADD_PRINT_TEXT(upV+20*num,301,58,20,ggxh);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-5);
		}else if(ggLen<=20){
			LODOP.ADD_PRINT_TEXT(upV+20*num,301,58,20,ggxh);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-3);
		}else if(ggLen<=24){
			LODOP.ADD_PRINT_TEXT(upV+20*num,301,58,20,ggxh);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",5);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-3);
		}else{
			LODOP.ADD_PRINT_TEXT(upV+20*num,301,58,20,ggxh);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",5);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-4);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
		LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
		
		var dw = mxzb.dw;
		var dwLen = countStrLength(dw);
		if(dwLen<=5){
			LODOP.ADD_PRINT_TEXT(upV+20*num,360,42,20,dw);
		}else if(dwLen<=10){
			LODOP.ADD_PRINT_TEXT(upV+20*num,360,42,20,dw);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-4);
		}else{
			LODOP.ADD_PRINT_TEXT(upV+20*num,360,42,20,dw);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-3);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
		LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
		
		var spslLen = countStrLength(mxzb.spsl?mxzb.spsl:"");
		LODOP.ADD_PRINT_TEXT(upV+20*num,391,70,20,mxzb.spsl?delRight(mxzb.spsl.toFixed(6)):"");
		if(spslLen>10){
			LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-6);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
		LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
		
		LODOP.ADD_PRINT_TEXT(upV+20*num,450,87,20,mxzb.spdj?delRight(mxzb.spdj.toFixed(6)):"");
		LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
		LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
		
		LODOP.ADD_PRINT_TEXT(upV+20*num,530,85,20,mxzb.je.toFixed(2));
		LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
		LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
		pageXjje = pageXjje + parseFloat(mxzb.je);
		pageHjje = pageHjje + parseFloat(mxzb.je);
		
		var qdsl=mxzb.sl;
		if(qdsl==0){
			if(mxzb.spbm){
				if(mxzb.lslbs=="1"){
					qdsl="免税";
				}
				if(mxzb.lslbs=="2"){
					qdsl="不征税";
				}
				if(mxzb.lslbs=="3"){
					qdsl="0%";
				}
			}else{
				qdsl="***";
			}
			if(qdsl=="不征税"){
				LODOP.ADD_PRINT_TEXT(upV+20*num,610,40,20,qdsl);
				LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
			}else{
				LODOP.ADD_PRINT_TEXT(upV+20*num,614,34,20,qdsl);
			}
			LODOP.SET_PRINT_STYLEA(0,"FontName","Courier New");
		}else{
			LODOP.ADD_PRINT_TEXT(upV+20*num,614,34,20,((qdsl+"").length>4&&(qdsl+"").substring(4,5)*1>0?(qdsl*100).toFixed(1):(qdsl*100).toFixed())+"%");
			qdslFlag = false;
			qdslPageFlag = false;
		}
		LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
		LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
	
		var qdse = mxzb.se.toFixed(2);
		pageXjse = pageXjse + parseFloat(qdse);
		pageHjse = pageHjse + parseFloat(qdse);
		if(qdse==0){
			qdse="***";
			LODOP.ADD_PRINT_TEXT(upV+20*num,644,69,20,qdse);
			LODOP.SET_PRINT_STYLEA(0,"FontName","Courier New");
		}else{
			LODOP.ADD_PRINT_TEXT(upV+20*num,644,69,20,qdse);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
		LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
		if(num!=0&&num%25==0){
			LODOP.ADD_PRINT_TEXT(743,514,110,20,pageXjje.toFixed(2));
			LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
			LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
			LODOP.SET_PRINT_STYLEA(0,"PageIndex",qdPage+1);
			var xjse = pageXjse.toFixed(2);
			if(xjse==0){
				xjse = "***";
			}
			LODOP.ADD_PRINT_TEXT(743,628,100,20,xjse);
			LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
			LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
			LODOP.SET_PRINT_STYLEA(0,"PageIndex",qdPage+1);
			LODOP.ADD_PRINT_TEXT(763,514,110,20,pageHjje.toFixed(2));
			LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
			LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
			LODOP.SET_PRINT_STYLEA(0,"PageIndex",qdPage+1);
			var hjse = pageHjse.toFixed(2);
			if(hjse==0){
				hjse = "***";
			}
			LODOP.ADD_PRINT_TEXT(763,628,100,20,hjse);
			LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
			LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
			LODOP.SET_PRINT_STYLEA(0,"PageIndex",qdPage+1);
			
			LODOP.NewPage();
			qdPage++;
			pageXjje = 0;
			pageXjse = 0;
			num = 0;
		}else{
			if(n==qdxms.length-1){
				LODOP.ADD_PRINT_TEXT(743,514,110,20,pageXjje.toFixed(2));
				LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
				LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
				LODOP.SET_PRINT_STYLEA(0,"PageIndex",qdPages);
				var xjse = pageXjse.toFixed(2);
				if(xjse==0){
					xjse = "***";
				}
				LODOP.ADD_PRINT_TEXT(743,628,100,20,xjse);
				LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
				LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
				LODOP.SET_PRINT_STYLEA(0,"PageIndex",qdPages);
				LODOP.ADD_PRINT_TEXT(763,514,110,20,pageHjje.toFixed(2));
				LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
				LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
				LODOP.SET_PRINT_STYLEA(0,"PageIndex",qdPages);
				var hjse = pageHjse.toFixed(2);
				if(hjse==0){
					hjse = "***";
				}
				LODOP.ADD_PRINT_TEXT(763,628,100,20,hjse);
				LODOP.SET_PRINT_STYLEA(0,"FontColor","#000000");
				LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
				LODOP.SET_PRINT_STYLEA(0,"PageIndex",qdPages);
			}else{
				num++;
			}
		}
	}
}
function addPrintLineDzfp(i,mc,gg,dw,spsl,dj,je,sl,se){
	if(mc){
		var mcLen = countStrLength(mc);
			if(mcLen<=30){
			LODOP.ADD_PRINT_TEXT(217+i*17,82,197,20,mc);
		}else if(mcLen<=34){
			LODOP.ADD_PRINT_TEXT(217+i*17,82,197,20,mc);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-6);
		}else if(mcLen<=40){
			LODOP.ADD_PRINT_TEXT(217+i*17,82,197,20,mc);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-4);
		}else{
			LODOP.ADD_PRINT_TEXT(214+i*17,82,197,20,mc);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-3);
		}
	}
	if(gg){
		var ggLen = countStrLength(gg);
		if(ggLen<=14){
			LODOP.ADD_PRINT_TEXT(217+i*17,281,97,20,gg);
		}else if(ggLen<=16){
			LODOP.ADD_PRINT_TEXT(217+i*17,281,97,20,gg);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-6);
		}else if(ggLen<=18){
			LODOP.ADD_PRINT_TEXT(217+i*17,281,97,20,gg);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-4);
		}else{
			LODOP.ADD_PRINT_TEXT(214+i*17,281,97,20,gg);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-3);
		}
	}
	if(dw){
		var dwLen = countStrLength(dw);
		if(dwLen<=6){
			LODOP.ADD_PRINT_TEXT(217+i*17,378,45,20,dw);
		}else if(dwLen<=8){
			LODOP.ADD_PRINT_TEXT(217+i*17,378,45,20,dw);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-6);
		}else{
			LODOP.ADD_PRINT_TEXT(214+i*17,378,45,20,dw);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
			LODOP.SET_PRINT_STYLEA(0,"LineSpacing",-3);
		}
	}
	if(spsl){
		var spslLen = countStrLength(spsl);
		LODOP.ADD_PRINT_TEXT(217+i*17,405,87,20,spsl);
		if(spslLen>11){
			LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
		}
		LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
	}
	if(dj){
		var djLen = countStrLength(dj);
		LODOP.ADD_PRINT_TEXT(217+i*17,481,87,20,dj);
		if(djLen>11){
			LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
		}
		LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
	}
	if(je){
		LODOP.ADD_PRINT_TEXT(217+i*17,569,110,20,je);
		LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
	}
	if((sl+"")!="" && sl=="0" && se==0){
		sl="***";
		LODOP.ADD_PRINT_TEXT(217+i*17,684,37,20,sl);
		LODOP.SET_PRINT_STYLEA(0,"FontName","Courier New");
	}else if(sl=="0***"||sl=="1***"){
		LODOP.ADD_PRINT_TEXT(217+i*17,684,37,20,"***");
		LODOP.SET_PRINT_STYLEA(0,"FontName","Courier New");
	}else if(sl=="免税" || sl=="不征税" || sl=="0%"){
		if(sl=="不征税"){
			LODOP.ADD_PRINT_TEXT(217+i*17,680,40,20,sl);
			LODOP.SET_PRINT_STYLEA(0,"FontSize",7);
		}else{
			LODOP.ADD_PRINT_TEXT(217+i*17,684,37,20,sl);
		}
		LODOP.SET_PRINT_STYLEA(0,"FontName","Courier New");
	}else if(sl==null || (sl+"")=="" || (sl=="0"&&se!=0)){
		LODOP.ADD_PRINT_TEXT(217+i*17,684,37,20,"");
	}else{
		LODOP.ADD_PRINT_TEXT(217+i*17,684,37,20,((sl+"").length>4&&(sl+"").substring(4,5)*1>0?(sl*100).toFixed(1):(sl*100).toFixed())+"%");
	}
	LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
	
	if(se==0){
		se="***";
		LODOP.ADD_PRINT_TEXT(217+i*17,726,104,20,se);
		LODOP.SET_PRINT_STYLEA(0,"FontName","Courier New");
	}else{
		LODOP.ADD_PRINT_TEXT(217+i*17,726,104,20,se);
	}
	LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
}
function filterMxzbPrint(fpmx){
	var qdbz = fpmx.qdbz=="1";
	return $.map(fpmx.mxzb,function(n){
		return (!qdbz||(qdbz&&(n.fphxz=="3"||n.fphxz=="4")))&&n.fphxz!="99"?n:null;
	});
}
function filterMxzbQDPrint(fpmx){
	var qdbz = fpmx.qdbz=="1";
	return $.map(fpmx.mxzb,function(n){
		return (qdbz&&(n.fphxz=="1"||n.fphxz=="2"||n.fphxz=="0"))&&n.fphxz!="99"?n:null;
	});
}

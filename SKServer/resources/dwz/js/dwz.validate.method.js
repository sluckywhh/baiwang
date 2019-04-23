/**
 * @requires jquery.validate.js
 * @author ZhangHuihua@msn.com
 */
(function($){
	if ($.validator) {
		$.validator.addMethod("alphanumeric", function(value, element) {
			return this.optional(element) || /^\w+$/i.test(value);
		}, "Letters, numbers or underscores only please");
		
		$.validator.addMethod("lettersonly", function(value, element) {
			return this.optional(element) || /^[a-z]+$/i.test(value);
		}, "Letters only please"); 
		
		$.validator.addMethod("phone", function(value, element) {
			return this.optional(element) || /^[0-9 \(\)]{7,30}$/.test(value);
		}, "Please specify a valid phone number");
		
		$.validator.addMethod("postcode", function(value, element) {
			return this.optional(element) || /^[0-9 A-Za-z]{5,20}$/.test(value);
		}, "Please specify a valid postcode");
		
		$.validator.addMethod("date", function(value, element) {
			value = value.replace(/\s+/g, "");
			if (String.prototype.parseDate){
				var $input = $(element);
				var pattern = $input.attr('dateFmt') || 'yyyy-MM-dd';
	
				return !$input.val() || $input.val().parseDate(pattern);
			} else {
				return this.optional(element) || value.match(/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/);
			}
		}, "Please enter a valid date.");
		
		/*自定义js函数验证
		 * <input type="text" name="xxx" customvalid="xxxFn(element)" title="xxx" />
		 */
		$.validator.addMethod("customvalid", function(value, element, params) {
			try{
				return eval('(' + params + ')');
			}catch(e){
				return false;
			}
		}, "Please fix this field.");
		
		$.validator.addClassRules({
			date: {date: true},
			alphanumeric: { alphanumeric: true },
			lettersonly: { lettersonly: true },
			phone: { phone: true },
			postcode: {postcode: true}
		});
		$.validator.setDefaults({errorElement:"span"});
		$.validator.autoCreateRanges = true;
		
		
		//自定义
		$.validator.addMethod("nsrsbh", function(value, element) {
			return this.optional(element) || /[a-zA-Z0-9]{15,20}/.test(value);
		}, "Letters, numbers only please");
		
		$.validator.addMethod("ym", function(value, element) {
			return this.optional(element) || /^[A-Za-z0-9_]+([\.\-][A-Za-z0-9_]+)*$/.test(value);
		}, "");
		
		$.validator.addMethod("ipdz", function(value, element) {
			return this.optional(element) || /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$/i.test(value);
		}, "Please specify a valid IP");
		
		$.validator.addMethod("hzyw", function(value, element) {
			var $e = $(element);
			var maxL = $e.attr("maxLength");
			var pass = window.countStrLength&&maxL&&countStrLength($e.val())<=maxL;
			return this.optional(element) || pass;
		}, "out of maxlength");
		
		$.validator.addMethod("alphanumeric1", function(value, element) {
			return this.optional(element) || /(?=.*[0-9])(?=.*[a-zA-Z]).{6,30}/.test(value);
		}, "Letters, numbers only please");
		
		$.validator.addMethod("alphanumeric2", function(value, element) {
			return this.optional(element) || /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,30}/.test(value);
		}, "Letters, numbers only please");
		
		$.validator.addMethod("alphanumeric3", function(value, element) {
			return this.optional(element) || /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,30}/.test(value);
		}, "Letters, numbers only please");
	}

})(jQuery);
!function () {


// sm4.js

    /*! sm4-1.0.js (c) Windard Yang | https://www.windard.com/
     */
    /*
     * sm4-1.0.js
     *
     * Copyright (c) 2014 Windard Yang (www.windard.com)
     */
    /**
     * @fileOverview
     * @name sm4-1.0.js
     * @author Windard (www.windard.com)
     * @version 1.0.0 (2016-11-17)
     */

    /* this is sm4 in javascript by windard , today is 2016 11-17 ,
     *I'm afraid that can I finished this project , but after all
     *in December, everything will be done , that's prefect
     */

    /*
     * garbage , rubbish programe language, should havn't big decimal number
     * can't circular bitwise left shift, can do xor well
     */

    /*
     * fuck it at all , finally finished it , and there has many other works need to do
     *
     */


    var SboxTable = new Array();
    SboxTable[0] = new Array(0xd6, 0x90, 0xe9, 0xfe, 0xcc, 0xe1, 0x3d, 0xb7, 0x16, 0xb6, 0x14, 0xc2, 0x28, 0xfb, 0x2c, 0x05);
    SboxTable[1] = new Array(0x2b, 0x67, 0x9a, 0x76, 0x2a, 0xbe, 0x04, 0xc3, 0xaa, 0x44, 0x13, 0x26, 0x49, 0x86, 0x06, 0x99);
    SboxTable[2] = new Array(0x9c, 0x42, 0x50, 0xf4, 0x91, 0xef, 0x98, 0x7a, 0x33, 0x54, 0x0b, 0x43, 0xed, 0xcf, 0xac, 0x62);
    SboxTable[3] = new Array(0xe4, 0xb3, 0x1c, 0xa9, 0xc9, 0x08, 0xe8, 0x95, 0x80, 0xdf, 0x94, 0xfa, 0x75, 0x8f, 0x3f, 0xa6);
    SboxTable[4] = new Array(0x47, 0x07, 0xa7, 0xfc, 0xf3, 0x73, 0x17, 0xba, 0x83, 0x59, 0x3c, 0x19, 0xe6, 0x85, 0x4f, 0xa8);
    SboxTable[5] = new Array(0x68, 0x6b, 0x81, 0xb2, 0x71, 0x64, 0xda, 0x8b, 0xf8, 0xeb, 0x0f, 0x4b, 0x70, 0x56, 0x9d, 0x35);
    SboxTable[6] = new Array(0x1e, 0x24, 0x0e, 0x5e, 0x63, 0x58, 0xd1, 0xa2, 0x25, 0x22, 0x7c, 0x3b, 0x01, 0x21, 0x78, 0x87);
    SboxTable[7] = new Array(0xd4, 0x00, 0x46, 0x57, 0x9f, 0xd3, 0x27, 0x52, 0x4c, 0x36, 0x02, 0xe7, 0xa0, 0xc4, 0xc8, 0x9e);
    SboxTable[8] = new Array(0xea, 0xbf, 0x8a, 0xd2, 0x40, 0xc7, 0x38, 0xb5, 0xa3, 0xf7, 0xf2, 0xce, 0xf9, 0x61, 0x15, 0xa1);
    SboxTable[9] = new Array(0xe0, 0xae, 0x5d, 0xa4, 0x9b, 0x34, 0x1a, 0x55, 0xad, 0x93, 0x32, 0x30, 0xf5, 0x8c, 0xb1, 0xe3);
    SboxTable[10] = new Array(0x1d, 0xf6, 0xe2, 0x2e, 0x82, 0x66, 0xca, 0x60, 0xc0, 0x29, 0x23, 0xab, 0x0d, 0x53, 0x4e, 0x6f);
    SboxTable[11] = new Array(0xd5, 0xdb, 0x37, 0x45, 0xde, 0xfd, 0x8e, 0x2f, 0x03, 0xff, 0x6a, 0x72, 0x6d, 0x6c, 0x5b, 0x51);
    SboxTable[12] = new Array(0x8d, 0x1b, 0xaf, 0x92, 0xbb, 0xdd, 0xbc, 0x7f, 0x11, 0xd9, 0x5c, 0x41, 0x1f, 0x10, 0x5a, 0xd8);
    SboxTable[13] = new Array(0x0a, 0xc1, 0x31, 0x88, 0xa5, 0xcd, 0x7b, 0xbd, 0x2d, 0x74, 0xd0, 0x12, 0xb8, 0xe5, 0xb4, 0xb0);
    SboxTable[14] = new Array(0x89, 0x69, 0x97, 0x4a, 0x0c, 0x96, 0x77, 0x7e, 0x65, 0xb9, 0xf1, 0x09, 0xc5, 0x6e, 0xc6, 0x84);
    SboxTable[15] = new Array(0x18, 0xf0, 0x7d, 0xec, 0x3a, 0xdc, 0x4d, 0x20, 0x79, 0xee, 0x5f, 0x3e, 0xd7, 0xcb, 0x39, 0x48);

    var CK = new Array(
        0x00070e15, 0x1c232a31, 0x383f464d, 0x545b6269,
        0x70777e85, 0x8c939aa1, 0xa8afb6bd, 0xc4cbd2d9,
        0xe0e7eef5, 0xfc030a11, 0x181f262d, 0x343b4249,
        0x50575e65, 0x6c737a81, 0x888f969d, 0xa4abb2b9,
        0xc0c7ced5, 0xdce3eaf1, 0xf8ff060d, 0x141b2229,
        0x30373e45, 0x4c535a61, 0x686f767d, 0x848b9299,
        0xa0a7aeb5, 0xbcc3cad1, 0xd8dfe6ed, 0xf4fb0209,
        0x10171e25, 0x2c333a41, 0x484f565d, 0x646b7279
    );

    var FK = new Array(0xa3b1bac6, 0x56aa3350, 0x677d9197, 0xb27022dc);

// function bigxor(a, b) {
// 	if (a.toString(2).length < 33 && b.toString(2).length < 33){		
// 		return a ^ b
// 	}
// 	var abin = a.toString(2);
// 	var bbin = b.toString(2);
// 	var loggest = abin.length >= bbin.length ? abin.length : bbin.length;
// 	abin = abin.length == loggest ? abin :"0".repeat(loggest - abin.length) + abin;
// 	bbin = bbin.length == loggest ? bbin :"0".repeat(loggest - bbin.length) + bbin;
// 	var result = "";
// 	for (var i = loggest - 1; i >= 0; i--) {
// 		result = abin[i] == bbin[i] ? '0'+result : '1'+result; 
// 	};
// 	return parseInt(result, 2);
// }

    function bigxor(a, b) {
        return a ^ b
    }

// function leftshift(a, n, size=32) {
// 	var result = new Array(size);
// 	result.fill(0);
// 	var bin = a.toString(2);
// 	bin = bin.length == size ? bin :"0".repeat(size - bin.length) + bin;
// 	for (var i = bin.length - 1; i >= 0; i--) {
// 		result[(i - n + size)%size] = bin[i];
// 	};
// 	result = result.join("");
// 	return parseInt(result, 2);
// }

    function leftshift(a, n, size) {
        if (!size) size = 32
        n = n % size
        return (a << n) | (a >>> (size - n))
    }

    function prefixInteger(str, length) {
        return Array(length + 1).join("0").split("").concat(String(str).split(""))
            .slice(-length).join("");
    }

// function sm4Sbox(a) {
// 	var a1 = prefixInteger(a.toString(16),8).slice(0,2);
// 	var a2 = prefixInteger(a.toString(16),8).slice(2,4);
// 	var a3 = prefixInteger(a.toString(16),8).slice(4,6);
// 	var a4 = prefixInteger(a.toString(16),8).slice(6,8);
// 	var b1 = SboxTable[parseInt(a1[0], 16)][parseInt(a1[1], 16)];
// 	var b2 = SboxTable[parseInt(a2[0], 16)][parseInt(a2[1], 16)];
// 	var b3 = SboxTable[parseInt(a3[0], 16)][parseInt(a3[1], 16)];
// 	var b4 = SboxTable[parseInt(a4[0], 16)][parseInt(a4[1], 16)];
// 	return parseInt(prefixInteger(b1.toString(16), 2) + prefixInteger(b2.toString(16), 2) + prefixInteger(b3.toString(16), 2) + prefixInteger(b4.toString(16), 2) , 16)
// }

    function sm4Sbox(a) {
        var b1 = SboxTable[(a & 0xf0000000) >>> 28][(a & 0x0f000000) >>> 24]
        var b2 = SboxTable[(a & 0x00f00000) >>> 20][(a & 0x000f0000) >>> 16]
        var b3 = SboxTable[(a & 0x0000f000) >>> 12][(a & 0x00000f00) >>> 8]
        var b4 = SboxTable[(a & 0x000000f0) >>> 4][(a & 0x0000000f) >>> 0]
        return (b1 << 24) | (b2 << 16) | (b3 << 8) | (b4 << 0)
    }

    function GET_ULONG_BE(a) {
        a = sm4Sbox(a)
        return bigxor(bigxor(bigxor(a, leftshift(a, 2)), bigxor(leftshift(a, 10), leftshift(a, 18))), leftshift(a, 24))
    }

    function PUT_ULONG_BE(b) {
        b = sm4Sbox(b)
        return bigxor(b, bigxor(leftshift(b, 13), leftshift(b, 23)));
    }

    function sm4_getkey(MK) {
        var K = new Array();
        var rk = new Array();
        K[0] = bigxor(MK[0], FK[0]);
        K[1] = bigxor(MK[1], FK[1]);
        K[2] = bigxor(MK[2], FK[2]);
        K[3] = bigxor(MK[3], FK[3]);

        for (var i = 0; i < 32; i++) {
            K[i + 4] = bigxor(K[i], PUT_ULONG_BE(bigxor(bigxor(K[i + 1], K[i + 2]), bigxor(K[i + 3], CK[i]))));
            rk[i] = K[i + 4].toString(16);
        }
        ;
        return rk;
    }

    function KJUR_encrypt_sm4(messsage, key, method) {
        if (!method) method = "cbc"
        var MK = key;
        var X = messsage;
        var rk = sm4_getkey(MK);
        for (var i = 0; i < 32; i++) {
            X[i + 4] = bigxor(X[i], GET_ULONG_BE(bigxor(bigxor(X[i + 1], X[i + 2]), bigxor(X[i + 3], parseInt(rk[i], 16)))))
        }
        ;
        //将负数10进制转16进制
        var x35 = parseInt(X[35], 10);
        var x34 = parseInt(X[34], 10);
        var x33 = parseInt(X[33], 10);
        var x32 = parseInt(X[32], 10);
        if (x35 < 0) {
            x35 = (x35 >>> 0);
        }
        if (x34 < 0) {
            x34 = (x34 >>> 0);
        }
        if (x33 < 0) {
            x33 = (x33 >>> 0);
        }
        if (x32 < 0) {
            x32 = (x32 >>> 0);
        }
        var Y = new Array(x35.toString(16), x34.toString(16), x33.toString(16), x32.toString(16))
        return Y;
    }


    function KJUR_decrypt_sm4(ciphertext, key, method) {
        if (!method) method = "cbc"
        var MK = key;
        var X = ciphertext;
        var frk = sm4_getkey(MK);
        var rk = new Array()
        for (var i = frk.length - 1; i >= 0; i--) {
            rk[frk.length - 1 - i] = frk[i]
        }
        ;
        for (var i = 0; i < 32; i++) {
            X[i + 4] = bigxor(X[i], GET_ULONG_BE(bigxor(bigxor(X[i + 1], X[i + 2]), bigxor(X[i + 3], parseInt(rk[i], 16)))))
        }
        ;
        var Y = new Array(X[35].toString(16), X[34].toString(16), X[33].toString(16), X[32].toString(16))
        return Y;
    }


//base64.js

    function Base64() {

        // private property
        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        // public method for encoding
        this.encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        }

        // public method for decoding
        this.decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        }

        // private method for UTF-8 encoding
        _utf8_encode = function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        }

        // private method for UTF-8 decoding
        _utf8_decode = function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }

    function _utf8_encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }


//sm4util.js


    var base = new Base64();

    function getBytes(chrList) {
        var bytes = [];
        for (var i = 0; i < chrList.length; i++) {
            bytes.push(chrList.charCodeAt(i));
        }
        return bytes;
    }

    function doJieMiBytes(msg) {
        var arr = msg.split(",");
        var val = "";
        for (var i = 0; i < arr.length; i++) {
            val += String.fromCharCode(parseInt(arr[i], 16));
        }
        return val;
    }

    function sm4_jiemi_one_round(ciphertext, key) {

        for (var j = 0; j < ciphertext.length; j++) {
            ciphertext[j] = parseInt(ciphertext[j], 16)
        }
        var ret = KJUR_decrypt_sm4(ciphertext, key);

        var out = new Array();
        for (var i = 0; i < ret.length; ++i) {
            var str = ret[i].toString();
            if (str.length < 8) {
                var temp = "";
                for (var j = 0; j < 8 - str.length; ++j) {
                    temp += "0";
                }
                str = temp + str;
            }
            out.push(str.substring(0, 2));
            out.push(str.substring(2, 4));
            out.push(str.substring(4, 6));
            out.push(str.substring(6, 8));

        }
        return out;
    }

    function padding(input) {
        var p = 16 - input.length % 16;
        var ret = new Array(input.length + p);
        for (var i = 0; i < input.length; ++i) {
            ret[i] = getHexValue(input[i]);
        }
        for (var i = 0; i < p; i++) {
            ret[input.length + i] = getHexValue(p);
        }

        return ret;
    }

    function unPadding(input) {

        var p = parseInt(input[input.length - 1], 16);
        var ret = new Array(input.length - p);
        for (var i = 0; i < input.length - p; ++i) {
            ret[i] = input[i];
        }

        return ret;
    }

    function sm4_one_round(message, key) {
        ciphertext = KJUR_encrypt_sm4(message, key);
        for (var i = 0; i < ciphertext.length; ++i) {
            var str = ciphertext[i];
            if (str.length < 8) {
                var temp = "";
                for (var j = 0; j < 8 - str.length; ++j) {
                    temp += "0";
                }
                str = temp + str;
                ciphertext[i] = str;
            }
        }
        return ciphertext;
    }

    function getHexValue(p) {
        var num = p.toString(16);
        if (num.length == 1) {
            num = "0" + num;
        }
        if (num.length != 2) {
            alert('异常:' + p);
        }
        return num;
    }

    function getKeyBytes(keyStr) {

        var input = getBytes(keyStr);
        if (input.length != 16) {
            return;
        }
        var message = new Array();
        message.push(parseInt('0x' + getHexValue(input[0]) + getHexValue(input[1]) + getHexValue(input[2]) + getHexValue(input[3], 16)));
        message.push(parseInt('0x' + getHexValue(input[4]) + getHexValue(input[5]) + getHexValue(input[6]) + getHexValue(input[7], 16)));
        message.push(parseInt('0x' + getHexValue(input[8]) + getHexValue(input[9]) + getHexValue(input[10]) + getHexValue(input[11], 16)));
        message.push(parseInt('0x' + getHexValue(input[12]) + getHexValue(input[13]) + getHexValue(input[14]) + getHexValue(input[15], 16)));
        return message;
    }


    function encryptData_ECB(msg, keyStr) {

        var key = getKeyBytes(keyStr);
        if (key == '') {
            return;
        }
        var input = getBytes(base.encode(msg));
        input = padding(input);
        var outPut = new Array();
        var length = input.length;
        for (; length > 0; length -= 16) {
            var message = new Array();
            message.push(parseInt('0x' + input[input.length - length] + input[input.length - length + 1] + input[input.length - length + 2] + input[input.length - length + 3], 16));
            message.push(parseInt('0x' + input[input.length - length + 4] + input[input.length - length + 5] + input[input.length - length + 6] + input[input.length - length + 7], 16));
            message.push(parseInt('0x' + input[input.length - length + 8] + input[input.length - length + 9] + input[input.length - length + 10] + input[input.length - length + 11], 16));
            message.push(parseInt('0x' + input[input.length - length + 12] + input[input.length - length + 13] + input[input.length - length + 14] + input[input.length - length + 15], 16));
            outPut = outPut.concat(sm4_one_round(message, key));
        }

        return base.encode(outPut.join(','));
    }


    function decryptData_ECB(msg, keyStr) {

        var key = getKeyBytes(keyStr);
        if (key == '') {
            return;
        }

        var content = base.decode(msg);
        var ciphertext = content.split(",");
        var result = "";
        var length = ciphertext.length;
        var outPut = new Array();
        for (; length > 0; length -= 4) {
            var message = new Array();
            message.push(ciphertext[ciphertext.length - length]);
            message.push(ciphertext[ciphertext.length - length + 1]);
            message.push(ciphertext[ciphertext.length - length + 2]);
            message.push(ciphertext[ciphertext.length - length + 3]);
            outPut = outPut.concat(sm4_jiemi_one_round(message, key));
        }
        outPut = unPadding(outPut);
        return base.decode(doJieMiBytes(outPut.join(',')));
    }

    window.decryptData_ECB = decryptData_ECB
    window.encryptData_ECB = encryptData_ECB
    window.Base64 = Base64
}();



function encryptLoginPwd(a, b) {
    if (b) {
        a = getCodeFromSM3(a).concat(CryptoJS.MD5(a)).concat(CryptoJS.enc.Utf8.parse(a));
    }
    var c = encryptData_ECB(a, "meiyouyongaesaes");
    return c;
}

// JScript File
function formatCurrencyNo(txt) {
    var num = document.getElementById(txt).value;
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    if (sign && num != "0") {
        document.getElementById(txt).value = (((sign) ? '' : '-') + num);
    }
    else {
        document.getElementById(txt).value = null;
    }
}
function formatCurrency_No(number) {
    var num = number;
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num);
}
function formatCurrency(txt) {
    var num = document.getElementById(txt).value;
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    document.getElementById(txt).value = (((sign) ? '' : '-') + num);
}
function formatCurrency(txt, txt1) {
    var num = document.getElementById(txt).value;
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    document.getElementById(txt).value = (((sign) ? '' : '-') + num);

    var num1 = document.getElementById(txt).value;
    num1 = num1.toString().replace(/\$|\,/g, '');
    if (isNaN(num1))
        num1 = "0";
    document.getElementById(txt1).innerHTML = docso(num1);

}
function formatCurrencyv2(txt, txt1, a) {
    var num = document.getElementById(txt).value;
    num = num.toString().replace(/\$|\,/g, '');
    if (Number.isNaN(num))
        num = "0";
    if (num === "" || num === null)
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    document.getElementById(txt).value = (((sign) ? '' : '-') + num);
    var num1 = document.getElementById(txt).value;
    num1 = num1.toString().replace(/\$|\,/g, '');
    if (isNaN(num1))
        num1 = "0";
    num1 = parseInt(num1);
    num1 = num1 * parseInt(a);
    sign1 = (num1 == (num1 = Math.abs(num1)));
    num1 = Math.floor(num1 * 100 + 0.50000000001);
    cents = num1 % 100;
    num1 = Math.floor(num1 / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num1.length - (1 + i)) / 3); i++)
        num1 = num1.substring(0, num1.length - (4 * i + 3)) + ',' +
            num1.substring(num1.length - (4 * i + 3));
    document.getElementById(txt1).innerHTML = (((sign1) ? '' : '-') + num1);

}
function formatCurrencyV2(txt) {
    var num = document.getElementById(txt).value;
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    document.getElementById(txt).value = (((sign) ? '' : '-') + num);

    var num1 = document.getElementById(txt).value;
    num1 = num1.toString().replace(/\$|\,/g, '');
    if (isNaN(num1))
        num1 = "0";
    document.getElementById(txt).setAttribute("data-content", docso(num1));
    var id = document.getElementById(txt).getAttribute("aria-describedby");
    $("#" + id + " .popover-body").html(docso(num1))
    $('#' + txt).popover('show');
}

function formatCurrencyV3(txt) {
    var num = document.getElementById(txt).value;
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    document.getElementById(txt).value = (((sign) ? '' : '-') + num);

    var num1 = document.getElementById(txt).value;
    num1 = num1.toString().replace(/\$|\,/g, '');
    if (isNaN(num1))
        num1 = "0";
}

function tientragoc(a, b, c) {
    var num1 = document.getElementById(a).value;
    num1 = num1.toString().replace(/\$|\,/g, '');
    if (isNaN(num1))
        num1 = "0";
    var num2 = document.getElementById(b).value;
    num2 = num2.toString().replace(/\$|\,/g, '');
    if (isNaN(num2))
        num2 = "0";
    if (num1 > 0 && num2 > 0) {
        document.getElementById(c).innerHTML = formatCurrency_No(num1 / num2);
    }
}
function tienHoaHong(a, b) {
    var num1 = document.getElementById(a).value;
    num1 = num1.toString().replace(/\$|\,/g, '');
    if (isNaN(num1))
        num1 = "0";
    if (num1 > 0) {
        var _soHoaHong = num1 * 0.012;
        document.getElementById(b).value = formatCurrency_No(_soHoaHong);
    }
}

function tientragoc_V2(tienvay, BocTrongVong, SoNgay, SoThang, Show) {
    var num1 = document.getElementById(tienvay).value;
    num1 = num1.toString().replace(/\$|\,/g, '');
    if (isNaN(num1))
        num1 = "0";
    var num2 = document.getElementById(BocTrongVong).value;
    num2 = num2.toString().replace(/\$|\,/g, '');
    if (isNaN(num2))
        num2 = "0";

    var num3 = document.getElementById(SoNgay).value;
    num3 = num3.toString().replace(/\$|\,/g, '');
    if (isNaN(num3))
        num3 = "0";

    var num4 = SoThang;
    if (isNaN(num4))
        num4 = "0";

    if (num1 > 0 && num2 > 0 && num3 > 0) {
        document.getElementById(Show).innerHTML = formatCurrency_No((num1 / num2) / (num3 * num4));
    }
}

function numbersonly(myfield, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 8 && (charCode != 45 || myfield.value.indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode != 46 || myfield.value.indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;
    return true;
}
var mangso = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
function dochangchuc(so, daydu) {
    var chuoi = "";
    chuc = Math.floor(so / 10);
    donvi = so % 10;
    if (chuc > 1) {
        chuoi = " " + mangso[chuc] + " mươi";
        if (donvi == 1) {
            chuoi += " mốt";
        }
    } else if (chuc == 1) {
        chuoi = " mười";
        if (donvi == 1) {
            chuoi += " một";
        }
    } else if (daydu && donvi > 0) {
        chuoi = " lẻ";
    }
    if (donvi == 5 && chuc > 1) {
        chuoi += " lăm";
    } else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
        chuoi += " " + mangso[donvi];
    }
    return chuoi;
}
function docblock(so, daydu) {
    var chuoi = "";
    tram = Math.floor(so / 100);
    so = so % 100;
    if (daydu || tram > 0) {
        chuoi = " " + mangso[tram] + " trăm";
        chuoi += dochangchuc(so, true);
    } else {
        chuoi = dochangchuc(so, false);
    }
    return chuoi;
}
function dochangtrieu(so, daydu) {
    var chuoi = "";
    trieu = Math.floor(so / 1000000);
    so = so % 1000000;
    if (trieu > 0) {
        chuoi = docblock(trieu, daydu) + " triệu";
        daydu = true;
    }
    nghin = Math.floor(so / 1000);
    so = so % 1000;
    if (nghin > 0) {
        chuoi += docblock(nghin, daydu) + " nghìn";
        daydu = true;
    }
    if (so > 0) {
        chuoi += docblock(so, daydu);
    }
    return chuoi;
}
function docso(so) {
    if (so == 0) return mangso[0];
    var chuoi = "", hauto = "";
    do {
        ty = so % 1000000000;
        so = Math.floor(so / 1000000000);
        if (so > 0) {
            chuoi = dochangtrieu(ty, true) + hauto + chuoi;
        } else {
            chuoi = dochangtrieu(ty, false) + hauto + chuoi;
        }
        hauto = " tỷ";
    } while (so > 0);
    chuoi = chuoi.substring(1, 2).toUpperCase() + chuoi.substring(2) + " đồng";
    return chuoi;
}

function formatCurrencyV22(txt) {
    var num = txt;
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    txt = (((sign) ? '' : '-') + num);

    var num1 = txt;
    num1 = num1.toString().replace(/\$|\,/g, '');
    if (isNaN(num1))
        num1 = "0";
    console.log(docso(num1)) ;
    console.log(num1) ;
    console.log(formatMoney(num1)) ;


}

function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};
formatCurrencyV22('53540358');
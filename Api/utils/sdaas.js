function formatCurrencyV2(txt) {
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
    document.getElementById(txt).setAttribute("data-content", docso(num1));
    var id = document.getElementById(txt).getAttribute("aria-describedby");
    $("#" + id + " .popover-body").html(docso(num1));
    $('#' + txt).popover('show');
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
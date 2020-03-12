Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + parseInt(days));
    return date;
}
function getTotalDays(date1, date2) {   //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    console.log(date1);
    var date2_ms = date2.addDays(1).getTime();    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;        // Convert back to days and return
    return Math.round(difference_ms / one_day);
}
function monthDiff(dt1, dt2, cachTinhLai) {
    if (cachTinhLai == 1) {
        dt1.setDate(dt1.getDate() + 1)
    }
    var dateNext = dt1
    var countMonth = 0
    while (dateNext <= dt2) {
        countMonth += 1
        dateNext.setMonth(dateNext.getMonth() + 1);
    }
    //if (dateNext > dt2) {
    //    countMonth += 1
    //}
    //var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    //diff /= (60 * 60 * 24 * 7 * 4);
    //Math.abs(Math.ceil(diff.toFixed(1)))
    return countMonth;

}
function tinhNgayTraGoc_Origin(idSoLanTra, idTotalNgayVay, idCountTypePaid, idNgayVay, idNgayTraGoc, idThang, cachTinhLai) {
    // if ($("#" + idNgayTraGoc).length > 0 && ($("#" + idNgayTraGoc)[0].readOnly || $("#" + idNgayTraGoc)[0].disabled)) {
    //     var soLanTra = $("#" + idSoLanTra).val()
    //     var tongSoNgayVay = $("#" + idTotalNgayVay).val()
    //     var counTypePaid = $("#" + idCountTypePaid).val()
    //     var ngayVay = $("#" + idNgayVay).val()
    //     var date = new Date(ngayVay.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
    //     if (tongSoNgayVay && tongSoNgayVay != "") {
    //         tongSoNgayVay = parseInt(tongSoNgayVay)
    //     }
    //     else if (counTypePaid && counTypePaid != "" && soLanTra && soLanTra != "") {
    //         tongSoNgayVay = parseInt(counTypePaid) * parseInt(soLanTra)
    //
    //     }
    //     else {
    //         tongSoNgayVay = 0
    //     }
    //     var ngayTra = date.addDays(tongSoNgayVay - 1)
    //     if (ngayTra < date) {
    //         ngayTra = date
    //     }
    //     if (cachTinhLai == 1) {
    //         ngayTra = date.addDays(tongSoNgayVay)
    //     }
    //     if ($("#" + idThang).length > 0 && $("#" + idThang)[0].checked && $("#" + idTotalNgayVay).length == 0) {
    //         var currentDate = date.getDate();
    //         // Set to day 1 to avoid forward
    //         date.setDate(1);
    //         // Increase month
    //         date.setMonth(date.getMonth() + tongSoNgayVay);
    //         // Get max # of days in this new month
    //         var daysInMonth = new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
    //         // Set the date to the minimum of current date of days in month
    //         date.setDate(Math.min(currentDate, daysInMonth));
    //
    //         ngayTra = date;
    //         if (cachTinhLai == 2 || cachTinhLai == 1) {
    //             ngayTra = date.addDays(- 1)
    //         }
    //
    //     }
    //     var dd = ngayTra.getDate();
    //     var mm = ngayTra.getMonth() + 1; //January is 0!
    //
    //     var yyyy = ngayTra.getFullYear();
    //     if (dd < 10) {
    //         dd = '0' + dd;
    //     }
    //     if (mm < 10) {
    //         mm = '0' + mm;
    //     }
    //     var formatDate = dd + '/' + mm + '/' + yyyy;
    //     if (tongSoNgayVay > 0) {
    //         document.getElementById(idNgayTraGoc).value = formatDate;
    //     }
    //     else {
    //         document.getElementById(idNgayTraGoc).value = "";
    //     }
    // }
    // else {
    //     var counTypePaid = $("#" + idCountTypePaid).length > 0 ? parseFloat($("#" + idCountTypePaid).val()) : 1;
    //     var ngayVay = $("#" + idNgayVay).val()
    //     var ngayTra = $("#" + idNgayTraGoc).val()
    //     var dateNgayVay = new Date(ngayVay.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
    //     var dateNgayTra = new Date(ngayTra.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
    //     var tongSoNgayVay = getTotalDays(dateNgayVay, dateNgayTra);
    //     if (cachTinhLai == 1) {
    //         tongSoNgayVay = tongSoNgayVay - 1;
    //     }
    //     if ($("#" + idThang).length > 0 && $("#" + idThang)[0].checked && $("#" + idTotalNgayVay).length == 0) {
    //         tongSoNgayVay = monthDiff(dateNgayVay, dateNgayTra, cachTinhLai);
    //     }
    //     if (tongSoNgayVay < 1) {
    //         tongSoNgayVay = 1;
    //     }
    //     if ($("#" + idTotalNgayVay).length > 0) {
    //         if (tongSoNgayVay) {
    //             document.getElementById(idTotalNgayVay).value = tongSoNgayVay;
    //         }
    //         else {
    //             document.getElementById(idTotalNgayVay).value = "";
    //         }
    //     }
    //     else {
    //         //(tongSoNgayVay % counTypePaid==0 ? 0 : 1) +
    //         var soLanTra = Math.ceil(tongSoNgayVay / counTypePaid);
    //         if (soLanTra < 1) {
    //             soLanTra = 1
    //         }
    //         if (soLanTra && document.getElementById(idNgayTraGoc).value != '') {
    //             document.getElementById(idSoLanTra).value = soLanTra;
    //         }
    //         else {
    //             document.getElementById(idSoLanTra).value = "";
    //         }
    //     }
    // }
    //
    // return true;
}
function tinhNgayTraGoc(idNgayVay, idSoLanTra, idTotalNgayVay, idCountTypePaid, idNgayTraGoc, idThang, cachTinhLai) {
    if ($("#" + idNgayTraGoc).length > 0 && ($("#" + idNgayTraGoc)[0].readOnly || $("#" + idNgayTraGoc)[0].disabled)) {
        var soLanTra = $("#" + idSoLanTra).val()
        var tongSoNgayVay = $("#" + idTotalNgayVay).val()
        var counTypePaid = $("#" + idCountTypePaid).val()
        var ngayVay = $("#" + idNgayVay).val()
        var date = new Date(ngayVay.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
        if (tongSoNgayVay && tongSoNgayVay != "") {
            tongSoNgayVay = parseInt(tongSoNgayVay)
        }
        else if (counTypePaid && counTypePaid != "" && soLanTra && soLanTra != "") {
            tongSoNgayVay = parseInt(counTypePaid) * parseInt(soLanTra)

        }
        else {
            tongSoNgayVay = 0
        }
        var ngayTra = date.addDays(tongSoNgayVay - 1)
        if (ngayTra < date) {
            ngayTra = date
        }
        if (cachTinhLai == 1) {
            ngayTra = date.addDays(tongSoNgayVay)
        }
        if ($("#" + idThang).length > 0 && $("#" + idThang)[0].checked && $("#" + idTotalNgayVay).length == 0) {
            var currentDate = date.getDate();
            // Set to day 1 to avoid forward
            date.setDate(1);
            // Increase month
            date.setMonth(date.getMonth() + tongSoNgayVay);
            // Get max # of days in this new month
            var daysInMonth = new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
            // Set the date to the minimum of current date of days in month
            date.setDate(Math.min(currentDate, daysInMonth));

            ngayTra = date;
            if (cachTinhLai == 2 || cachTinhLai == 1) {
                ngayTra = date.addDays(- 1)
            }

        }
        var dd = ngayTra.getDate();
        var mm = ngayTra.getMonth() + 1; //January is 0!

        var yyyy = ngayTra.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var formatDate = dd + '/' + mm + '/' + yyyy;
        if (tongSoNgayVay > 0) {
            document.getElementById(idNgayTraGoc).value = formatDate;
        }
        else {
            document.getElementById(idNgayTraGoc).value = "";
        }
    }
    else {
        var counTypePaid = idCountTypePaid.length > 0 ? parseFloat(idCountTypePaid) : 1;
        var ngayVay = idNgayVay
        var ngayTra = idNgayTraGoc
        var dateNgayVay = new Date(ngayVay.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
        var dateNgayTra = new Date(ngayTra.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
        var tongSoNgayVay = getTotalDays(dateNgayVay, dateNgayTra);
        if (cachTinhLai == 1) {
            tongSoNgayVay = tongSoNgayVay - 1;
        }
        if (idThang.length > 0 && idTotalNgayVay.length == 0) {
            tongSoNgayVay = monthDiff(dateNgayVay, dateNgayTra, cachTinhLai);
        }
        if (tongSoNgayVay < 1) {
            tongSoNgayVay = 1;
        }
        if ($("#" + idTotalNgayVay).length > 0) {
            if (tongSoNgayVay) {
                document.getElementById(idTotalNgayVay).value = tongSoNgayVay;
            }
            else {
                document.getElementById(idTotalNgayVay).value = "";
            }
        }
        else {
            //(tongSoNgayVay % counTypePaid==0 ? 0 : 1) +
            var soLanTra = Math.ceil(tongSoNgayVay / counTypePaid);
            if (soLanTra < 1) {
                soLanTra = 1
            }
            if (soLanTra && document.getElementById(idNgayTraGoc).value != '') {
                document.getElementById(idSoLanTra).value = soLanTra;
            }
            else {
                document.getElementById(idSoLanTra).value = "";
            }
        }
    }

    return true;
}

function tinhNgayTraGocv3(idSoLanTra, idTotalNgayVay, idCountTypePaid, idNgayVay, idNgayTraGoc, idThang, idThangDinhKy, cachTinhLai) {
    if ($("#" + idNgayTraGoc).length > 0 && ($("#" + idNgayTraGoc)[0].readOnly || $("#" + idNgayTraGoc)[0].disabled)) {
        var soLanTra = $("#" + idSoLanTra).val()
        var tongSoNgayVay = $("#" + idTotalNgayVay).val()
        var counTypePaid = $("#" + idCountTypePaid).val()
        var ngayVay = $("#" + idNgayVay).val()
        var date = new Date(ngayVay.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
        if (tongSoNgayVay && tongSoNgayVay != "") {
            tongSoNgayVay = parseInt(tongSoNgayVay)
        }
        else if (counTypePaid && counTypePaid != "" && soLanTra && soLanTra != "") {
            tongSoNgayVay = parseInt(counTypePaid) * parseInt(soLanTra)
        }
        else {
            tongSoNgayVay = 0
        }
        var ngayTra = date.addDays(tongSoNgayVay - 1)
        if (ngayTra < date) {
            ngayTra = date
        }
        if (cachTinhLai == 1) {
            ngayTra = date.addDays(tongSoNgayVay)
        }

        if ($("#" + idThang).length > 0 && $("#" + idThang)[0].checked && $("#" + idTotalNgayVay).length == 0) {
            var currentDate = date.getDate();
            // Set to day 1 to avoid forward
            date.setDate(1);
            // Increase month
            date.setMonth(date.getMonth() + tongSoNgayVay);
            // Get max # of days in this new month
            var daysInMonth = new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
            // Set the date to the minimum of current date of days in month
            date.setDate(Math.min(currentDate, daysInMonth));

            ngayTra = date;
            if (cachTinhLai == 2 || cachTinhLai == 1) {
                ngayTra = date.addDays(- 1)
            }
        }
        if ($("#" + idThangDinhKy).length > 0 && $("#" + idThangDinhKy)[0].checked && $("#" + idTotalNgayVay).length == 0) {
            var currentDate = date.getDate();
            // Set to day 1 to avoid forward
            date.setDate(1);
            // Increase month
            date.setMonth(date.getMonth() + tongSoNgayVay);
            // Get max # of days in this new month
            var daysInMonth = new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
            // Set the date to the minimum of current date of days in month
            date.setDate(Math.min(currentDate, daysInMonth));

            ngayTra = date;
            if (cachTinhLai == 2 || cachTinhLai == 1) {
                ngayTra = date.addDays(- 1)
            }
        }
        var dd = ngayTra.getDate();
        var mm = ngayTra.getMonth() + 1; //January is 0!

        var yyyy = ngayTra.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var formatDate = dd + '/' + mm + '/' + yyyy;
        if (tongSoNgayVay > 0) {
            document.getElementById(idNgayTraGoc).value = formatDate;
        }
        else {
            document.getElementById(idNgayTraGoc).value = "";
        }
    }
    else {
        var counTypePaid = $("#" + idCountTypePaid).length > 0 ? parseFloat($("#" + idCountTypePaid).val()) : 1;
        var ngayVay = $("#" + idNgayVay).val()
        var ngayTra = $("#" + idNgayTraGoc).val()
        var dateNgayVay = new Date(ngayVay.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
        var dateNgayTra = new Date(ngayTra.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
        var tongSoNgayVay = getTotalDays(dateNgayVay, dateNgayTra);
        if (cachTinhLai == 1) {
            tongSoNgayVay = tongSoNgayVay - 1;
        }
        if ($("#" + idThang).length > 0 && $("#" + idThang)[0].checked && $("#" + idTotalNgayVay).length == 0) {
            tongSoNgayVay = monthDiff(dateNgayVay, dateNgayTra, cachTinhLai);
        }
        if ($("#" + idThangDinhKy).length > 0 && $("#" + idThangDinhKy)[0].checked && $("#" + idTotalNgayVay).length == 0) {
            tongSoNgayVay = monthDiff(dateNgayVay, dateNgayTra, cachTinhLai);
        }
        if (tongSoNgayVay < 1) {
            tongSoNgayVay = 1;
        }
        if ($("#" + idTotalNgayVay).length > 0) {
            if (tongSoNgayVay) {
                document.getElementById(idTotalNgayVay).value = tongSoNgayVay;
            }
            else {
                document.getElementById(idTotalNgayVay).value = "";
            }
        }
        else {
            var soLanTra = Math.ceil(tongSoNgayVay / counTypePaid);
            if (soLanTra < 1) {
                soLanTra = 1
            }
            if (soLanTra && document.getElementById(idNgayTraGoc).value != '') {
                document.getElementById(idSoLanTra).value = soLanTra;
            }
            else {
                document.getElementById(idSoLanTra).value = "";
            }
        }
    }
    return true;
}
function tinhNgayTraGocNhanVay3(idSoLanTra, idCountTypePaid, idNgayVay, idNgayTraGoc, idThang, idThangDinhKy, cachTinhLai) {
    if ($("#" + idNgayTraGoc).length > 0 && ($("#" + idNgayTraGoc)[0].readOnly || $("#" + idNgayTraGoc)[0].disabled)) {
        var soLanTra = $("#" + idSoLanTra).val()
        var tongSoNgayVay = 1
        var counTypePaid = $("#" + idCountTypePaid).val()
        var ngayVay = $("#" + idNgayVay).val()
        var date = new Date(ngayVay.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
        if (counTypePaid && counTypePaid != "" && soLanTra && soLanTra != "")
            tongSoNgayVay = parseInt(counTypePaid) * parseInt(soLanTra)
        var ngayTra = date.addDays(tongSoNgayVay - 1)
        if (ngayTra < date)
            ngayTra = date
        if (cachTinhLai == 1)
            ngayTra = date.addDays(tongSoNgayVay)
        if ($("#" + idThang).length > 0 && $("#" + idThang)[0].checked) {
            var currentDate = date.getDate();
            date.setDate(1);
            date.setMonth(date.getMonth() + tongSoNgayVay);
            var daysInMonth = new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
            date.setDate(Math.min(currentDate, daysInMonth));
            ngayTra = date;
            if (cachTinhLai == 2 || cachTinhLai == 1) {
                ngayTra = date.addDays(- 1)
            }
        }
        if ($("#" + idThangDinhKy).length > 0 && $("#" + idThangDinhKy)[0].checked) {
            var currentDate = date.getDate();
            date.setDate(1);
            date.setMonth(date.getMonth() + tongSoNgayVay);
            var daysInMonth = new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
            date.setDate(Math.min(currentDate, daysInMonth));
            ngayTra = date;
            if (cachTinhLai == 2 || cachTinhLai == 1)
                ngayTra = date.addDays(- 1)
        }
        var dd = ngayTra.getDate();
        var mm = ngayTra.getMonth() + 1;
        var yyyy = ngayTra.getFullYear();
        if (dd < 10)
            dd = '0' + dd;
        if (mm < 10)
            mm = '0' + mm;
        var formatDate = dd + '/' + mm + '/' + yyyy;
        if (tongSoNgayVay > 0)
            document.getElementById(idNgayTraGoc).value = formatDate;
        else
            document.getElementById(idNgayTraGoc).value = "";
    }
    else {
        var counTypePaid = $("#" + idCountTypePaid).length > 0 ? parseFloat($("#" + idCountTypePaid).val()) : 1;
        var ngayVay = $("#" + idNgayVay).val()
        var ngayTra = $("#" + idNgayTraGoc).val()
        var dateNgayVay = new Date(ngayVay.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
        var dateNgayTra = new Date(ngayTra.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
        var tongSoNgayVay = getTotalDays(dateNgayVay, dateNgayTra);
        if (cachTinhLai == 1)
            tongSoNgayVay = tongSoNgayVay - 1;
        if ($("#" + idThang).length > 0 && $("#" + idThang)[0].checked)
            tongSoNgayVay = monthDiff(dateNgayVay, dateNgayTra, cachTinhLai);
        if ($("#" + idThangDinhKy).length > 0 && $("#" + idThangDinhKy)[0].checked)
            tongSoNgayVay = monthDiff(dateNgayVay, dateNgayTra, cachTinhLai);
        if (tongSoNgayVay < 1)
            tongSoNgayVay = 1;
        var soLanTra = Math.ceil(tongSoNgayVay / counTypePaid);
        if (soLanTra < 1)
            soLanTra = 1
        if (soLanTra && document.getElementById(idNgayTraGoc).value != '')
            document.getElementById(idSoLanTra).value = soLanTra;
        else
            document.getElementById(idSoLanTra).value = "";
    }
    return true;
}
function tinhPhamTram(type, idLaiNgay, idPercent) {
    var laiNgay = $("#" + idLaiNgay).val()
    var percent = $("#" + idPercent).val()
    if (type == 1) {
        laiNgay = laiNgay.replace(/,/g, '')
        var phanTram = parseFloat(laiNgay) * 30 * 100 / 1000000
        document.getElementById(idPercent).value = phanTram;
    }
    else {
        var tienLaiNgay = parseFloat(percent) * 1000000 / (30 * 100)
        document.getElementById(idLaiNgay).value = tienLaiNgay.toFixed(0);
        formatCurrency(idLaiNgay)
    }
    return true
}
function tinhNgayTraGocNhanVay2(loadData) {
    $("#" + loadData).click();
}
function tinhNgayTraGocNhanVay(idSoLanTra, idNgayVay, idNgayThanhToan, idThanhToanTheo, idThang, cachTinhLai, idCheckSolanTra) {
    var isCheckSoLanTra = $("#" + idCheckSolanTra)[0].checked;
    if (isCheckSoLanTra) {
        var soLanTra = $("#" + idSoLanTra).val();
        var thanhToanTheo = $("#" + idThanhToanTheo).val();
        var ngayVay = $("#" + idNgayVay).val();
        var date = new Date(ngayVay.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
        var isThang = $("#" + idThang)[0].checked;
        if (isThang) {
            if (soLanTra > 0 && thanhToanTheo > 0) {
                var currentDate = date.getDate();
                // Set to day 1 to avoid forward
                date.setDate(1);
                // Increase month
                date.setMonth(date.getMonth() + (soLanTra * thanhToanTheo));
                // Get max # of days in this new month
                var daysInMonth = new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
                // Set the date to the minimum of current date of days in month
                date.setDate(Math.min(currentDate, daysInMonth));

                ngayTra = date;

                //date.setMonth(date.getMonth() + (soLanTra * thanhToanTheo));
                //ngayTra = date;
                //if (cachTinhLai == 2) {
                ngayTra = date.addDays(- 1)
                //}
            }
        }
        else {
            if (soLanTra > 0 && thanhToanTheo > 0) {
                ngayTra = date.addDays(soLanTra * thanhToanTheo);
            }
            if (cachTinhLai == 2) {
                if (soLanTra > 0 && thanhToanTheo > 0) {
                    ngayTra = date.addDays((soLanTra * thanhToanTheo) - 1);
                }
            }
        }
        if (ngayTra != null) {
            var dd = ngayTra.getDate();
            var mm = ngayTra.getMonth() + 1;

            var yyyy = ngayTra.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var formatDate = dd + '/' + mm + '/' + yyyy;
            if (soLanTra > 0 && thanhToanTheo > 0) {
                document.getElementById(idNgayThanhToan).value = formatDate;
            }
            else {
                document.getElementById(idNgayThanhToan).value = "";
            }
        }

    }
    else {
        var thanhToanTheo = $("#" + idThanhToanTheo).length > 0 ? parseFloat($("#" + idThanhToanTheo).val()) : 1;
        var ngayVay = $("#" + idNgayVay).val()
        var ngayTra = $("#" + idNgayThanhToan).val()
        var dateNgayVay = new Date(ngayVay.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
        var dateNgayTra = new Date(ngayTra.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
        var tongSoNgayVay = getTotalDays(dateNgayVay, dateNgayTra);
        alert(tongSoNgayVay);
        if (cachTinhLai == 2) {
            tongSoNgayVay = tongSoNgayVay - 1;
        }
        if ($("#" + idThang).length > 0 && $("#" + idThang)[0].checked) {
            tongSoNgayVay = monthDiff(dateNgayVay, dateNgayTra, cachTinhLai);
        }
        if (tongSoNgayVay < 1) {
            tongSoNgayVay = 1;
        }

        var soLanTra = Math.ceil(tongSoNgayVay / thanhToanTheo);
        if (soLanTra < 1) {
            soLanTra = 1
        }
        if (soLanTra && document.getElementById(idNgayThanhToan).value != '') {
            document.getElementById(idSoLanTra).value = soLanTra;
        }
        else {
            document.getElementById(idSoLanTra).value = "";
        }
    }
    return true;
}
function tinhLaiTraGop(idTienVay, idLaiCatTruoc, idTienDuaKhach, idTralaiTruoc, idCheckLaiCatTruoc, idBocTrongVong, idKyGop) {
    var isTraLaiTruoc = $("#" + idTralaiTruoc)[0].checked;
    var isCheckTraLaiTruoc = $("#" + idCheckLaiCatTruoc)[0].checked;
    var isTienVay = $("#" + idTienVay).val();
    isTienVay = isTienVay.replace(/,/g, '');
    if (isTraLaiTruoc) {
        if (isCheckTraLaiTruoc) {
            var isLaiCatTruoc = $("#" + idLaiCatTruoc).val();
            isLaiCatTruoc = isLaiCatTruoc.replace(/,/g, '');
            $("#" + idTienDuaKhach).val(formatMoney(isTienVay - isLaiCatTruoc));
        }
        else {
            var isTienDuaKhach = $("#" + idTienDuaKhach).val();
            isTienDuaKhach = isTienDuaKhach.replace(/,/g, '');
            $("#" + idLaiCatTruoc).val(formatMoney(isTienVay - isTienDuaKhach));
        }
    }
    else {
        var isKyGop = $("#" + idKyGop).val();
        var isBocTrongVong = $("#" + idBocTrongVong).val();
        if (isCheckTraLaiTruoc) {
            var isLaiCatTruoc = $("#" + idLaiCatTruoc).val();
            isLaiCatTruoc = isLaiCatTruoc.replace(/,/g, '');
            if (isKyGop > 0 && isBocTrongVong > 0) {
                $("#" + idTienDuaKhach).val(formatMoney((isLaiCatTruoc * isBocTrongVong) / isKyGop));
            }

        }
        else {
            var isTienDuaKhach = $("#" + idTienDuaKhach).val();
            isTienDuaKhach = isTienDuaKhach.replace(/,/g, '');
            if (isKyGop > 0 && isBocTrongVong > 0) {
                $("#" + idLaiCatTruoc).val(formatMoney((isTienDuaKhach * isKyGop) / isBocTrongVong));
            }
        }
    }
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


// var a = formatMoney('324325543534543423');
// console.log(a);

var ngay1 = new Date('2018-2-20');
var ngay2 = new Date('2019-2-20');
var ngay3 = new Date('2014-11-30T17:00:00.000+00:00');
console.log(ngay2.getDate());
console.log(ngay3.getDate()+'/'+ngay3.getMonth()+'/'+ngay3.getFullYear());

console.log('---------------');
console.log(getTotalDays(ngay1,ngay2));

console.log('---------------');

console.log(monthDiff(ngay1,ngay2,0));
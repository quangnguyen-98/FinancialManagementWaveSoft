function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
        date.setDate(0);
    }
    return date;
}

// Add 12 months to 29 Feb 2016 -> 28 Feb 2017
console.log(addMonths(new Date(2016,1,29),12).toString());

// Subtract 1 month from 1 Jan 2017 -> 1 Dec 2016
console.log(addMonths(new Date(2017,0,1),-1).toString());

// Subtract 2 months from 31 Jan 2017 -> 30 Nov 2016
console.log(addMonths(new Date(2017,0,31),-2).toString());

// Add 2 months to 31 Dec 2016 -> 28 Feb 2017
console.log(addMonths(new Date(2016,11,31),2).toString());

// var a = new Date(2013,12,5);
// console.log(a.getDate());
// console.log(a.getMonth());
// console.log(a.getFullYear());
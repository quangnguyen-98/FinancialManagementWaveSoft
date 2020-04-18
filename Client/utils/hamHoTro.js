function formatCurrency (price){
    let str = price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1.");
    return str;
}

function resetMoney(price) {
    let str = price.toString().replace(/\./g, "");
    if(str.length === 0){
        str = 0;
    }
    return parseInt(str);
}
export {formatCurrency,resetMoney};


// let a = '..4.475.38.4';
// let b = '364475384';
// console.log(resetMoney(a));
// console.log(formatCurrency(b));
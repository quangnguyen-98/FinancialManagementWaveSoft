const ObjectId = require('mongodb').ObjectId;


const id = ObjectId('5e764e63bde33e3574a150fa').getTimestamp();

// var a = id.getTimeStamp();
const date = new Date('6806718978778464257');


console.log(date);
console.log(id);
console.log(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear());
console.log(id.getDate()+"/"+(id.getMonth()+1)+"/"+id.getFullYear());
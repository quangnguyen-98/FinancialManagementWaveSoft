const bcrypt = require('bcrypt');
const saltRounds = 5;
const myPlaintextPassword = 'user';
const someOtherPlaintextPassword = 'pass2';
var hash1 ='$2b$05$6zozeaU2lmXhbmkaxQZa4e2Er1755i3WUuK.fWIBVs5QqpzJcbIv2';

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
        hash1 = hash
    });
});

// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
//     hash = hash;
// });

// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword,'$2b$05$Ohfq9U3yAxKk7fDvNCg/Z.nhf0FR3RtL52LUoU598qAkgd4lUeb1K', function(err, result) {
    // result == true
    console.log('1-------------');
    console.log(result);
});
// bcrypt.compare(someOtherPlaintextPassword, hash1, function(err, result) {
//     // result == false
//     console.log('2-------------');
//     console.log(JSON.stringify(result));
// });
const shortId = require('short-id');
var ids = require('short-id');
ids.configure({
    length: 8,          // The length of the id strings to generate
    algorithm: 'sha1',  // The hashing algoritm to use in generating keys
    salt: Math.random   // A salt value or function
});

module.exports ={
    TaoIdHopDong: 'HD-'+ids.generate().toUpperCase()

}

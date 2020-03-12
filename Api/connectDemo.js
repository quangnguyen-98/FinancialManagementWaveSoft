const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectId;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'FinancialManagement';
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

// Use connect method to connect to the server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // insertDocuments(db, function() {
    //     client.close();
    // });
    // findDocumentsFilter(db,()=>{client.close()});
    updateDocument(db,()=>{client.close()});
});

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('NguoiDung');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}
const findDocumentsFilter = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('NguoiDung');
    // Find some documents

    let idUser = new ObjectId('5e56a5f8d6fd5c0cccfa248d');
    collection.find({_id:idUser}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
}

const updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('NguoiDung');
    // Update document where a is 2, set b equal to 1
    let idUser = new ObjectId('5e56a5f8d6fd5c0cccfa248d');
    collection.updateOne({ _id : idUser }
        , { $set: { diaChi : 'Quận 4' } }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Updated the document with the field a equal to 2");
            callback(result);
        });
}
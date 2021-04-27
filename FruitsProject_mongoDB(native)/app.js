const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url, {
    useUnifiedTopology: true
});

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);


    // Insert multiple documents
    db.collection('fruits').insertMany([
        {
            name: "Apple" ,
            score: 8,
            review: "Great fruit"
        },
        {
            name: "Orange",
            score: 5,
            review: "Kinda sour"
        },
        {
            name: "Banana",
            score: 9,
            review: "Great stuff"
        }
    ], function (err, r) {
        assert.equal(null, err);
        assert.equal(3, r.insertedCount);

        client.close();
    });
    //client.close();
});
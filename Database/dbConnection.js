var MongoClient = require('mongodb').MongoClient;
require("dotenv/config");

connectToDB = () => {
    MongoClient.connect(process.env.MONGO_URI, function(err, client) {
    const collection = client.db("Shortr").collection("urls");
        // perform actions on the collection object
        client.close();
    });
}
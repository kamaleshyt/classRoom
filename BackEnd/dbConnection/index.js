
const {MongoClient}=require('mongodb')
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/jjkps";
const client = new MongoClient(MONGO_URI);
module.exports ={client}

/*

const { MongoClient } = require('mongodb');


const uri = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(uri);


async function connectToMongoDB() {
  try {
    await mongoClient.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}


module.exports = { connectToMongoDB, mongoClient };

*/
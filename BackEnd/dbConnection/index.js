const {MongoClient}=require('mongodb')
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/jjkps";
const client = new MongoClient(MONGO_URI);
module.exports ={client}
const mongoose = require('mongoose');

const Mongodb_uri = 'mongodb://meow11357:meowmeow11357@ac-ctfovez-shard-00-00.nrsbp0y.mongodb.net:27017,ac-ctfovez-shard-00-01.nrsbp0y.mongodb.net:27017,ac-ctfovez-shard-00-02.nrsbp0y.mongodb.net:27017/?replicaSet=atlas-1135kq-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
//meowmeow11357
mongoose.connect(Mongodb_uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to the MongoDB server');
});

db.on('disconnected', () => {
    console.log('Connection is disconnected from the MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB server error:', err);
});

module.exports = db;

const mongoose = require("mongoose");

async function connectMongoDb(url) {
     return mongoose.connect(url)
    .then(() => console.log("Connection of mongodb successful"))
    .catch(err => console.log("Error occuring while mongodb connection"));
}

module.exports = {connectMongoDb};
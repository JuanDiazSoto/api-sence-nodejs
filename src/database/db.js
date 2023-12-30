const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const dbURL = process.env.DB_MONGO;

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then( db =>  console.log("DB is connected"))
  .catch(error => console.error(error))
  
  
  module.exports = mongoose;
  

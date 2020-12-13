
const mongoose = require("mongoose");  
var url = "mongodb://localhost:27017/Profile";
// var url1="mongodb+srv://mano:mageshwari@cluster0-6zoua.mongodb.net/test";
const db =  mongoose.connection

mongoose.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true,useFindAndModify:false,useCreateIndex: true,}, (err, res) => {  
   if(err){ console.log('Failed to connect to '); }  
   else{ console.log('DB Connected Successfully'); }  
}); 
 
  
  
module.exports = db;



// mongodb+srv://mano:<password>@cluster0-6zoua.mongodb.net/test?retryWrites=true&w=majority
const mongoose=require('mongoose');
mongoose.set('strictQuery', true);


const connectDB=(uri)=>
{
// console.log(uri)
    return mongoose.connect(uri),{
        useNewUrlParser: true,
         useCreateIndex: true,
          useUnifiedTopology: true 
    };
}

module.exports=connectDB;
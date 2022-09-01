const express=require('express');
const app=express();

const mongoose=require('./database/mongoose');


//lamda function
app.listen(7070,()=>{
    console.log("Server started on port 3000 great");
});
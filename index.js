const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require('fs');
const PORT = 3000;
const mongoose = require("mongoose");
const { type } = require("os");
const app = express();
const userRouter  = require("./routes/user");
const {connectMongoDb} = require("./connection");
const {logReqRes} = require("./middlewares");

//Connection of mongoose 
connectMongoDb("mongodb://127.0.0.1:27017/family");

//middlewares
app.use(express.urlencoded({ extended : false}));

//Routes
app.use("/users",userRouter);


app.use(logReqRes('task.txt'));



app.listen(PORT , () =>{
    console.log("server is running at port" , PORT);
}
)

//07:57
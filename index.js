const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require('fs');
const PORT = 3000;
const mongoose = require("mongoose");
const { type } = require("os");
const app = express();


//Connection of mongoose 
mongoose.connect("mongodb://127.0.0.1:27017/family")
.then(() => console.log("Connection of mongodb successful"))
.catch(err => console.log("Error occuring while mongodb connection"));

// Schema
const userSchema = new mongoose.Schema({
    firstName : {
        type:String,
        required:true,
    },
    lastName : {
        type:String,
        required:false,
    },
    email:{
        type: String,
        required: true,
        unique : true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String,
    },
},{timestamps:true});

//Making Model

const User = mongoose.model('user',userSchema);

app.get("/" , (req,res) => {
    res.send("hello");
})

//middlewares
app.use(express.urlencoded({ extended : false}));



//Routes
app.get("/users", async (req, res) => {
    const allUsers = await User.find({});
    const html = `
    <ul>
        ${allUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});


//RestAPI
app.get("/api/users",async(req,res)=>{
    const allUsers = await User.find({});
    res.setHeader("X-Myself" , "Amresh Yadav")
    // Always add X(which denote custom header) to the headers
    return res.json(allUsers);
})

app.get("/api/users/:id",async(req,res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
})

app.post("/api/users",async(req,res) =>{
    //TODO : Create new user
    const body = req.body;
    if(!body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender){
        return res.status(400).json({msg:"All fields are required"});
    }
    const result = await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.job_title,
    })
    console.log("result",result);
    return res.status(201).json({message:"success"});
})

app.patch("/api/users/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { lastName: "Devi" }, // The fields to update
        { new: true, runValidators: true } // Options to return the updated document and run validators
    );

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ msg: "Updated successfully", user });
});


app.delete("/api/users/:id",async(req,res) =>{
   await User.findByIdAndDelete(req.params.id);
   return res.json({status : "Success"});
   console.log("deleted" , req.params.id);
})

app.listen(PORT , () =>{
    console.log("server is running at port" , PORT);
}
)
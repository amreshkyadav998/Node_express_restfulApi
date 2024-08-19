const User = require("../models/user")
async function handleGetAllUsers(req,res) {
    const allUsers = await User.find({});
    res.setHeader("X-Myself" , "Amresh Yadav")
    // Always add X(which denote custom header) to the headers
    return res.json(allUsers);
}

async function handleGetAllUsersById(req,res) {
    const user = await User.findById(req.params.id);
    return res.json(user);
}

async function postUsers(req,res) {
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
}

async function patchUserById(req,res) {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { lastName: "Devi" }, // The fields to update
        { new: true, runValidators: true } // Options to return the updated document and run validators
    );

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ msg: "Updated successfully", user });
}

async function deleteUserById(req,res) {
    await User.findByIdAndDelete(req.params.id);
    console.log("deleted" , req.params.id);
   return res.json({status : "Success"});
}

module.exports = {
    handleGetAllUsers,
    handleGetAllUsersById,
    postUsers,
    patchUserById,
    deleteUserById,
}
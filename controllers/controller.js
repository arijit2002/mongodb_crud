const mongooose = require('mongoose');
const User = require('../model/user');

module.exports.createUser = async (req, res) => {
    const { first_name, last_name, city } = req.body;
    const newUser = await new User({first_name,last_name,city}).save();
    res.status(201).send(newUser);
};

module.exports.getAllUsers = async (req, res) => {
    const allUsers = await User.find();
    if(allUsers.length > 0) res.status(200).send(allUsers);
    else res.status(404).send({"message":"empty database"});
};

module.exports.getUserById = async (req, res) => {
    const id = req.body.id;
    const userPresent = await User.findById(id);
    if(userPresent != null) res.status(200).send(userPresent);
    else res.send({"message":"user not present"});
};

module.exports.deleteAllUsers = async (req, res) => {
    const allUsers = await User.remove();
    res.status(200).send("All Users deleted");
};

module.exports.deleteUserById = async (req, res) => {
    const id = req.body.id;
    const userPresent = await User.findByIdAndRemove(id);
    if(userPresent!=null) {res.send({"message":"user deleted"});}
    else res.send({"message":"user not present"});
};

module.exports.updateUserById = async (req, res) => {
    const id = req.body.id;
    if(User.findById(id)!=null) {
        await User.findByIdAndUpdate(id, {$set:req.body});
        res.send("User updated successfully");
    }else{res.send("User not found");}
};

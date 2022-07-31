const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
//Create Schema
const UserSchema = new mongoose.Schema(
    {
        FirstName: {
            type: String,
            required: true
        },
        LastName: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true
        },
        Login: {
            type: String,
            required: true
        },
        Password: {
            type: String,
            required: true
        },
        Verify: {
            type: Boolean,
            required: true
        }
    },
    { collection: 'Users'}
);
const user = mongoose.model("Users", UserSchema);
module.exports = user;
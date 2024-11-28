const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['teacher', 'student'], // Valid values
        required: true,              // Ensure this field is always provided
        default: 'student',          // Default value if not specified
    }
});
const userSchema1 = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  module.exports = mongoose.model('User', userSchema1);
const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
//- add another field in schema for radio button teacher and student
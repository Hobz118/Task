
import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Common fields for all roles
    role: {
        type: String,
        default: 'user',
    },
      gender:{
        type:String,
        enum:["Male","Female"],
        required:true
      }

}, {
    timestamps: true,
});



export const userModel = model('User', userSchema);

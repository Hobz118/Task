
import mongoose, { Schema, model } from 'mongoose';

const moodSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score: {
        type:
         Number,
        required: true,
        min: [1, 'Score must be at least 1'],
        max: [10, 'Score must be at most 10'],
    },
},
    {
        timestamps: true,
    });
    
export const moodModel = model('Mood', moodSchema);
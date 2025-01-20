import { userModel } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { moodModel } from "../../../DB/models/mood.model.js";




export const AddMood=asyncHandler(async(req,res,next)=>{
    const {mood}=req.body
    console.log("mooooooooooooood");
    
    console.log(req.user.id);
    
    const check=await userModel.findById(req.user._id)
    if(!check){
        return next(new Error(`User not found`,{cause:404}))
    }
    const score= await moodModel.create({user:check._id,score:mood})
    return res.status(200).json({mesage:"Mood added successfully",score})
})

export const GetMyHistory=asyncHandler(async(req,res,next)=>{
    const check=await userModel.findById(req.user._id)
    if(!check){
        return next(new Error(`User not found`,{cause:404}))
    }
    const score= await moodModel.find({user:check._id})
    if(!score){
        return next(new Error(`No History found`,{cause:404}))
    }
    return res.status(200).json({mesage:"Mood History",score})
})

export const getLast7Moods = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
  
    if (!userId) {
      return next(new Error('User ID is missing'));
    }
    const moods = await moodModel.find({ user: userId })
      .sort({ createdAt: -1 }) 
      .limit(7);
  
    if (!moods || moods.length === 0) {
      return res.status(404).json({ message: 'No mood entries found' });
    }
  
    return res.status(200).json({ message: 'Last 7 mood entries', moods });
  });

export const checkMood=asyncHandler(async(req,res,next)=>{
  console.log(req.user._id);
  
    const check=await userModel.findById(req.user._id)
    if(!check){
        return next(new Error(`User not found`,{cause:404}))
    }
    const moods = await moodModel.find({ user: req.user._id})
      .sort({ createdAt: -1 }) 
      .limit(7);
  
    if (!moods || moods.length === 0) {
      return res.status(404).json({ message: 'No mood entries found' });
    }
    console.log(moods);
    
    const scores = moods.map(mood => mood.score);


    const avg=calculateAverage(scores)
    console.log(avg)

    if(avg<4){
        return res.status(200).json({mesage:"Consider speaking with a therapist",avg})
    }

    return res.status(200).json({mesage:"Good mood",avg})


})
   
  
function calculateAverage(scores){
    const total = scores.reduce((acc, score) => acc + score, 0);
    const average = total / scores.length;
    const avg=parseFloat(average.toFixed(2))
    return avg;
}
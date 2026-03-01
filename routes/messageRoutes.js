import express from 'express';
import Message from "../models/Messages.js";

const router = express.Router();

//Create a new message 

router.post("/" , async(req,res)=>{
    try{
        const {firstName, lastName, email, subject, message} = req.body;
        //check required feilds 
        if(!firstName || !lastName || !email || !subject || !message){
            return res.status(400).json({message: "All feilds are required"})
        }

        const newMessage = new Message({
            firstName,
            lastName,
            email,
            subject,
            message
        })
        await newMessage.save()
        res.status(201).json({message: "Message sent successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all messages (for admin)
router.get("/" , async(req,res)=>{
    try{
        const messages = await Message.find().sort({createdAt: -1}) //latest first
        res.status(200).json(messages)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

export default router
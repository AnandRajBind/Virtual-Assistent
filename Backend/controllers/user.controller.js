import User from '../models/user.model.js';
import uploadOnCloudinary from '../config/cloudinary.js';
import moment from 'moment';
import geminiResponse from '../gemini.js';

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: 'get current user error' });
    }
}

export const updateAssistant = async (req, res) => {
    try {
        const { assistantName, assistantImageUrl } = req.body;
        let assistantImage;
        if (req.file) {
            assistantImage = await uploadOnCloudinary(req.file.path);
        } else {
            assistantImage = assistantImageUrl;
        }
        const user = await User.findByIdAndUpdate(req.userId, {
            assistantName,
            assistantImage
        }, { new: true }).select('-password');
        return res.status(200).json(user);
    } catch (error) {

        return res.status(400).json({ message: 'update assistant error' });
    }
}

export const askToAssistant = async (req, res) => {
    try {
        const { command } = req.body;
        const user = await User.findById(req.userId);
        user.history.push(command);
        const userName = user.name;
        user.save();

        const assistantName = user.assistantName;
        const result = await geminiResponse(command, assistantName, userName);
        const jsonMatch = result.match(/{[\s\S]*}/);
        if (!jsonMatch) {
            return res.status(400).json({
                response: "sorry , i can t understand"
            });
        }
        const gemResult = JSON.parse(jsonMatch[0]);
        const type = gemResult.type;
        switch (type) {
            case "get_date":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `The current Date is ${moment().format('YYYY-MM-DD')}`
                });
            case "get_time":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `The current time is ${moment().format('hh:mm:ss A')}`
                });
            case "get_day":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Today is ${moment().format('dddd')}`
                });
            case "get_month":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `The current month is ${moment().format('MMMM')}`
                });
            case "google_search":
            case "youtube_search":
            case "youtube_play":
            case "general":
            case "calculator_open":
            case "instagram_open":
            case "facebook_open":
            case "weather_show":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: gemResult.response,
                });
            default:
                return res.status(400).json({
                    response: "sorry , i can t understand"
                });
        }
     } catch (error) {
        console.log(error);
        res.status(500).json({
            response: "Something went wrong",
            details: error.message
        });
    }
};










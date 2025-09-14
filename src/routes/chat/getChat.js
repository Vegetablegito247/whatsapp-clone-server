const { getSocket } = require("../../config/connection");
const Chat = require("../../models/chat");

const getChat = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        const chat = await Chat.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId },
            ],
        }).populate('sender').populate('receiver');

        if (!chat) {
            return res.status(404).json({ message: 'No chat found between the specified users' });
        }

        res.status(200).json({
            message: 'Chat retrieved successfully',
            data: chat,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving chat' });
    }
};

module.exports = getChat;
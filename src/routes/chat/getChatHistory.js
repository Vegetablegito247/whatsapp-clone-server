const Chat = require("../../models/chat");

const getChatHistory = async (req, res) => {
    const { senderId } = req.body;

    try {
        const chats = await Chat.find({
            $or: [{ senderId: senderId }, { receiver: senderId }],
        }).populate("sender").populate("receiver").sort({ createdAt: -1 });

        if (chats || chats.length === 0) {
            return res.status(200).json({ message: 'No chat history found', data: [] });
        }

        // Create a map to group chats by the "other user"
        const chatMap = new Map();

        chats.forEach(chat => {
            const otherUser =
                chat.sender._id.toString() === senderId
                    ? chat.receiver
                    : chat.sender;

            // If not already stored, store the most recent message
            if (!chatMap.has(otherUser._id.toString())) {
                chatMap.set(otherUser._id.toString(), {
                    receiver: otherUser,
                    lastMessage: chat.message,
                    lastMessageTime: chat.createdAt
                });
            }
        });

        const chatHistory = Array.from(chatMap.values());

        res.status(200).json({
            message: "Chat history retrieved successfully",
            data: chatHistory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving chat history" });
    }
};

module.exports = getChatHistory;
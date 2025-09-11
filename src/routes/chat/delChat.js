const mongoose = require('mongoose');
const Chat = require('../../models/chat');
const { getSocket } = require('../../config/connection');

const delChat = async (req, res) => {
    const { id } = req.params;

    try {
        const chatData = await Chat.findByIdAndDelete(id);

        if (!chatData) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        const io = getSocket();

        if(io) {
            const room = [chatData.sender.toString(), chatData.receiver.toString()].sort().join('_');
            io.to(room).emit('delete_msg', chatData);
        }

        res.status(200).json({
            message: 'Message deleted successfully',
            data: chatData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = delChat;
const User = require('../models/users')

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // room for individual user
        socket.on('joinRoom', async (userId) => {
            socket.userId = userId;

            socket.join(userId.toString());
            socket.join('black_cyber');

            io.to('black_cyber').emit('user_online', userId)

            // ✅ Update user online status in DB
            await User.findByIdAndUpdate(
                userId,
                { isOnline: true, lastSeen: new Date() },
                { new: true }
            );

            console.log('User joined room:', userId.toString());
        });

        // room for chat
        socket.on('join_chat_room', ({ room_id, user_id }) => {
            socket.join(room_id);
            console.log('User joined chat room:', room_id);

            // Notify others in the room
            socket.to(room_id).emit('user_present', { user_id, room_id })
        })

        socket.on('leave_chat_room', ({ room_id, user_id }) => {
            socket.leave(room_id);
            console.log(`User ${user_id} left room ${room_id}`);

            // Notify others in the room
            socket.to(room_id).emit('user_absent', { user_id, room_id })
        })

        // Typing events
        socket.on('typing', ({ room_id, user_id }) => {
            socket.to(room_id).emit('user_typing', { user_id });
        });

        socket.on('not_typing', ({ room_id, user_id }) => {
            socket.to(room_id).emit('user_not_typing', { user_id });
        });

        // Logging out
        socket.on('disconnect', async () => {

            // ⚠️ You’ll need to know which user this socket belonged to.
            // Best practice: save userId on socket when they join.
            if (socket.userId) {
                await User.findByIdAndUpdate(
                    socket.userId,
                    { isOnline: false, lastSeen: new Date() },
                    { new: true }
                );
                io.to("black_cyber").emit("user_offline", { userId: socket.userId });
            }
            console.log('User disconnected:', socket.id);
        });
    })
}
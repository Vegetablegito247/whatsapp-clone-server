module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // room for individual user
        socket.on('joinRoom', (userId) => {
            socket.join(userId.toString());
            socket.join('black_cyber');
            io.to('black_cyber').emit('user_online', userId)

            console.log('User joined room:', userId.toString());
        });

        // room for chat
        socket.on('chat_room', (room_id, user_id) => {
            socket.join(room_id);
            console.log('User joined chat room:', room_id);

            // Notify others in the room
            socket.to(room_id).emit('user_present', { user_id, room_id })
        })

        socket.on('leave_room', (room_id, user_id) => {
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
        socket.on('disconnect', () => {
            io.to('black_cyber').emit('user_offline', socket.id)
            console.log('User disconnected:', socket.id);
        });
    })
}
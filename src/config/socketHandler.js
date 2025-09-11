module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // room for individual user
        socket.on('joinRoom', (userId) => {
            socket.join(userId.toString());
            console.log('User joined room:', userId.toString());
        });

        // room for chat
        socket.on('chat_room', (room_id) => {
            socket.join(room_id);
            console.log('User joined chat room:', room_id);
        })
        
        // Logging out
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    })
}
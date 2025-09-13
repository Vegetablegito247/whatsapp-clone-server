const { getSocket } = require('../../config/connection');
const User = require('../../models/users');

const createUser = async (req, res) => {
    const { firstName, lastName, email, phone } = req.body;

    try {
        const existingUser = await User.findOne({ email, phone });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or phone already exists' });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            phone
        });

        const savedUser = await newUser.save();

        const io = getSocket();

        if (io) {
            io.to('black_cyber').emit('new_user', savedUser);
        }

        res.status(201).json({
            message: 'User created successfully',
            data: savedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    };
}

module.exports = createUser;
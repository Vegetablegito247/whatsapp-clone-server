const { getSocket } = require('../../config/connection');
const Profile = require('../../models/profile');

// const createProfile = async (req, res) => {
//     const { user } = req.body;

//     try {
//         const existingProfile = await Profile.findOne({ user });

//         if(existingProfile) {
//             return res.status(400).json({ message: 'Profile email or phone already exists' });
//         }
//     }
// }
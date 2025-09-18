const User = require("../../models/users");

const userOnline = async (req, res) => {
    const { id } = req.params;
    const { lastSeen, isOnline } = req.body;

    try {
        const userData = await User.findByIdAndUpdate(id, { lastSeen, isOnline }, { new: true, runValidators: true });

        if (!userData) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.status(200).json({
            message: 'User status updated successfully',
            data: userData
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = userOnline
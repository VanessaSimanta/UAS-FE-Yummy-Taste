const { getUserByEmail } = require('../models/accountModel');

// Get User
const getUser = async (req, res) => {
    try {
        // Ambil email 
        const email = req.user.email;
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('Error in getUser controller:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    getUser,
};

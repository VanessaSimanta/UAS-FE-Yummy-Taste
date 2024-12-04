const { getUserByEmail } = require('../models/accountModel');
const { updateUserDataByEmail, updateUserPassByEmail, isTokenBlacklisted, addTokenToBlacklist, deleteUserByEmail, fetchAllUsers } = require('../models/accountModel');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const { get } = require('../routes/userRoutes');

// Get User By Email
const getUser = async (req, res) => {
    try {
        const email = req.user.email; 
        const user = await getUserByEmail(email);

        if (!user) {
            console.error('User not found for email:', email); // Log jika user tidak ditemukan
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('Error in getUser controller:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get All User
const getAllUser = async (req, res) => {
    try {
        const users = await fetchAllUsers(); 

        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, message: "No users found" });
        }

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error('Error in getAllUser controller:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



//Update user data
const updateUserData = async (req, res) => {
    try {
        const email = req.user.email;
        const { name, phoneNumber, dateOfBirth } = req.body;

        // Format DOB
        const formattedDateOfBirth = moment(dateOfBirth).format('YYYY-MM-DD');

        // Mengupdate data user berdasarkan email
        const updatedUser = await updateUserDataByEmail(email, name, phoneNumber, formattedDateOfBirth);

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User data updated successfully", data: updatedUser });
    } catch (error) {
        console.error('Error in updateUserData controller:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//Update password user
const updateUserPass = async (req, res) => {
    try {
        const email = req.user.email;
        const {password} = req.body;

        //Update password
        const updateUser = await updateUserPassByEmail (email, password);

        if(!updateUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User password updated successfully", data: updateUser });
    }
    catch (error) {
        console.error('Error in updateUserPass controller:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Log out
const logout = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Authorization token is required' });
        }

        const jwtToken = token.startsWith('Bearer ') ? token.slice(7) : token;

        // Verifikasi token
        jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Invalid or expired token' });
            }

            // Ambil user_id dari decoded token
            const userId = decoded.id;  

            await addTokenToBlacklist(jwtToken, userId);

            res.status(200).json({ success: true, message: 'Successfully logged out' });
        });
    } catch (error) {
        console.error('Error in logout controller:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete Account
const deleteAccount = async (req, res) => {
    try {
        const email = req.user.email;

        const deleteUser = await deleteUserByEmail(email);

        if (!deleteUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User account deleted successfully" });
    } catch (error) {
        console.error('Error in delete account controller:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    getUser, updateUserData, updateUserPass, logout, deleteAccount, getAllUser
};

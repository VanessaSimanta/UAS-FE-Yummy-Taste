const { getUserByEmail } = require('../models/accountModel');
const { updateUserDataByEmail, updateUserPassByEmail } = require('../models/accountModel');
const moment = require('moment');

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

module.exports = {
    getUser, updateUserData, updateUserPass
};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");


const signup = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        if (!['teacher', 'student'].includes(role)) {
            return res.status(400)
                .json({ message: "Invalid role. Must be 'teacher' or 'student'", success: false });
        }
        const userModel = new UserModel({ name, email, password,role });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror AuthControl",
                success: false
            })
    }
}


// const login = async (req, res) => {
//     try {
//         const { email, password,role } = req.body;
//         const user = await UserModel.findOne({ email ,role});
//         const errorMsg = 'Auth failed email or password is wrong';
//         if (!user) {
//             return res.status(403)
//                 .json({ message: errorMsg, success: false });
//         }
//         const isPassEqual = await bcrypt.compare(password, user.password);
//         if (!isPassEqual) {
//             return res.status(403)
//                 .json({ message: errorMsg, success: false });
//         }
//         const jwtToken = jwt.sign(
//             { email: user.email, _id: user._id,role:user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '24h' }
//         )

//         res.status(200)
//             .json({
//                 message: "Login Success",
//                 success: true,
//                 jwtToken,
//                 email,
//                 name: user.name,
//                 role: user.role,
//             })
//     } catch (err) {
//         console.error(err);
//         res.status(500)
//             .json({
//                 message: "Internal server errror LoginAuthControl",
//                 success: false
//             })
//     }
// }
const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Log incoming data
        console.log("Login request received:", { email, role });

        if (!email || !password || !role) {
            console.log("Missing fields:", { email, password, role });
            return res.status(400).json({
                message: "Email, password, and role are required.",
                success: false,
            });
        }

        // Attempt to find the user
        const user = await UserModel.findOne({ email, role });
        if (!user) {
            console.log(`User not found with email: ${email} and role: ${role}`);
            return res.status(403).json({
                message: "Authentication failed. Incorrect email or role.",
                success: false,
            });
        }

        // Log user info
        console.log("User found:", user);

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Password mismatch for email:", email);
            return res.status(403).json({
                message: "Authentication failed. Incorrect password.",
                success: false,
            });
        }

        // Generate JWT token
        console.log("Generating JWT token...");
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        console.log("JWT token generated successfully.");

        // Return success response
        return res.status(200).json({
            message: "Login successful!",
            success: true,
            jwtToken,
            email: user.email,
            name: user.name,
            role: user.role,
        });
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({
            message: "Internal server error in LoginAuthControl",
            success: false,
        });
    }
};
module.exports = {
    signup,
    login
}

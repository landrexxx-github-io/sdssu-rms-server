require("dotenv").config();

const mongoose = require("mongoose");
const AccountSchema = require("../models/account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAccount = async (req, res) => {
    try {
        const results = await AccountSchema.find();

        if (results) {
            res.status(200).send({
                success: true,
                message: "Successfully loaded all acounts",
                results,
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Failed to load all the accounts.",
                results,
            });
        }
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

exports.createAccount = async (req, res) => {
    const {
        first_name,
        last_name,
        middle_initial,
        full_name,
        position,
        college,
        campus,
        username,
        user_type,
        password,
    } = req.body;

    // * VALIDATE if username or password are NOT empty.
    if (
        !first_name ||
        !last_name ||
        !username ||
        !password ||
        !position ||
        !college ||
        !campus ||
        !user_type
    ) {
        return res.json({
            success: false,
            message: "Please fill in the required fields.",
        });
    } else {
        try {
            const isUserExist = await AccountSchema.findOne({ username });
            const hashedPass = bcrypt.hashSync(password, 10);

            // * CHECKS if username does exist before adding a NEW one.
            if (isUserExist) {
                return res.json({
                    success: false,
                    message: "This username already exist. Please try a unique one.",
                });
            } else {
                const user = new AccountSchema({
                    first_name,
                    last_name,
                    middle_initial,
                    full_name,
                    position,
                    college,
                    campus,
                    username,
                    user_type,
                    password: hashedPass,
                });

                // * CHECKS if user is successfully created.
                if (user) {
                    const newAccount = await user.save();
                    return res.status(201).json({
                        success: true,
                        message: "A new account has been successfully created.",
                        result: newAccount,
                    });
                } else {
                    return res.json({
                        success: false,
                        message: "Failed to create a new account.",
                    });
                }
            }
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
};

exports.updateAccount = async (req, res) => {
    const { user_id } = req.body;
    const profile = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).send("Invalid id.");
    }

    const updated = await AccountSchema.findByIdAndUpdate(user_id, profile, {
        new: true,
    });

    res.json(updated);
};

exports.deleteAccount = async (req, res) => {
    const userId = req.user_id;

    try {
        const deletedUser = await AccountSchema.findByIdAndDelete(userId);

        if (deletedUser) {
            return res.status(200).json({
                status: "success",
                message: "User successfully deleted.",
            });
        } else {
            return res.status(400).json({
                status: "error",
                message: "User does not exist.",
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

exports.logoutAccount = async (req, res) => {};

exports.changePassword = async (req, res) => {
    const { username, old_password, new_password } = req.body;

    const user = await AccountSchema.findOne({ username });
    const newlyHashedPassword = bcrypt.hashSync(new_password, 10);

    if(!user) {
        return res.json({
            success: false,
            message: "This username does not exist.",
        });
    } else {
        const isMatch = await bcrypt.compare(old_password, user.password);

        // checks if old password is valid
        if(!isMatch) {
            return res.json({
                success: false,
                message: "Password is incorrect",
            });
        } else {
            const updatePassword = await AccountSchema.findOneAndUpdate(username, { password: newlyHashedPassword }, {
                new: true,
            });

            return res.json({
                updatePassword,
                success: true,
                message: "Password successfully updated. You can now logout your account."
            });
        
            // res.json(updatePassword);
        }
    }
};

// AUTHENTICATION HERE!
exports.loginAccount = async (req, res) => {
    const { username, password } = req.body;

    // VALIDATE if username or password are NOT EMPTY
    if (!username || !password) {
        return res.json({
            success: false,
            message: "Please fill in the required fields.",
        });
    } else {
        // CHECKS if there is a username exist
        const user = await AccountSchema.findOne({ username: username });

        // CHECKS the existence of username
        if (!user) {
            return res.json({
                success: false,
                message: "Invalid username or password.",
            });
        } else {
            try {
                const isMatch = await bcrypt.compare(password, user.password);
                // CHECKS the password matching
                if (isMatch) {
                    // SAVE the user data in a token
                    const token = jwt.sign(
                        { id: user._id },
                        process.env.JWT_SECRET_KEY
                    );
                    return res.status(200).json({
                        success: true,
                        message: "You have successfully logged in.",
                        token,
                        user: {
                            id: user._id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            middle_initial: user.middle_initial,
                            position: user.position,
                            college: user.college,
                            campus: user.campus,
                            user_type: user.user_type,
                        },
                    });
                } else {
                    return res.json({
                        success: false,
                        message: "Invalid username or password.",
                    });
                }
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
        }
    }
};


exports.tokenValidation = async (req, res) => {
    try {
        const bearerHeader = req.headers["authorization"];

        if (typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(" ");
            const token = bearer[1];
            const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

            // VERIFY token whether it is NOT valid.
            if (!verifiedToken) {
                return res.json(false);
            } else {
                const user = await AccountSchema.findById(verifiedToken.id);

                if (user) {
                    return res.json(true);
                } else {
                    return res.json(false);
                }
            }
        } else {
            return res.json(false);
        }
    } catch (error) {
        return res.json(false);
    }
};

exports.getLoggedInUser = async (req, res) => {
    const userId = req.user_id;
    const user = await AccountSchema.findById(userId);

    res.json({
        id: user._id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        middle_initial: user.middle_initial,
        position: user.position,
        college: user.college,
        campus: user.campus,
        user_type: user.user_type,
        field_of_specialization: user.field_of_specialization,
        educational_attainment: user.educational_attainment,
    });
};

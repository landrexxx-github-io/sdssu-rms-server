const express = require("express");
const router = express.Router();

const {
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount,
    changePassword,
    loginAccount,
    logoutAccount,
    tokenValidation,
    getLoggedInUser,
} = require("../controllers/account");

// MIDDLEWARE
const isAuthenticated = require("../middlewares/auth");

router.get("/", getAccount);
router.post("/create", createAccount);
router.patch("/update", updateAccount);
router.patch("/change_password", changePassword);
router.delete("/", isAuthenticated, deleteAccount);

// AUTHENTICATION
router.post("/login", loginAccount);
router.post("/logout", logoutAccount);
router.post("/is_token_valid", tokenValidation);
router.get("/get_logged_in_user", isAuthenticated, getLoggedInUser);

module.exports = router;

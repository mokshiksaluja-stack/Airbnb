const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const User = require("../modals/user");

router.get("/signup", (req, res) => {
    res.render("users/signup");
});

router.post(
    "/signup",
    wrapAsync(async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const newUser = new User({ username, email });
            await User.register(newUser, password);
            req.flash("newAdd", "Welcome to Wanderlust!");
            res.redirect("/listings");
        } catch (e) {
            req.flash("error", e.message);
            res.redirect("/signup");
        }
    })
);

module.exports = router;

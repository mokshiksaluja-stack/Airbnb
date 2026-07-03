const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../modals/user");

router.get("/signup", (req, res) => {
    res.render("users/signup");
});

router.post(
    "/signup",
    wrapAsync(async (req, res, next) => {
        try {
            const { username, email, password } = req.body;
            const newUser = new User({ username, email });
            const registeredUser = await User.register(newUser, password);
            req.login(registeredUser, (err) => {
                if (err) return next(err);
                req.flash("newAdd", "Welcome to Wanderlust!");
                res.redirect("/listings");
            });
        } catch (e) {
            req.flash("error", e.message);
            res.redirect("/signup");
        }
    })
);

router.get("/login", (req, res) => {
    res.render("users/login");
});

router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
        successRedirect: "/listings",
        successFlash: "Logged in successfully!",
    })
);

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you loged out successfully");
        res.redirect("/listings");
    })
})

module.exports = router;

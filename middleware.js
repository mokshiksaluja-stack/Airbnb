module.exports.isLogedIn=(req,res,next)=>{
     if (!req.isAuthenticated()) {
        req.flash("error", "Kindly login first");
        return res.redirect("/login");
    }
    next();
}
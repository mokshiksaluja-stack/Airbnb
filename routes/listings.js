const express = require("express");
const router = express.Router(); express //ke anddr he ek modlue hai
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema, reviewSchema } = require("../schema");
const Listing = require("../modals/listing");
const {isLogedIn}=require("../middleware");






// functions to validate


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);
    }
    else {
        next()
    }
}



// to see all listings
router.get("/", wrapAsync(async (req, res) => {
    let alllistings = await Listing.find({});
    res.render("listings/index", { alllistings: alllistings });
}));


//new add route (MUST come before /:id)

router.get("/new",isLogedIn, (req, res) => {
   
    res.render("listings/new");
});


// to see specific 

router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listings = await Listing.findById(id).populate("reviews");
    if (!listings) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/listings");
    }
    console.log("Reviews:", listings.reviews);
    res.render("listings/show", { listings });
}))


router.post("/", validateListing, wrapAsync(async (req, res) => {

    let listing = req.body.listing;
    const newone = new Listing(listing);
    await newone.save();
    req.flash("newAdd","successfull added new listing");
    res.redirect("/listings");
}));


// edit and update 

router.get("/:id/edit",isLogedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listings = await Listing.findById(id);
    res.render("listings/edit", { listings });
}));

router.put("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("newAdd","listing updated successfully");

    res.redirect("/listings");
}));


// delete 
router.delete("/:id",isLogedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("newAdd","listing deleted successfully");
    res.redirect("/listings");
}));







module.exports = router



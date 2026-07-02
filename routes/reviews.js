const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema, reviewSchema } = require("../schema");
const Review = require("../modals/review");
const Listing = require("../modals/listing")



// validate finction  

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);
    }
    else {
        next()
    }
}



// add reviews 

router.post("/", validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.Lid);
    let newRev = new Review(req.body.review);

    listing.reviews.push(newRev._id);

    await newRev.save();
    await listing.save();

    req.flash("newAdd","review added successfully");
    res.redirect(`/listings/${req.params.Lid}`);

}))

// delete reviews 

router.delete("/:Rid", wrapAsync(async (req, res) => {
    let { Lid, Rid } = req.params;
    let listing = await Listing.findByIdAndUpdate(Lid, { $pull: { reviews: Rid } });
    await Review.findByIdAndDelete(Rid);
    req.flash("newAdd","review deleted successfully");
    res.redirect(`/listings/${Lid}`);


}))


module.exports = router;
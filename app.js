const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const mongo_url = "mongodb://localhost:27017/wanderlust";
const Listing = require("./modals/listing");
const Review = require("./modals/review")
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");
const session= require("express-session");
const flash =require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./modals/user");

// routes file 
const listing = require("./routes/listings");
const reviews = require("./routes/reviews");
const userRouter = require("./routes/user");


let mongo = async () => {
    await mongoose.connect(mongo_url)
}

mongo().then(() => {
    console.log("connected to DB")
}).catch((err) => {
    console.log(err);
})


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))
app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, "/public")))



const sessiondetails=
        {
            secret:"mysecretkey",
            resave:false,
            saveUninitialized:true,
            cookie:{
                expires:Date.now()+7*24*60*60*1000,
                maxAge:7*24*60*60*1000,
                httpOnly:true

            }
        }
app.use(session(sessiondetails));
app.use(flash()); //as after session it shoukld be used 


app.use(passport.initialize()) 
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
        email: "student@gmail.com",
        username: "delta-student",
    });
    let registeredUser = await User.register(fakeUser, "helloworld");
    res.send(registeredUser);
});

// its a middleware that is called for every req to invoke passport
// it provieds the abiltiy toweb app to identify the user for different page
// so that har req par login na karna pade 


app.use((req,res,next)=>{
    res.locals.succmsg=req.flash("newAdd");
    res.locals.error=req.flash("error");
    next();
})
    


app.use("/listings", listing);
app.use("/listings/:Lid/reviews", reviews);
app.use("/", userRouter);




app.get("/", (req, res) => {
    res.send("hi i am root");
})


app.use((req, res, next) => {
    next(new ExpressError(404, "this page does not exist"));
})

app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong" } = err
    res.status(status).send(message);

})
// middleware to handle wrong inputs in new form like price mai alphabets de die kisi ne postman ke through
//#99



app.listen(port, () => {
    console.log(`pp is listening on port ${port}`);
})

const express=require("express");
const app=express();
const port =3020;
const cookiepar=require("cookie-parser");
const path =require("path")
const session=require("express-session");
const flash =require("connect-flash");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// for normal cookie
// app.use(cookiepar());



// app.get("/",(req,res)=>{
//     res.cookie("greet","hello");
//     res.cookie("adam","firsthuman");
//     res.send("connected");
// })

// app.get("/home",(req,res)=>{
//     let {yourname="user"}=req.cookies; //as we cant read this directly so we first have to install cookie parser
//     // this is default by chance if yourname doesnot exist
//     res.send(`hi ${yourname}`);
// })



// signed cookie

//step-1 created a signed coookie
// app.use(cookiepar("anysecretcode"));

// app.get("/signedcookie",(req,res)=>{
//     res.cookie("made-in","india",{signed:true});
//     res.send("signed cookie created");
// })


//step-2 verify it

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies) 
//     res.send("verified  ");
// })

// if anything changes in cookie then it will give false if only value portion is changed
    //  [Object: null prototype] { 'made-in': false }

    //and { } this is entier value of signedcookie is changed









    // 53 -apna college Phase 2 partc
    //state and express_session



app.use(session({secret:"myfirstsecretkey",resave:false,saveUninitialized:true})) // should Use a complex key, but for now, as for the first time, this is okay. 
// Resave is put to false as if there is no change still, 
// the data in server for the session is again stored. To save that,
//  we put `resave` equal to `false`, so that only when there is a change, the data is saved again. 
//After putting the save to false and save uninitialize to true, the deprecated wording in the terminal is gone. 


//This is a fun activity to see the use case of express-session. 
app.get('/sess',(req,res)=>{
    res.send("test successful")
})

app.get('/reqcount',(req,res)=>{
    if(req.session.count){ // variable matlab jo req aai usme session mai ek variable bana do count ka
        req.session.count++;
    }
    else{
        req.session.count=1;
    }
    
    res.send(`you requested ${req.session.count}`)
})

//Now this count is stored in our local storage, temporary storage-->called memorystore, but as this is our local machine, it's fine. When other users will use this, we have to use a particular storage, temporary storage, 
//such as DynamoDB or MongoDB, or you can read from the documentation of expresssessions-> 
//Search compatible session store 



//Now we will see how a session is stored from one HTTP page to another. 
//Basically, we will put input name on one page and get output on another page. 
// app.get('/entername',(req,res)=>{
//     let {name="user"}=req.query;
//     req.session.name=name;
//     res.send(name);
// })
// app.get('/greet',(req,res)=>{
//     res.send(`hello ${req.session.name}`);
// })


// using flash


app.use(flash());

app.get('/entername',(req,res)=>{
    let {name="user"}=req.query;
    req.session.name=name;
    req.flash("success","user registered successfully") // basically a key value pair
    res.redirect('/greet')
})
// app.get('/greet',(req,res)=>{
//     res.render("flash.ejs",{name:req.session.name,msg:req.flash("success")})
// })


// using locals for variable 
app.get('/greet',(req,res)=>{
    res.locals.Message=req.flash("success");
    res.render("flash.ejs",{name:req.session.name,})
})


app.listen(port,()=>{
    console.log("server runnning on port 3020");
})  
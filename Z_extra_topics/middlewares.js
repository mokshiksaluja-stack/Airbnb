// // 47.backend-6 middlewares


// // middleware function can perform the folloeing task 
// // 1.execute any Code 
// // 2.make changes to req and res Object 
// // 3. can stop req and res cycle 
// //4.call the next middleware function in th stack

// // how to creat - app.use(middleware) 

// // MW- can do only 2 things 1.response 2. call the next middleware 

// // 1. response


// // here it responeded there for any req to route / or /random will give "Hi, I am middleware" 
// // as code me middleware sabse pehele chale ga 

// const express = require("express");
// const app = express();

// app.use(() => {
//     res.send("Hi, I am middleware");
// });

// app.get("/", (req, res) => {
//     res.send("Hi, I am root.");
// });

// app.get("/random", (req, res) => {
//     res.send("this is a random page");
// });

// app.listen(8080, () => {
//     console.log("server listening to port 8080");
// });



// // 2.next()--> jis route par request bheji - pehele middleware par "you are in midlle"
// // fir route par gayi next se



// const express = require("express");
// const app = express();

// app.use((req,res,next) => {
//     console.log("you are in middleware");
//     next();
// });



// // to make a middleware specific for a route

// app.use("/random",(req,res,next)=>{
//     console.log("this path is specificly for random");
//     next();
// })



// app.get("/", (req, res) => {
//     res.send("Hi, I am root.");
// });

// app.get("/random", (req, res) => {
//     res.send("this is a random page");
// });


// // at last of all routes and middlewaew to give output for non existing route

// app.use((req,res)=>{
//     res.send("page not found")
// })

// app.listen(8080, () => {
//     console.log("server listening to port 8080");
// });




// //lec-6 api token as query string k=jise check akarke hame accese deni hai

// const express = require("express");
// const app = express();



// // let say we have to protect /random pathh 

// app.use("/random",(req,res,next)=>{
//     let {token}=req.query;
//     if(token==="acess"){
//         return next()
//     }
//     res.send("access denied")
// })

// app.get("/random", (req, res) => {
//     res.send("this is a random page");
// });

// app.listen(8080, () => {
//     console.log("server listening to port 8080");
// });



// // we can also pass middleware as a function to route and can use multiple function 

// let checkingAuthor=(req,res,next)=>{
//     let {token}=req.query;
//     if(token==="acess"){
//         return next()
//     }
//     res.send("access denied")


//     // or can use express default error handling

//     throw new Error("Access denied");
// }

// app.get("/random",checkingAuthor, (req, res) => {
//     res.send("this is a random page");
// });




// //  error handling middleware 
// // another type of middle ware we can use is error handling middleware


// app.use((err, req,res, next)=>{
//     console.log(err);
//     next();
// })

// // matlab abb ham use call laga rahe hai jo error handel nahi kar raha 

// app.use((err, req,res, next)=>{
//     console.log(err);
//     next(err);
// })

// // matlab abb hame next error handling middle ware ko call laga rahe hai



// // to make customm error handler that have errors that managed by express 
// // and also aditional errors written by user 


// throw new Error("access denied") //==> error handled by express


// // customError But sometimes you want extra information like status codes.
// // "My custom error should behave like a normal Error, but have some extra properties."


// class cusError extends Error{
//     constructor(status,message){
//         super();//-->calls the constructor of Error class
//         this.status=status;
//         this.message=message;
//     }
// }

// throw  new cusError("606","out of boundry")

// let hello=()=>{
//     console.log("hello");
// }


// // basiccall ye abhi bhi sahi chal raha hai par wrap async function kya karta hai 
// // ki hame baar baar try catch na likna pade har function mai isi lie ke func define kar dia
// // jise use karke bar bar error handle nahi karna padta 


// function asyncWrap(fn){
//     return function(){
//         fn();
//     }
// }

// // example
// // hello(); -- this return hello


// const rt=asyncWrap(hello); // this also returns hello but in two steps 
// rt();


// // now let see its use 

// app.post("/listings",async(req,res,next)=>{

//     try{
//          let listing=req.body.listing;
//         const newone=new Listing(listing);
//         await newone.save();
//         res.redirect("/listings");
//     }
//     catch(err){
//         next(err);
//     } 
// })


// // isme har ek mai try catch likhna padega 


// // lets use asyncWrap 

// function asyncWrap1(fun){
//     return function(req,res,next){
//         fun(req,res,next).catch((err)=>next(err));
//     }
// }

// // now just simply 


// app.post("/listings",asyncWrap(async(req,res,next)=>{

   
//          let listing=req.body.listing;
//         const newone=new Listing(listing);
//         await newone.save();
//         res.redirect("/listings");
    
     
// }))

// // simply wraped all in there no need of try catch


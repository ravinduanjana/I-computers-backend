import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    /*email : String,
    firstname : String, 
    lastname : String
    password : String oya widiyta danawta wada pahatha widiyata oya okkoma type, required, unique wage conditions dala liyana eka standard.*/

email :{
    type : String,
    required : true, // user account ekak hdnna  aniwarenma email ekak thiyenna ona
    unique : true, // eka e mail ekakin thiyenna puluwan eka account ekak withrai

}
,
firstName : {
    type : String,
    required : true, // user account ekak hdnna  aniwarenma email ekak thiyenna ona
     
},

lastName : {
    type : String,
    required : true,
     
},
password : {
    type : String,
    required : true, // user account ekak hdnna  aniwarenma email ekak thiyenna ona

     },


role : {
    type : String,
    required : true,
    enum : ["admin","customer"], //string unata hema noun ekakma dnna be admin, customer witharai danna puluwan,
    default: "customer" // userta role eka noda heduwoth ibema customer kiyala assign weno
},


isBlocked : {
    type : Boolean,
    default : false,
    required : true
}, //user block kralada nedda kiyana eka



isEmailVerified : {
    type : Boolean,
    default : false,
    required : true
}, //nethan eka email eken account godak hdna nisa




image : {
    type : String,
    default : "/images/default-profile.png"

} // eka data base eke save kran ne image eka wena file ekaka save krla link eka gnna nisa data type eka string DelayNode.

})

const User = mongoose.model("User", userSchema)

export default User
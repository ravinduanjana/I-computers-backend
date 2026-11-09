import User from "../models/user.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
//create user function eka hdnne userslatawa hadnna
export function createUser(req,res){

const hashedPassword = bcrypt.hashSync(req.body.password, 10) //cmd eke npm install bcrypt daganna. itpasse eka usercontroller ekt import krgnna. user ge password eka hash krgnna ona nisa. 10 kiyanne password eka kiparak hash wenwda kiyna eka  


const user = new User(
    {
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        //password : req.body.password,  oya line eka gahala thiyeddi password eka encrypt novima db ekat ynne, eknisa bcrypt library eka argena ihath paridi, e encrypted password eka yodagena user hadaganno. e encrypted(hashed password) eka ganne pahatha code line eken 
        password : hashedPassword,
        role: req.body.role || "customer",
        isBlocked: req.body.isBlocked ?? false,
        isEmailVerified: req.body.isEmailVerified ?? false,
        image: req.body.image
    }
)

user.save().then(
    ()=>{

        res.json({
            message : "user created successfully",
        });
    }
).catch(
    (error)=>{
        res.json({
            message : "error creating user", error : error
        });
    }

) 


}

/*loginuser function eka hdnne userlta log wenna 
log wennanam mulinma ena req ekta gelepene usersla innawda blano*/

export function loginUser(req,res){


    User.findOne({

            email : req.body.email
             
    }). then (
        (user)=>{
            if (user == null) {
                res.json({
                    message : "user with given email not found",
                })
            } else {
                const isPasswordValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                
                if (isPasswordValid) {
                    // jwt eka cmd eke install krnna , npm install jsonwebtoken  then me token eken wenne user successfully log unta passe token ekakdeno  y
                    // jsonwebtoken eka hadala login weddi ena code eka postmange authorization wala paste kranna bearer token yatathe.
                    const token = jwt.sign ({
                        email: user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        role : user.role,
                        image : user.image,
                        isEmailVerified : user.isEmailVerified

                    }, "i-computers-54!")  //icomputers-54! kiynne api dena key ekak(only developer should know) itpasse json eka atule userwa adurgnna one wenawisthrar tika danawa 
                    
                    console.log(token)
                    console.log({
                        email: user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        role : user.role,
                        image : user.image,
                        isEmailVerified : user.isEmailVerified

                    });
                    
                    res.json({
                        message : "login successful",
                        token : token, //lgn succful msg ekth ekka api hadpu token ekth ywnwa userta postman haraha. 
                    });
                } else {
                    res.status(401).json({
                        message : "login failed, invalid password",
                    });
                }
            }       
            
        }
    ). catch(()=>{
             res.status(500).json({

                message : "internal server error",
             });

    });
      
}
 // pahala function eka heduwe product create kranna ida denne katda neththe katda kiyla thirnya krnna. product controller eke me function eka use krla products create krno adala admin ta witrak.
export function isAdmin(req){
if(req.user==null){
    return false
}
if (req.user.role == "admin"){
    return true
}
else{
    return false
}
}

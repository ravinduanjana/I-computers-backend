import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

export default function authorizedUser(req,res, next){
       
        const header = req.header("Authorization") // postmange header eke authorization ekak dala awda kiyla blannna me code line eka yodai. 
        if(header !=null){
           const token = header.replace("Bearer ", "") // this line for console eke token eka print weddi token eke mulata Bearer kiyla ekak  saha space ekak eno eka ain karagnna danne. 
           console.log(token)
           
           // this   lines for token ena decoded krgena e decoded krpu eka printg karaganna.
           jwt.verify(token, process.dotenv.JWT_SECRET , // dotenv library eka demmata passe " i-computers-54!" wenuwta dotenv eke thiyena ewa call krgnno. meka mulin thibbe widiya dot env install krnna kalin jwt.verify(token, "i-computers-54!" ,
            (err , decoded)=>{
                if (decoded == null) {

                    res.status(401).json({
                        message : "invalid token please login again"
                    })
                } else {

                    req.user = decoded
                    next()
                }
            }
            
            )
        } else { next()
        }// pass the req to next person(next eken wenne eka)
    }
import Teacher from "../models/teacher.js";



export function GetAllteacher (req,res){
        Teacher.find().then(
            (result)=>
            {
                res.json(result)
            }
        )

    }



 export function Createteacher(req,res) {
        //new student kiyna variable ekata  student ge wisthara save krnna hadnne. ona data tika Student kiyna model eka haraha argena db ekat save krnne.  
        const newteacher = new Teacher({
             
           name: req.body.name,
           subject:req.body.subject,
           experience:req.body.experience
       
       }

        )

          newteacher.save(). then(
       ()=>{
         res.json({ message: "teacher added successfully"})

       }

            
          )     
          
      }


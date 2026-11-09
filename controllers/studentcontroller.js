import Student from "../models/students.js"


export function GetAllstudent (req,res){
        Student.find().then(
            (result)=>
            {
                res.json(result)
            }
        )

    }



 export function Createstudent(req,res) {
        //new student kiyna variable ekata  student ge wisthara save krnna hadnne. ona data tika Student kiyna model eka haraha argena db ekat save krnne.  
        const newstudent = new Student({
             
           name: req.body.name,
           city:req.body.city,
           age:req.body.age
       
       }

        )

          newstudent.save(). then(
       ()=>{
         res.json({ message: "Student added successfully"})

       }

            
          )     
          
      }

//how run the project = npm install enter then npm start

import express from 'express'  //node module ekethiiyena expressjs ape project ekt ganna


import mongoose from 'mongoose'  //mongoose install karapu eka import kara gtha
import Student from './models/students.js'
import studentrouter from './routers/studentrouter.js'
import teacherrouter from './routers/teacherrouter.js'
import userRouter from './routers/userrouter.js'
import productRouter from './routers/productRouter.js'
import jwt from "jsonwebtoken";
import authorizedUser from './lib/jwtMiddleware.js'



// data base heduwta passe collection eken data yawddi model eka haraha methnta model eka import karanna ona. collection name eka agta .js danna manually. import kre post eke curly braces wlat model name eka (Student) Stu ghala enter gehuwama eno export wenna ona code line eka,

const mongoURI = "mongodb+srv://admin:1234@cluster0.grmcwkb.mongodb.net/?appName=Cluster0"

//mongoURL variable eka db ekata conncet kara yata line eke then walin kiynnne softwre eka db eka ekka connect unoth ena msgs eka. catch eke pennanne ehema nounoth pennana msg eka.
mongoose.connect(mongoURI).then(
    () =>{

        console.log("connected to the mongodb")
    }
).catch(
    () => {
        console.log("error connecting to the mongodb")
    }
) 

const app = express()   //expressjs wala thiyena codes app kiyana variable ekta dagenima. mekma let app kiyla dannath puluwn but wenas nowena variable wlat const danna venas wena variable wlata let dala hadgna.

app.use(express.json())  // this line for middle man process. watch all the reques and manage them.
//function started(){     function ekak heduwa server started kiyla print wena
//console.log("server started")}   started kiyna function eka ekma thenkta witrak use wena nisa eka arrow function ekak widiyata liyanna puluwan.


//token ekak heduwe user id ekak wage weda krnna systm ekta log wena ayta. okkoma http request allagena ewta menna me wade krnna kiyla kiyana eka thama me code eken wenne.



app.use(
    authorizedUser
)

app.use("/students", studentrouter)
app.use("/teacher", teacherrouter) //localhost:3000/student kiyna ekta req ekak awoth eka student router ekta yawanna me line eken.
app.use("/users", userRouter)
app.use("/products", productRouter)

/*  start
app.get("/" ,
    (req,res)=>{

        console.log("get request received")
        console.log(req.body)


    }
)
app.post("/" ,

      (req,res)=> {

       console.log("post request received")
       console.log(req.body)
       res.json(
        {
            message : "response get successfully  "+  req.body.firstname+"  " +req.body.lastname
        }
       )
      }

    )

    app.delete("/" ,
        (res, req)=> {
            console.log("delete request received")
            console.log(req.body)
        }

    )

    app.put("/" ,
        (res,req)=> {

            console.log("put request received")
            console.log(req.body)
        }

    )   end.  start - end multi line comment krpu tika karnne http request weda krnwda kiyla blanna postman use krla app eka hadgena yaddi
       itpasse data base eka hadala athatama data base ekat data yawddi ganiddi put, post, get, delete wala thiyena ewa wenas weno.
       ewa pahatha put get post delete widiyata newa tha liya etha.   */



/*
app.get("/" ,
    (req,res)=>{
        //Student model eka haraha data ganna find kiyn object eka use kra. 
        Student.find().then(
            (result)=>{

                res.json(result)
            }
        )

    }
)
app.post("/" ,

      (req,res)=> {
        //new student kiyna variable ekata  student ge wisthara save krnna hadnne. ona data tika Student kiyna model eka haraha argena db ekat save krnne.  
        const newstudent = new Student({
             
           name: req.body.name,
           city:req.body.city,
           age:req.body.age
       
       }

        )

          newstudent.save(). then(
       ()=>{
         res.json({

            message : "Student added successfully"
         })

       }

            
          )     
          
      }

    )

    app.delete("/" ,
        (res, req)=> {
            console.log("delete request received")
            console.log(req.body)
        }

    )

    app.put("/" ,
        (res,req)=> {

            console.log("put request received")
            console.log(req.body)
        }

    )  

get,post, put delete code ihtha paridi thiyeddi http req 4 witrai krn pulwn ekanisa req 4 ain krla wenama router folder ekak hdla eke wena wenama routers files hadagnno wena wenama studentslata saha adala annith ayta */


app.listen(3000,              
() => {
    console.log("server started in port number 3000")
}
) // hadapu function eka and port number eka udda wage started kiylahadan nethuwa arrow function ekakin run krno ekparak witrak use wena nisa.

/*password hashing kiyanne plain text eka hashing karano e hash eka irreversible. hash eka thama db eke save venne, */ 

//data base ekta CRUD karanna me file eka heduwe, model (rimote) ekak wage software ekai db ekai athra 
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(

{
  name : String,
  city : String,
  age : Number
}

)
     // phala code eken remote eka hdagnna, Student variable ektamul akura capitaldanna. collection name eka students kiyla denawa. studentschema kiyla haduwe yawnna ona data wala type eka dala structure ekak. eka denawa collection name ekta passe pahatha code line eke.
const Student = mongoose.model("students", studentSchema) // Student = remote(model) ekta dena nama, students = collection name eka, studentschema = uda hadapu variable eka

export default Student; //oya hadapu model eka me file eken eliyta data denna ona nisa e Student kiyna variyble eka export kara.


import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(

{
  name : String,
  subject : String,
  experience : Number
}

)

const Teacher = mongoose.model("teacher", teacherSchema)

export default Teacher; 

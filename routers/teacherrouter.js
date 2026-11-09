import express from 'express';
import { Createteacher, GetAllteacher } from '../controllers/teachercontroller.js';


const teacherrouter = express.Router()  


teacherrouter.get("/", GetAllteacher);

teacherrouter.post("/" ,Createteacher);


export default teacherrouter;
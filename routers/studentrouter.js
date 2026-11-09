import express from 'express';

import { Createstudent, GetAllstudent } from '../controllers/studentcontroller.js';
// index.js main fille eke thiyan nethuwa wenama routers kiyla folder ekak hdla eke studentsrouter kiyla file ekak hdla ekta dano wenna ona dewal tika get post ... wage dala eka index.js main file ekata sambnda krno.
const studentrouter = express.Router() // function waladi () oya widiyt demmana run krpu gman execute wenna onam function ekat ohoma dano () . nethn request ekak awama run wenna ona function walata ()  danne ne.


studentrouter.get("/", GetAllstudent);

studentrouter.post("/" ,Createstudent);


export default studentrouter; // index.js file ekta smbnda krnna ona nisa export krgatha.
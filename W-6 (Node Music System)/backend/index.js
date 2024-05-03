import express from 'express'
import connect from './model/db.js'
import Routes from './routes.js'
import cors from 'cors'

const app=express();

const PORT=5000;


const corsOption={
    origin: 'http://localhost:5173',
};

app.use(express.json());
app.use(cors(corsOption))


app.use('/',Routes)


connect();
app.listen(PORT,()=>{
    console.log(`Listen on Port: ${PORT}`);
})
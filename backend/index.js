const express= require('express');
const App=express();
const cors=require('cors');
const mysql=require('mysql2');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

App.use(cors({ origin: "*" }));
App.use(express.json());


const db=mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err)=>{
    if(err) console.log('error',err)
    else console.log('db connected');
});

App.post('/register', async(req,res)=>{
    const {username,email,passwords} =req.body;
    const hashedPassword = await bcrypt.hash(passwords, 10);

    const sql= "INSERT INTO users (username,email,u_password) VALUES (?,?,?)";

    db.query(sql,[username,email,hashedPassword],(err,result)=>{
        if(err){
          return res.json({status:'error',error:err});
        }
        return res.json({status:'success',message:'register success'});
    });
});

App.post('/login',(req,res)=>{
    const { username,passwords } = req.body;
    const sql= "SELECT * FROM users WHERE username=?";

    db.query(sql,[username], async (err,result)=>{
        if(err){
            return res.json({status:'error',error:err});
        }
        if(result.length === 0){
            return res.json({status:'error',message:'user not found'});
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(passwords, user.u_password);

        if(!isMatch){
            return res.json({status:'error',message:'invalid password'});
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "2h" });

        return res.json({status:'success',message:'login success',token});
    });
});

App.listen(5500,()=> console.log('server running'));

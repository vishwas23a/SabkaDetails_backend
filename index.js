const express=require('express')
const app=express()
const port=3000;
const mongoose=require('mongoose')
const studentModle=require('./Model/Students')
const cors=require('cors')
app.use(cors());
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/Student")

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    next();
});
app.get('/api/users/:rollNo',(req,res)=>{
    const rollNo=Number(req.params.rollNo)
    studentModle.findOne({rollNo})
    .then(data=>res.json(data)) 
})
app.get('/',(req,res)=>{
    res.send("server is live")
})
app.get('/api/users',(req,res)=>{
        studentModle.find()
        .then((data)=>res.json(data))
})
app.post('/api/users',(req,res)=>{
    studentModle.create(req.body)
    .then((students)=>res.json(students))
    .catch((err)=>{
        console.log("failed to add in database",err);
    })


    console.log('Received data:', req.body);


    res.status(200).json({ message: 'User data received successfully', data: req.body });

})

app.listen(port,()=>{
    console.log(`server is running on ${port} port `);
})
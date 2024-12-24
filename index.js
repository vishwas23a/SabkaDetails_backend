const express=require('express')
const app=express()
const port=3000;
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const studentModle=require('./Model/Students')
const cors=require('cors')
dotenv.config()
app.use(cors({
    origin: "https://studentdetails01.netlify.app", // Replace with your front-end origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
app.use(express.json())
try {
    mongoose.connect(process.env.MONGO_URL)
    console.log("database connected");
    
} catch (error) {
    console.log("db connection failed");
    
}


app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');

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



})

app.listen(port,()=>{
    console.log(`server is running on ${port} port `);
})
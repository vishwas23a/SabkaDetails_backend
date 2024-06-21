const mongoose =require("mongoose")

const  studentSchema=new mongoose.Schema(

    {

        name:String,
        rollNo:Number,
        email:String,
        phoneNo:Number,
        course:String,
        dob:String,
        linkedIn:String,
        portfolio:String

    }
)
const studentModle=mongoose.model('students',studentSchema)
module.exports=studentModle
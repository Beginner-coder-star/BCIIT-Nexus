import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    image: {type:String, required:true},
    batches: {type:String, required:true},
    degree: {type:String, required:true},
    place: {type:String, required:true},
    project: {type:String, required:true},
    cgpa: {type:Number, required:true},
    ug: {type:String, required:true},
    act: {type:String, required:true},
    linkedin: {type:String, required:false}

},{minimize:false})

const alumniModel = mongoose.models.alumni || mongoose.model('alumni',alumniSchema)

export default alumniModel
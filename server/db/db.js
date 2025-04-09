import mongoose from 'mongoose'

const connectToDatabase=async()=>{
    try{
       await mongoose.connect(process.env.MONGOURL)
    }catch(error){
        console.log(error)
    }
}

export default connectToDatabase;
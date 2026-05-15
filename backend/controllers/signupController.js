    import User from "../Schema/user.js"
    import bcrypt from "bcrypt"
    
    const signup = async (req,res)=>{
        try{
    const {name,email,password} = req.body

    if(!name||!email||!password){
        return res.status(404).json({
            message:"all field are not filled"
        })
    }
    const extuser = await User.findOne({email})
    if(extuser){
        return res.status(400).json({
            message:"user already exist"
        })
    }
    const hashpass = await bcrypt.hash(password,10)
    const newUser = new User({
    name,
    email,
    password:hashpass 
    })
    await newUser.save()
    res.status(201).json({
        message:"user created successfully",
        user:{
            name:newUser.name,
            email:newUser.email,
        

        }
    })
        }
    catch(error){
        res.status(500).json({
            message:"there is some error",
        error:error.message
        })
    }
        
    }
    export default signup
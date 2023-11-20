const CustomAPIError= require('../errors/custom-error')
const jwt= require('jsonwebtoken');

const login= async (req, res)=> {
    const {username, password}= req.body;
    // if(!username || !password){}
    if(!username && !password){
        throw new CustomAPIError('Please provide email and password', 400)
    }
    if(!username){
        throw new CustomAPIError('Please provide email', 400)
    }
    if(!password){
        throw new CustomAPIError('Please provide password', 400)
    }
    const id= new Date() 
    const token= jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    res.status(200).json({msg:'user created', token})
};

// const dashboard= async (req, res)=>{
//     const authHeader= req.headers.authorization;
//     if(!authHeader ||!authHeader.startsWith('Bearer ')){
//         throw new CustomAPIError('No token provided', 401);
//     }
//     const token=authHeader.split(' ')[1] //This extracts only the token by getting the second item in the Bearer token string, so the text 'Bearer' is removed returning only the token
//     try{
//         const decoded=jwt.verify(token, process.env.JWT_SECRET)
//         const luckyNumber=Math.floor(Math.random()*100)
//         res.status(200).json({msg:`Hello, ${decoded.username}`, secret:`Here is your authorised data, your lucky number is ${luckyNumber}`})
//     }catch(error){
//         throw new CustomAPIError('Not authorized to access this route', 400)
//     }
// };

const dashboard= async (req, res)=>{
    // req.user coming from the auth middleware
        const luckyNumber=Math.floor(Math.random()*100)
        res.status(200).json({msg:`Hello, ${req.user.username}`, secret:`Here is your authorised data, your lucky number is ${luckyNumber}`})
};


module.exports= {
    login,
    dashboard
}
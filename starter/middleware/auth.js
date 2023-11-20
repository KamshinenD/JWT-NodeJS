const jwt= require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const authenticationMiddleware=async (req,res,next)=>{
    const authHeader= req.headers.authorization;
    if(!authHeader ||!authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided', 401);
    }
    const token=authHeader.split(' ')[1] //This extracts only the token by getting the second item in the Bearer token string, so the text 'Bearer' is removed returning only the token

    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        const {id, username}= decoded;
        req.user={id,username}      
        next();
    }catch(error){
        throw new CustomAPIError('Not authorized to access this route', 400)
    }
}


module.exports=authenticationMiddleware


// echo "# JWT-NodeJS" >> README.md
//   git init
//   git add README.md
//   git commit -m "first commit"
//   git branch -M main
//   git remote add origin https://github.com/KamshinenD/JWT-NodeJS.git
//   git push -u origin main
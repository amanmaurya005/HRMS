import jwt from "jsonwebtoken";

export async function checkToken(req,res,next){
try{
    const token=req.cookies.user_token;
    if(!token) return res.status(401).json({message:"no token"});

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.userId=decoded.id;
    next();

}
catch(error){
    return res.status(500).json({message:error.message})
}
}
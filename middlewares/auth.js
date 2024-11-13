import jwt from "jsonwebtoken";

export default function auth(req, res, next){
let token = req.cookies.auth;
console.log(token)
if (!!token && token.startsWith('bearer ')) {
  token = token.slice(7, token.length);
  console.log(token);
}

if(token){
  jwt.verify(token, "your-secret-key", (err, decoded) =>{
    if(err){
      console.log("token not valid");
      return res.status(401).json({
        message: "token not valid"
      });
    }else{
      req.decoded = decoded;
      console.log(decoded);
      const expiresIn = 60*5*1000;
      const newToken = jwt.sign({
        user : decoded.user
      },
      "your-secret-key",
      {
        expiresIn : expiresIn                            
      });
      console.log("la");
      res.cookie('auth', 'bearer ' + newToken,{maxAge : 60*60*1000, httpOnly:true});
      next();
    }
  });
}else {
  return res.status(401).json({message: "Unauthorized"});
}
}
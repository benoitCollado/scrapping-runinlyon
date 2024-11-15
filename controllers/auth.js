import{UserDB as User, SessionDB as Session} from "../models/initDB.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res){
  try {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
   const user = await User.findOne({ where: { username: username} });
    if (!user) {
      return res.status(400).json({ message: "user or password incorrect" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "user or password incorrect" });
    }
    console.log(user);
    const token = jwt.sign({ user: user.username }, "your-secret-key");
    res.cookie('auth', 'bearer ' + token,{maxAge : 60*60*1000, httpOnly:true, sameSite: 'None', secure: true});
    return res.status(200).json({message : "authenticated successfuly}"});
  } catch (error) {
    return res.status(500).json({ error: "Login failed" });
  }
}

export async function register(req, res){
   try {
     console.log();
      const username = req.body.username;
      const password = req.body.password;
      console.log(username +" "+ password);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.findOne({ where: { username: username} });
     const users = await User.findAll();
     console.log("user : " + users);
      if (user) {
        return res.status(400).json({ message: "user already exist", users : users });
      } else {
          const user = await User.create({ username: username, password: hashedPassword });
          if (!user) {
            console.log(error);
            return res.status(500).json({ message: "Registration failed", users:users });
          } else {
            console.log("user created");
          }
        }
      console.log("ici");
      const afterUsers = await User.findAll();
     
      return res.status(201).json({ message: "User registered successfully", users:afterUsers});
    } catch (error) {
      return res.status(500).json({ error: "Registration failed" });
    }
}

export async function islogedin(req, res){
  try{
    console.log(req.headers)
    if(req.decoded){
      return res.status(200).json({message : "authenticated"});
    }else{
      return res.status(100).json({message : "not authenticated"});
    }
  }catch{
      return res.status(500).json({message : "internal error"});
  }
}

export async function username(req, res){
  try{
    const username = req.params.user;
    console.log(username);
    const user = await User.findOne({ where: { username: username} });
    if (!user) {
      return res.status(200).json({ message: "username available", free: true });
    }
    return res.status(200).json({message : "username not available", free: false});
  }catch(err){
    return res.status(500).json({message : "internal error"});
  }
}

export async function logout(req, res){
  try{
    res.cookie('auth', '' ,{httpOnly:true});
    return res.status(200).json({message : "logout successful"});
  }catch{
    return res.status(500).json({message : "internal error"});
  }
}
//Importing Packages
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { secret } from "../config/auth.config";
import { IUser, ILoginRequest, IRegisterRequest, IForgetRequest, IRegisterToken, IUserWithPassword, ILoginToken, IResetRequest, IUserRequest } from "../util/interface.util"
import { doesUserExistByEmail, createUser, getUserByEmail, getPasswordByEmail, updatePassword } from "../service/user.service";
import { sendMail } from "../service/mail.service";
import { salt_rounds} from "../config/auth.config";


//Register new User
export async function register(req:  Request<Record<string, unknown>, Record<string, unknown>, IRegisterRequest>, res: Response): Promise<void> {
  try {
    const user: IRegisterRequest = req.body;

    //Search user 
    const userExists = await doesUserExistByEmail(user.email);

    if (userExists) {
      res.status(401).json({ error: "User already created" });
      return;
    }

    user.password = bcrypt.hashSync(user.password, salt_rounds);

    //Sign Token using email and password. 
    const token = jwt.sign(user, <string>secret, { expiresIn: '10m' });

     await sendMail(user.firstName, user.email, token, "activation");

    res.status(200).json({message: "Mail sent to " + user.email});
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
}


//Creating User
export async function create(req: Request, res: Response): Promise<void> {
  const token = req.query.jwt;

  //No Token found
  if (!token) {
      res.status(403).json({ error: "Bad Credentials" });
      return;
  }

  try {

      //Decoding activation token
      const decoded = <IRegisterToken>jwt.verify(<string>token, <string>secret);  
      
      const email = decoded.email;

      //Search user
      const userExists = await doesUserExistByEmail(email);

      if (userExists) {
        res.status(401).json({ error: "User already created" });
        return;
      }
      
      //Create User
      await createUser(decoded);
  
      res.status(201).send({ msg: "User Registered" });

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
}

//Login User
export async function login(req:  Request<Record<string, unknown>, Record<string, unknown>, ILoginRequest>, res: Response): Promise<void> {
  try {

    const { email, password } = req.body;

    const userExists : boolean = await doesUserExistByEmail(email);

    if (!userExists) {
      res.status(404).json({ "error": "User not Registered" });
      return;
    }

    const user : IUserWithPassword = await getPasswordByEmail(email);

    //Matching Password using Bcrypt
    const isPasswordValid: boolean= bcrypt.compareSync(password,user.password);

    if (!isPasswordValid) {
      res.status(401).json({error: "Bad Credentials" });
      return;
    }

    const id: string = user.id;

    //Signing Token using user's id
    const token: string = jwt.sign({ id, email }, <string>secret, { expiresIn: 86400 });

    res.status(200).json({
      email: user.email,
      token: token
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
}

//Forget Password
export async function forget(req:  Request<Record<string, unknown>, Record<string, unknown>, IForgetRequest>, res: Response): Promise<void> {
  try {

    const email:string = req.body.email;

    const userExists: boolean= await doesUserExistByEmail(email);

    if(!userExists) {
      console.log("not found");
      
      res.status(404).json({ "error": "No user found" });
      return;
    }

    const user: IUser= await getUserByEmail(email);

    const id: string= user.id;

    //Signing Token using user's email and id
    const token: string = jwt.sign({email,id}, <string>secret, { expiresIn: '10m' });

    sendMail(user.firstName, email, token, "forget");
    
    res.sendStatus(200);
    
  } catch (err) {
    res.status(500).json({ "error": "Server Error" });
  }
}

//Reset Password
export async function reset(req: IUserRequest, res: Response): Promise<void> {

  try {
      const {oldPassword, newPassword} = req.body;
      
      const id = (<IUser>req.user).id;
      const email = (<IUser>req.user).email;
      const user : IUserWithPassword = await getPasswordByEmail(email);

      //Matching Password using Bcrypt
      const isPasswordValid: boolean= bcrypt.compareSync(oldPassword ,user.password);

      if (!isPasswordValid) {
        res.status(401).json({error: "Bad Credentials" });
        return;
      }

      //Update new Password
      await updatePassword(id, newPassword);

      res.status(201).json({ "message": "password has been reset" });

  } catch (err) {
      res.status(500).json({ "error": "Server Error" });
  }
}

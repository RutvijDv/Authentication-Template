//Importing Packages
import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { secret } from "../config/auth.config";
import { ILoginToken, IUser, IUserRequest } from "../util/interface.util";
import { getUserById } from "../service/user.service";

//Verify token 
export default async function verifyToken(
  req: IUserRequest, 
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers["authorization"]?.split(" ")[1];
  
  //No Token found
  if (!token) {
    res.status(403).json({ error: "Bad Credentials" });
    return;
  }

  try {
    //Decoding Token
    const decoded = <ILoginToken>jwt.verify(<string>token, <string>secret);
    
    const userId = decoded.id;
    const user: IUser|null = await getUserById(userId);

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    
    //Modifying Request
    req.user = user;

    next();

  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}

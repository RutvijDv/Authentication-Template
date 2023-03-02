//Importing Packages
import { Response } from "express";
import { IUpdateProfileRequest, IUser, IUserRequest } from "../util/interface.util";
import { getUserById, updateProfileById } from "../service/user.service";

//GET user Profile
export async function getProfile(
  req: IUserRequest, 
  res: Response
): Promise<void> {

  try{
    const user: IUser = <IUser>req.user;

    //No user found
    if (user == null) {
      res.status(401).json({ error: "Unauthorized!" });
      return;
    }
    
    //Extract Profile data    
    const profileData = await getUserById(user.id);
    
    res.status(200).json({
      profileData: profileData,
    })
  
  }catch(err){
    res.status(500).json({ error: "Server Error" });
  }

}


//Put user Profile
export async function putProfile(
  req: IUserRequest, 
  res: Response
): Promise<void> {

  try{
    const user: IUser = <IUser>req.user;
    const update: IUpdateProfileRequest = <IUpdateProfileRequest>req.body;

    //No user found
    if (user == null) {
      res.status(401).json({ error: "Unauthorized!" });
      return;
    }
    
    //Extract Profile data
    const profileData = await updateProfileById(user.id, update);
    
    res.status(200).json({
      profileData: profileData,
    })
  
  }catch(err){
    res.status(500).json({ error: "Server Error" });
  }

}

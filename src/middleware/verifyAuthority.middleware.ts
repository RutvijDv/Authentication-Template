// import {Response, NextFunction} from "express";
// import { verifyRole } from "../service/user.service";
// import {IUser, IUserRequest, roles} from "../util/interface.util";


// async function verifyProfessor(req: IUserRequest, res: Response, next: NextFunction): Promise<void> {

//     try {
//         const user: IUser = <IUser>req.user;
//         if (user == null) {
//             res.status(401).json({error: "Unauthorized!"});
//             return;
//         }

//         if (user.roleId == null) {
//             res.status(401).json({error: "Unauthorized!"});
//             return;
//         }

//         if(await verifyRole(user.roleId, [roles[4]])){
//             next();
//         }else{
//             res.status(401).json({error: "Unauthorized!"});
//         }
//     } catch (err) {
//         res.status(401).send({error: "Verification Failed"});
//     }

// }

// export default verifyProfessor;

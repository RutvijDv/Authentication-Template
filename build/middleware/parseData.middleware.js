"use strict";
// //Importing Packages
// import { Response, NextFunction } from "express";
// import { ICreateFile, IUserRequest } from "../util/interface.util";
// import Busboy from "busboy";
// import { uploadFileAws } from "../service/aws.service";
// //Parse Data
// export default async function parseData(
//   req: IUserRequest, 
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     const contentType = <string>req.headers["content-type"];
//     if (!contentType) {
//       res.status(406).send({ err: "Missing content-type" });
//     }
//     const busboy = new Busboy({ headers: { "content-type" : contentType } });  
//     busboy.on('error',(err) => {
//         throw err;
//     })
//     busboy.on('file', async(_fieldName, fileStream, fileName, _encoding) => {
//         if(fileName==null || fileName=="" || fileName==undefined){
//             res.status(400).send({ err: "No file found" });
//             return;
//         }
//         const { location, key } = await uploadFileAws(fileName, fileStream);
//         const formData: ICreateFile = { url: location, key: key};
//         req.body = formData;
//         next();
//     });
//     req.pipe(busboy);
//   } catch (err) {
//     console.log(err);
//     res.status(400).send({ error: "Bad request" });
//   }
// }
//# sourceMappingURL=parseData.middleware.js.map
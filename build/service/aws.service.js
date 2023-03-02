"use strict";
// import aws from "aws-sdk";
// import { awsAccessKey, awsSecretAccessKey } from "./../config/aws.config";
// export const uploadFileAws = async (filename: string, file: aws.S3.Body): Promise<{ location: string; key: string }> => {
//   return new Promise<{ location: string; key: string }>((resolve, reject) => {
//     const epoch = Date.now();
//     // Random 4 digit number
//     const rand = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
//     // Test script sets this up for deleting during teardown. Don't specify in .env
//     const level = process.env.S3_LEVEL || "";
//     const key = `${level}${epoch}-${rand}-${filename}`;
//     const s3 = new aws.S3({
//       accessKeyId: awsAccessKey || "",
//       secretAccessKey: awsSecretAccessKey || "",
//     });
//     s3.upload(
//       {
//         Bucket: process.env.S3_BUCKET || "riac-web-bucket",
//         Key: key,
//         Body: file,
//       },
//       (err, data) => {
//         if (err) reject(err);
//         resolve({ location: data.Location, key });
//       }
//     );
//   });
// };
// export const deleteFileAws = async (key: string): Promise<void> => {
//   return new Promise<void>((resolve, reject) => {
//     const s3 = new aws.S3({
//       accessKeyId: awsAccessKey || "",
//       secretAccessKey: awsSecretAccessKey || "",
//     });
//     s3.deleteObject(
//       {
//         Bucket: process.env.S3_BUCKET || "riac-bucket",
//         Key: key 
//       }, 
//       (err) => {
//       if (err) reject(err);  // error
//       else resolve();        // deleted
//     });
//   });
// };
//# sourceMappingURL=aws.service.js.map
import {
    IRegisterToken,
    IUpdateProfileRequest,
    IUser,
    IUserWithPassword
} from "../util/interface.util";
import DB from "../model";
import bcrypt from "bcrypt";

// Initiating DB class
const db = new DB();
const User = db.user;

export const doesUserExistByEmail = async (email : string) : Promise < boolean > => {
    const user = await User.findOne({email: email});
    if (user) 
        return true;
    


    return false;
};

export const createUser = async (userData : IRegisterToken) : Promise < IUser > => {

    const user = await User.create(userData);

    return user;
};

export const getUserByEmail = async (email : string) : Promise < IUser > => {

    const user = await User.findOne({
        email: email
    }, {password: 0});

    if (user) 
        return user;

    throw `Error: User with email ${email} does not exist`;

};

export const getAllUsers = async () : Promise < Array < IUser >> => {

    const user = await User.find({}, {
        prefix: 1,
        firstName: 1,
        lastName: 1,
        email: 1
    });

    if (user) 
        return user;
    


    throw `Error: No User Exist `;
};

export const getPasswordByEmail = async (email : string) : Promise < IUserWithPassword > => {

    const user = await User.findOne({email: email});

    if (user) 
        return user;
    
    throw `Error: User with email ${email} does not exist`;

};

export const getUserById = async (id : string) : Promise < IUser | null > => {

    const user = await User.findOne({
        _id: id
    }, {password: 0});
    return user;
};

export const updatePassword = async (id : string, password : string) : Promise < void > => {

    try {
        await User.updateOne({
            _id: id
        }, {
            $set: {
                "password": bcrypt.hashSync(password.toString(), 8)
            }
        });
    } catch (err) {
        throw `Error: User not updated`;
    }
};

export const updateProfileById = async (id : string, update : IUpdateProfileRequest) : Promise < IUser | null > => {

    await User.updateOne({
        _id: id
    }, {$set: update});
    const user = await getUserById(id);
    if (user) 
        return user;
    


    throw `Error: User with id ${id} does not exist`;
};



// export const isAuthor = async (userId : string, researchId : string) : Promise < boolean > => {
//     const found = await Author.findOne({userId: userId, researchId: researchId});

//     if (found != null) 
//         return true;
    


//     return false;
// };

import { usersService } from "../dao/index.js";

export class UsersService{
    static getUserByEmail = async(email)=>{
        return usersService.getByEmail(email)
    };

    static saveUser = async(newUser)=>{
        return usersService.save(newUser)
    };

    static getUserByID = async(id)=>{
        return usersService.getById(id);
    };
}
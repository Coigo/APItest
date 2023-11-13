import { UpdateUserPassword_repository } from "../repository/updateUser.ts";
import { Request, Response } from "express";
import { UpdateUser } from "../service/update-user.ts";

export class updateUser_controler  {
    
    async handle ( req: Request, res: Response ) {
        
        try {
            const props =  req.body
            
            const userUpdate = await new UpdateUser(props, (new UpdateUserPassword_repository))
            const update = await userUpdate.update()
            if ( update ) return res.status(200).end()
            return res.status(400).end()
    }
        catch ( err ) {
            return res.status(400).end()
        }
    }
}
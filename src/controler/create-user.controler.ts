import { Request, Response } from "express";
import { CreateUser_service, userProps } from "../service/createUser.service.ts";
import { CreateNewUser_repository } from "../repository/createNewUser.ts";
import { createUser_repository } from "../service/createUser.service.ts";
import { CustomError } from "../costumError.ts";


export class CreateUser {
    async handle ( req: Request, res: Response ) {

        try {
            const props = req.body
            const CreateUser = new CreateUser_service( props, new CreateNewUser_repository() )
            const create = await CreateUser.create_user()
            console.log(create)
            res.status(200).end()

        } catch ( err ) {

            if (err instanceof CustomError) {
                res.status(err.statusCode)
                res.end()
              } else  res.status(500).end() 

        }
    }
}
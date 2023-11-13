import { CreateUpdateToken } from "../service/createUpdateToken.service.ts";
import { Request, Response } from "express";
import { savePasswordToken } from "../repository/savePasswordToken.ts";

export class createToken_controler {
    
    async handle ( req: Request, res: Response ) {
        try {
            const { email } = req.body
            console.log(email)

            const updateToken =  new CreateUpdateToken({ email }, new savePasswordToken())
            const createToken = await updateToken.create()

            if ( createToken ) {
                return res.status(200).end()
            }
            console.log(createToken)
            return res.status(400).end()
        
        }
        catch ( err ) {
            console.log(err)
            return res.status(500).end()
        } 

    }



}

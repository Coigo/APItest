import { Request, Response } from "express";
import { UserCheck_repository } from "../repository/checkUser.ts";
import { UserCheck } from "../service/check-user.service.ts";

type checkResult = {
    method:string
    free:boolean
}

export class CheckUser {
    async handle ( req: Request, res: Response) {
        const { prop, method } = req.body

        console.log( prop, method , 'oi')
        try {
            
            const check = new UserCheck( { prop, method }, new UserCheck_repository())
            const property = await check.check_user()
            const { free } = property as checkResult
            
            if ( free === true ) {
                console.log('ok');
                
                res.status(200).send({method})
            }
            else {
                console.log('no');
                
                res.status(400).send({method})
            }
        }

        catch ( err ) {
            console.log(err)
            console.log('erro aqui');
            
            res.status(500).send({method})
        }
    }
}
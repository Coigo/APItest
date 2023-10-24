import { prismaClient } from "../../prisma/PrismaClient.ts";
import { Request, Response } from "express";
import { createHash } from "crypto";
import { token } from "../modules.ts";


export class LoginRequest {
    async handle(req:Request, res:Response) {
        let { username, password } = req.body
        password = createHash('md5').update(password).digest('base64url')
        try {
            const result = await prismaClient.users.findFirst({
                where: {
                    username, password
                }
            })
            if ( !result ) return res.status(401).end()
            else if ( result ) {
        
                res.status(200)
                return res.send(token(result))
        } 
            
        }
        catch ( err ) {
            console.log(err)
            return res.status(500).end()
        }
    }
}
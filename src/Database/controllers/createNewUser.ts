import { Request, Response } from 'express'
import { prismaClient } from '../PrismaClient.ts'
import { createHash } from 'crypto'

type userData = {
    username:string,
    password:string,
    email:string
}

export class CreateNewUser {
    async handle (req: Request, res: Response) {
        try {
            let {username, password, email}: userData = req.body
            password = createHash('md5').update(password).digest("base64url")
    
            const User = await prismaClient.users.create({
                data: {
                    username, 
                    password,
                    email
                }
            })
            console.log(res)
            return res.status(200).end()
        }
        catch ( err ) {
            console.log(err)
            return res.status(400).end()
        }
    }
} 
import { Request, Response } from 'express'
import { prismaClient } from '../PrismaClient.ts'

export class UserCheck {
    async handle (req: Request, res: Response) {
        const { username } =  req.body
        console.log(username)
        try {
            const result = await prismaClient.users.findFirst({
                where: {
                    username
                }
            })
                if (result?.username) {
                    console.log('existe')
                    return res.status(400).end()
                }
                else {
                    console.log('não existe')
                    return res.status(200).end()
                }
        }
        catch ( err ) {
            console.log('erro')
            return res.status(500).end()
        }
    }
}
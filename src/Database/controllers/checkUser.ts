import { Request, Response } from 'express'
import { prismaClient } from '../PrismaClient.ts'
import { type } from 'os'


type checkUser = {
    check:string,
    username?:string,
    email?:string
}

export class UserCheck {
    async handle (req: Request, res: Response) {
        const check: checkUser =  req.body
        console.log(check)
        try {

                    const result:any = {
                        "username": async () => {
                            const { username } = check
                            const query = await prismaClient.users.findFirst({
                            where: {
                                username
                                }
                            })
                            return query
                        },
                        "email": async () => {
                            const { email } = check
                            const query =  await prismaClient.users.findFirst({
                            where: {
                                email
                                }
                            })
                            return query
                        }
                    }
            const Exist = await result[check.check]()

            if ( Exist ) {
                return res.status(400).send({checkType: check.check})
            }
            else {
                return res.status(200).send({checkType: check.check})
            }

        }
        
        catch ( err ) {
            console.log('erro')
            return res.status(500).end()
        }
    }
}
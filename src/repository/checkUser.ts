import { Request, Response } from 'express'
import { prismaClient } from '../../prisma/PrismaClient.ts'
import { type } from 'os'
import { CustomError } from '../costumError.ts'


type checkUser = {
    username?:string,
    email?:string
}

export class UserCheck_repository {
    async check (InfoTOcheck: checkUser, method: string) {
        try {

                    const result:any = {
                        "username": async () => {
                            const { username } = InfoTOcheck
                            const query = await prismaClient.users.findFirst({
                            where: {
                                username
                                }
                            })
                            return query
                        },
                        "email": async () => {
                            const { email } = InfoTOcheck
                            const query =  await prismaClient.users.findFirst({
                            where: {
                                email
                                }
                            })
                            return query
                        }
                    }
            const Exist = await result[method]()

            if ( Exist ) {
                return {checkType: method, ok: true}
            }
            else {
                return {checkType: method, ok: true}
            }

        }
        
        catch ( err ) {
            throw new CustomError ('Erro interno', 500)
        }
    }
}
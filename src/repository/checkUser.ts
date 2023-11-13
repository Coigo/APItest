import { prismaClient } from '../../prisma/PrismaClient.ts'
import { CustomError } from '../costumError.ts'


type checkProps = {
    prop:string
    method:string
}


export class UserCheck_repository {

    async check (props:checkProps) {
        console.log('Chegou no repositorio')
        try {

            const { prop, method } = props

                    const result:any = {
                        "username": async () => {
                            const query = await prismaClient.users.findFirst({
                            where: {
                                username: prop
                                }
                            })
                            return query
                        },
                        "email": async () => {
                            const query =  await prismaClient.users.findFirst({
                            where: {
                                email: prop
                                }
                            })
                            return query
                        }
                    }
            const Exist = await result[method]()

            if ( Exist ) {
                console.log('existe')
                return {checkType: method, free: false}
            }
            else {
                console.log('não existe')
                return {checkType: method, free: true}
            }
        }
        
        catch ( err ) {
            throw new CustomError ('Erro interno', 500)
        }
    }
}
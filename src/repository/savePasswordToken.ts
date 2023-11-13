
import { log } from "console";
import { prismaClient } from "../../prisma/PrismaClient.ts";
import { CustomError } from "../costumError.ts";


type tokenProps = {
    email:string,
    token: string
}

export class savePasswordToken {


    async create ( props: tokenProps ) {

        try{
            console.log('> repository: iniciado')
            const { email, token } = props

            const result = await prismaClient.$transaction( 
                async ( tx ) => {


                const user = await tx.users.findFirst({
                    where: { email }
                })
                console.log(`O resultado do repositoty é: ${user ? user.id : 'Não encontrado'} `)
                
                
                if ( user ) {

                    const create = await tx.changePasswordTokens.create({
                        data: { token, user_id: user.id }
                    })
                    console.log('> repository: finalizado corretamente')
                    return true
                }
                throw new CustomError('Usuário nao encontrado', 400)
            })
            return result
        }
        
        catch ( err ) {
            console.log(err)
            return false
            
        }
    }



}
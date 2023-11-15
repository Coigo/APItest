import { prismaClient } from "../../prisma/PrismaClient.ts";
import { Request, Response } from "express";
import { CustomError } from "../costumError.ts";


type updateProps = {
    token:string
    password: string
}

interface Token {
    user_id: number
    token: string
}



export class UpdateUserPassword_repository {
    
    async update ( props: updateProps ) {
        
        const { token, password } = props

        try {

            return await prismaClient.$transaction(
                async ( tx ) => {
                    
                    const Token = await tx.changePasswordTokens.findFirst({
                        where: { token }
                    });
                    
                    if ( Token && Token.user_id ) {
                        const { user_id } = Token
                        console.log(user_id);
                        
                        const update = await tx.users.update({
                            where: {id: user_id},
                            data: { password }
                        })

                        const deleteToken = await tx.changePasswordTokens.delete({
                            where: { token }
                        })

                        return true
                    }
                    throw false
                }
            )
        }
        catch ( err ) {
            throw new CustomError ('Não foi possível atualizar a senha do usuário', 400)
        }
    }

}
import { prismaClient } from "../../prisma/PrismaClient.ts";
import { Request, Response } from "express";

type resetPasswordType = {
    password:string,
    token:string
    email:string
}

export class ResetPasswordRequest {
    async handle( req: Request, res: Response ) {
        try {
            const { password, token } = req.body as resetPasswordType

        }
        catch ( err ) {

        }

        async function verifyTokenFromDatabse( request: resetPasswordType ) {
            const { token } = request
            const query = await prismaClient.changePasswordTokens.findFirst({
                where: {
                token
                }
            }) 
            console.log(query)
            
        }

        async function resetPassword( password: string, email: string  ) {
            const reset = await prismaClient.users.update({
                where: { email },
                data:

            })
        }

    } 
}
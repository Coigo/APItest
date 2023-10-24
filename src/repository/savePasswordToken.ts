
import { prismaClient } from "../../prisma/PrismaClient.ts";

type UUID = string 

export class savePasswordToken {
    async handle ( token: UUID, email: string ){
        const user_id = await getUserID(email)
        const save = await prismaClient.changePasswordTokens.create({
            data: {
                token, user_id 
            }
        })

    async function getUserID( email:string ) {
        const result = await prismaClient.users.findFirst({
            where: {email}
        }) 
        if ( result ) return result.id
        else return null
    }
  
    }
    
}
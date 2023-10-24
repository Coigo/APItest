import { prismaClient } from "../../prisma/PrismaClient.ts";
import { Request, Response } from "express";
import { decode } from  '../modules.ts'


export class DeleteRequest {
    async handle( req: Request, res: Response ) {
        const { token } = req.body
    try {
        const { id } = decode(token) 
        console.log(decode(token) )

        const deleteUser = await prismaClient.users.delete({ 
            where: {
              id: id
            },
          })
          return res.status(200).end()
        }
 
    catch( err ) {
        return res.status(500).end()
    }
    }
}




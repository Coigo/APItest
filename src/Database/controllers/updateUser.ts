import { prismaClient } from "../PrismaClient.ts";
import { Request, Response } from "express";

type userUpdate = Omit<Request, "id">



export class UpdateUser {
    async handle( req:Request, res:Response ) {

        try {
            const { id }  = req.body
            const data: userUpdate = req.body
            
            const result = await prismaClient.users.update({
                where: {
                  id: id
                },
                data
                
            })
            return res.status(200).end()
        } catch ( err ) {
            console.log(err)
            return res.status(500).end()
        } 
    } 
}
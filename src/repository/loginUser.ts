import { prismaClient } from "../../prisma/PrismaClient.ts";
import { Request, Response } from "express";
import { createHash } from "crypto";
import { token } from "../modules.ts";
import { CustomError } from "../costumError.ts";

type userProps = {
    username: string
    password: string
}

export class Login_repository {
    async login( props: userProps ) {
        const { username, password } = props
        try {
            const login = await prismaClient.users.findFirst({
                where: {
                    username, password
                }
            })
            if ( login ) {
                return login 
            }
            return null
        }
        catch ( err ) {
            throw new CustomError("Erro ao fazer login", 500)
        }
    }
}
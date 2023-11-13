import { prismaClient } from "../../prisma/PrismaClient.ts";



export default class FindToken {

    async find ( token: string ) {

        const result = prismaClient.changePasswordTokens.findFirst({
            where: {
                token
            }
        })

    }
}
import { prismaClient } from '../../prisma/PrismaClient.ts'
import { createHash } from 'crypto'
import { createUser_repository, userProps } from '../service/createUser.service.ts'
import { CustomError } from '../costumError.ts'


interface newUser_props {
    username: string,
    password: string,
    email: string
}

export class CreateNewUser_repository implements createUser_repository {
    async create (props: userProps) {
        console.log('chegou aqui')
        try {
            let {username, password, email} = props
            password = createHash('md5').update(password).digest("base64url")
    
            const User = await prismaClient.users.create({
                data: { username, password, email }
            })

            console.log(User)
            return true
        }
        
        catch ( err ) {
            console.log(err)
            throw new CustomError('Erro ao Criar o usuário', 500)
        }
    }
} 
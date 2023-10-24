import { prismaClient } from "../../prisma/PrismaClient.ts"
import { CustomError } from "../costumError.ts"
import { CreateNewUser_repository } from "../repository/createNewUser.ts"


export interface userProps {
    usernameIsAvaliable?: boolean
    emailIsAvaliable?: boolean
    username: string,
    password: string,
    email: string,
}

export interface createUser_repository {
    create? ( props: userProps ): Promise<boolean> | {}
}

//______________________________________________________________

export class CreateUser_service {

    private props: userProps
    private repository : createUser_repository 
    

    async create_user() {
        try {
            
            const {username, password, email } = this.props
            const create = await (this.repository.create ? this.repository.create({ username, password, email }) : this.createUser_mock)
            console.log(create)
            return true
        }
        catch (err) {
            console.log(err)
            throw new CustomError ('Erro interno', 500)
        }

    }

//______________________________________________________________

    private get createUser_mock  () {
        try {
            console.log('caiu no teste')
            const username = this.props.username 
            const password = this.props.email 
            const email = this.props.password 
            return { username, password, email }
        }
        catch ( err ) {
            return false
        }
    }

//_______________________________________________________
    
    get username () {
        return this.props.username
    }
    get password () {
        return this.props.password
    }
    get email () {
        return this.props.email
    }
    
//_________________________________________________________

    constructor ( props: userProps, repository: createUser_repository = {}) {
        const { usernameIsAvaliable, emailIsAvaliable } = props

        if ( !usernameIsAvaliable || !emailIsAvaliable ) 
        { throw new CustomError('Nome de usuário ou email não disponiveis', 400) }

        this.props = props
        this.repository = repository 
    }
}
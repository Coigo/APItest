
import { CustomError } from "../costumError.ts"
import { encryptedPassword, token, decode } from "../modules.ts"
import { Login_repository } from "../repository/loginUser.ts"

type user_props = {
    username: string
    password: string
}

type loginResult = {
    username: string,
    id:number
} 

interface login_repository {
    login? ( props: user_props ): Promise<boolean> | {}
}


export class LoginUser_service {

    private props: user_props
    private repository: login_repository

    async login (  ) {
        let { username, password } = this.props
        password = encryptedPassword(password)
        try {
            const login = await ( this.repository.login? this.repository.login({ username, password }) : this.login_mock )

            if ( login ) {
                console.log(login)
                const JWTtoken = token( login as loginResult )
                console.log(decode(JWTtoken))
                return JWTtoken 
            }
            else 
                { return null }
        }
        catch ( err ) {
            console.log(err)
            throw new CustomError("Erro interno", 500)
        }
    }


    private get login_mock () {
        const { username, password } = this.props 
        const fakeDatabase = [{id:1, username:'Jhon Doe', password:'123', email:'teste@gmail.com'}]

        const login = fakeDatabase.find(user => user.username === username && user.password === password )
        return login
    }


    constructor ( props:user_props, repository: login_repository = {} ) {
        if ( !props.password && !props.username ) {
            throw new CustomError('Usuario ou senha não informados', 400 )
        }
        this.props = props
        this.repository = repository
    }
}
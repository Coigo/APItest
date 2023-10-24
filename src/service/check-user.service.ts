import { promises } from "dns"
import { CustomError } from "../costumError.ts"
import { threadId } from "worker_threads"


export type userInformation = {
    username?: string
    email?: string
}

export interface checkUser_repository {
    check? ( info: userInformation, method: string ): Promise<boolean> | {}
}

// _________________________________________________________________________________________________________________________________________

export class UserCheck {

    private info: userInformation
    private method: string
    private repository: checkUser_repository


    async check () {
        try {
            console.log('check')
            const checkOK = await (this.repository.check ? this.repository.check({ username: this.info as string}, 'username') : this.checkUser_mock )
            return checkOK

        }
        catch ( err ) {
            throw new CustomError ('Erro interno', 500)
        }

    }
// _________________________________________________________________________________________________________________________________________

    get checkUser_mock () {
        console.log('mock')
        const fakeDatabase = [{ id: 1, username: 'Fulano', email:'email@teste.com' }]

        try {
            const fakeSearch = {
                        'username': () => {
                        return fakeDatabase.find(user => user['username'] === this.info.username)
                        },
                        'email': () => {
                        return fakeDatabase.find(user => user['email'] === this.info.email);
                        }
                    }
            const result = fakeSearch[ this.method as 'username' | 'email']()
            if ( !result ) {
                return true //disponivel
            }
            return false

        }
        catch ( err ) {
            throw new CustomError ('Erro interno', 500)
        }


    }

// _________________________________________________________________________________________________________________________________________
    get userinfo () {
        return this.info
    }
    get currentMethod () {
        return this.method
    }

// _________________________________________________________________________________________________________________________________________

    constructor ( info: userInformation, method: string, repository: checkUser_repository = {} ) {

        if (method !== "email" && method !== "username") {
            throw new CustomError ('O metodo de verificação deve ser apenas para "email" ou "username"', 500)
        }
        if ( !info || !info.email && !info.username) {
            throw new CustomError ( 'As credenciais para verificação devem ser atribuídas', 400 ) 
        } 
        
        this.info = info
        this.method = method
        this.repository = repository

    }
}
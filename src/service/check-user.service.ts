import { promises } from "dns"
import { CustomError } from "../costumError.ts"
import { threadId } from "worker_threads"


export type userInformation = {
    prop:string
    method:string
}

export interface checkUser_repository {
    check? ( property: userInformation): Promise<boolean> | {}
}

// _________________________________________________________________________________________________________________________________________

export class UserCheck {

    private property: userInformation
    private repository: checkUser_repository


    async check_user () {


        try {
            const check = await (this.repository.check ? this.repository.check( this.property ) : this.checkUser_mock )
            console.log(check)
            return check

        }
        catch ( err ) {
            throw new CustomError ('Erro interno', 500)
        }

    }
// _________________________________________________________________________________________________________________________________________

    get checkUser_mock () {
        const fakeDatabase = [{ id: 1, username: 'Fulano', email:'email@teste.com' }]

        try {
            const method = this.property.method
            const fakeSearch = {
                        'username': () => {
                        return fakeDatabase.find(user => user['username'] === this.property.prop)
                        },
                        'email': () => {
                        return fakeDatabase.find(user => user['email'] === this.property.prop);
                        }
                    }
            const result = fakeSearch[ this.property.method as 'username' | 'email']()
            if ( !result ) {
                 return {method: method, free: true}
            }
             return {method: method, free: false}

        }
        catch ( err ) {
            throw new CustomError ('Erro interno', 500)
        }


    }

// _________________________________________________________________________________________________________________________________________
    get userinfo () {
        return this.property
    }
    get currentMethod () {
        return this.property.method
    }

// _________________________________________________________________________________________________________________________________________

    constructor ( property: userInformation, repository: checkUser_repository = {} ) {
        console.log(property)
        if (!(property.method === "email" || property.method === "username")) {
            throw new CustomError ('O metodo de verificação deve ser apenas para "email" ou "username"', 500)
        }
        if ( !property.prop ) {
            console.log('err');
            
            throw new CustomError ( 'As credenciais para verificação devem ser atribuídas', 400 ) 
        } 
        console.log(property)
        this.property = property
        this.repository = repository

    }
}
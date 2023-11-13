import { CustomError } from "../costumError.ts"
import { encryptedPassword } from "../modules.ts"

export type userProps = {
    password:string,
    token: string
}

type update_mock = () => boolean

export interface updateUser_repository  {
    update? ( props:userProps ): Promise<boolean> | {}
}

export class UpdateUser {


    private props: userProps
    private repository: updateUser_repository 
 


    async update () {
        try {

            let { password, token } = this.props
            password = encryptedPassword(password)
            const updateInstance = await ( this.repository.update ? this.repository.update({ password, token }) :  true)
            return true 
            
        }
        catch ( err ) {
            throw err
        }
    }



    get password () {
        return this.props.password
    }


    constructor ( props: userProps, repository: updateUser_repository = {} ) {

        if ( !props || !props.password  ) {
            throw new CustomError ( "Email ou senha não informados", 400)
        }

        this.props = props
        this.repository = repository

    }

}
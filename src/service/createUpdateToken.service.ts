import { CustomError } from "../costumError.ts"
import { randomUUID } from "crypto"
import { Mail_Service } from "../mailer/mailer.service.ts"



type updateProps = {
    email: string
    token?: string
}

interface createToken_repository  {
    create? ( props: updateProps ): Promise<boolean> | {}
}


export class CreateUpdateToken {


    private props: updateProps
    private repository: createToken_repository


    async create () {
        
        try{
            const token = randomUUID()
            this.props.token = token
            const create = await ( this.repository.create? this.repository.create( this.props ) : () => { return token } )

            if ( create  ) {
                const newMail = new Mail_Service ({ email: this.props.email, token })
                newMail.mail()
                return true
            }
            return false
        }
        catch ( err ) {
            console.log(err)
            return false
        }



    }


    constructor ( props: updateProps, repository: createToken_repository = {} ) {

        if ( !props.email ) {
            throw new CustomError('As credenciais para verificação devem ser atribuídas', 400)
        }

        this.props = props
        this.repository = repository

    }

}
import { UserCheck } from "./check-user.service.ts"

    const call =  new UserCheck( { email:'email@teste.com' }, 'email' )
    console.log(call.check())


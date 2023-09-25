import { UserInfo } from "os"


export type LoginRequest = {
    username: string,
    password: string,
    ok?: boolean
}



export function login(userInfo: LoginRequest, db: (userInfo: LoginRequest) => number): number {
    const result = db(userInfo)
    if ( result === 200 ) {
        return 200
    }
    return 400
}

console.log(typeof login)
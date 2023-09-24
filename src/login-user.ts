

export type LoginRequest = {
    username: string,
    password: string,
    ok?: string
}



export function login( userInfo: LoginRequest, db: number): LoginRequest {
    const { username, password } = userInfo
    return  { username, password}
}

console.log(typeof login)
import  express, {Express, Request, Response}  from 'express'
import dotenv from 'dotenv'
import { login, LoginRequest } from './login-user.ts'

const app: Express = express()

app.use(express.json())


function qualquer(userInfo: LoginRequest): number {
    console.log(userInfo)
    if ( userInfo.ok ) {
        return 200
    }
    return 400
}
console.log(typeof qualquer)

interface Login {
    
}

app.post('/login', async (req: Request, res: Response) => {
    const UserInfo = req.body;
    const response = login( UserInfo,  qualquer );
    console.log(response)
    res.sendStatus(response)
});

app.listen(4002, () => {
    console.log('Servidor aberto na porta 4002')
})
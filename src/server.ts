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


app.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const response = login({ username, password },  qualquer );
    res.send(response)
});

app.listen(4002, () => {
    console.log('Servidor aberto na porta 4002')
})
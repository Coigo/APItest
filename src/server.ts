import  express, {Express, Request, Response}  from 'express'
import { CreateNewUser } from './Database/controllers/createNewUser.ts'
import { UserCheck } from './Database/controllers/checkUser.ts'
import { LoginRequest } from './Database/controllers/loginUser.ts'
import { UpdateUser } from './Database/controllers/updateUser.ts'
import { DeleteRequest } from './Database/controllers/deleteUser.ts'

const app: Express = express()

app.use(express.json())

const createUser = new CreateNewUser()
const checkIfUserExist = new UserCheck()
const loginRequest = new LoginRequest()
const deleteRequest = new DeleteRequest()
const updateUser = new UpdateUser()

app.post('/create', createUser.handle);
app.post('/check', checkIfUserExist.handle);
app.post('/login', loginRequest.handle)
app.post('/delete', deleteRequest.handle)
app.post('/update', updateUser.handle)


app.listen(4002, () => {
    console.log('Servidor aberto na porta 4002')
})
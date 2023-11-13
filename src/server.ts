import  express, {Express, Request, Response}  from 'express'


import { CreateUser } from './controler/create-user.controler.ts'
import { CheckUser } from './controler/check-user.controler.ts'
import { Login_controler } from './controler/login.controler.ts'
import { createToken_controler } from './controler/createUpdateToken.controler.ts'
import { updateUser_controler } from './controler/update-user.controler.ts'


const app: Express = express()
app.use(express.json())

const createUser = new CreateUser() 
const checkUser = new CheckUser()
const login = new Login_controler()
const createToken = new createToken_controler()
const update = new updateUser_controler()


app.post('/create', createUser.handle) 
app.post('/check', checkUser.handle) 
app.post('/login', login.handle)
app.post('/createToken', createToken.handle)
app.post('/update', update.handle)
// const props = req.body


// const user = new User(props);



// const createUserService = new CreateUserService(userRepository);

// createUserService.handle(user);

// // Repositorio  -- Tota regra do bancos.
// // Services  - Usecase - Regra de negocio
// // Controller - Valida entrada


// user.isValid();

// createUser.handle(user)

// const create = await create_user.create_user()




app.listen(4002, () => {
    console.log('Servidor aberto na porta 4002')
})
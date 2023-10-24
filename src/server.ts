import  express, {Express, Request, Response}  from 'express'



import { prismaClient } from '../prisma/PrismaClient.ts'
import { CreateUser } from './controler/create-user.controler.ts'

const app: Express = express()
app.use(express.json())

const createUser = new CreateUser() 



app.post('/create', createUser.handle) 
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
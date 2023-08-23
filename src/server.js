
const {SaveNewUser, CheckIfUsernameExist, LoginUser} = require( '../Database/interaction.js')
const { CreateUser } = require( './create-user.js')
const { Init_loginUser } = require( './login-user.js')

const express = require('express')
const cors  = require('cors')
const app = express()
const jwt = require('jsonwebtoken')



app.use(express.json())
app.use(cors({
    origin: ['http://localhost:4001', 'http://localhost:4002']
     
}))



        app.post('/signup', async (req, res) => {
            console.log('Requisição Recebida')
            
            const UserInfo = req.body
            const WasCreated = await CreateUser(UserInfo, {
                CheckIfUsernameExist, SaveNewUser
            })

            if ( WasCreated === true ) {
                res.status(200).end()
            }
            else {
                res.status(400).end()
            }
        })


        app.post('/login', async (req, res) => {
            const Userinfo = req.body
            const Login = await Init_loginUser(Userinfo, {
                LoginUser
            })
            if ( Login === 'err' ) {
                res.status(400).end()
            }
            else if ( Login === [] ) {
                
            }
            else {
                res.status(200).send(Login)
            }
        })
        

app
    .listen(4002)
    .once('listening', () => {
        console.log('API aberta na porta 4002')
    })
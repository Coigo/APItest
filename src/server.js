
const {SaveNewUser, CheckIfUsernameExist, LoginUser} = require( '../Database/interaction.js')
const { Init_loginUser } = require( './login-user.js')
const { CreateUser } = require( './create-user.js')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken') 
require('dotenv').config()

const express = require('express')
const cors  = require('cors')

const app = express()



app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:4001', 'http://localhost:4002'],
    credentials: true
     
}))



        app.post('/signup', async (req, res) => {
            console.log('Requisição Recebida')
            
            const UserInfo = req.body
            console.log(UserInfo)
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
                res.status(501).end()
            }
            else if ( Login[0] === undefined ) {
                res.status(401).end()
            }
            else {
                const { id, username } = Login[0]

                const token = jwt.sign({ id, username }, process.env.SECRET,  { expiresIn: 60 })
                console.log(( 'token', 'token, { httpOnly: true }' ))
                res.cookie( 'token', token, { httpOnly: true, secure:true } )
                res.status(200).send({ "status" :"ok" })

            }
        })
        
        


app
    .listen(4002)
    .once('listening', () => {
        console.log('API aberta na porta 4002')
    })
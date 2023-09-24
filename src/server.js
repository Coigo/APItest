
const {SaveNewUser, CheckIfUsernameExist, LoginUser} = require( '../Database/interaction.js')
const { Init_loginUser } = require( './login-user.js')
const { CreateUser, CheckUsername } = require( './create-user.js')
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

        app.post('/check', async(req, res) => {
            const { username } = req.body            
              try {
                const result = await CheckUsername(username, { CheckIfUsernameExist })                
                res.status(result.code).end()
            }
            catch ( err ) {
                console.log(err)
                res.status(err.code).end()
            }
        })

        app.post('/signup', async (req, res) => {
            console.log('Requisição Recebida')
            
            const UserInfo = req.body
            console.log(UserInfo)
            try {
                const result = await CreateUser(UserInfo, { SaveNewUser })
                if ( result.Created === true ) {
                        res.status(200).end()
                    }
                else if ( result.Created === false ) {
                        res.status(409).end()
                    }
                
            }
            catch ( err ) {
                console.log('erro')
                res.status( 500 ).end()
            }

        })


        app.post('/login', async (req, res) => {
            const Userinfo = req.body
            console.log('Requisição recebida ', Userinfo)
            try {
                const result = await Init_loginUser(Userinfo, { LoginUser })
                if (result.code === 200) {                    
                    const { id, username } = result[0]                  
                    const token = jwt.sign({ id, username }, process.env.SECRET,  { expiresIn: 10000 })                    
                    res.send( token )
                    res.status(200)
                }
                else {
                    console.log('Usuario não autenticado')
                    res.status(401).end()
                }
            } 
            catch ( err ) {
                res.status(500).end()
                console.log(err)
            }
           
        })
        
        


app
    .listen(4002)
    .once('listening', () => {
        console.log('API aberta na porta 4002')
    })
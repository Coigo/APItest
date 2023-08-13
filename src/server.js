
import {SaveNewUser, CheckIfUsernameExist} from '../Database/interaction.js'
import { CreateUser } from './create-user.js'

const express = require('express')
const cors  = require('cors')
const app = express()

const db = require('../Database/interaction.js')

app.use(cors({
    origin: ['http://localhost:4001', 'http://localhost:4002']
     
}))



        app.post('/login', async (req, res) => {
            UserInfo = req.body
            
            CreateUser(UserInfo, {
                CheckIfUsernameExist,
                SaveNewUser
            })
            
                
                
                // .then((handler) => {
                //     DbInteraction.SaveNewUser(newUserInfo)
                //     .then(() => {
                //     return res.
                //             writeHead(200)
                //             .end()
                //     })
                //     .catch((err) => {
                //     console.log(err)
                //     })
                // })
                // .catch((err) => {
                // socket.emit('usuarioInvalido', 'erro')
                // })
        })

app
    .listen(4002)
    .once('listening', () => {
        console.log('API aberta na porta 4002')
    })

const {SaveNewUser, CheckIfUsernameExist} = require( '../Database/interaction.js')
const { CreateUser } = require( './create-user.js')

const express = require('express')
const cors  = require('cors')
const app = express()

const db = require('../Database/interaction.js')

app.use(cors({
    origin: ['http://localhost:4001', 'http://localhost:4002']
     
}))



        app.post('/login', async (req, res) => {
            console.log('Requisição Recebida')
            
            const UserInfo = {
                username:'aaaa',
                password:'bbbb',
                id: 1
            }
            async function CreateUser_Init() {
                 console.log('os dados estao sendo eviados')
               
                        // const resultado = await CreateUser(UserInfo, {
                        //     CheckIfUsernameExist,
                        //     SaveNewUser
                        // })
                            
                        
                        //     assert.equal(resultado, true)
                    
                
            
            }
            
        })

app
    .listen(4002)
    .once('listening', () => {
        console.log('API aberta na porta 4002')
    })
const { test } = require('node:test') 
const assert = require('node:assert') 
const mock = require('mock')

const {SaveNewUser, CheckIfUsernameExist} = require('../../Database/interaction.js')
const { CreateUser } = require( '../create-user.js') 
const { fake1, fake2 } = require( '../../Database/interaction.js')


 test("create new user", async () => {
    const UserInfo = {
        username:'aaaa',
        password:'bbbb',
        id: 1
    }
     
     async () => {
        try {
            const resultado1 = await CreateUser(UserInfo, [
                CheckIfUsernameExist
            ])
        } catch(err) {
            return false
        }
        console.log('1')
        try {
            const resultado2 = CreateUser(UserInfo, [
                SaveNewUser
            ]); return true
        } catch(err) {
            return false
        }
    }
    assert.equal()
})
const { test } = require('node:test') 
const assert = require('node:assert') 
const mock = require('mock')

const {SaveNewUser, CheckIfUsernameExist} = require('../../Database/interaction.js')
const { CreateUser } = require( '../create-user.js') 
const { fake1, fake2 } = require( '../../Database/interaction.js')


test("create new user", async () => {
    const UserInfo = {
        username:'qw2rq11qr',
        password:'bbbb',
        id: 112631331
    }

            const WasCreated = await CreateUser(UserInfo, {
                CheckIfUsernameExist, SaveNewUser
            })
            console.log(`o resltado de WasCreated é ${WasCreated}`)

        
        assert.equal(WasCreated, 'ok')
        
    

})
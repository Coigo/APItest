const {SaveNewUser, CheckIfUsernameExist} = require('../Database/interaction.js')





async function CreateUser(UserInfo, DataBasefunction) {
    console.log(`Os dados recebidos são: ${UserInfo}`)
    const { CheckIfUsernameExist, SaveNewUser } = DataBasefunction


            const check = await CheckIfUsernameExist(UserInfo)
                if ( check === undefined ) {
                    const Save = await SaveNewUser(UserInfo)  
                        if (Save === true) {
                            return true
                        } else { return false }
                } else { return false }


}

const UserInfo = {
    username:'aaaa',
    password:'bbbb',
    id: 1
}

async () => {
    const WasCreated = await CreateUser(UserInfo, {
        CheckIfUsernameExist, SaveNewUser
    })

}

module.exports = {
    CreateUser
} 
const {SaveNewUser, CheckIfUsernameExist} = require('../Database/interaction.js')





async function CreateUser(UserInfo, DataBasefunction) {
    console.log(`Os dados recebidos são: ${UserInfo}`)
    const { CheckIfUsernameExist, SaveNewUser } = DataBasefunction

    CheckIfUsernameExist(UserInfo)
    .then(() => {
        SaveNewUser(UserInfo)  
        .then((result) => {
            return result
        })
        .catch(() => {
            return false
        })
    }).catch(() => {
        return false
    })

            // const check = await CheckIfUsernameExist(UserInfo)
            //     if ( check === 'ok' ) {
            //         console.log(check)
            //         const Save = await SaveNewUser(UserInfo)  
            //         console.log('aqui')
            //             if (Save === 'ok') {
            //                 return true
            //             } else { return false }
            //     } else { return false }


}

const UserInfo = {
    username:'wer1t',
    password:'bbbb',
    id: 1134
}

async () => {
    CreateUser(UserInfo, {
        CheckIfUsernameExist, SaveNewUser
    })
    .then(() => {
        console.log('usuario nao existeaaaaa')
    })

    .catch(() => {
        console.log('nao existe')
    })

}

module.exports = {
    CreateUser
} 
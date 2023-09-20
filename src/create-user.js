

async function CheckUsername( username, DataBasefunction ) {
    console.log('checkusername: ', username)
    const { CheckIfUsernameExist } = DataBasefunction
    try {
        const result = await CheckIfUsernameExist(username)
        return result

    }
    catch ( err ) {
        console.log(err)
        return err
    } 
}

async function CreateUser(UserInfo, DataBasefunction) {
    console.log('CreateUser')
    const { SaveNewUser} = DataBasefunction

        try {
            await SaveNewUser(UserInfo)
            console.log('1: ta certo')
            return { Created: true, status: 200 }
        } 
        catch ( err ) {
            console.log('1: ta certo')
            console.log(err)
            throw err
        }

}


// function CreateUser(UserInfo, DataBasefunction) {
//     return new Promise((resolve, reject) => {
//         console.log(`Os dados recebidos são: ${UserInfo}`)
//         const { CheckIfUsernameExist, SaveNewUser } = DataBasefunction
//             CheckIfUsernameExist(UserInfo)
//             .then(()=> { SaveNewUser(UserInfo)
//                 .then(() =>  resolve(true) )
//                 .catch(() =>  resolve(false) )
//             }) .catch(() =>  resolve(false) )
//     })

// }


module.exports = {
    CreateUser,
    CheckUsername
} 
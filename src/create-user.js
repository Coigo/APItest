

function CreateUser(UserInfo, DataBasefunction) {
    return new Promise((resolve, reject) => {
        console.log(`Os dados recebidos são: ${UserInfo}`)
        const { CheckIfUsernameExist, SaveNewUser } = DataBasefunction
            CheckIfUsernameExist(UserInfo)
            .then(()=> { SaveNewUser(UserInfo)
                .then(() =>  resolve(true) )
                .catch(() =>  resolve(false) )
            }) .catch(() =>  resolve(false) )
    })

}


module.exports = {
    CreateUser
} 
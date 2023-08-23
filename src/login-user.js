

function Init_loginUser(UserInfo, LoginFunction) {
    return new Promise((resolve, reject) => {
        const { LoginUser } = LoginFunction

        LoginUser(UserInfo)
        .then((user) =>  resolve(user) )
        .catch((err) =>  { 
            console.log(err); 
            reject('err')
        })
    })
}

module.exports = {
    Init_loginUser,
}
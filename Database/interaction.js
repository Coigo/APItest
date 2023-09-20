const { Console } = require('console');
const { promises } = require('dns');
const { createConnection } = require('mysql')
require('dotenv').config()



const conn = createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,

})

async function CheckIfUsernameExist(username) {


  return new Promise((resolve, reject) => {
    conn.query("SELECT username from users where username = ? ", [username], (err, user) => {
      console.log(user)
      if (err) {
        if (err.code = "ECONNREFUSED") {
          console.log('Database Offline')
          reject({ code: 500 })
        }
        console.log(err)
        reject({ code: 500 })
      }

      else if (user[0] === undefined) {
        console.log('não existe')
        resolve({ code: 200 })
      }
      else if (user[0] !== undefined) {
        console.log('existe')
        resolve({ code: 400 })
      }
    })
  })
}








function SaveNewUser(newUser) {
  console.log('salvando')
  return new Promise((resolve, reject) => {
    const { username, password } = newUser;
    console.log(username)
    conn.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function (err) {


      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      console.log('> Inserção realizada com sucesso')
      resolve(true);
    })

  })
}

function LoginUser(user) {

  return new Promise((resolve, reject) => {
    const { username, password } = user
    conn.query('SELECT id, username FROM users WHERE username = ? AND password = ? limit 1', [username, password], (err, user) => {
      if (err) {
        if (err.code = "ECONNREFUSED") {
          console.error('Database Offline')
          reject({ code: 509 })
        }
        else {
          console.log(err)
          reject({ code: 500 })
        }
      }
      else if ( user[0] !== undefined ) {
        console.log('ok')
        user.code = 200
        resolve(user)
      }
      else {
        console.log(user[0])
        console.log('Usuario ou senha invalidos')
        const result = { code: 401 }
        resolve(result)
      }

    })
  })
}







function fake2(a) {
  console.log(a)
}

module.exports = {
  CheckIfUsernameExist,
  SaveNewUser,
  LoginUser,
  fake2,
}
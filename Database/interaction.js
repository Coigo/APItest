const { createPool } = require('mysql')
require('dotenv').config()



const pool = createPool({
  host:process.env.HOST,
  user:process.env.USER,
  password:process.env.PASSWORD,
  database:process.env.DATABASE,
  
})

function CheckIfUsernameExist(UserInfo) {
  console.log('iniciando checagem')
    return new Promise((naoExiste, existe) => {
      const { username } = UserInfo
      pool.query("Select Username from usuarios where Username = ?", [username], (err, user) => {
        
        if ( user === undefined) { console.log('usuario inexistente'); naoExiste(user) }
        else if (err) {
            console.log(err)
        }
        else { existe(user) }

      })
    })
  }


function SaveNewUser(newUser) {
  console.log('salvando')
  return new Promise((resolve, reject) => {
    const { username, password, id } = newUser;

    function InsertNewUser() {
      pool.query('INSERT INTO usuarios (Username, Password, id) VALUES (?, ?, ?)', [username, password, id], function(err) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        console.log('> Inserção realizada com sucesso.');

        resolve(true); // Resolve the Promise when the user is successfully inserted.
      });
    }

    InsertNewUser();
  });
}

async function fake1() {
  const result = await SaveNewUser({
    username:'aaaa',
    password:'bbb',
    id:342
  })
  console.log(result)
}

fake1()
 function fake2(a) {
  console.log(a)
}

module.exports = {
  CheckIfUsernameExist,
  SaveNewUser,
  fake1, fake2,
}
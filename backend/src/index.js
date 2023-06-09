const { response } = require('./app')
const User = require('./models/user')
const axios = require('axios').default

const URL = 'http://localhost:3001/'

const alexander = new User('alexander', 'hello@all.com')

// axios.get('/users').then(function (res) {
//     console.log(res.data)
// })

async function main() {
  // create a user with axios
  await axios.post(URL + 'users', {
    name: 'Alexander',
    email: 'alex@me.com',
  }) // after creating the static method on the user class, that self
  // creates users, theres no need to create variables to hold
  // and log them to the console as in the following example

  const bob = await axios
    .post(URL + 'users', {
      name: 'bob',
      email: 'bob@me.com',
    })
    .then(function (res) {})

  const allUsers = await axios.get(URL + 'users')

  console.log('all users: ', allUsers.data)
  console.log(process.env.MONGODB_CONNECTION_STRING)
}

main()

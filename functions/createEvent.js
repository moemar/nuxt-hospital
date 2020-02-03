/* eslint-disable require-await */
/* eslint-disable no-console */
const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async (event, context) => {
  // const data = JSON.parse(event.body)
  const eventItem = {
    eventType: { connect: '256362432517112320' },
    zip: '2410',
    treatedAt: { connect: '256208847065055763' },
    wasPreferredHospital: false,
    preferredTreatedAt: { connect: '256205308859253267' }
  }

  return client
    .query(q.Create(q.Collection('Event'), eventItem))
    .then((response) => {
      console.log(response)
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    })
    .catch((error) => {
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}

/* eslint-disable require-await */
/* eslint-disable no-console */
const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body)
  const eventItem = {
    data: {
      eventType: q.Ref(q.Collection('EventType'), data.eventType),
      zip: data.zip,
      treatedAt: q.Ref(q.Collection('Hospital'), data.treatedAt),
      wasPreferredHospital: data.wasPreferredHospital,
      preferredTreatedAt: q.Ref(
        q.Collection('Hospital'),
        data.preferredTreatedAt
      )
    }
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

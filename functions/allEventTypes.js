/* eslint-disable no-console */
const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (event, context) => {
  return client
    .query(q.Paginate(q.Match(q.Ref('indexes/allEventTypes'))))
    .then((response) => {
      const eventTypeRefs = response.data
      const getAllEventTypesDataQuery = eventTypeRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllEventTypesDataQuery).then((ret) => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret)
        }
      })
    })
    .catch((error) => {
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}

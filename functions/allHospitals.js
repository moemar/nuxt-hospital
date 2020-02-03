/* eslint-disable no-console */
// https://github.com/netlify/netlify-faunadb-example
/* Import faunaDB sdk */
const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (event, context) => {
  return client
    .query(q.Paginate(q.Match(q.Ref('indexes/allHospitals'))))
    .then((response) => {
      const hospitalRefs = response.data
      const getAllHospitalsDataQuery = hospitalRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllHospitalsDataQuery).then((ret) => {
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

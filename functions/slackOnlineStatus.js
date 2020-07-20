const fetch = require('node-fetch')

const { SLACK_AUTHORIZATION_TOKEN } = process.env

exports.handler = async (event, context) => {
  const slackUserID = event.queryStringParameters.userID
  const API_ENDPOINT = `https://slack.com/api/users.getPresence?token=${SLACK_AUTHORIZATION_TOKEN}&user=${slackUserID}`

  return fetch(API_ENDPOINT, { headers: { Accept: 'application/json' } })
    .then(response => response.json())
    .then(data => ({
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      statusCode: 200,
      body: data.presence
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }))
}

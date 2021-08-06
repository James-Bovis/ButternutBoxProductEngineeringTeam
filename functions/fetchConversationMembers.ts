const fetch = require('node-fetch')

const { SLACK_AUTHORIZATION_TOKEN } = process.env

exports.handler = async (event, context) => {
  const channelID = event.queryStringParameters.channel
  const API_ENDPOINT = `https://slack.com/api/conversations.members?token=${SLACK_AUTHORIZATION_TOKEN}&channel=${channelID}`

  return fetch(API_ENDPOINT, { headers: { Accept: 'application/json' } })
    .then((response) => response.json())
    .then((data) => ({
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: 200,
      body: JSON.stringify(data.members)
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }))
}

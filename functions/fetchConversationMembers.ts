const fetch = require('node-fetch')

const { SLACK_AUTHORIZATION_TOKEN } = process.env

exports.handler = async (event, context) => {
  const channelID = event.queryStringParameters.channel

  let members = []
  let cursor = ''

  const baseURL = `https://slack.com/api/conversations.members?channel=${channelID}&limit=200`

  do {
    try {
      const API_ENDPOINT = `${baseURL}${cursor}`

      const fetchData = await fetch(API_ENDPOINT, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${SLACK_AUTHORIZATION_TOKEN}`
        }
      })

      const data = await fetchData.json()

      cursor = data.response_metadata.next_cursor
        ? `&cursor=${data.response_metadata.next_cursor}%3D`
        : ''

      members.push(data.members)
    } catch (error) {
      return {
        statusCode: 422,
        body: String(error)
      }
    }
  } while (cursor !== '')

  return {
    statusCode: 200,
    body: JSON.stringify(members.flat())
  }
}

import type { UserProfile } from './../src/javascript/components/TeamMember'

type SlackUser = {
  id: string
  team_id: string
  name: string
  deleted: boolean
  color: string
  real_name: string
  tz: string
  tz_label: string
  tz_offset: number
  profile: {
    title: string
    phone: string
    skype: string
    real_name: string
    real_name_normalized: string
    display_name: string
    display_name_normalized: string
    fields: null
    status_text: string
    status_emoji: string
    status_expiration: number
    avatar_hash: string
    image_original: string
    is_custom_image: boolean
    first_name: string
    last_name: string
    image_24: string
    image_32: string
    image_48: string
    image_72: string
    image_192: string
    image_512: string
    image_1024: string
    status_text_canonical: string
    team: string
  }
  is_admin: boolean
  is_owner: boolean
  is_primary_owner: boolean
  is_restricted: boolean
  is_ultra_restricted: boolean
  is_bot: boolean
  is_app_user: boolean
  updated: number
}

const fetch = require('node-fetch')

const { SLACK_AUTHORIZATION_TOKEN } = process.env

exports.handler = async (event, context): Promise<UserProfile> => {
  const slackUserID = event.queryStringParameters.userID
  const API_ENDPOINT = `https://slack.com/api/users.info?token=${SLACK_AUTHORIZATION_TOKEN}&user=${slackUserID}`

  return fetch(API_ENDPOINT, { headers: { Accept: 'application/json' } })
    .then((response) => response.json())
    .then((data) => {
      const { user, ok, error } = data

      if (!ok) {
        return {
          statusCode: 429,
          body: error
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          id: user.id,
          teamId: user.team_id,
          realName: user.real_name,
          avatar: user.profile.image_192,
          timeZone: user.tz,
          timeZoneLabel: user.tz_label,
          timeZoneOffset: user.tz_offset,
          deleted: user.deleted
        })
      }
    })
    .catch((error) => ({ statusCode: 422, body: String(error) }))
}

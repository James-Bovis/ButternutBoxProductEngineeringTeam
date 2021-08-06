import * as React from 'react'

// Utils
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { getCountryForTimezone } from 'countries-and-timezones'

// Atoms
import { currentTimeState, is24HourState, onlineTeamMemberIds } from '../atoms'

type UserProfile = {
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

type Props = {
  userProfile: UserProfile
}

const TeamMember = ({ userProfile }: Props): React.ReactElement => {
  const [isOnline, setIsOnline] = React.useState(false)
  const setOnlineTeamMemberIds = useSetRecoilState(onlineTeamMemberIds)

  const show24HourTime = useRecoilValue(is24HourState)
  const currentTime = useRecoilValue(currentTimeState)

  const countryInformation = getCountryForTimezone(userProfile.tz)

  // Fetch the Team Members Slack profile and presence status
  React.useEffect((): void => {
    const userPresenceEndpoint = `/.netlify/functions/slackOnlineStatus?userID=${userProfile.id}`

    fetch(userPresenceEndpoint)
      .then((response) => response.text())
      .then((data) => {
        if (data === 'active') {
          setIsOnline(true)
          setOnlineTeamMemberIds((oldArray) => [...oldArray, userProfile.id])
        } else {
          setIsOnline(false)
        }
      })
  }, [userProfile.id, setOnlineTeamMemberIds])

  return (
    <div className='team-member'>
      <div className='team-member__avatar'>
        <div
          className={`team-member__avatar__day-night-indicator ${
            isOnline
              ? 'team-member__avatar__day-night-indicator--online'
              : 'team-member__avatar__day-night-indicator--offline'
          }`}
        />
        <img
          alt={userProfile.real_name}
          className='team-member__avatar__image'
          src={userProfile.profile.image_192}
        />
      </div>
      <div className='team-member__information'>
        <h2 className='team-member__information__name'>
          {userProfile.real_name}
        </h2>
        <p className='team-member__information__current-time'>
          {format(
            utcToZonedTime(currentTime, userProfile.tz),
            show24HourTime ? 'HH:mm' : 'hh:mm a'
          )}
        </p>
        <small className='team-member__information__timezone'>
          {userProfile.tz}
        </small>
        {countryInformation && (
          <img
            alt={countryInformation.name}
            className='team-member__country'
            src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${countryInformation.id}.svg`}
          />
        )}
      </div>
    </div>
  )
}

export default TeamMember
export type { UserProfile }

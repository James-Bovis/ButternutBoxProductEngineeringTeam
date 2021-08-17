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
  realName: string
  avatar: string
  timeZone: string
  timeZoneLabel: string
}

type Props = {
  userProfile: UserProfile
}

const TeamMember = ({ userProfile }: Props): React.ReactElement => {
  const [isOnline, setIsOnline] = React.useState(false)
  const setOnlineTeamMemberIds = useSetRecoilState(onlineTeamMemberIds)

  const show24HourTime = useRecoilValue(is24HourState)
  const currentTime = useRecoilValue(currentTimeState)

  const countryInformation = getCountryForTimezone(userProfile.timeZone)

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
          alt={userProfile.realName}
          className='team-member__avatar__image'
          src={userProfile.avatar}
        />
      </div>
      <div className='team-member__information'>
        <h2 className='team-member__information__name'>
          {userProfile.realName}
        </h2>
        <p className='team-member__information__current-time'>
          {format(
            utcToZonedTime(currentTime, userProfile.timeZone),
            show24HourTime ? 'HH:mm' : 'hh:mm a'
          )}
        </p>
        <small className='team-member__information__timezone'>
          {userProfile.timeZone}
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

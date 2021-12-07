import * as React from 'react'

// Utils
import { useRecoilValue } from 'recoil'
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { getCountryForTimezone } from 'countries-and-timezones'

// Assets
import ChatBubble from '../../assets/images/chat-bubble.svg'

// Hooks
import useGetTeamMemberPresence from '../hooks/useGetTeamMemberPresence'

// Atoms
import { currentTimeState, is24HourState } from '../atoms'

type UserProfile = {
  id: string
  teamId: string
  realName: string
  avatar: string
  timeZone: string
  timeZoneLabel: string
  timeZoneOffset: number
  deleted: boolean
  isInvitedUser: boolean
  isBot: boolean
}

type Props = {
  userProfile: UserProfile
}

const TeamMember = ({ userProfile }: Props): React.ReactElement => {
  const show24HourTime = useRecoilValue(is24HourState)
  const currentTime = useRecoilValue(currentTimeState)
  const { isOnline } = useGetTeamMemberPresence(userProfile.id)

  const countryInformation = getCountryForTimezone(userProfile.timeZone)

  const timezoneLabel = (userProfile: UserProfile): string => {
    // Difference in minutes from UTC
    const localOffset = currentTime.getTimezoneOffset()

    // Slack returns difference in seconds from UTC
    const userOffset = userProfile.timeZoneOffset / 60

    // Calculate the hour difference between both offsets
    const hourDifference = (userOffset - localOffset) / 60

    if (hourDifference === 0) {
      return userProfile.timeZoneLabel
    }

    if (hourDifference > 0) {
      return `${userProfile.timeZoneLabel} (+${hourDifference}hrs)`
    } else {
      return `${userProfile.timeZoneLabel} (${hourDifference}hrs)`
    }
  }

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
          {timezoneLabel(userProfile)}
        </small>
        {countryInformation && (
          <img
            alt={countryInformation.name}
            className='team-member__country'
            src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${countryInformation.id}.svg`}
          />
        )}
        <a
          href={`slack://user?team=${userProfile.teamId}&id=${userProfile.id}`}
          className='team-member__chat-icon'
        >
          <img
            alt={`Send ${userProfile.realName} a message on Slack.`}
            src={ChatBubble}
          />
        </a>
      </div>
    </div>
  )
}

export default TeamMember
export type { UserProfile }

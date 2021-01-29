// @flow

import * as React from 'react'

// Utils
import { zones } from 'moment-timezone/data/meta/latest.json'

// Context
import Show24HourTimeContext from '../Show24HourTimeContext'
import CurrentTimeContext from '../CurrentTimeContext'

import type { TeamMember as TeamMemberType } from '../data/teamMembers'

type Props = {|
  timezone: $PropertyType<TeamMemberType, 'timezone'>,
  onlineStatus: $PropertyType<TeamMemberType, 'onlineStatus'>,
  profile: $PropertyType<TeamMemberType, 'profile'>
|}

const TeamMember = ({ timezone, onlineStatus, profile }: Props): React.Node => {
  const show24HourTime = React.useContext(Show24HourTimeContext)
  const currentTime = React.useContext(CurrentTimeContext)
  const [ userProfile, setUserProfile ] = React.useState({})
  const [isOnline, setIsOnline] = React.useState(false)

  const getCountryCode = (zone: $PropertyType<TeamMemberType, 'timezone'>): string => {
    return zones[zone] && zones[zone].countries[0]
  }

  onlineStatus.then(response => (
      response === 'active' ? setIsOnline(true) : setIsOnline(false)
    )
  )

  profile.then(response => (setUserProfile(response)))

  return (
    <div className='team-member'>
      <div className='team-member__avatar'>
        <div className={`team-member__avatar__day-night-indicator ${isOnline ? 'team-member__avatar__day-night-indicator--online' : 'team-member__avatar__day-night-indicator--offline'}`} />
        <img
          alt={userProfile.real_name}
          className='team-member__avatar__image'
          src={userProfile.image_512}
        />
      </div>
      <div className='team-member__information'>
        <h2 className='team-member__information__name'>
          { userProfile.real_name_normalized }
        </h2>
        <p className='team-member__information__current-time'>
          <React.Suspense fallback={<p>Loading...</p>}>
            {
              currentTime.tz(timezone).format(
                show24HourTime
                  ? 'HH:mm'
                  : 'hh:mm A'
              )
            }
          </React.Suspense>
        </p>
        <small className='team-member__information__timezone'>
          { timezone }
        </small>
        <img
          alt={getCountryCode(timezone)}
          className='team-member__country'
          src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${getCountryCode(timezone)}.svg`}
        />
      </div>
    </div>
  )
}

export default TeamMember


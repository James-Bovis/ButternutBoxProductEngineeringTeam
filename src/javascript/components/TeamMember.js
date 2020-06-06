// @flow

import * as React from 'react'

// Utils
import moment from 'moment-timezone'
import { genderToPronoun, capitaliseFirstLetter } from '../utils'

// Context
import Show24HourTimeContext from '../Show24HourTimeContext'

import type { TeamMember as TeamMemberType } from '../data/teamMembers'

type Props = {|
  name: $PropertyType<TeamMemberType, 'name'>,
  timezone: $PropertyType<TeamMemberType, 'timezone'>,
  gender: $PropertyType<TeamMemberType, 'gender'>,
  avatarUrl: $PropertyType<TeamMemberType, 'avatarUrl'>
|}

const TeamMember = ({ name, timezone, gender, avatarUrl }: Props): React.Node => {
  const show24HourTime = React.useContext(Show24HourTimeContext)

  const [ time, setTime ] = React.useState(moment().tz(timezone))

  React.useEffect((): void => {
    const tick = (): void => setTime(moment().tz(timezone))

    setInterval (
      tick, 1000
    )
  }, [time, timezone])

  const isOnline = (hour: number): string => {
    if (hour < 18 && hour >= 9 ) {
      return 'team-member__avatar__day-night-indicator--online'
    } else {
      return 'team-member__avatar__day-night-indicator--offline'
    }
  }

  return (
    <div className='team-member'>
      <div className='team-member__avatar'>
        <div className={`team-member__avatar__day-night-indicator ${isOnline(time.hour())}`} />
        <img
          alt=''
          className='team-member__avatar__image'
          src={avatarUrl}
        />
      </div>
      <h2 className='team-member__name'>
        { name }
      </h2>
      <div className='team-member__current-time'>
        { `${capitaliseFirstLetter(genderToPronoun(gender))} local time:` }
        <span>
          {
            show24HourTime
              ? time.format('HH:mm')
              : time.format('hh:mm A')
          }
        </span>
      </div>
    </div>
  )
}

export default TeamMember


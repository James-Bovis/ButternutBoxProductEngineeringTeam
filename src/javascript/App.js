// @flow

import * as React from 'react'
import moment from 'moment-timezone'

// Data
import TeamMembers from './data/teamMembers'

// Components
import TeamMember from './components/TeamMember.js'

// Styles
import './../assets/stylesheets/application.sass'

// Context
import { Show24HourTimeProvider } from './Show24HourTimeContext'

import type { TeamMember as TeamMemberType } from './data/teamMembers'

type Greeting =
  | 'Good morning'
  | 'Good evening'
  | 'Good afternoon'

const generateGreeting = (hour: number): Greeting => {
  if (hour < 12) {
    return (
      'Good morning'
    )
  }
  else if (hour >= 18) {
    return (
      'Good evening'
    )
  }
  else {
    return (
      'Good afternoon'
    )
  }
}

const App = () => {
  const [is24Hour, setIs24Hour] = React.useState(true)
  const estimatedTimezone = moment.tz.guess()

  const [ currentTime, setCurrentTime ] = React.useState(moment().tz(estimatedTimezone))

  React.useEffect((): void => {
    const tick = (): void => setCurrentTime(moment().tz(estimatedTimezone))

    setInterval (
      tick, 1000
    )
  }, [currentTime, estimatedTimezone])

  return (
    <div className='app'>
      <React.Suspense fallback={<p>App is waking up...</p>}>
        <header className='header'>
          <h1>
            { `${generateGreeting(currentTime.hour())}, it's currently ${currentTime.format(`dddd do MMMM - ${is24Hour ? 'HH:mm' : 'hh:mm A' }`)}`}
          </h1>
        </header>
        <div className='team-member-wrapper'>
          <Show24HourTimeProvider value={is24Hour}>
            {
              TeamMembers.map(({ name, timezone, gender, avatarUrl }: TeamMemberType): React.Element<typeof TeamMember> => (
                <TeamMember
                  name={name}
                  timezone={timezone}
                  gender={gender}
                  avatarUrl={avatarUrl}
                />
              ))
            }
          </Show24HourTimeProvider>
        </div>
        <div className='time-format-toggle'>
          <p>
            { `Settings:` }
          </p>
          <button className={`${is24Hour ? '' : 'inactive'}`} onClick={(): void => setIs24Hour(true)}>
            { `24 hour` }
          </button>
          <button className={`${is24Hour ? 'inactive' : ''}`} onClick={(): void => setIs24Hour(false)}>
            { `12 hour` }
          </button>
        </div>
      </React.Suspense>
    </div>
  )
}

export default App

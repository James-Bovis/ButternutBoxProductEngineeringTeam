// @flow

import * as React from 'react'
import moment from 'moment-timezone'

// Data
import TeamMembers from './data/teamMembers'

// Utils
import { useLocalStorage } from './utils'

// Components
import TeamMember from './components/TeamMember.js'

// Styles
import './../assets/stylesheets/application.sass'

// Context
import { Show24HourTimeProvider } from './Show24HourTimeContext'
import { CurrentTimeProvider } from './CurrentTimeContext'

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
  const [is24Hour, setIs24Hour] = useLocalStorage('is24Hour', true)
  const [teamInView, setTeamInView] = useLocalStorage('teamInView', 'ECT')

  const estimatedTimezone = moment.tz.guess()
  const [ currentTime, setCurrentTime ] = React.useState(moment().tz(estimatedTimezone))

  React.useEffect(() => {
    const tick = (): void => setCurrentTime(moment().tz(estimatedTimezone))

    const interval = setInterval (
      tick, 1000
    )

    return (): void => clearInterval(interval)
  }, [currentTime, estimatedTimezone])

  const filteredTeamMembers = TeamMembers.filter((teamMember: TeamMemberType): boolean | TeamMemberType => {
    if (teamInView !== 'All') {
      return teamMember.team === teamInView
    } else {
      return teamMember
    }
  })

  return (
    <div className='app'>
      <React.Suspense fallback={<p>App is waking up...</p>}>
        <header className='header'>
          <h1>
            { `${generateGreeting(currentTime.hour())}, it's currently ${currentTime.format(`dddd Do MMMM - ${is24Hour ? 'HH:mm' : 'hh:mm A' }`)}`}
          </h1>
        </header>
        <div className='team-member-wrapper'>
          <Show24HourTimeProvider value={is24Hour}>
            <CurrentTimeProvider value={currentTime}>
              {
                filteredTeamMembers.map(({ name, timezone, gender, avatarUrl, onlineStatus }: TeamMemberType): React.Element<typeof TeamMember> => (
                  <TeamMember
                    name={name}
                    timezone={timezone}
                    gender={gender}
                    avatarUrl={avatarUrl}
                    key={name}
                    onlineStatus={onlineStatus}
                  />
                ))
              }
            </CurrentTimeProvider>
          </Show24HourTimeProvider>
        </div>
        <div className='settings'>
          <div className='settings__item'>
            <p className='settings__item__name'>
              { `Time format: ` }
            </p>
            <button className={`${is24Hour ? '' : 'inactive'}`} onClick={(): void => setIs24Hour(true)}>
              { `24 hour` }
            </button>
            <button className={`${is24Hour ? 'inactive' : ''}`} onClick={(): void => setIs24Hour(false)}>
              { `12 hour` }
            </button>
          </div>

          <div className='settings__item'>
            <p className='settings__item__name'>
              { `Team filter: ` }
            </p>
            <button className={`${teamInView === 'ECT' ? '' : 'inactive'}`} onClick={(): void => setTeamInView('ECT')}>
              { `ECT` }
            </button>
            <button className={`${teamInView === 'NCT' ? '' : 'inactive'}`} onClick={(): void => setTeamInView('NCT')}>
              { `NCT` }
            </button>
            <button className={`${teamInView === 'Platform' ? '' : 'inactive'}`} onClick={(): void => setTeamInView('Platform')}>
              { `Platform` }
            </button>
            <button className={`${teamInView === 'All' ? '' : 'inactive'}`} onClick={(): void => setTeamInView('All')}>
              { `All` }
            </button>
          </div>
        </div>
      </React.Suspense>
    </div>
  )
}

export default App

// @flow

import * as React from 'react'
import { useRecoilState } from 'recoil'
import { format } from 'date-fns'

// Atoms
import { is24HourState, teamInViewState, currentTimeState } from './atoms'

// Data
import TeamMembers from './data/teamMembers'

// Components
import TeamMember from './components/TeamMember.js'

// Styles
import './../assets/stylesheets/application.sass'

import type { TeamMember as TeamMemberType } from './data/teamMembers'

type Greeting =
  | 'Good Morning,'
  | 'Good Evening,'
  | 'Good Afternoon,'

const generateGreeting = (hour: number): Greeting => {
  if (hour < 12) {
    return (
      'Good Morning,'
    )
  }
  else if (hour >= 18) {
    return (
      'Good Evening,'
    )
  }
  else {
    return (
      'Good Afternoon,'
    )
  }
}

const App = (): React.Element<'div'> => {
  const [is24Hour, setIs24Hour] = useRecoilState(is24HourState)
  const [teamInView, setTeamInView] = useRecoilState(teamInViewState)
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeState)

  React.useEffect(() => {
    const tick = (): void => setCurrentTime(new Date())

    const interval = setInterval (
      tick, 1000
    )

    return (): void => clearInterval(interval)
  }, [currentTime, setCurrentTime])

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
            { generateGreeting(currentTime.getHours()) }
          </h1>
          <h2>
            { `It's currently ${format(currentTime, `cccc, do MMMM - ${is24Hour ? 'HH:mm' : 'hh:mm a' }`)}` }
          </h2>
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
              <button className={`${teamInView === 'LTV' ? '' : 'inactive'}`} onClick={(): void => setTeamInView('LTV')}>
                { `LTV` }
              </button>
              <button className={`${teamInView === 'Growth' ? '' : 'inactive'}`} onClick={(): void => setTeamInView('Growth')}>
                { `Growth` }
              </button>
              <button className={`${teamInView === 'Platform' ? '' : 'inactive'}`} onClick={(): void => setTeamInView('Platform')}>
                { `Platform` }
              </button>
              <button className={`${teamInView === 'Data' ? '' : 'inactive'}`} onClick={(): void => setTeamInView('Data')}>
                { `Data` }
              </button>
              <button className={`${teamInView === 'All' ? '' : 'inactive'}`} onClick={(): void => setTeamInView('All')}>
                { `All` }
              </button>
            </div>
          </div>
        </header>
        <p className='team-member-count'>
          { `Members: ${filteredTeamMembers.length}` }
        </p>
        <div className='team-member-wrapper'>
          {
            filteredTeamMembers.map(({ userID }: TeamMemberType): React.Element<typeof TeamMember> => (
              <TeamMember
                key={userID}
                userID={userID}
              />
            ))
          }
        </div>
      </React.Suspense>
    </div>
  )
}

export default App

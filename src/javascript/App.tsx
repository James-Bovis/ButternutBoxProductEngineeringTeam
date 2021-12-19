import * as React from 'react'
import { useRecoilValue } from 'recoil'
import { format } from 'date-fns'

// Atoms
import { is24HourState } from './atoms'

// Hooks
import useGetTeamMembers from './hooks/useGetTeamMembers'
import useCurrentTime from './hooks/useCurrentTime'

// Components
import Skeleton from 'react-loading-skeleton'
import TeamMember from './components/TeamMember'
import NavigationBar from './components/NavigationBar'
import SettingsPanel from './components/SettingsPanel'

// Styles
import './../assets/stylesheets/application.sass'

// Types
import type { UserProfile } from './components/TeamMember'

type Greeting = 'Good Morning,' | 'Good Evening,' | 'Good Afternoon,'

const generateGreeting = (hour: number): Greeting => {
  if (hour < 12) {
    return 'Good Morning,'
  } else if (hour >= 18) {
    return 'Good Evening,'
  } else {
    return 'Good Afternoon,'
  }
}

const App = (): React.ReactElement<'div'> => {
  const { teamMembers } = useGetTeamMembers()
  const { currentTime } = useCurrentTime()

  const is24Hour = useRecoilValue(is24HourState)

  return (
    <div className='app'>
      <React.Suspense fallback={<p>App is waking up...</p>}>
        <NavigationBar />
        <header className='header'>
          <h1>{generateGreeting(currentTime.getHours())}</h1>
          <h2>
            {`It's currently ${format(
              currentTime,
              `cccc, do MMMM - ${is24Hour ? 'HH:mm' : 'hh:mm a'}`
            )}`}
          </h2>
        </header>
        <p className='team-member-count'>{`Members: ${teamMembers.length}`}</p>
        <div className='team-member-wrapper'>
          {teamMembers.length > 0
            ? teamMembers.map((userProfile: UserProfile) => (
                <TeamMember key={userProfile.id} userProfile={userProfile} />
              ))
            : Array.from(Array(12), (_, index) => (
                <div className='team-member' key={index}>
                  <Skeleton circle={true} height={100} width={100} />
                  <div className='team-member__information'>
                    <Skeleton height={20} width={200} />
                    <Skeleton height={30} width={200} />
                    <Skeleton height={15} width={200} />
                    <Skeleton
                      className='team-member__country'
                      height={20}
                      width={20}
                      circle={true}
                    />
                  </div>
                </div>
              ))}
        </div>
        <SettingsPanel />
      </React.Suspense>
    </div>
  )
}

export default App

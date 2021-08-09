import * as React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { format } from 'date-fns'
import { uniqBy } from 'lodash'

// Atoms
import {
  is24HourState,
  currentTimeState,
  teamMembersState,
  channelIDState
} from './atoms'

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
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeState)
  const [teamMembers, setTeamMembers] = useRecoilState(teamMembersState)
  const channelID = useRecoilValue(channelIDState)
  const is24Hour = useRecoilValue(is24HourState)

  React.useEffect(() => {
    const tick = (): void => setCurrentTime(new Date())

    const interval = setInterval(tick, 1000)

    return (): void => clearInterval(interval)
  }, [currentTime, setCurrentTime])

  React.useEffect((): void => {
    const conversationMembersEndpoint = `/.netlify/functions/fetchConversationMembers?channel=${channelID}`

    // Fetch all the Slack User ID's from the #predong-banter channel
    fetch(conversationMembersEndpoint)
      .then((response) => response.json())
      .then((memberIDS) => {
        memberIDS.map((userID: string) => {
          const userProfileEndpoint = `/.netlify/functions/fetchUserProfile?userID=${userID}`
          setTeamMembers([])

          // For each member ID, get their Slack user profile
          return fetch(userProfileEndpoint)
            .then((response) => response.json())
            .then((data) => {
              setTeamMembers((oldArray) => [...oldArray, data])
            })
        })
      })
  }, [setTeamMembers, channelID])

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
          {teamMembers.length > 0 ? (
            uniqBy(teamMembers, 'id')
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((userProfile: UserProfile) => (
                <TeamMember key={userProfile.id} userProfile={userProfile} />
              ))
          ) : (
            <div className='team-member'>
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
          )}
        </div>
        <SettingsPanel />
      </React.Suspense>
    </div>
  )
}

export default App

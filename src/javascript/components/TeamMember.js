// @flow

import * as React from 'react'

// Utils
import { zones } from 'moment-timezone/data/meta/latest.json'
import Skeleton from 'react-loading-skeleton'

// Context
import Show24HourTimeContext from '../Show24HourTimeContext'
import CurrentTimeContext from '../CurrentTimeContext'

import type { TeamMember as TeamMemberType } from '../data/teamMembers'

type UserProfile = {|
  id: string,
  team_id: string,
  name: string,
  deleted: boolean,
  color: string,
  real_name: string,
  tz: string,
  tz_label: string,
  tz_offset: number,
  profile: {
    title: string,
    phone: string,
    skype: string,
    real_name: string,
    real_name_normalized: string,
    display_name: string,
    display_name_normalized: string,
    fields: null,
    status_text: string,
    status_emoji: string,
    status_expiration: number,
    avatar_hash: string,
    image_original: string,
    is_custom_image: boolean,
    first_name: string,
    last_name: string,
    image_24: string,
    image_32: string,
    image_48: string,
    image_72: string,
    image_192: string,
    image_512: string,
    image_1024: string,
    status_text_canonical: string,
    team: string
  },
  is_admin: boolean,
  is_owner: boolean,
  is_primary_owner: boolean,
  is_restricted: boolean,
  is_ultra_restricted: boolean,
  is_bot: boolean,
  is_app_user: boolean,
  updated: number
|}

type Props = {|
  userID: $PropertyType<TeamMemberType, 'userID'>
|}

const initialState = {
  id: '',
  team_id: '',
  name: '',
  deleted: false,
  color: '',
  real_name: '',
  tz: '',
  tz_label: '',
  tz_offset: 0,
  profile: {
    title: '',
    phone: '',
    skype: '',
    real_name: '',
    real_name_normalized: '',
    display_name: '',
    display_name_normalized: '',
    fields: null,
    status_text: '',
    status_emoji: '',
    status_expiration: 0,
    avatar_hash: '',
    image_original: '',
    is_custom_image: false,
    first_name: '',
    last_name: '',
    image_24: '',
    image_32: '',
    image_48: '',
    image_72: '',
    image_192: '',
    image_512: '',
    image_1024: '',
    status_text_canonical: '',
    team: ''
  },
  is_admin: false,
  is_owner: false,
  is_primary_owner: false,
  is_restricted: false,
  is_ultra_restricted: false,
  is_bot: false,
  is_app_user: false,
  updated: 0
}

const TeamMember = ({ userID }: Props): React.Node => {
  const [ userProfile, setUserProfile ] = React.useState<UserProfile>(initialState)
  const [isOnline, setIsOnline] = React.useState(false)
  const [hasLoaded, setHasLoaded] = React.useState(false)

  const show24HourTime = React.useContext(Show24HourTimeContext)
  const currentTime = React.useContext(CurrentTimeContext)

  const getCountryCode = (zone: string): string => {
    return zones[zone] && zones[zone].countries[0]
  }

  // Fetch the Team Members Slack profile
  React.useEffect((): void => {
    const userProfileEndpoint = `/.netlify/functions/fetchUserProfile?userID=${userID}`
    const userPresenceEndpoint = `/.netlify/functions/slackOnlineStatus?userID=${userID}`

    Promise.all([
      fetch(userProfileEndpoint)
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data)
      }),

      fetch(userPresenceEndpoint)
      .then((response) => response.text())
      .then((data) => {
        setIsOnline(data === 'active')
      })
    ]).then(() => {
      setHasLoaded(true)
    })
  }, [userID])

  return (
    hasLoaded
      ? (
        <div className='team-member'>
          <div className='team-member__avatar'>
            <div className={`team-member__avatar__day-night-indicator ${isOnline ? 'team-member__avatar__day-night-indicator--online' : 'team-member__avatar__day-night-indicator--offline'}`} />
            <img
              alt={userProfile.real_name}
              className='team-member__avatar__image'
              src={userProfile.profile.image_192}
            />
          </div>
          <div className='team-member__information'>
            <h2 className='team-member__information__name'>
              { userProfile.real_name }
            </h2>
            <p className='team-member__information__current-time'>
              <React.Suspense fallback={<p>Loading...</p>}>
                {
                  currentTime.tz(userProfile.tz).format(
                    show24HourTime
                      ? 'HH:mm'
                      : 'hh:mm A'
                  )
                }
              </React.Suspense>
            </p>
            <small className='team-member__information__timezone'>
              { userProfile.tz }
            </small>
            <img
              alt={getCountryCode(userProfile.tz)}
              className='team-member__country'
              src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${getCountryCode(userProfile.tz)}.svg`}
            />
          </div>
        </div>
      ) : (
        <div className='team-member'>
          <Skeleton circle={true} height={100} width={100} />
          <div className='team-member__information'>
            <Skeleton
              height={20}
              width={200}
            />
            <Skeleton
              height={30}
              width={200}
            />
            <Skeleton
              height={15}
              width={200}
            />
            <Skeleton
              className='team-member__country'
              height={20}
              width={20}
              circle={true}
            />
          </div>
        </div>
      )
  )
}

export default TeamMember


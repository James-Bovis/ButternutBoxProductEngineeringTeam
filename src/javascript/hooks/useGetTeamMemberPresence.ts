import * as React from 'react'

// Utils
import { useSetRecoilState } from 'recoil'

// Atoms
import { onlineTeamMemberIds } from '../atoms'

// Types
import type { UserProfile } from '../components/TeamMember'

type UseGetTeamMemberPresence = {
  isOnline: boolean
}

const useGetTeamMemberPresence = (
  id: UserProfile['id']
): UseGetTeamMemberPresence => {
  const [isOnline, setIsOnline] = React.useState(false)
  const setOnlineTeamMemberIds = useSetRecoilState(onlineTeamMemberIds)

  // Fetch the Team Members Slack profile and presence status
  React.useEffect((): void => {
    const userPresenceEndpoint = `/.netlify/functions/slackOnlineStatus?userID=${id}`

    fetch(userPresenceEndpoint)
      .then((response) => response.text())
      .then((data) => {
        if (data === 'active') {
          setIsOnline(true)
          setOnlineTeamMemberIds((oldArray) => [...oldArray, id])
        } else {
          setIsOnline(false)
        }
      })
  }, [id, setOnlineTeamMemberIds])

  return {
    isOnline
  }
}

export default useGetTeamMemberPresence

import * as React from 'react'

// Utils
import { useRecoilState, useRecoilValue } from 'recoil'
import { uniqBy } from 'lodash'

// Atoms
import { teamMembersState, channelIDState } from '../atoms'

// Types
import type { UserProfile } from '../components/TeamMember'

type UseTeamMembers = {
  teamMembers: Array<UserProfile>
  setTeamMembers: (userProfiles: Array<UserProfile>) => void
}

const useGetTeamMembers = (): UseTeamMembers => {
  const [teamMembers, setTeamMembers] = useRecoilState(teamMembersState)
  const channelID = useRecoilValue(channelIDState)

  React.useEffect((): void => {
    const conversationMembersEndpoint = `/.netlify/functions/fetchConversationMembers?channel=${channelID}`
    const hiddenUserIds = ['UTQLW7602']

    // Fetch all the Slack User ID's from the #predong-banter channel
    fetch(conversationMembersEndpoint)
      .then((response) => response.json())
      .then((memberIDS) => {
        memberIDS
          .filter((userId: string) => !hiddenUserIds.includes(userId))
          .map((userID: string) => {
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

  // Ensure there are no duplicate team members and sort the team members
  // alphabetically
  const sortedTeamMembers = uniqBy(teamMembers, 'id').sort((a, b) =>
    a.realName.localeCompare(b.realName)
  )

  return {
    teamMembers: sortedTeamMembers,
    setTeamMembers
  }
}

export default useGetTeamMembers

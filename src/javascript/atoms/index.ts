import { atom } from 'recoil'

import type { UserProfile } from '../components/TeamMember'

const localStorageEffect =
  (key: string) =>
  ({
    setSelf,
    onSet
  }: {
    setSelf: (any: any) => void
    onSet: (any: any) => void
  }) => {
    const savedValue = localStorage.getItem(key)

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }

    onSet((newValue: any) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    })
  }

const teamMembersState = atom({
  key: 'teamMembersState',
  default: [] as Array<UserProfile>,
  dangerouslyAllowMutability: true
})

const onlineTeamMemberIds = atom({
  key: 'onlineTeamMemberIds',
  default: [] as Array<String>,
  dangerouslyAllowMutability: true
})

const is24HourState = atom({
  key: 'is24HourState',
  default: true,
  effects_UNSTABLE: [localStorageEffect('is24Hour')]
})

const currentTimeState = atom({
  key: 'currentTimeState',
  default: new Date()
})

const channelIDState = atom({
  key: 'channelIDState',
  default: 'C0108RB544V'
})

export {
  is24HourState,
  currentTimeState,
  teamMembersState,
  channelIDState,
  onlineTeamMemberIds
}

// @flow

type Gender =
  | 'male'
  | 'female'

type TeamMember = {
  name: string,
  timezone: string,
  gender: Gender,
  avatarUrl: string
}

const TeamMembers: Array<TeamMember> = [
  {
    name: 'James',
    timezone: 'Europe/London',
    gender: 'male',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-UC7HELUHK-496bfc0bd71e-512'
  },
  {
    name: 'Ryan',
    timezone: 'America/Toronto',
    gender: 'male',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-UCL31R6KU-03571b8c9038-512'
  },
  {
    name: 'Tomas',
    timezone: 'Europe/Dublin',
    gender: 'male',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-U6278RRE3-8bace14f04b9-512'
  },
  {
    name: 'Ursula',
    timezone: 'Europe/Tallinn',
    gender: 'female',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-UCXR81C49-4a5b9245e263-512'
  },
  {
    name: 'Dan',
    timezone: 'Europe/Kiev',
    gender: 'male',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-U011DRA8KGW-g70d54f080ff-512'
  },
  {
    name: 'Lynsey',
    timezone: 'Europe/London',
    gender: 'female',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-UB1U1EGB0-93a5bdc616ab-512'
  },
  {
    name: 'Iva',
    timezone: 'Europe/London',
    gender: 'female',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-ULNRA693L-6209b1706303-512'
  }
]

export default TeamMembers
export type { TeamMember }

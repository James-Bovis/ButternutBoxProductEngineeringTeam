// @flow

type Team =
  | 'ECT'
  | 'NCT'
  | 'Platform'
  | 'All'

type Gender =
  | 'male'
  | 'female'

type TeamMember = {
  name: string,
  timezone: string,
  gender: Gender,
  avatarUrl: string,
  team: Team
}

const TeamMembers: Array<TeamMember> = [
  {
    name: 'James',
    timezone: 'Europe/London',
    gender: 'male',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-UC7HELUHK-496bfc0bd71e-512',
    team: 'ECT'
  },
  {
    name: 'Ryan',
    timezone: 'America/Toronto',
    gender: 'male',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-UCL31R6KU-03571b8c9038-512',
    team: 'ECT'
  },
  {
    name: 'Tomas',
    timezone: 'Europe/London',
    gender: 'male',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-U6278RRE3-8bace14f04b9-512',
    team: 'ECT'
  },
  {
    name: 'Ursula',
    timezone: 'Europe/Tallinn',
    gender: 'female',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-UCXR81C49-4a5b9245e263-512',
    team: 'ECT'
  },
  {
    name: 'Dan M',
    timezone: 'Europe/Kiev',
    gender: 'male',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-U011DRA8KGW-g70d54f080ff-512',
    team: 'ECT'
  },
  {
    name: 'Lynsey',
    timezone: 'Europe/London',
    gender: 'female',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-UB1U1EGB0-93a5bdc616ab-512',
    team: 'ECT'
  },
  {
    name: 'Iva',
    timezone: 'Europe/London',
    gender: 'female',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-ULNRA693L-6209b1706303-512',
    team: 'ECT'
  },
  {
    name: 'Brett',
    timezone: 'Europe/London',
    gender: 'male',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-UAXH5FK7V-7f7a3aa35535-512',
    team: 'NCT'
  },
  {
    name: 'Carolina',
    timezone: 'Europe/London',
    gender: 'female',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-UDE7Z0ME2-ae2029c08327-512',
    team: 'NCT'
  },
  {
    name: 'Despi',
    timezone: 'Europe/London',
    gender: 'female',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-USCG9TATY-g265149b88f2-512',
    team: 'NCT'
  },
  {
    name: 'Dan F',
    timezone: 'Asia/Jerusalem',
    gender: 'male',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-UL5P8KPJA-08be4e5e1b3b-512',
    team: 'NCT'
  },
  {
    name: 'Bernadette',
    timezone: 'Europe/London',
    gender: 'female',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-UCZAK8EBW-1faaaf3d65cf-512',
    team: 'NCT'
  },
  {
    name: 'Hannah',
    timezone: 'Europe/London',
    gender: 'female',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-U74D7GZ7E-8a5abb485474-512',
    team: 'NCT'
  },
  {
    name: 'Adrian',
    timezone: 'Europe/London',
    gender: 'male',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-US9S54K4L-g3c65da64eb4-512',
    team: 'Platform'
  },
  {
    name: 'James E',
    timezone: 'Europe/London',
    gender: 'male',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-U01441V313L-g4ffa7040829-512',
    team: 'Platform'
  },
  {
    name: 'Niall',
    timezone: 'Europe/London',
    gender: 'male',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-U5UFFTF52-f5fa75b2a988-512',
    team: 'All'
  },
  {
    name: 'Alex',
    timezone: 'Europe/London',
    gender: 'male',
    avatarUrl: 'https://ca.slack-edge.com/T0P6BBP1N-U92882KNH-d833d845d1cc-512',
    team: 'All'
  }
]

export default TeamMembers
export type {
  TeamMember,
  Team
}

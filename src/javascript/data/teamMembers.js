// @flow

type Team =
  | 'LTV'
  | 'Growth'
  | 'Platform'
  | 'Data'
  | 'All'

type TeamMember = {|
  team: Team,
  userID: string
|}

const TeamMembers: Array<TeamMember> = [
  {
    team: 'LTV',
    userID: 'UC7HELUHK'
  },
  {
    team: 'Platform',
    userID: 'UCL31R6KU'
  },
  {
    team: 'LTV',
    userID: 'U6278RRE3'
  },
  {
    team: 'LTV',
    userID: 'UCXR81C49'
  },
  {
    team: 'LTV',
    userID: 'U011DRA8KGW'
  },
  {
    team: 'LTV',
    userID: 'UB1U1EGB0'
  },
  {
    team: 'LTV',
    userID: 'ULNRA693L'
  },
  {
    team: 'Growth',
    userID: 'UAXH5FK7V'
  },
  {
    team: 'Growth',
    userID: 'UDE7Z0ME2'
  },
  {
    team: 'Growth',
    userID: 'USCG9TATY'
  },
  {
    team: 'Growth',
    userID: 'UCZAK8EBW'
  },
  {
    team: 'Growth',
    userID: 'U74D7GZ7E'
  },
  {
    team: 'Platform',
    userID: 'US9S54K4L'
  },
  {
    team: 'Platform',
    userID: 'U01441V313L'
  },
  {
    team: 'All',
    userID: 'U5UFFTF52'
  },
  {
    team: 'All',
    userID: 'U92882KNH'
  },
  {
    team: 'Platform',
    userID: 'U01AHMBT20L'
  },
  {
    team: 'LTV',
    userID: 'U01BDH5DLRY'
  },
  {
    team: 'Data',
    userID: 'U01BDH5HB26'
  }
]

export default TeamMembers

export type {
  TeamMember,
  Team,
}

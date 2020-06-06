import type { Gender } from './components/TeamMember'

const genderToPronoun = (gender: Gender): string => {
  switch (gender) {
    case 'male': {
      return 'his'
    }
    case 'female': {
      return 'her'
    }
    default: {
      throw new Error(`Cannot create genderToPronoun for gender: ${gender}`)
    }
  }
}

const capitaliseFirstLetter = (word: string): string => {
  if (word.length === 0) { throw new Error('Invalid string to capitaliseFirstLetter - empty') }
  return `${word[0].toUpperCase()}${word.slice(1)}`
}

export {
  genderToPronoun,
  capitaliseFirstLetter
}

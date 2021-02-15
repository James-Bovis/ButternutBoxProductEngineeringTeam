import { atom } from 'recoil'

const localStorageEffect = key => ({setSelf, onSet}) => {
  const savedValue = localStorage.getItem(key)

  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet(newValue => {
    localStorage.setItem(key, JSON.stringify(newValue));
  })
}

const teamInViewState = atom({
  key: 'teamInViewState',
  default: 'All',
  effects_UNSTABLE: [
    localStorageEffect('teamInView'),
  ]
})

const is24HourState = atom({
  key: 'is24HourState',
  default: true,
  effects_UNSTABLE: [
    localStorageEffect('is24Hour'),
  ]
})

const currentTimeState = atom({
  key: 'currentTimeState',
  default: new Date()
})

export {
  teamInViewState,
  is24HourState,
  currentTimeState
}

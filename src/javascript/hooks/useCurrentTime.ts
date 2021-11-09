import * as React from 'react'

// Utils
import { useRecoilState } from 'recoil'

// Atoms
import { currentTimeState } from '../atoms'

// Types
type UseCurrentTime = {
  currentTime: Date
}

const useCurrentTime = (): UseCurrentTime => {
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeState)

  React.useEffect(() => {
    const tick = (): void => setCurrentTime(new Date())

    const interval = setInterval(tick, 1000)

    return (): void => clearInterval(interval)
  }, [currentTime, setCurrentTime])

  return {
    currentTime
  }
}

export default useCurrentTime

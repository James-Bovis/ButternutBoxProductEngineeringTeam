import * as React from 'react'

const CurrentTimeContext = React.createContext()

export const CurrentTimeProvider = CurrentTimeContext.Provider
export const CurrentTimeConsumer = CurrentTimeContext.Consumer

export default CurrentTimeContext

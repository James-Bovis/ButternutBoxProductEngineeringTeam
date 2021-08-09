import * as React from 'react'

// Recoil
import { useRecoilState } from 'recoil'

// Atoms
import { settingsPanelOpenState } from '../atoms'

const NavigationBar = (): React.ReactElement => {
  const [settingsPanelOpen, setSettingsPanelOpen] = useRecoilState(
    settingsPanelOpenState
  )

  const toggleSettingsPanel = React.useCallback(
    (): void => setSettingsPanelOpen(!settingsPanelOpen),
    [setSettingsPanelOpen, settingsPanelOpen]
  )

  return (
    <nav className='navigation-bar'>
      <div className='navigation-bar__item'>
        <button onClick={toggleSettingsPanel}>{`Settings`}</button>
      </div>
    </nav>
  )
}

export default NavigationBar

import * as React from 'react'

// Recoil
import { useRecoilState } from 'recoil'

// Atoms
import { settingsPanelOpenState, channelIDState, is24HourState } from '../atoms'

const isValidChannelID = (channelID: string): boolean => channelID.length >= 9

const SettingsPanel = (): React.ReactElement => {
  const [settingsPanelOpen, setSettingsPanelOpen] = useRecoilState(
    settingsPanelOpenState
  )

  // Time Format
  const [is24Hour, setIs24Hour] = useRecoilState(is24HourState)

  // Channel ID
  const [channelID, setChannelID] = useRecoilState(channelIDState)
  const [tempoaryChannelId, setTempoaryChannelId] = React.useState(channelID)

  const closeSettingsPanel = React.useCallback((): void => {
    setSettingsPanelOpen(!settingsPanelOpen)
    setTempoaryChannelId(channelID)
  }, [setSettingsPanelOpen, settingsPanelOpen, channelID])

  const saveChannelId = React.useCallback((): void => {
    closeSettingsPanel()
    setChannelID(tempoaryChannelId)
  }, [setChannelID, closeSettingsPanel, tempoaryChannelId])

  // Lock scrolling when the Settings panel is open
  React.useEffect((): void => {
    const body = document.getElementsByTagName('body')
    body[0].style.overflow = settingsPanelOpen ? 'hidden' : 'inherit'
  }, [settingsPanelOpen])

  return (
    <div
      className={`settings-panel-wrapper ${
        settingsPanelOpen ? 'settings-panel-wrapper--open' : ''
      }`}
    >
      <div
        className={`settings-panel ${
          settingsPanelOpen ? 'settings-panel--open' : ''
        }`}
      >
        <button
          className='settings-panel__close-button'
          onClick={closeSettingsPanel}
        />
        <h3 className='settings-panel__title'>{`Settings`}</h3>

        <div className='setting'>
          <h4 className='setting__title'>{`Time Format`}</h4>
          <button
            className={is24Hour ? 'selected' : 'deselected'}
            onClick={(): void => setIs24Hour(true)}
          >{`24hr`}</button>
          <button
            className={!is24Hour ? 'selected' : 'deselected'}
            onClick={(): void => setIs24Hour(false)}
          >{`12hr`}</button>
        </div>

        <div className='setting'>
          <h4 className='setting__title'>{`Slack Channel ID`}</h4>
          <div className='setting__input-row'>
            <input
              type='text'
              value={tempoaryChannelId}
              onChange={(e): void =>
                setTempoaryChannelId(e.currentTarget.value)
              }
            />
            <button
              disabled={
                tempoaryChannelId === channelID ||
                !isValidChannelID(tempoaryChannelId)
              }
              onClick={saveChannelId}
            >{`Save ID`}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel

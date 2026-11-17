import './styles/App.css'
import AvatarPreview from './components/AvatarPreview'
import OptionsPicker from './components/OptionsPicker'
import ColorPicker from './components/UI/ColorPicker'
import TextInput from './components/UI/TextInput'
import { useCallback, useEffect, useState, type ChangeEvent } from 'react'
import { useAvatarList } from './Hooks'
import { AvatarContext, AvatarURLContext, AvatarListContext } from './context'
import { buildURL, defaultRobot } from './Services'
import RobotListItem from './components/RobotListItem'
import SaveButton from './components/UI/SaveButton'


function App() {

  const [avatarOptions, setAvatarOptions] = useState(defaultRobot)
  const { avatarList, saveAvatar, deleteAvatar } = useAvatarList()
  // feat: mobile offcanvas state for the saved avatars column
  const [listOpen, setListOpen] = useState(false)

  // feat: Escape closes the offcanvas
  useEffect(() => {
    if (!listOpen) return
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setListOpen(false) }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [listOpen])
  
  // feat: added memoization
  const updateName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // fix: ensure avatarOptions is not null before updating name
    const name = e.target.value
    setAvatarOptions((prev) => prev && {...prev, name})
  }, [])
  
  // feat: added memoization
  const handleSave = useCallback((url:string, name: string) => {
    saveAvatar({URL: url, name: name})
    setAvatarOptions(defaultRobot)
    // feat: on mobile, open the saved avatars drawer after saving so the new entry is visible
    if (window.matchMedia('(max-width: 768px)').matches) setListOpen(true)
  }, [saveAvatar])
  
  // feat: check if avatar name is valid (non-empty after trimming)
  const avatarNameOk = avatarOptions?.name && avatarOptions.name.trim() !== "";

  return (
    <div className="app_container">
      <AvatarContext.Provider value = {{avatarOptions, setAvatarOptions}}>
        <AvatarURLContext.Provider value = {buildURL(avatarOptions)}>
          <AvatarListContext.Provider value = {{avatarList, saveAvatar, deleteAvatar}}>

            {/* feat: a11y main landmark, hidden page heading and a polite live list for saves/deletes */}
            <main className="main">
              <h1 className="visually_hidden">Robot avatar creator</h1>
              {/* feat: hamburger opens the saved avatars offcanvas (shown only at the mobile breakpoint) */}
              <button
                type="button"
                className="list_toggle"
                aria-label="Open saved avatars"
                title="Saved avatars"
                aria-expanded={listOpen}
                aria-controls="avatar-list"
                onClick={() => setListOpen(true)}
              >
                <span aria-hidden="true" className="hamburger" />
              </button>
              {/* feat: backdrop closes the offcanvas when tapped */}
              {listOpen && <div className="list_backdrop" aria-hidden="true" onClick={() => setListOpen(false)} />}
              <div className="avatar_creator">
                <SaveButton
                  disabled={!avatarNameOk} 
                  handleOnClick={() => {
                    // fix: prevent saving if name is empty
                    if (!avatarNameOk) return;
                    handleSave(buildURL(avatarOptions), avatarOptions.name.trim())
                  }}
                >+</SaveButton>

                <AvatarPreview
                />
                <div className="row">
                  <TextInput 
                    label=""
                    value={avatarOptions?.name || "" }
                    name="avatar_name"
                    placeholder="Name Me!" 
                    handleOnChange={updateName}
                  />
                </div>
                <div className="row">
                  <ColorPicker
                    label="Color"
                    defaultColor={`#${avatarOptions?.baseColor}`}
                    optionKey="baseColor"
                  />
                  <ColorPicker
                    label="Background"
                    defaultColor={`#${avatarOptions?.backgroundColor}`}
                    optionKey="backgroundColor"
                  />
                </div>
                <OptionsPicker/>
              </div>
              <div className={`avatar_list${listOpen ? " open" : ""}`} id="avatar-list">
                {/* feat: offcanvas header with a close button (hidden on desktop) */}
                <div className="avatar_list_header">
                  <span>Saved avatars</span>
                  <button
                    type="button"
                    className="list_close"
                    aria-label="Close saved avatars"
                    title="Close"
                    onClick={() => setListOpen(false)}
                  ><span aria-hidden="true">✕</span></button>
                </div>
                <ul aria-label="Saved avatars" aria-live="polite" aria-relevant="additions removals">
                  {/* feat: show message if no avatars are saved */}
                  { (!avatarList || avatarList.length === 0) && (
                    <li className="no_avatars">No avatars saved</li>
                  )}
                  { avatarList && avatarList.length > 0 && avatarList.map((avatar, index) => {
                      return (
                        <RobotListItem
                          key={index}
                          index={index}
                          name={avatar.name}
                          url={avatar.URL}
                          onEdit={() => setListOpen(false)}
                        />
                      )
                    })
                  }
                </ul>
              </div>
            </main>
          </AvatarListContext.Provider>  
        </AvatarURLContext.Provider>
      </AvatarContext.Provider>
    </div>
  )
}

export default App

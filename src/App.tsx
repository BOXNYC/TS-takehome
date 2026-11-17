import './styles/App.css'
import AvatarPreview from './components/AvatarPreview'
import OptionsPicker from './components/OptionsPicker'
import ColorPicker from './components/UI/ColorPicker'
import TextInput from './components/UI/TextInput'
import { useCallback, useState, type ChangeEvent } from 'react'
import { useAvatarList } from './Hooks'
import { AvatarContext, AvatarURLContext, AvatarListContext } from './context'
import { buildURL, defaultRobot } from './Services'
import RobotListItem from './components/RobotListItem'
import SaveButton from './components/UI/SaveButton'


function App() {

  const [avatarOptions, setAvatarOptions] = useState(defaultRobot)
  const { avatarList, saveAvatar, deleteAvatar } = useAvatarList()
  
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
              <div className="avatar_list">
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

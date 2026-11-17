import '../styles/optionsPicker.css'
// fix: import casing matches TabBar.tsx
import TabBar from './UI/TabBar'
// feat: AvatarOption tile shows a loading spinner until its image loads
import AvatarOption from './AvatarOption'
import { CustomizationOptions, OptionKey, TabData } from '../Types'
import { customizationOptions } from '../Services'
import { useState } from 'react'
import { buildURL } from '../Services'
import { useContext } from 'react'
import { AvatarContext } from '../context'



const OptionsPicker = () => {
  
  const {avatarOptions, setAvatarOptions} = useContext(AvatarContext)
  const [activeTab, setActiveTab] = useState(customizationOptions[0].option)
  const [displayOptions, setDisplayOptions] = useState(customizationOptions[0].values)
  const tabData:TabData[] = customizationOptions.map( (tab) => 
    ({label: tab.label, option: tab.option })
  )

  const handleOnClick = (option: OptionKey) => {
    setActiveTab(option)
    const optionValues = getDisplayOptions(customizationOptions, option)
    setDisplayOptions(optionValues)
  }

  const getDisplayOptions = (customizationOptions:CustomizationOptions[], option:string) => {
    for(let i = 0; i <=  customizationOptions.length; i++) {
      if (customizationOptions[i].option === option) {
        return (
          customizationOptions[i].values
        )
      }
    }
    return customizationOptions[0].values
  }

  // fix: typed option key and functional state update
  const updateAvatar = (optKey: OptionKey, value: string) => {
    setAvatarOptions((prev) => prev && {...prev, [optKey]: value})
  }

  return (
    <div className="options_picker_container">
      <TabBar
        tabData = {tabData}
        handleOnClick = {handleOnClick}
      />
      {/* feat: a11y tabpanel controlled by the tab bar */}
      <div className="options_examples" id="options-panel" role="tabpanel" aria-label="Options">
          {displayOptions.map((opt, i) => {
            return (
              <AvatarOption
                key={ `{opt_${i}}`}
                src={buildURL(avatarOptions, {name: activeTab, value: opt})}
                onClick={() => {updateAvatar(activeTab, opt)}}
                isActive={avatarOptions?.[activeTab] === opt}
                label={`${activeTab}: ${opt}`}
              />
            )
          })
          }
      </div>
    </div>  
  )
}

export default OptionsPicker
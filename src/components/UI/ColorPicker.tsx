import { useState } from 'react'
import { useContext } from 'react'
import { AvatarContext } from '../../context'
import type { OptionKey } from '../../Types'
import { COLOR_PALETTE } from '../../Services'
import '../../styles/UI/colorPicker.css'

interface Props {
  label: string;
  defaultColor: string; 
  optionKey: OptionKey;
}

const ColorPicker = (props: Props) => {
  const {label, defaultColor, optionKey} = props; 
  const {setAvatarOptions} = useContext(AvatarContext)
  const [showPicker, setShowPicker] = useState(false)
  const palette = COLOR_PALETTE
  
  // fix: typed option key and functional state update
  const handleOnClick = (optionKey: OptionKey, color: string) => {
    setAvatarOptions((prev) => prev && {...prev, [optionKey]: color})
  }
  
  return (
    <>
      <div className="color_picker_container">
        <div 
          className="current_selection" 
          style={{ backgroundColor: defaultColor }}
          onClick={() => setShowPicker(true)}
          ></div>
        { showPicker &&
          <div 
            className="color_palette"
            onMouseLeave={() => setShowPicker(false)}
          >
            { 
              palette.map((color:string, i: number) => {
                return (
                  <div 
                    key={`color_${i}`} style={{backgroundColor: `#${color}`}}
                    onClick = {() => {handleOnClick(optionKey, color)}}
                    >
                  </div>
                )
              })
            }
          </div>
        }
        <div className="color_picker_label">{label}</div>
      </div>
    
    </>
  ) 
}

export default ColorPicker
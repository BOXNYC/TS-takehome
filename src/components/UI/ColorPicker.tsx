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
        {/* feat: a11y swatch is a button that exposes the popup state; Escape closes the palette */}
        <button
          type="button"
          className="current_selection" 
          style={{ backgroundColor: defaultColor }}
          aria-label={`${label} color, currently ${defaultColor}`}
          title={`${label} color`}
          aria-haspopup="true"
          aria-expanded={showPicker}
          onClick={() => setShowPicker((open) => !open)}
          onKeyDown={(e) => { if (e.key === 'Escape') setShowPicker(false) }}
          ></button>
        { showPicker &&
          <div 
            className="color_palette"
            role="group"
            aria-label={`${label} color palette`}
            onMouseLeave={() => setShowPicker(false)}
            onKeyDown={(e) => { if (e.key === 'Escape') setShowPicker(false) }}
          >
            { 
              palette.map((color:string, i: number) => {
                return (
                  // feat: a11y each swatch is a labeled button, aria-pressed marks the current color
                  <button
                    type="button"
                    key={`color_${i}`} style={{backgroundColor: `#${color}`}}
                    aria-label={`#${color}`}
                    title={`#${color}`}
                    aria-pressed={defaultColor.toLowerCase() === `#${color}`.toLowerCase()}
                    onClick = {() => {handleOnClick(optionKey, color)}}
                    >
                  </button>
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
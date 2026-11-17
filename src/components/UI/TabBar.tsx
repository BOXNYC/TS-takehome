import { OptionKey, TabData } from '../../Types'
import '../../styles/UI/tabBar.css'
import { useState } from 'react'

interface Props {
  tabData: TabData[]
  handleOnClick: (option: OptionKey) => void 
}

const TabBar = (props: Props) => {
  const {tabData, handleOnClick} = props
  const [activeTab, setActiveTab] = useState(tabData[0].option)
  
  // fix: removed any type and global event usage, pass option directly
  const onClick = (option: OptionKey) => {
    setActiveTab(option)
    handleOnClick(option)
  }

  return (
    <>
      {/* feat: a11y tablist semantics with roving tabindex and arrow key navigation */}
      <div className="tab" role="tablist" aria-label="Avatar customization options">
        {tabData.map((tab, i) => {
            const isActive = activeTab === tab.option
            return <button
                      key= {`tab_${i}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="options-panel"
                      tabIndex={isActive ? 0 : -1}
                      value = {tab.option} 
                      className = {isActive ? "active" : "" }
                      onKeyDown={(e) => {
                        const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
                        if (!dir) return
                        const next = (i + dir + tabData.length) % tabData.length
                        onClick(tabData[next].option)
                        ;(e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus()
                      }}
                      onClick={() => onClick(tab.option)}>
                        {tab.label}
                      </button>
          }
        )}
      </div>
    </>
  )
} 

export default TabBar